// Physics simulations, part 5 (calculus-based): falling with drag and work as an integral.
// Each computes its results from the stated equations.

import { useState } from "react";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;
const G = 9.8;

// ---------------------------------------------------------------------------
// Falling with air resistance: linear (bv) or quadratic (cv²) drag
// ---------------------------------------------------------------------------

type Drag = "linear" | "quadratic";

export function DragFall({ params }: SimProps) {
  const [drag, setDrag] = useState<Drag>(params?.drag === "quadratic" ? "quadratic" : "linear");
  const [m, setM] = useState(num(params, "mass", 0.1, 0.05, 2));
  const [b, setB] = useState(num(params, "coefficient", 0.5, 0.05, 2));
  const [t, setT] = useState(num(params, "time", 0.2, 0, 5));
  // Linear: v = vT(1 − e^(−t/τ)), τ = m/b. Quadratic: v = vT tanh(g t / vT), vT = √(mg/c).
  const vT = drag === "linear" ? (m * G) / b : Math.sqrt((m * G) / b);
  const tau = drag === "linear" ? m / b : vT / G;
  const v = (tt: number) => (drag === "linear" ? vT * (1 - Math.exp(-tt / tau)) : vT * Math.tanh((G * tt) / vT));
  const tMax = [1, 2, 5, 10].find((x) => x >= 5 * tau) ?? 10;
  const tShown = Math.min(t, tMax);
  const vMax = Math.max(vT * 1.15, 0.1);
  const H = 250;
  const sx = scale(0, tMax, 46, W - 12), sy = scale(0, vMax, 215, 15);
  const curve = Array.from({ length: 241 }, (_, i) => `${i ? "L" : "M"}${sx((i * tMax) / 240).toFixed(1)},${sy(v((i * tMax) / 240)).toFixed(1)}`).join("");
  const free = `M${sx(0)},${sy(0)} L${sx(Math.min(tMax, vMax / G))},${sy(Math.min(vMax, G * tMax))}`;
  const a = drag === "linear" ? G - (b / m) * v(tShown) : G - (b / m) * v(tShown) ** 2;
  return (
    <SimShell
      subject="physics"
      title="Falling with air resistance"
      onReset={() => { setDrag("linear"); setM(0.1); setB(0.5); setT(0.2); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${drag} drag: terminal speed ${fmt(vT, 2)} m/s; at t = ${fmt(tShown)} s the speed is ${fmt(v(tShown), 2)} m/s.`} className="block h-auto w-full select-none">
          <line x1={sx(0)} y1={sy(0)} x2={sx(tMax)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(vMax)} stroke="var(--muted)" />
          {[0, tMax / 2, tMax].map((x) => <text key={x} x={sx(x)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(x)} s</text>)}
          <text x={sx(0) - 6} y={sy(vT) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{fmt(vT, 1)}</text>
          <line x1={sx(0)} y1={sy(vT)} x2={sx(tMax)} y2={sy(vT)} stroke="var(--line)" strokeDasharray="4 4" />
          <text x={sx(tMax)} y={sy(vT) - 6} textAnchor="end" fontSize="11" fill="var(--muted)">terminal speed</text>
          <path d={free} stroke="var(--muted)" strokeDasharray="2 4" fill="none" />
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2.5} />
          <circle cx={sx(tShown)} cy={sy(v(tShown))} r={5} fill="var(--chem)" />
          <text x={sx(tMax)} y={sy(0) + 32} textAnchor="end" fontSize="11" fill="var(--muted)">speed (m/s) against time; dotted line: no drag</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Drag law" value={drag} options={[{ value: "linear", label: "Linear, bv" }, { value: "quadratic", label: "Quadratic, cv²" }]} onChange={setDrag} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Mass" value={m} min={0.05} max={2} step={0.05} unit="kg" onChange={setM} />
            <Slider label={drag === "linear" ? "b" : "c"} value={b} min={0.05} max={2} step={0.05} unit={drag === "linear" ? "kg/s" : "kg/m"} onChange={setB} />
          </div>
          <Slider label="Time" value={tShown} min={0} max={tMax} step={tMax / 200} unit="s" onChange={setT} />
        </>
      }
      readouts={[
        { label: "Terminal speed", value: `${fmt(vT, 3)} m/s`, emphasis: true },
        { label: drag === "linear" ? "Time constant m/b" : "Time scale v_T/g", value: `${fmt(tau, 3)} s` },
        { label: "Speed now", value: `${fmt(v(tShown), 3)} m/s` },
        { label: "Acceleration now", value: `${fmt(a, 3)} m/s²` },
      ]}
      assumptions={[
        "Released from rest; g = 9.8 m/s²; buoyancy ignored.",
        "Linear drag: m dv/dt = mg − bv, so v = v_T(1 − e^(−bt/m)) with v_T = mg/b.",
        "Quadratic drag: m dv/dt = mg − cv², so v = v_T tanh(gt/v_T) with v_T = √(mg/c).",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Work as the area under F(x)
// ---------------------------------------------------------------------------

type ForceLaw = "constant" | "spring" | "square" | "decreasing";
const LAWS: Record<ForceLaw, { label: string; tex: string; F: (x: number, k: number) => number; W: (x1: number, x2: number, k: number) => number }> = {
  constant: { label: "F = k", tex: "k", F: (_x, k) => k, W: (a, b, k) => k * (b - a) },
  spring: { label: "F = kx", tex: "kx", F: (x, k) => k * x, W: (a, b, k) => (k / 2) * (b * b - a * a) },
  square: { label: "F = kx²", tex: "kx²", F: (x, k) => k * x * x, W: (a, b, k) => (k / 3) * (b ** 3 - a ** 3) },
  decreasing: { label: "F = k(1 − 0.4x)", tex: "k(1 − 0.4x)", F: (x, k) => (k * (5 - 2 * x)) / 5, W: (a, b, k) => (k / 5) * (5 * (b - a) - (b * b - a * a)) },
};

export function WorkIntegral({ params }: SimProps) {
  const init = (typeof params?.law === "string" && params.law in LAWS ? params.law : "square") as ForceLaw;
  const [law, setLaw] = useState<ForceLaw>(init);
  const [k, setK] = useState(num(params, "k", 3, 0.5, 5));
  const [x1, setX1] = useState(num(params, "x1", 0, 0, 4));
  const [x2, setX2] = useState(num(params, "x2", 2, 0, 4));
  const L = LAWS[law];
  const lo = Math.min(x1, x2), hi = Math.max(x1, x2);
  const work = L.W(x1, x2, k);
  const fs = Array.from({ length: 161 }, (_, i) => L.F((i * 4) / 160, k));
  const fMax = Math.max(1, ...fs), fMin = Math.min(0, ...fs);
  const H = 240;
  const sx = scale(0, 4, 46, W - 12), sy = scale(fMin, fMax * 1.1, 205, 15);
  const curve = fs.map((f, i) => `${i ? "L" : "M"}${sx((i * 4) / 160).toFixed(1)},${sy(f).toFixed(1)}`).join("");
  const area = (() => {
    const n = 80;
    const pts = Array.from({ length: n + 1 }, (_, i) => { const x = lo + ((hi - lo) * i) / n; return `L${sx(x).toFixed(1)},${sy(L.F(x, k)).toFixed(1)}`; });
    return `M${sx(lo)},${sy(0)} ${pts.join(" ")} L${sx(hi)},${sy(0)} Z`;
  })();
  return (
    <SimShell
      subject="physics"
      title="Work as an integral"
      onReset={() => { setLaw("square"); setK(3); setX1(0); setX2(2); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Force ${L.label} with k = ${fmt(k)}; work from x = ${fmt(x1)} m to ${fmt(x2)} m is ${fmt(work, 2)} J, the shaded area.`} className="block h-auto w-full select-none">
          <line x1={sx(0)} y1={sy(0)} x2={sx(4)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(fMin)} x2={sx(0)} y2={sy(fMax * 1.1)} stroke="var(--muted)" />
          {[0, 1, 2, 3, 4].map((x) => <text key={x} x={sx(x)} y={sy(fMin) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{x} m</text>)}
          <text x={sx(0) - 6} y={sy(fMax) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{fmt(fMax, 1)} N</text>
          {hi > lo && <path d={area} fill="var(--physics)" opacity={0.25} />}
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2.5} />
          <line x1={sx(x1)} y1={sy(fMin)} x2={sx(x1)} y2={sy(fMax * 1.1)} stroke="var(--chem)" strokeDasharray="4 3" />
          <line x1={sx(x2)} y1={sy(fMin)} x2={sx(x2)} y2={sy(fMax * 1.1)} stroke="var(--chem)" strokeDasharray="4 3" />
        </svg>
      }
      controls={
        <>
          <Segmented label="Force" value={law} options={(Object.keys(LAWS) as ForceLaw[]).map((key) => ({ value: key, label: LAWS[key].label }))} onChange={setLaw} />
          <Slider label="k" value={k} min={0.5} max={5} step={0.5} onChange={setK} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Start x₁" value={x1} min={0} max={4} step={0.1} unit="m" onChange={setX1} />
            <Slider label="End x₂" value={x2} min={0} max={4} step={0.1} unit="m" onChange={setX2} />
          </div>
        </>
      }
      readouts={[
        { label: "Work ∫F dx", value: `${fmt(work, 3)} J`, emphasis: true },
        { label: "Force at x₂", value: `${fmt(L.F(x2, k), 3)} N` },
        { label: "Average force", value: x1 === x2 ? "—" : `${fmt(work / (x2 - x1), 3)} N` },
      ]}
      assumptions={[
        "Force acts along x; work W = ∫ F dx from x₁ to x₂, computed exactly from the antiderivative.",
        "Moving backward (x₂ < x₁) reverses the sign of the work.",
        "Areas below the x-axis count as negative work.",
      ]}
    />
  );
}
