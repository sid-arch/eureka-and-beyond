// Chemistry simulations, part 5: hydrogen energy levels and orbital filling diagrams.

import { useState } from "react";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;

// ---------------------------------------------------------------------------
// Hydrogen transitions (Bohr model energies)
// ---------------------------------------------------------------------------

export function hydrogenLine(nHigh: number, nLow: number) {
  const dE = 13.6057 * (1 / (nLow * nLow) - 1 / (nHigh * nHigh)); // eV
  const lambda = 1239.84 / dE; // nm
  const series = nLow === 1 ? "Lyman (ultraviolet)" : nLow === 2 ? "Balmer (visible)" : nLow === 3 ? "Paschen (infrared)" : nLow === 4 ? "Brackett (infrared)" : "Pfund (infrared)";
  return { dE, lambda, series };
}

/** Approximate colour of visible light, for display only. */
export function wavelengthColor(nm: number) {
  if (nm < 380 || nm > 750) return null;
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = (440 - nm) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = (510 - nm) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = (645 - nm) / 65; }
  else r = 1;
  const to = (v: number) => Math.round(255 * Math.pow(v, 0.8));
  return `rgb(${to(r)},${to(g)},${to(b)})`;
}

export function BohrTransitions({ params }: SimProps) {
  const [hi, setHi] = useState(Math.round(num(params, "upper", 3, 2, 6)));
  const [lo, setLo] = useState(Math.round(num(params, "lower", 2, 1, 5)));
  const [mode, setMode] = useState<"emission" | "absorption">(params?.mode === "absorption" ? "absorption" : "emission");
  const nLow = Math.min(lo, hi - 1);
  const L = hydrogenLine(hi, nLow);
  const color = wavelengthColor(L.lambda);
  const H = 280;
  const E = (n: number) => -13.6057 / (n * n);
  const sy = scale(-14, 0.5, 250, 20);
  const levels = [1, 2, 3, 4, 5, 6];
  const spec = scale(380, 750, 280, W - 14);
  const balmer = [3, 4, 5, 6].map((n) => hydrogenLine(n, 2).lambda);
  const from = mode === "emission" ? hi : nLow, to = mode === "emission" ? nLow : hi;
  return (
    <SimShell
      subject="chemistry"
      title="Hydrogen energy levels and spectra"
      onReset={() => { setHi(3); setLo(2); setMode("emission"); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${mode === "emission" ? "Emission" : "Absorption"} between n = ${hi} and n = ${nLow}: ${fmt(L.dE, 3)} eV, ${fmt(L.lambda, 1)} nm, ${L.series}.`} className="block h-auto w-full select-none">
          <defs><marker id="bohr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--chem)" /></marker></defs>
          {levels.map((n) => (
            <g key={n}>
              <line x1={60} x2={220} y1={sy(E(n))} y2={sy(E(n))} stroke={n === hi || n === nLow ? "var(--ink)" : "var(--line)"} strokeWidth={n === hi || n === nLow ? 2.5 : 1.5} />
              {(n <= 3 || n === hi || n === nLow) && <text x={54} y={sy(E(n)) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">n={n}</text>}
              {n <= 3 && <text x={226} y={sy(E(n)) + 4} fontSize="10" fill="var(--muted)">{fmt(E(n), 2)} eV</text>}
            </g>
          ))}
          <line x1={60} x2={220} y1={sy(0)} y2={sy(0)} stroke="var(--line)" strokeDasharray="4 3" />
          <text x={226} y={sy(0) + 4} fontSize="10" fill="var(--muted)">0 (ionized)</text>
          <line x1={140} x2={140} y1={sy(E(from))} y2={sy(E(to)) + (mode === "emission" ? -6 : 6)} stroke="var(--chem)" strokeWidth={3} markerEnd="url(#bohr-arrow)" />
          <path d={`M${mode === "emission" ? 150 : 110},${(sy(E(hi)) + sy(E(nLow))) / 2} q8,-8 16,0 t16,0 t16,0`} fill="none" stroke={color ?? "var(--muted)"} strokeWidth={2.5} transform={mode === "emission" ? "" : "translate(-40 0)"} />
          <text x={380} y={40} textAnchor="middle" fontSize="11" fill="var(--muted)">visible spectrum (nm)</text>
          {Array.from({ length: 74 }, (_, i) => { const nm = 380 + i * 5; return <rect key={i} x={spec(nm)} y={50} width={spec(nm + 5) - spec(nm) + 0.5} height={34} fill={wavelengthColor(nm) ?? "#000"} opacity={mode === "absorption" ? 1 : 0.15} />; })}
          {mode === "emission" && <rect x={spec(380)} y={50} width={spec(750) - spec(380)} height={34} fill="#111" opacity={0.85} />}
          {balmer.map((b, i) => <line key={i} x1={spec(b)} x2={spec(b)} y1={50} y2={84} stroke={mode === "emission" ? (wavelengthColor(b) ?? "#fff") : "#111"} strokeWidth={mode === "emission" ? 2 : 2.5} opacity={L.lambda === b ? 1 : 0.35} />)}
          {color && <line x1={spec(L.lambda)} x2={spec(L.lambda)} y1={46} y2={88} stroke={mode === "emission" ? color : "#111"} strokeWidth={4} />}
          {[400, 500, 600, 700].map((nm) => <text key={nm} x={spec(nm)} y={100} textAnchor="middle" fontSize="10" fill="var(--muted)">{nm}</text>)}
          {!color && <text x={380} y={124} textAnchor="middle" fontSize="11" fill="var(--ink)">{fmt(L.lambda, 0)} nm is outside the visible range</text>}
          <text x={380} y={170} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">{L.series}</text>
          <text x={380} y={192} textAnchor="middle" fontSize="12" fill="var(--muted)">{mode === "emission" ? "photon given off" : "photon absorbed"}</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Process" value={mode} options={[{ value: "emission", label: "Emission" }, { value: "absorption", label: "Absorption" }]} onChange={setMode} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Upper level" value={hi} min={2} max={6} step={1} onChange={(v) => { setHi(v); if (lo >= v) setLo(v - 1); }} />
            <Slider label="Lower level" value={nLow} min={1} max={hi - 1} step={1} onChange={setLo} />
          </div>
        </>
      }
      readouts={[
        { label: "Photon energy ΔE", value: `${fmt(L.dE, 3)} eV`, emphasis: true },
        { label: "Wavelength λ = hc/ΔE", value: `${fmt(L.lambda, 1)} nm` },
        { label: "Frequency", value: `${((2.998e8 / (L.lambda * 1e-9)) / 1e14).toFixed(2)} × 10¹⁴ Hz` },
        { label: "Series", value: L.series },
      ]}
      assumptions={[
        "Hydrogen energy levels Eₙ = −13.6 eV/n² (Bohr model, which matches the measured hydrogen spectrum closely).",
        "Colours on screen are approximate; the faint lines in the visible strip are the four visible Balmer lines.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Orbital filling diagrams (Z = 1–36)
// ---------------------------------------------------------------------------

const ORDER = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"] as const;
const CAP: Record<string, number> = { s: 2, p: 6, d: 10 };
const SYMBOLS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"];
const NOBLE: Record<number, string> = { 2: "He", 10: "Ne", 18: "Ar" };

/** Ground-state configuration as subshell → electrons, including the Cr and Cu exceptions. */
export function configuration(Z: number) {
  const fill: Record<string, number> = {};
  let left = Z;
  for (const sub of ORDER) { const n = Math.min(left, CAP[sub[1]]); if (n > 0) fill[sub] = n; left -= n; }
  if (Z === 24) { fill["4s"] = 1; fill["3d"] = 5; }
  if (Z === 29) { fill["4s"] = 1; fill["3d"] = 10; }
  return fill;
}

/** Electrons in each orbital of a subshell, filled by Hund's rule: one each, then pairs. */
export function hund(sub: string, count: number) {
  const k = CAP[sub[1]] / 2;
  return Array.from({ length: k }, (_, i) => (count >= k + i + 1 ? 2 : count > i ? 1 : 0));
}

export function OrbitalFiller({ params }: SimProps) {
  const [Z, setZ] = useState(Math.round(num(params, "Z", 8, 1, 36)));
  const fill = configuration(Z);
  const shown = ORDER.filter((s) => fill[s]);
  const config = shown.map((s) => `${s}${sup(fill[s])}`).join(" ");
  const core = [18, 10, 2].find((n) => n < Z && ORDER.slice(0, n === 18 ? 5 : n === 10 ? 3 : 1).every((s) => fill[s] === CAP[s[1]]));
  const coreSubs = core === 18 ? 5 : core === 10 ? 3 : core === 2 ? 1 : 0;
  const short = core ? `[${NOBLE[core]}] ${ORDER.slice(coreSubs).filter((s) => fill[s]).map((s) => `${s}${sup(fill[s])}`).join(" ")}` : config;
  const unpaired = shown.reduce((a, s) => a + hund(s, fill[s]).filter((e) => e === 1).length, 0);
  const H = 250;
  // Diagram: subshells in energy order, bottom to top, staggered by shell.
  const rows = ORDER.slice(0, Math.max(1, ORDER.findIndex((s) => s === shown[shown.length - 1]) + 1));
  const rowY = (i: number) => 230 - i * 26;
  const box = 26;
  return (
    <SimShell
      subject="chemistry"
      title="Orbital filling diagrams"
      onReset={() => setZ(8)}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${SYMBOLS[Z - 1]} (Z = ${Z}): ${config}; ${unpaired} unpaired electron${unpaired === 1 ? "" : "s"}.`} className="block h-auto w-full select-none">
          <text x={20} y={34} fontSize="28" fontWeight="700" fill="var(--chem)">{SYMBOLS[Z - 1]}</text>
          <text x={20} y={54} fontSize="11" fill="var(--muted)">Z = {Z}</text>
          <text x={14} y={rowY(0) - 70} fontSize="10" fill="var(--muted)" transform={`rotate(-90 14 ${rowY(0) - 70})`} textAnchor="middle">energy →</text>
          {rows.map((s, i) => {
            const e = hund(s, fill[s] ?? 0);
            const x0 = 90 + (s[1] === "s" ? 0 : s[1] === "p" ? 70 : 160);
            return (
              <g key={s}>
                <text x={x0 - 8} y={rowY(i) + 5} textAnchor="end" fontSize="12" fontWeight="600" fill={fill[s] ? "var(--ink)" : "var(--muted)"}>{s}</text>
                {e.map((n, k) => (
                  <g key={k}>
                    <rect x={x0 + k * box} y={rowY(i) - box / 2 + 2} width={box} height={box - 4} fill={n ? "var(--chem-soft, var(--sunken))" : "var(--surface)"} stroke="var(--muted)" />
                    {n >= 1 && <text x={x0 + k * box + (n === 2 ? 8 : 13)} y={rowY(i) + 7} textAnchor="middle" fontSize="16" fill="var(--ink)">↑</text>}
                    {n === 2 && <text x={x0 + k * box + 18} y={rowY(i) + 7} textAnchor="middle" fontSize="16" fill="var(--ink)">↓</text>}
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      }
      controls={
        <>
          <Slider label="Atomic number Z" value={Z} min={1} max={36} step={1} format={(v) => `${v} (${SYMBOLS[v - 1]})`} onChange={setZ} />
          {(Z === 24 || Z === 29) && <p className="text-sm text-muted">{SYMBOLS[Z - 1]} is an exception: one 4s electron moves to 3d, giving a {Z === 24 ? "half-filled" : "filled"} 3d subshell, which is lower in energy.</p>}
        </>
      }
      readouts={[
        { label: "Configuration", value: config, emphasis: true },
        { label: "Noble-gas shorthand", value: short },
        { label: "Unpaired electrons", value: String(unpaired) },
        { label: "Valence electrons", value: String(valence(Z, fill)) },
      ]}
      assumptions={[
        "Aufbau order 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, with Hund's rule (one electron per orbital before pairing) and the Pauli principle (two per orbital, opposite spins).",
        "Ground-state neutral atoms only; Cr and Cu use their measured configurations.",
      ]}
    />
  );
}

function sup(n: number) {
  const d = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  return String(n).split("").map((c) => d[Number(c)]).join("");
}

function valence(Z: number, fill: Record<string, number>) {
  const n = Z > 18 ? 4 : Z > 10 ? 3 : Z > 2 ? 2 : 1;
  return Object.entries(fill).filter(([s]) => Number(s[0]) === n).reduce((a, [, v]) => a + v, 0);
}

