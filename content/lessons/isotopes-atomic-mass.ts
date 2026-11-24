import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "isotopes-atomic-mass",
  title: "Isotopes and average atomic mass",
  summary: "Define isotopes, write isotope notation, and compute the weighted-average atomic mass on the periodic table from isotope abundances.",
  minutes: 30,
  objectives: [
    "Define isotopes and write isotope symbols.",
    "Compute average atomic mass as an abundance-weighted average.",
    "Work backward from an average mass to an isotope abundance.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  blocks: [
    def("Isotopes", r`Isotopes are atoms of the same element (same number of protons) with different numbers of neutrons, such as carbon-12 and carbon-14. They behave almost identically in chemical reactions.`),
    def("Average atomic mass", r`The atomic mass on the periodic table is the weighted average of the isotopes' masses: $\bar m = \sum(\text{fraction})\times(\text{isotope mass})$.`),
    example(r`Chlorine: 75.78% Cl-35 (34.969 u) and 24.22% Cl-37 (36.966 u)`, [
      [r`\bar m = 0.7578(34.969) + 0.2422(36.966)`, ""],
      [r`\bar m \approx 35.45\ \text{u}`, "Closer to 35 because Cl-35 is more common."],
    ]),
    example(r`Boron (10.81 u) is B-10 (10.013 u) and B-11 (11.009 u). Find the B-10 fraction x`, [
      [r`10.013x + 11.009(1 - x) = 10.81`, ""],
      [r`x = \tfrac{11.009 - 10.81}{0.996} \approx 0.20`, "About 20% B-10."],
    ]),
    callout("application", "Where this shows up", r`Carbon-14 dating, uranium enrichment and isotope-ratio tests that catch counterfeit honey and doping athletes.`),
  ],
  questions: [
    num(2, r`Copper is 69.15% Cu-63 (62.930 u) and 30.85% Cu-65 (64.928 u). Find its average atomic mass, to two decimal places.`, 63.55, { tolerance: 0.01, unit: "u" }, [], r`$0.6915(62.930) + 0.3085(64.928)$.`),
    num(3, r`Gallium (69.72 u) is Ga-69 (68.926 u) and Ga-71 (70.925 u). Find the percent of Ga-69, to the nearest percent.`, 60, { tolerance: 1, unit: "%" }, [], r`$x = \frac{70.925 - 69.72}{1.999} \approx 0.603$.`),
    mc(2, r`Carbon-12 and carbon-14 differ in…`, ["protons", "electrons", "neutrons", "chemical behavior"], 2, [], r`Same element.`),
    mc(3, r`Why is no atom of chlorine exactly 35.45 u?`, ["rounding", "it's an average of isotopes", "electrons have mass", "measurement error"], 1, [], r`Individual atoms are 35 or 37.`, "review"),
  ],
});
