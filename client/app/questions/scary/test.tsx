'use client'
import { useState, useEffect, useRef, useCallback } from "react";
 
// ─── Types ────────────────────────────────────────────────────────────────────
 
export interface Series {
  name: string;
  color: string;
  values: number[];
  /** Render line as dashed. Default: false */
  dashed?: boolean;
  /** Map this series to the right Y axis. Default: false */
  rightAxis?: boolean;
  /** Show a value label at the final data point. Default: false */
  showEndLabel?: boolean;
  /** Render a dot every N points (1 = all, 2 = every other). Default: 1 */
  dotStride?: number;
  /** Fill opacity multiplier 0–1 (0 = no fill for this series). Default: inherits showFill */
  fillOpacity?: number;
  /** Custom formatter for the end label. Default: "{value}{unit}" */
  endLabelFormat?: (value: number, unit: string) => string;
}
 
export interface GoalMarker {
  label: string;
  seriesIndex: number;
}
 
/** Vertical annotation line at a specific x index */
export interface Milestone {
  xIndex: number;
  label: string;
  /** "top" places label above the line, "bottom" places it below. Default: "top" */
  labelPosition?: "top" | "bottom";
  color?: string;
}
 
/** Config for the optional right Y axis */
export interface RightAxis {
  label?: string;
  min?: number;
  max?: number;
  tickCount?: number;
  tickFormat?: (v: number) => string;
}
 
/** Animated counter displayed in the top-right corner */
export interface Counter {
  label: string;
  max: number;
  format?: (value: number) => string;
}
 
export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
 
interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: number;
  color: string;
  name: string;
  unit: string;
}
 
interface Point {
  x: number;
  y: number;
}
 
export interface AnimatedGraphProps {
  xLabels?: string[];
  series?: Series[];
  title?: string;
  yLabel?: string;
  unit?: string;
 
  // ── Decoration ──────────────────────────────────────────────────────────
  goal?: GoalMarker | null;
  milestones?: Milestone[];
  rightAxis?: RightAxis;
  counter?: Counter;
  /** Emoji or text shown at the very end of the chart once animation completes */
  endIcon?: string;
 
  // ── Appearance ──────────────────────────────────────────────────────────
  dark?: boolean;
  lineWidth?: number;
  smoothness?: number;
  showFill?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
  showGoal?: boolean;
  showLegend?: boolean;
  gridColor?: string;
  backgroundColor?: string;
 
  // ── Animation ──────────────────────────────────────────────────────────
  animate?: boolean;
  animDuration?: number;
 
  // ── Layout ─────────────────────────────────────────────────────────────
  height?: number;
  padding?: Padding;
}
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
 
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
 
function catmullRomPath(pts: Point[], smooth: number, progress: number): string {
  if (!pts.length) return "";
  const n = Math.max(1, Math.round(pts.length * progress));
  const sub = pts.slice(0, n);
  if (sub.length < 2) return `M ${sub[0].x} ${sub[0].y}`;
 
  let d = `M ${sub[0].x} ${sub[0].y}`;
  const t = smooth;
 
  for (let i = 0; i < sub.length - 1; i++) {
    const p0 = sub[Math.max(0, i - 1)];
    const p1 = sub[i];
    const p2 = sub[i + 1];
    const p3 = sub[Math.min(sub.length - 1, i + 2)];
    const cp1x = p1.x + ((p2.x - p0.x) * t) / 3;
    const cp1y = p1.y + ((p2.y - p0.y) * t) / 3;
    const cp2x = p2.x - ((p3.x - p1.x) * t) / 3;
    const cp2y = p2.y - ((p3.y - p1.y) * t) / 3;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
 
  if (progress < 1 && n < pts.length) {
    const frac = pts.length * progress - (n - 1);
    const la = sub[sub.length - 1];
    const lb = pts[n];
    d += ` L ${la.x + (lb.x - la.x) * frac} ${la.y + (lb.y - la.y) * frac}`;
  }
 
  return d;
}
 
function autoRange(values: number[]): { min: number; max: number } {
  const raw = values.filter(Number.isFinite);
  if (!raw.length) return { min: 0, max: 1 };
  const rawMin = Math.min(...raw);
  const rawMax = Math.max(...raw);
  const range = rawMax - rawMin || 1;
  return { min: rawMin - range * 0.08, max: rawMax + range * 0.15 };
}
 
// ─── Component ────────────────────────────────────────────────────────────────
 
export default function AnimatedGraph({
  xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  series = [{ name: "Value", color: "#1D9E75", values: [40, 55, 70, 80, 95, 110] }],
  title = "",
  yLabel = "",
  unit = "",
  goal = null,
  milestones = [],
  rightAxis,
  counter,
  endIcon,
  dark = false,
  lineWidth = 3,
  smoothness = 0.4,
  showFill = true,
  showDots = true,
  showGrid = true,
  showGoal = true,
  showLegend = true,
  gridColor,
  backgroundColor,
  animate = true,
  animDuration = 1200,
  height = 340,
  padding,
}: AnimatedGraphProps) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
 
  const [svgWidth, setSvgWidth] = useState<number>(600);
  const [progress, setProgress] = useState<number>(animate ? 0 : 1);
  const [tooltip,  setTooltip]  = useState<TooltipState | null>(null);
 
  // ── Theme ────────────────────────────────────────────────────────────────
  const theme = {
    bg:            backgroundColor ?? (dark ? "#0f0f0f" : "transparent"),
    grid:          gridColor       ?? (dark ? "#1e1e1e" : "#e8e8e8"),
    tick:          dark ? "#555"   : "#999",
    titleColor:    dark ? "#ffffff": "#1a1a1a",
    tooltipBg:     dark ? "#111"   : "#fff",
    tooltipBorder: dark ? "#3a3a3a": "#e0e0e0",
    legendColor:   dark ? "#aaa"   : "#666",
    dotFill:       dark ? "#0f0f0f": "#fff",
  };
 
  // ── Padding defaults ─────────────────────────────────────────────────────
  const hasRightAxis = series.some((s) => s.rightAxis);
  const pad: Padding = padding ?? {
    top:    title ? 36 : 20,
    right:  hasRightAxis ? 60 : 30,
    bottom: 40,
    left:   52,
  };
 
  // ── Measure width ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSvgWidth(entry.contentRect.width || 600));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
 
  // ── Animation ────────────────────────────────────────────────────────────
  const startAnim = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    if (!animate) { setProgress(1); return; }
    setProgress(0);
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / animDuration, 1);
      setProgress(easeInOut(p));
      if (p < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, [animate, animDuration]);
 
  useEffect(() => {
    startAnim();
    return () => cancelAnimationFrame(animRef.current);
  }, [startAnim]);
 
  // ── Geometry ─────────────────────────────────────────────────────────────
  const W  = svgWidth;
  const pw = W - pad.left - pad.right;
  const ph = height - pad.top - pad.bottom;
  const n  = xLabels.length;
 
  const leftVals  = series.filter((s) => !s.rightAxis).flatMap((s) => s.values);
  const rightVals = series.filter((s) =>  s.rightAxis).flatMap((s) => s.values);
 
  const leftRange  = autoRange(leftVals.length  ? leftVals  : [0, 1]);
  const rightRange = autoRange(rightVals.length ? rightVals : [0, 1]);
 
  const yMinL = leftRange.min;
  const yMaxL = leftRange.max;
  const yMinR = rightAxis?.min ?? rightRange.min;
  const yMaxR = rightAxis?.max ?? rightRange.max;
 
  const toX  = (i: number): number =>
    pad.left + (n <= 1 ? pw / 2 : (i / (n - 1)) * pw);
  const toYL = (v: number): number =>
    pad.top + ph - ((v - yMinL) / (yMaxL - yMinL)) * ph;
  const toYR = (v: number): number =>
    pad.top + ph - ((v - yMinR) / (yMaxR - yMinR)) * ph;
  const toY  = (v: number, right?: boolean): number =>
    right ? toYR(v) : toYL(v);
 
  // ── Grid ticks ───────────────────────────────────────────────────────────
  const leftTicks = Array.from({ length: 6 }, (_, i: number) => {
    const v = yMinL + ((yMaxL - yMinL) * i) / 5;
    return { y: toYL(v), v };
  });
 
  const rightTickCount = rightAxis?.tickCount ?? 5;
  const rightTicks = Array.from({ length: rightTickCount + 1 }, (_, i: number) => {
    const v = yMinR + ((yMaxR - yMinR) * i) / rightTickCount;
    return { y: toYR(v), v };
  });
 
  // ── Tooltip ───────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let best: TooltipState | null = null;
      let bestDist = Infinity;
 
      series.forEach((s) => {
        s.values.slice(0, n).forEach((v, di) => {
          const px   = toX(di);
          const py   = toY(v, s.rightAxis);
          const dist = Math.hypot(mx - px, my - py);
          if (dist < bestDist) {
            bestDist = dist;
            best = { x: px, y: py, label: xLabels[di], value: v, color: s.color, name: s.name, unit };
          }
        });
      });
 
      setTooltip(best && bestDist < 44 ? best : null);
    },
    [series, n, xLabels, unit, toX, toY]
  );
 
  // ── Milestones (only ones the animation has reached) ─────────────────────
  const visibleMilestones = milestones.filter(
    (m) => progress >= m.xIndex / Math.max(n - 1, 1)
  );
 
  // ── Counter display value ─────────────────────────────────────────────────
  const counterDisplay = counter
    ? (counter.format
        ? counter.format(progress * counter.max)
        : String(Math.round(progress * counter.max)))
    : "";
 
  // ── Series ────────────────────────────────────────────────────────────────
  const renderedSeries = series.map((s, si) => {
    const right  = !!s.rightAxis;
    const vals   = s.values.slice(0, n);
    const pts: Point[] = vals.map((v, i) => ({ x: toX(i), y: toY(v, right) }));
    if (pts.length < 2) return null;
 
    const linePath = catmullRomPath(pts, smoothness, progress);
    const pn       = Math.max(1, Math.round(pts.length * progress));
 
    const lastPt: Point =
      progress < 1 && pn < pts.length
        ? {
            x: pts[pn - 1].x + (pts[pn].x - pts[pn - 1].x) * (pts.length * progress - (pn - 1)),
            y: pts[pn - 1].y + (pts[pn].y - pts[pn - 1].y) * (pts.length * progress - (pn - 1)),
          }
        : pts[pn - 1];
 
    const gradId              = `grad-${si}`;
    const fillPath            = `${linePath} L ${lastPt.x} ${pad.top + ph} L ${pad.left} ${pad.top + ph} Z`;
    const effectiveFillOpacity = s.fillOpacity ?? (showFill ? 1 : 0);
    const stride              = s.dotStride ?? 1;
    const visibleDots         = pts.slice(0, pn).filter((_, di) => di % stride === 0 || di === pn - 1);
 
    const endVal   = vals[vals.length - 1];
    const endLabel = s.endLabelFormat
      ? s.endLabelFormat(endVal, unit)
      : `${endVal}${unit}`;
    const endPt    = pts[pts.length - 1];
 
    return (
      <g key={si}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={s.color} stopOpacity={0.22 * effectiveFillOpacity} />
            <stop offset="100%" stopColor={s.color} stopOpacity={0.01 * effectiveFillOpacity} />
          </linearGradient>
        </defs>
 
        {effectiveFillOpacity > 0 && (
          <path d={fillPath} fill={`url(#${gradId})`} />
        )}
 
        <path
          d={linePath}
          fill="none"
          stroke={s.color}
          strokeWidth={lineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={s.dashed ? "7,5" : undefined}
        />
 
        {showDots &&
          visibleDots.map((p, di) => (
            <circle
              key={di}
              cx={p.x}
              cy={p.y}
              r={lineWidth + 1.5}
              fill={theme.dotFill}
              stroke={s.color}
              strokeWidth={2}
              style={{ cursor: "crosshair" }}
            />
          ))}
 
        {s.showEndLabel && progress > 0.95 && (
          <text
            x={endPt.x + (right ? 6 : -6)}
            y={endPt.y - 10}
            textAnchor={right ? "start" : "end"}
            fontSize={11}
            fontWeight={600}
            fill={s.color}
            fontFamily="inherit"
          >
            {endLabel}
          </text>
        )}
      </g>
    );
  });
 
  // ── Goal badges ───────────────────────────────────────────────────────────
  const goalBadges: React.ReactNode[] = [];
  if (showGoal && goal) {
    const s = series[goal.seriesIndex];
    if (s) {
      const vals = s.values.slice(0, n);
      goalBadges.push(
        <foreignObject
          key="end"
          x={toX(vals.length - 1) + 8}
          y={toY(vals[vals.length - 1], s.rightAxis) - 22}
          width={160} height={36}
        >
          <div style={{
            background: s.color, color: "#fff", fontSize: 12, fontWeight: 500,
            padding: "4px 10px", borderRadius: 8, whiteSpace: "nowrap", display: "inline-block",
          }}>
            {goal.label}
          </div>
        </foreignObject>
      );
      goalBadges.push(
        <foreignObject
          key="start"
          x={toX(0) + 8}
          y={toY(vals[0], s.rightAxis) - 22}
          width={100} height={36}
        >
          <div style={{
            background: "#888", color: "#fff", fontSize: 12, fontWeight: 500,
            padding: "4px 10px", borderRadius: 8, whiteSpace: "nowrap", display: "inline-block",
          }}>
            {Math.round(vals[0])} {unit}
          </div>
        </foreignObject>
      );
    }
  }
 
  // ── End icon ──────────────────────────────────────────────────────────────
  const endIconEl: React.ReactNode = (() => {
    if (!endIcon || progress <= 0.92) return null;
    const s    = series[0];
    const vals = s?.values.slice(0, n) ?? [];
    if (!vals.length) return null;
    return (
      <text
        x={toX(vals.length - 1)}
        y={toY(vals[vals.length - 1], s?.rightAxis) - 14}
        textAnchor="middle"
        fontSize={20}
        opacity={Math.min(1, (progress - 0.92) / 0.08)}
        fontFamily="inherit"
      >
        {endIcon}
      </text>
    );
  })();
 
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: theme.bg, borderRadius: 12 }}>
 
      {/* Animated counter */}
      {counter && (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px 0" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontSize: 28, fontWeight: 700,
              color: series[0]?.color ?? "#fff",
              lineHeight: 1,
            }}>
              {counterDisplay}
            </div>
            <div style={{
              fontSize: 10, color: theme.tick,
              letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2,
            }}>
              {counter.label}
            </div>
          </div>
        </div>
      )}
 
      {/* SVG */}
      <div ref={wrapRef} style={{ position: "relative", width: "100%", height }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
          role="img"
          aria-label={`${title || "Chart"}: ${series.map((s) => s.name).join(", ")}`}
        >
          {/* Title */}
          {title && (
            <text
              x={W / 2} y={18}
              textAnchor="middle" fontSize={14} fontWeight={500}
              fill={theme.titleColor} fontFamily="inherit"
            >
              {title}
            </text>
          )}
 
          {/* Left Y label */}
          {yLabel && (
            <text
              transform="rotate(-90)"
              x={-(pad.top + ph / 2)} y={13}
              textAnchor="middle" fontSize={9}
              fill={theme.tick} fontFamily="inherit"
            >
              {yLabel}
            </text>
          )}
 
          {/* Right Y label */}
          {rightAxis?.label && (
            <text
              transform="rotate(90)"
              x={pad.top + ph / 2} y={-(W - pad.right + 46)}
              textAnchor="middle" fontSize={9}
              fill={theme.tick} fontFamily="inherit"
            >
              {rightAxis.label}
            </text>
          )}
 
          {/* Grid + left ticks */}
          {showGrid && leftTicks.map((gl, i) => (
            <g key={i}>
              <line
                x1={pad.left} x2={W - pad.right}
                y1={gl.y} y2={gl.y}
                stroke={theme.grid}
                strokeWidth={0.5}
                strokeDasharray={dark ? "0" : "4,4"}
              />
              <text
                x={pad.left - 5} y={gl.y + 4}
                textAnchor="end" fontSize={9}
                fill={theme.tick} fontFamily="inherit"
              >
                {Math.round(gl.v * 10) / 10}
              </text>
            </g>
          ))}
 
          {/* Right axis ticks */}
          {hasRightAxis && rightTicks.map((rt, i) => (
            <text
              key={i}
              x={W - pad.right + 6} y={rt.y + 4}
              textAnchor="start" fontSize={9}
              fill={theme.tick} fontFamily="inherit"
            >
              {rightAxis?.tickFormat
                ? rightAxis.tickFormat(rt.v)
                : String(Math.round(rt.v * 100) / 100)}
            </text>
          ))}
 
          {/* X labels */}
          {xLabels.map((lbl, i) => (
            <text
              key={i}
              x={toX(i)} y={pad.top + ph + 18}
              textAnchor="middle" fontSize={9}
              fill={theme.tick} fontFamily="inherit"
            >
              {lbl}
            </text>
          ))}
 
          {/* Milestones */}
          {visibleMilestones.map((m, i) => {
            const x   = toX(m.xIndex);
            const col = m.color ?? "#cc0000";
            return (
              <g key={i}>
                <line
                  x1={x} x2={x}
                  y1={pad.top} y2={pad.top + ph}
                  stroke={col} strokeWidth={1}
                  strokeDasharray="4,3" opacity={0.8}
                />
                <text
                  x={x}
                  y={m.labelPosition === "bottom" ? pad.top + ph + 28 : pad.top - 6}
                  textAnchor="middle" fontSize={9}
                  fill={col} fontFamily="inherit"
                >
                  {m.label}
                </text>
              </g>
            );
          })}
 
          {renderedSeries}
          {goalBadges}
          {endIconEl}
 
          {/* Tooltip crosshair */}
          {tooltip && (
            <g>
              <line
                x1={tooltip.x} x2={tooltip.x}
                y1={pad.top} y2={pad.top + ph}
                stroke={tooltip.color} strokeWidth={1}
                strokeDasharray="4,3" opacity={0.5}
              />
              <circle cx={tooltip.x} cy={tooltip.y} r={6} fill={tooltip.color} opacity={0.9} />
            </g>
          )}
        </svg>
 
        {/* Tooltip box */}
        {tooltip && (
          <div style={{
            position: "absolute",
            left: Math.min(tooltip.x + 12, svgWidth - 160),
            top:  Math.max(tooltip.y - 40, 4),
            background: theme.tooltipBg,
            border: `0.5px solid ${theme.tooltipBorder}`,
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 12,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}>
            <span style={{ color: tooltip.color, fontWeight: 500 }}>{tooltip.name}</span>
            <br />
            <span style={{ color: dark ? "#aaa" : "#666" }}>{tooltip.label}:</span>{" "}
            <strong style={{ color: dark ? "#fff" : "#111" }}>
              {tooltip.value} {tooltip.unit}
            </strong>
          </div>
        )}
      </div>
 
      {/* Legend — line swatch respects dashed */}
      {showLegend && (
        <div style={{ display: "flex", gap: 16, padding: "0 4px 8px", flexWrap: "wrap" }}>
          {series.map((s, i) => (
            <span key={i} style={{
              display: "flex", alignItems: "center",
              gap: 6, fontSize: 11, color: theme.legendColor,
            }}>
              <span style={{
                width: 18, height: 0,
                borderTop: `2px ${s.dashed ? "dashed" : "solid"} ${s.color}`,
                display: "inline-block",
              }} />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
 
 
// ─── Usage examples ───────────────────────────────────────────────────────────
//
// 1. Classic weight loss
// <AnimatedGraph
//   title="Weight over time"
//   xLabels={["May","Jun","Jul","Aug","Sep","Oct"]}
//   series={[{ name:"Weight", color:"#1D9E75", values:[77,75,73,70,68,66], showEndLabel:true }]}
//   unit="kg" yLabel="Weight (kg)"
//   goal={{ label:"Goal 66 kg", seriesIndex:0 }}
// />
//
// 2. Dark dual-axis posture horror graph
// <AnimatedGraph
//   dark
//   xLabels={["0yr","5yr","10yr","15yr","20yr","25yr","30yr"]}
//   series={[
//     { name:"Lung capacity",  color:"#5DCAA5", values:[100,92,86,81,78,75,70], showEndLabel:true },
//     { name:"Spinal health",  color:"#F09595", values:[100,88,75,63,54,46,35], showEndLabel:true },
//     { name:"Mortality risk", color:"#ff3333", values:[1.0,1.1,1.2,1.28,1.35,1.40,1.44],
//       dashed:true, rightAxis:true, dotStride:2, showEndLabel:true,
//       endLabelFormat:(v) => v.toFixed(2)+"×" },
//   ]}
//   rightAxis={{ label:"Mortality ×", tickFormat:(v) => v.toFixed(1)+"×" }}
//   milestones={[
//     { xIndex:1, label:"Neck pain",   color:"#cc4444" },
//     { xIndex:3, label:"Disc damage", color:"#cc4444", labelPosition:"bottom" },
//     { xIndex:5, label:"Lung impact", color:"#cc4444" },
//   ]}
//   counter={{ label:"years elapsed", max:30 }}
//   endIcon="💀"
//   animDuration={2800}
//   height={320}
//   yLabel="% health"
// />
//
// 3. Multi-series revenue (dashed second line)
// <AnimatedGraph
//   title="Monthly revenue"
//   xLabels={["Jan","Feb","Mar","Apr","May","Jun"]}
//   series={[
//     { name:"Product A", color:"#1D9E75", values:[40,55,70,80,95,110] },
//     { name:"Product B", color:"#378ADD", values:[20,25,30,38,44,52], dashed:true },
//   ]}
//   unit="k" yLabel="Revenue ($k)"
// />
//
// 4. Dark yo-yo diet (no fill, low smoothness)
// <AnimatedGraph
//   dark
//   xLabels={["Jan","Feb","Mar","Apr","May","Jun","Jul"]}
//   series={[{ name:"Weight", color:"#D85A30", values:[90,84,79,77,81,85,89], fillOpacity:0 }]}
//   unit="kg" smoothness={0.2}
//   goal={{ label:"Start weight", seriesIndex:0 }}
// />
//
// 5. Static snapshot (no animation, no legend)
// <AnimatedGraph
//   xLabels={["Q1","Q2","Q3","Q4"]}
//   series={[{ name:"NPS", color:"#D4537E", values:[42,51,63,71] }]}
//   unit="pts" animate={false} showGrid={false} showLegend={false}
// />
 