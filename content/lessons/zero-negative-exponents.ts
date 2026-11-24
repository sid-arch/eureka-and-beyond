import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "zero-negative-exponents",
  title: "Zero and negative exponents",
  summary: "Understand why a⁰ = 1 and a⁻ⁿ = 1/aⁿ, simplify expressions with negative exponents, and write small numbers in scientific notation.",
  minutes: 25,
  objectives: [
    "Justify the definitions of zero and negative exponents using the quotient rule and patterns.",
    "Rewrite expressions with only positive exponents.",
    "Use negative exponents in scientific notation for very small numbers.",
  ],
  concepts: [
    { slug: "exponent-rules", name: "Exponent rules", description: "Product, quotient and power rules for simplifying powers.", subject: "subj_math" },
  ],
  formulas: ["exponent-rules"],
  blocks: [
    text(r`What should $5^0$ mean? You can't multiply zero 5s together. Look at a pattern instead: $5^3 = 125$, $5^2 = 25$, $5^1 = 5$. Each time the exponent drops by 1 you divide by 5. Continuing gives $5^0 = 1$, $5^{-1} = \frac{1}{5}$ and $5^{-2} = \frac{1}{25}$.`),
    text(r`The quotient rule agrees. $\frac{x^4}{x^4} = 1$, and also $\frac{x^4}{x^4} = x^{4-4} = x^0$, so $x^0 = 1$. Likewise $\frac{x^2}{x^5} = \frac{1}{x^3}$, and the rule gives $x^{2-5} = x^{-3}$, so $x^{-3} = \frac{1}{x^3}$.`),
    def("Zero exponent", r`$a^0 = 1$ for any $a \ne 0$. ($0^0$ is left undefined in algebra.)`),
    def("Negative exponent", r`$a^{-n} = \dfrac{1}{a^n}$ and $\dfrac{1}{a^{-n}} = a^n$ for $a \ne 0$. A negative exponent means reciprocal, not a negative number.`),
    example(r`Evaluate $4^{-2}$, $(-2)^{-3}$ and $\left(\frac{2}{3}\right)^{-2}$`, [
      [r`4^{-2} = \tfrac{1}{16}`, ""],
      [r`(-2)^{-3} = \tfrac{1}{(-2)^3} = -\tfrac{1}{8}`, "The sign comes from the base, not the exponent."],
      [r`\left(\tfrac{2}{3}\right)^{-2} = \left(\tfrac{3}{2}\right)^2 = \tfrac{9}{4}`, "Flip the fraction and make the exponent positive."],
    ]),
    example(r`Simplify $\dfrac{6x^{-2}y^3}{2x^4y^{-1}}$ with positive exponents`, [
      [r`3x^{-2-4}y^{3-(-1)}`, "Divide coefficients and subtract exponents."],
      [r`3x^{-6}y^4 = \dfrac{3y^4}{x^6}`, "Only x⁻⁶ moves to the denominator; the 3 stays."],
    ]),
    callout("warning", "What moves?", r`In $3x^{-2}$, only $x$ has the negative exponent: $3x^{-2} = \frac{3}{x^2}$. But $(3x)^{-2} = \frac{1}{9x^2}$.`),
    example(r`Write 0.000 042 in scientific notation`, [
      [r`4.2 \times 10^{-5}`, "Move the decimal 5 places right to get 4.2; the number is small, so the exponent is negative."],
    ], r`Check: $4.2 \times 10^{-5} = 4.2 \times \frac{1}{100{,}000} = 0.000042$.`),
    callout("application", "Where this shows up", r`A red blood cell is about $8 \times 10^{-6}$ m across and a hydrogen atom about $1 \times 10^{-10}$ m. Computer memory uses powers of 2, and decibels and pH use negative powers of 10.`),
  ],
  questions: [
    num(1, r`Evaluate $7^0$.`, 1, {}, ["Any nonzero number to the zero power."], r`$7^0 = 1$.`),
    num(1, r`Evaluate $2^{-3}$. Enter a fraction or decimal.`, 0.125, {}, [r`$2^{-3} = \frac{1}{2^3}$.`], r`$\frac{1}{8} = 0.125$.`),
    num(2, r`Evaluate $\left(\frac{1}{5}\right)^{-2}$.`, 25, {}, ["Flip the base."], r`$5^2 = 25$.`),
    short(2, r`Write $x^{-4}y^2$ with positive exponents. Use the format y^2/x^4.`, ["y^2/x^4"], [r`Only $x^{-4}$ moves.`], r`$\frac{y^2}{x^4}$.`),
    short(2, r`Simplify $\dfrac{a^3}{a^{-2}}$.`, ["a^5"], [r`$3 - (-2) = 5$.`], r`$a^5$.`),
    mc(2, r`Which is equal to $5x^{-3}$?`, [r`$\frac{1}{5x^3}$`, r`$\frac{5}{x^3}$`, r`$-5x^3$`, r`$-15x$`], 1, ["Only x has the negative exponent."], r`$\frac{5}{x^3}$.`),
    num(2, r`Write $3.7 \times 10^{-4}$ in standard form.`, 0.00037, { relative: true, tolerance: 1e-9 }, ["Move the decimal 4 places left."], r`$0.00037$.`),
    short(3, r`Simplify $(2m^{-3}n^2)^{-2}$ with positive exponents. Use the format m^6/(4n^4).`, ["m^6/(4n^4)", "m^6/4n^4"], [r`Multiply each exponent by −2: $2^{-2}m^6n^{-4}$.`], r`$\frac{m^6}{4n^4}$.`, "review"),
  ],
});
