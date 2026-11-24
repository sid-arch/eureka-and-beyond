import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "key-features-quadratics",
  title: "Key features: vertex, axis of symmetry and intercepts",
  summary: "Find the axis of symmetry, vertex, y-intercept and x-intercepts of y = ax² + bx + c, and use them to sketch the parabola and answer max/min questions.",
  minutes: 30,
  objectives: [
    "Find the axis of symmetry x = −b/(2a) and the vertex of a quadratic in standard form.",
    "Find the y-intercept and use symmetry to locate other points.",
    "Interpret the vertex as a maximum or minimum in context.",
  ],
  concepts: [
    { slug: "quadratic-functions", name: "Quadratic functions", description: "Functions of the form f(x) = ax² + bx + c with a ≠ 0, whose graphs are parabolas.", subject: "subj_math" },
  ],
  formulas: ["vertex-form"],
  blocks: [
    text(r`The graph of $y = ax^2 + bx + c$ is a parabola. It opens up when $a > 0$ (with a lowest point) and down when $a < 0$ (with a highest point). That turning point is the vertex, and the parabola is a mirror image of itself across the vertical line through it, the axis of symmetry.`),
    def("Axis of symmetry and vertex", r`For $y = ax^2 + bx + c$, the axis of symmetry is $x = -\dfrac{b}{2a}$. The vertex is the point on the parabola with that $x$-value: $\left(-\frac{b}{2a},\ f\!\left(-\frac{b}{2a}\right)\right)$.`),
    text(r`Why $-\frac{b}{2a}$? The parabola crosses the line $y = c$ where $ax^2 + bx = 0$, that is, at $x = 0$ and $x = -\frac{b}{a}$. By symmetry, the axis lies halfway between those two points: at $x = -\frac{b}{2a}$.`),
    example(r`Find the key features of $y = 2x^2 - 8x + 5$`, [
      [r`x = -\frac{-8}{2(2)} = 2`, "Axis of symmetry."],
      [r`y = 2(4) - 16 + 5 = -3`, "Vertex (2, −3). It's a minimum because a = 2 > 0."],
      [r`(0, 5)`, "y-intercept: c."],
      [r`(4, 5)`, "Mirror image of (0, 5) across x = 2."],
      [r`2x^2 - 8x + 5 = 0 \Rightarrow x = 2 \pm \tfrac{\sqrt{6}}{2} \approx 0.78,\ 3.22`, "x-intercepts, from the quadratic formula."],
    ]),
    activity("vertex-explorer", { title: "Vertex, axis and zeros", params: { a: 2, h: 2, k: -3 } }),
    callout("tip", "Try this", r`This is $y = 2(x - 2)^2 - 3$, the same parabola in vertex form. Read off the vertex and confirm the expanded form shows $2x^2 - 8x + 5$. Raise the vertex above the x-axis: how many zeros now?`, "experiment"),
    example(r`A ball's height is $h(t) = -16t^2 + 48t + 6$ feet. Find its maximum height and when it occurs.`, [
      [r`t = -\frac{48}{2(-16)} = 1.5 \text{ s}`, "a < 0, so the vertex is a maximum."],
      [r`h(1.5) = -36 + 72 + 6 = 42 \text{ ft}`, ""],
    ]),
    callout("warning", "Sign of b", r`In $y = x^2 + 6x$, $-\frac{b}{2a} = -\frac{6}{2} = -3$. The vertex is to the left of the y-axis when $a$ and $b$ have the same sign.`),
    callout("application", "Where this shows up", r`Maximizing area with fixed fencing, finding the best ticket price for revenue, and the peak height of a jump or a fountain all come from the vertex of a parabola.`),
  ],
  questions: [
    num(1, r`What is the axis of symmetry of $y = x^2 - 6x + 2$? Enter the x-value.`, 3, {}, [r`$-\frac{b}{2a} = -\frac{-6}{2}$.`], r`$x = 3$.`),
    short(2, r`Find the vertex of $y = x^2 + 4x - 1$. Enter as (x,y).`, ["(-2,-5)"], [r`Axis: $x = -2$.`, "Evaluate y at x = −2."], r`$x = -2$ and $y = 4 - 8 - 1 = -5$: $(-2, -5)$.`),
    mc(2, r`Does $y = -3x^2 + 12x + 1$ have a maximum or a minimum, and what is it?`, ["Minimum 13", "Maximum 13", "Maximum 2", "Minimum 1"], 1,
      [r`$a < 0$: opens down.`, r`Axis $x = 2$.`], r`$x = 2$ and $y = -12 + 24 + 1 = 13$: a maximum of 13.`),
    num(2, r`The parabola $y = x^2 - 8x + 7$ passes through $(1, 0)$. Use symmetry to find the other x-intercept.`, 7, {}, [r`The axis is $x = 4$.`, "1 is 3 units left of 4."], r`The mirror point is 3 units to the right: $x = 7$.`),
    num(2, r`A rocket's height is $h(t) = -5t^2 + 40t$ meters. What is its maximum height?`, 80, { unit: "m" }, [r`$t = -\frac{40}{2(-5)} = 4$.`], r`$h(4) = -80 + 160 = 80$ m.`),
    num(3, r`A farmer has 100 m of fencing for a rectangular pen. The area is $A = x(50 - x)$. What width $x$ gives the largest area?`, 25, { unit: "m" }, [r`$A = -x^2 + 50x$.`], r`$x = -\frac{50}{2(-1)} = 25$ m, a 25 m by 25 m square with area 625 m².`, "review"),
    short(3, r`Find the y-intercept of $y = 3(x - 1)^2 - 7$. Enter as (x,y).`, ["(0,-4)"], ["Substitute x = 0."], r`$3(1) - 7 = -4$: $(0, -4)$.`, "review"),
  ],
});
