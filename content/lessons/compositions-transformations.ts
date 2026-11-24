import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "compositions-transformations",
  title: "Compositions of transformations",
  summary: "Perform a sequence of transformations, see that order can matter, and use compositions of reflections to produce translations and rotations and to define congruence.",
  minutes: 25,
  objectives: [
    "Perform compositions of transformations and find the final image.",
    "Decide whether the order of two transformations matters.",
    "Explain that two reflections make a translation or a rotation, and define congruence with rigid motions.",
  ],
  concepts: [
    { slug: "rigid-motions", name: "Rigid motions", description: "Transformations that preserve distance and angle measure: translations, reflections and rotations.", subject: "subj_math" },
    { slug: "congruence", name: "Congruence", description: "Figures are congruent if a sequence of rigid motions maps one onto the other.", subject: "subj_math" },
  ],
  blocks: [
    def("Composition", r`Applying one transformation and then another to the result. A glide reflection is a translation followed by a reflection across a line parallel to the translation.`),
    example(r`Reflect $P(2, 3)$ across the $y$-axis, then translate by $\langle 0, -5 \rangle$`, [
      [r`(2, 3) \to (-2, 3)`, "Reflection first."],
      [r`(-2, 3) \to (-2, -2)`, "Then the translation."],
    ]),
    example(r`Does order matter? Reflect $(2, 3)$ across the $x$-axis and rotate $90^\circ$ about the origin, in both orders.`, [
      [r`\text{reflect then rotate: } (2, -3) \to (3, 2)`, ""],
      [r`\text{rotate then reflect: } (-3, 2) \to (-3, -2)`, ""],
      [r`(3, 2) \ne (-3, -2)`, "Order matters here."],
    ], "Two translations, or two rotations about the same center, can be done in either order. In general you can't assume that."),
    def("Two reflections", r`Reflecting across two parallel lines is a translation by twice the distance between the lines, perpendicular to them. Reflecting across two lines that meet at angle $\theta$ is a rotation about the intersection point by $2\theta$.`),
    def("Congruence by rigid motions", r`Two figures are congruent if and only if a sequence of rigid motions maps one onto the other. This definition works for any shape, not just polygons.`),
    callout("tip", "Check by tracking one point", r`To test a claimed composition, follow a single point (and maybe a second to check orientation) through every step.`),
    callout("application", "Where this shows up", r`Footprints form a glide-reflection pattern. Robot arms and animation rigs chain rotations and translations; programmers multiply transformation matrices to compose them, and the order of multiplication matters for exactly the reason shown here.`),
  ],
  questions: [
    short(2, r`Translate $(1, -4)$ by $\langle 3, 2 \rangle$, then reflect across the $x$-axis. Enter as (x,y).`, ["(4,2)"], ["Translate: (4, −2)."], r`$(4, -2) \to (4, 2)$.`),
    short(2, r`Rotate $(5, 0)$ by $90^\circ$ about the origin, then reflect across $y = x$. Enter as (x,y).`, ["(5,0)"], ["Rotate: (0, 5).", "Swap coordinates."], r`$(0, 5) \to (5, 0)$. This composition happens to fix this point.`),
    mc(2, r`Reflecting across $x = 1$ and then across $x = 4$ is the same as…`, ["a translation 3 units right", "a translation 6 units right", "a rotation of 180°", "a reflection across x = 5"], 1, ["Twice the distance between the lines."], r`The lines are 3 apart, so the result is a translation of 6 units, in the direction from the first line to the second (right).`),
    mc(2, r`Two lines meet at a $40^\circ$ angle. Reflecting across one then the other is…`, ["a rotation of 40°", "a rotation of 80°", "a translation", "a reflection"], 1, [], r`A rotation of $2 \cdot 40^\circ = 80^\circ$ about the intersection point.`),
    mc(3, r`Which sequence maps $\triangle ABC$ with $A(1, 1)$, $B(3, 1)$, $C(1, 2)$ onto $A'(-1, -1)$, $B'(-3, -1)$, $C'(-1, -2)$?`, ["Translate ⟨−2, −2⟩", "Rotate 180° about the origin", "Reflect across the y-axis", "Reflect across y = x"], 1, ["Every coordinate changed sign."], r`$(x, y) \to (-x, -y)$ is a $180^\circ$ rotation (also a reflection across the y-axis followed by one across the x-axis).`, "review"),
  ],
});
