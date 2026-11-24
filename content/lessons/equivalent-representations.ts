import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "equivalent-representations",
  title: "Equivalent representations of polynomial and rational expressions",
  summary: "Rewrite polynomial and rational expressions in standard, factored and quotient-plus-remainder forms, and choose the form that reveals what you need.",
  minutes: 25,
  objectives: [
    "Choose standard or factored form to reveal end behavior, intercepts or zeros.",
    "Use polynomial division to rewrite a rational expression as quotient plus remainder over divisor.",
    "Use the Binomial Theorem to expand powers of binomials.",
  ],
  concepts: [
    { slug: "polynomials", name: "Polynomials", description: "Sums of terms of the form axⁿ with whole-number exponents.", subject: "subj_math" },
    { slug: "rational-functions", name: "Rational functions", description: "Functions that are ratios of polynomials, with asymptotes and holes.", subject: "subj_math" },
  ],
  formulas: ["binomial-theorem"],
  blocks: [
    def("Which form shows what", r`Standard form shows the degree, leading coefficient and $y$-intercept. Factored form shows zeros and their multiplicities. For a rational expression, the form $q(x) + \frac{r(x)}{d(x)}$ shows the end behavior through the quotient $q$.`),
    example(r`$f(x) = 2x^3 - 8x$`, [
      [r`f(x) = 2x(x - 2)(x + 2)`, "Factored: zeros at 0, 2 and −2."],
      [r`\text{leading term } 2x^3`, "Standard: rises to the right, falls to the left."],
    ]),
    example(r`Rewrite $\dfrac{x^3 - 2x^2 + 4}{x - 2}$`, [
      [r`x^3 - 2x^2 = x^2(x - 2)`, ""],
      [r`\frac{x^3 - 2x^2 + 4}{x - 2} = x^2 + \frac{4}{x - 2}`, "For large |x| it behaves like the parabola y = x²."],
    ]),
    example(r`Expand $(x + 2)^4$ with the Binomial Theorem`, [
      [r`\binom{4}{0}x^4 + \binom{4}{1}x^3 \cdot 2 + \binom{4}{2}x^2 \cdot 4 + \binom{4}{3}x \cdot 8 + 16`, "Coefficients 1, 4, 6, 4, 1."],
      [r`x^4 + 8x^3 + 24x^2 + 32x + 16`, ""],
    ], r`Check at $x = 1$: $3^4 = 81$ and $1 + 8 + 24 + 32 + 16 = 81$.`),
    callout("application", "Where this shows up", r`Engineers rewrite transfer functions as quotient plus remainder to separate long-run behavior from short-lived effects.`),
  ],
  questions: [
    num(1, r`In the expansion of $(x + 1)^3$, what is the coefficient of $x$?`, 3, {}, ["Row 1, 3, 3, 1 of Pascal's triangle."], r`$x^3 + 3x^2 + 3x + 1$.`),
    mc(2, r`$\dfrac{2x^2 + 3x - 5}{x - 1}$ simplifies to…`, [r`$2x + 5$, for $x \ne 1$`, r`$2x - 5$`, r`$2x + 1 + \frac{4}{x - 1}$`, r`$2x^2 + 5$`], 0, ["Try factoring the numerator."], r`$2x^2 + 3x - 5 = (2x + 5)(x - 1)$, so the quotient is $2x + 5$ with a hole at $x = 1$.`),
    mc(2, r`Which form of $f(x) = x^2 - 6x + 8$ shows its zeros directly?`, [r`$x^2 - 6x + 8$`, r`$(x - 3)^2 - 1$`, r`$(x - 2)(x - 4)$`, r`$x(x - 6) + 8$`], 2, [], r`Factored form: zeros 2 and 4. (Vertex form shows the vertex (3, −1).)`),
    num(3, r`In the expansion of $(x - 3)^4$, what is the coefficient of $x^2$?`, 54, {}, [r`$\binom{4}{2}x^2(-3)^2$.`], r`$6 \cdot 9 = 54$.`, "review"),
  ],
});
