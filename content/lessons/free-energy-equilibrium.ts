import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "free-energy-equilibrium",
  title: "Free energy and equilibrium",
  summary: "Relate ΔG° to the equilibrium constant with ΔG° = −RT ln K, and use ΔG = ΔG° + RT ln Q to predict which way a mixture will shift.",
  minutes: 40,
  objectives: [
    "Convert between ΔG° and K with ΔG° = −RT ln K.",
    "Connect the sign of ΔG° to K > 1 or K < 1.",
    "Use ΔG = ΔG° + RT ln Q for nonstandard mixtures.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["free-energy", "equilibrium-constant"],
  blocks: [
    def("The link", r`$\Delta G^\circ = -RT\ln K$ with $R = 8.314$ J/(mol·K). Negative ΔG° means K > 1 (products favored at equilibrium); positive ΔG° means K < 1. Because the relationship is exponential, every 5.7 kJ at 298 K changes K by a factor of 10.`),
    example(r`K for the Haber process at 298 K (ΔG° = −33.0 kJ)`, [
      [r`\ln K = \tfrac{33{,}000}{8.314 \times 298}`, ""],
      [r`= 13.32`, ""],
      [r`K = e^{13.32} = 6.1\times10^5`, "Strongly product-favored."],
    ]),
    example(r`K when ΔG° = +10.0 kJ at 298 K`, [
      [r`\ln K = -\tfrac{10{,}000}{2478}`, "RT = 2478 J."],
      [r`K = e^{-4.04} = 0.018`, "Reactants favored, but not overwhelmingly."],
    ]),
    def("Nonstandard conditions", r`$\Delta G = \Delta G^\circ + RT\ln Q$. If $Q < K$, ΔG < 0 and the forward reaction proceeds; if $Q > K$, ΔG > 0 and it runs in reverse; at $Q = K$, ΔG = 0.`),
    example(r`Haber mixture with Q = 1.0 × 10⁷ at 298 K`, [
      [r`\Delta G = -33.0 + 2.478\ln(10^7)`, "kJ"],
      [r`= -33.0 + 39.9 = +6.9\ \text{kJ}`, "Q > K: NH₃ decomposes."],
    ]),
    activity("free-energy", { title: "K from ΔG°", params: { dH: -92.2, dS: -198.7, T: 298 } }),
    callout("application", "Where this shows up", r`Biochemists quote ΔG° for metabolic steps, but cells keep Q far from K so even steps with positive ΔG° run forward.`),
  ],
  questions: [
    num(2, r`Find K at 298 K for ΔG° = −5.0 kJ, to one decimal place.`, 7.5, { tolerance: 0.1 }, ["K = e^(−ΔG°/RT); RT = 2478 J."], r`$e^{5000/2478} = e^{2.02} = 7.5$.`),
    num(3, r`A reaction has K = 1.0 × 10⁻⁵ at 298 K. Find ΔG° in kJ, to one decimal place.`, 28.5, { tolerance: 0.1, unit: "kJ" }, ["ΔG° = −RT ln K."], r`$-(8.314)(298)\ln(10^{-5}) = +28.5$ kJ.`),
    num(3, r`For the Haber process (ΔG° = −33.0 kJ), find ΔG at 298 K when Q = 100, to one decimal place.`, -21.6, { tolerance: 0.1, unit: "kJ" }, ["Add RT ln Q in kJ."], r`$-33.0 + 2.478(4.605) = -21.6$ kJ.`),
    mc(2, r`If ΔG° > 0, then…`, ["K > 1", "K < 1", "K = 1", "K = 0"], 1, ["ΔG° = −RT ln K. If ΔG° is positive, what sign is ln K?"], r`$\ln K < 0$.`),
    mc(3, r`At equilibrium…`, ["ΔG° = 0", "ΔG = 0", "Q = 0", "K = 1 always"], 1, ["ΔG° is a fixed property of the reaction."], r`ΔG = 0 at Q = K; ΔG° keeps its value.`, "review"),
  ],
});
