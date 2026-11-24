import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-impulse",
  title: "Change in momentum and impulse",
  summary: "Compute impulse as the time integral of force, find peak and average forces in collisions, and read impulse from force–time graphs.",
  minutes: 30,
  objectives: [
    "Compute J = ∫F dt and use J = Δp.",
    "Find average force F_avg = J/Δt and peak force from a force function.",
    "Read impulse as area under an F–t graph.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Impulse", r`Integrating $F = \frac{dp}{dt}$ over time gives the impulse–momentum theorem: $\vec J = \int_{t_1}^{t_2}\vec F\,dt = \Delta\vec p$. The average force over the contact is $F_{avg} = \frac{J}{\Delta t}$.`),
    example(r`A bat's force on a 0.1 kg ball is F(t) = 6 × 10⁶ t(0.01 − t) N for 0 ≤ t ≤ 0.01 s; the ball starts at rest`, [
      [r`J = 6\times10^6\int_0^{0.01}(0.01t - t^2)\,dt`, ""],
      [r`J = 6\times10^6\left(\tfrac{10^{-6}}{2} - \tfrac{10^{-6}}{3}\right) = 1.0\ \text{N·s}`, ""],
      [r`v = \tfrac{J}{m} = 10\ \text{m/s}`, ""],
      [r`F_{peak} = F(0.005) = 150\ \text{N}`, "The force peaks halfway through the contact."],
      [r`F_{avg} = \tfrac{1.0}{0.01} = 100\ \text{N}`, ""],
    ]),
    callout("application", "Where this shows up", r`Airbags and crumple zones stretch the collision time so the same impulse comes with a smaller average force; force plates in sports labs integrate F(t) to measure jump impulses.`),
  ],
  questions: [
    num(2, r`F(t) = 4t² N acts from t = 0 to 3 s. Find the impulse.`, 36, { unit: "N·s" }, ["Impulse J = ∫F dt."], r`$\frac43t^3$ from 0 to 3.`),
    num(2, r`A force–time graph is a triangle with peak 200 N lasting 0.05 s. Find the impulse.`, 5, { unit: "N·s" }, ["Impulse is the area under the F–t graph; this one is a triangle."], r`$\frac12(0.05)(200)$.`),
    num(3, r`A 0.5 kg ball moving at 8 m/s receives F(t) = −120t N for 0 ≤ t ≤ 0.5 s. Find its final velocity.`, -22, { unit: "m/s" }, ["Find J = ∫F dt over 0.5 s, then Δv = J/m."], r`$J = -60(0.25) = -15$, so $v = 8 - 30$.`),
    mc(3, r`Two collisions deliver the same impulse, one lasting twice as long. Its average force is…`, ["twice as large", "half as large", "the same", "four times as large"], 1, ["J = F_avg Δt. Same J, twice the Δt."], r`$F_{avg} = \frac{J}{\Delta t}$.`, "review"),
  ],
});
