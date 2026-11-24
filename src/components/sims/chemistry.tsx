// Chemistry simulations.

import { useMemo, useRef, useState } from "react";
import { cx } from "../ui";
import { fmt, num, scale, Segmented, SimShell, Slider, useAnimation, usePrefersReducedMotion, type SimProps } from "./shell";

// ---------------------------------------------------------------------------
// Ideal gas law
// ---------------------------------------------------------------------------

export const R_LATM = 0.082057;
type Held = "T" | "V" | "P";

export function IdealGas({ params }: SimProps) {
  const init = {
    n: num(params, "n", 1, 0.1, 3),
    T: num(params, "T", 300, 50, 1000),
    V: num(params, "V", 22.4, 5, 50),
    hold: (["T", "V", "P"].includes(String(params?.hold)) ? params?.hold : "T") as Held,
  };
  const [n, setN] = useState(init.n);
  const [T, setT] = useState(init.T);
  const [V, setV] = useState(init.V);
  const [hold, setHold] = useState<Held>(init.hold);
  const [Pfixed, setPfixed] = useState((init.n * R_LATM * init.T) / init.V);
  const reduce = usePrefersReducedMotion();

  // With pressure held, volume follows from V = nRT/P; otherwise P = nRT/V.
  const vol = hold === "P" ? Math.min(60, (n * R_LATM * T) / Pfixed) : V;
  const P = (n * R_LATM * T) / vol;

  const W = 480;
  const H = 300;
  const boxW = scale(0, 60, 0, 380)(vol);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const count = Math.round(n * 24);
  if (particles.current.length !== count) {
    particles.current = Array.from({ length: count }, (_, i) => particles.current[i] ?? {
      x: Math.random(), y: Math.random(), vx: Math.random() - 0.5, vy: Math.random() - 0.5,
    });
  }
  const [, force] = useState(0);
  const speed = 0.35 * Math.sqrt(T / 300);
  useAnimation(!reduce, (dt) => {
    for (const p of particles.current) {
      const norm = Math.hypot(p.vx, p.vy) || 1;
      p.x += (p.vx / norm) * speed * dt * (380 / boxW);
      p.y += (p.vy / norm) * speed * dt;
      if (p.x < 0 || p.x > 1) { p.vx *= -1; p.x = Math.max(0, Math.min(1, p.x)); }
      if (p.y < 0 || p.y > 1) { p.vy *= -1; p.y = Math.max(0, Math.min(1, p.y)); }
    }
    force((f) => f + 1);
  });
  const x0 = 40;
  const y0 = 40;
  const bh = 200;
  return (
    <SimShell
      subject="chemistry"
      title="Ideal gas law"
      onReset={() => { setN(init.n); setT(init.T); setV(init.V); setHold(init.hold); setPfixed((init.n * R_LATM * init.T) / init.V); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Gas at ${fmt(P, 2)} atm, ${fmt(vol, 1)} L, ${fmt(T, 0)} K`} className="block h-auto w-full">
          <rect x={x0} y={y0} width={boxW} height={bh} fill="var(--chem-soft)" stroke="var(--chem)" strokeWidth={3} rx={4} />
          <rect x={x0 + boxW} y={y0 - 10} width={12} height={bh + 20} rx={3} fill="var(--ink)" />
          <line x1={x0 + boxW + 12} x2={460} y1={y0 + bh / 2} y2={y0 + bh / 2} stroke="var(--ink)" strokeWidth={6} />
          {particles.current.map((p, i) => (
            <circle key={i} cx={x0 + 5 + p.x * (boxW - 10)} cy={y0 + 5 + p.y * (bh - 10)} r={4} fill="var(--chem)" />
          ))}
          <text x={x0} y={y0 + bh + 26} fontSize="12" fill="var(--muted)">Particle speed scales with √T. Count scales with n.</text>
        </svg>
      }
      controls={
        <>
          <Segmented<Held> label="Hold constant" value={hold} options={[{ value: "T", label: "Temperature" }, { value: "V", label: "Volume" }, { value: "P", label: "Pressure" }]}
            onChange={(h) => { if (h === "P") setPfixed(P); if (hold === "P") setV(vol); setHold(h); }} />
          <Slider label="Amount n" value={n} min={0.1} max={3} step={0.05} unit="mol" onChange={setN} />
          <Slider label="Temperature T" value={T} min={50} max={1000} step={1} unit="K" disabled={hold === "T"} onChange={setT} />
          {hold === "T" && <p className="-mt-2 text-xs text-muted">Temperature is held constant.</p>}
          <Slider label="Volume V" value={vol} min={5} max={60} step={0.1} unit="L" disabled={hold !== "T"} onChange={setV} />
          {hold !== "T" && <p className="-mt-2 text-xs text-muted">{hold === "V" ? "Volume is held constant." : "Volume adjusts to keep pressure constant."}</p>}
        </>
      }
      readouts={[
        { label: "Pressure P", value: `${fmt(P, 3)} atm`, emphasis: true },
        { label: "In kPa", value: `${fmt(P * 101.325, 1)} kPa` },
        { label: "PV", value: `${fmt(P * vol, 2)} L·atm` },
        { label: "nRT", value: `${fmt(n * R_LATM * T, 2)} L·atm` },
        { label: "Temperature", value: `${fmt(T, 0)} K (${fmt(T - 273.15, 0)} °C)` },
        { label: "Volume", value: `${fmt(vol, 2)} L` },
      ]}
      assumptions={[
        "Ideal gas: particles have no volume and no attractions; R = 0.082057 L·atm/(mol·K).",
        "Real gases deviate at high pressure and low temperature, which this model does not show.",
        "The animation is qualitative; the numbers come from PV = nRT. When pressure is held, volume is capped at 60 L.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Periodic trends (main-group elements, periods 1–4)
// ---------------------------------------------------------------------------

// [symbol, name, Z, period, group, covalent radius (pm), Pauling EN (null for He/Ne/Ar), first ionization energy (kJ/mol)]
type El = [string, string, number, number, number, number, number | null, number];
export const ELEMENTS: El[] = [
  ["H", "Hydrogen", 1, 1, 1, 31, 2.2, 1312], ["He", "Helium", 2, 1, 18, 28, null, 2372],
  ["Li", "Lithium", 3, 2, 1, 128, 0.98, 520], ["Be", "Beryllium", 4, 2, 2, 96, 1.57, 900],
  ["B", "Boron", 5, 2, 13, 84, 2.04, 801], ["C", "Carbon", 6, 2, 14, 76, 2.55, 1086],
  ["N", "Nitrogen", 7, 2, 15, 71, 3.04, 1402], ["O", "Oxygen", 8, 2, 16, 66, 3.44, 1314],
  ["F", "Fluorine", 9, 2, 17, 57, 3.98, 1681], ["Ne", "Neon", 10, 2, 18, 58, null, 2081],
  ["Na", "Sodium", 11, 3, 1, 166, 0.93, 496], ["Mg", "Magnesium", 12, 3, 2, 141, 1.31, 738],
  ["Al", "Aluminium", 13, 3, 13, 121, 1.61, 578], ["Si", "Silicon", 14, 3, 14, 111, 1.9, 787],
  ["P", "Phosphorus", 15, 3, 15, 107, 2.19, 1012], ["S", "Sulfur", 16, 3, 16, 105, 2.58, 1000],
  ["Cl", "Chlorine", 17, 3, 17, 102, 3.16, 1251], ["Ar", "Argon", 18, 3, 18, 106, null, 1521],
  ["K", "Potassium", 19, 4, 1, 203, 0.82, 419], ["Ca", "Calcium", 20, 4, 2, 176, 1.0, 590],
  ["Ga", "Gallium", 31, 4, 13, 122, 1.81, 579], ["Ge", "Germanium", 32, 4, 14, 120, 2.01, 762],
  ["As", "Arsenic", 33, 4, 15, 119, 2.18, 947], ["Se", "Selenium", 34, 4, 16, 120, 2.55, 941],
  ["Br", "Bromine", 35, 4, 17, 120, 2.96, 1140], ["Kr", "Krypton", 36, 4, 18, 116, 3.0, 1351],
];
type Prop = "radius" | "electronegativity" | "ionization";
const PROP: Record<Prop, { label: string; unit: string; idx: 5 | 6 | 7; dir: string }> = {
  radius: { label: "Covalent radius", unit: "pm", idx: 5, dir: "Decreases across a period, increases down a group." },
  electronegativity: { label: "Electronegativity (Pauling)", unit: "", idx: 6, dir: "Increases across a period, decreases down a group." },
  ionization: { label: "First ionization energy", unit: "kJ/mol", idx: 7, dir: "Generally increases across a period, decreases down a group." },
};

export function PeriodicTrends({ params }: SimProps) {
  const initial = (["radius", "electronegativity", "ionization"].includes(String(params?.property)) ? params?.property : "radius") as Prop;
  const [prop, setProp] = useState<Prop>(initial);
  const [sel, setSel] = useState<string>("C");
  const cfg = PROP[prop];
  const values = ELEMENTS.map((e) => e[cfg.idx]).filter((v): v is number => v !== null);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const cols = [1, 2, 13, 14, 15, 16, 17, 18];
  const el = ELEMENTS.find((e) => e[0] === sel)!;
  const color = (v: number | null) => {
    if (v === null) return "var(--sunken)";
    const t = (v - lo) / (hi - lo);
    return `color-mix(in oklab, var(--chem) ${Math.round(12 + t * 88)}%, var(--surface))`;
  };
  return (
    <SimShell
      subject="chemistry"
      title="Periodic trends"
      onReset={() => { setProp(initial); setSel("C"); }}
      visual={
        <div className="p-4">
          <div role="group" aria-label={`Main-group elements colored by ${cfg.label}`} className="grid grid-cols-8 gap-1.5">
            {[1, 2, 3, 4].map((period) =>
              cols.map((g) => {
                const e = ELEMENTS.find((x) => x[3] === period && x[4] === g);
                if (!e) return <div key={`${period}-${g}`} aria-hidden />;
                const v = e[cfg.idx];
                return (
                  <button
                    key={e[0]}
                    type="button"
                    onClick={() => setSel(e[0])}
                    aria-pressed={sel === e[0]}
                    aria-label={`${e[1]}: ${v === null ? "no value" : `${v} ${cfg.unit}`}`}
                    className={cx("flex aspect-square flex-col items-center justify-center rounded-md border text-ink transition-shadow", sel === e[0] ? "border-ink ring-2 ring-ink/40" : "border-line")}
                    style={{ background: color(v) }}
                  >
                    <span className="text-[10px] leading-none text-muted">{e[2]}</span>
                    <span className="font-display text-base font-bold leading-tight sm:text-lg">{e[0]}</span>
                    <span className="text-[10px] tabular-nums leading-none">{v ?? "—"}</span>
                  </button>
                );
              }),
            )}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted">
            <span>{fmt(lo, 2)}</span>
            <span className="h-2 flex-1 rounded-full" style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--chem) 12%, var(--surface)), var(--chem))" }} />
            <span>{fmt(hi, 2)} {cfg.unit}</span>
          </div>
          <p className="mt-2 text-xs text-muted">Groups 1, 2 and 13–18; transition metals (groups 3–12) are not shown.</p>
        </div>
      }
      controls={
        <>
          <Segmented<Prop> label="Color by" value={prop} options={[{ value: "radius", label: "Radius" }, { value: "electronegativity", label: "EN" }, { value: "ionization", label: "IE₁" }]} onChange={setProp} />
          <p className="text-sm text-muted">{cfg.dir}</p>
        </>
      }
      readouts={[
        { label: "Element", value: `${el[1]} (${el[0]})`, emphasis: true },
        { label: "Period, group", value: `${el[3]}, ${el[4]}` },
        { label: "Covalent radius", value: `${el[5]} pm` },
        { label: "Electronegativity", value: el[6] ?? "Not assigned" },
        { label: "First ionization", value: `${el[7]} kJ/mol` },
        { label: "Atomic number", value: el[2] },
      ]}
      assumptions={[
        "Covalent radii from Cordero et al. (2008); Pauling electronegativities and first ionization energies from standard reference tables, rounded.",
        "Noble gases He, Ne and Ar have no commonly used Pauling electronegativity; Kr's value (3.00) comes from its few known compounds.",
        "Different radius definitions (covalent, metallic, van der Waals) give different numbers; the trends are the same.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Limiting reactant: 2 H2 + O2 → 2 H2O
// ---------------------------------------------------------------------------

export function limiting(h2: number, o2: number) {
  const ext = Math.min(h2 / 2, o2); // moles of reaction "turns"
  return { ext, water: 2 * ext, h2Left: h2 - 2 * ext, o2Left: o2 - ext, limiting: h2 / 2 < o2 ? "H₂" : o2 < h2 / 2 ? "O₂" : "Neither (exact ratio)" };
}

export function Stoichiometry({ params }: SimProps) {
  const init = { h2: num(params, "h2", 4, 0, 10), o2: num(params, "o2", 3, 0, 10) };
  const [h2, setH2] = useState(init.h2);
  const [o2, setO2] = useState(init.o2);
  const r = useMemo(() => limiting(h2, o2), [h2, o2]);
  const W = 480;
  const H = 280;
  const by = scale(0, 10, 220, 30);
  const bar = (x: number, v: number, color: string, label: string, sub: string) => (
    <g>
      <rect x={x} y={by(v)} width={70} height={by(0) - by(v)} rx={6} fill={color} />
      <text x={x + 35} y={by(v) - 6} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{fmt(v, 2)}</text>
      <text x={x + 35} y={240} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--ink)">{label}</text>
      <text x={x + 35} y={256} textAnchor="middle" fontSize="11" fill="var(--muted)">{sub}</text>
    </g>
  );
  return (
    <SimShell
      subject="chemistry"
      title="Limiting reactant"
      onReset={() => { setH2(init.h2); setO2(init.o2); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Limiting reactant: ${r.limiting}; water formed ${fmt(r.water, 2)} mol`} className="block h-auto w-full">
          <text x={240} y={20} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">2 H₂ + O₂ → 2 H₂O (moles after reaction)</text>
          <line x1={30} x2={450} y1={by(0)} y2={by(0)} stroke="var(--muted)" />
          {bar(50, r.h2Left, "var(--primary)", "H₂ left", `started ${fmt(h2, 2)}`)}
          {bar(170, r.o2Left, "var(--danger)", "O₂ left", `started ${fmt(o2, 2)}`)}
          {bar(320, r.water, "var(--chem)", "H₂O formed", `${fmt(r.water * 18.015, 1)} g`)}
        </svg>
      }
      controls={
        <>
          <Slider label="Hydrogen H₂" value={h2} min={0} max={10} step={0.1} unit="mol" onChange={setH2} />
          <Slider label="Oxygen O₂" value={o2} min={0} max={10} step={0.1} unit="mol" onChange={setO2} />
          <p className="text-sm text-muted">Test: H₂ ÷ 2 = {fmt(h2 / 2, 2)}, O₂ ÷ 1 = {fmt(o2, 2)}. The smaller one limits.</p>
        </>
      }
      readouts={[
        { label: "Limiting reactant", value: r.limiting, emphasis: true },
        { label: "Water formed", value: `${fmt(r.water, 2)} mol`, emphasis: true },
        { label: "Excess left", value: r.h2Left > 1e-9 ? `${fmt(r.h2Left, 2)} mol H₂` : r.o2Left > 1e-9 ? `${fmt(r.o2Left, 2)} mol O₂` : "None" },
        { label: "Mass check", value: `${fmt(h2 * 2.016 + o2 * 32.0, 1)} g in = ${fmt(r.water * 18.015 + r.h2Left * 2.016 + r.o2Left * 32.0, 1)} g out` },
      ]}
      assumptions={["The reaction goes to completion (100% yield) and no side products form.", "Molar masses: H₂ 2.016, O₂ 32.00, H₂O 18.015 g/mol.", "Amounts are in moles; the bars show what remains after the reaction."]}
    />
  );
}
