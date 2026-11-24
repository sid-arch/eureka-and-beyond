import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "two-column-proofs",
  title: "Writing two-column proofs",
  summary: "Organize a geometric argument as statements with reasons, using properties of equality and congruence, definitions, postulates and theorems.",
  minutes: 30,
  objectives: [
    "Use the reflexive, symmetric, transitive and substitution properties as reasons.",
    "Write two-column proofs about segments and angles.",
    "Prove simple theorems such as the Congruent Supplements Theorem.",
  ],
  concepts: [
    { slug: "algebraic-proof", name: "Algebraic proof", description: "A sequence of justified steps showing a statement holds for all values.", subject: "subj_math" },
    { slug: "geometric-proof", name: "Geometric proof", description: "Justifying geometric statements with definitions, postulates and theorems.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A proof is a chain of statements in which each one follows from earlier ones. In a two-column proof the left column lists statements and the right column gives a reason for each: "Given," a definition, a property, a postulate or a theorem already proved.`),
    def("Properties of congruence", r`Reflexive: $\overline{AB} \cong \overline{AB}$. Symmetric: if $\angle A \cong \angle B$, then $\angle B \cong \angle A$. Transitive: if $\overline{AB} \cong \overline{CD}$ and $\overline{CD} \cong \overline{EF}$, then $\overline{AB} \cong \overline{EF}$. The same properties hold for equality, along with substitution and the addition, subtraction, multiplication and division properties.`),
    example(r`Given: $AB = CD$, with points in order $A, B, C, D$ on a line. Prove: $AC = BD$.`, [
      [r`1.\ AB = CD`, "Given."],
      [r`2.\ AB + BC = CD + BC`, "Addition property of equality."],
      [r`3.\ AB + BC = AC,\ BC + CD = BD`, "Segment Addition Postulate."],
      [r`4.\ AC = BD`, "Substitution (steps 2 and 3)."],
    ]),
    example(r`Congruent Supplements Theorem. Given: $\angle 1$ and $\angle 2$ are supplementary, $\angle 3$ and $\angle 2$ are supplementary. Prove: $\angle 1 \cong \angle 3$.`, [
      [r`1.\ m\angle 1 + m\angle 2 = 180^\circ,\ m\angle 3 + m\angle 2 = 180^\circ`, "Definition of supplementary angles."],
      [r`2.\ m\angle 1 + m\angle 2 = m\angle 3 + m\angle 2`, "Substitution (or transitive property)."],
      [r`3.\ m\angle 1 = m\angle 3`, "Subtraction property of equality."],
      [r`4.\ \angle 1 \cong \angle 3`, "Definition of congruent angles."],
    ]),
    callout("tip", "Plan before you write", r`Start from what you want to prove and ask, "What would I need to know right before this?" Work backwards to the givens, then write the proof forwards.`),
    callout("warning", "Equal vs congruent", r`Measures are equal ($AB = CD$, $m\angle A = m\angle B$); figures are congruent ($\overline{AB} \cong \overline{CD}$). Switching between them needs the definition of congruence as a reason.`),
    callout("application", "Where this shows up", r`Structured proofs train the same skill as writing a convincing argument in an essay, debugging code step by step, or checking a contract: every claim needs support.`),
  ],
  questions: [
    mc(1, r`Which property justifies $\angle P \cong \angle P$?`, ["Symmetric", "Reflexive", "Transitive", "Substitution"], 1, [], r`Anything is congruent to itself: the reflexive property.`),
    mc(2, r`If $\overline{AB} \cong \overline{CD}$ and $\overline{CD} \cong \overline{EF}$, then $\overline{AB} \cong \overline{EF}$. Which property is this?`, ["Reflexive", "Symmetric", "Transitive", "Addition"], 2, [], r`The transitive property.`),
    mc(2, r`Which reason justifies "$2x = 14$, so $x = 7$"?`, ["Multiplication property", "Division property of equality", "Distributive property", "Substitution"], 1, [], r`Both sides were divided by 2.`),
    mc(2, r`In a proof, which statement could follow "$M$ is the midpoint of $\overline{AB}$" with reason "Definition of midpoint"?`, [r`$AM = AB$`, r`$\overline{AM} \cong \overline{MB}$`, r`$M$ is on line $AB$ only`, r`$AM = 2MB$`], 1, [], r`A midpoint divides a segment into two congruent segments.`),
    mc(3, r`What theorem lets you conclude $\angle 1 \cong \angle 3$ if both are complementary to $\angle 2$?`, ["Vertical Angles Theorem", "Congruent Complements Theorem", "Linear Pair Postulate", "Angle Addition Postulate"], 1, [], r`Angles complementary to the same angle are congruent.`, "review"),
  ],
});
