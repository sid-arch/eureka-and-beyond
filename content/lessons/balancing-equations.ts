import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "balancing-equations",
  title: "Writing and balancing chemical equations",
  summary: "Translate word equations into chemical equations with state symbols, and balance them by adjusting coefficients so atoms are conserved.",
  minutes: 30,
  objectives: [
    "Write chemical equations with formulas and state symbols (s, l, g, aq).",
    "Balance equations by changing coefficients, never subscripts.",
    "Use a systematic order: elements in only one compound first, lone elements last.",
  ],
  concepts: [
    { slug: "chemical-reactions", name: "Chemical reactions", description: "How substances rearrange into new ones, described by balanced equations.", subject: "subj_chem" },
  ],
  blocks: [
    def("Why balance", r`Atoms are neither created nor destroyed, so each element must have the same count on both sides. Change only the coefficients; changing a subscript would change the substance (H₂O vs H₂O₂).`),
    example(r`Propane burns: C₃H₈ + O₂ → CO₂ + H₂O`, [
      [r`\text{C}_3\text{H}_8 + \text{O}_2 \to 3\text{CO}_2 + \text{H}_2\text{O}`, "Balance C first."],
      [r`\text{C}_3\text{H}_8 + \text{O}_2 \to 3\text{CO}_2 + 4\text{H}_2\text{O}`, "Then H."],
      [r`\text{C}_3\text{H}_8 + 5\text{O}_2 \to 3\text{CO}_2 + 4\text{H}_2\text{O}`, "O last: 6 + 4 = 10 atoms, so 5 O₂."],
    ]),
    example(r`Iron rusts: Fe + O₂ → Fe₂O₃`, [
      [r`4\text{Fe} + 3\text{O}_2 \to 2\text{Fe}_2\text{O}_3`, "Make O even on both sides (6), then balance Fe."],
    ]),
    activity("stoichiometry", { title: "A balanced reaction in action" }),
    callout("application", "Where this shows up", r`Engine tuning (the ratio of fuel to air comes from the balanced combustion equation) and dosing reactants in industrial chemistry.`),
  ],
  questions: [
    num(2, r`Balance __H₂ + __N₂ → __NH₃. What is the coefficient of H₂?`, 3, {}, [], r`$3\text{H}_2 + \text{N}_2 \to 2\text{NH}_3$.`),
    num(2, r`Balance __CH₄ + __O₂ → __CO₂ + __H₂O with lowest whole numbers. What is the sum of the coefficients?`, 6, {}, [], r`1 + 2 + 1 + 2.`),
    num(3, r`Balance __Al + __HCl → __AlCl₃ + __H₂. What is the coefficient of HCl?`, 6, {}, [], r`$2\text{Al} + 6\text{HCl} \to 2\text{AlCl}_3 + 3\text{H}_2$.`),
    mc(3, r`Why can't you balance H₂ + O₂ → H₂O by writing H₂O₂?`, ["it's too hard", "it changes the product to a different substance", "subscripts aren't allowed in equations", "it doesn't balance"], 1, [], r`H₂O₂ is hydrogen peroxide.`, "review"),
  ],
});
