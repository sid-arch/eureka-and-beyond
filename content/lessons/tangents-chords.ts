import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "tangents-chords",
  title: "Tangents and chords",
  summary: "Use the tangent-radius theorem, equal tangent segments from an external point, intersecting chords, and secant and tangent segment products.",
  minutes: 30,
  objectives: [
    "Use the fact that a tangent is perpendicular to the radius at the point of tangency.",
    "Use the fact that tangent segments from an external point are congruent.",
    "Apply the segment-product theorems for intersecting chords, secants and tangents.",
  ],
  concepts: [
    { slug: "circles", name: "Circles", description: "Sets of points at a fixed distance from a center; arcs, chords and angles.", subject: "subj_math" },
  ],
  formulas: ["pythagorean-theorem"],
  blocks: [
    def("Tangent", r`A line in the plane of a circle that touches it at exactly one point, the point of tangency. A tangent is perpendicular to the radius drawn to the point of tangency, and a line perpendicular to a radius at its endpoint on the circle is a tangent.`),
    example(r`From external point $P$, a tangent touches circle $O$ (radius 5) at $T$, and $PO = 13$. Find $PT$.`, [
      [r`\overline{OT} \perp \overline{PT}`, "Tangent ⟂ radius."],
      [r`PT = \sqrt{13^2 - 5^2} = 12`, ""],
    ]),
    def("Two tangents from a point", r`If two segments from the same external point are tangent to a circle, they are congruent.`),
    def("Segment products", r`Intersecting chords: if chords $\overline{AB}$ and $\overline{CD}$ meet at $E$, then $AE \cdot EB = CE \cdot ED$. Secants from an external point: (outside part)(whole) is the same for both. Tangent and secant: $(\text{tangent})^2 = (\text{outside part})(\text{whole secant})$.`),
    example(r`Chords meet at $E$ with $AE = 4$, $EB = 9$ and $CE = 6$. Find $ED$.`, [
      [r`4 \cdot 9 = 6 \cdot ED`, ""],
      [r`ED = 6`, ""],
    ]),
    example(r`From point $P$, a tangent of length $x$ and a secant with outside part 4 and whole length 16 are drawn. Find $x$.`, [
      [r`x^2 = 4 \cdot 16 = 64`, ""],
      [r`x = 8`, ""],
    ]),
    callout("warning", "Use the whole secant", r`In the secant formulas, multiply the outside part by the entire secant (outside part plus the chord inside), not by the inside part alone.`),
    callout("application", "Where this shows up", r`A belt around two pulleys runs along tangent lines. The distance to the horizon from height $h$ above Earth (radius $R$) comes from the tangent-radius right triangle: $d = \sqrt{(R + h)^2 - R^2}$.`),
  ],
  questions: [
    num(1, r`A tangent from $P$ touches circle $O$ at $T$. $OT = 8$ and $PT = 15$. Find $PO$.`, 17, {}, ["Right angle at T."], r`$\sqrt{64 + 225} = 17$.`),
    num(2, r`Two tangent segments from the same point have lengths $3x + 1$ and $5x - 7$. Find the length.`, 13, {}, [], r`$x = 4$, length 13.`),
    num(2, r`Chords meet inside a circle. One is split into 5 and 8; the other into 4 and $x$. Find $x$.`, 10, {}, [], r`$40 = 4x$, $x = 10$.`),
    num(2, r`Two secants from point $P$: the first has outside part 3 and total length 12; the second has outside part 4. Find the second's total length.`, 9, {}, [r`$3 \cdot 12 = 4 \cdot w$.`], r`$w = 9$.`),
    mc(3, r`A line is perpendicular to a radius at a point inside the circle (not on it). Is it a tangent?`, ["Yes", "No, it crosses the circle at two points", "Only if it's a diameter", "Only for small circles"], 1, [], r`The perpendicular must be at the radius's endpoint on the circle. At an interior point, the line is a chord's line and meets the circle twice.`, "review"),
  ],
});
