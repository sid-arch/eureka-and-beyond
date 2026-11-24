// Physics simulations, part 8: series RLC circuits driven by AC.

import { useState } from "react";
import { fmt, num, scale, SimShell, Slider, type SimProps } from "./shell";

const W = 480;

/** Series RLC driven at frequency f (Hz) by an rms source voltage V. */
export function rlc(R: number, L: number, C: number, f: number, V: number) {
  const w = 2 * Math.PI * f;
  const XL = w * L, XC = 1 / (w * C);
  const Z = Math.hypot(R, XL - XC);
  const I = V / Z;
  const phi = Math.atan2(XL - XC, R); // voltage leads current by phi
  const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
  return { XL, XC, Z, I, phi, f0, P: I * I * R, pf: Math.cos(phi), VR: I * R, VL: I * XL, VC: I * XC };
}

export function RLCCircuit({ params }: SimProps) {
  const [R, setR] = useState(num(params, "R", 50, 5, 200));
  const [Lm, setLm] = useState(num(params, "L", 100, 10, 500)); // mH
  const [Cu, setCu] = useState(num(params, "C", 10, 1, 100)); // μF
  const [f, setF] = useState(num(params, "f", 60, 10, 500));
  const V = 120;
  const r = rlc(R, Lm / 1000, Cu * 1e-6, f, V);
  const H = 270;
  // Waveforms over two periods: source voltage and current (scaled to share the axis).
  const T = 1 / f;
  const gx = scale(0, 2 * T, 20, 290), gy = scale(-1.15, 1.15, 250, 120);
  const wave = (amp: number, shift: number) => Array.from({ length: 121 }, (_, i) => { const t = (2 * T * i) / 120; return `${i ? "L" : "M"}${gx(t)},${gy(amp * Math.sin(2 * Math.PI * f * t - shift))}`; }).join("");
  const iAmp = Math.min(1, (r.I * R) / V + 0.15); // display only: relative size of the current curve
  // Phasor diagram: V_R along x, V_L up, V_C down, V the sum.
  const cx = 380, cy = 170, k = 90 / Math.max(V * 1.41, r.VL, r.VC, r.VR);
  const ph = (x: number, y: number, c: string, lbl: string) => (
    <g aria-label={lbl}><line x1={cx} y1={cy} x2={cx + x * k} y2={cy - y * k} stroke={c} strokeWidth={3} markerEnd="url(#rlc-arrow)" /></g>
  );
  const resonant = Math.abs(f - r.f0) / r.f0 < 0.03;
  return (
    <SimShell
      subject="physics"
      title="AC circuits: series RLC"
      onReset={() => { setR(50); setLm(100); setCu(10); setF(60); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`At ${fmt(f, 0)} Hz: impedance ${fmt(r.Z, 1)} ohms, current ${fmt(r.I, 3)} A rms, phase ${fmt(r.phi * 180 / Math.PI, 1)} degrees; resonance at ${fmt(r.f0, 1)} Hz.`} className="block h-auto w-full select-none">
          <defs><marker id="rlc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke" /></marker></defs>
          {/* circuit sketch */}
          <g stroke="var(--ink)" strokeWidth={2} fill="none">
            <path d="M30,30 H90" /><path d="M90,30 l5,-8 l10,16 l10,-16 l10,16 l10,-16 l5,8" /><path d="M140,30 H170" />
            <path d="M170,30 c5,-14 15,-14 15,0 c5,-14 15,-14 15,0 c5,-14 15,-14 15,0 c5,-14 15,-14 15,0" /><path d="M230,30 H260" />
            <path d="M260,18 V42 M270,18 V42" /><path d="M270,30 H300 V90 H30 V30" />
            <circle cx={30} cy={60} r={14} fill="var(--surface)" /><path d="M22,60 q4,-8 8,0 t8,0" />
          </g>
          <text x={115} y={56} textAnchor="middle" fontSize="11" fill="var(--muted)">R</text>
          <text x={200} y={56} textAnchor="middle" fontSize="11" fill="var(--muted)">L</text>
          <text x={265} y={56} textAnchor="middle" fontSize="11" fill="var(--muted)">C</text>
          {/* waveforms */}
          <line x1={20} x2={290} y1={gy(0)} y2={gy(0)} stroke="var(--line)" />
          <path d={wave(1, 0)} fill="none" stroke="var(--physics)" strokeWidth={2} />
          <path d={wave(iAmp, r.phi)} fill="none" stroke="var(--math)" strokeWidth={2} />
          <text x={24} y={118} fontSize="11" fill="var(--physics)">source voltage</text>
          <text x={120} y={118} fontSize="11" fill="var(--math)">current</text>
          {/* phasors */}
          <line x1={cx - 95} x2={cx + 95} y1={cy} y2={cy} stroke="var(--line)" />
          <line x1={cx} x2={cx} y1={cy - 95} y2={cy + 95} stroke="var(--line)" />
          {ph(r.VR, 0, "var(--math)", "V across R")}
          {ph(0, r.VL, "var(--chem)", "V across L")}
          {ph(0, -r.VC, "var(--muted)", "V across C")}
          {ph(r.VR, r.VL - r.VC, "var(--physics)", "source V")}
          <text x={cx} y={H - 4} textAnchor="middle" fontSize="11" fill="var(--muted)">phasors (rms volts)</text>
          {[["var(--physics)", "source V"], ["var(--math)", "V across R"], ["var(--chem)", "V across L"], ["var(--muted)", "V across C"]].map(([c, t], i) => (
            <g key={t}><line x1={330} x2={348} y1={16 + i * 16} y2={16 + i * 16} stroke={c} strokeWidth={3} /><text x={354} y={20 + i * 16} fontSize="11" fill="var(--ink)">{t}</text></g>
          ))}
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Resistance R" value={R} min={5} max={200} step={5} unit="Ω" onChange={setR} />
            <Slider label="Inductance L" value={Lm} min={10} max={500} step={10} unit="mH" onChange={setLm} />
            <Slider label="Capacitance C" value={Cu} min={1} max={100} step={1} unit="μF" onChange={setCu} />
            <Slider label="Frequency f" value={f} min={10} max={500} step={1} unit="Hz" onChange={setF} />
          </div>
          <button type="button" className="justify-self-start rounded-md bg-sunken px-3 py-2 text-sm font-semibold hover:text-ink" onClick={() => setF(Math.round(Math.min(500, Math.max(10, r.f0))))}>Tune to resonance ({fmt(r.f0, 0)} Hz)</button>
        </>
      }
      readouts={[
        { label: "Reactances 2πfL and 1/(2πfC)", value: `${fmt(r.XL, 1)} Ω, ${fmt(r.XC, 1)} Ω` },
        { label: "Impedance Z", value: `${fmt(r.Z, 1)} Ω`, emphasis: true },
        { label: "Current (rms) = V/Z", value: `${fmt(r.I, 3)} A` },
        { label: "Phase (V leads I)", value: `${fmt(r.phi * 180 / Math.PI, 1)}°${resonant ? " (resonance)" : r.phi > 0 ? " (inductive)" : " (capacitive)"}` },
        { label: "Average power I²R", value: `${fmt(r.P, 1)} W` },
      ]}
      assumptions={[
        "A 120 V rms sinusoidal source drives ideal components in series; the circuit has reached steady state.",
        "The current curve's height is drawn for comparison of timing only; read its size from I_rms. At resonance X_L = X_C, Z = R and the current is largest.",
      ]}
    />
  );
}
