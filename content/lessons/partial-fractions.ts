import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "partial-fractions",
  title: "Using linear partial fractions",
  summary: "Integrate rational functions whose denominators factor into distinct linear factors by splitting them into simpler fractions.",
  minutes: 30,
  objectives: [
    "Decompose A/((x − a)(x − b)) into A₁/(x − a) + A₂/(x − b).",
    "Find the constants by substitution (cover-up) or matching coefficients.",
    "Integrate each piece as a logarithm.",
  ],
  concepts: [
    { slug: "antiderivatives", name: "Antiderivatives", description: "Functions whose derivative is a given function; written as indefinite integrals.", subject: "subj_math" },
  ],
  blocks: [
    def("Decomposition", r`If the numerator's degree is less than the denominator's and the denominator is $(x - a)(x - b)$ with $a \ne b$: $\frac{px + q}{(x - a)(x - b)} = \frac{A}{x - a} + \frac{B}{x - b}$. Multiply through and substitute $x = a$ and $x = b$ to find $A$ and $B$.`),
    example(r`$\int \dfrac{dx}{(x - 1)(x + 2)}$`, [
      [r`1 = A(x + 2) + B(x - 1)`, ""],
      [r`x = 1: A = \tfrac{1}{3};\ x = -2: B = -\tfrac{1}{3}`, ""],
      [r`\tfrac{1}{3}\ln|x - 1| - \tfrac{1}{3}\ln|x + 2| + C`, ""],
    ]),
    example(r`$\int_0^1 \dfrac{dx}{(x + 1)(x + 2)}$`, [
      [r`\frac{1}{x + 1} - \frac{1}{x + 2}`, ""],
      [r`\left[\ln\frac{x + 1}{x + 2}\right]_0^1 = \ln\tfrac{2}{3} - \ln\tfrac{1}{2} = \ln\tfrac{4}{3}`, r`About 0.288.`],
    ]),
    callout("tip", "Divide first", r`If the numerator's degree is at least the denominator's, do polynomial division before decomposing.`),
    callout("application", "Where this shows up", r`The logistic differential equation is solved with partial fractions, and control engineers decompose transfer functions the same way.`),
  ],
  questions: [
    num(2, r`Evaluate $\int_2^3 \dfrac{dx}{x^2 - 1}$ to four decimal places.`, 0.2027, { tolerance: 0.0005 }, [r`$\frac{1}{x^2 - 1} = \frac{1}{2}\left(\frac{1}{x - 1} - \frac{1}{x + 1}\right)$.`], r`$\frac{1}{2}\left[\ln\frac{x - 1}{x + 1}\right]_2^3 = \frac{1}{2}\ln\frac{3}{2} \approx 0.2027$.`),
    mc(2, r`$\frac{5}{(x + 1)(x - 4)} = \frac{A}{x + 1} + \frac{B}{x - 4}$. Find $A$ and $B$.`, ["A = 1, B = −1", "A = −1, B = 1", "A = 5, B = 5", "A = 1, B = 1"], 1, [], r`$x = -1$: $5 = A(-5)$; $x = 4$: $5 = B(5)$.`),
    num(2, r`Evaluate $\int_0^1 \dfrac{dx}{(x + 1)(x + 2)}$ to four decimal places.`, 0.2877, { tolerance: 0.0005 }, [], r`$\ln\frac{4}{3}$.`),
    mc(3, r`Which needs long division before partial fractions?`, [r`$\frac{1}{x^2 - 9}$`, r`$\frac{x^2}{x^2 - 9}$`, r`$\frac{x}{x^2 - 9}$`, r`$\frac{3}{(x - 1)(x - 2)}$`], 1, [], r`Equal degrees: divide to get $1 + \frac{9}{x^2 - 9}$.`, "review"),
  ],
});
