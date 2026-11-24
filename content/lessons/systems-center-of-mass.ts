import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "systems-center-of-mass",
  title: "Systems and center of mass",
  summary: "Choose systems, locate the center of mass of several objects, and use the fact that only external forces change the motion of the center of mass.",
  minutes: 30,
  objectives: [
    "Define a system and tell internal forces from external ones.",
    "Compute the center of mass of point masses: x_cm = Σmx/Σm.",
    "Explain why the center of mass moves as if all external forces acted on a single particle.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("Systems", r`A system is whatever collection of objects you choose to analyze. Forces between objects inside the system are internal and cancel in pairs (Newton's third law). Only external forces change the motion of the system as a whole: $\sum \vec F_{ext} = M\vec a_{cm}$.`),
    def("Center of mass", r`For point masses along a line, $x_{cm} = \frac{m_1x_1 + m_2x_2 + \cdots}{m_1 + m_2 + \cdots}$, and likewise for $y$. For a uniform symmetric object, the center of mass is at its geometric center. It lies closer to the heavier mass.`),
    example(r`2 kg at x = 0 and 3 kg at x = 5 m`, [
      [r`x_{cm} = \tfrac{2(0) + 3(5)}{5} = 3\ \text{m}`, "Closer to the 3 kg mass."],
    ]),
    example(r`The Earth–Moon system (Earth 5.97 × 10²⁴ kg, Moon 7.35 × 10²² kg, 3.84 × 10⁸ m apart)`, [
      [r`x_{cm} = \tfrac{m_M d}{M_E + m_M}`, "Measured from Earth's center, where Earth's own term is zero."],
      [r`x_{cm} = \tfrac{(7.35\times10^{22})(3.84\times10^8)}{6.04\times10^{24}}`, ""],
      [r`x_{cm} \approx 4.67\times10^6\ \text{m}`, "Inside Earth (radius 6.37 × 10⁶ m); both bodies orbit this point."],
    ]),
    callout("note", "Explosions", r`If a firework shell bursts in midair, the internal forces can't change the center of mass's motion: it keeps following the original parabola until fragments hit the ground.`),
    callout("application", "Where this shows up", r`High jumpers arch over the bar so their center of mass can pass below it; trucks tip when their center of mass moves outside the base of support formed by their wheels.`),
  ],
  questions: [
    num(1, r`1 kg sits at x = 0 and 4 kg at x = 10 m. Find the center of mass.`, 8, { unit: "m" }, ["x_cm = (m₁x₁ + m₂x₂)/(m₁ + m₂)."], r`$\frac{4(10)}{5}$.`),
    num(2, r`Masses of 2 kg at (0, 0), 2 kg at (4, 0) and 4 kg at (2, 3). Find $y_{cm}$.`, 1.5, { unit: "m" }, ["Only the y-coordinates matter: y_cm = Σmy/Σm.", "Two of the masses sit at y = 0."], r`$\frac{4(3)}{8}$.`),
    mc(2, r`Two skaters push off each other on frictionless ice. Their center of mass…`, ["moves toward the heavier skater", "stays at rest", "moves toward the lighter skater", "accelerates"], 1, ["With no external horizontal force, what happens to the velocity of the center of mass?"], r`Only internal forces act horizontally.`),
    mc(3, r`Choosing "both carts" as the system in a collision means the collision forces are…`, ["external", "internal, so they don't change the total momentum", "zero", "unbalanced"], 1, ["Are the collision forces exerted by something inside or outside the chosen system?"], r`Internal forces cancel in pairs.`, "review"),
  ],
});
