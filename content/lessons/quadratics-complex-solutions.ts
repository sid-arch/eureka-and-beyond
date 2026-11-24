import { activity, callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "quadratics-complex-solutions",
  title: "Solving quadratics with complex solutions",
  summary: "Solve quadratics whose discriminant is negative, write complex solutions in a + bi form, and connect them to parabolas that miss the x-axis.",
  minutes: 25,
  objectives: [
    "Use the discriminant to predict real or complex solutions.",
    "Solve quadratics with complex solutions by square roots, completing the square or the quadratic formula.",
    "Explain why complex solutions of real quadratics come in conjugate pairs.",
  ],
  concepts: [
    { slug: "complex-numbers", name: "Complex numbers", description: "Numbers a + bi with real a and b, where i² = −1.", subject: "subj_math" },
    { slug: "discriminant", name: "Discriminant", description: "b² − 4ac, which tells how many real solutions a quadratic equation has.", subject: "subj_math" },
  ],
  formulas: ["quadratic-formula", "discriminant", "complex-numbers"],
  blocks: [
    text(r`When $b^2 - 4ac < 0$, the quadratic formula asks for the square root of a negative number. With $i$, that's no longer a dead end: the equation has two complex solutions, and the parabola $y = ax^2 + bx + c$ simply doesn't cross the x-axis.`),
    example(r`Solve $x^2 + 2x + 5 = 0$`, [
      [r`x = \frac{-2 \pm \sqrt{4 - 20}}{2} = \frac{-2 \pm \sqrt{-16}}{2}`, ""],
      [r`= \frac{-2 \pm 4i}{2} = -1 \pm 2i`, ""],
    ], r`Check $-1 + 2i$: $(-1 + 2i)^2 = 1 - 4i - 4 = -3 - 4i$; then $-3 - 4i + 2(-1 + 2i) + 5 = 0$. ✓`),
    example(r`Solve $3(x - 4)^2 + 27 = 0$`, [
      [r`(x - 4)^2 = -9`, ""],
      [r`x - 4 = \pm 3i \Rightarrow x = 4 \pm 3i`, ""],
    ]),
    activity("vertex-explorer", { title: "No x-intercepts means complex zeros", params: { a: 1, h: -1, k: 4 } }),
    callout("tip", "Try this", r`This parabola, $y = (x + 1)^2 + 4 = x^2 + 2x + 5$, has no real zeros. Its vertex is $(-1, 4)$ and its complex zeros are $-1 \pm 2i$: the real part matches the axis of symmetry.`, "experiment"),
    callout("note", "Conjugate pairs", r`If a quadratic has real coefficients, its complex solutions are conjugates $a \pm bi$, because the $\pm$ in the formula produces both.`),
    callout("application", "Where this shows up", r`In physics, complex solutions of a quadratic describe oscillation: a damped spring with a negative discriminant bounces back and forth instead of settling smoothly.`),
  ],
  questions: [
    mc(1, r`What does a negative discriminant tell you?`, ["Two real solutions", "One real solution", "Two complex (non-real) solutions", "No solutions at all"], 2, [], r`Two complex conjugate solutions.`),
    short(2, r`Solve $x^2 + 25 = 0$. Enter like ±5i.`, ["±5i", "+-5i", "5i,-5i", "-5i,5i"], [], r`$x = \pm 5i$.`),
    short(2, r`Solve $x^2 - 4x + 13 = 0$. Enter like 2±3i.`, ["2±3i", "2+-3i"], [r`$\frac{4 \pm \sqrt{16 - 52}}{2}$.`], r`$\frac{4 \pm 6i}{2} = 2 \pm 3i$.`),
    short(3, r`Solve $(x + 2)^2 = -12$. Enter like -2±2sqrt(3)i.`, ["-2±2sqrt(3)i", "-2±2i√3", "-2±2√3i", "-2±2isqrt(3)"], [r`$\sqrt{-12} = 2i\sqrt{3}$.`], r`$x = -2 \pm 2i\sqrt{3}$.`, "review"),
  ],
});
