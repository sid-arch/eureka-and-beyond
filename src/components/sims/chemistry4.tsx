// Chemistry simulations, part 4: microstates and entropy, and Gibbs free energy against temperature.
// Each computes its results from the stated equations.

import { useMemo, useState } from "react";
import { fmt, num, scale, SimShell, Slider, type SimProps } from "./shell";

const W = 480;
const R = 8.314; // J/(mol·K)

// ---------------------------------------------------------------------------
// Microstates: N particles shared between two halves of a box
// ---------------------------------------------------------------------------

/** Binomial coefficient C(n, k), exact for the small n used here. */
export function choose(n: number, k: number) {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 1; i <= Math.min(k, n - k); i++) c = (c * (n - i + 1)) / i;
  return Math.round(c);
}

/** Deterministic pseudo-random positions so the picture is stable for a given seed. */
function rand(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function Microstates({ params }: SimProps) {
  const [N, setN] = useState(Math.round(num(params, "particles", 10, 2, 30)));
  const [left, setLeft] = useState(Math.round(num(params, "left", 5, 0, 30)));
  const [seed, setSeed] = useState(7);
  const nLeft = Math.min(left, N);
  const total = Math.pow(2, N);
  const Wn = choose(N, nLeft);
  const P = Wn / total;
  const H = 260;
  const dots = useMemo(() => {
    const g = rand(seed * 31 + N * 7 + nLeft);
    return Array.from({ length: N }, (_, i) => ({
      x: (i < nLeft ? 24 : 134) + g() * 92,
      y: 34 + g() * 112,
    }));
  }, [N, nLeft, seed]);
  const maxW = choose(N, Math.floor(N / 2));
  const bx = scale(0, N + 1, 250, W - 10);
  const by = scale(0, maxW, 200, 30);
  const bw = Math.max(2, (W - 260) / (N + 1) - 1);
  return (
    <SimShell
      subject="chemistry"
      title="Microstates and entropy"
      onReset={() => { setN(10); setLeft(5); setSeed(7); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${nLeft} of ${N} particles on the left: ${Wn} microstates out of ${total}, probability ${fmt(P * 100, 3)}%.`} className="block h-auto w-full select-none">
          <rect x={20} y={30} width={220} height={120} fill="none" stroke="var(--muted)" strokeWidth={2} />
          <line x1={130} y1={30} x2={130} y2={150} stroke="var(--muted)" strokeDasharray="4 4" />
          {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={5} fill="var(--chem)" />)}
          <text x={75} y={170} textAnchor="middle" fontSize="12" fill="var(--muted)">left {nLeft}</text>
          <text x={185} y={170} textAnchor="middle" fontSize="12" fill="var(--muted)">right {N - nLeft}</text>
          <text x={130} y={200} textAnchor="middle" fontSize="12" fill="var(--ink)">W = C({N}, {nLeft}) = {Wn.toLocaleString()}</text>
          <text x={130} y={220} textAnchor="middle" fontSize="12" fill="var(--ink)">S/k = ln W = {fmt(Math.log(Wn), 2)}</text>
          {Array.from({ length: N + 1 }, (_, k) => {
            const w = choose(N, k);
            return <rect key={k} x={bx(k + 0.5) - bw / 2} y={by(w)} width={bw} height={by(0) - by(w)} fill={k === nLeft ? "var(--physics)" : "var(--chem)"} opacity={k === nLeft ? 1 : 0.45} />;
          })}
          <line x1={250} y1={by(0)} x2={W - 10} y2={by(0)} stroke="var(--muted)" />
          <text x={bx(0.5)} y={by(0) + 14} textAnchor="middle" fontSize="10" fill="var(--muted)">0</text>
          <text x={bx(N + 0.5)} y={by(0) + 14} textAnchor="middle" fontSize="10" fill="var(--muted)">{N}</text>
          <text x={(250 + W - 10) / 2} y={by(0) + 32} textAnchor="middle" fontSize="11" fill="var(--muted)">microstates for each number on the left</text>
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Particles N" value={N} min={2} max={30} step={1} onChange={(v) => { setN(v); setLeft((l) => Math.min(l, v)); }} />
            <Slider label="Particles on the left" value={nLeft} min={0} max={N} step={1} onChange={setLeft} />
          </div>
          <button type="button" onClick={() => setSeed((s) => s + 1)} className="rounded-md bg-sunken px-3 py-1.5 text-sm font-semibold hover:text-ink">Shuffle positions</button>
        </>
      }
      readouts={[
        { label: "Microstates W", value: Wn.toLocaleString(), emphasis: true },
        { label: "Probability", value: P < 1e-4 ? P.toExponential(2) : `${fmt(P * 100, 2)}%` },
        { label: "Total arrangements 2ᴺ", value: total.toLocaleString() },
      ]}
      assumptions={[
        "Each particle is independently equally likely to be in either half, so every one of the 2ᴺ arrangements is equally probable.",
        "W counts the arrangements with a given number on the left; S = k ln W (Boltzmann). Real samples have about 10²³ particles, so the even split is overwhelmingly likely.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Gibbs free energy against temperature
// ---------------------------------------------------------------------------

/** ΔG° in kJ for ΔH° in kJ, ΔS° in J/K and T in K, plus K = e^(−ΔG°/RT). */
export function gibbs(dH: number, dS: number, T: number) {
  const dG = dH - (T * dS) / 1000;
  const K = Math.exp((-dG * 1000) / (R * T));
  const crossover = dS !== 0 ? (dH * 1000) / dS : NaN;
  return { dG, K, crossover };
}

export function FreeEnergy({ params }: SimProps) {
  const [dH, setDH] = useState(num(params, "dH", -92.2, -300, 300));
  const [dS, setDS] = useState(num(params, "dS", -198.7, -400, 400));
  const [T, setT] = useState(num(params, "T", 298, 100, 1500));
  const g = gibbs(dH, dS, T);
  const H = 250;
  const Tmax = 1500;
  const ends = [dH - (100 * dS) / 1000, dH - (Tmax * dS) / 1000];
  const lim = Math.max(50, Math.abs(ends[0]), Math.abs(ends[1]), Math.abs(dH));
  const sx = scale(0, Tmax, 50, W - 14), sy = scale(-lim, lim, H - 30, 18);
  const favorable = g.dG < 0;
  const cx = g.crossover;
  const showCross = Number.isFinite(cx) && cx > 0 && cx <= Tmax;
  const verdict = dH < 0 && dS > 0 ? "favorable at every temperature" : dH > 0 && dS < 0 ? "unfavorable at every temperature" : dH < 0 ? "favorable below the crossover" : "favorable above the crossover";
  return (
    <SimShell
      subject="chemistry"
      title="Gibbs free energy and temperature"
      onReset={() => { setDH(-92.2); setDS(-198.7); setT(298); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`At ${fmt(T, 0)} K, ΔG° = ${fmt(g.dG, 1)} kJ, so the reaction is ${favorable ? "thermodynamically favorable" : "not favorable"}.`} className="block h-auto w-full select-none">
          <rect x={sx(0)} y={sy(0)} width={sx(Tmax) - sx(0)} height={sy(-lim) - sy(0)} fill="var(--chem)" opacity={0.08} />
          <text x={sx(Tmax) - 4} y={sy(-lim) - 6} textAnchor="end" fontSize="10" fill="var(--muted)">ΔG° &lt; 0: favorable</text>
          <line x1={sx(0)} y1={sy(0)} x2={sx(Tmax)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(-lim)} x2={sx(0)} y2={sy(lim)} stroke="var(--muted)" />
          <text x={sx(0) - 4} y={sy(0) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">0</text>
          <text x={sx(0) - 4} y={sy(lim) + 8} textAnchor="end" fontSize="10" fill="var(--muted)">{fmt(lim, 0)}</text>
          <text x={sx(0) - 4} y={sy(-lim)} textAnchor="end" fontSize="10" fill="var(--muted)">−{fmt(lim, 0)}</text>
          <text x={sx(Tmax)} y={sy(-lim) + 18} textAnchor="end" fontSize="10" fill="var(--muted)">{Tmax} K</text>
          <text x={(sx(0) + sx(Tmax)) / 2} y={H - 2} textAnchor="middle" fontSize="11" fill="var(--muted)">temperature (K); ΔG° in kJ</text>
          <line x1={sx(0)} y1={sy(dH)} x2={sx(Tmax)} y2={sy(dH - (Tmax * dS) / 1000)} stroke="var(--chem)" strokeWidth={2.5} />
          {showCross && <>
            <line x1={sx(cx)} y1={sy(-lim)} x2={sx(cx)} y2={sy(lim)} stroke="var(--muted)" strokeDasharray="4 4" />
            <text x={sx(cx) + 4} y={sy(lim) + 10} fontSize="10" fill="var(--muted)">{fmt(cx, 0)} K</text>
          </>}
          <circle cx={sx(T)} cy={sy(g.dG)} r={6} fill={favorable ? "var(--chem)" : "var(--physics)"} stroke="var(--surface)" strokeWidth={2} />
          <text x={sx(0) + 6} y={sy(dH) + (dS < 0 ? 16 : -8)} fontSize="10" fill="var(--muted)">ΔH° at 0 K</text>
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="ΔH°" value={dH} min={-300} max={300} step={0.1} unit="kJ" format={(v) => fmt(v, 1)} onChange={setDH} />
            <Slider label="ΔS°" value={dS} min={-400} max={400} step={0.1} unit="J/K" format={(v) => fmt(v, 1)} onChange={setDS} />
          </div>
          <Slider label="Temperature" value={T} min={100} max={1500} step={1} unit="K" onChange={setT} />
        </>
      }
      readouts={[
        { label: "ΔG° = ΔH° − TΔS°", value: `${fmt(g.dG, 1)} kJ`, emphasis: true },
        { label: "K = e^(−ΔG°/RT)", value: g.K > 1e4 || g.K < 1e-3 ? g.K.toExponential(2) : fmt(g.K, 3) },
        { label: "Crossover T = ΔH°/ΔS°", value: showCross ? `${fmt(cx, 0)} K` : "none" },
        { label: "Verdict", value: verdict },
      ]}
      assumptions={[
        "ΔH° and ΔS° are treated as constant with temperature, which is a good approximation over moderate ranges.",
        "Favorable means ΔG° < 0 (K > 1); it says nothing about how fast the reaction goes.",
      ]}
    />
  );
}
