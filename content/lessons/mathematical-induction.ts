import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "mathematical-induction",
  title: "Proof by mathematical induction",
  summary: "Prove statements about all positive integers with a base case and an inductive step, including sum formulas and divisibility.",
  minutes: 35,
  objectives: [
    "Describe the structure of an induction proof.",
    "Prove sum formulas such as 1 + 2 + … + n = n(n + 1)/2.",
    "Prove divisibility statements and identify flawed induction arguments.",
  ],
  concepts: [
    { slug: "induction", name: "Mathematical induction", description: "Proving a statement for all integers n ≥ n₀ with a base case and an inductive step.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Picture an infinite line of dominoes. If the first one falls, and each falling domino knocks over the next, then every domino falls. Induction proves infinitely many statements the same way.`),
    def("Induction", r`To prove $P(n)$ for all integers $n \ge 1$: (1) Base case: prove $P(1)$. (2) Inductive step: assume $P(k)$ is true for some $k \ge 1$ (the inductive hypothesis) and prove $P(k + 1)$.`),
    example(r`Prove $1 + 3 + 5 + \cdots + (2n - 1) = n^2$`, [
      [r`n = 1: 1 = 1^2 ✓`, "Base case."],
      [r`\text{Assume } 1 + 3 + \cdots + (2k - 1) = k^2`, "Inductive hypothesis."],
      [r`k^2 + (2(k + 1) - 1) = k^2 + 2k + 1 = (k + 1)^2`, "Add the next odd number. So P(k + 1) holds. ∎"],
    ]),
    example(r`Prove $3^n - 1$ is divisible by 2 for all $n \ge 1$`, [
      [r`n = 1: 3 - 1 = 2 ✓`, ""],
      [r`\text{Assume } 3^k - 1 = 2m`, ""],
      [r`3^{k+1} - 1 = 3 \cdot 3^k - 1 = 3(2m + 1) - 1 = 6m + 2 = 2(3m + 1)`, "Divisible by 2. ∎"],
    ]),
    callout("warning", "Both steps are required", r`Without a base case, you could "prove" $n = n + 1$ (the inductive step works, but no domino ever falls). Without the inductive step, checking examples proves nothing in general.`),
    callout("application", "Where this shows up", r`Computer scientists prove loops and recursive algorithms correct by induction, and it underlies formulas used everywhere, such as the sums in sigma notation.`),
  ],
  questions: [
    mc(1, r`What is the first step of an induction proof?`, ["Assume P(k)", "Prove the base case", "Prove P(k + 1)", "Check many examples"], 1, [], r`Establish the base case.`),
    mc(2, r`In the inductive step, what do you assume?`, ["P(k + 1)", "P(k) for some k", "P(n) for all n", "Nothing"], 1, [], r`The inductive hypothesis: P(k).`),
    mc(2, r`To prove $\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}$, what must you show in the inductive step?`, [r`$\frac{k(k + 1)}{2} + (k + 1) = \frac{(k + 1)(k + 2)}{2}$`, r`$\frac{k(k + 1)}{2} = \frac{(k + 1)(k + 2)}{2}$`, r`$1 = 1$`, r`$k + 1 = k$`], 0, [], r`Add the next term to the assumed sum and simplify to the formula with $n = k + 1$.`),
    mc(3, r`A "proof" shows P(k) ⇒ P(k + 1) but never checks a base case. What's true?`, ["The statement is proved", "It's not a proof; the statement may be false", "It proves P(1) only", "It proves P(0)"], 1, [], r`Without a starting point, nothing follows.`, "review"),
  ],
});
