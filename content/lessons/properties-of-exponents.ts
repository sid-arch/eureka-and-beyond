import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "properties-of-exponents",
  title: "Properties of exponents",
  summary: "Derive and apply the product, quotient and power rules for exponents to simplify numerical and algebraic expressions, including scientific notation.",
  minutes: 25,
  objectives: [
    "Explain the product, quotient, power-of-a-power, power-of-a-product and power-of-a-quotient rules from the meaning of exponents.",
    "Simplify expressions with variables and integer coefficients using these rules.",
    "Multiply and divide numbers in scientific notation.",
  ],
  concepts: [
    { slug: "exponents", name: "Exponents", description: "Notation for repeated multiplication of a base.", subject: "subj_math" },
    { slug: "exponent-rules", name: "Exponent rules", description: "Product, quotient and power rules for simplifying powers.", subject: "subj_math" },
  ],
  formulas: ["exponent-rules"],
  blocks: [
    text(r`Every exponent rule follows from what an exponent means: $a^n$ is $n$ factors of $a$. You never have to memorize them blindly. Write out the factors once and the rule is visible.`),
    def("Product rule", r`$a^m \cdot a^n = a^{m+n}$. Example: $x^3 \cdot x^4 = (xxx)(xxxx) = x^7$.`),
    def("Quotient rule", r`$\dfrac{a^m}{a^n} = a^{m-n}$ for $a \ne 0$. Example: $\dfrac{x^6}{x^2} = \dfrac{xxxxxx}{xx} = x^4$.`),
    def("Power rules", r`Power of a power: $(a^m)^n = a^{mn}$. Power of a product: $(ab)^n = a^n b^n$. Power of a quotient: $\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$, $b \ne 0$.`),
    example(r`Simplify $(2x^3y)^4$`, [
      [r`2^4 (x^3)^4 y^4`, "Raise each factor to the 4th power."],
      [r`16x^{12}y^4`, "Multiply exponents: 3 · 4 = 12."],
    ]),
    example(r`Simplify $\dfrac{12a^5b^3}{4a^2b}$`, [
      [r`\tfrac{12}{4} \cdot a^{5-2} \cdot b^{3-1}`, "Divide coefficients; subtract exponents for each base."],
      [r`3a^3b^2`, ""],
    ]),
    example(r`Simplify $(-3m^2)^3 \cdot m^4$`, [
      [r`(-3)^3 (m^2)^3 \cdot m^4 = -27m^6 \cdot m^4`, "Cube −3 and m² separately."],
      [r`-27m^{10}`, "Product rule: 6 + 4."],
    ]),
    callout("warning", "Common mix-ups", r`$x^3 \cdot x^4 = x^7$, not $x^{12}$ (multiply exponents only for a power of a power). $(x + y)^2 \ne x^2 + y^2$: the power rule works for products, not sums. And $3x^2$ means $3 \cdot x^2$, so $(3x)^2 = 9x^2$ but $3x^2$ is not.`),
    example(r`Compute $(4 \times 10^5)(6 \times 10^{-2})$ in scientific notation`, [
      [r`(4 \cdot 6) \times 10^{5 + (-2)} = 24 \times 10^3`, "Multiply the numbers and add the exponents."],
      [r`2.4 \times 10^4`, "Adjust so the leading number is from 1 to 10."],
    ]),
    callout("application", "Where this shows up", r`Scientists use these rules constantly: light travels about $3 \times 10^8$ m/s, so in $5 \times 10^2$ seconds it goes $15 \times 10^{10} = 1.5 \times 10^{11}$ m, about the distance from the Sun to Earth.`),
  ],
  questions: [
    short(1, r`Simplify $x^5 \cdot x^3$.`, ["x^8"], ["Add the exponents."], r`$x^8$.`),
    short(1, r`Simplify $\dfrac{y^9}{y^4}$.`, ["y^5"], ["Subtract the exponents."], r`$y^5$.`),
    short(2, r`Simplify $(a^4)^3$.`, ["a^12"], ["Multiply the exponents."], r`$a^{12}$.`),
    short(2, r`Simplify $(3x^2y^5)^2$.`, ["9x^4y^10"], ["Square each factor."], r`$9x^4y^{10}$.`),
    short(2, r`Simplify $\dfrac{18m^7n^4}{6m^3n}$.`, ["3m^4n^3"], ["Divide 18 by 6; subtract the exponents."], r`$3m^4n^3$.`),
    mc(2, r`Which is equal to $(2x)^3$?`, [r`$2x^3$`, r`$6x^3$`, r`$8x^3$`, r`$8x$`], 2, ["The cube applies to both 2 and x."], r`$2^3 x^3 = 8x^3$.`),
    num(3, r`Compute $(3 \times 10^4)(5 \times 10^3)$. Enter the answer as a plain number or in e-notation.`, 1.5e8, { relative: true, tolerance: 1e-9 }, ["3 · 5 = 15, and 10⁴ · 10³ = 10⁷."], r`$15 \times 10^7 = 1.5 \times 10^8 = 150{,}000{,}000$.`),
    short(3, r`Simplify $\left(\dfrac{2a^3}{b}\right)^4 \cdot b^6$.`, ["16a^12b^2"], [r`$\frac{16a^{12}}{b^4} \cdot b^6$.`], r`$16a^{12}b^{6-4} = 16a^{12}b^2$.`, "review"),
  ],
});
