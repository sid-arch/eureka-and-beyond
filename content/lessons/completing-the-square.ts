import { activity, callout, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "completing-the-square",
  title: "Completing the square",
  summary: "Rewrite x² + bx as a perfect square by adding (b/2)², solve quadratics with it, and convert standard form to vertex form.",
  minutes: 30,
  objectives: [
    "Explain completing the square with an area model.",
    "Solve quadratic equations by completing the square, including when a ≠ 1.",
    "Convert y = ax² + bx + c to vertex form y = a(x − h)² + k.",
  ],
  concepts: [
    { slug: "completing-the-square", name: "Completing the square", description: "Adding (b/2)² to x² + bx to form a perfect-square trinomial.", subject: "subj_math" },
    { slug: "special-products", name: "Special products", description: "Perfect-square trinomials and the difference of two squares.", subject: "subj_math" },
  ],
  formulas: ["vertex-form", "special-products"],
  blocks: [
    text(r`Picture $x^2 + 6x$ as an $x$-by-$x$ square plus a $6$-by-$x$ rectangle. Cut the rectangle in half and put one $3x$ strip on each side of the square. The shape is almost a big square of side $x + 3$; it's missing a $3$-by-$3$ corner. Adding 9 completes it: $x^2 + 6x + 9 = (x + 3)^2$.`),
    activity("area-model", { title: "The missing corner", params: { a: 1, b: 3, c: 1, d: 3 } }),
    callout("tip", "Try this", r`The model shows $(x + 3)^2$. The two $3x$ strips are the halves of $6x$ and the 9 is the corner you add. Set $b = d = 5$: which number completes $x^2 + 10x$?`, "experiment"),
    text(r`In general, to complete $x^2 + bx$, add $\left(\frac{b}{2}\right)^2$: $x^2 + bx + \left(\frac{b}{2}\right)^2 = \left(x + \frac{b}{2}\right)^2$. This only works directly when the coefficient of $x^2$ is 1.`),
    example(r`Solve $x^2 + 6x - 7 = 0$ by completing the square`, [
      [r`x^2 + 6x = 7`, "Move the constant."],
      [r`x^2 + 6x + 9 = 7 + 9`, "Add (6/2)² = 9 to both sides."],
      [r`(x + 3)^2 = 16`, ""],
      [r`x + 3 = \pm 4 \Rightarrow x = 1 \text{ or } x = -7`, ""],
    ], "Factoring gives the same answer: (x + 7)(x − 1) = 0."),
    example(r`Solve $2x^2 - 8x - 3 = 0$`, [
      [r`x^2 - 4x = \tfrac{3}{2}`, "Divide every term by 2, then move the constant."],
      [r`x^2 - 4x + 4 = \tfrac{3}{2} + 4 = \tfrac{11}{2}`, "Add (−4/2)² = 4."],
      [r`(x - 2)^2 = \tfrac{11}{2}`, ""],
      [r`x = 2 \pm \sqrt{\tfrac{11}{2}} \approx 4.35 \text{ or } -0.35`, r`$\sqrt{5.5} \approx 2.345$.`],
    ], r`Check $x \approx 4.345$: $2(18.88) - 34.76 - 3 \approx 0$. ✓`),
    example(r`Write $y = x^2 - 10x + 18$ in vertex form`, [
      [r`y = (x^2 - 10x + 25) - 25 + 18`, "Add and subtract 25 on the same side to keep it equal."],
      [r`y = (x - 5)^2 - 7`, "Vertex (5, −7)."],
    ]),
    callout("warning", "Keep the equation balanced", r`When solving, add $\left(\frac{b}{2}\right)^2$ to both sides. When rewriting a function, add and subtract it on the same side. Forgetting to balance is the most common mistake.`),
    callout("note", "Why it matters", r`Completing the square on $ax^2 + bx + c = 0$ in general produces the quadratic formula. It's also how circles' equations are put into center-radius form in geometry and Algebra 2.`),
    callout("application", "Where this shows up", r`Vertex form reveals a maximum or minimum directly. A company's profit $P = -x^2 + 40x - 300$ becomes $-(x - 20)^2 + 100$: the best price is 20 dollars, with a maximum profit of 100 dollars.`),
  ],
  questions: [
    num(1, r`What number completes the square for $x^2 + 14x$?`, 49, {}, [r`$(14/2)^2$.`], r`$7^2 = 49$.`),
    num(1, r`What number completes the square for $x^2 - 5x$? Enter a fraction or decimal.`, 6.25, {}, [r`$(-5/2)^2$.`], r`$\frac{25}{4} = 6.25$.`),
    short(2, r`Solve $x^2 + 8x + 7 = 0$ by completing the square. Enter both solutions, smaller first.`, ["-7,-1"], [r`$x^2 + 8x + 16 = 9$.`], r`$(x + 4)^2 = 9$, so $x = -4 \pm 3$: $x = -7$ or $x = -1$.`),
    short(2, r`Write $y = x^2 + 6x + 2$ in vertex form. Use the format y=(x+h)^2+k.`, ["y=(x+3)^2-7"], ["Add and subtract 9."], r`$(x + 3)^2 - 9 + 2 = (x + 3)^2 - 7$.`),
    num(3, r`Solve $x^2 - 2x - 4 = 0$. Give the larger solution to two decimal places.`, 3.24, { tolerance: 0.006 }, [r`$(x - 1)^2 = 5$.`], r`$x = 1 \pm \sqrt{5}$; the larger is $1 + 2.236 \approx 3.24$.`),
    mc(3, r`What is the vertex of $y = 2x^2 + 12x + 11$?`, [r`$(3, -7)$`, r`$(-3, -7)$`, r`$(-6, 11)$`, r`$(-3, 11)$`], 1, [r`Factor 2 from the first two terms: $2(x^2 + 6x) + 11$.`, r`$2(x^2 + 6x + 9) - 18 + 11$.`], r`$y = 2(x + 3)^2 - 7$, so the vertex is $(-3, -7)$.`, "review"),
  ],
});
