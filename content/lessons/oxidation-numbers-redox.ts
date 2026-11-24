import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "oxidation-numbers-redox",
  title: "Oxidation numbers and redox reactions",
  summary: "Assign oxidation numbers, identify what is oxidized and reduced, and balance redox reactions in acidic solution by the half-reaction method.",
  minutes: 45,
  objectives: [
    "Assign oxidation numbers with the standard rules.",
    "Identify oxidation, reduction, oxidizing agents and reducing agents.",
    "Balance redox equations in acid with half-reactions.",
  ],
  concepts: [
    { slug: "electrochemistry", name: "Electrochemistry", description: "Redox reactions and the cells that convert chemical and electrical energy.", subject: "subj_chem" },
  ],
  blocks: [
    def("Oxidation numbers", r`Elements are 0; monatomic ions equal their charge; O is usually −2 and H +1 (with nonmetals); F is always −1; the numbers sum to the overall charge. Oxidation is loss of electrons (the number rises); reduction is gain (the number falls): "OIL RIG".`),
    example(r`Find the oxidation numbers of S in H₂SO₄ and Mn in KMnO₄`, [
      [r`2(+1) + S + 4(-2) = 0 \Rightarrow S = +6`, ""],
      [r`+1 + \text{Mn} + 4(-2) = 0 \Rightarrow \text{Mn} = +7`, ""],
    ]),
    def("Half-reactions in acid", r`Split into oxidation and reduction; balance atoms other than O and H; add H₂O for O, H⁺ for H, and electrons for charge; multiply so electrons cancel; add.`),
    example(r`MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic)`, [
      [r`\text{MnO}_4^- + 8\text{H}^+ + 5e^- \to \text{Mn}^{2+} + 4\text{H}_2\text{O}`, "Reduction."],
      [r`5\text{Fe}^{2+} \to 5\text{Fe}^{3+} + 5e^-`, "Oxidation, ×5."],
      [r`\text{MnO}_4^- + 8\text{H}^+ + 5\text{Fe}^{2+} \to`, "Add them; electrons cancel."],
      [r`\text{Mn}^{2+} + 4\text{H}_2\text{O} + 5\text{Fe}^{3+}`, ""],
    ]),
    callout("application", "Where this shows up", r`Rusting, batteries, bleach, photosynthesis and respiration are all redox; this reaction (permanganate with iron) is a classic titration for iron content.`),
  ],
  questions: [
    num(2, r`Find the oxidation number of Cr in Cr₂O₇²⁻.`, 6, {}, [], r`$2\text{Cr} + 7(-2) = -2$.`),
    mc(2, r`In Zn + Cu²⁺ → Zn²⁺ + Cu, the oxidizing agent is…`, ["Zn", "Cu²⁺", "Zn²⁺", "Cu"], 1, [], r`It gets reduced.`),
    num(3, r`Balance Cu + NO₃⁻ → Cu²⁺ + NO in acid. How many H⁺ appear in the balanced equation (lowest whole numbers)?`, 8, {}, [], r`$3\text{Cu} + 2\text{NO}_3^- + 8\text{H}^+ \to 3\text{Cu}^{2+} + 2\text{NO} + 4\text{H}_2\text{O}$.`),
    mc(3, r`Which change is a reduction?`, ["Fe²⁺ → Fe³⁺", "Cl⁻ → Cl₂", "O₂ → O²⁻", "Na → Na⁺"], 2, [], r`Oxidation number falls from 0 to −2.`, "review"),
  ],
});
