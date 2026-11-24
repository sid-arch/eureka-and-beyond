import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "colligative-properties",
  title: "Colligative properties",
  summary: "Use molality and the van 't Hoff factor to compute freezing-point depression, boiling-point elevation and osmotic pressure.",
  minutes: 35,
  objectives: [
    "Calculate molality, m = mol solute / kg solvent.",
    "Use the van 't Hoff factor i for ionic solutes.",
    "Compute ΔT_f = iK_fm, ΔT_b = iK_bm and Π = iMRT.",
  ],
  concepts: [
    { slug: "solutions", name: "Solutions", description: "Homogeneous mixtures, their concentrations and properties.", subject: "subj_chem" },
  ],
  formulas: ["colligative"],
  blocks: [
    def("Counting particles", r`Colligative properties depend only on how many solute particles there are, not what they are. Molality $m = \frac{\text{mol solute}}{\text{kg solvent}}$ doesn't change with temperature. The van 't Hoff factor $i$ counts particles per formula unit: 1 for sugar, about 2 for NaCl, about 3 for CaCl₂.`),
    def("The effects", r`Freezing point drops: $\Delta T_f = iK_fm$ (water $K_f = 1.86$ °C/m). Boiling point rises: $\Delta T_b = iK_bm$ ($K_b = 0.512$ °C/m). Osmotic pressure: $\Pi = iMRT$.`),
    example(r`58.44 g of NaCl dissolved in 500. g of water`, [
      [r`m = \tfrac{1.00\ \text{mol}}{0.500\ \text{kg}} = 2.00\ m`, ""],
      [r`\Delta T_f = 2(1.86)(2.00) = 7.44\ °\text{C}`, ""],
      [r`T_f = -7.44\ °\text{C}`, ""],
    ]),
    example(r`Osmotic pressure of 0.15 M NaCl at body temperature (310 K)`, [
      [r`\Pi = 2(0.15)(0.08206)(310) \approx 7.6\ \text{atm}`, "Why IV fluids must match blood's concentration."],
    ]),
    callout("application", "Where this shows up", r`Road salt, antifreeze, salting pasta water (a small effect, actually), and the swelling or shrinking of cells in the wrong solution.`),
  ],
  questions: [
    num(2, r`Find the freezing point of 1.00 m NaCl in water.`, -3.72, { tolerance: 0.01, unit: "°C" }, [], r`$2(1.86)(1.00)$.`),
    num(2, r`Find the boiling point of 0.50 m glucose in water, to two decimal places.`, 100.26, { tolerance: 0.01, unit: "°C" }, [], r`$0.512(0.50) = 0.256$.`),
    mc(2, r`Which lowers water's freezing point most, at the same molality?`, ["glucose", "NaCl", "CaCl₂", "ethanol"], 2, [], r`i ≈ 3.`),
    mc(3, r`Molality is preferred over molarity here because…`, ["it's easier to say", "it doesn't change with temperature", "it uses liters", "it counts ions"], 1, [], r`Mass doesn't expand with heat.`, "review"),
  ],
});
