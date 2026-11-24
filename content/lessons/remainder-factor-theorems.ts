import { callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "remainder-factor-theorems",
  title: "The Remainder and Factor Theorems",
  summary: "Use the Remainder Theorem to evaluate polynomials quickly and the Factor Theorem to test factors and factor polynomials completely.",
  minutes: 25,
  objectives: [
    "State and use the Remainder Theorem: the remainder of P(x) ÷ (x − c) is P(c).",
    "State and use the Factor Theorem: x − c is a factor exactly when P(c) = 0.",
    "Factor a polynomial completely given one zero.",
  ],
  concepts: [
    { slug: "polynomial-division", name: "Polynomial division", description: "Dividing polynomials by long or synthetic division to find a quotient and remainder.", subject: "subj_math" },
  ],
  blocks: [
    def("Remainder Theorem", r`When $P(x)$ is divided by $x - c$, the remainder is $P(c)$. Reason: $P(x) = (x - c)Q(x) + R$; substituting $x = c$ gives $P(c) = R$.`),
    def("Factor Theorem", r`$x - c$ is a factor of $P(x)$ if and only if $P(c) = 0$, that is, $c$ is a zero.`),
    example(r`Is $x + 2$ a factor of $P(x) = x^3 + 4x^2 + x - 6$? Factor completely.`, [
      [r`P(-2) = -8 + 16 - 2 - 6 = 0`, "Yes, x + 2 is a factor."],
      [r`P(x) = (x + 2)(x^2 + 2x - 3)`, "Synthetic division by −2 gives 1, 2, −3, 0."],
      [r`= (x + 2)(x + 3)(x - 1)`, ""],
    ]),
    example(r`Find $k$ so that $x - 1$ is a factor of $2x^3 + kx^2 - 5x + 1$`, [
      [r`P(1) = 2 + k - 5 + 1 = 0`, ""],
      [r`k = 2`, ""],
    ]),
    callout("application", "Where this shows up", r`Computer algebra systems test candidate factors with these theorems, and evaluating P(c) by synthetic division is how calculators compute polynomial values efficiently (Horner's method).`),
  ],
  questions: [
    num(1, r`What is the remainder when $P(x) = x^3 - 4x + 1$ is divided by $x - 2$?`, 1, {}, [r`$P(2)$.`], r`$8 - 8 + 1 = 1$.`),
    mc(2, r`Which is a factor of $x^3 - 6x^2 + 11x - 6$?`, [r`$x + 1$`, r`$x - 1$`, r`$x + 2$`, r`$x - 4$`], 1, ["Test P(c) = 0."], r`$P(1) = 1 - 6 + 11 - 6 = 0$.`),
    short(2, r`Factor completely: $x^3 - 6x^2 + 11x - 6$.`, ["(x-1)(x-2)(x-3)"], ["Divide by x − 1."], r`$(x - 1)(x^2 - 5x + 6) = (x - 1)(x - 2)(x - 3)$.`),
    num(3, r`Find $k$ so that $x + 3$ is a factor of $x^3 + kx - 6$.`, -11, {}, [r`$P(-3) = 0$.`], r`$-27 - 3k - 6 = 0$, $k = -11$.`, "review"),
  ],
});
