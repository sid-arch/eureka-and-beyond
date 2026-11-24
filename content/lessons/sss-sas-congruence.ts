import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sss-sas-congruence",
  title: "SSS and SAS congruence",
  summary: "Use corresponding parts and congruence statements, and prove triangles congruent with the Side-Side-Side and Side-Angle-Side criteria.",
  minutes: 30,
  objectives: [
    "Write congruence statements with corresponding vertices in order.",
    "Prove triangles congruent using SSS and SAS, including shared sides and vertical angles.",
    "Explain why SSA is not a valid congruence criterion.",
  ],
  concepts: [
    { slug: "triangle-congruence", name: "Triangle congruence", description: "Criteria (SSS, SAS, ASA, AAS, HL) that guarantee two triangles are congruent.", subject: "subj_math" },
    { slug: "congruence", name: "Congruence", description: "Figures are congruent if a sequence of rigid motions maps one onto the other.", subject: "subj_math" },
  ],
  blocks: [
    def("Congruent triangles", r`$\triangle ABC \cong \triangle DEF$ means a rigid motion maps $A \to D$, $B \to E$, $C \to F$. Then all six pairs of corresponding parts are congruent: $\overline{AB} \cong \overline{DE}$, $\angle A \cong \angle D$, and so on. The order of letters matters.`),
    text(r`You don't need all six pairs to know two triangles are congruent. Certain combinations of three force the triangle to be rigid. Try building a triangle from three fixed straws: there's only one shape possible. That's SSS.`),
    def("SSS", r`If three sides of one triangle are congruent to three sides of another, the triangles are congruent.`),
    def("SAS", r`If two sides and the included angle (the angle between them) of one triangle are congruent to those of another, the triangles are congruent.`),
    example(r`Given $\overline{AB} \cong \overline{CB}$ and $D$ is the midpoint of $\overline{AC}$. Prove $\triangle ABD \cong \triangle CBD$.`, [
      [r`1.\ \overline{AB} \cong \overline{CB}`, "Given."],
      [r`2.\ \overline{AD} \cong \overline{CD}`, "Definition of midpoint."],
      [r`3.\ \overline{BD} \cong \overline{BD}`, "Reflexive property (shared side)."],
      [r`4.\ \triangle ABD \cong \triangle CBD`, "SSS."],
    ]),
    example(r`Segments $\overline{AE}$ and $\overline{BD}$ bisect each other at $C$. Prove $\triangle ACB \cong \triangle ECD$.`, [
      [r`1.\ \overline{AC} \cong \overline{EC},\ \overline{BC} \cong \overline{DC}`, "Definition of segment bisector."],
      [r`2.\ \angle ACB \cong \angle ECD`, "Vertical angles are congruent."],
      [r`3.\ \triangle ACB \cong \triangle ECD`, "SAS (the angle is between the two sides)."],
    ]),
    callout("warning", "No SSA (or ASS)", r`Two sides and a non-included angle don't guarantee congruence. With sides 5 and 7 and a $30^\circ$ angle opposite the 5, two different triangles are possible, because the side of length 5 can swing to two positions.`),
    callout("application", "Where this shows up", r`Triangular bracing makes frames rigid precisely because of SSS: a triangle with fixed side lengths can't change shape, while a rectangle can collapse into a parallelogram.`),
  ],
  questions: [
    mc(1, r`If $\triangle PQR \cong \triangle XYZ$, which angle is congruent to $\angle Q$?`, [r`$\angle X$`, r`$\angle Y$`, r`$\angle Z$`, r`$\angle R$`], 1, ["Match letter positions."], r`$Q$ is second, so it corresponds to $Y$.`),
    mc(2, r`Which information proves $\triangle ABC \cong \triangle DEF$ by SAS?`, [r`$AB = DE$, $BC = EF$, $\angle A \cong \angle D$`, r`$AB = DE$, $BC = EF$, $\angle B \cong \angle E$`, r`$\angle A \cong \angle D$, $\angle B \cong \angle E$, $AB = DE$`, r`$AB = DE$, $AC = DF$, $\angle B \cong \angle E$`], 1, ["The angle must be between the two sides."], r`$\angle B$ is included between $\overline{AB}$ and $\overline{BC}$.`),
    mc(2, r`Two triangles share a side, and their other two pairs of sides are congruent. Which criterion applies?`, ["SAS", "SSS", "ASA", "None"], 1, [], r`The shared side is congruent to itself (reflexive), giving three pairs of congruent sides: SSS.`),
    mc(2, r`Which is not a valid congruence criterion?`, ["SSS", "SAS", "SSA", "ASA"], 2, [], r`SSA can produce two different triangles.`),
    mc(3, r`In the bisecting-segments example, which pair of parts is congruent as a result of the proof but was not used in it?`, [r`$\overline{AB} \cong \overline{ED}$`, r`$\overline{AC} \cong \overline{EC}$`, r`$\angle ACB \cong \angle ECD$`, r`$\overline{BC} \cong \overline{DC}$`], 0, ["Corresponding parts of congruent triangles are congruent."], r`Once the triangles are congruent, $\overline{AB} \cong \overline{ED}$ follows; it was not used to prove it.`, "review"),
  ],
});
