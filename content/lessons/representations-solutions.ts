import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "representations-solutions",
  title: "Representations of solutions",
  summary: "Draw and interpret particle diagrams of solutions, find ion concentrations of strong electrolytes, and show how water molecules orient around ions.",
  minutes: 30,
  objectives: [
    "Show ionic compounds dissociating in particle diagrams, with correct ion ratios.",
    "Find ion concentrations: [Cl⁻] in 0.10 M CaCl₂ is 0.20 M.",
    "Orient water molecules around cations (O end) and anions (H end).",
  ],
  concepts: [
    { slug: "solutions", name: "Solutions", description: "Homogeneous mixtures, their concentrations and properties.", subject: "subj_chem" },
  ],
  formulas: ["molarity-dilution"],
  blocks: [
    def("Particles in solution", r`Strong electrolytes separate completely into ions: one CaCl₂ gives one Ca²⁺ and two Cl⁻. Molecular solutes (sugar) stay intact as molecules. A good diagram keeps ratios right and shows water's partially negative O facing cations and its partially positive H facing anions.`),
    example(r`Ion concentrations in 0.10 M Al₂(SO₄)₃`, [
      [r`[\text{Al}^{3+}] = 2(0.10) = 0.20\ \text{M}`, ""],
      [r`[\text{SO}_4^{2-}] = 3(0.10) = 0.30\ \text{M}`, "Total ions: 0.50 M."],
    ]),
    callout("application", "Where this shows up", r`Electrolyte drinks are designed by ion concentrations; conductivity meters measure total ions in water samples.`),
  ],
  questions: [
    num(2, r`Find [NO₃⁻] in 0.25 M Ca(NO₃)₂.`, 0.5, { unit: "M" }, ["Each formula unit of Ca(NO₃)₂ releases two nitrate ions."], r`Two per formula unit.`),
    num(2, r`25.0 mL of 0.20 M NaCl is mixed with 25.0 mL of 0.10 M CaCl₂. Find [Cl⁻] in the mixture.`, 0.2, { unit: "M" }, ["Find moles of Cl⁻ from each solution; CaCl₂ gives 2 Cl⁻ per formula unit.", "Divide total moles by the total volume, 50.0 mL."], r`$\frac{0.005 + 0.005}{0.050}$.`),
    mc(2, r`Around a Na⁺ ion in water, water molecules point their…`, ["H atoms toward it", "O atoms toward it", "randomly", "they don't interact"], 1, ["Opposite partial charges attract. Which end of a water molecule is partially negative?"], r`O carries the partial negative charge.`),
    mc(3, r`A diagram of aqueous sugar should show…`, ["separate C, H and O atoms", "intact sugar molecules", "ions", "a solid"], 1, ["Does sugar break into ions in water, or stay as whole molecules?"], r`Molecular solutes don't dissociate.`, "review"),
  ],
});
