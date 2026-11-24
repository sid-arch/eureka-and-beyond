import { activity, callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "linear-quadratic-systems",
  title: "Linear-quadratic systems",
  summary: "Solve systems with one line and one parabola by substitution and by graphing, and use the discriminant to predict zero, one or two intersection points.",
  minutes: 30,
  objectives: [
    "Solve a linear-quadratic system by substitution, finding both coordinates of each solution.",
    "Explain graphically why such a system can have zero, one or two solutions.",
    "Use the discriminant of the resulting quadratic to count solutions without solving.",
  ],
  concepts: [
    { slug: "systems-of-equations", name: "Systems of linear equations", description: "Two or more equations solved together; solutions satisfy all of them.", subject: "subj_math" },
    { slug: "discriminant", name: "Discriminant", description: "b² − 4ac, which tells how many real solutions a quadratic equation has.", subject: "subj_math" },
  ],
  formulas: ["quadratic-formula", "discriminant"],
  blocks: [
    text(r`A line can miss a parabola, touch it at exactly one point (a tangent line), or cross it twice. So a system of one linear and one quadratic equation has zero, one or two real solutions.`),
    example(r`Solve $y = x^2 - 2x - 3$ and $y = x + 1$`, [
      [r`x^2 - 2x - 3 = x + 1`, "Both equal y, so set them equal."],
      [r`x^2 - 3x - 4 = 0 \Rightarrow (x - 4)(x + 1) = 0`, ""],
      [r`x = 4 \Rightarrow y = 5;\quad x = -1 \Rightarrow y = 0`, "Find y from the linear equation."],
      [r`(4, 5) \text{ and } (-1, 0)`, ""],
    ], r`Check $(4, 5)$ in the parabola: $16 - 8 - 3 = 5$. ✓`),
    activity("vertex-explorer", { title: "Imagine a line across this parabola", params: { a: 1, h: 1, k: -4 } }),
    callout("tip", "Try this", r`This parabola is $y = (x - 1)^2 - 4 = x^2 - 2x - 3$, the one in the example. Picture the line $y = x + 1$ through $(-1, 0)$ and $(4, 5)$. Now picture $y = -5$: it misses entirely. Which horizontal line touches the parabola exactly once?`, "experiment"),
    example(r`How many solutions does $y = x^2 + 4$, $y = 2x + 1$ have?`, [
      [r`x^2 + 4 = 2x + 1 \Rightarrow x^2 - 2x + 3 = 0`, ""],
      [r`b^2 - 4ac = 4 - 12 = -8 < 0`, "Negative discriminant."],
      [r`\text{No real solutions}`, "The line passes below the parabola without touching it."],
    ]),
    example(r`Find $k$ so that $y = kx$ is tangent to $y = x^2 + 1$ (for $k > 0$)`, [
      [r`x^2 - kx + 1 = 0`, "Set equal and rearrange."],
      [r`k^2 - 4 = 0`, "Tangent means exactly one solution: discriminant 0."],
      [r`k = 2`, r`The line $y = 2x$ touches the parabola at $(1, 2)$.`],
    ]),
    callout("warning", "Pair each x with its y", r`Each x-value gives its own point. After finding $x = 4$ and $x = -1$, compute each $y$ separately. Use the linear equation; it's easier and less error-prone.`),
    callout("application", "Where this shows up", r`Does a thrown ball's parabolic path clear a sloped roof? When does a car accelerating from rest (distance $\frac{1}{2}at^2$) catch one moving at constant speed ($vt + d_0$)? Both are linear-quadratic systems.`),
  ],
  questions: [
    short(2, r`Solve $y = x^2$ and $y = 4$. Enter the two points as (x,y),(x,y), smaller x first.`, ["(-2,4),(2,4)"], [r`$x^2 = 4$.`], r`$x = \pm 2$: $(-2, 4)$ and $(2, 4)$.`),
    short(2, r`Solve $y = x^2 + 1$ and $y = x + 3$. Enter the points, smaller x first.`, ["(-1,2),(2,5)"], [r`$x^2 - x - 2 = 0$.`], r`$(x - 2)(x + 1) = 0$: $(2, 5)$ and $(-1, 2)$.`),
    mc(2, r`How many solutions does $y = x^2 - 6x + 9$, $y = 0$ have?`, ["0", "1", "2", "Infinitely many"], 1, [r`$x^2 - 6x + 9 = (x - 3)^2$.`], r`The x-axis is tangent at $(3, 0)$: exactly one solution.`),
    mc(2, r`How many solutions does $y = -x^2 + 2$, $y = x + 5$ have?`, ["0", "1", "2", "3"], 0, [r`$-x^2 + 2 = x + 5 \Rightarrow x^2 + x + 3 = 0$.`, "Find the discriminant."], r`$1 - 12 = -11 < 0$, so no real solutions.`),
    short(3, r`For what positive value of $b$ is the line $y = 2x + b$ tangent to $y = x^2 + 3$?`, ["2", "b=2"], [r`$x^2 - 2x + (3 - b) = 0$.`, "Set the discriminant to 0."], r`$4 - 4(3 - b) = 0 \Rightarrow 4b = 8 \Rightarrow b = 2$. Tangent point $(1, 4)$.`),
    short(3, r`Solve $y = x^2 - 4x + 5$ and $y = 2x - 3$. Enter the points, smaller x first.`, ["(2,1),(4,5)"], [r`$x^2 - 6x + 8 = 0$.`], r`$(x - 2)(x - 4) = 0$: $(2, 1)$ and $(4, 5)$.`, "review"),
  ],
});
