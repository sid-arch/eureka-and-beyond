import { describe, expect, it } from "vitest";
import { evaluate, snap, standardLatex, toStandard, vertexLatex, zeros } from "../src/lib/quadratic";

describe("vertex-form math", () => {
  it("evaluates y = a(x − h)² + k", () => {
    expect(evaluate({ a: 2, h: 1, k: -3 }, 3)).toBe(5);
    expect(evaluate({ a: -1, h: 0, k: 4 }, 2)).toBe(0);
  });

  it("expands to standard form", () => {
    // 2(x − 1)² − 3 = 2x² − 4x − 1
    expect(toStandard({ a: 2, h: 1, k: -3 })).toEqual({ a: 2, b: -4, c: -1 });
    // (x + 1)² − 3 = x² + 2x − 2
    expect(toStandard({ a: 1, h: -1, k: -3 })).toEqual({ a: 1, b: 2, c: -2 });
  });

  it("finds real zeros, a double root, or none", () => {
    expect(zeros({ a: 1, h: 0, k: -4 })).toEqual([-2, 2]);
    expect(zeros({ a: 1, h: 3, k: 0 })).toEqual([3]);
    expect(zeros({ a: 1, h: 0, k: 1 })).toEqual([]);
    expect(zeros({ a: -0.5, h: 1, k: 2 })).toEqual([-1, 3]);
    expect(() => zeros({ a: 0, h: 0, k: 0 })).toThrow();
  });

  it("zeros actually satisfy the equation", () => {
    for (const v of [{ a: 1, h: -1, k: -3 }, { a: -2.5, h: 2, k: 4 }, { a: 3, h: 0.5, k: -1.5 }]) {
      for (const z of zeros(v)) expect(Math.abs(evaluate(v, z))).toBeLessThan(1e-3);
    }
  });

  it("formats LaTeX with simplified signs and coefficients", () => {
    expect(vertexLatex({ a: 1, h: -1, k: -3 })).toBe("y = (x + 1)^2 - 3");
    expect(vertexLatex({ a: -1, h: 0, k: 0 })).toBe("y = -x^2");
    expect(vertexLatex({ a: 2.5, h: 2, k: 1 })).toBe("y = 2.5(x - 2)^2 + 1");
    expect(standardLatex({ a: 1, h: -1, k: -3 })).toBe("y = x^2 + 2x - 2");
    expect(standardLatex({ a: -1, h: 0, k: 0 })).toBe("y = -x^2");
  });

  it("snaps to half steps without negative zero", () => {
    expect(snap(1.26)).toBe(1.5);
    expect(snap(-0.2)).toBe(0);
    expect(Object.is(snap(-0.2), -0)).toBe(false);
  });
});
