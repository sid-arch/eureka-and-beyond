// Chemistry simulations, part 6: Lewis structures and formal charge.
// Each structure is entered by hand (bonds and lone pairs); formal charges and the electron
// count are computed from it, so the readouts always match the picture.

import { useState } from "react";
import { Segmented, SimShell, type SimProps } from "./shell";

const W = 480;

type Atom = { el: string; x: number; y: number; lp: number; lpAngles: number[] };
type Bond = [number, number, 1 | 2 | 3];
type Structure = { label: string; atoms: Atom[]; bonds: Bond[] };
type Molecule = { name: string; formula: string; charge: number; structures: Structure[]; note: string };

const VALENCE: Record<string, number> = { H: 1, C: 4, N: 5, O: 6, S: 6, F: 7, Cl: 7 };
const EN: Record<string, number> = { H: 2.2, C: 2.55, N: 3.04, O: 3.44, S: 2.58, F: 3.98, Cl: 3.16 };

/** Formal charge = valence electrons − lone-pair electrons − ½ bonding electrons. */
export function formalCharge(el: string, lonePairs: number, bondOrderSum: number) {
  return VALENCE[el] - 2 * lonePairs - bondOrderSum;
}

export function analyze(s: Structure) {
  const orders = s.atoms.map((_, i) => s.bonds.filter((b) => b[0] === i || b[1] === i).reduce((a, b) => a + b[2], 0));
  const fc = s.atoms.map((a, i) => formalCharge(a.el, a.lp, orders[i]));
  const electrons = s.atoms.reduce((t, a) => t + 2 * a.lp, 0) + s.bonds.reduce((t, b) => t + 2 * b[2], 0);
  const octets = s.atoms.map((a, i) => 2 * a.lp + 2 * orders[i]);
  return { fc, electrons, octets, sumAbs: fc.reduce((t, f) => t + Math.abs(f), 0) };
}

const L = (el: string, x: number, y: number, lp: number, lpAngles: number[]): Atom => ({ el, x, y, lp, lpAngles });

export const MOLECULES: Record<string, Molecule> = {
  co2: {
    name: "Carbon dioxide", formula: "CO₂", charge: 0, note: "Two double bonds give every atom a formal charge of zero, so that structure is preferred.",
    structures: [
      { label: "O=C=O", atoms: [L("O", 110, 110, 2, [135, 225]), L("C", 240, 110, 0, []), L("O", 370, 110, 2, [45, 315])], bonds: [[0, 1, 2], [1, 2, 2]] },
      { label: "O≡C–O", atoms: [L("O", 110, 110, 1, [180]), L("C", 240, 110, 0, []), L("O", 370, 110, 3, [0, 90, 270])], bonds: [[0, 1, 3], [1, 2, 1]] },
    ],
  },
  scn: {
    name: "Thiocyanate ion", formula: "SCN⁻", charge: -1, note: "S–C≡N and S=C=N both keep charges small; S=C=N puts the −1 on N, the more electronegative atom, so it contributes most.",
    structures: [
      { label: "S=C=N", atoms: [L("S", 110, 110, 2, [135, 225]), L("C", 240, 110, 0, []), L("N", 370, 110, 2, [45, 315])], bonds: [[0, 1, 2], [1, 2, 2]] },
      { label: "S–C≡N", atoms: [L("S", 110, 110, 3, [90, 180, 270]), L("C", 240, 110, 0, []), L("N", 370, 110, 1, [0])], bonds: [[0, 1, 1], [1, 2, 3]] },
      { label: "S≡C–N", atoms: [L("S", 110, 110, 1, [180]), L("C", 240, 110, 0, []), L("N", 370, 110, 3, [0, 90, 270])], bonds: [[0, 1, 3], [1, 2, 1]] },
    ],
  },
  n2o: {
    name: "Nitrous oxide", formula: "N₂O", charge: 0, note: "N=N=O and N≡N–O both have charges of size 1; N≡N–O puts −1 on oxygen, the most electronegative atom.",
    structures: [
      { label: "N=N=O", atoms: [L("N", 110, 110, 2, [135, 225]), L("N", 240, 110, 0, []), L("O", 370, 110, 2, [45, 315])], bonds: [[0, 1, 2], [1, 2, 2]] },
      { label: "N≡N–O", atoms: [L("N", 110, 110, 1, [180]), L("N", 240, 110, 0, []), L("O", 370, 110, 3, [0, 90, 270])], bonds: [[0, 1, 3], [1, 2, 1]] },
      { label: "N–N≡O", atoms: [L("N", 110, 110, 3, [90, 180, 270]), L("N", 240, 110, 0, []), L("O", 370, 110, 1, [0])], bonds: [[0, 1, 1], [1, 2, 3]] },
    ],
  },
  o3: {
    name: "Ozone", formula: "O₃", charge: 0, note: "The two structures are equivalent resonance forms; the real molecule is an average, with two identical O–O bonds of order 1.5.",
    structures: [
      { label: "O=O–O", atoms: [L("O", 120, 160, 2, [150, 240]), L("O", 240, 80, 1, [90]), L("O", 360, 160, 3, [300, 30, 330])], bonds: [[0, 1, 2], [1, 2, 1]] },
      { label: "O–O=O", atoms: [L("O", 120, 160, 3, [210, 150, 240]), L("O", 240, 80, 1, [90]), L("O", 360, 160, 2, [300, 30])], bonds: [[0, 1, 1], [1, 2, 2]] },
    ],
  },
  no3: {
    name: "Nitrate ion", formula: "NO₃⁻", charge: -1, note: "Three equivalent resonance forms (the double bond can sit on any O); every N–O bond is really order 4/3.",
    structures: [
      { label: "one N=O", atoms: [L("N", 240, 120, 0, []), L("O", 240, 30, 2, [45, 135]), L("O", 140, 180, 3, [150, 210, 270]), L("O", 340, 180, 3, [30, 330, 270])], bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1]] },
    ],
  },
  so4: {
    name: "Sulfate ion", formula: "SO₄²⁻", charge: -2, note: "With only single bonds S carries +2. Two S=O bonds (an expanded octet, allowed for period 3) bring S to zero; both forms appear in textbooks, and experiments favour charge-separated bonding, so treat this as a formal-charge exercise.",
    structures: [
      { label: "all single", atoms: [L("S", 240, 110, 0, []), L("O", 240, 25, 3, [90, 30, 150]), L("O", 240, 195, 3, [270, 210, 330]), L("O", 130, 110, 3, [180, 120, 240]), L("O", 350, 110, 3, [0, 60, 300])], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] },
      { label: "two S=O", atoms: [L("S", 240, 110, 0, []), L("O", 240, 25, 2, [45, 135]), L("O", 240, 195, 2, [225, 315]), L("O", 130, 110, 3, [180, 120, 240]), L("O", 350, 110, 3, [0, 60, 300])], bonds: [[0, 1, 2], [0, 2, 2], [0, 3, 1], [0, 4, 1]] },
    ],
  },
};

const fcText = (f: number) => (f === 0 ? "0" : f > 0 ? `+${f}` : `−${-f}`);

export function LewisStructures({ params }: SimProps) {
  const keys = Object.keys(MOLECULES);
  const [mk, setMk] = useState(keys.includes(String(params?.molecule)) ? String(params?.molecule) : "scn");
  const [si, setSi] = useState(0);
  const m = MOLECULES[mk];
  const s = m.structures[Math.min(si, m.structures.length - 1)];
  const a = analyze(s);
  const all = m.structures.map(analyze);
  const best = (() => {
    // Smallest total |FC|; ties broken by putting negative charge on the most electronegative atom.
    const score = (st: Structure, an: ReturnType<typeof analyze>) => an.sumAbs * 10 - an.fc.reduce((t, f, i) => t + (f < 0 ? EN[st.atoms[i].el] : 0), 0);
    const scores = m.structures.map((st, i) => score(st, all[i]));
    if (scores.every((x) => Math.abs(x - scores[0]) < 1e-9)) return -1;
    return scores.indexOf(Math.min(...scores));
  })();
  const valence = s.atoms.reduce((t, at) => t + VALENCE[at.el], 0) - m.charge;
  const H = 230;
  return (
    <SimShell
      subject="chemistry"
      title="Lewis structures and formal charge"
      onReset={() => { setMk("scn"); setSi(0); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${m.formula}, structure ${s.label}: formal charges ${s.atoms.map((at, i) => `${at.el} ${fcText(a.fc[i])}`).join(", ")}.`} className="block h-auto w-full select-none">
          {s.bonds.map(([i, j, n], k) => {
            const A = s.atoms[i], B = s.atoms[j];
            const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy);
            const ux = dx / len, uy = dy / len, px = -uy, py = ux;
            const off = n === 1 ? [0] : n === 2 ? [-4, 4] : [-7, 0, 7];
            return off.map((o, q) => <line key={`${k}-${q}`} x1={A.x + ux * 20 + px * o} y1={A.y + uy * 20 + py * o} x2={B.x - ux * 20 + px * o} y2={B.y - uy * 20 + py * o} stroke="var(--ink)" strokeWidth={2.5} />);
          })}
          {s.atoms.map((at, i) => (
            <g key={i}>
              {at.lpAngles.slice(0, at.lp).map((ang, q) => {
                const r = ang * Math.PI / 180, cx = at.x + Math.cos(r) * 24, cy = at.y - Math.sin(r) * 24;
                const tx = -Math.sin(r) * 4, ty = -Math.cos(r) * 4;
                return <g key={q}><circle cx={cx + tx} cy={cy + ty} r={2.6} fill="var(--ink)" /><circle cx={cx - tx} cy={cy - ty} r={2.6} fill="var(--ink)" /></g>;
              })}
              <text x={at.x} y={at.y + 8} textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--chem)">{at.el}</text>
              {a.fc[i] !== 0 && <g><circle cx={at.x + 20} cy={at.y - 22} r={11} fill={a.fc[i] < 0 ? "var(--math)" : "var(--physics)"} /><text x={at.x + 20} y={at.y - 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{fcText(a.fc[i])}</text></g>}
            </g>
          ))}
          {m.charge !== 0 && <text x={W - 16} y={26} textAnchor="end" fontSize="13" fill="var(--muted)">overall charge {fcText(m.charge)}</text>}
          <text x={16} y={H - 10} fontSize="11" fill="var(--muted)">bubbles show nonzero formal charges</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Species" value={mk} options={keys.map((k) => ({ value: k, label: MOLECULES[k].formula }))} onChange={(v) => { setMk(v); setSi(0); }} />
          {m.structures.length > 1 && <Segmented label="Structure" value={String(Math.min(si, m.structures.length - 1))} options={m.structures.map((st, i) => ({ value: String(i), label: st.label }))} onChange={(v) => setSi(Number(v))} />}
          <p className="text-sm text-muted">{m.note}</p>
        </>
      }
      readouts={[
        { label: "Formal charges", value: s.atoms.map((at, i) => `${at.el} ${fcText(a.fc[i])}`).join(", "), emphasis: true },
        { label: "Sum of formal charges", value: fcText(a.fc.reduce((t, f) => t + f, 0)) },
        { label: "Electrons drawn / available", value: `${a.electrons} / ${valence}` },
        { label: "Best of these structures", value: best >= 0 ? m.structures[best].label : "equivalent resonance forms" },
      ]}
      assumptions={[
        "Formal charge = valence electrons − lone-pair electrons − ½(bonding electrons). The charges always add up to the species' overall charge.",
        "Preferred structures keep formal charges small and put negative charge on the more electronegative atom. Formal charge is bookkeeping, not the real charge distribution.",
      ]}
    />
  );
}
