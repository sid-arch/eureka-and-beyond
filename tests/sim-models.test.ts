import { describe, expect, it } from "vitest";
import { collide, pvProcess } from "../src/components/sims/physics7";
import { configuration, hund, hydrogenLine } from "../src/components/sims/chemistry5";
import { gibbs } from "../src/components/sims/chemistry4";

describe("simulation models", () => {
  it("conserves momentum in every collision and kinetic energy only when elastic", () => {
    const el = collide(2, 3, 5, 0, 1);
    expect(el.u1).toBeCloseTo(-1);
    expect(el.u2).toBeCloseTo(4);
    expect(el.ke1).toBeCloseTo(el.ke0);
    const stick = collide(2, 3, 5, 0, 0);
    expect(stick.u1).toBeCloseTo(2);
    expect(stick.u2).toBeCloseTo(2);
    expect(2 * stick.u1 + 3 * stick.u2).toBeCloseTo(10);
  });
  it("obeys the first law for ideal-gas processes", () => {
    const iso = pvProcess("isothermal", 200, 10, 20);
    expect(iso.W).toBeCloseTo(2000 * Math.log(2));
    expect(iso.dU).toBeCloseTo(0);
    const adi = pvProcess("adiabatic", 200, 10, 20);
    expect(adi.Q).toBeCloseTo(0, 6);
    const bar = pvProcess("isobaric", 200, 10, 20);
    expect(bar.Q).toBeCloseTo(5000);
  });
  it("gives the hydrogen Balmer-alpha line and Lyman-alpha line", () => {
    expect(hydrogenLine(3, 2).lambda).toBeCloseTo(656.1, 0);
    expect(hydrogenLine(2, 1).lambda).toBeCloseTo(121.5, 0);
  });
  it("fills orbitals with the aufbau order, Hund's rule and the Cr/Cu exceptions", () => {
    expect(configuration(8)).toEqual({ "1s": 2, "2s": 2, "2p": 4 });
    expect(configuration(24)["3d"]).toBe(5);
    expect(configuration(29)["4s"]).toBe(1);
    expect(hund("2p", 4)).toEqual([2, 1, 1]);
  });
  it("computes ΔG° and the crossover temperature", () => {
    const g = gibbs(-92.2, -198.7, 298);
    expect(g.dG).toBeCloseTo(-33.0, 1);
    expect(g.crossover).toBeCloseTo(464, 0);
  });
});


import { analyze, MOLECULES } from "../src/components/sims/chemistry6";
import { rlc } from "../src/components/sims/physics8";
import { circleIntersect } from "../src/components/sims/geometry2";
import { simpson, SUB_CASES } from "../src/components/sims/calculus2";

describe("more simulation models", () => {
  it("every Lewis structure uses exactly the available electrons and its formal charges sum to the ion's charge", () => {
    const V: Record<string, number> = { C: 4, N: 5, O: 6, S: 6 };
    for (const m of Object.values(MOLECULES)) {
      for (const s of m.structures) {
        const a = analyze(s);
        const available = s.atoms.reduce((t, at) => t + V[at.el], 0) - m.charge;
        expect(a.electrons).toBe(available);
        expect(a.fc.reduce((t, f) => t + f, 0)).toBe(m.charge);
      }
    }
  });
  it("gives Z = R and maximum current at resonance", () => {
    const L = 0.1, C = 10e-6;
    const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
    const r = rlc(50, L, C, f0, 120);
    expect(r.Z).toBeCloseTo(50, 6);
    expect(r.I).toBeGreaterThan(rlc(50, L, C, f0 * 1.2, 120).I);
    expect(rlc(50, 0.1, 10e-6, 60, 120).phi).toBeLessThan(0); // capacitive below resonance
  });
  it("intersects circles exactly", () => {
    const pts = circleIntersect({ x: 0, y: 0 }, 5, { x: 6, y: 0 }, 5);
    expect(pts).toHaveLength(2);
    for (const p of pts) { expect(p.x).toBeCloseTo(3); expect(Math.abs(p.y)).toBeCloseTo(4); }
    expect(circleIntersect({ x: 0, y: 0 }, 1, { x: 5, y: 0 }, 1)).toHaveLength(0);
  });
  it("matches the x-area and u-area of each substitution with the exact value", () => {
    for (const c of Object.values(SUB_CASES)) {
      const b = c.bDefault;
      expect(simpson(c.f, c.a, b)).toBeCloseTo(c.exact(b), 6);
      expect(simpson(c.fu_, c.g(c.a), c.g(b))).toBeCloseTo(c.exact(b), 6);
    }
  });
});
