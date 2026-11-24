import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "integration-division-completing-square",
  title: "Integrating functions using long division and completing the square",
  summary: "Rewrite rational integrands with polynomial division, and complete the square to reach the arctangent form ∫ du/(u² + a²).",
  minutes: 30,
  objectives: [
    "Use long division when the numerator's degree is at least the denominator's.",
    "Complete the square in a quadratic denominator.",
    "Use ∫ du/(u² + a²) = (1/a) arctan(u/a) + C.",
  ],
  concepts: [
    { slug: "antiderivatives", name: "Antiderivatives", description: "Functions whose derivative is a given function; written as indefinite integrals.", subject: "subj_math" },
  ],
  formulas: ["inverse-derivatives"],
  blocks: [
    example(r`$\int \dfrac{x^2 + 1}{x + 1}\,dx$`, [
      [r`\frac{x^2 + 1}{x + 1} = x - 1 + \frac{2}{x + 1}`, "Divide first."],
      [r`= \tfrac{x^2}{2} - x + 2\ln|x + 1| + C`, ""],
    ]),
    def("Arctangent form", r`$\int \frac{du}{u^2 + a^2} = \frac{1}{a}\arctan\frac{u}{a} + C$, from $(\arctan x)' = \frac{1}{1 + x^2}$.`),
    example(r`$\int \dfrac{dx}{x^2 + 4x + 5}$`, [
      [r`x^2 + 4x + 5 = (x + 2)^2 + 1`, "Complete the square."],
      [r`= \arctan(x + 2) + C`, "u = x + 2, a = 1."],
    ]),
    callout("tip", "Which tool?", r`If the numerator's degree ≥ the denominator's, divide. If the denominator is an irreducible quadratic and the numerator is constant, complete the square for arctan. If the numerator is (a multiple of) the denominator's derivative, substitute to get a logarithm.`),
    callout("application", "Where this shows up", r`Integrals of $\frac{1}{x^2 + a^2}$ appear in electric field calculations for a wide charged sheet and in probability (the Cauchy distribution).`),
  ],
  questions: [
    num(2, r`Evaluate $\int_{-2}^{-1} \dfrac{dx}{x^2 + 4x + 5}$ to three decimal places.`, 0.785, { tolerance: 0.001 }, [], r`$\arctan(1) - \arctan(0) = \frac{\pi}{4}$.`),
    num(2, r`Evaluate $\int_0^2 \dfrac{dx}{x^2 + 4}$ to three decimal places.`, 0.393, { tolerance: 0.001 }, [], r`$\frac{1}{2}\arctan\frac{x}{2}\Big|_0^2 = \frac{1}{2}\cdot\frac{\pi}{4} = \frac{\pi}{8}$.`),
    mc(2, r`$\dfrac{x^2}{x - 1}$ divides as…`, [r`$x + 1 + \frac{1}{x - 1}$`, r`$x - 1 + \frac{1}{x - 1}$`, r`$x + \frac{1}{x - 1}$`, r`$x + 1$`], 0, [], r`$(x - 1)(x + 1) = x^2 - 1$, remainder 1.`),
    mc(3, r`Which method fits $\int \frac{2x + 4}{x^2 + 4x + 5}\,dx$?`, ["Completing the square for arctan", "u = x² + 4x + 5, giving ln(x² + 4x + 5) + C", "Long division", "Power rule"], 1, [], r`The numerator is exactly the derivative of the denominator.`, "review"),
  ],
});
