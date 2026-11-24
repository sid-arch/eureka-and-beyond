import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "conditional-statements",
  title: "Conditional statements",
  summary: "Write conditionals in if-then form, form the converse, inverse and contrapositive, determine truth values, and write biconditionals and good definitions.",
  minutes: 25,
  objectives: [
    "Identify the hypothesis and conclusion of a conditional statement and rewrite statements in if-then form.",
    "Write the converse, inverse and contrapositive and decide whether each is true.",
    "Write a biconditional and recognize when a definition is reversible.",
  ],
  concepts: [
    { slug: "conditionals", name: "Conditional statements", description: "If-then statements and their converse, inverse and contrapositive.", subject: "subj_math" },
  ],
  blocks: [
    def("Conditional", r`An if-then statement $p \rightarrow q$: "If $p$, then $q$." $p$ is the hypothesis and $q$ the conclusion. It is false only when $p$ is true and $q$ is false.`),
    def("Related conditionals", r`Converse $q \rightarrow p$ (switch). Inverse $\sim p \rightarrow \sim q$ (negate both). Contrapositive $\sim q \rightarrow \sim p$ (switch and negate). A conditional and its contrapositive always have the same truth value, and so do the converse and the inverse.`),
    example(r`"If an angle measures $30^\circ$, then it is acute."`, [
      [r`\text{Converse: if an angle is acute, it measures } 30^\circ`, r`False: a $50^\circ$ angle is acute.`],
      [r`\text{Inverse: if an angle doesn't measure } 30^\circ\text{, it isn't acute}`, r`False: same counterexample.`],
      [r`\text{Contrapositive: if an angle isn't acute, it doesn't measure } 30^\circ`, "True, like the original."],
    ]),
    text(r`Rewrite everyday statements in if-then form before analyzing them. "All squares are rectangles" becomes "If a figure is a square, then it is a rectangle." "Vertical angles are congruent" becomes "If two angles are vertical, then they are congruent."`),
    def("Biconditional", r`When a conditional and its converse are both true, combine them with "if and only if": $p \leftrightarrow q$. Every good definition is a true biconditional: "An angle is right if and only if it measures $90^\circ$."`),
    callout("warning", "A true statement can have a false converse", r`"If you live in Dallas, you live in Texas" is true. Its converse, "If you live in Texas, you live in Dallas," is false. Never assume a converse is true without checking.`),
    callout("application", "Where this shows up", r`Programming is built on if-then logic. Contracts and rules ("If you return the item within 30 days, then you get a refund") are conditionals, and arguing about the converse is a common source of disputes.`),
  ],
  questions: [
    mc(1, r`What is the hypothesis of "If $x = 4$, then $x^2 = 16$"?`, [r`$x^2 = 16$`, r`$x = 4$`, r`$x = \pm 4$`, "If"], 1, [], r`The hypothesis follows "if": $x = 4$.`),
    mc(2, r`What is the converse of "If $x = 4$, then $x^2 = 16$," and is it true?`, [r`If $x^2 = 16$, then $x = 4$; false`, r`If $x^2 = 16$, then $x = 4$; true`, r`If $x \ne 4$, then $x^2 \ne 16$; false`, r`If $x^2 \ne 16$, then $x \ne 4$; true`], 0, ["Switch hypothesis and conclusion.", "Try x = −4."], r`$x = -4$ also gives 16, so the converse is false.`),
    mc(2, r`Which statement always has the same truth value as a conditional?`, ["Its converse", "Its inverse", "Its contrapositive", "Its negation"], 2, [], r`A conditional and its contrapositive are logically equivalent.`),
    mc(2, r`Write "Supplementary angles sum to 180°" in if-then form.`, ["If angles sum to 180°, they are supplementary", "If two angles are supplementary, their measures sum to 180°", "If angles are 90°, they are supplementary", "Angles are supplementary if and only if they are adjacent"], 1, ["The subject becomes the hypothesis."], r`"If two angles are supplementary, then their measures sum to 180°."`),
    mc(3, r`Which is a valid biconditional?`, ["An angle is acute if and only if it measures 45°", "A number is even if and only if it is divisible by 2", "A figure is a square if and only if it has four sides", "x² = 9 if and only if x = 3"], 1, ["Check that both directions are true."], r`Divisible by 2 is exactly the definition of even, so both directions hold.`, "review"),
  ],
});
