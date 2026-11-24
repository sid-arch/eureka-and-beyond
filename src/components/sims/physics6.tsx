// Physics simulations, part 6 (calculus-based E&M): fields from Gauss's law and inductor circuits.
// Each computes its results from the stated equations.

import { useState } from "react";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;
const K = 8.99e9;
const E0 = 8.854e-12;

// ---------------------------------------------------------------------------
// Gauss's law: E(r) for symmetric charge distributions
// ---------------------------------------------------------------------------

type Dist = "solid" | "shell" | "line" | "cylinder";
const DISTS: Record<Dist, { label: string; note: string }> = {
  solid: { label: "Solid sphere", note: "Uniformly charged insulating sphere: E = kQr/R³ inside, kQ/r² outside." },
  shell: { label: "Conductor", note: "Conducting sphere (all charge on the surface): E = 0 inside, kQ/r² outside." },
  line: { label: "Line", note: "Infinite line, λ = Q per meter: E = λ/(2πε₀r) everywhere off the line." },
  cylinder: { label: "Cylinder", note: "Uniformly charged infinite cylinder, Q per meter: E = λr/(2πε₀R²) inside, λ/(2πε₀r) outside." },
};

export function GaussField({ params }: SimProps) {
  const init = (typeof params?.distribution === "string" && params.distribution in DISTS ? params.distribution : "solid") as Dist;
  const [dist, setDist] = useState<Dist>(init);
  const [Q, setQ] = useState(num(params, "charge", 6, 1, 10)); // nC (or nC/m)
  const [R, setR] = useState(num(params, "radius", 0.1, 0.05, 0.3)); // m
  const [rg, setRg] = useState(num(params, "gaussian", 0.05, 0.01, 0.5)); // m
  const q = Q * 1e-9;
  const E = (r: number) => {
    if (r <= 0) return 0;
    switch (dist) {
      case "solid": return r < R ? (K * q * r) / R ** 3 : (K * q) / (r * r);
      case "shell": return r < R ? 0 : (K * q) / (r * r);
      case "line": return q / (2 * Math.PI * E0 * r);
      case "cylinder": return r < R ? (q * r) / (2 * Math.PI * E0 * R * R) : q / (2 * Math.PI * E0 * r);
    }
  };
  const rMax = 0.5;
  const samples = Array.from({ length: 301 }, (_, i) => (rMax * (i + 1)) / 301);
  const eMax = Math.max(...samples.map((r) => (dist === "line" ? Math.min(E(r), E(0.03)) : E(r))));
  const H = 250;
  const sx = scale(0, rMax, 50, W - 12), sy = scale(0, eMax * 1.1, 215, 15);
  const curve = samples.map((r, i) => `${i ? "L" : "M"}${sx(r).toFixed(1)},${sy(Math.min(E(r), eMax * 1.1)).toFixed(1)}`).join("");
  const spherical = dist === "solid" || dist === "shell";
  const qEnc = (() => {
    if (dist === "shell") return rg < R ? 0 : q;
    if (dist === "solid") return rg < R ? q * (rg / R) ** 3 : q;
    if (dist === "cylinder") return rg < R ? q * (rg / R) ** 2 : q; // per meter of length
    return q;
  })();
  return (
    <SimShell
      subject="physics"
      title="Gauss's law: field of symmetric charges"
      onReset={() => { setDist("solid"); setQ(6); setR(0.1); setRg(0.05); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${DISTS[dist].label}: at r = ${fmt(rg * 100)} cm the field is ${fmt(E(rg), 0)} N/C.`} className="block h-auto w-full select-none">
          <line x1={sx(0)} y1={sy(0)} x2={sx(rMax)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(eMax * 1.1)} stroke="var(--muted)" />
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((v) => <text key={v} x={sx(v)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(v * 100)} cm</text>)}
          <text x={sx(0) - 4} y={sy(eMax) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{fmt(eMax / 1000, 1)}k</text>
          {dist !== "line" && <rect x={sx(0)} y={sy(eMax * 1.1)} width={sx(R) - sx(0)} height={sy(0) - sy(eMax * 1.1)} fill="var(--chem)" opacity={0.1} />}
          {dist !== "line" && <text x={sx(R) - 4} y={sy(eMax * 1.1) + 14} textAnchor="end" fontSize="10" fill="var(--muted)">inside</text>}
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2.5} />
          <line x1={sx(rg)} y1={sy(0)} x2={sx(rg)} y2={sy(eMax * 1.1)} stroke="var(--chem)" strokeDasharray="4 3" />
          <circle cx={sx(rg)} cy={sy(Math.min(E(rg), eMax * 1.1))} r={5} fill="var(--chem)" />
          <text x={W - 12} y={sy(0) + 32} textAnchor="end" fontSize="11" fill="var(--muted)">field E (N/C) against distance r from the center</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Charge distribution" value={dist} options={(Object.keys(DISTS) as Dist[]).map((d) => ({ value: d, label: DISTS[d].label }))} onChange={setDist} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label={dist === "line" || dist === "cylinder" ? "Charge per meter" : "Charge"} value={Q} min={1} max={10} step={0.5} unit={dist === "line" || dist === "cylinder" ? "nC/m" : "nC"} onChange={setQ} />
            <Slider label="Radius R" value={R * 100} min={5} max={30} step={1} unit="cm" disabled={dist === "line"} onChange={(v) => setR(v / 100)} />
          </div>
          <Slider label={`Gaussian ${spherical ? "sphere" : "cylinder"} radius r`} value={rg * 100} min={1} max={50} step={0.5} unit="cm" onChange={(v) => setRg(v / 100)} />
          <p className="text-xs text-muted">{DISTS[dist].note}</p>
        </>
      }
      readouts={[
        { label: "Field at r", value: `${fmt(E(rg), 0)} N/C`, emphasis: true },
        { label: spherical ? "Charge enclosed" : "Charge enclosed per meter", value: `${fmt(qEnc * 1e9, 3)} nC` },
        { label: spherical ? "Flux through sphere" : "Flux per meter of length", value: `${fmt(qEnc / E0, 1)} N·m²/C` },
      ]}
      assumptions={[
        "Gauss's law: ∮E·dA = Q_enc/ε₀, applied to a surface matching the symmetry, so E is constant on it.",
        "Spheres: E(4πr²) = Q_enc/ε₀. Lines and cylinders: E(2πrL) = λL/ε₀.",
        "Charge is spread uniformly through the volume (insulators) or on the surface (conductors).",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Inductor circuits: LR rise, LR decay, LC oscillation
// ---------------------------------------------------------------------------

type IMode = "rise" | "decay" | "lc";

export function InductorCircuit({ params }: SimProps) {
  const init = (["rise", "decay", "lc"] as const).find((m) => m === params?.mode) ?? "rise";
  const [mode, setMode] = useState<IMode>(init);
  const [emf, setEmf] = useState(num(params, "emf", 12, 1, 24));
  const [R, setR] = useState(num(params, "resistance", 4, 1, 20)); // Ω
  const [L, setL] = useState(num(params, "inductance", 0.5, 0.05, 2)); // H
  const [C, setC] = useState(num(params, "capacitance", 100, 10, 1000)); // μF
  const [t, setT] = useState(num(params, "time", 0.125, 0, 2));
  const tau = L / R;
  const w = 1 / Math.sqrt(L * C * 1e-6);
  const Q0 = (C * 1e-6) * emf; // LC: capacitor starts charged to emf
  const period = (2 * Math.PI) / w;
  const tMax = mode === "lc" ? 2 * period : 5 * tau;
  const tShown = Math.min(t, tMax);
  const I = (tt: number) => (mode === "rise" ? (emf / R) * (1 - Math.exp(-tt / tau)) : mode === "decay" ? (emf / R) * Math.exp(-tt / tau) : -Q0 * w * Math.sin(w * tt));
  const Iq = (tt: number) => Q0 * Math.cos(w * tt);
  const yMax = mode === "lc" ? Q0 * w : emf / R;
  const H = 250;
  const sx = scale(0, tMax, 46, W - 12), sy = scale(mode === "lc" ? -yMax * 1.1 : 0, yMax * 1.15, 215, 15);
  const curve = Array.from({ length: 301 }, (_, i) => `${i ? "L" : "M"}${sx((i * tMax) / 300).toFixed(1)},${sy(I((i * tMax) / 300)).toFixed(1)}`).join("");
  const uL = 0.5 * L * I(tShown) ** 2;
  const uC = mode === "lc" ? (Iq(tShown) ** 2) / (2 * C * 1e-6) : 0;
  return (
    <SimShell
      subject="physics"
      title="Inductor circuits"
      onReset={() => { setMode("rise"); setEmf(12); setR(4); setL(0.5); setC(100); setT(0.125); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${mode === "lc" ? "LC oscillation" : mode === "rise" ? "LR current rising" : "LR current decaying"}: at t = ${fmt(tShown, 3)} s the current is ${fmt(I(tShown), 3)} A.`} className="block h-auto w-full select-none">
          <line x1={sx(0)} y1={sy(0)} x2={sx(tMax)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(mode === "lc" ? -yMax * 1.1 : 0)} x2={sx(0)} y2={sy(yMax * 1.15)} stroke="var(--muted)" />
          {[0, tMax / 2, tMax].map((v) => <text key={v} x={sx(v)} y={215 + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(v * 1000, 0)} ms</text>)}
          <text x={sx(0) - 4} y={sy(yMax) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{fmt(yMax, 2)} A</text>
          {mode !== "lc" && <line x1={sx(tau)} y1={sy(0)} x2={sx(tau)} y2={sy(yMax * 1.15)} stroke="var(--line)" strokeDasharray="4 4" />}
          {mode !== "lc" && <text x={sx(tau) + 4} y={sy(yMax * 1.08)} fontSize="11" fill="var(--muted)">t = τ</text>}
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2.5} />
          <circle cx={sx(tShown)} cy={sy(I(tShown))} r={5} fill="var(--chem)" />
          <text x={W - 12} y={14} textAnchor="end" fontSize="11" fill="var(--muted)">current against time</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Circuit" value={mode} options={[{ value: "rise", label: "LR: switch on" }, { value: "decay", label: "LR: switch off" }, { value: "lc", label: "LC oscillator" }]} onChange={setMode} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label={mode === "lc" ? "Starting capacitor voltage" : "Battery emf"} value={emf} min={1} max={24} step={1} unit="V" onChange={setEmf} />
            <Slider label="Inductance" value={L} min={0.05} max={2} step={0.05} unit="H" onChange={setL} />
          </div>
          {mode === "lc" ? (
            <Slider label="Capacitance" value={C} min={10} max={1000} step={10} unit="μF" onChange={setC} />
          ) : (
            <Slider label="Resistance" value={R} min={1} max={20} step={0.5} unit="Ω" onChange={setR} />
          )}
          <Slider label="Time" value={tShown} min={0} max={tMax} step={tMax / 300} unit="s" onChange={setT} />
        </>
      }
      readouts={mode === "lc" ? [
        { label: "Angular frequency 1/√(LC)", value: `${fmt(w, 1)} rad/s`, emphasis: true },
        { label: "Period", value: `${fmt(period * 1000, 1)} ms` },
        { label: "Energy in capacitor", value: `${fmt(uC * 1000, 2)} mJ` },
        { label: "Energy in inductor", value: `${fmt(uL * 1000, 2)} mJ` },
      ] : [
        { label: "Time constant L/R", value: `${fmt(tau * 1000, 1)} ms`, emphasis: true },
        { label: "Current now", value: `${fmt(I(tShown), 3)} A` },
        { label: "Inductor emf |L dI/dt|", value: `${fmt(mode === "rise" ? emf * Math.exp(-tShown / tau) : emf * Math.exp(-tShown / tau), 2)} V` },
        { label: "Energy in inductor", value: `${fmt(uL, 3)} J` },
      ]}
      assumptions={[
        "Ideal components. LR rise: I = (ε/R)(1 − e^(−t/τ)), τ = L/R. LR decay (battery removed, inductor discharging through R): I = (ε/R)e^(−t/τ).",
        "LC: the capacitor starts charged to the given voltage with no current; q = Q₀cos ωt, I = −Q₀ω sin ωt, ω = 1/√(LC). No resistance, so energy just moves between C and L.",
        "Inductor energy ½LI², capacitor energy q²/(2C).",
      ]}
    />
  );
}
