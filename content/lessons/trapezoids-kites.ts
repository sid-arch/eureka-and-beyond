import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "trapezoids-kites",
  title: "Trapezoids and kites",
  summary: "Use properties of isosceles trapezoids, the Trapezoid Midsegment Theorem and the properties of kites to find unknown lengths and angles.",
  minutes: 25,
  objectives: [
    "Identify bases, legs and base angles of a trapezoid and properties of isosceles trapezoids.",
    "Apply the Trapezoid Midsegment Theorem.",
    "Use the perpendicular diagonals and congruent opposite angles of a kite.",
  ],
  concepts: [
    { slug: "trapezoids-kites", name: "Trapezoids and kites", description: "Quadrilaterals with exactly one pair of parallel sides, and those with two pairs of consecutive congruent sides.", subject: "subj_math" },
  ],
  blocks: [
    def("Trapezoid", r`A quadrilateral with exactly one pair of parallel sides, called the bases. The other two sides are the legs. An isosceles trapezoid has congruent legs.`),
    def("Isosceles trapezoid properties", r`Each pair of base angles is congruent, and the diagonals are congruent. Angles on the same leg are supplementary (they're same-side interior angles between the parallel bases), as in every trapezoid.`),
    def("Trapezoid Midsegment Theorem", r`The segment joining the midpoints of the legs is parallel to the bases and its length is the average of the bases: $\text{midsegment} = \frac{b_1 + b_2}{2}$.`),
    example(r`A trapezoid has bases 14 and 22. Find the midsegment. If the midsegment of another trapezoid is 17 and one base is 12, find the other.`, [
      [r`\tfrac{14 + 22}{2} = 18`, ""],
      [r`\tfrac{12 + b}{2} = 17 \Rightarrow b = 22`, ""],
    ]),
    example(r`In isosceles trapezoid $ABCD$ with bases $\overline{AD}$ and $\overline{BC}$, $m\angle A = 64^\circ$. Find the other angles.`, [
      [r`m\angle D = 64^\circ`, "Base angles of an isosceles trapezoid."],
      [r`m\angle B = m\angle C = 116^\circ`, "Supplementary to 64° along each leg."],
    ]),
    def("Kite", r`A quadrilateral with two pairs of consecutive congruent sides, and no pair of opposite sides congruent. Its diagonals are perpendicular, and exactly one pair of opposite angles (the ones between the non-congruent sides) is congruent.`),
    example(r`A kite has diagonals that meet at $E$. One diagonal is split into $EA = EC = 6$; the other has $EB = 8$ and $ED = 4.5$. Find the side lengths.`, [
      [r`AB = \sqrt{6^2 + 8^2} = 10`, "The diagonals are perpendicular."],
      [r`AD = \sqrt{6^2 + 4.5^2} = 7.5`, "So the kite's sides are 10, 10, 7.5, 7.5."],
    ]),
    callout("application", "Where this shows up", r`Bridge supports, handbag shapes and the sides of a lampshade viewed head-on are trapezoids; the midsegment rule finds the width of a shelf placed halfway up a tapered bookcase. Kites (the toy) have perpendicular spars because of the kite's diagonal property.`),
  ],
  questions: [
    num(1, r`A trapezoid has bases 9 and 15. Find the length of its midsegment.`, 12, {}, [], r`$(9 + 15) / 2 = 12$.`),
    num(2, r`The midsegment of a trapezoid is 20 and one base is 26. Find the other base.`, 14, {}, [], r`$2 \cdot 20 - 26 = 14$.`),
    num(2, r`In an isosceles trapezoid, one base angle measures $72^\circ$. Find the measure of each of the obtuse angles.`, 108, { unit: "°" }, [], r`$180 - 72 = 108^\circ$.`),
    num(2, r`In kite $WXYZ$, $\angle X$ and $\angle Z$ are the congruent opposite angles, $m\angle W = 70^\circ$ and $m\angle Y = 110^\circ$. Find $m\angle X$.`, 90, { unit: "°" }, ["The four angles sum to 360°."], r`$(360 - 70 - 110) \div 2 = 90^\circ$.`),
    mc(3, r`Which statement is true for every kite?`, ["Diagonals bisect each other", "Diagonals are perpendicular", "Diagonals are congruent", "Opposite sides are parallel"], 1, [], r`A kite's diagonals are perpendicular; only one of them bisects the other.`, "review"),
  ],
});
