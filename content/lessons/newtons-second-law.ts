import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "newtons-second-law",
  title: "Newton's second law",
  summary: "Relate net force, mass and acceleration, draw free-body diagrams, and apply F = ma along an incline with friction.",
  minutes: 40,
  objectives: [
    "State Newton's second law and use it to find acceleration or force.",
    "Draw a free-body diagram and find the net force by components.",
    "Analyze an object on an incline with and without friction.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
    { slug: "free-body-diagrams", name: "Free-body diagrams", description: "Diagrams showing every force acting on one object.", subject: "subj_phys" },
  ],
  formulas: ["newtons-second-law", "kinetic-friction"],
  blocks: [
    formula(r`\vec{F}_{\text{net}} = m\vec{a}`, "Newton's second law", r`The acceleration of an object is in the direction of the net force, with size proportional to the force and inversely proportional to the mass. Units: 1 N = 1 kg·m/s².`),
    def("Net force", r`The vector sum of all forces acting on an object. Forces from the object on other things do not belong in its sum.`),
    def("Free-body diagram", r`A sketch of one object with an arrow for every force acting on it: gravity $mg$, normal force $F_N$, friction, tension, applied pushes and pulls.`),
    example(r`A 1200 kg car accelerates from rest to 24 m/s in 8 s. What net force acts on it?`, [
      [r`a = \frac{\Delta v}{\Delta t} = \frac{24}{8} = 3\ \text{m/s}^2`, "Average acceleration."],
      [r`F_{\text{net}} = ma = 1200 \times 3 = 3600\ \text{N}`, "Second law."],
    ]),
    text(r`On an incline it helps to tilt the axes: one parallel to the slope and one perpendicular. Gravity $mg$ splits into $mg\sin\theta$ down the slope and $mg\cos\theta$ into the slope. The normal force balances the perpendicular part, so $F_N = mg\cos\theta$, and only the parallel parts produce acceleration.`),
    example(r`A 5 kg box slides down a 30° ramp with $\mu_k = 0.20$. Find its acceleration.`, [
      [r`mg\sin\theta = 5(9.8)(0.5) = 24.5\ \text{N}`, "Gravity's component down the slope."],
      [r`F_N = mg\cos\theta = 5(9.8)(0.866) \approx 42.4\ \text{N}`, "Perpendicular balance."],
      [r`f_k = \mu_k F_N = 0.20(42.4) \approx 8.49\ \text{N}`, "Kinetic friction, up the slope."],
      [r`a = \frac{24.5 - 8.49}{5} \approx 3.20\ \text{m/s}^2`, "Net force along the slope divided by mass."],
    ], r`Mass cancels if you write it symbolically: $a = g(\sin\theta - \mu_k\cos\theta)$, so any box with the same $\mu_k$ has the same acceleration.`),
    callout("warning", "Static friction is different", r`If the box isn't sliding, static friction adjusts to whatever value is needed, up to a maximum of $\mu_s F_N$. The box starts to slide only when $\tan\theta > \mu_s$.`),
    callout("application", "Where this shows up", r`Truck ramps, ski slopes and conveyor belts are designed with these components. A runaway-truck ramp uses gravel to raise the friction coefficient so trucks stop safely.`),
    activity("forces-incline", { title: "Forces on an incline" }),
    callout("tip", "Investigate", r`Set friction to 0.30. Find the steepest angle at which the box stays at rest. Does it change when you double the mass? Compare your answer with $\tan^{-1}(0.30)$.`, "experiment"),
  ],
  questions: [
    num(1, r`A 2 kg cart has a net force of 10 N. What is its acceleration?`, 5, { unit: "m/s²" }, [r`$a = \frac{F}{m}$.`], r`$a = \frac{10}{2} = 5$ m/s².`),
    num(1, r`What net force accelerates a 70 kg sprinter at 4 m/s²?`, 280, { unit: "N" }, [r`$F = ma$.`], r`$70 \times 4 = 280$ N.`),
    mc(2, r`Two forces act on a 4 kg block: 12 N east and 4 N west. What is its acceleration?`, ["4 m/s² east", "2 m/s² east", "3 m/s² west", "1 m/s² east"], 1,
      ["Find the net force first."], r`$F_{\text{net}} = 12 - 4 = 8$ N east, so $a = \frac{8}{4} = 2$ m/s² east.`),
    num(2, r`A box slides down a frictionless 25° incline. What is its acceleration? Use g = 9.8 m/s², round to two decimals.`, 4.14, { tolerance: 0.01, unit: "m/s²" },
      [r`Without friction, $a = g\sin\theta$.`], r`$9.8\sin 25° \approx 9.8(0.4226) \approx 4.14$ m/s².`),
    num(3, r`A 10 kg crate is pushed across a level floor with 60 N. $\mu_k = 0.35$. Find its acceleration (g = 9.8 m/s², two decimals).`, 2.57, { tolerance: 0.01, unit: "m/s²" },
      [r`$F_N = mg = 98$ N, so friction is $0.35 \times 98$.`], r`$f_k = 34.3$ N, $F_{\text{net}} = 60 - 34.3 = 25.7$ N, $a = 2.57$ m/s².`),
    mc(3, r`A block rests on a ramp. The angle is slowly increased until the block just starts to slide at 35°. What is $\mu_s$?`, ["0.57", "0.70", "0.82", "0.35"], 1,
      [r`At the threshold, $mg\sin\theta = \mu_s mg\cos\theta$.`], r`$\mu_s = \tan 35° \approx 0.70$.`, "review"),
  ],
});
