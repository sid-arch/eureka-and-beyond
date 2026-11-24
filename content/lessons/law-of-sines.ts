import { callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "law-of-sines",
  title: "The Law of Sines",
  summary: "Derive the Law of Sines, use it to solve oblique triangles given AAS, ASA or SSA, analyze the ambiguous case, and find area with ½ab sin C.",
  minutes: 35,
  objectives: [
    "Derive the Law of Sines from altitudes and the area formula ½ab sin C.",
    "Solve triangles given two angles and a side.",
    "Analyze the ambiguous SSA case: zero, one or two triangles.",
  ],
  concepts: [
    { slug: "law-of-sines", name: "Law of Sines", description: "In any triangle, a/sin A = b/sin B = c/sin C.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Right-triangle trig doesn't apply directly to oblique (non-right) triangles. But drop an altitude $h$ from $C$ to side $c$: in the two right triangles formed, $h = b\sin A$ and $h = a\sin B$. Setting these equal gives $\frac{a}{\sin A} = \frac{b}{\sin B}$, and the same argument from another vertex brings in $c$.`),
    formula(r`\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}`, "Law of Sines", "Side a is opposite angle A, and so on."),
    def("Area of a triangle", r`$\text{Area} = \frac{1}{2}ab\sin C$: two sides and the included angle. It comes from area $= \frac{1}{2}(\text{base})(\text{height})$ with height $b\sin C$.`),
    example(r`Solve $\triangle ABC$ with $A = 40^\circ$, $B = 75^\circ$, $a = 12$`, [
      [r`C = 180^\circ - 40^\circ - 75^\circ = 65^\circ`, ""],
      [r`b = \frac{12\sin 75^\circ}{\sin 40^\circ} \approx \frac{12(0.9659)}{0.6428} \approx 18.03`, ""],
      [r`c = \frac{12\sin 65^\circ}{\sin 40^\circ} \approx 16.92`, ""],
    ]),
    def("The ambiguous case (SSA)", r`Given $a$, $b$ and acute $A$ (with $a$ opposite $A$): let $h = b\sin A$. If $a < h$: no triangle. If $a = h$: one right triangle. If $h < a < b$: two triangles. If $a \ge b$: one triangle.`),
    example(r`$A = 30^\circ$, $a = 7$, $b = 10$. How many triangles?`, [
      [r`h = 10\sin 30^\circ = 5`, ""],
      [r`5 < 7 < 10`, "Two triangles."],
      [r`\sin B = \frac{10\sin 30^\circ}{7} \approx 0.7143 \Rightarrow B \approx 45.6^\circ \text{ or } 134.4^\circ`, "Both work because 30° + 134.4° < 180°."],
    ]),
    callout("warning", "Check the supplement", r`$\sin^{-1}$ only returns angles up to $90^\circ$, but $\sin B = \sin(180^\circ - B)$. In SSA problems always test whether $180^\circ - B$ also fits in the triangle.`),
    callout("application", "Where this shows up", r`Surveyors and navigators find distances to points they can't reach by measuring two angles and one baseline (triangulation). GPS and astronomy use the same idea on a larger scale.`),
  ],
  questions: [
    num(2, r`In $\triangle ABC$, $A = 50^\circ$, $B = 60^\circ$, $a = 10$. Find $b$ to the nearest hundredth.`, 11.31, { tolerance: 0.006 }, [r`$b = \frac{10\sin 60^\circ}{\sin 50^\circ}$.`], r`$\frac{8.660}{0.7660} \approx 11.31$.`),
    num(2, r`Find the area of a triangle with sides 8 and 11 and included angle $35^\circ$, to the nearest tenth.`, 25.2, { tolerance: 0.06 }, [r`$\frac{1}{2}(8)(11)\sin 35^\circ$.`], r`$44(0.5736) \approx 25.2$.`),
    mc(2, r`$A = 40^\circ$, $a = 5$, $b = 10$. How many triangles are possible?`, ["0", "1", "2", "Infinitely many"], 0, [r`$h = 10\sin 40^\circ \approx 6.43$.`], r`$a = 5 < h \approx 6.43$, so the side is too short: no triangle.`),
    mc(3, r`$A = 35^\circ$, $a = 8$, $b = 12$. How many triangles?`, ["0", "1", "2", "3"], 2, [r`$h = 12\sin 35^\circ \approx 6.88$.`], r`$6.88 < 8 < 12$: two triangles.`, "review"),
    num(3, r`Two observers 500 m apart see a balloon at angles of $62^\circ$ and $71^\circ$ (measured inside the triangle from the baseline). How far is the balloon from the first observer (whose angle is 62°)? Round to the nearest meter.`, 646, { unit: "m", tolerance: 1 }, ["The angle at the balloon is 47°.", "The side from observer 1 is opposite the 71° angle."], r`$\frac{500\sin 71^\circ}{\sin 47^\circ} \approx \frac{472.8}{0.7314} \approx 646$ m.`, "review"),
  ],
});
