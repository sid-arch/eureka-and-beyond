// Statistics simulations: the normal distribution and a dice experiment.

import { useMemo, useState } from "react";
import { Button } from "../ui";
import { curvePath } from "./math-graphs";
import { fmt, num, scale, SimShell, Slider, type SimProps } from "./shell";

/** erf via Abramowitz & Stegun 7.1.26 (|error| < 1.5e-7). */
export function erf(x: number) {
  const sign = Math.sign(x);
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
  return sign * y;
}
export const normalCdf = (x: number, mu = 0, sigma = 1) => 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));
const pdf = (x: number, mu: number, sigma: number) => Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));

export function NormalDistribution({ params }: SimProps) {
  const init = {
    mu: num(params, "mu", 0, -1000, 1000),
    sigma: num(params, "sigma", 1, 0.1, 500),
    lo: num(params, "lo", -1, -5000, 5000),
    hi: num(params, "hi", 1, -5000, 5000),
  };
  const [mu, setMu] = useState(init.mu);
  const [sigma, setSigma] = useState(init.sigma);
  // Interval endpoints are stored as z-scores so they move with the curve.
  const [zlo, setZlo] = useState((init.lo - init.mu) / init.sigma);
  const [zhi, setZhi] = useState((init.hi - init.mu) / init.sigma);
  const lo = mu + zlo * sigma;
  const hi = mu + zhi * sigma;
  const W = 480;
  const H = 300;
  const x0 = mu - 4 * sigma;
  const x1 = mu + 4 * sigma;
  const sx = scale(x0, x1, 10, W - 10);
  const peak = pdf(mu, mu, sigma);
  const sy = scale(0, peak * 1.15, H - 40, 20);
  const area = normalCdf(Math.max(lo, hi), mu, sigma) - normalCdf(Math.min(lo, hi), mu, sigma);
  const shade = useMemo(() => {
    const a = Math.min(lo, hi);
    const b = Math.max(lo, hi);
    let d = `M${sx(a)},${sy(0)}`;
    for (let i = 0; i <= 80; i++) {
      const x = a + ((b - a) * i) / 80;
      d += `L${sx(x)},${sy(pdf(x, mu, sigma))}`;
    }
    return `${d}L${sx(b)},${sy(0)}Z`;
  }, [lo, hi, mu, sigma, sx, sy]);
  const ticks = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <SimShell
      subject="mathematics"
      title="Normal distribution"
      onReset={() => { setMu(init.mu); setSigma(init.sigma); setZlo((init.lo - init.mu) / init.sigma); setZhi((init.hi - init.mu) / init.sigma); }}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Normal curve with mean ${mu} and standard deviation ${sigma}; shaded area ${fmt(area, 4)}`} className="block h-auto w-full">
          <path d={shade} fill="var(--math)" fillOpacity={0.22} />
          <path d={curvePath((x) => pdf(x, mu, sigma), x0, x1, sx, sy, [0, peak * 2])} fill="none" stroke="var(--math)" strokeWidth={3} />
          <line x1={10} x2={W - 10} y1={sy(0)} y2={sy(0)} stroke="var(--muted)" />
          {ticks.map((k) => (
            <g key={k}>
              <line x1={sx(mu + k * sigma)} x2={sx(mu + k * sigma)} y1={sy(0)} y2={sy(0) + 5} stroke="var(--muted)" />
              <text x={sx(mu + k * sigma)} y={sy(0) + 18} textAnchor="middle" fontSize="11" fill="var(--muted)">{fmt(mu + k * sigma, 1)}</text>
              <text x={sx(mu + k * sigma)} y={sy(0) + 32} textAnchor="middle" fontSize="10" fill="var(--muted)">{k === 0 ? "μ" : `${k > 0 ? "+" : "−"}${Math.abs(k)}σ`}</text>
            </g>
          ))}
          <text x={sx((lo + hi) / 2)} y={sy(pdf((lo + hi) / 2, mu, sigma) / 2)} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">{fmt(area * 100, 1)}%</text>
        </svg>
      }
      controls={
        <>
          <Slider label="Mean μ" value={mu} min={init.mu - 50 * Math.max(1, init.sigma / 10)} max={init.mu + 50 * Math.max(1, init.sigma / 10)} step={init.sigma >= 5 ? 1 : 0.1} onChange={setMu} />
          <Slider label="Standard deviation σ" value={sigma} min={Math.max(0.1, init.sigma / 4)} max={init.sigma * 3} step={init.sigma >= 5 ? 0.5 : 0.05} onChange={setSigma} />
          <Slider label="Lower bound (z)" value={zlo} min={-4} max={4} step={0.05} onChange={setZlo} />
          <Slider label="Upper bound (z)" value={zhi} min={-4} max={4} step={0.05} onChange={setZhi} />
        </>
      }
      readouts={[
        { label: "P(lower < X < upper)", value: fmt(area, 4), emphasis: true },
        { label: "Interval", value: `${fmt(Math.min(lo, hi), 2)} to ${fmt(Math.max(lo, hi), 2)}` },
        { label: "z-scores", value: `${fmt(Math.min(zlo, zhi), 2)}, ${fmt(Math.max(zlo, zhi), 2)}` },
        { label: "Left tail P(X < lower)", value: fmt(normalCdf(Math.min(lo, hi), mu, sigma), 4) },
      ]}
      assumptions={["The curve is an exact normal density N(μ, σ).", "Areas use a standard numerical approximation of the normal CDF accurate to about 7 decimal places.", "Bounds are set in z-scores so the shaded interval keeps its meaning when you change μ or σ."]}
    />
  );
}

// ---------------------------------------------------------------------------
// Dice: law of large numbers
// ---------------------------------------------------------------------------

const THEORY = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((w) => w / 36);

export function DiceSimulation() {
  const [counts, setCounts] = useState<number[]>(() => Array(11).fill(0));
  const [history, setHistory] = useState<{ n: number; f7: number }[]>([]);
  const total = counts.reduce((a, b) => a + b, 0);
  const roll = (k: number) => {
    const next = [...counts];
    const buf = new Uint32Array(k * 2);
    crypto.getRandomValues(buf);
    for (let i = 0; i < k; i++) next[(buf[2 * i] % 6) + (buf[2 * i + 1] % 6)]++;
    setCounts(next);
    const n = total + k;
    setHistory((h) => [...h, { n, f7: next[5] / n }].slice(-200));
  };
  const reset = () => { setCounts(Array(11).fill(0)); setHistory([]); };
  const W = 480;
  const H = 300;
  const bx = scale(0, 11, 30, W - 10);
  const by = scale(0, 0.25, 190, 20);
  const hx = scale(0, Math.max(1, history.length - 1), 30, W - 10);
  const hy = scale(0, 0.4, 290, 210);
  return (
    <SimShell
      subject="mathematics"
      title="Law of large numbers"
      onReset={reset}
      visual={
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Relative frequencies of sums after ${total} rolls`} className="block h-auto w-full">
          {counts.map((c, i) => {
            const rf = total ? c / total : 0;
            return (
              <g key={i}>
                <rect x={bx(i) + 4} width={bx(1) - bx(0) - 8} y={by(rf)} height={by(0) - by(rf)} rx={3} fill={i === 5 ? "var(--chem)" : "var(--math)"} fillOpacity={0.75} />
                <line x1={bx(i) + 2} x2={bx(i + 1) - 2} y1={by(THEORY[i])} y2={by(THEORY[i])} stroke="var(--ink)" strokeWidth={2} />
                <text x={bx(i + 0.5)} y={by(0) + 14} textAnchor="middle" fontSize="11" fill="var(--muted)">{i + 2}</text>
              </g>
            );
          })}
          <text x={30} y={14} fontSize="11" fill="var(--muted)">Bars: observed relative frequency. Black lines: theoretical probability.</text>
          <line x1={30} x2={W - 10} y1={hy(1 / 6)} y2={hy(1 / 6)} stroke="var(--ink)" strokeDasharray="4 4" />
          {history.length > 1 && <path d={history.map((p, i) => `${i ? "L" : "M"}${hx(i)},${hy(p.f7)}`).join("")} fill="none" stroke="var(--chem)" strokeWidth={2.5} />}
          <text x={30} y={222} fontSize="11" fill="var(--muted)">Relative frequency of a sum of 7 over time (dashed: 1/6)</text>
        </svg>
      }
      controls={
        <div className="grid grid-cols-2 gap-2">
          {[1, 10, 100, 1000].map((k) => (
            <Button key={k} variant={k === 1000 ? "primary" : "secondary"} onClick={() => roll(k)}>Roll {k.toLocaleString()}</Button>
          ))}
        </div>
      }
      readouts={[
        { label: "Total rolls", value: total.toLocaleString(), emphasis: true },
        { label: "Sum of 7", value: total ? fmt(counts[5] / total, 4) : "—" },
        { label: "Theory for 7", value: "0.1667" },
        { label: "Difference", value: total ? fmt(counts[5] / total - 1 / 6, 4) : "—" },
      ]}
      assumptions={["Each die is fair and independent; outcomes come from the browser's cryptographic random number generator.", "Sums range from 2 to 12; the theoretical probabilities come from counting the 36 equally likely ordered pairs.", "Short runs vary a lot; the law of large numbers is about the long run."]}
    />
  );
}
