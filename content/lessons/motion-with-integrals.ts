import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "motion-with-integrals",
  title: "Connecting position, velocity and acceleration of functions using integrals",
  summary: "Find displacement, total distance and position from velocity with integrals, and velocity from acceleration.",
  minutes: 30,
  objectives: [
    "Compute displacement as ∫ v(t) dt and total distance as ∫ |v(t)| dt.",
    "Find position from a starting position and velocity: s(b) = s(a) + ∫ₐᵇ v(t) dt.",
    "Find velocity from acceleration the same way.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  formulas: ["ftc"],
  blocks: [
    def("Displacement and distance", r`Displacement on $[a, b]$: $\int_a^b v(t)\,dt$. Total distance: $\int_a^b |v(t)|\,dt$: split at the times where $v$ changes sign and add the absolute values.`),
    example(r`$v(t) = t^2 - 4t + 3 = (t - 1)(t - 3)$ m/s on $[0, 4]$`, [
      [r`\int_0^4 v\,dt = \tfrac{64}{3} - 32 + 12 = \tfrac{4}{3} \text{ m}`, "Displacement."],
      [r`\int_0^1 v = \tfrac{4}{3},\ \int_1^3 v = -\tfrac{4}{3},\ \int_3^4 v = \tfrac{4}{3}`, "Split where v changes sign."],
      [r`\text{distance} = \tfrac{4}{3} \cdot 3 = 4 \text{ m}`, ""],
    ]),
    example(r`$a(t) = 6t$ m/s², $v(0) = -3$ m/s. Find $v(2)$.`, [
      [r`v(2) = -3 + \int_0^2 6t\,dt = -3 + 12 = 9 \text{ m/s}`, ""],
    ]),
    activity("accumulation", { title: "Velocity builds position", params: { fn: "velocity", x: 5 } }),
    callout("application", "Where this shows up", r`Inertial navigation systems (in aircraft, and in phones when GPS drops out) combine sensor readings this way: integrating acceleration gives velocity, and integrating velocity gives position.`),
  ],
  questions: [
    num(1, r`$v(t) = 4 - 2t$ m/s. Find the displacement on $[0, 3]$, in meters.`, 3, { unit: "m" }, [], r`$[4t - t^2]_0^3 = 12 - 9 = 3$.`),
    num(2, r`For $v(t) = 4 - 2t$ on $[0, 3]$, find the total distance, in meters.`, 5, { unit: "m" }, [r`$v$ changes sign at $t = 2$.`], r`$\int_0^2 = 4$, $\int_2^3 = -1$; distance $4 + 1 = 5$.`),
    num(2, r`A particle at $s(1) = 10$ has $v(t) = 3t^2$. Find $s(2)$.`, 17, {}, [], r`$10 + [t^3]_1^2 = 10 + 7 = 17$.`),
    mc(3, r`$\int_0^{10} v(t)\,dt = 0$. Which must be true?`, ["The object never moved", "The object ended where it started", "The total distance is 0", "v(t) = 0 for all t"], 1, [], r`Zero displacement only means the start and end positions match.`, "review"),
  ],
});
