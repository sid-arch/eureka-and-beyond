import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "naming-ionic-compounds",
  title: "Naming ionic compounds",
  summary: "Name and write formulas for binary ionic compounds, transition-metal compounds with Roman numerals, and compounds with polyatomic ions.",
  minutes: 30,
  objectives: [
    "Name binary ionic compounds: metal name + nonmetal root + -ide.",
    "Use Roman numerals for metals with more than one possible charge.",
    "Recognize common polyatomic ions and use parentheses in formulas.",
  ],
  concepts: [
    { slug: "nomenclature", name: "Chemical nomenclature", description: "Systematic names and formulas for compounds.", subject: "subj_chem" },
  ],
  blocks: [
    def("Binary ionic", r`Name the cation (the metal), then the anion with -ide: NaCl is sodium chloride, CaO calcium oxide, Al₂S₃ aluminum sulfide.`),
    def("Variable charges", r`Transition metals often have several charges; a Roman numeral gives it: FeCl₃ is iron(III) chloride (Fe³⁺), FeCl₂ is iron(II) chloride, Cu₂O is copper(I) oxide. Find the charge by balancing the anions.`),
    def("Polyatomic ions", r`Memorize the common ones: NH₄⁺ ammonium, OH⁻ hydroxide, NO₃⁻ nitrate, SO₄²⁻ sulfate, CO₃²⁻ carbonate, PO₄³⁻ phosphate. Use parentheses when you need more than one: Ca₃(PO₄)₂.`),
    example(r`Write formulas for calcium phosphate and copper(II) sulfate`, [
      [r`\text{Ca}^{2+},\ \text{PO}_4^{3-} \Rightarrow \text{Ca}_3(\text{PO}_4)_2`, "3(+2) + 2(−3) = 0."],
      [r`\text{Cu}^{2+},\ \text{SO}_4^{2-} \Rightarrow \text{CuSO}_4`, ""],
    ]),
    callout("application", "Where this shows up", r`Ingredient labels (sodium bicarbonate, calcium carbonate), fertilizers (ammonium nitrate) and the iron(II) sulfate in iron supplements.`),
  ],
  questions: [
    mc(1, r`Name K₂O.`, ["potassium oxide", "dipotassium oxide", "potassium(II) oxide", "potassium oxygen"], 0, [], r`Group 1 has only one charge.`),
    mc(2, r`Name Fe₂O₃.`, ["iron(II) oxide", "iron(III) oxide", "diiron trioxide", "iron oxide(III)"], 1, [], r`3(−2) = −6 shared by 2 Fe: +3 each.`),
    mc(2, r`What is the formula of ammonium sulfate?`, ["NH₄SO₄", "(NH₄)₂SO₄", "NH₄(SO₄)₂", "(NH₄)₃SO₄"], 1, [], r`Two +1 ions balance one −2 ion.`),
    mc(3, r`Which needs a Roman numeral in its name?`, ["NaCl", "MgO", "CuCl₂", "Al₂O₃"], 2, [], r`Copper can be +1 or +2.`, "review"),
  ],
});
