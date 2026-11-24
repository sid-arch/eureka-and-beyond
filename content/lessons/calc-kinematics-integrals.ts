import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-kinematics-integrals",
  title: "Representing motion with integrals and graphs",
  summary: "Recover velocity and position from acceleration by integrating with initial conditions, and distinguish displacement from distance traveled.",
  minutes: 35,
  objectives: [
    "Integrate a(t) to get v(t), and v(t) to get x(t), using initial conditions.",
    "Interpret area under v–t and a–t graphs.",
    "Compute displacement and total distance from a velocity function.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Undoing derivatives", r`$v(t) = v_0 + \int_0^t a\,dt'$ and $x(t) = x_0 + \int_0^t v\,dt'$. Geometrically, the area under a velocity graph is the displacement, and the area under an acceleration graph is the change in velocity. The constant-acceleration equations are the special case $a = \text{const}$.`),
    example(r`a(t) = 6t, with v₀ = 2 m/s and x₀ = 1 m`, [
      [r`v = 2 + 3t^2`, ""],
      [r`x = 1 + 2t + t^3`, ""],
      [r`t = 2:\ v = 14\ \text{m/s},\ x = 13\ \text{m}`, ""],
    ]),
    def("Displacement vs distance", r`Displacement is $\int v\,dt$; distance is $\int |v|\,dt$. Split the integral wherever $v$ changes sign.`),
    example(r`v(t) = t² − 4 from t = 0 to 3 s`, [
      [r`\Delta x = \int_0^3 (t^2 - 4)\,dt = 9 - 12 = -3\ \text{m}`, ""],
      [r`d = \int_0^2 (4 - t^2)\,dt + \int_2^3 (t^2 - 4)\,dt`, "v changes sign at t = 2."],
      [r`d = \tfrac{16}{3} + \tfrac{7}{3} = \tfrac{23}{3} \approx 7.67\ \text{m}`, ""],
    ]),
    activity("accumulation", { title: "Accumulating area under a curve" }),
    callout("application", "Where this shows up", r`Inertial navigation in aircraft and submarines integrates measured accelerations twice to track position when GPS isn't available.`),
  ],
  questions: [
    num(2, r`a(t) = 4 − 2t from rest at the origin. Find v at t = 3 s.`, 3, { unit: "m/s" }, ["v(t) = ∫a dt with v(0) = 0."], r`$v = 4t - t^2$.`),
    num(2, r`For the same motion, find x at t = 3 s.`, 9, { unit: "m" }, ["x(t) = ∫v dt with x(0) = 0."], r`$x = 2t^2 - \frac{t^3}{3} = 18 - 9$.`),
    num(3, r`v(t) = 2t − 4 from 0 to 4 s. Find the total distance traveled.`, 8, { unit: "m" }, ["Find where v = 0, then add the absolute displacement on each side."], r`Each half (0–2 s and 2–4 s) covers 4 m.`),
    mc(3, r`The area under an a–t graph from t₁ to t₂ equals…`, ["displacement", "change in velocity", "average acceleration", "jerk"], 1, ["Integrating a over time gives what?"], r`$\int a\,dt = \Delta v$.`, "review"),
  ],
});
