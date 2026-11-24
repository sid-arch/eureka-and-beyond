import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "coulombs-law",
  title: "Electric charge and Coulomb's law",
  summary: "Describe charge, conductors, insulators and charging by contact and induction, then compute electric forces with Coulomb's law.",
  minutes: 30,
  objectives: [
    "Explain charge conservation and quantization (e = 1.6 × 10⁻¹⁹ C).",
    "Compare conductors and insulators, and charging by friction, contact and induction.",
    "Use F = k|q₁q₂|/r² and the inverse-square law.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["coulombs-law"],
  blocks: [
    def("Charge", r`Charge comes in two kinds, positive and negative: like charges repel and opposite charges attract. Charge is conserved and comes in multiples of $e = 1.6 \times 10^{-19}$ C. Objects charge by gaining or losing electrons. In conductors (metals) electrons move freely; in insulators (rubber, glass) they don't.`),
    def("Coulomb's law", r`$F = k\,\frac{|q_1 q_2|}{r^2}$ with $k = 8.99 \times 10^9\ \text{N·m}^2/\text{C}^2$. Doubling the distance cuts the force to one quarter.`),
    example(r`Charges of +2 μC and −2 μC sit 4 m apart`, [
      [r`F = \tfrac{(8.99\times10^9)(2\times10^{-6})(2\times10^{-6})}{4^2}`, ""],
      [r`F \approx 2.25 \times 10^{-3}\ \text{N}`, "Attractive, since the signs are opposite."],
    ]),
    activity("electric-field", { title: "Two charges", params: { q1: 2, q2: -2, separation: 4 } }),
    callout("tip", "Try this", r`Read the force between the charges, then double the separation from 4 m to 8 m: the force drops to one quarter. Flip one charge's sign to see the field change from attracting to repelling.`, "experiment"),
    callout("application", "Where this shows up", r`Static cling, lightning, photocopiers and laser printers (toner sticks to charged regions) and paint sprayers that charge droplets for an even coat.`),
  ],
  questions: [
    num(2, r`Two +1 μC charges are 0.1 m apart. Find the force between them, in newtons.`, 0.899, { tolerance: 0.002, unit: "N" }, [], r`$\frac{8.99\times10^9 \cdot 10^{-12}}{0.01}$.`),
    mc(2, r`The distance between two charges triples. The force becomes…`, ["3 times larger", "1/3 as large", "1/9 as large", "9 times larger"], 2, [], r`Inverse square: $\frac{1}{3^2}$.`),
    num(2, r`How many electrons must be removed to give an object a charge of +3.2 × 10⁻¹⁸ C?`, 20, { unit: "electrons" }, [], r`$\frac{3.2\times10^{-18}}{1.6\times10^{-19}} = 20$.`),
    mc(3, r`A charged balloon sticks to a neutral wall because…`, ["the wall is charged", "it induces a separation of charge in the wall's surface", "gravity", "magnetism"], 1, [], r`Opposite charges are pulled slightly closer than like charges (polarization).`, "review"),
  ],
});
