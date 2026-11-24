import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "properties-of-k",
  title: "Properties of the equilibrium constant",
  summary: "Manipulate K when reactions are reversed, multiplied by a factor or added together.",
  minutes: 30,
  objectives: [
    "Reverse a reaction: K' = 1/K.",
    "Multiply coefficients by n: K' = Kⁿ.",
    "Add reactions: multiply their K values.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Rules", r`Reversing a reaction inverts K. Multiplying all coefficients by n raises K to the nth power (halving the coefficients takes the square root). Adding reactions multiplies their K values; compare Hess's law, where ΔH values add.`),
    example(r`A ⇌ B has K₁ = 4.0; B ⇌ C has K₂ = 0.50`, [
      [r`\text{A} \rightleftharpoons \text{C}:\ K = 4.0(0.50) = 2.0`, ""],
      [r`2\text{A} \rightleftharpoons 2\text{B}:\ K = 4.0^2 = 16`, ""],
      [r`\text{B} \rightleftharpoons \text{A}:\ K = \tfrac{1}{4.0} = 0.25`, ""],
    ]),
    callout("application", "Where this shows up", r`Combining tabulated K values (acid dissociation, solubility, complex formation) gives K for reactions that were never measured directly.`),
  ],
  questions: [
    num(2, r`N₂ + 3H₂ ⇌ 2NH₃ has K = 0.50. Find K for 2NH₃ ⇌ N₂ + 3H₂.`, 2, {}, ["Reversing a reaction gives the reciprocal of K."], r`$\frac{1}{0.50}$.`),
    num(2, r`Find K for ½N₂ + 3/2 H₂ ⇌ NH₃, to two decimal places.`, 0.71, { tolerance: 0.01 }, ["Halving every coefficient raises K to the power ½."], r`$\sqrt{0.50}$.`),
    num(3, r`Reaction 1 has K = 1.0 × 10⁻⁵; reaction 2 has K = 2.0 × 10³. Find K for their sum.`, 0.02, { tolerance: 0.0001 }, ["Adding reactions combines their K expressions by multiplication."], r`Multiply.`),
    mc(3, r`When reactions are added, their K values…`, ["add", "multiply", "subtract", "average"], 1, ["Write the two K expressions and multiply them. Do you get the K of the combined reaction?"], r`Exponent rules from the K expressions.`, "review"),
  ],
});
