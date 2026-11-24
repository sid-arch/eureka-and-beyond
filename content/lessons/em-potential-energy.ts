import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-potential-energy",
  title: "Electric potential energy",
  summary: "Derive U = kq₁q₂/r from the work integral, find the energy needed to assemble several charges, and relate the field's work to ΔU.",
  minutes: 35,
  objectives: [
    "Derive U(r) = kq₁q₂/r from W = ∫F·dr with U(∞) = 0.",
    "Find the potential energy of a configuration by summing over pairs.",
    "Use W_field = −ΔU and energy conservation.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("From force to energy", r`The electric force is conservative, so $\Delta U = -\int\vec F\cdot d\vec r$. Bringing $q_2$ from infinity to $r$: $U = -\int_\infty^r\frac{kq_1q_2}{r'^2}\,dr' = \frac{kq_1q_2}{r}$.`),
    def("Configurations", r`The energy to assemble a group of charges from infinity is the sum over every pair: $U = \sum_{i<j}\frac{kq_iq_j}{r_{ij}}$. Three charges have three pair terms.`),
    example(r`Charges of 1, 2 and 3 μC at the corners of an equilateral triangle with 0.1 m sides`, [
      [r`U = \tfrac{k}{0.1}\left[(1)(2) + (1)(3) + (2)(3)\right]\times10^{-12}`, ""],
      [r`U = \tfrac{8.99\times10^9(11\times10^{-12})}{0.1} \approx 0.989\ \text{J}`, "Positive: work had to be done to push them together."],
    ]),
    callout("application", "Where this shows up", r`Lattice energies of ionic crystals, the energy released in nuclear fission (the fragments' Coulomb repulsion) and the binding of atoms are all sums like this.`),
  ],
  questions: [
    num(2, r`Find U for +4 μC and −2 μC charges 0.2 m apart, to three decimal places.`, -0.36, { tolerance: 0.001, unit: "J" }, ["U = kq₁q₂/r; keep the signs of the charges."], r`$\frac{8.99\times10^9(-8\times10^{-12})}{0.2} \approx -0.360$.`),
    num(3, r`Four +1 μC charges sit at the corners of a 0.1 m square. Find the total potential energy, to three decimal places.`, 0.487, { tolerance: 0.002, unit: "J" }, ["Add U = kq²/r for every pair: 4 sides and 2 diagonals.", "A diagonal is 0.1√2 m."], r`Four sides at 0.1 m and two diagonals at 0.1414 m: $k\times10^{-12}\left(\frac{4}{0.1} + \frac{2}{0.1414}\right)$.`),
    mc(2, r`When a charge moves where the field does positive work on it, its potential energy…`, ["increases", "decreases", "stays the same", "becomes zero"], 1, ["The work done by the field equals −ΔU."], r`$W = -\Delta U$.`),
    mc(3, r`A system of charges has negative total potential energy. This means…`, ["it can't exist", "work must be added to separate them completely", "it flies apart on its own", "the charges are all negative"], 1, ["U = 0 at infinite separation. If U is below zero, must you add or remove energy to pull the charges apart?"], r`It's bound, like an atom.`, "review"),
  ],
});
