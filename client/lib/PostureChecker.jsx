"use client";

import { Button } from "@/components/ui/button";
import { SetPosure } from "@/state/slices/UserInputSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { useMyLogic } from "./useMyLogic";

const CHECKS_DEF = [
  { id: "shoulders", label: "Shoulders level",  tip: "Keep shoulders at the same height" },
  { id: "head",      label: "Head centered",    tip: "Align head over your shoulders" },
  { id: "spine",     label: "Spine straight",   tip: "Sit with spine vertically aligned" },
  { id: "distance",  label: "Good distance",    tip: "Move closer or farther from camera" },
];

// Stricter tolerances than before
function analyzePosture(lm) {
  const ls = lm[11], rs = lm[12];
  const lh = lm[23], rh = lm[24];
  const nose = lm[0];

  const shoulderW    = Math.abs(ls.x - rs.x);
  const shoulderTilt = Math.abs(ls.y - rs.y);
  const shoulderMidX = (ls.x + rs.x) / 2;
  const hipMidX      = (lh.x + rh.x) / 2;
  const headOff      = Math.abs(nose.x - shoulderMidX);
  const spineOff     = Math.abs(shoulderMidX - hipMidX);

  return {
    shouldersLevel: shoulderTilt < 0.025,
headCentered:   headOff < 0.04,
spineStr:       spineOff < 0.04,
    goodDistance:   shoulderW > 0.22 && shoulderW < 0.55,
    shoulderTilt, headOff, spineOff, shoulderW,
  };
}

function calcScore(avg) {
  // Weighted — each axis penalised harder when partially failing
  const raw = avg.reduce((a, b) => a + b, 0) / avg.length;
  // Compress the top end so 100 % is very hard to reach
  return Math.round(Math.pow(raw, 1.35) * 100);
}

const CAPTURE_SECS = 10;

export default function PostureChecker() {
  useMyLogic();
  const dispatch = useDispatch();
  const router = useRouter();

  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const historyRef = useRef([]);
  const poseRef    = useRef(null);
  const camRef     = useRef(null);
  const phaseRef = useRef("idle");

  
  // bestRef stores the snapshot with the highest score seen during the session
  const bestRef    = useRef(null);
  const timerRef   = useRef(null);

  const [started,     setStarted]     = useState(false);
  const [phase,       setPhase]       = useState("idle"); // "idle" | "capturing" | "done"
  const [countdown,   setCountdown]   = useState(CAPTURE_SECS);
  const [status,      setStatus]      = useState("Loading model…");
  const [score,       setScore]       = useState(null);
  const [scoreLabel,  setLabel]       = useState("Detecting…");
  const [checks,      setChecks]      = useState({});

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  // Load MediaPipe scripts once camera starts
  useEffect(() => {
    if (!started) return;
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js",
    ];
    let loaded = 0;
    scripts.forEach((src) => {
      if (document.querySelector(`script[src="${src}"]`)) { loaded++; return; }
      const s = document.createElement("script");
      s.src = src;
      s.crossOrigin = "anonymous";
      s.onload = () => { loaded++; if (loaded === scripts.length) initPose(); };
      document.body.appendChild(s);
    });
    if (loaded === scripts.length) initPose();
  }, [started]);

  useEffect(() => () => stopAll(), []);

  function stopAll() {
    camRef.current?.stop?.();
    clearInterval(timerRef.current);
  }

  function initPose() {
    const pose = new window.Pose({
      locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`,
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
    pose.onResults(onResults);
    poseRef.current = pose;

    const cam = new window.Camera(videoRef.current, {
      onFrame: async () => { await pose.send({ image: videoRef.current }); },
      width: 640,
      height: 480,
    });
    camRef.current = cam;
    cam.start();
    setStatus("Camera ready — press Capture when set");
  }

  function startCapture() {
    historyRef.current = [];
    bestRef.current    = null;
    setPhase("capturing");
    setCountdown(CAPTURE_SECS);

    let remaining = CAPTURE_SECS;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        finishCapture();
      }
    }, 1000);
  }

  function finishCapture() {
    setPhase("done");
    if (bestRef.current) {
      const { score: s, checks: ch, label } = bestRef.current;
      setScore(s);
      setLabel(label);
      setChecks(ch);
    } else {
      setScore(0);
      setLabel("No pose detected during capture");
      setChecks({});
    }
  }

  function retry() {
    historyRef.current = [];
    bestRef.current    = null;
    setPhase("idle");
    setScore(null);
    setLabel("Detecting…");
    setChecks({});
    setStatus("Camera ready — press Capture when set");
  }

 function onResults(results) {
  const video  = videoRef.current;
  const canvas = canvasRef.current;
  if (!canvas || !video) return;

  const ctx = canvas.getContext("2d");
  canvas.width  = video.videoWidth  || 640;
  canvas.height = video.videoHeight || 480;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (phaseRef.current !== "capturing") {   // <-- phaseRef, not phase
    if (results.poseLandmarks) drawSkeleton(ctx, results.poseLandmarks);
    if (phaseRef.current === "idle")        // <-- phaseRef, not phase
      setStatus("Camera ready — press Capture when set");
    return;
  }

  setStatus("");
  if (!results.poseLandmarks) return;

    const lm = results.poseLandmarks;
    drawSkeleton(ctx, lm);

    const r     = analyzePosture(lm);
    const frame = [r.shouldersLevel, r.headCentered, r.spineStr, r.goodDistance].map(Number);
    const hist  = historyRef.current;
    hist.push(frame);
    if (hist.length > 10) hist.shift();

    const avg    = hist.reduce((a, b) => a.map((v, i) => v + b[i]), [0,0,0,0])
                       .map((v) => v / hist.length);
    // Stricter threshold for a check to count as passing
    const thresh = 0.72;
    const sl     = avg[0] > thresh;
    const hc     = avg[1] > thresh;
    const ss     = avg[2] > thresh;
    const gd     = avg[3] > thresh;
    const s      = calcScore(avg);

    const currentChecks = {
      shoulders: { good: sl, text: sl ? "Level ✓" : `Tilted ${(r.shoulderTilt * 100).toFixed(1)}%` },
      head:      { good: hc, text: hc ? "Centered ✓" : "Off-center" },
      spine:     { good: ss, text: ss ? "Straight ✓" : "Leaning" },
      distance:  { good: gd, text: gd ? "Good ✓" : r.shoulderW < 0.22 ? "Too far away" : "Too close" },
    };
    const label = s >= 70 ? "Good posture!" : s >= 45 ? "Needs adjustment" : "Poor posture";

    // Keep only the best snapshot
    if (!bestRef.current || s > bestRef.current.score) {
      bestRef.current = { score: s, checks: currentChecks, label, raw: r };
    }

    // Live preview during countdown
    setScore(s);
    setLabel(label);
    setChecks(currentChecks);
  }

  function drawSkeleton(ctx, lm) {
    window.drawConnectors(ctx, lm, window.POSE_CONNECTIONS, {
      color: "rgba(255,255,255,0.35)", lineWidth: 2,
    });
    window.drawLandmarks(ctx, lm, {
      color: "rgba(255,255,255,0.7)",
      fillColor: "rgba(80,160,255,0.65)",
      lineWidth: 1, radius: 3,
    });
  }

  function handleContinue() {
    router.push('/questions/posture');
    const best = bestRef.current;
    dispatch(SetPosure({
      score:  best?.score  ?? 0,
      checks: best?.checks ?? {},
      label:  best?.label  ?? "Unknown",
    }));
  }

  const scoreColor = score == null ? "#888"
    : score >= 70 ? "#22c55e"
    : score >= 45 ? "#f59e0b"
    : "#ef4444";

  return (
    <div style={{ padding: "1rem 0", maxWidth: 640, alignSelf: "center" }}>
      {!started ? (
        <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
          <p style={{ fontSize: 22, fontWeight: 500, margin: "0 0 8px" }}>Posture checker</p>
          <p style={{ fontSize: 15, color: "#888", margin: "0 0 2rem", lineHeight: 1.6 }}>
            Uses your webcam and AI pose detection to score your posture.<br />
            No data leaves your device.
          </p>
          <button onClick={() => setStarted(true)} style={{ fontSize: 14, padding: "10px 26px", cursor: "pointer" }}>
            Start camera ↗
          </button>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 12 }}>
            Sit facing the camera. Keep your full torso visible.
          </p>
        </div>
      ) : (
        <>
          {/* Video + skeleton overlay */}
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#111", lineHeight: 0, marginBottom: "1rem" }}>
            <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", display: "block", transform: "scaleX(-1)" }} />
            <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", transform: "scaleX(-1)" }} />

            {/* Countdown badge */}
            {phase === "capturing" && (
              <div style={{ position: "absolute", top: 10, right: 12, background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 18, fontWeight: 600, padding: "4px 14px", borderRadius: 999 }}>
                {countdown}s
              </div>
            )}

            {status && (
              <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12, padding: "4px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>
                {status}
              </div>
            )}
          </div>

          {/* Score + status — only shown once we have data */}
          {score != null && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1rem" }}>
              <div style={{ background: "#f5f5f5", borderRadius: 8, padding: 14 }}>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 4px" }}>
                  {phase === "done" ? "Best posture score" : "Live score"}
                </p>
                <p style={{ fontSize: 36, fontWeight: 500, margin: 0, color: scoreColor }}>
                  {score}%
                </p>
              </div>
              <div style={{ background: "#f5f5f5", borderRadius: 8, padding: 14 }}>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 4px" }}>Status</p>
                <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color: scoreColor, lineHeight: 1.4 }}>
                  {scoreLabel}
                </p>
              </div>
            </div>
          )}

          {/* Check cards */}
          {Object.keys(checks).length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginBottom: "1rem" }}>
              {CHECKS_DEF.map((c) => {
                const ch    = checks[c.id];
                const good  = ch?.good;
                const color = ch ? (good ? "#22c55e" : "#ef4444") : "#888";
                return (
                  <div key={c.id} title={c.tip} style={{ background: "#f5f5f5", borderRadius: 8, padding: "12px 14px", border: `0.5px solid ${color}`, transition: "border-color 0.4s" }}>
                    <p style={{ fontSize: 12, color: "#888", margin: "0 0 4px" }}>{c.label}</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", marginRight: 6, flexShrink: 0, transition: "background 0.4s" }} />
                      <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color }}>{ch?.text ?? "–"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p style={{ fontSize: 12, color: "#aaa", marginBottom: 12, lineHeight: 1.5 }}>
            Tip: keep your full torso and both shoulders visible. Arm's length from camera works best.
          </p>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {phase === "idle" && (
              <Button onClick={startCapture}>Capture posture (10s)</Button>
            )}
            {phase === "capturing" && (
              <Button disabled>Capturing… {countdown}s</Button>
            )}
            {phase === "done" && (
              <>
                <Button variant="outline" onClick={retry}>Retry</Button>
                <Button onClick={handleContinue}>Continue</Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}