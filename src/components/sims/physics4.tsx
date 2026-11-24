// Physics simulations, part 4: electric potential, RC circuits and double-slit interference.
// Each computes its results from the stated equations.

import { useMemo, useState, type ReactNode } from "react";
import { fmt, num, scale, Segmented, SimShell, Slider, type SimProps } from "./shell";

const W = 480;
const K = 8.99e9;

// ---------------------------------------------------------------------------
// Electric potential: banded map of V for two point charges
// ---------------------------------------------------------------------------

export function ElectricPotential({ params }: SimProps) {
  const [q1, setQ1] = useState(num(params, "q1", 2, -5, 5));
  const [q2, setQ2] = useState(num(params, "q2", -2, -5, 5));
  const [d, setD] = useState(num(params, "separation", 4, 1, 8));
  const [px, setPx] = useState(num(params, "px", 0, -7, 7));
  const [py, setPy] = useState(num(params, "py", 2, -5, 5));
  const H = 340;
  const sx = scale(-8, 8, 0, W), sy = scale(-5.67, 5.67, H, 0);
  const charges = [{ x: -d / 2, q: q1 * 1e-6 }, { x: d / 2, q: q2 * 1e-6 }];
  const V = (x: number, y: number) => charges.reduce((s, c) => s + (c.q === 0 ? 0 : (K * c.q) / Math.max(0.15, Math.hypot(x - c.x, y))), 0);
  // Bands every 2 kV; color by sign and band parity so equipotential boundaries show.
  const cells = useMemo(() => {
    const out: ReactNode[] = [];
    const n = 60, m = 42, cw = W / n, ch = H / m;
    const band: number[][] = [];
    for (let i = 0; i < n; i++) {
      band.push([]);
      for (let j = 0; j < m; j++) {
        const x = -8 + ((i + 0.5) * 16) / n, y = 5.67 - ((j + 0.5) * 11.34) / m;
        const v = V(x, y) / 1000;
        const b = Math.sign(v) * Math.floor(Math.abs(v) / 2);
        band[i].push(b);
        const op = Math.min(0.7, 0.1 + 0.6 * (1 - Math.exp(-Math.abs(v) / 8))) * (Math.abs(b) % 2 === 0 ? 1 : 0.7);
        out.push(<rect key={`${i},${j}`} x={i * cw} y={j * ch} width={cw + 0.5} height={ch + 0.5} fill={v >= 0 ? "var(--chem)" : "var(--math)"} opacity={op} />);
      }
    }
    // Equipotential lines: cell edges where the 2 kV band changes.
    const segs: string[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (i + 1 < n && band[i][j] !== band[i + 1][j] && Math.min(Math.abs(band[i][j]), Math.abs(band[i + 1][j])) < 5) segs.push(`M${((i + 1) * cw).toFixed(1)},${(j * ch).toFixed(1)}v${ch.toFixed(1)}`);
        if (j + 1 < m && band[i][j] !== band[i][j + 1] && Math.min(Math.abs(band[i][j]), Math.abs(band[i][j + 1])) < 5) segs.push(`M${(i * cw).toFixed(1)},${((j + 1) * ch).toFixed(1)}h${cw.toFixed(1)}`);
      }
    }
    out.push(<path key="eq" d={segs.join("")} stroke="var(--ink)" strokeOpacity={0.45} strokeWidth={1.1} fill="none" />);
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q1, q2, d]);
  const Vp = V(px, py);
  const U = Vp * 1e-9; // potential energy of a +1 nC test charge
  return (
    <SimShell
      subject="physics"
      title="Electric potential"
      onReset={() => { setQ1(2); setQ2(-2); setD(4); setPx(0); setPy(2); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Potential map of a ${fmt(q1)} μC and a ${fmt(q2)} μC charge ${fmt(d)} m apart. At the probe the potential is ${fmt(Vp / 1000, 2)} kV.`} className="block h-auto w-full select-none">
          {cells}
          {charges.map((c, i) => (
            <g key={i}>
              <circle cx={sx(c.x)} cy={sy(0)} r={13} fill={c.q > 0 ? "var(--chem)" : c.q < 0 ? "var(--math)" : "var(--muted)"} />
              <text x={sx(c.x)} y={sy(0) + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">{c.q > 0 ? "+" : c.q < 0 ? "−" : "0"}</text>
            </g>
          ))}
          <circle cx={sx(px)} cy={sy(py)} r={6} fill="none" stroke="var(--ink)" strokeWidth={3} />
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
          <p className="text-xs text-muted">Orange regions have positive potential and blue negative. The dark lines are equipotentials, drawn every 2 kV out to ±10 kV.</p>
        </>
      }
      readouts={[
        { label: "Potential at probe", value: `${fmt(Vp / 1000, 3)} kV`, emphasis: true },
        { label: "Energy of a +1 nC charge there", value: `${fmt(U * 1e6, 3)} μJ` },
      ]}
      assumptions={[
        "Point charges in vacuum: V = Σ kq/r with V = 0 far away; potentials add as scalars.",
        "Potential energy of a test charge q is U = qV.",
        "Within 0.15 m of a charge the map is capped so the colors stay readable.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// RC circuit: charging and discharging
// ---------------------------------------------------------------------------

export function RCCircuit({ params }: SimProps) {
  const [mode, setMode] = useState<"charge" | "discharge">(params?.mode === "discharge" ? "discharge" : "charge");
  const [V0, setV0] = useState(num(params, "voltage", 9, 1, 12));
  const [R, setR] = useState(num(params, "resistance", 10, 1, 50)); // kΩ
  const [C, setC] = useState(num(params, "capacitance", 100, 10, 500)); // μF
  const [t, setT] = useState(num(params, "time", 1, 0, 30));
  const tau = R * 1e3 * C * 1e-6;
  const tMax = [5, 10, 15, 20, 30].find((v) => v >= 5 * tau) ?? 30;
  const vc = (tt: number) => (mode === "charge" ? V0 * (1 - Math.exp(-tt / tau)) : V0 * Math.exp(-tt / tau));
  const I = (V0 / (R * 1e3)) * Math.exp(-Math.min(t, tMax) / tau);
  const H = 260;
  const sx = scale(0, tMax, 46, W - 12), sy = scale(0, 12, 220, 16);
  const curve = Array.from({ length: 301 }, (_, i) => `${i ? "L" : "M"}${sx((i * tMax) / 300).toFixed(1)},${sy(vc((i * tMax) / 300)).toFixed(1)}`).join("");
  const tShown = Math.min(t, tMax);
  return (
    <SimShell
      subject="physics"
      title="RC circuit"
      onReset={() => { setMode("charge"); setV0(9); setR(10); setC(100); setT(1); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${mode === "charge" ? "Charging" : "Discharging"} capacitor: time constant ${fmt(tau, 2)} s; at ${fmt(tShown)} s the capacitor voltage is ${fmt(vc(tShown), 2)} V.`} className="block h-auto w-full select-none">
          <line x1={sx(0)} y1={sy(0)} x2={sx(tMax)} y2={sy(0)} stroke="var(--muted)" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(12)} stroke="var(--muted)" />
          {[0, tMax / 2, tMax].map((v) => <text key={v} x={sx(v)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{v} s</text>)}
          {[0, 6, 12].map((v) => <text key={v} x={sx(0) - 6} y={sy(v) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{v} V</text>)}
          {tau <= tMax && <line x1={sx(tau)} y1={sy(0)} x2={sx(tau)} y2={sy(12)} stroke="var(--line)" strokeDasharray="4 4" />}
          {tau <= tMax && <text x={sx(tau) + 4} y={sy(11.3)} fontSize="11" fill="var(--muted)">t = τ</text>}
          <line x1={sx(0)} y1={sy(V0)} x2={sx(tMax)} y2={sy(V0)} stroke="var(--line)" strokeDasharray="2 4" />
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2.5} />
          <circle cx={sx(tShown)} cy={sy(vc(tShown))} r={5} fill="var(--chem)" />
          <text x={sx(tMax)} y={sy(0) + 30} textAnchor="end" fontSize="11" fill="var(--muted)">capacitor voltage against time</text>
        </svg>
      }
      controls={
        <>
          <Segmented label="Process" value={mode} options={[{ value: "charge", label: "Charging" }, { value: "discharge", label: "Discharging" }]} onChange={setMode} />
          <Slider label="Battery voltage (or starting voltage)" value={V0} min={1} max={12} step={0.5} unit="V" onChange={setV0} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Resistance" value={R} min={1} max={50} step={1} unit="kΩ" onChange={setR} />
            <Slider label="Capacitance" value={C} min={10} max={500} step={10} unit="μF" onChange={setC} />
          </div>
          <Slider label="Time" value={tShown} min={0} max={tMax} step={0.05} unit="s" onChange={setT} />
        </>
      }
      readouts={[
        { label: "Time constant τ = RC", value: `${fmt(tau, 3)} s`, emphasis: true },
        { label: "Capacitor voltage", value: `${fmt(vc(tShown), 3)} V` },
        { label: "Current", value: `${fmt(I * 1000, 3)} mA` },
        { label: "Charge on capacitor", value: `${fmt(C * vc(tShown), 1)} μC` },
      ]}
      assumptions={[
        "Ideal battery, resistor and capacitor in series; no internal resistance.",
        "Charging: V_C = V₀(1 − e^(−t/RC)). Discharging: V_C = V₀e^(−t/RC). In both, I = (V₀/R)e^(−t/RC).",
        "Charge Q = CV_C.",
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Double-slit interference
// ---------------------------------------------------------------------------

const wavelengthColor = (nm: number) => {
  const stops: [number, [number, number, number]][] = [[400, [130, 0, 200]], [450, [40, 60, 255]], [490, [0, 190, 230]], [530, [40, 200, 40]], [580, [240, 220, 0]], [620, [255, 120, 0]], [700, [220, 0, 0]]];
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, ca] = stops[i], [b, cb] = stops[i + 1];
    if (nm <= b) {
      const f = Math.max(0, (nm - a) / (b - a));
      return `rgb(${ca.map((c, k) => Math.round(c + (cb[k] - c) * f)).join(",")})`;
    }
  }
  return "rgb(220,0,0)";
};

export function DoubleSlit({ params }: SimProps) {
  const [lambda, setLambda] = useState(num(params, "wavelength", 550, 400, 700)); // nm
  const [dd, setDd] = useState(num(params, "separation", 0.25, 0.05, 1)); // mm
  const [L, setL] = useState(num(params, "distance", 2, 0.5, 4)); // m
  const [a, setA] = useState(num(params, "width", 0.04, 0, 0.1)); // mm
  const lam = lambda * 1e-9, d = dd * 1e-3, w = a * 1e-3;
  const I = (y: number) => {
    const th = Math.atan(y / L);
    const s = Math.sin(th);
    const inter = Math.cos((Math.PI * d * s) / lam) ** 2;
    const b = (Math.PI * w * s) / lam;
    const env = w === 0 || Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2;
    return inter * env;
  };
  const yMax = 0.03; // ±3 cm on the screen
  const H = 230;
  const sx = scale(-yMax, yMax, 10, W - 10), sy = scale(0, 1, 205, 95);
  const n = 400;
  const col = wavelengthColor(lambda);
  const strip = Array.from({ length: n }, (_, i) => {
    const y = -yMax + ((i + 0.5) * 2 * yMax) / n;
    return <rect key={i} x={sx(y)} y={20} width={(W - 20) / n + 0.6} height={56} fill={col} opacity={I(y)} />;
  });
  const curve = Array.from({ length: n + 1 }, (_, i) => {
    const y = -yMax + (i * 2 * yMax) / n;
    return `${i ? "L" : "M"}${sx(y).toFixed(1)},${sy(I(y)).toFixed(1)}`;
  }).join("");
  const spacing = (lam * L) / d;
  return (
    <SimShell
      subject="physics"
      title="Double-slit interference"
      onReset={() => { setLambda(550); setDd(0.25); setL(2); setA(0.04); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Interference pattern for ${fmt(lambda)} nm light, slits ${fmt(dd)} mm apart, screen ${fmt(L)} m away: bright fringes every ${fmt(spacing * 1000, 2)} mm.`} className="block h-auto w-full select-none">
          <rect x={10} y={20} width={W - 20} height={56} fill="#000" />
          {strip}
          <line x1={sx(-yMax)} y1={sy(0)} x2={sx(yMax)} y2={sy(0)} stroke="var(--muted)" />
          <path d={curve} fill="none" stroke="var(--physics)" strokeWidth={2} />
          {[-3, -2, -1, 0, 1, 2, 3].map((v) => <text key={v} x={sx(v / 100)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{v} cm</text>)}
          <text x={10} y={14} fontSize="11" fill="var(--muted)">pattern on the screen</text>
          <text x={10} y={90} fontSize="11" fill="var(--muted)">intensity</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Wavelength" value={lambda} min={400} max={700} step={5} unit="nm" onChange={setLambda} />
          <Slider label="Slit separation d" value={dd} min={0.05} max={1} step={0.01} unit="mm" onChange={setDd} />
          <Slider label="Screen distance L" value={L} min={0.5} max={4} step={0.1} unit="m" onChange={setL} />
          <Slider label="Slit width a" value={a} min={0} max={0.1} step={0.005} unit="mm" onChange={setA} />
        </>
      }
      readouts={[
        { label: "Fringe spacing λL/d", value: `${fmt(spacing * 1000, 2)} mm`, emphasis: true },
        { label: "First bright fringe angle", value: `${fmt((Math.asin(Math.min(1, lam / d)) * 180) / Math.PI, 3)}°` },
        { label: "First single-slit minimum", value: w > 0 ? `${fmt(((lam * L) / w) * 100, 2)} cm from center` : "none (very narrow slits)" },
      ]}
      assumptions={[
        "Monochromatic light through two identical slits; bright fringes where d sin θ = mλ.",
        "Intensity I = cos²(πd sin θ/λ) × [sin β/β]², β = πa sin θ/λ (the single-slit envelope).",
        "Intensity is relative to the central maximum; the screen shows ±3 cm around the center.",
      ]}
    />
  );
}
