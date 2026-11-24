import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "daltons-law-gas-stoichiometry",
  title: "Dalton's law and gas stoichiometry",
  summary: "Use partial pressures and mole fractions, correct for water vapor when collecting gas over water, and combine PV = nRT with stoichiometry.",
  minutes: 40,
  objectives: [
    "Use Dalton's law, P_total = ΣP_i, and P_i = X_iP_total.",
    "Correct for water vapor when a gas is collected over water.",
    "Find gas volumes from reaction stoichiometry with PV = nRT.",
  ],
  concepts: [
    { slug: "gas-laws", name: "Gas laws", description: "Relationships among pressure, volume, temperature and amount of a gas.", subject: "subj_chem" },
  ],
  formulas: ["combined-gas-law"],
  blocks: [
    def("Partial pressures", r`In a gas mixture each gas acts independently: $P_{total} = P_1 + P_2 + \cdots$, and each partial pressure is $P_i = X_iP_{total}$, where $X_i = \frac{n_i}{n_{total}}$ is the mole fraction.`),
    def("Collecting over water", r`Gas bubbled into an inverted bottle of water is mixed with water vapor, so $P_{gas} = P_{total} - P_{\text{H}_2\text{O}}$. Water's vapor pressure is 23.8 torr at 25 °C.`),
    example(r`Zn + 2HCl → ZnCl₂ + H₂: 2.00 g of Zn reacts; H₂ is collected over water at 25 °C and 745 torr total`, [
      [r`n_{\text{H}_2} = \tfrac{2.00}{65.38} = 0.0306\ \text{mol}`, "1 : 1 ratio."],
      [r`P_{\text{H}_2} = 745 - 23.8 = 721\ \text{torr} = 0.949\ \text{atm}`, ""],
      [r`V = \tfrac{nRT}{P} = \tfrac{0.0306(0.08206)(298)}{0.949}`, ""],
      [r`V \approx 0.789\ \text{L}`, ""],
    ]),
    activity("ideal-gas", { title: "PV = nRT for the collected gas" }),
    callout("application", "Where this shows up", r`Scuba divers track the partial pressure of O₂ (too high is toxic at depth); airbags are sized with gas stoichiometry.`),
  ],
  questions: [
    num(2, r`A mixture has 2.0 mol N₂ and 0.50 mol O₂ at a total of 1.25 atm. Find P of O₂.`, 0.25, { unit: "atm" }, [], r`$X = \frac{0.5}{2.5} = 0.20$.`),
    num(3, r`What volume of CO₂ at 1.00 atm and 298 K forms when 10.0 g of CaCO₃ (100.09 g/mol) decomposes? Give two decimal places.`, 2.44, { tolerance: 0.01, unit: "L" }, [], r`$0.0999$ mol $\times \frac{0.08206(298)}{1.00}$.`),
    mc(2, r`Adding helium to a rigid flask of N₂ changes the N₂ partial pressure by…`, ["raising it", "lowering it", "nothing", "doubling it"], 2, [], r`Gases act independently.`),
    mc(3, r`Why subtract water's vapor pressure when collecting gas over water?`, ["water absorbs the gas", "the bottle also contains water vapor", "water is heavy", "to correct for temperature"], 1, [], r`Dalton's law.`, "review"),
  ],
});
