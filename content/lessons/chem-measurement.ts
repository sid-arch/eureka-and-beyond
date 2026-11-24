import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "chem-measurement",
  title: "Measurement, significant figures and unit conversion",
  summary: "Use SI units and prefixes, count and round with significant figures, and convert units with dimensional analysis, including density.",
  minutes: 35,
  objectives: [
    "Use SI base units and metric prefixes.",
    "Count significant figures and apply the rules for calculations.",
    "Convert units with conversion factors, including density, d = m/V.",
  ],
  concepts: [
    { slug: "matter", name: "Matter", description: "Anything with mass and volume, classified as pure substances or mixtures.", subject: "subj_chem" },
  ],
  blocks: [
    def("Significant figures", r`All nonzero digits count; zeros between them count; leading zeros never count; trailing zeros count only with a decimal point. So 0.00450 has 3 significant figures and 1200 has 2. Multiplying or dividing: keep the fewest significant figures. Adding or subtracting: keep the fewest decimal places.`),
    def("Dimensional analysis", r`Multiply by conversion factors equal to 1 (such as $\frac{1000\ \text{mL}}{1\ \text{L}}$), arranged so unwanted units cancel.`),
    example(r`What volume does 50.0 g of mercury (d = 13.6 g/mL) occupy?`, [
      [r`V = 50.0\ \text{g}\times\tfrac{1\ \text{mL}}{13.6\ \text{g}} = 3.68\ \text{mL}`, "Three significant figures."],
    ]),
    example(r`Convert 65 mi/h to m/s (1 mi = 1609 m)`, [
      [r`65\tfrac{\text{mi}}{\text{h}}\times\tfrac{1609\ \text{m}}{1\ \text{mi}}\times\tfrac{1\ \text{h}}{3600\ \text{s}}`, ""],
      [r`\approx 29\ \text{m/s}`, "65 has two significant figures."],
    ]),
    callout("application", "Where this shows up", r`Medication dosing in mg/kg, and the 1999 Mars Climate Orbiter, lost because one team used pound-seconds and another newton-seconds.`),
  ],
  questions: [
    num(1, r`How many significant figures are in 0.004050?`, 4, {}, [], r`4, 0, 5 and the trailing 0.`),
    num(2, r`Find 12.0 × 3.1, rounded correctly.`, 37, {}, [], r`37.2 rounds to 2 significant figures.`),
    num(2, r`A 25.0 mL sample has a mass of 19.7 g. Find its density, in g/mL.`, 0.788, { tolerance: 0.001, unit: "g/mL" }, [], r`$\frac{19.7}{25.0}$ (it's ethanol).`),
    mc(3, r`2.50 L in mL, with correct significant figures, is…`, ["2500 mL", "2.50 × 10³ mL", "250 mL", "2.5 × 10³ mL"], 1, [], r`Scientific notation keeps 3 significant figures.`, "review"),
  ],
});
