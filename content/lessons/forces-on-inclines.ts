import { activity, callout, def, example, lesson, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "forces-on-inclines",
  title: "Forces on inclines",
  summary: "Tilt the axes along a ramp, split gravity into mg sin θ and mg cos θ, and find accelerations and the angle at which objects start to slide.",
  minutes: 30,
  objectives: [
    "Resolve weight into components parallel and perpendicular to an incline.",
    "Find the normal force and acceleration on a ramp, with and without friction.",
    "Find the angle at which an object begins to slide (tan θ = μₛ).",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
    { slug: "friction", name: "Friction", description: "Forces that oppose sliding between surfaces in contact.", subject: "subj_phys" },
  ],
  formulas: ["kinetic-friction"],
  blocks: [
    def("Tilted axes", r`On a ramp at angle $\theta$: gravity's component along the slope is $mg\sin\theta$ and into the slope is $mg\cos\theta$. With no other perpendicular forces, $F_N = mg\cos\theta$.`),
    example(r`A 10 kg block on a frictionless 30° ramp`, [
      [r`a = g\sin 30° = 4.9\ \text{m/s}^2`, "Independent of mass."],
      [r`F_N = 10(9.8)\cos 30° \approx 84.9\ \text{N}`, ""],
    ]),
    example(r`When does a block start to slide?`, [
      [r`mg\sin\theta = \mu_s mg\cos\theta`, "At the tipping point."],
      [r`\tan\theta = \mu_s`, "With μₛ = 0.5, θ ≈ 26.6°."],
    ]),
    activity("forces-incline", { title: "Tilt until it slides" }),
    callout("application", "Where this shows up", r`Road grades and wheelchair ramps are kept gentle because the force needed to climb them is $mg\sin\theta$; whether a parked car, a crate or loose gravel stays put on a slope comes down to $\tan\theta$ compared with $\mu_s$.`),
  ],
  questions: [
    num(1, r`Find the acceleration of a block sliding down a frictionless 45° ramp, to two decimal places.`, 6.93, { tolerance: 0.01, unit: "m/s²" }, [], r`$9.8\sin 45° \approx 6.93$.`),
    num(2, r`A 4 kg block rests on a 20° ramp. Find the normal force, to one decimal place.`, 36.8, { tolerance: 0.1, unit: "N" }, [], r`$4(9.8)\cos 20° \approx 36.8$.`),
    num(2, r`A box slides down a 30° ramp with $\mu_k = 0.2$. Find its acceleration, to two decimal places.`, 3.2, { tolerance: 0.01, unit: "m/s²" }, [], r`$g(\sin 30° - 0.2\cos 30°) = 9.8(0.5 - 0.1732) \approx 3.20$.`),
    num(3, r`At what angle, in degrees, does a block with $\mu_s = 0.7$ begin to slide? One decimal place.`, 35, { tolerance: 0.1, unit: "°" }, [], r`$\tan^{-1} 0.7 \approx 35.0°$.`, "review"),
  ],
});
