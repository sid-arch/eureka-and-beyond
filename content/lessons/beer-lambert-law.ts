import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "beer-lambert-law",
  title: "Beer–Lambert law",
  summary: "Use A = εbc to relate absorbance to concentration, build and use calibration curves, and relate absorbance to transmittance.",
  minutes: 30,
  objectives: [
    "Use A = εbc and identify each variable.",
    "Use a calibration curve to find an unknown concentration.",
    "Relate absorbance to transmittance: A = −log T.",
  ],
  concepts: [
    { slug: "solutions", name: "Solutions", description: "Homogeneous mixtures, their concentrations and properties.", subject: "subj_chem" },
  ],
  formulas: ["beer-lambert"],
  blocks: [
    def("The law", r`$A = \varepsilon bc$: absorbance is proportional to concentration c (M), path length b (cm, usually 1) and molar absorptivity ε, which depends on the substance and wavelength. Measure at the wavelength of maximum absorbance for best sensitivity. $T = 10^{-A}$.`),
    example(r`ε = 5000 M⁻¹cm⁻¹, b = 1.00 cm`, [
      [r`A = 5000(1.00)(1.0\times10^{-4}) = 0.50`, "For c = 1.0 × 10⁻⁴ M."],
      [r`T = 10^{-0.50} \approx 32\%`, ""],
      [r`c = \tfrac{0.36}{5000} = 7.2\times10^{-5}\ \text{M}`, "An unknown with A = 0.36."],
    ]),
    activity("beer-lambert", { title: "Absorbance and concentration", params: { concentration: 0.0001, path: 1, absorptivity: 5000 } }),
    callout("warning", "Common lab errors", r`Fingerprints or bubbles on the cuvette raise the absorbance, so the calculated concentration comes out too high. A different-width cuvette changes b.`),
    callout("application", "Where this shows up", r`Blood glucose meters, water-quality tests and DNA concentration measurements all use absorbance.`),
  ],
  questions: [
    num(2, r`A solution with ε = 12,000 M⁻¹cm⁻¹ in a 1.00 cm cell has A = 0.60. Find c, in units of $10^{-5}$ M.`, 5, {}, ["A = εbc; solve for c, then express it in units of 10⁻⁵ M."], r`$\frac{0.60}{12{,}000}$.`),
    num(2, r`Find the transmittance for A = 1.0, in percent.`, 10, { unit: "%" }, ["A = −log T, so T = 10^(−A)."], r`$10^{-1}$.`),
    mc(2, r`Doubling the path length doubles the…`, ["concentration", "absorbance", "transmittance", "ε"], 1, ["Look at A = εbc. Which quantity is proportional to b?"], r`$A \propto b$.`),
    mc(3, r`A smudged cuvette makes the calculated concentration…`, ["too low", "too high", "unchanged", "zero"], 1, ["A smudge absorbs light too. How does that change the measured A, and so the calculated c?"], r`Extra apparent absorbance.`, "review"),
  ],
});
