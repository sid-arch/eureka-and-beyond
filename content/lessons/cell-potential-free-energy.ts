import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "cell-potential-free-energy",
  title: "Cell potential and free energy",
  summary: "Connect standard cell potential to free energy and the equilibrium constant with ΔG° = −nFE° and ΔG° = −RT ln K.",
  minutes: 35,
  objectives: [
    "Use ΔG° = −nFE° to convert between cell potential and free energy.",
    "Relate E° > 0 to ΔG° < 0 and K > 1.",
    "Calculate K from E° for a redox reaction.",
  ],
  concepts: [
    { slug: "electrochemistry", name: "Electrochemistry", description: "Redox reactions and the cells that convert chemical and electrical energy.", subject: "subj_chem" },
  ],
  formulas: ["electrochemistry", "free-energy"],
  blocks: [
    def("Electrical work", r`A cell pushing $n$ moles of electrons through potential $E$ does $nFE$ of work, with $F = 96{,}485$ C/mol (the Faraday constant). The maximum work equals the free-energy decrease, so $\Delta G^\circ = -nFE^\circ$. A positive $E^\circ$ means a favorable (galvanic) reaction.`),
    def("Three equivalent signals", r`$E^\circ > 0 \Leftrightarrow \Delta G^\circ < 0 \Leftrightarrow K > 1$. Combining with $\Delta G^\circ = -RT\ln K$ gives $\ln K = \frac{nFE^\circ}{RT}$, so even modest potentials give huge K.`),
    example(r`Zn | Zn²⁺ || Cu²⁺ | Cu, E° = 1.10 V, n = 2`, [
      [r`\Delta G^\circ = -2(96{,}485)(1.10)`, ""],
      [r`= -2.12\times10^5\ \text{J} = -212\ \text{kJ}`, ""],
      [r`\ln K = \tfrac{2(96{,}485)(1.10)}{8.314(298)} = 85.7`, ""],
      [r`K = 1.6\times10^{37}`, "The reaction goes to completion."],
    ]),
    activity("galvanic-cell", { title: "E° and ΔG° for a cell", params: { left: "Zn", right: "Cu", leftConc: 1, rightConc: 1 } }),
    callout("tip", "Try this", r`Swap in different metal pairs at 1 M and compare the ΔG readout with −nFE° for each. Pairs farther apart in the table give larger potentials and more negative ΔG.`, "experiment"),
    callout("warning", "Units", r`$nFE$ comes out in joules (C × V = J). Divide by 1000 before comparing with ΔG° in kJ. Don't multiply E° by stoichiometric coefficients: n already accounts for the electrons.`),
    callout("application", "Where this shows up", r`Battery makers pick electrode pairs for large E°, and fuel cells turn the free energy of 2H₂ + O₂ → 2H₂O directly into electricity rather than heat.`),
  ],
  questions: [
    num(2, r`Find ΔG° for Cu | Cu²⁺ || Ag⁺ | Ag (E° = 0.46 V, n = 2), in kJ to one decimal place.`, -88.8, { tolerance: 0.2, unit: "kJ" }, ["−nFE°, then divide by 1000."], r`$-2(96{,}485)(0.46) = -88{,}800$ J.`),
    num(3, r`Find K at 298 K for a reaction with E° = 0.10 V and n = 1, to the nearest whole number.`, 49, { tolerance: 1 }, ["ln K = nFE°/RT."], r`$\ln K = 9648.5/2477.6 = 3.89$; $K = 49$.`),
    mc(2, r`A cell has E° < 0. Then…`, ["ΔG° < 0, K > 1", "ΔG° > 0, K < 1", "ΔG° = 0", "the cell is galvanic"], 1, ["ΔG° = −nFE°. If E° is negative, what sign is ΔG°, and what does that mean for K?"], r`The reaction as written is unfavorable.`),
    mc(2, r`F, the Faraday constant, is…`, ["the charge on one electron", "the charge on one mole of electrons", "R × T", "volts per mole"], 1, ["F converts moles of electrons into coulombs."], r`96,485 C/mol.`),
    mc(3, r`Doubling all coefficients of a cell reaction changes…`, ["E° and ΔG°", "ΔG° but not E°", "E° but not ΔG°", "neither"], 1, ["n doubles; E° is intensive."], r`ΔG° doubles with n; E° stays.`, "review"),
  ],
});
