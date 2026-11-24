import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "cpctc",
  title: "Using congruent triangles (CPCTC)",
  summary: "Prove that segments or angles are congruent by first proving triangles congruent, including proofs with overlapping triangles and two-step proofs.",
  minutes: 30,
  objectives: [
    "Use CPCTC to conclude that corresponding parts are congruent after proving triangles congruent.",
    "Separate overlapping triangles to identify shared parts.",
    "Write proofs that use congruent triangles to establish parallel lines, midpoints or bisectors.",
  ],
  concepts: [
    { slug: "triangle-congruence", name: "Triangle congruence", description: "Criteria (SSS, SAS, ASA, AAS, HL) that guarantee two triangles are congruent.", subject: "subj_math" },
  ],
  blocks: [
    def("CPCTC", r`Corresponding Parts of Congruent Triangles are Congruent. Once you've proved two triangles congruent, every pair of corresponding sides and angles is congruent. It's the main reason to prove triangles congruent.`),
    text(r`The strategy for proving two segments or angles congruent: find two triangles that contain them as corresponding parts, prove those triangles congruent with SSS, SAS, ASA, AAS or HL, then finish with CPCTC.`),
    example(r`Given $\overline{AB} \parallel \overline{DC}$ and $\overline{AB} \cong \overline{DC}$ in quadrilateral $ABCD$ with diagonal $\overline{AC}$. Prove $\overline{AD} \cong \overline{CB}$.`, [
      [r`1.\ \overline{AB} \cong \overline{DC}`, "Given."],
      [r`2.\ \angle BAC \cong \angle DCA`, "Alternate interior angles (AB ∥ DC, transversal AC)."],
      [r`3.\ \overline{AC} \cong \overline{CA}`, "Reflexive property."],
      [r`4.\ \triangle BAC \cong \triangle DCA`, "SAS."],
      [r`5.\ \overline{CB} \cong \overline{AD}`, "CPCTC."],
    ], "This proves a useful fact: if one pair of opposite sides of a quadrilateral is both parallel and congruent, the other pair is congruent too."),
    example(r`Overlapping triangles: $\overline{AD} \cong \overline{BC}$ and $\overline{AC} \cong \overline{BD}$, with $A, B$ on the bottom and $C, D$ above. Prove $\angle C \cong \angle D$.`, [
      [r`\triangle ABC \text{ and } \triangle BAD \text{ share } \overline{AB}`, "Redraw the two triangles separately."],
      [r`\overline{BC} \cong \overline{AD},\ \overline{AC} \cong \overline{BD},\ \overline{AB} \cong \overline{BA}`, "Given, given, reflexive."],
      [r`\triangle ABC \cong \triangle BAD \Rightarrow \angle C \cong \angle D`, "SSS, then CPCTC."],
    ]),
    callout("warning", "Prove congruence first", r`You can't use CPCTC until the triangles are proved congruent. And the parts must correspond: check the order in your congruence statement.`),
    callout("application", "Where this shows up", r`Engineers confirm two braces are the same length by showing they belong to congruent triangles. The same reasoning proves most properties of parallelograms, kites and rhombuses in the next unit.`),
  ],
  questions: [
    mc(1, r`What does CPCTC let you conclude?`, ["That two triangles are congruent", "That corresponding parts of congruent triangles are congruent", "That angles sum to 180°", "That triangles are similar"], 1, [], r`It's used after congruence is established.`),
    mc(2, r`$\triangle JKL \cong \triangle MNP$. Which must be true by CPCTC?`, [r`$\overline{JL} \cong \overline{MP}$`, r`$\overline{JK} \cong \overline{NP}$`, r`$\angle K \cong \angle P$`, r`$\angle J \cong \angle N$`], 0, ["Match positions."], r`$J \to M$ and $L \to P$, so $\overline{JL} \cong \overline{MP}$.`),
    num(2, r`$\triangle ABC \cong \triangle DEF$, $AB = 2x + 1$ and $DE = 3x - 6$. Find $AB$.`, 15, {}, ["Corresponding sides are equal."], r`$x = 7$, so $AB = 15$.`),
    num(2, r`$\triangle PQR \cong \triangle STU$, $m\angle R = (5y - 8)^\circ$ and $m\angle U = (3y + 20)^\circ$. Find $m\angle R$.`, 62, { unit: "°" }, [], r`$y = 14$, so $m\angle R = 62^\circ$.`),
    mc(3, r`To prove that $M$ is the midpoint of $\overline{AB}$ using triangles, what must you show with CPCTC?`, [r`$\overline{AM} \cong \overline{MB}$`, r`$\angle A \cong \angle B$`, r`$\overline{AB} \perp$ some line`, "The triangles are right triangles"], 0, [], r`A midpoint splits the segment into congruent parts, so show $\overline{AM} \cong \overline{MB}$ as corresponding parts.`, "review"),
  ],
});
