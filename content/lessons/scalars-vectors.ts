import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "scalars-vectors",
  title: "Scalars and vectors",
  summary: "Distinguish scalar quantities (magnitude only) from vectors (magnitude and direction), and add perpendicular vectors with the Pythagorean theorem.",
  minutes: 25,
  objectives: [
    "Classify quantities as scalars or vectors.",
    "Distinguish distance from displacement and speed from velocity.",
    "Add vectors tip to tail and find the magnitude and direction of a resultant.",
  ],
  concepts: [
    { slug: "vectors", name: "Vectors", description: "Quantities with magnitude and direction, written in component form.", subject: "subj_math" },
  ],
  blocks: [
    def("Scalars and vectors", r`A scalar has only size (mass, time, distance, speed, energy). A vector has size and direction (displacement, velocity, acceleration, force). Vectors are drawn as arrows.`),
    example(r`Walk 3 m east, then 4 m north`, [
      [r`\text{distance} = 3 + 4 = 7\ \text{m}`, "Scalar: total path length."],
      [r`|\text{displacement}| = \sqrt{3^2 + 4^2} = 5\ \text{m}`, "Tip-to-tail addition."],
      [r`\theta = \tan^{-1}\tfrac{4}{3} \approx 53.1° \text{ north of east}`, ""],
    ]),
    activity("vectors", { title: "Add displacements tip to tail", params: { ux: 3, uy: 0, vx: 0, vy: 4 } }),
    callout("application", "Where this shows up", r`Pilots add the airplane's velocity relative to the air and the wind's velocity to find their actual ground velocity, a vector sum.`),
  ],
  questions: [
    mc(1, r`Which is a vector?`, ["Mass", "Temperature", "Velocity", "Energy"], 2, [], r`Velocity has a direction.`),
    num(2, r`A runner goes 6 m west, then 8 m south. What is the magnitude of the displacement?`, 10, { unit: "m" }, [], r`$\sqrt{36 + 64} = 10$.`),
    num(2, r`For that trip, what distance was traveled?`, 14, { unit: "m" }, [], r`$6 + 8 = 14$.`),
    mc(3, r`A car drives once around a circular track and returns to start. Which is zero?`, ["Distance", "Average speed", "Displacement", "Time"], 2, [], r`It ends where it started.`, "review"),
  ],
});
