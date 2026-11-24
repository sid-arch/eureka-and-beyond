import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "indirect-proof",
  title: "Indirect proof",
  summary: "Prove statements by contradiction: assume the opposite, reason to an impossibility, and conclude the original statement is true.",
  minutes: 30,
  objectives: [
    "Describe the steps of an indirect proof (proof by contradiction).",
    "Write the correct temporary assumption, the negation of the conclusion.",
    "Write indirect proofs in algebra and geometry.",
  ],
  concepts: [
    { slug: "indirect-proof", name: "Indirect proof", description: "Proving a statement by showing its negation leads to a contradiction.", subject: "subj_math" },
  ],
  blocks: [
    def("Indirect proof", r`1. Assume temporarily that the conclusion is false. 2. Reason logically from that assumption until you reach a contradiction with a given fact, a definition, or a known theorem. 3. Conclude that the assumption was false, so the original statement is true.`),
    text(r`Indirect proof is useful when the conclusion is a "not," a "no," or an "at most" statement, where it's hard to argue directly. It works because a statement and its negation can't both be true.`),
    example(r`Prove: a triangle has at most one obtuse angle`, [
      [r`\text{Assume } \triangle ABC \text{ has two obtuse angles, } \angle A, \angle B`, "Negate the conclusion."],
      [r`m\angle A + m\angle B > 90^\circ + 90^\circ = 180^\circ`, ""],
      [r`m\angle A + m\angle B + m\angle C > 180^\circ`, "Since m∠C > 0."],
      [r`\text{Contradicts the Triangle Angle Sum Theorem}`, "So the assumption is false: at most one obtuse angle."],
    ]),
    example(r`Prove: if $x^2$ is even, then $x$ is even (for integers $x$)`, [
      [r`\text{Assume } x \text{ is odd: } x = 2k + 1`, ""],
      [r`x^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1`, "That's odd."],
      [r`\text{Contradicts } x^2 \text{ even}`, "So x is even."],
    ], r`This fact is the key step in the classic proof that $\sqrt{2}$ is irrational, also an indirect proof.`),
    callout("warning", "Negate carefully", r`The negation of "at most one" is "two or more." The negation of "$\overline{AB} \parallel \overline{CD}$" is "$\overline{AB}$ is not parallel to $\overline{CD}$" (in a plane, their lines intersect). A wrong negation makes the whole proof invalid.`),
    callout("application", "Where this shows up", r`Detectives and doctors reason this way ("if it were X, we'd see Y, but we don't, so it isn't X"). Computer scientists prove some problems are unsolvable by contradiction.`),
  ],
  questions: [
    mc(1, r`What is the first step of an indirect proof of "∠A is acute"?`, ["Assume ∠A is acute", "Assume ∠A is not acute", "Assume ∠A is 90°", "Measure ∠A"], 1, [], r`Assume the negation of the conclusion: ∠A is not acute (it's right or obtuse).`),
    mc(2, r`What is the negation of "There are at most two solutions"?`, ["There are at least two solutions", "There are no solutions", "There are three or more solutions", "There are exactly two solutions"], 2, [], r`"At most two" is false exactly when there are three or more.`),
    mc(2, r`In an indirect proof that lines ℓ and m are parallel, what do you assume?`, ["ℓ and m are parallel", "ℓ and m intersect", "ℓ and m are perpendicular", "ℓ = m"], 1, [], r`In a plane, distinct lines that aren't parallel intersect.`),
    mc(3, r`An indirect proof assumes $x \le 3$ and reaches $5 < 2$. What's the conclusion?`, [r`$x \le 3$`, r`$x > 3$`, r`$5 < 2$`, "Nothing"], 1, [], r`The assumption led to a contradiction, so it's false: $x > 3$.`, "review"),
  ],
});
