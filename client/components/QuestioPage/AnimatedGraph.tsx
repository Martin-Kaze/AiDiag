'use client'
/* hint-disable no-inline-styles */
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Series {
  name: string;
  color: string;
  values: number[];
}

export interface GoalMarker {
  label: string;
  seriesIndex: number;
}

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: number;
  color: string;
  name: string;
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
  goal?: GoalMarker | null;
  lineWidth?: number;
  smoothness?: number;
  showFill?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
  showGoal?: boolean;
  animate?: boolean;
  animDuration?: number;
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnimatedGraph({
  xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  series = [{ name: "Value", color: "#1D9E75", values: [40, 55, 70, 80, 95, 110] }],
  title = "",
  yLabel = "",
  unit = "",
  goal = null,
  lineWidth = 3,
  smoothness = 0.4,
  showFill = true,
  showDots = true,
  showGrid = true,
  showGoal = true,
  animate = true,
  animDuration = 1200,
  height = 340,
  padding = { top: 30, right: 40, bottom: 40, left: 52 },
}: AnimatedGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const [width, setWidth] = useState<number>(600);
  const [progress, setProgress] = useState<number>(animate ? 0 : 1);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // ── Measure container width ──────────────────────────────────────────────
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width || 600);
    });
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

  // ── Derived geometry ─────────────────────────────────────────────────────
  const pad = padding;
  const pw = width - pad.left - pad.right;
  const ph = height - pad.top - pad.bottom;
  const n = xLabels.length;

  const allVals = series.flatMap((s) => s.values);
  const rawMin = Math.min(...allVals);
  const rawMax = Math.max(...allVals);
  const range = rawMax - rawMin || 1;
  const yMin = rawMin - range * 0.08;
  const yMax = rawMax + range * 0.12;

  const toX = (i: number): number => pad.left + (n <= 1 ? pw / 2 : (i / (n - 1)) * pw);
  const toY = (v: number): number => pad.top + ph - ((v - yMin) / (yMax - yMin)) * ph;

  const gridTicks = 5;
  const gridLines = Array.from({ length: gridTicks + 1 }, (_, i: number) => {
    const v = yMin + ((yMax - yMin) * i) / gridTicks;
    return { y: toY(v), label: Math.round(v) };
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

      series.forEach((s, si) => {
        s.values.slice(0, n).forEach((v: number, di: number) => {
          const px = toX(di);
          const py = toY(v);
          const dist = Math.hypot(mx - px, my - py);
          if (dist < bestDist) {
            bestDist = dist;
            best = { x: px, y: py, label: xLabels[di], value: v, color: s.color, name: s.name };
          }
        });
      });

      setTooltip(best && bestDist < 40 ? best : null);
    },
    [series, n, xLabels, toX, toY]
  );

  // ── Series rendering ──────────────────────────────────────────────────────
  const renderedSeries = series.map((s, si) => {
    const vals = s.values.slice(0, n);
    const pts: Point[] = vals.map((v, i) => ({ x: toX(i), y: toY(v) }));
    if (pts.length < 2) return null;

    const linePath = catmullRomPath(pts, smoothness, progress);
    const pn = Math.max(1, Math.round(pts.length * progress));

    const lastPt: Point =
      progress < 1 && pn < pts.length
        ? {
            x: pts[pn - 1].x + (pts[pn].x - pts[pn - 1].x) * (pts.length * progress - (pn - 1)),
            y: pts[pn - 1].y + (pts[pn].y - pts[pn - 1].y) * (pts.length * progress - (pn - 1)),
          }
        : pts[pn - 1];

    const fillPath = `${linePath} L ${lastPt.x} ${pad.top + ph} L ${pad.left} ${pad.top + ph} Z`;
    const gradId = `grad-${si}`;
    const visibleDots = pts.slice(0, pn);

    return (
      <g key={si}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={s.color} stopOpacity={0.01} />
          </linearGradient>
        </defs>

        {showFill && <path d={fillPath} fill={`url(#${gradId})`} />}

        <path
          d={linePath}
          fill="none"
          stroke={s.color}
          strokeWidth={lineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {showDots &&
          visibleDots.map((p, di) => (
            <circle
              key={di}
              cx={p.x}
              cy={p.y}
              r={lineWidth + 2}
              fill="white"
              stroke={s.color}
              strokeWidth={2}
              style={{ cursor: "crosshair" }}
            />
          ))}
      </g>
    );
  });

  // ── Goal badges ───────────────────────────────────────────────────────────
  const goalBadges: React.ReactNode[] = [];
  if (showGoal && goal) {
    const s = series[goal.seriesIndex];
    if (s) {
      const vals = s.values.slice(0, n);
      const lx = toX(vals.length - 1);
      const ly = toY(vals[vals.length - 1]);
      goalBadges.push(
        <foreignObject key="end" x={lx + 8} y={ly - 22} width={160} height={36}>
          <div
            style={{
              background: s.color,
              color: "#fff",
              fontSize: 12,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            {goal.label}
          </div>
        </foreignObject>
      );
      goalBadges.push(
        <foreignObject key="start" x={toX(0) + 8} y={toY(vals[0]) - 22} width={80} height={36}>
          <div
            style={{
              background: "#888",
              color: "#fff",
              fontSize: 12,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            {Math.round(vals[0])} {unit}
          </div>
        </foreignObject>
      );
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
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
              x={width / 2}
              y={16}
              textAnchor="middle"
              fontSize={14}
              fontWeight={500}
              fill="#1a1a1a"
              fontFamily="inherit"
            >
              {title}
            </text>
          )}

          {/* Y label */}
          {yLabel && (
            <text
              transform="rotate(-90)"
              x={-(pad.top + ph / 2)}
              y={13}
              textAnchor="middle"
              fontSize={10}
              fill="#888"
              fontFamily="inherit"
            >
              {yLabel}
            </text>
          )}

          {/* Grid */}
          {showGrid &&
            gridLines.map((gl, i) => (
              <g key={i}>
                <line
                  x1={pad.left}
                  x2={width - pad.right}
                  y1={gl.y}
                  y2={gl.y}
                  stroke="#e5e5e5"
                  strokeWidth={0.5}
                  strokeDasharray="4,4"
                />
                <text
                  x={pad.left - 6}
                  y={gl.y + 4}
                  textAnchor="end"
                  fontSize={10}
                  fill="#999"
                  fontFamily="inherit"
                >
                  {gl.label}
                </text>
              </g>
            ))}

          {/* X axis labels */}
          {xLabels.map((lbl, i) => (
            <text
              key={i}
              x={toX(i)}
              y={pad.top + ph + 18}
              textAnchor="middle"
              fontSize={11}
              fill="#999"
              fontFamily="inherit"
            >
              {lbl}
            </text>
          ))}

          {renderedSeries}
          {goalBadges}

          {/* Tooltip crosshair */}
          {tooltip && (
            <g>
              <line
                x1={tooltip.x}
                x2={tooltip.x}
                y1={pad.top}
                y2={pad.top + ph}
                stroke={tooltip.color}
                strokeWidth={1}
                strokeDasharray="4,3"
                opacity={0.5}
              />
              <circle cx={tooltip.x} cy={tooltip.y} r={6} fill={tooltip.color} opacity={0.9} />
            </g>
          )}
        </svg>

        {/* Tooltip box */}
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltip.x + 12,
              top: tooltip.y - 36,
              background: "#fff",
              border: "0.5px solid #e0e0e0",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              pointerEvents: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: tooltip.color, fontWeight: 500 }}>{tooltip.name}</span>
            <br />
            {tooltip.label}: <strong>{tooltip.value} {unit}</strong>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
        {series.map((s, i) => (
          <span
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666" }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: s.color,
                display: "inline-block",
              }}
            />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}


// ─── Usage examples ───────────────────────────────────────────────────────────
//
// 1. Weight loss (single series + goal badge)
// <AnimatedGraph
//   title="Weight over time"
//   xLabels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
//   series={[{ name: "Weight", color: "#1D9E75", values: [77, 75, 73, 70, 68, 66] }]}
//   unit="kg"
//   yLabel="Weight (kg)"
//   goal={{ label: "Goal 66 kg", seriesIndex: 0 }}
// />
//
// 2. Multi-series revenue chart
// <AnimatedGraph
//   title="Monthly revenue"
//   xLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
//   series={[
//     { name: "Product A", color: "#1D9E75", values: [40, 55, 70, 80, 95, 110] },
//     { name: "Product B", color: "#378ADD", values: [20, 25, 30, 38, 44, 52] },
//   ]}
//   unit="k"
//   yLabel="Revenue ($k)"
// />
//
// 3. Yo-yo diet (jagged, no fill)
// <AnimatedGraph
//   title="Yo-yo diet effect"
//   xLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
//   series={[{ name: "Weight", color: "#D85A30", values: [90, 84, 79, 77, 81, 85, 89] }]}
//   unit="kg"
//   showFill={false}
//   smoothness={0.2}
//   goal={{ label: "Start", seriesIndex: 0 }}
// />
//
// 4. Static snapshot (no animation, no grid)
// <AnimatedGraph
//   xLabels={["Q1", "Q2", "Q3", "Q4"]}
//   series={[{ name: "NPS", color: "#D4537E", values: [42, 51, 63, 71] }]}
//   unit="pts"
//   animate={false}
//   showGrid={false}
// />