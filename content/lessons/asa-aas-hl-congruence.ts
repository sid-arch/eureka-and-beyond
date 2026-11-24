import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "asa-aas-hl-congruence",
  title: "ASA, AAS and HL congruence",
  summary: "Prove triangles congruent with Angle-Side-Angle, Angle-Angle-Side and Hypotenuse-Leg, and choose the right criterion from the given information.",
  minutes: 30,
  objectives: [
    "State and apply the ASA and AAS criteria.",
    "State and apply the HL criterion for right triangles.",
    "Choose a valid criterion, or decide none applies, from given information.",
  ],
  concepts: [
    { slug: "triangle-congruence", name: "Triangle congruence", description: "Criteria (SSS, SAS, ASA, AAS, HL) that guarantee two triangles are congruent.", subject: "subj_math" },
  ],
  blocks: [
    def("ASA", r`If two angles and the included side of one triangle are congruent to those of another, the triangles are congruent.`),
    def("AAS", r`If two angles and a non-included side are congruent, the triangles are congruent. It follows from ASA: if two angles match, the third angles match too (angle sum $180^\circ$), so the side is now included between two known angles.`),
    def("HL (right triangles only)", r`If the hypotenuse and one leg of a right triangle are congruent to those of another right triangle, the triangles are congruent. This is the one case where side-side-angle works, because the angle is $90^\circ$ and the Pythagorean theorem fixes the third side.`),
    example(r`Given $\angle A \cong \angle D$, $\overline{AC} \cong \overline{DC}$, and $C$ is where $\overline{AE}$ and $\overline{BD}$ cross. Prove $\triangle ABC \cong \triangle DEC$.`, [
      [r`1.\ \angle A \cong \angle D`, "Given."],
      [r`2.\ \overline{AC} \cong \overline{DC}`, "Given."],
      [r`3.\ \angle ACB \cong \angle DCE`, "Vertical angles."],
      [r`4.\ \triangle ABC \cong \triangle DEC`, "ASA: side AC is between ∠A and ∠ACB."],
    ]),
    example(r`$\overline{PS} \perp \overline{QR}$ at $S$ and $\overline{PQ} \cong \overline{PR}$. Prove $\triangle PSQ \cong \triangle PSR$.`, [
      [r`\angle PSQ,\ \angle PSR \text{ are right angles}`, "Perpendicular lines form right angles."],
      [r`\overline{PQ} \cong \overline{PR}`, "Given: the hypotenuses."],
      [r`\overline{PS} \cong \overline{PS}`, "Reflexive: a shared leg."],
      [r`\triangle PSQ \cong \triangle PSR`, "HL."],
    ]),
    text(r`Summary of valid criteria: SSS, SAS, ASA, AAS, and HL for right triangles. Not valid: AAA (it proves similarity, not congruence) and SSA in general.`),
    callout("tip", "Mark the diagram first", r`Before choosing a criterion, mark every given congruence, plus shared sides (reflexive), vertical angles, and right angles from perpendicular lines. Then read the pattern of S's and A's around each triangle.`),
    callout("application", "Where this shows up", r`Surveyors use ASA to measure across rivers: measure a baseline and two angles on your side, build a congruent triangle on land, and measure its side instead.`),
  ],
  questions: [
    mc(1, r`Two angles and the side between them are congruent. Which criterion applies?`, ["SAS", "ASA", "AAS", "HL"], 1, [], r`Angle-included side-angle: ASA.`),
    mc(2, r`$\angle A \cong \angle D$, $\angle B \cong \angle E$ and $\overline{BC} \cong \overline{EF}$. Which criterion proves $\triangle ABC \cong \triangle DEF$?`, ["ASA", "AAS", "SAS", "Not enough information"], 1, ["Is BC between ∠A and ∠B?"], r`$\overline{BC}$ is not between $\angle A$ and $\angle B$, so it's AAS.`),
    mc(2, r`Two right triangles have congruent hypotenuses and one pair of congruent legs. Which criterion applies?`, ["SSS", "HL", "SAS", "ASA"], 1, [], r`HL.`),
    mc(2, r`All three pairs of angles of two triangles are congruent. Are the triangles congruent?`, ["Yes, by AAA", "Not necessarily; they are similar", "Yes, by ASA", "Only if they're right triangles"], 1, [], r`AAA only guarantees the same shape; the triangles could be different sizes.`),
    mc(3, r`Which extra fact would let you prove $\triangle ABC \cong \triangle DEF$ by ASA, given $\angle A \cong \angle D$ and $\angle C \cong \angle F$?`, [r`$\overline{AB} \cong \overline{DE}$`, r`$\overline{AC} \cong \overline{DF}$`, r`$\overline{BC} \cong \overline{EF}$`, r`$\angle B \cong \angle E$`], 1, ["ASA needs the side between the two angles."], r`$\overline{AC}$ lies between $\angle A$ and $\angle C$. (The other sides would give AAS.)`, "review"),
  ],
});
