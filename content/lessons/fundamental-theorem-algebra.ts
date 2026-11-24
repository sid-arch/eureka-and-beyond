import { activity, callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "fundamental-theorem-algebra",
  title: "The Fundamental Theorem of Algebra",
  summary: "Use the Fundamental Theorem of Algebra and the Conjugate Root Theorem to count zeros, find all complex zeros, and write polynomials from given zeros.",
  minutes: 30,
  objectives: [
    "State that a degree-n polynomial has exactly n complex zeros counting multiplicity.",
    "Apply the Complex Conjugate Root Theorem.",
    "Write a polynomial with real coefficients from given real and complex zeros.",
  ],
  concepts: [
    { slug: "polynomial-functions", name: "Polynomial functions", description: "Functions built from sums of powers of x with whole-number exponents.", subject: "subj_math" },
    { slug: "complex-numbers", name: "Complex numbers", description: "Numbers a + bi with real a and b, where i² = −1.", subject: "subj_math" },
  ],
  formulas: ["complex-numbers"],
  blocks: [
    def("Fundamental Theorem of Algebra", r`Every polynomial of degree $n \ge 1$ with complex coefficients has at least one complex zero. As a consequence it has exactly $n$ zeros, counting multiplicity, and factors completely into linear factors over the complex numbers.`),
    def("Conjugate Root Theorem", r`If a polynomial has real coefficients and $a + bi$ is a zero, then $a - bi$ is also a zero. Complex zeros come in pairs, so an odd-degree real polynomial has at least one real zero.`),
    example(r`Write a cubic with real coefficients and zeros 2 and $1 + 3i$`, [
      [r`\text{zeros: } 2,\ 1 + 3i,\ 1 - 3i`, "Include the conjugate."],
      [r`(x - (1 + 3i))(x - (1 - 3i)) = (x - 1)^2 + 9 = x^2 - 2x + 10`, ""],
      [r`(x - 2)(x^2 - 2x + 10) = x^3 - 4x^2 + 14x - 20`, ""],
    ]),
    activity("polynomial-zeros", { title: "Real zeros you can see", params: { a: 0.2, r1: -2, m1: 1, r2: 1, m2: 1, r3: 3, m3: 1 } }),
    callout("tip", "Try this", r`A cubic with three real zeros crosses the axis three times. If two of its zeros were complex, the graph would cross only once. You can't place complex zeros on this real graph, which is exactly why they're "invisible" on it.`, "experiment"),
    callout("application", "Where this shows up", r`Control engineers find the zeros (poles) of characteristic polynomials to check whether a system is stable; complex pairs mean oscillation.`),
  ],
  questions: [
    num(1, r`How many complex zeros, counting multiplicity, does $x^7 - 3x + 1$ have?`, 7, {}, [], r`Degree 7: seven zeros.`),
    mc(2, r`A real polynomial has zeros $4$ and $2 - i$. Which must also be a zero?`, [r`$-4$`, r`$2 + i$`, r`$-2 + i$`, r`$i$`], 1, [], r`The conjugate $2 + i$.`),
    short(2, r`Write the quadratic with real coefficients and zero $3i$, leading coefficient 1.`, ["x^2+9"], [], r`$(x - 3i)(x + 3i) = x^2 + 9$.`),
    mc(3, r`Can a real cubic have exactly two real zeros (counted without multiplicity) and one non-real zero?`, ["Yes", "No, non-real zeros come in conjugate pairs", "Only if it has a double zero", "Only if the leading coefficient is negative"], 1, [], r`One non-real zero would force its conjugate, making 4 zeros: impossible for degree 3.`, "review"),
  ],
});
