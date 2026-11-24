import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "arcs-central-angles",
  title: "Arcs and central angles",
  summary: "Name and measure minor arcs, major arcs and semicircles, use the Arc Addition Postulate, and relate congruent chords to congruent arcs.",
  minutes: 25,
  objectives: [
    "Identify central angles, minor arcs, major arcs and semicircles.",
    "Find arc measures with central angles and the Arc Addition Postulate.",
    "Use the relationships between congruent chords, arcs and central angles.",
  ],
  concepts: [
    { slug: "circles", name: "Circles", description: "Sets of points at a fixed distance from a center; arcs, chords and angles.", subject: "subj_math" },
  ],
  blocks: [
    def("Circle vocabulary", r`A circle is all points in a plane at distance $r$ (the radius) from a center. A chord joins two points on the circle; a diameter is a chord through the center. A central angle has its vertex at the center.`),
    def("Arcs", r`A minor arc is less than $180^\circ$ and is named by two endpoints, $\overset{\frown}{AB}$. A major arc is more than $180^\circ$ and is named with three letters, $\overset{\frown}{ACB}$. A semicircle is $180^\circ$. A minor arc's measure equals its central angle; a major arc measures $360^\circ$ minus the minor arc.`),
    def("Arc Addition Postulate", r`The measure of an arc formed by two adjacent arcs is the sum of their measures: $m\overset{\frown}{ABC} = m\overset{\frown}{AB} + m\overset{\frown}{BC}$.`),
    activity("circle-angles", { title: "Central angle and arc", params: { arc: 100, p: 230, r: 5 } }),
    callout("tip", "Try this", r`The central angle readout always matches the arc. Push the arc past $180^\circ$: now the shaded region is a major arc. What is the measure of the other arc?`, "experiment"),
    example(r`$\overline{AC}$ is a diameter of circle $O$, and $m\angle AOB = 64^\circ$. Find $m\overset{\frown}{BC}$ and the major arc $m\overset{\frown}{BAC}$.`, [
      [r`m\overset{\frown}{BC} = 180^\circ - 64^\circ = 116^\circ`, "AB and BC together make a semicircle."],
      [r`m\overset{\frown}{BAC} = 360^\circ - 116^\circ = 244^\circ`, "The major arc from B to C through A."],
    ]),
    def("Chords and arcs", r`In the same circle (or congruent circles), two chords are congruent if and only if their arcs are congruent, if and only if their central angles are congruent. A diameter perpendicular to a chord bisects the chord and its arc.`),
    callout("application", "Where this shows up", r`Pie charts turn percentages into central angles (25% → $90^\circ$), clocks move $30^\circ$ per hour, and gears and wheels are designed with arc measures.`),
  ],
  questions: [
    num(1, r`A central angle measures $72^\circ$. What is the measure of its minor arc?`, 72, { unit: "°" }, [], r`$72^\circ$.`),
    num(1, r`A minor arc measures $130^\circ$. Find the measure of the corresponding major arc.`, 230, { unit: "°" }, [], r`$360 - 130 = 230^\circ$.`),
    num(2, r`In a pie chart, a category is 15% of the total. What central angle does it get?`, 54, { unit: "°" }, [], r`$0.15 \cdot 360 = 54^\circ$.`),
    num(2, r`Adjacent arcs $\overset{\frown}{AB}$ and $\overset{\frown}{BC}$ measure $(3x + 10)^\circ$ and $(2x)^\circ$, and $m\overset{\frown}{ABC} = 110^\circ$. Find $m\overset{\frown}{AB}$.`, 70, { unit: "°" }, [], r`$5x + 10 = 110$, $x = 20$, so $70^\circ$.`),
    mc(3, r`A diameter is perpendicular to a chord of length 16. What does the diameter do to the chord?`, ["Nothing", "Bisects it into two segments of 8", "Makes it a diameter", "Doubles it"], 1, [], r`A diameter perpendicular to a chord bisects it, giving two segments of 8.`, "review"),
  ],
});
