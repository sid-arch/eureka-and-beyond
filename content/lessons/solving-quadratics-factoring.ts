import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-quadratics-factoring",
  title: "Solving quadratic equations by factoring",
  summary: "Use the zero-product property to solve quadratic equations: set the equation equal to zero, factor, and solve each factor.",
  minutes: 25,
  objectives: [
    "State and explain the zero-product property.",
    "Solve quadratic equations by writing them in standard form and factoring.",
    "Connect solutions of ax² + bx + c = 0 to the x-intercepts of the graph and solve applied problems.",
  ],
  concepts: [
    { slug: "zero-product-property", name: "Zero-product property", description: "If ab = 0, then a = 0 or b = 0.", subject: "subj_math" },
    { slug: "factoring", name: "Factoring", description: "Writing a polynomial as a product of simpler polynomials.", subject: "subj_math" },
  ],
  blocks: [
    def("Zero-product property", r`If $ab = 0$, then $a = 0$ or $b = 0$ (or both). A product can only be zero if one of its factors is zero.`),
    text(r`That makes factoring powerful. $(x - 3)(x + 5) = 0$ is true exactly when $x - 3 = 0$ or $x + 5 = 0$, so $x = 3$ or $x = -5$. But it only works when one side is zero. $(x - 3)(x + 5) = 9$ tells you nothing about either factor on its own.`),
    example(r`Solve $x^2 + 2x = 15$`, [
      [r`x^2 + 2x - 15 = 0`, "Get zero on one side."],
      [r`(x + 5)(x - 3) = 0`, "Factor."],
      [r`x = -5 \text{ or } x = 3`, "Set each factor equal to zero."],
    ], r`Check: $25 - 10 = 15$ ✓ and $9 + 6 = 15$ ✓.`),
    example(r`Solve $3x^2 = 12x$`, [
      [r`3x^2 - 12x = 0`, "Don't divide by x: you would lose the solution x = 0."],
      [r`3x(x - 4) = 0`, ""],
      [r`x = 0 \text{ or } x = 4`, ""],
    ]),
    example(r`Solve $2x^2 - 5x - 3 = 0$`, [
      [r`(2x + 1)(x - 3) = 0`, "ac method: −6 = −6 · 1, and −6 + 1 = −5."],
      [r`x = -\tfrac{1}{2} \text{ or } x = 3`, ""],
    ]),
    activity("vertex-explorer", { title: "Solutions are x-intercepts", params: { a: 1, h: -1, k: -4 } }),
    callout("tip", "Try this", r`This parabola is $y = (x + 1)^2 - 4 = x^2 + 2x - 3 = (x + 3)(x - 1)$. Its zeros are where $x^2 + 2x - 3 = 0$. Do the readouts agree? Move the vertex until there's only one zero: what does the factored form look like then?`, "experiment"),
    callout("warning", "Zero on one side first", r`From $x(x - 2) = 8$, concluding $x = 8$ or $x - 2 = 8$ is wrong. Expand and rearrange: $x^2 - 2x - 8 = 0$, so $(x - 4)(x + 2) = 0$ and $x = 4$ or $x = -2$.`),
    callout("application", "Where this shows up", r`A rectangle's length is 3 cm more than its width and its area is 40 cm²: $w(w + 3) = 40$ gives $(w + 8)(w - 5) = 0$. Only $w = 5$ makes sense, because a width can't be negative.`),
  ],
  questions: [
    short(1, r`Solve $(x - 7)(x + 2) = 0$. Enter both solutions, smaller first.`, ["-2,7"], ["Set each factor to zero."], r`$x = 7$ or $x = -2$.`),
    short(2, r`Solve $x^2 - 9x + 20 = 0$. Enter both solutions, smaller first.`, ["4,5"], ["Factor: product 20, sum −9."], r`$(x - 4)(x - 5) = 0$, so $x = 4$ or $x = 5$.`),
    short(2, r`Solve $x^2 = 7x$. Enter both solutions, smaller first.`, ["0,7"], ["Move 7x to the left and factor out x."], r`$x(x - 7) = 0$: $x = 0$ or $x = 7$.`),
    short(2, r`Solve $x^2 - 49 = 0$. Enter both solutions, smaller first.`, ["-7,7"], ["Difference of squares."], r`$(x + 7)(x - 7) = 0$: $x = \pm 7$.`),
    short(3, r`Solve $3x^2 + 10x - 8 = 0$. Enter both solutions, smaller first, as integers or fractions.`, ["-4,2/3"], ["ac = −24, b = 10: use 12 and −2.", r`$(3x - 2)(x + 4) = 0$.`], r`$x = \frac{2}{3}$ or $x = -4$.`),
    mc(2, r`A student solved $x(x + 1) = 6$ by writing $x = 6$ or $x + 1 = 6$. What's wrong?`, ["Nothing", "The zero-product property needs 0 on one side", "They should divide by x", "They should take square roots"], 1,
      ["What does the zero-product property require?"], r`Rewrite as $x^2 + x - 6 = 0$, so $(x + 3)(x - 2) = 0$ and $x = -3$ or $x = 2$. Neither $x = 6$ nor $x = 5$ works.`),
    short(3, r`The product of two consecutive positive integers is 132. What is the smaller integer?`, ["11"], [r`$n(n + 1) = 132$.`, r`$n^2 + n - 132 = 0$.`], r`$(n + 12)(n - 11) = 0$; the positive solution is $n = 11$.`, "review"),
  ],
});
