import { callout, def, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "dividing-polynomials",
  title: "Dividing polynomials",
  summary: "Divide polynomials by long division and by synthetic division, and write the result as quotient plus remainder over divisor.",
  minutes: 30,
  objectives: [
    "Divide a polynomial by a polynomial using long division.",
    "Use synthetic division to divide by x − c.",
    "Write the division result as P(x) = D(x)Q(x) + R(x).",
  ],
  concepts: [
    { slug: "polynomial-division", name: "Polynomial division", description: "Dividing polynomials by long or synthetic division to find a quotient and remainder.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Polynomial long division works like long division of numbers: divide the leading terms, multiply, subtract, bring down, repeat. Write missing powers with zero coefficients so the columns line up.`),
    example(r`Divide $2x^3 + 3x^2 - 5x + 6$ by $x + 3$`, [
      [r`2x^3 \div x = 2x^2;\ \ 2x^2(x + 3) = 2x^3 + 6x^2`, "Subtract: −3x² − 5x."],
      [r`-3x^2 \div x = -3x;\ \ -3x(x + 3) = -3x^2 - 9x`, "Subtract: 4x + 6."],
      [r`4x \div x = 4;\ \ 4(x + 3) = 4x + 12`, "Subtract: remainder −6."],
      [r`2x^2 - 3x + 4 - \frac{6}{x + 3}`, ""],
    ]),
    def("Synthetic division", r`A shortcut for dividing by $x - c$: write $c$ and the coefficients. Bring down the first coefficient; repeatedly multiply by $c$, write the product under the next coefficient, and add. The last number is the remainder; the others are the quotient's coefficients, one degree lower.`),
    example(r`Divide $x^3 - 7x + 6$ by $x - 2$ synthetically`, [
      [r`2 \,|\, 1 \quad 0 \quad -7 \quad 6`, "Include 0 for the missing x² term."],
      [r`\phantom{2 \,|\,} 1 \quad 2 \quad -3 \quad 0`, "Down 1; 1·2 = 2, 0 + 2 = 2; 2·2 = 4, −7 + 4 = −3; −3·2 = −6, 6 − 6 = 0."],
      [r`x^2 + 2x - 3,\ \text{remainder } 0`, "x − 2 is a factor."],
    ]),
    callout("warning", "Use c, not −c", r`For $x + 3$, use $c = -3$ in synthetic division. Synthetic division only works for divisors of the form $x - c$.`),
    callout("application", "Where this shows up", r`Division simplifies rational functions, finds slant asymptotes, and factors polynomials once one zero is known. Error-checking codes in digital communication use polynomial division too.`),
  ],
  questions: [
    short(2, r`Divide $x^2 + 7x + 12$ by $x + 3$.`, ["x+4"], [], r`$x + 4$, remainder 0.`),
    num(2, r`Find the remainder when $x^3 - 2x^2 + 4$ is divided by $x - 3$.`, 13, {}, ["Synthetic division with c = 3."], r`Coefficients 1, −2, 0, 4: 1, 1, 3, 13. Remainder 13.`),
    short(2, r`Divide $2x^3 - 5x^2 + x + 2$ by $x - 2$. Enter the quotient.`, ["2x^2-x-1"], [], r`2, −1, −1 with remainder 0: $2x^2 - x - 1$.`),
    num(3, r`Find the remainder when $x^4 - 1$ is divided by $x + 1$.`, 0, {}, ["Coefficients 1, 0, 0, 0, −1, c = −1."], r`1, −1, 1, −1, 0: remainder 0.`, "review"),
  ],
});
