import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "paragraph-flow-proofs",
  title: "Paragraph and flow proofs",
  summary: "Write the same argument as a two-column proof, a flow proof and a paragraph proof, and choose the clearest format for a given theorem.",
  minutes: 30,
  objectives: [
    "Write a flow proof with boxes for statements and reasons underneath.",
    "Write a paragraph proof that justifies each step in complete sentences.",
    "Convert between proof formats and judge which communicates best.",
  ],
  concepts: [
    { slug: "geometric-proof", name: "Geometric proof", description: "Justifying geometric statements with definitions, postulates and theorems.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A proof is an argument, not a format. Two-column proofs make every reason explicit. Flow proofs show how statements depend on each other, which is clearer when several facts feed into one conclusion. Paragraph proofs read like ordinary mathematical writing and are what you'll see in textbooks and papers.`),
    def("Flow proof", r`Each statement goes in a box with its reason written below. Arrows show which statements lead to which. Independent facts can sit side by side and then join.`),
    def("Paragraph proof", r`A written argument in complete sentences. Every claim still needs a reason, introduced by words like "because," "by," or "since."`),
    example(r`Vertical Angles Theorem, as a paragraph proof`, [
      [r`\text{Let } \angle 1, \angle 3 \text{ be vertical, with } \angle 2 \text{ adjacent to both}`, "Set up the situation."],
      [r`m\angle 1 + m\angle 2 = 180^\circ,\ m\angle 2 + m\angle 3 = 180^\circ`, "Each pair is a linear pair, so the angles are supplementary."],
      [r`m\angle 1 = m\angle 3`, "By substitution and the subtraction property, so ∠1 ≅ ∠3."],
    ], r`Written out: "Angles 1 and 2 form a linear pair, so they are supplementary; likewise angles 2 and 3. Therefore $m\angle 1 + m\angle 2 = m\angle 2 + m\angle 3$, and subtracting $m\angle 2$ gives $m\angle 1 = m\angle 3$. So $\angle 1 \cong \angle 3$."`),
    example(r`Flow proof: if $M$ is the midpoint of $\overline{AB}$ and of $\overline{CD}$, then $\triangle AMC \cong \triangle BMD$`, [
      [r`\boxed{\overline{AM} \cong \overline{BM}} \quad \boxed{\overline{CM} \cong \overline{DM}} \quad \boxed{\angle AMC \cong \angle BMD}`, "Def. of midpoint, def. of midpoint, vertical angles: three independent boxes."],
      [r`\searrow \quad \downarrow \quad \swarrow`, "All three arrows lead to the conclusion."],
      [r`\boxed{\triangle AMC \cong \triangle BMD}`, "SAS."],
    ]),
    callout("tip", "Write the plan first", r`For any format, start with a one-sentence plan: "Show the triangles are congruent by SAS, then use CPCTC." The plan becomes the skeleton of a paragraph proof.`),
    callout("application", "Where this shows up", r`Paragraph proofs are how mathematicians, scientists and lawyers argue in writing. Flowcharts of dependencies are how engineers plan projects and how programmers trace a bug back to its cause.`),
  ],
  questions: [
    mc(1, r`In a flow proof, what goes under each box?`, ["A diagram", "The reason for that statement", "The next statement", "A question"], 1, [], r`Each box holds a statement, and its reason is written below it.`),
    mc(2, r`Which format best shows that several independent facts combine into one conclusion?`, ["Two-column", "Flow", "Paragraph", "They're identical"], 1, [], r`A flow proof shows parallel branches joining.`),
    mc(2, r`Which sentence is a properly justified step in a paragraph proof?`, ["AB = CD.", "Since M is the midpoint of AB, AM = MB.", "It's obvious that the angles are equal.", "The triangles look congruent."], 1, ["Every claim needs a reason."], r`It states the claim and the reason (the definition of midpoint).`),
    mc(3, r`A paragraph proof says: "∠A and ∠B are both complementary to ∠C, so ∠A ≅ ∠B." Which theorem justifies this?`, ["Vertical Angles Theorem", "Congruent Complements Theorem", "Linear Pair Postulate", "Triangle Sum Theorem"], 1, [], r`Angles complementary to the same angle are congruent.`, "review"),
  ],
});
