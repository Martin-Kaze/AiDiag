'use client'
import AnimatedGraph from "./test"; 
export default function PostureHorror() {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 12,
        padding: "24px 24px 16px",
        fontFamily: "system-ui, sans-serif",
        maxWidth: 680,
      }}
    >
      {/* Header */}
      <p style={{ fontSize: 11, color: "#ff3333", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px", fontWeight: 600 }}>
        ⚠ clinical data
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: "#fff", margin: "0 0 6px", lineHeight: 1.3 }}>
        Your body is collapsing in slow motion
      </h2>
      <p style={{ fontSize: 13, color: "#666", margin: "0 0 20px", lineHeight: 1.6 }}>
        30 years of poor posture — three systems failing at once.
      </p>

      {/* Graph */}
      <AnimatedGraph
        dark
        height={280}
        animDuration={2600}
        xLabels={["0yr", "5yr", "10yr", "15yr", "20yr", "25yr", "30yr"]}
        yLabel="% health"
        showGoal={false}
        smoothness={0.38}
        lineWidth={2.5}
        showDots={false}
        gridColor="#1a1a1a"
        backgroundColor="transparent"
        counter={{ label: "years elapsed", max: 30 }}
        endIcon="💀"
        series={[
          {
            name: "Lung capacity",
            color: "#4ec9a0",
            values: [100, 92, 86, 81, 78, 75, 70],
            showEndLabel: true,
            endLabelFormat: (v) => `${v}%`,
          },
          {
            name: "Spinal disc health",
            color: "#e88080",
            values: [100, 88, 75, 63, 54, 46, 35],
            showEndLabel: true,
            endLabelFormat: (v) => `${v}%`,
          },
          {
            name: "Mortality risk",
            color: "#ff3333",
            values: [1.0, 1.09, 1.19, 1.28, 1.35, 1.40, 1.44],
            dashed: true,
            rightAxis: true,
            fillOpacity: 0,
            showEndLabel: true,
            endLabelFormat: (v) => `${v.toFixed(2)}×`,
          },
        ]}
        rightAxis={{
          min: 0.9,
          max: 1.6,
          tickCount: 4,
          tickFormat: (v) => `${v.toFixed(1)}×`,
        }}
        milestones={[
          { xIndex: 1, label: "pain starts",  color: "#550000" },
          { xIndex: 4, label: "irreversible", color: "#880000", labelPosition: "bottom" },
        ]}
      />

      {/* Three simple stats */}
      <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
        {[
          { n: "−30%",  l: "lung capacity",     c: "#4ec9a0" },
          { n: "−65%",  l: "spinal disc health", c: "#e88080" },
          { n: "+44%",  l: "mortality risk",     c: "#ff3333" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, minWidth: 100, borderTop: `2px solid ${s.c}`, paddingTop: 10 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}`}</style>
    </div>
  );
}