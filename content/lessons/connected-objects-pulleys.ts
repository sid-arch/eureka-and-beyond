import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "connected-objects-pulleys",
  title: "Connected objects and pulleys",
  summary: "Apply Newton's second law to systems of objects joined by strings or contact, including blocks on tables and Atwood machines.",
  minutes: 35,
  objectives: [
    "Treat connected objects as a system to find a common acceleration.",
    "Draw separate free-body diagrams to find tensions and contact forces.",
    "Analyze a table-and-hanging-mass system and an Atwood machine.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("Strategy", r`Objects tied by an ideal (massless, unstretchable) string over a frictionless, massless pulley share the same acceleration magnitude, and the tension is the same all along the string. First treat the whole system as one object to find $a$; then use one object's free-body diagram to find the tension.`),
    example(r`A 2 kg cart on a frictionless table is tied over a pulley to a hanging 3 kg mass`, [
      [r`a = \tfrac{m_2 g}{m_1 + m_2} = \tfrac{3(9.8)}{5} = 5.88\ \text{m/s}^2`, "Only the hanging weight drives the system."],
      [r`T = m_1 a = 2(5.88) \approx 11.8\ \text{N}`, "The string is the only horizontal force on the cart."],
    ], r`Check: on the hanging mass, $m_2 g - T = 29.4 - 11.76 = 17.64 = m_2 a$. ✓`),
    example(r`Atwood machine: 5 kg and 3 kg hang over a pulley`, [
      [r`a = \tfrac{(m_1 - m_2)g}{m_1 + m_2} = \tfrac{2(9.8)}{8} = 2.45\ \text{m/s}^2`, ""],
      [r`T = m_2(g + a) = 3(12.25) = 36.75\ \text{N}`, "The lighter mass accelerates upward."],
    ]),
    callout("warning", "A common mistake", r`The tension in the table example is not 29.4 N (the hanging weight). If it were, the hanging mass wouldn't accelerate.`),
    callout("application", "Where this shows up", r`Elevators use a counterweight like an Atwood machine, so the motor only supplies the difference in weights.`),
  ],
  questions: [
    num(2, r`A 10 N push acts on a 2 kg block that pushes a 3 kg block across a frictionless floor. Find the acceleration.`, 2, { unit: "m/s²" }, [], r`$\frac{10}{5}$.`),
    num(2, r`In that system, find the contact force on the 3 kg block.`, 6, { unit: "N" }, [], r`$F = 3 \times 2$.`),
    num(3, r`An Atwood machine holds 4 kg and 6 kg. Find the acceleration.`, 1.96, { tolerance: 0.01, unit: "m/s²" }, [], r`$\frac{2(9.8)}{10}$.`),
    mc(3, r`If the two masses on an Atwood machine are equal, the system…`, ["accelerates at g", "accelerates at g/2", "stays at rest or keeps a constant velocity", "can't be analyzed"], 2, [], r`$a = 0$ when $m_1 = m_2$.`, "review"),
  ],
});
