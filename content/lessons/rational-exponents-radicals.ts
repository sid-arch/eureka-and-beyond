import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rational-exponents-radicals",
  title: "Rational exponents and radicals",
  summary: "Interpret fractional exponents as roots, convert between radical and exponent form, and evaluate and simplify expressions with rational exponents.",
  minutes: 25,
  objectives: [
    "Explain why a^(1/n) is the nth root of a using the power-of-a-power rule.",
    "Convert between radical form and rational exponent form.",
    "Evaluate and simplify expressions with rational exponents, including negative ones.",
  ],
  concepts: [
    { slug: "rational-exponents", name: "Rational exponents", description: "Exponents that are fractions; a^(m/n) is the nth root of a, raised to the m.", subject: "subj_math" },
    { slug: "square-roots", name: "Square roots", description: "A number that, multiplied by itself, gives a given number.", subject: "subj_math" },
  ],
  formulas: ["exponent-rules"],
  blocks: [
    text(r`If the exponent rules are to keep working for fractions, what must $9^{1/2}$ be? Squaring it should give $\left(9^{1/2}\right)^2 = 9^{1/2 \cdot 2} = 9^1 = 9$. The positive number whose square is 9 is 3, so $9^{1/2} = \sqrt{9} = 3$.`),
    def("Rational exponents", r`For $a > 0$ and positive integers $m, n$: $a^{1/n} = \sqrt[n]{a}$ and $a^{m/n} = \left(\sqrt[n]{a}\right)^m = \sqrt[n]{a^m}$. The denominator is the root; the numerator is the power.`),
    def("nth root", r`$\sqrt[n]{a}$ is the number whose $n$th power is $a$: $\sqrt[3]{64} = 4$ because $4^3 = 64$. Odd roots of negative numbers are real ($\sqrt[3]{-8} = -2$); even roots of negative numbers are not.`),
    example(r`Evaluate $27^{2/3}$`, [
      [r`\left(\sqrt[3]{27}\right)^2`, "Root first: the numbers stay small."],
      [r`3^2 = 9`, ""],
    ], r`Power first gives the same answer: $\sqrt[3]{27^2} = \sqrt[3]{729} = 9$.`),
    example(r`Evaluate $16^{-3/4}$`, [
      [r`\frac{1}{16^{3/4}}`, "Negative exponent: reciprocal."],
      [r`\frac{1}{\left(\sqrt[4]{16}\right)^3} = \frac{1}{2^3} = \frac{1}{8}`, ""],
    ]),
    example(r`Simplify $x^{1/2} \cdot x^{1/3}$ and $\left(y^{6}\right)^{2/3}$ for positive $x, y$`, [
      [r`x^{1/2 + 1/3} = x^{5/6}`, "Product rule: add the fractions."],
      [r`y^{6 \cdot 2/3} = y^4`, "Power of a power: multiply."],
    ]),
    callout("warning", "The exponent fraction is not a multiplier", r`$8^{1/3}$ is $2$, not $\frac{8}{3}$. And $25^{-1/2} = \frac{1}{5}$, not $-5$.`),
    callout("application", "Where this shows up", r`Kepler's third law relates a planet's orbital period to its distance by $T \propto a^{3/2}$, and animal metabolic rate scales roughly as mass to the $\frac{3}{4}$ power. Musical pitches step by a factor of $2^{1/12}$ per semitone.`),
  ],
  questions: [
    num(1, r`Evaluate $49^{1/2}$.`, 7, {}, ["Square root of 49."], r`$\sqrt{49} = 7$.`),
    num(1, r`Evaluate $125^{1/3}$.`, 5, {}, ["Cube root."], r`$5^3 = 125$, so 5.`),
    num(2, r`Evaluate $8^{2/3}$.`, 4, {}, ["Cube root first, then square."], r`$(\sqrt[3]{8})^2 = 2^2 = 4$.`),
    num(2, r`Evaluate $81^{3/4}$.`, 27, {}, ["Fourth root of 81 is 3."], r`$3^3 = 27$.`),
    num(2, r`Evaluate $32^{-2/5}$. Enter a fraction or decimal.`, 0.25, {}, [r`Fifth root of 32 is 2.`, "Then square and take the reciprocal."], r`$\frac{1}{(\sqrt[5]{32})^2} = \frac{1}{4}$.`),
    mc(2, r`Which is $\sqrt[4]{x^3}$ in exponent form?`, [r`$x^{4/3}$`, r`$x^{3/4}$`, r`$x^{12}$`, r`$x^{-3/4}$`], 1, ["Root index goes in the denominator."], r`$x^{3/4}$.`),
    short(3, r`Simplify $a^{2/3} \cdot a^{1/6}$. Use the format a^(m/n).`, ["a^(5/6)", "a^5/6"], [r`$\frac{2}{3} = \frac{4}{6}$.`], r`$a^{4/6 + 1/6} = a^{5/6}$.`, "review"),
    num(3, r`Evaluate $(-27)^{1/3} + 16^{1/4}$.`, -1, {}, ["Odd roots of negatives are real.", r`$\sqrt[3]{-27} = -3$.`], r`$-3 + 2 = -1$.`, "review"),
  ],
});
