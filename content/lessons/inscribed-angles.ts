import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inscribed-angles",
  title: "Inscribed angles",
  summary: "Use the Inscribed Angle Theorem and its corollaries: angles on the same arc are congruent, an angle in a semicircle is right, and opposite angles of a cyclic quadrilateral are supplementary.",
  minutes: 25,
  objectives: [
    "State and use the Inscribed Angle Theorem.",
    "Apply its corollaries about angles intercepting the same arc and angles in a semicircle.",
    "Use the fact that opposite angles of an inscribed quadrilateral are supplementary.",
  ],
  concepts: [
    { slug: "circles", name: "Circles", description: "Sets of points at a fixed distance from a center; arcs, chords and angles.", subject: "subj_math" },
  ],
  blocks: [
    def("Inscribed angle", r`An angle whose vertex is on the circle and whose sides are chords. The arc inside the angle is its intercepted arc.`),
    def("Inscribed Angle Theorem", r`An inscribed angle measures half of its intercepted arc: $m\angle APB = \frac{1}{2} m\overset{\frown}{AB}$.`),
    activity("circle-angles", { title: "Move the vertex around the circle", params: { arc: 120, p: 250, r: 5 } }),
    callout("tip", "Try this", r`Slide P anywhere on the major arc: the inscribed angle stays exactly half the central angle. Now set the arc to $180^\circ$. What is every inscribed angle?`, "experiment"),
    def("Corollaries", r`Inscribed angles that intercept the same arc are congruent. An angle inscribed in a semicircle is a right angle. If a quadrilateral is inscribed in a circle, its opposite angles are supplementary.`),
    example(r`An inscribed angle intercepts an arc of $96^\circ$. Find the angle. Then find the arc intercepted by a $35^\circ$ inscribed angle.`, [
      [r`\tfrac{1}{2} \cdot 96^\circ = 48^\circ`, ""],
      [r`2 \cdot 35^\circ = 70^\circ`, ""],
    ]),
    example(r`Quadrilateral $ABCD$ is inscribed in a circle, $m\angle A = (2x + 10)^\circ$ and $m\angle C = (3x)^\circ$. Find $m\angle A$.`, [
      [r`2x + 10 + 3x = 180`, "Opposite angles are supplementary."],
      [r`x = 34 \Rightarrow m\angle A = 78^\circ`, ""],
    ]),
    callout("application", "Where this shows up", r`A photographer standing anywhere on a circular arc through two points sees them at the same angle, which is why theater seating and camera placement use circles. Carpenters find a circle's center by inscribing a right angle (the semicircle corollary).`),
  ],
  questions: [
    num(1, r`An inscribed angle intercepts a $140^\circ$ arc. Find the angle.`, 70, { unit: "°" }, [], r`$70^\circ$.`),
    num(1, r`An inscribed angle measures $28^\circ$. Find its intercepted arc.`, 56, { unit: "°" }, [], r`$56^\circ$.`),
    num(2, r`$\triangle ABC$ is inscribed in a circle with $\overline{AB}$ a diameter and $m\angle A = 33^\circ$. Find $m\angle B$.`, 57, { unit: "°" }, ["Angle C is inscribed in a semicircle."], r`$\angle C = 90^\circ$, so $m\angle B = 90 - 33 = 57^\circ$.`),
    num(2, r`A quadrilateral inscribed in a circle has $m\angle B = 104^\circ$. Find $m\angle D$.`, 76, { unit: "°" }, [], r`$180 - 104 = 76^\circ$.`),
    mc(3, r`Two inscribed angles intercept the same arc. One is $(5x - 4)^\circ$ and the other is $(3x + 16)^\circ$. What is each angle?`, ["10°", "46°", "92°", "36°"], 1, ["They are congruent."], r`$x = 10$, so each is $46^\circ$.`, "review"),
  ],
});
