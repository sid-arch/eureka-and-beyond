import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "definite-integral-properties",
  title: "Applying properties of definite integrals",
  summary: "Use linearity, additivity over adjacent intervals, reversed limits and geometric areas to evaluate and combine definite integrals.",
  minutes: 25,
  objectives: [
    "Apply constant multiple and sum properties of integrals.",
    "Split and combine integrals over adjacent intervals; reverse limits.",
    "Evaluate integrals of piecewise or absolute value functions with geometry.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Properties", r`$\int_a^b [kf(x) \pm g(x)]\,dx = k\int_a^b f\,dx \pm \int_a^b g\,dx$; $\int_a^c f = \int_a^b f + \int_b^c f$; $\int_b^a f = -\int_a^b f$; $\int_a^a f = 0$.`),
    example(r`$\int_0^5 f(x)\,dx = 8$ and $\int_0^2 f(x)\,dx = 3$`, [
      [r`\int_2^5 f = 8 - 3 = 5`, "Additivity."],
      [r`\int_5^2 f = -5`, "Reversed limits."],
      [r`\int_0^5 [2f(x) + 1]\,dx = 16 + 5 = 21`, r`$\int_0^5 1\,dx = 5$.`],
    ]),
    example(r`$\int_{-2}^{3} |x|\,dx$`, [
      [r`\tfrac{1}{2}(2)(2) + \tfrac{1}{2}(3)(3) = 2 + 4.5 = 6.5`, "Two triangles."],
    ]),
    callout("warning", "No product rule for integrals", r`$\int fg \ne \int f \cdot \int g$. Linearity covers sums and constant multiples only.`),
    callout("application", "Where this shows up", r`Total energy used over a day is the sum of the integrals over each hour, which is additivity in action.`),
  ],
  questions: [
    num(1, r`If $\int_1^4 g(x)\,dx = 6$, find $\int_1^4 3g(x)\,dx$.`, 18, {}, [], r`$3 \cdot 6$.`),
    num(2, r`$\int_0^{10} f = 12$ and $\int_6^{10} f = 4$. Find $\int_0^6 f$.`, 8, {}, [], r`$12 - 4$.`),
    num(2, r`Find $\int_{-1}^{1} (x^3 + 2)\,dx$.`, 4, {}, [r`$x^3$ is odd.`], r`$\int x^3 = 0$ on a symmetric interval; $\int 2 = 4$.`),
    mc(3, r`If $\int_2^7 f(x)\,dx = -3$, then $\int_7^2 [f(x) - 1]\,dx$ is…`, ["−8", "2", "8", "−2"], 2, [], r`$\int_7^2 f = 3$ and $\int_7^2 1\,dx = -5$; $3 - (-5) = 8$.`, "review"),
  ],
});
