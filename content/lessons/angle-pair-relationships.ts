import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "angle-pair-relationships",
  title: "Angle pair relationships",
  summary: "Identify adjacent, vertical, complementary and supplementary angles and linear pairs, and use their relationships to find unknown angles.",
  minutes: 25,
  objectives: [
    "Identify adjacent angles, linear pairs and vertical angles in a figure.",
    "Use complementary and supplementary relationships to write and solve equations.",
    "Explain why vertical angles are congruent.",
  ],
  concepts: [
    { slug: "angle-pairs", name: "Angle pairs", description: "Adjacent, vertical, complementary, supplementary angles and linear pairs.", subject: "subj_math" },
  ],
  blocks: [
    def("Complementary and supplementary", r`Two angles are complementary if their measures sum to $90^\circ$ and supplementary if they sum to $180^\circ$. They don't have to be next to each other.`),
    def("Adjacent angles and linear pairs", r`Adjacent angles share a vertex and a side but no interior points. A linear pair is two adjacent angles whose outer sides are opposite rays; they are supplementary.`),
    def("Vertical angles", r`The two nonadjacent angles formed when two lines intersect. Vertical angles are congruent.`),
    text(r`Why are vertical angles congruent? When two lines cross, label the angles 1, 2, 3, 4 around the point, with 1 and 3 vertical. Angles 1 and 2 form a linear pair, and so do 2 and 3. So $m\angle 1 + m\angle 2 = 180^\circ = m\angle 2 + m\angle 3$. Subtracting $m\angle 2$ gives $m\angle 1 = m\angle 3$.`),
    example(r`Two lines intersect. One angle measures $(3x + 10)^\circ$ and its vertical angle measures $(5x - 30)^\circ$. Find all four angles.`, [
      [r`3x + 10 = 5x - 30 \Rightarrow x = 20`, "Vertical angles are congruent."],
      [r`3(20) + 10 = 70^\circ`, ""],
      [r`70^\circ, 110^\circ, 70^\circ, 110^\circ`, "Each neighbor forms a linear pair: 180 − 70 = 110."],
    ]),
    example(r`An angle is $12^\circ$ more than twice its complement. Find it.`, [
      [r`x + (2x + 12) = 90`, "Let x be the complement."],
      [r`3x = 78 \Rightarrow x = 26`, ""],
      [r`2(26) + 12 = 64^\circ`, r`Check: $64 + 26 = 90$. ✓`],
    ]),
    callout("warning", "Don't assume from a picture", r`Diagrams aren't always drawn to scale. Only use relationships that are marked or follow from given facts, not ones that "look" right.`),
    callout("application", "Where this shows up", r`Scissors and crossing roads form vertical angles; a ramp meeting flat ground forms a linear pair. Carpenters cut complementary angles to make picture-frame corners fit at $90^\circ$.`),
  ],
  questions: [
    num(1, r`Find the complement of a $37^\circ$ angle.`, 53, { unit: "°" }, [], r`$90 - 37 = 53^\circ$.`),
    num(1, r`Find the supplement of a $112^\circ$ angle.`, 68, { unit: "°" }, [], r`$180 - 112 = 68^\circ$.`),
    num(2, r`Two angles form a linear pair. One is $(4x + 8)^\circ$ and the other is $(2x + 22)^\circ$. Find $x$.`, 25, {}, ["They sum to 180."], r`$6x + 30 = 180$, $x = 25$ (angles 108° and 72°).`),
    num(2, r`Vertical angles measure $(7x - 12)^\circ$ and $(4x + 27)^\circ$. Find the angle measure.`, 79, { unit: "°" }, ["Set them equal: x = 13."], r`$7(13) - 12 = 79^\circ$.`),
    mc(2, r`Can two acute angles be supplementary?`, ["Yes, always", "No; their sum is less than 180°", "Only if both are 90°", "Only if they are vertical"], 1, ["Each acute angle is less than 90°."], r`Two angles each less than $90^\circ$ sum to less than $180^\circ$.`),
    num(3, r`The supplement of an angle is 4 times its complement. Find the angle.`, 60, { unit: "°" }, [r`$180 - x = 4(90 - x)$.`], r`$180 - x = 360 - 4x$, so $3x = 180$ and $x = 60^\circ$.`, "review"),
  ],
});
