import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "finding-polynomial-zeros",
  title: "Finding zeros of polynomials",
  summary: "Use the Rational Root Theorem to list candidates, test them, reduce the polynomial, and finish with factoring or the quadratic formula.",
  minutes: 30,
  objectives: [
    "List possible rational zeros with the Rational Root Theorem.",
    "Find all zeros, real and complex, by testing, dividing and solving the remaining quadratic.",
    "Use graphs to choose which candidates to test.",
  ],
  concepts: [
    { slug: "polynomial-functions", name: "Polynomial functions", description: "Functions built from sums of powers of x with whole-number exponents.", subject: "subj_math" },
  ],
  formulas: ["quadratic-formula"],
  blocks: [
    def("Rational Root Theorem", r`If $P(x)$ has integer coefficients, every rational zero has the form $\frac{p}{q}$, where $p$ divides the constant term and $q$ divides the leading coefficient.`),
    example(r`Find all zeros of $P(x) = 2x^3 - 3x^2 - 8x - 3$`, [
      [r`\pm 1, \pm 3, \pm \tfrac{1}{2}, \pm \tfrac{3}{2}`, "p divides 3, q divides 2."],
      [r`P(3) = 54 - 27 - 24 - 3 = 0`, "3 is a zero."],
      [r`P(x) = (x - 3)(2x^2 + 3x + 1) = (x - 3)(2x + 1)(x + 1)`, "Divide, then factor."],
      [r`x = 3,\ -\tfrac{1}{2},\ -1`, ""],
    ]),
    example(r`Find all zeros of $x^3 - x^2 + 4x - 4$`, [
      [r`x^2(x - 1) + 4(x - 1) = (x - 1)(x^2 + 4)`, "Grouping works here."],
      [r`x = 1,\ \pm 2i`, "x² = −4 gives complex zeros."],
    ]),
    callout("tip", "Let the graph narrow the list", r`A quick graph shows roughly where the real zeros are, so you test only the nearby candidates.`),
    callout("application", "Where this shows up", r`Solving for when a box reaches a target volume, or when a polynomial cost model breaks even, means finding polynomial zeros. Software uses numerical methods, but exact rational zeros come from these theorems.`),
  ],
  questions: [
    mc(1, r`Which is NOT a possible rational zero of $3x^3 + x - 4$?`, ["1", "4/3", "3", "−1/3"], 2, ["p divides 4, q divides 3."], r`Candidates are $\pm 1, \pm 2, \pm 4, \pm \frac{1}{3}, \pm \frac{2}{3}, \pm \frac{4}{3}$. 3 isn't on the list because 3 doesn't divide 4.`),
    short(2, r`Find all zeros of $x^3 - 7x - 6$, smallest first.`, ["-2,-1,3"], ["Try x = −1."], r`$(x + 1)(x^2 - x - 6) = (x + 1)(x - 3)(x + 2)$: $-2, -1, 3$.`),
    short(2, r`Find all zeros of $x^3 + 9x$. Enter like 0,±3i.`, ["0,±3i", "0,3i,-3i", "-3i,0,3i"], [], r`$x(x^2 + 9)$: $0, \pm 3i$.`),
    short(3, r`Find all real zeros of $2x^3 + x^2 - 13x + 6$, smallest first.`, ["-3,1/2,2"], ["Try x = 2.", "Then 2x² + 5x − 3."], r`$(x - 2)(2x^2 + 5x - 3) = (x - 2)(2x - 1)(x + 3)$: $-3, \frac{1}{2}, 2$.`, "review"),
  ],
});
