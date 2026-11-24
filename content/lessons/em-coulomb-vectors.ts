import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-coulomb-vectors",
  title: "Electric charge and electric force",
  summary: "Write Coulomb's law in vector form and use superposition to find the net force on a charge from several others in two dimensions.",
  minutes: 35,
  objectives: [
    "Write Coulomb's law as a vector: F = kq₁q₂ r̂/r².",
    "Add forces from several charges by components (superposition).",
    "Use k = 1/(4πε₀) and ε₀ = 8.85 × 10⁻¹² C²/(N·m²).",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["coulombs-law"],
  blocks: [
    def("Vector form", r`The force on charge 2 from charge 1 is $\vec F_{12} = \frac{kq_1q_2}{r^2}\hat r_{12} = \frac{kq_1q_2}{r^3}\vec r_{12}$, where $\vec r_{12}$ points from 1 to 2 and $k = \frac{1}{4\pi\varepsilon_0}$. A positive product means repulsion along $\hat r$. Forces from several charges add as vectors.`),
    example(r`+1 μC at (0, 0.4) m; +2 μC at the origin; −3 μC at (0.3, 0) m. Find the force on the +1 μC charge`, [
      [r`\vec F_1 = \tfrac{k(2\times10^{-6})(10^{-6})}{0.4^2}\,\hat\jmath`, ""],
      [r`\vec F_1 = 0.112\,\hat\jmath\ \text{N}`, "Repelled straight up."],
      [r`|\vec F_2| = \tfrac{k(3\times10^{-6})(10^{-6})}{0.5^2} = 0.108\ \text{N}`, "Attracted toward (0.3, 0)."],
      [r`\vec F_2 = 0.108(0.6\,\hat\imath - 0.8\,\hat\jmath)`, "Unit vector from (0, 0.4) toward (0.3, 0)."],
      [r`\vec F = (0.0647,\ 0.0261)\ \text{N}`, ""],
      [r`|\vec F| \approx 0.070\ \text{N at}\ 21.9°`, "Above the +x axis."],
    ]),
    activity("electric-field", { title: "Superposition of two charges", params: { q1: 2, q2: -3, separation: 4 } }),
    callout("application", "Where this shows up", r`Every molecular-dynamics simulation of proteins sums Coulomb forces from thousands of charges, exactly like this.`),
  ],
  questions: [
    num(2, r`Two +3 μC charges sit at (±0.1, 0) m. Find the size of the net force on a +1 μC charge at (0, 0.1) m, to two decimal places.`, 1.91, { tolerance: 0.01, unit: "N" }, ["Each +3 μC charge is √0.02 m away; find the size of each force with Coulomb's law.", "By symmetry the x-components cancel; add the y-components."], r`Each pair is $\frac{k(3\times10^{-12})}{0.02} \approx 1.35$ N at 45°; x components cancel, so $2(1.35)(0.707)$.`),
    num(2, r`Find the force between +5 nC and −5 nC charges 2 cm apart, in mN, to two decimal places.`, 0.56, { tolerance: 0.01, unit: "mN" }, ["F = k|q₁q₂|/r², with r in metres; convert the result to mN."], r`$\frac{8.99\times10^9(25\times10^{-18})}{4\times10^{-4}}$.`),
    mc(2, r`Superposition means the force from one charge…`, ["changes when others are added", "is unaffected by other charges", "is shielded by others", "depends on the total charge"], 1, ["Does adding a third charge change the force between the first two?"], r`Forces add independently.`),
    mc(3, r`Doubling one charge and halving the distance multiplies the force by…`, ["2", "4", "8", "1"], 2, ["F ∝ q₁q₂/r². Apply each change as a factor."], r`$2 \times 2^2$.`, "review"),
  ],
});
