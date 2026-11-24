// Chemistry simulations, part 3: galvanic cells, buffers, photoelectron spectra and Beer–Lambert.
// Each computes its results from the stated equations.

import { useMemo, useState } from "react";
import { fmt, num, scale, SimShell, Slider, type SimProps } from "./shell";

const W = 480;

// ---------------------------------------------------------------------------
// Galvanic cell with the Nernst equation
// ---------------------------------------------------------------------------

const HALF: Record<string, { ion: string; n: number; E: number }> = {
  Mg: { ion: "Mg²⁺", n: 2, E: -2.37 },
  Al: { ion: "Al³⁺", n: 3, E: -1.66 },
  Zn: { ion: "Zn²⁺", n: 2, E: -0.76 },
  Fe: { ion: "Fe²⁺", n: 2, E: -0.44 },
  Ni: { ion: "Ni²⁺", n: 2, E: -0.25 },
  Pb: { ion: "Pb²⁺", n: 2, E: -0.13 },
  Cu: { ion: "Cu²⁺", n: 2, E: 0.34 },
  Ag: { ion: "Ag⁺", n: 1, E: 0.8 },
};
const METALS = Object.keys(HALF);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

export function cellPotential(left: string, right: string, cLeft: number, cRight: number) {
  const L = HALF[left], R = HALF[right];
  const leftIsCathode = L.E > R.E;
  const cat = leftIsCathode ? left : right, an = leftIsCathode ? right : left;
  const cCat = leftIsCathode ? cLeft : cRight, cAn = leftIsCathode ? cRight : cLeft;
  const nCat = HALF[cat].n, nAn = HALF[an].n;
  const n = (nCat * nAn) / gcd(nCat, nAn);
  const E0 = HALF[cat].E - HALF[an].E;
  // aAn(s) + bCat^(nCat+) -> aAn^(nAn+) + bCat(s), with a = n/nAn, b = n/nCat
  const Q = Math.pow(cAn, n / nAn) / Math.pow(cCat, n / nCat);
  const E = E0 - (0.05916 / n) * Math.log10(Q);
  return { cat, an, n, E0, E, Q, dG: (-n * 96485 * E) / 1000 };
}

export function GalvanicCell({ params }: SimProps) {
  const [left, setLeft] = useState(typeof params?.left === "string" && params.left in HALF ? params.left : "Zn");
  const [right, setRight] = useState(typeof params?.right === "string" && params.right in HALF ? params.right : "Cu");
  const [cL, setCL] = useState(num(params, "leftConc", 1, 0.001, 2));
  const [cR, setCR] = useState(num(params, "rightConc", 1, 0.001, 2));
  const same = left === right;
  const c = cellPotential(left, right, cL, cR);
  const H = 250;
  const beaker = (x: number, metal: string, role: string) => (
    <g>
      <path d={`M${x},90 V200 H${x + 140} V90`} fill="none" stroke="var(--muted)" strokeWidth={2.5} />
      <rect x={x + 2} y={120} width={136} height={78} fill="var(--chem)" opacity={0.15} />
      <rect x={x + 58} y={60} width={24} height={110} fill={metal === "Cu" ? "#c4733b" : metal === "Ag" ? "#b8bcc4" : metal === "Zn" ? "#8e9aa6" : "#7b8794"} rx={2} />
      <text x={x + 70} y={52} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{metal}</text>
      <text x={x + 70} y={190} textAnchor="middle" fontSize="11" fill="var(--muted)">{HALF[metal].ion}</text>
      {!same && <text x={x + 70} y={222} textAnchor="middle" fontSize="12" fontWeight="600" fill={role === "anode" ? "var(--math)" : "var(--physics)"}>{role} ({role === "anode" ? "−" : "+"})</text>}
    </g>
  );
  const leftRole = c.an === left ? "anode" : "cathode";
  return (
    <SimShell
      subject="chemistry"
      title="Galvanic cell"
      onReset={() => { setLeft("Zn"); setRight("Cu"); setCL(1); setCR(1); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={same ? "Both electrodes are the same metal, so there is no standard cell potential." : `${c.an} anode and ${c.cat} cathode: E° = ${fmt(c.E0, 2)} V, E = ${fmt(c.E, 3)} V.`} className="block h-auto w-full select-none">
          {beaker(40, left, leftRole)}
          {beaker(W - 180, right, leftRole === "anode" ? "cathode" : "anode")}
          <path d={`M180,130 V105 H${W - 180} V130`} fill="none" stroke="var(--line)" strokeWidth={14} strokeLinejoin="round" />
          <text x={W / 2} y={100} textAnchor="middle" fontSize="10" fill="var(--muted)">salt bridge</text>
          <path d={`M110,60 V22 H${W - 110} V60`} fill="none" stroke="var(--ink)" strokeWidth={2} />
          <circle cx={W / 2} cy={22} r={16} fill="var(--surface, #fff)" stroke="var(--ink)" strokeWidth={2} />
          <text x={W / 2} y={26} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{same ? "0" : fmt(c.E, 2)}V</text>
          {!same && (leftRole === "anode"
            ? <path d={`M${W / 2 - 60},14 l14,-6 v12 z`} transform={`translate(30,8)`} fill="var(--chem)" />
            : <path d={`M${W / 2 + 60},14 l-14,-6 v12 z`} transform={`translate(-30,8)`} fill="var(--chem)" />)}
          {!same && <text x={W / 2} y={52} textAnchor="middle" fontSize="10" fill="var(--muted)">electrons flow {leftRole === "anode" ? "left → right" : "right → left"}</text>}
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-medium">Left electrode
              <select className="mt-1 block w-full rounded-md border border-line bg-surface p-2" value={left} onChange={(e) => setLeft(e.target.value)}>{METALS.map((m) => <option key={m} value={m}>{m} | {HALF[m].ion} ({HALF[m].E > 0 ? "+" : ""}{HALF[m].E.toFixed(2)} V)</option>)}</select>
            </label>
            <label className="text-sm font-medium">Right electrode
              <select className="mt-1 block w-full rounded-md border border-line bg-surface p-2" value={right} onChange={(e) => setRight(e.target.value)}>{METALS.map((m) => <option key={m} value={m}>{m} | {HALF[m].ion} ({HALF[m].E > 0 ? "+" : ""}{HALF[m].E.toFixed(2)} V)</option>)}</select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Slider label={`[${HALF[left].ion}]`} value={cL} min={0.001} max={2} step={0.001} unit="M" onChange={setCL} />
            <Slider label={`[${HALF[right].ion}]`} value={cR} min={0.001} max={2} step={0.001} unit="M" onChange={setCR} />
          </div>
        </>
      }
      readouts={same ? [{ label: "Cell", value: "choose two different metals", emphasis: true }] : [
        { label: "Standard potential E°", value: `${fmt(c.E0, 2)} V` },
        { label: "Cell potential E (Nernst)", value: `${fmt(c.E, 3)} V`, emphasis: true },
        { label: "Electrons transferred n", value: String(c.n) },
        { label: "ΔG", value: `${fmt(c.dG, 1)} kJ/mol` },
      ]}
      assumptions={[
        "Standard reduction potentials at 25 °C; the half-cell with the higher potential is the cathode (reduction), the other the anode (oxidation).",
        "E = E° − (0.05916/n) log Q, where Q uses the ion concentrations raised to their coefficients in the balanced overall reaction; solid metals are left out.",
        "ΔG = −nFE with F = 96,485 C/mol. Activities are taken equal to concentrations.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Buffer: acetic acid / acetate vs pure water
// ---------------------------------------------------------------------------

const KA = 1.8e-5, KW = 1e-14;

export function bufferPH(ha: number, a: number, added: number) {
  // 1.00 L; added > 0 is mol NaOH, added < 0 is mol HCl
  const C = ha + a, Na = a + Math.max(0, added), Cl = Math.max(0, -added);
  const f = (h: number) => h + Na - (KA * C) / (KA + h) - KW / h - Cl;
  let lo = -14, hi = 1;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(10 ** m) > 0) hi = m; else lo = m; }
  return -(lo + hi) / 2;
}
export function waterPH(added: number) {
  const d = -added; // net strong acid, mol/L
  const h = (d + Math.sqrt(d * d + 4 * KW)) / 2;
  return -Math.log10(h);
}

export function Buffer({ params }: SimProps) {
  const [ha, setHa] = useState(num(params, "acid", 0.1, 0.01, 0.5));
  const [a, setA] = useState(num(params, "base", 0.1, 0.01, 0.5));
  const [added, setAdded] = useState(num(params, "added", 0.02, -0.2, 0.2));
  const H = 250;
  const sx = scale(-0.2, 0.2, 46, W - 12), sy = scale(0, 14, 215, 12);
  const pts = useMemo(() => Array.from({ length: 201 }, (_, i) => -0.2 + (0.4 * i) / 200), []);
  const bCurve = pts.map((x, i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(bufferPH(ha, a, x)).toFixed(1)}`).join("");
  const wCurve = pts.map((x, i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(waterPH(x)).toFixed(1)}`).join("");
  const pH0 = bufferPH(ha, a, 0), pH1 = bufferPH(ha, a, added);
  const hh = 4.74 + Math.log10(a / ha);
  return (
    <SimShell
      subject="chemistry"
      title="Buffers"
      onReset={() => { setHa(0.1); setA(0.1); setAdded(0.02); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Acetate buffer: pH ${fmt(pH0, 2)} before and ${fmt(pH1, 2)} after adding ${fmt(Math.abs(added), 3)} mol of ${added >= 0 ? "NaOH" : "HCl"}; pure water would reach pH ${fmt(waterPH(added), 2)}.`} className="block h-auto w-full select-none">
          <line x1={sx(-0.2)} y1={sy(0)} x2={sx(0.2)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(14)} stroke="var(--line)" strokeDasharray="3 4" />
          {[0, 7, 14].map((p) => <text key={p} x={sx(-0.2) - 6} y={sy(p) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">pH {p}</text>)}
          <text x={sx(-0.2)} y={sy(0) + 16} fontSize="10" fill="var(--muted)">0.2 mol HCl</text>
          <text x={sx(0.2)} y={sy(0) + 16} textAnchor="end" fontSize="10" fill="var(--muted)">0.2 mol NaOH</text>
          <path d={wCurve} fill="none" stroke="var(--muted)" strokeWidth={2} strokeDasharray="5 4" />
          <path d={bCurve} fill="none" stroke="var(--chem)" strokeWidth={2.5} />
          <circle cx={sx(added)} cy={sy(pH1)} r={5} fill="var(--physics)" />
          <circle cx={sx(added)} cy={sy(waterPH(added))} r={4} fill="var(--muted)" />
          <text x={W - 12} y={sy(0) + 32} textAnchor="end" fontSize="11" fill="var(--muted)">solid: buffer · dashed: pure water (1.00 L each)</text>
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Acetic acid" value={ha} min={0.01} max={0.5} step={0.01} unit="mol" onChange={setHa} />
            <Slider label="Sodium acetate" value={a} min={0.01} max={0.5} step={0.01} unit="mol" onChange={setA} />
          </div>
          <Slider label="Strong acid (−) or base (+) added" value={added} min={-0.2} max={0.2} step={0.005} unit="mol" onChange={setAdded} />
        </>
      }
      readouts={[
        { label: "Buffer pH before", value: fmt(pH0, 2) },
        { label: "Buffer pH after", value: fmt(pH1, 2), emphasis: true },
        { label: "Pure water after", value: fmt(waterPH(added), 2) },
        { label: "Henderson–Hasselbalch estimate (before)", value: fmt(hh, 2) },
      ]}
      assumptions={[
        "1.00 L of solution; acetic acid Ka = 1.8 × 10⁻⁵ (pKa 4.74); 25 °C; volume change from additions ignored.",
        "pH is found from the exact charge balance, so it stays correct when the buffer is used up.",
        "Henderson–Hasselbalch, pH = pKa + log([A⁻]/[HA]), is the shortcut that works while both components are plentiful.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Photoelectron spectroscopy (PES) for H–Ar
// ---------------------------------------------------------------------------

// Approximate binding energies in MJ/mol by subshell: [label, energy, electrons]
const PES: Record<string, [string, number, number][]> = {
  H: [["1s", 1.31, 1]], He: [["1s", 2.37, 2]],
  Li: [["1s", 6.26, 2], ["2s", 0.52, 1]], Be: [["1s", 11.5, 2], ["2s", 0.9, 2]],
  B: [["1s", 19.3, 2], ["2s", 1.36, 2], ["2p", 0.8, 1]], C: [["1s", 28.6, 2], ["2s", 1.72, 2], ["2p", 1.09, 2]],
  N: [["1s", 39.6, 2], ["2s", 2.45, 2], ["2p", 1.4, 3]], O: [["1s", 52.6, 2], ["2s", 3.04, 2], ["2p", 1.31, 4]],
  F: [["1s", 67.2, 2], ["2s", 3.88, 2], ["2p", 1.68, 5]], Ne: [["1s", 84.0, 2], ["2s", 4.68, 2], ["2p", 2.08, 6]],
  Na: [["1s", 104, 2], ["2s", 6.84, 2], ["2p", 3.67, 6], ["3s", 0.5, 1]], Mg: [["1s", 126, 2], ["2s", 9.07, 2], ["2p", 5.31, 6], ["3s", 0.74, 2]],
  Al: [["1s", 151, 2], ["2s", 12.1, 2], ["2p", 7.79, 6], ["3s", 1.09, 2], ["3p", 0.58, 1]],
  Si: [["1s", 178, 2], ["2s", 15.1, 2], ["2p", 10.3, 6], ["3s", 1.46, 2], ["3p", 0.79, 2]],
  P: [["1s", 208, 2], ["2s", 18.7, 2], ["2p", 13.5, 6], ["3s", 1.95, 2], ["3p", 1.06, 3]],
  S: [["1s", 239, 2], ["2s", 22.7, 2], ["2p", 16.5, 6], ["3s", 2.05, 2], ["3p", 1.0, 4]],
  Cl: [["1s", 273, 2], ["2s", 26.8, 2], ["2p", 20.2, 6], ["3s", 2.44, 2], ["3p", 1.25, 5]],
  Ar: [["1s", 309, 2], ["2s", 31.5, 2], ["2p", 24.1, 6], ["3s", 2.82, 2], ["3p", 1.52, 6]],
};
const PES_ELEMENTS = Object.keys(PES);

export function PhotoelectronSpectrum({ params }: SimProps) {
  const [el, setEl] = useState(typeof params?.element === "string" && params.element in PES ? params.element : "O");
  const peaks = PES[el];
  const H = 240;
  // log scale, high energy on the left (AP convention)
  const lx = scale(Math.log10(400), Math.log10(0.3), 30, W - 20);
  const sy = scale(0, 6.5, 200, 20);
  const sup = (k: number) => String(k).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join("");
  const config = peaks.map(([l, , n]) => `${l}${sup(n)}`).join(" ");
  return (
    <SimShell
      subject="chemistry"
      title="Photoelectron spectroscopy"
      onReset={() => setEl("O")}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`PES of ${el}: ${peaks.map(([l, e, n]) => `${l} peak at ${e} MJ/mol with ${n} electron${n > 1 ? "s" : ""}`).join("; ")}.`} className="block h-auto w-full select-none">
          <line x1={30} y1={sy(0)} x2={W - 20} y2={sy(0)} stroke="var(--muted)" />
          {[100, 10, 1].map((v) => <g key={v}><line x1={lx(Math.log10(v))} y1={sy(0)} x2={lx(Math.log10(v))} y2={sy(0) + 5} stroke="var(--muted)" /><text x={lx(Math.log10(v))} y={sy(0) + 17} textAnchor="middle" fontSize="10" fill="var(--muted)">{v}</text></g>)}
          <text x={W / 2} y={sy(0) + 34} textAnchor="middle" fontSize="11" fill="var(--muted)">binding energy (MJ/mol, log scale; higher energy on the left)</text>
          {peaks.map(([l, e, n]) => {
            const x = lx(Math.log10(e));
            return (
              <g key={l}>
                <rect x={x - 7} y={sy(n)} width={14} height={sy(0) - sy(n)} rx={2} fill={l.endsWith("s") ? "var(--chem)" : "var(--physics)"} />
                <text x={x} y={sy(n) - 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{l}</text>
                <text x={x} y={sy(n) - 5} textAnchor="middle" fontSize="10" fill="var(--muted)">{e}</text>
              </g>
            );
          })}
        </svg>
      }
      controls={
        <label className="text-sm font-medium">Element
          <select className="mt-1 block w-full rounded-md border border-line bg-surface p-2" value={el} onChange={(e) => setEl(e.target.value)}>{PES_ELEMENTS.map((x) => <option key={x} value={x}>{x}</option>)}</select>
        </label>
      }
      readouts={[
        { label: "Electron configuration", value: config, emphasis: true },
        { label: "Number of peaks", value: String(peaks.length) },
        { label: "Lowest binding energy (valence)", value: `${peaks[peaks.length - 1][1]} MJ/mol` },
      ]}
      assumptions={[
        "Peak height is proportional to the number of electrons in the subshell; peak position is the energy needed to remove one of them.",
        "Binding energies are approximate literature values for gaseous atoms, used in AP Chemistry materials.",
        "The scale is logarithmic so core (1s) and valence peaks fit on one axis.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Beer–Lambert law
// ---------------------------------------------------------------------------

export function BeerLambert({ params }: SimProps) {
  const [eps, setEps] = useState(num(params, "absorptivity", 5000, 500, 20000)); // M⁻¹cm⁻¹
  const [b, setB] = useState(num(params, "path", 1, 0.5, 2)); // cm
  const [c, setC] = useState(num(params, "concentration", 0.0001, 0, 0.0004)); // M
  const A = eps * b * c;
  const T = Math.pow(10, -A);
  const H = 240;
  const sx = scale(0, 0.0004, 210, W - 14), sy = scale(0, 4, 205, 20);
  const line = `M${sx(0)},${sy(0)} L${sx(0.0004)},${sy(eps * b * 0.0004)}`;
  return (
    <SimShell
      subject="chemistry"
      title="Beer–Lambert law"
      onReset={() => { setEps(5000); setB(1); setC(0.0001); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Absorbance ${fmt(A, 3)}, transmittance ${fmt(T * 100, 1)}% for ${fmt(c * 1e6, 0)} μM in a ${fmt(b)} cm cell.`} className="block h-auto w-full select-none">
          <rect x={20} y={60} width={20} height={100} fill="#f5d76e" opacity={0.9} />
          <text x={30} y={52} textAnchor="middle" fontSize="10" fill="var(--muted)">light</text>
          <line x1={40} y1={110} x2={70} y2={110} stroke="#f5d76e" strokeWidth={10} />
          <rect x={70} y={60} width={30 + b * 30} height={100} fill="var(--math)" opacity={Math.min(0.9, 0.05 + A / 3)} stroke="var(--muted)" />
          <text x={85 + b * 15} y={178} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(b)} cm</text>
          <line x1={100 + b * 30} y1={110} x2={190} y2={110} stroke="#f5d76e" strokeWidth={10} opacity={Math.max(0.05, T)} />
          <text x={170} y={95} textAnchor="middle" fontSize="10" fill="var(--muted)">{fmt(T * 100, 0)}%</text>
          <line x1={sx(0)} y1={sy(0)} x2={sx(0.0004)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(4)} stroke="var(--muted)" />
          <text x={sx(0) - 4} y={sy(4) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">A 4</text>
          <text x={sx(0.0004)} y={sy(0) + 16} textAnchor="end" fontSize="10" fill="var(--muted)">400 μM</text>
          <path d={line} stroke="var(--chem)" strokeWidth={2.5} />
          <circle cx={sx(c)} cy={sy(Math.min(A, 4))} r={5} fill="var(--physics)" />
          <text x={(sx(0) + sx(0.0004)) / 2} y={sy(0) + 30} textAnchor="middle" fontSize="11" fill="var(--muted)">absorbance against concentration</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Concentration" value={c * 1e6} min={0} max={400} step={5} unit="μM" onChange={(v) => setC(v / 1e6)} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Path length b" value={b} min={0.5} max={2} step={0.1} unit="cm" onChange={setB} />
            <Slider label="Molar absorptivity ε" value={eps} min={500} max={20000} step={500} unit="M⁻¹cm⁻¹" onChange={setEps} />
          </div>
        </>
      }
      readouts={[
        { label: "Absorbance A = εbc", value: fmt(A, 3), emphasis: true },
        { label: "Transmittance", value: `${fmt(T * 100, 1)}%` },
      ]}
      assumptions={[
        "Monochromatic light at the wavelength of maximum absorbance; A = εbc and T = 10^(−A).",
        "The law is linear only for dilute solutions; above A ≈ 2 almost no light gets through and real instruments become unreliable.",
      ]}
    />
  );
}
