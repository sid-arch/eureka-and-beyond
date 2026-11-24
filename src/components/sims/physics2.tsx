// Physics simulations, part 2: waves, ray optics and electric fields.
// Each computes its results from the stated equations.

import { useState, type ReactNode } from "react";
import { Math as Tex } from "../ui/Math";
import { fmt, num, scale, Segmented, SimShell, Slider, type Params, type SimProps } from "./shell";

const W = 480;
const pick = <T extends string>(p: Params | undefined, key: string, fallback: T, allowed: readonly T[]): T => {
  const v = p?.[key];
  return typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
};
const path = (f: (x: number) => number, x0: number, x1: number, sx: (x: number) => number, sy: (y: number) => number, n = 300) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / n;
    return `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(f(x)).toFixed(1)}`;
  }).join("");

// ---------------------------------------------------------------------------
// Waves: travelling waves, superposition and standing waves on a string
// ---------------------------------------------------------------------------

type WaveMode = "travel" | "superpose" | "standing";

export function WaveSim({ params }: SimProps) {
  const initMode = pick(params, "mode", "travel" as WaveMode, ["travel", "superpose", "standing"] as const);
  const [mode, setMode] = useState<WaveMode>(initMode);
  const [A, setA] = useState(num(params, "amplitude", 1, 0.2, 2));
  const [lambda, setLambda] = useState(num(params, "wavelength", 2, 0.5, 4));
  const [f, setF] = useState(num(params, "frequency", 1, 0.25, 3));
  const [t, setT] = useState(num(params, "t", 0, 0, 4));
  const [phase, setPhase] = useState(num(params, "phase", 0, 0, 360));
  const [n, setN] = useState(num(params, "harmonic", 2, 1, 6));
  const L = 6; // string length / window width, in meters
  const v = f * lambda;
  const k = (2 * Math.PI) / lambda, w = 2 * Math.PI * f;
  const H = 260;
  const sx = scale(0, L, 10, W - 10), sy = scale(-2.6, 2.6, H - 10, 10);
  const phi = (phase * Math.PI) / 180;
  const y1 = (x: number) => A * Math.sin(k * x - w * t);
  const y2 = (x: number) => A * Math.sin(k * x - w * t + phi);
  // Standing wave: harmonic n on a string fixed at both ends, length L.
  const lamN = (2 * L) / n;
  const ys = (x: number) => 2 * A * Math.sin((2 * Math.PI * x) / lamN) * Math.cos(w * t);
  const env = (x: number) => 2 * A * Math.abs(Math.sin((2 * Math.PI * x) / lamN));
  const curves: ReactNode[] = [];
  let label = "";
  if (mode === "travel") {
    curves.push(<path key="w" d={path(y1, 0, L, sx, sy)} stroke="var(--physics)" strokeWidth={3.5} fill="none" />);
    // A marked crest to follow: it moves at v.
    const xc = ((lambda / 4 + v * t) % L + L) % L;
    curves.push(<circle key="c" cx={sx(xc)} cy={sy(y1(xc))} r={6} fill="var(--chem)" />);
    label = `A travelling wave with amplitude ${fmt(A)} m, wavelength ${fmt(lambda)} m and frequency ${fmt(f)} Hz, moving right at ${fmt(v)} m/s.`;
  } else if (mode === "superpose") {
    curves.push(<path key="a" d={path(y1, 0, L, sx, sy)} stroke="var(--physics)" strokeWidth={2} strokeDasharray="6 5" fill="none" />);
    curves.push(<path key="b" d={path(y2, 0, L, sx, sy)} stroke="var(--math)" strokeWidth={2} strokeDasharray="6 5" fill="none" />);
    curves.push(<path key="s" d={path((x) => y1(x) + y2(x), 0, L, sx, sy)} stroke="var(--chem)" strokeWidth={3.5} fill="none" />);
    label = `Two waves of amplitude ${fmt(A)} m with a phase difference of ${fmt(phase, 0)} degrees add to a wave of amplitude ${fmt(2 * A * Math.abs(Math.cos(phi / 2)))} m.`;
  } else {
    curves.push(<path key="e1" d={path(env, 0, L, sx, sy)} stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />);
    curves.push(<path key="e2" d={path((x) => -env(x), 0, L, sx, sy)} stroke="var(--muted)" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />);
    curves.push(<path key="s" d={path(ys, 0, L, sx, sy)} stroke="var(--physics)" strokeWidth={3.5} fill="none" />);
    for (let i = 0; i <= n; i++) curves.push(<circle key={`n${i}`} cx={sx((i * L) / n)} cy={sy(0)} r={5} fill="var(--chem)" />);
    label = `A standing wave, harmonic ${n}, on a ${L} m string fixed at both ends: ${n + 1} nodes and ${n} antinodes; wavelength ${fmt(lamN)} m.`;
  }
  const readouts =
    mode === "standing"
      ? [
          { label: "Harmonic", value: String(n), emphasis: true },
          { label: "Wavelength λₙ = 2L/n", value: `${fmt(lamN, 3)} m` },
          { label: "Nodes / antinodes", value: `${n + 1} / ${n}` },
          { label: "Frequency at v = 6 m/s", value: `${fmt((6 * n) / (2 * L), 3)} Hz` },
        ]
      : mode === "superpose"
        ? [
            { label: "Phase difference", value: `${fmt(phase, 0)}°` },
            { label: "Resultant amplitude", value: `${fmt(2 * A * Math.abs(Math.cos(phi / 2)), 3)} m`, emphasis: true },
            { label: "Interference", value: Math.abs(Math.cos(phi / 2)) > 0.95 ? "constructive" : Math.abs(Math.cos(phi / 2)) < 0.05 ? "destructive" : "partial" },
          ]
        : [
            { label: "Wave speed v = fλ", value: `${fmt(v, 3)} m/s`, emphasis: true },
            { label: "Period T = 1/f", value: `${fmt(1 / f, 3)} s` },
            { label: "Amplitude", value: `${fmt(A, 2)} m` },
          ];
  return (
    <SimShell
      subject="physics"
      title="Waves"
      onReset={() => { setMode(initMode); setA(1); setLambda(2); setF(1); setT(0); setPhase(0); setN(2); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block h-auto w-full select-none">
          <line x1={sx(0)} x2={sx(L)} y1={sy(0)} y2={sy(0)} stroke="var(--line)" strokeWidth={1.5} />
          {[1, 2, 3, 4, 5].map((m) => <text key={m} x={sx(m)} y={H - 4} textAnchor="middle" fontSize="11" fill="var(--muted)">{m} m</text>)}
          {curves}
        </svg>
      }
      controls={
        <>
          <Segmented label="Mode" value={mode} options={[{ value: "travel", label: "Travelling" }, { value: "superpose", label: "Superposition" }, { value: "standing", label: "Standing" }]} onChange={setMode} />
          <Slider label="Time t" value={t} min={0} max={4} step={0.02} unit="s" onChange={setT} />
          <Slider label="Amplitude" value={A} min={0.2} max={1.2} step={0.05} unit="m" onChange={setA} />
          {mode !== "standing" && <Slider label="Wavelength λ" value={lambda} min={0.5} max={4} step={0.1} unit="m" onChange={setLambda} />}
          <Slider label="Frequency f" value={f} min={0.25} max={3} step={0.05} unit="Hz" onChange={setF} />
          {mode === "superpose" && <Slider label="Phase difference" value={phase} min={0} max={360} step={5} unit="°" onChange={setPhase} />}
          {mode === "standing" && <Slider label="Harmonic n" value={n} min={1} max={6} step={1} onChange={setN} />}
        </>
      }
      readouts={readouts}
      assumptions={[
        "Waves are ideal sinusoids with no damping: y = A sin(kx − ωt), with k = 2π/λ and ω = 2πf.",
        "Superposition: the displacement at each point is the sum of the individual waves' displacements.",
        "Standing waves are on a 6 m string fixed at both ends, so λₙ = 2L/n; frequencies assume a wave speed of 6 m/s.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Ray optics: thin lenses and spherical mirrors
// ---------------------------------------------------------------------------

type Optic = "converging" | "diverging" | "concave" | "convex";

export function RayOptics({ params }: SimProps) {
  const initOptic = pick(params, "optic", "converging" as Optic, ["converging", "diverging", "concave", "convex"] as const);
  const [optic, setOptic] = useState<Optic>(initOptic);
  const [F, setF] = useState(num(params, "focal", 10, 4, 20));
  const [dO, setDO] = useState(num(params, "object", 25, 3, 45));
  const ho = 6;
  const f = optic === "converging" || optic === "concave" ? F : -F;
  const atFocus = Math.abs(dO - f) < 1e-6;
  const dI = atFocus ? Infinity : 1 / (1 / f - 1 / dO);
  const m = atFocus ? Infinity : -dI / dO;
  const hi = m * ho;
  const real = Number.isFinite(dI) && dI > 0;
  const mirror = optic === "concave" || optic === "convex";
  const H = 300;
  const sx = scale(-50, 50, 0, W), sy = scale(-16, 16, H, 0);
  // Lens: object on the left (x = −dO), real image on the right (x = +dI).
  // Mirror: object on the left (x = −dO), real image also on the left (x = −dI).
  const xObj = -dO;
  const xImg = Number.isFinite(dI) ? (mirror ? -dI : dI) : NaN;
  const rays: ReactNode[] = [];
  const line = (x1: number, y1: number, x2: number, y2: number, dashed = false, key = "") => (
    <line key={key} x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)} stroke={dashed ? "var(--muted)" : "var(--chem)"} strokeWidth={dashed ? 1.5 : 2.2} strokeDasharray={dashed ? "5 4" : undefined} />
  );
  // Ray 1: parallel to the axis, then through (or away from) the focal point.
  rays.push(line(xObj, ho, 0, ho, false, "r1a"));
  // Ray 2: through the center (lens) or vertex (mirror).
  if (!mirror) {
    const slope1 = -ho / f; // after the lens: line through (0, ho) and the focal point (f, 0)
    rays.push(line(0, ho, 50, ho + slope1 * 50, false, "r1b"));
    if (!real) rays.push(line(0, ho, -50, ho - slope1 * 50, true, "r1v"));
    const slope2 = -ho / dO;
    rays.push(line(xObj, ho, 50, ho + slope2 * (50 - xObj), false, "r2"));
    if (!real) rays.push(line(0, 0, -50, -slope2 * 50, true, "r2v"));
  } else {
    // Reflected ray 1 passes through the focal point at x = −f (in front of a concave mirror).
    const slope1 = ho / f; // line through (0, ho) and (−f, 0): slope ho/f
    rays.push(line(0, ho, -50, ho - slope1 * 50, false, "r1b"));
    if (!real) rays.push(line(0, ho, 50, ho + slope1 * 50, true, "r1v"));
    // Ray 2 hits the vertex and reflects symmetrically about the axis.
    const s2 = -ho / dO; // incoming slope toward the vertex
    rays.push(line(xObj, ho, 0, 0, false, "r2a"));
    rays.push(line(0, 0, -50, s2 * 50, false, "r2b"));
    if (!real) rays.push(line(0, 0, 50, -s2 * 50, true, "r2v"));
  }
  const arrow = (x: number, h: number, color: string, dashed: boolean, key: string) => (
    <g key={key}>
      <line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(h)} stroke={color} strokeWidth={4} strokeDasharray={dashed ? "6 4" : undefined} />
      <polygon points={`${sx(x)},${sy(h) + (h > 0 ? -6 : 6)} ${sx(x) - 7},${sy(h) + (h > 0 ? 8 : -8)} ${sx(x) + 7},${sy(h) + (h > 0 ? 8 : -8)}`} fill={color} />
    </g>
  );
  const showImg = Number.isFinite(xImg) && Math.abs(xImg) < 50 && Math.abs(hi) < 16;
  const imgDesc = atFocus ? "no image forms (rays leave parallel)" : `${real ? "real" : "virtual"}, ${m < 0 ? "inverted" : "upright"}, ${Math.abs(m) > 1 ? "enlarged" : "reduced"}`;
  return (
    <SimShell
      subject="physics"
      title="Lenses and mirrors"
      onReset={() => { setOptic(initOptic); setF(10); setDO(25); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${optic} ${mirror ? "mirror" : "lens"} with focal length ${fmt(F)} cm; object at ${fmt(dO)} cm; image: ${imgDesc}${Number.isFinite(dI) ? `, at ${fmt(dI, 1)} cm` : ""}.`} className="block h-auto w-full select-none">
          <line x1={0} x2={W} y1={sy(0)} y2={sy(0)} stroke="var(--line)" strokeWidth={1.5} />
          {!mirror && [F, -F].map((x) => <circle key={x} cx={sx(x)} cy={sy(0)} r={4} fill="var(--muted)" />)}
          {!mirror && [F, -F].map((x) => <text key={x} x={sx(x)} y={sy(0) + 16} textAnchor="middle" fontSize="11" fill="var(--muted)">F</text>)}
          {mirror && <text x={sx(f > 0 ? -F : F)} y={sy(0) + 16} textAnchor="middle" fontSize="11" fill="var(--muted)">F</text>}
          {mirror && <circle cx={sx(f > 0 ? -F : F)} cy={sy(0)} r={4} fill="var(--muted)" />}
          {/* the optic */}
          {!mirror && <ellipse cx={sx(0)} cy={sy(0)} rx={optic === "converging" ? 10 : 5} ry={sy(-14) - sy(0)} fill="var(--physics)" opacity={0.25} stroke="var(--physics)" strokeWidth={2} />}
          {mirror && <path d={`M${sx(optic === "concave" ? 2 : -2)},${sy(14)} Q${sx(optic === "concave" ? -2 : 2)},${sy(0)} ${sx(optic === "concave" ? 2 : -2)},${sy(-14)}`} fill="none" stroke="var(--physics)" strokeWidth={4} />}
          {rays}
          {arrow(xObj, ho, "var(--math)", false, "obj")}
          {showImg && arrow(xImg, hi, real ? "var(--success)" : "var(--muted)", !real, "img")}
        </svg>
      }
      controls={
        <>
          <Segmented label="Optic" value={optic} options={[{ value: "converging", label: "Converging lens" }, { value: "diverging", label: "Diverging lens" }, { value: "concave", label: "Concave mirror" }, { value: "convex", label: "Convex mirror" }]} onChange={setOptic} />
          <Slider label="Object distance dₒ" value={dO} min={3} max={45} step={0.5} unit="cm" onChange={setDO} />
          <Slider label="Focal length |f|" value={F} min={4} max={20} step={0.5} unit="cm" onChange={setF} />
          <div className="overflow-x-auto rounded-lg bg-math-soft px-3 py-2 text-sm"><Tex latex={`\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i},\\quad m = -\\frac{d_i}{d_o}`} /></div>
        </>
      }
      readouts={[
        { label: "Image distance dᵢ", value: Number.isFinite(dI) ? `${fmt(dI, 2)} cm` : "∞" , emphasis: true },
        { label: "Magnification m", value: Number.isFinite(m) ? fmt(m, 2) : "∞" },
        { label: "Image", value: imgDesc },
      ]}
      assumptions={[
        "Thin-lens and mirror equation with the usual sign convention: f > 0 for converging lenses and concave mirrors; dᵢ > 0 means a real image.",
        "Rays are paraxial (close to the axis), so the two principal rays drawn meet at the image; dashed lines are extensions behind the optic for virtual images.",
        "The object is 6 cm tall; the image is drawn only when it fits in the view.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Electric fields of two point charges
// ---------------------------------------------------------------------------

const K = 8.99e9;

export function ElectricField({ params }: SimProps) {
  const [q1, setQ1] = useState(num(params, "q1", 2, -5, 5));
  const [q2, setQ2] = useState(num(params, "q2", -2, -5, 5));
  const [d, setD] = useState(num(params, "separation", 4, 1, 8));
  const [px, setPx] = useState(num(params, "px", 0, -6, 6));
  const [py, setPy] = useState(num(params, "py", 2, -4, 4));
  const H = 340;
  const sx = scale(-8, 8, 0, W), sy = scale(-5.67, 5.67, H, 0);
  const c1 = { x: -d / 2, y: 0, q: q1 * 1e-6 }, c2 = { x: d / 2, y: 0, q: q2 * 1e-6 };
  // Field from both charges (positions in meters), in N/C.
  const field = (x: number, y: number) => {
    let ex = 0, ey = 0;
    for (const c of [c1, c2]) {
      const rx = x - c.x, ry = y - c.y, r2 = rx * rx + ry * ry;
      if (r2 < 1e-6 || c.q === 0) continue;
      const e = (K * c.q) / r2, r = Math.sqrt(r2);
      ex += (e * rx) / r; ey += (e * ry) / r;
    }
    return { ex, ey, mag: Math.hypot(ex, ey) };
  };
  const arrows: ReactNode[] = [];
  for (let gx = -7.5; gx <= 7.5; gx += 1) {
    for (let gy = -5; gy <= 5; gy += 1) {
      const near = [c1, c2].some((c) => Math.hypot(gx - c.x, gy - c.y) < 0.6);
      if (near) continue;
      const { ex, ey, mag } = field(gx, gy);
      if (mag === 0) continue;
      const len = 11, ux = (ex / mag) * len, uy = (ey / mag) * len;
      const op = Math.min(1, 0.15 + Math.log10(1 + mag / 200) / 3);
      arrows.push(
        <g key={`${gx},${gy}`} opacity={op}>
          <line x1={sx(gx) - ux} y1={sy(gy) + uy} x2={sx(gx) + ux} y2={sy(gy) - uy} stroke="var(--physics)" strokeWidth={1.6} />
          <circle cx={sx(gx) + ux} cy={sy(gy) - uy} r={2} fill="var(--physics)" />
        </g>,
      );
    }
  }
  const P = field(px, py);
  const pl = 34;
  const charge = (c: { x: number; q: number }, key: string) => (
    <g key={key}>
      <circle cx={sx(c.x)} cy={sy(0)} r={14} fill={c.q > 0 ? "var(--chem)" : c.q < 0 ? "var(--math)" : "var(--muted)"} />
      <text x={sx(c.x)} y={sy(0) + 5} textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">{c.q > 0 ? "+" : c.q < 0 ? "−" : "0"}</text>
    </g>
  );
  const F12 = (K * Math.abs(c1.q * c2.q)) / (d * d);
  return (
    <SimShell
      subject="physics"
      title="Electric fields"
      onReset={() => { setQ1(2); setQ2(-2); setD(4); setPx(0); setPy(2); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Electric field of a ${fmt(q1)} microcoulomb charge and a ${fmt(q2)} microcoulomb charge ${fmt(d)} m apart. At the probe point the field is ${fmt(P.mag / 1000, 2)} kN/C.`} className="block h-auto w-full select-none">
          {arrows}
          {charge(c1, "c1")}
          {charge(c2, "c2")}
          <circle cx={sx(px)} cy={sy(py)} r={6} fill="none" stroke="var(--success)" strokeWidth={3} />
          {P.mag > 0 && <line x1={sx(px)} y1={sy(py)} x2={sx(px) + (P.ex / P.mag) * pl} y2={sy(py) - (P.ey / P.mag) * pl} stroke="var(--success)" strokeWidth={3.5} />}
        </svg>
      }
      controls={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Charge 1" value={q1} min={-5} max={5} step={0.5} unit="μC" onChange={setQ1} />
            <Slider label="Charge 2" value={q2} min={-5} max={5} step={0.5} unit="μC" onChange={setQ2} />
          </div>
          <Slider label="Separation" value={d} min={1} max={8} step={0.5} unit="m" onChange={setD} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Probe x" value={px} min={-7} max={7} step={0.25} unit="m" onChange={setPx} />
            <Slider label="Probe y" value={py} min={-5} max={5} step={0.25} unit="m" onChange={setPy} />
          </div>
          <p className="text-xs text-muted">Arrows show the direction of the field (the force on a positive test charge); fainter arrows mean a weaker field. The green arrow is the field at the probe.</p>
        </>
      }
      readouts={[
        { label: "Field at probe", value: `${fmt(P.mag / 1000, 3)} kN/C`, emphasis: true },
        { label: "Force between charges", value: `${fmt(F12 * 1000, 3)} mN` },
        { label: "Force type", value: q1 * q2 > 0 ? "repulsive" : q1 * q2 < 0 ? "attractive" : "none" },
      ]}
      assumptions={[
        "Point charges in a vacuum: E = kq/r² from each charge, added as vectors; k = 8.99 × 10⁹ N·m²/C².",
        "The force between the charges is F = k|q₁q₂|/d² (Coulomb's law).",
        "Arrow length is fixed so the pattern is readable; strength is shown by opacity.",
      ]}
    />
  );
}
