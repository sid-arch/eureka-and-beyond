import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "proving-triangles-similar",
  title: "Proving triangles similar",
  summary: "Prove triangles similar with AA, SSS and SAS similarity, and use similar triangles for indirect measurement.",
  minutes: 30,
  objectives: [
    "State and apply the AA, SSS and SAS similarity criteria.",
    "Write similarity proofs, including overlapping triangles.",
    "Use similar triangles to measure heights and distances indirectly.",
  ],
  concepts: [
    { slug: "similarity", name: "Similarity", description: "Figures with the same shape: corresponding angles congruent and corresponding sides proportional.", subject: "subj_math" },
  ],
  blocks: [
    def("AA similarity", r`If two angles of one triangle are congruent to two angles of another, the triangles are similar. (The third angles match automatically.)`),
    def("SSS and SAS similarity", r`SSS~: all three pairs of corresponding sides are proportional. SAS~: two pairs of sides are proportional and the included angles are congruent.`),
    text(r`Why does AA work? Dilate the smaller triangle so the side between the two angles matches the larger triangle's corresponding side. Now the two triangles have two congruent angles and the included side congruent, so they're congruent by ASA. Undo the dilation: the originals were similar.`),
    example(r`$\overline{DE} \parallel \overline{BC}$ in $\triangle ABC$, with $D$ on $\overline{AB}$ and $E$ on $\overline{AC}$. Show $\triangle ADE \sim \triangle ABC$.`, [
      [r`\angle A \cong \angle A`, "Reflexive."],
      [r`\angle ADE \cong \angle ABC`, "Corresponding angles (DE ∥ BC)."],
      [r`\triangle ADE \sim \triangle ABC`, "AA."],
    ]),
    example(r`Are triangles with sides 6, 8, 10 and 9, 12, 15 similar?`, [
      [r`\tfrac{9}{6} = \tfrac{12}{8} = \tfrac{15}{10} = 1.5`, "Compare shortest to shortest, and so on."],
      [r`\text{similar by SSS}\sim`, ""],
    ]),
    example(r`A 1.8 m person casts a 2.4 m shadow while a tree casts a 16 m shadow. How tall is the tree?`, [
      [r`\tfrac{h}{16} = \tfrac{1.8}{2.4}`, "The sun's rays make equal angles: AA similar right triangles."],
      [r`h = 16 \cdot 0.75 = 12 \text{ m}`, ""],
    ]),
    callout("warning", "Order the sides", r`When testing SSS~, match smallest with smallest, middle with middle and largest with largest. Pairing them in another order can make similar triangles look non-similar.`),
    callout("application", "Where this shows up", r`Indirect measurement with shadows or mirrors goes back to Thales measuring the Great Pyramid. Cameras, pinhole projectors and the human eye form similar triangles between object and image.`),
  ],
  questions: [
    mc(1, r`Two triangles each have angles of $35^\circ$ and $80^\circ$. Are they similar?`, ["Yes, by AA", "No", "Only if a side matches", "Yes, by SSS"], 0, [], r`Two pairs of congruent angles: AA.`),
    mc(2, r`Which pair of triangles is similar? (Side lengths given.)`, ["4, 6, 8 and 6, 9, 12", "3, 4, 5 and 4, 5, 6", "5, 5, 8 and 10, 10, 12", "2, 3, 4 and 4, 6, 9"], 0, ["Check that all three ratios are equal."], r`$\frac{6}{4} = \frac{9}{6} = \frac{12}{8} = 1.5$.`),
    num(2, r`In $\triangle ABC$, $\overline{DE} \parallel \overline{BC}$ with $AD = 4$, $DB = 6$, $DE = 5$. Find $BC$.`, 12.5, {}, ["AB = 10.", r`$\frac{BC}{DE} = \frac{AB}{AD}$.`], r`$BC = 5 \cdot \frac{10}{4} = 12.5$.`),
    num(2, r`A 2 m pole casts a 3 m shadow when a building casts a 45 m shadow. How tall is the building?`, 30, { unit: "m" }, [], r`$45 \cdot \frac{2}{3} = 30$ m.`),
    mc(3, r`$\triangle PQR$ has $PQ = 8$, $PR = 12$, $\angle P = 50^\circ$. $\triangle XYZ$ has $XY = 10$, $XZ = 15$, $\angle X = 50^\circ$. Are they similar?`, ["Yes, SAS~", "Yes, SSS~", "No", "Yes, AA"], 0, [r`$\frac{10}{8} = \frac{15}{12}$?`], r`Both ratios are 1.25 and the included angles are equal: SAS~.`, "review"),
  ],
});
