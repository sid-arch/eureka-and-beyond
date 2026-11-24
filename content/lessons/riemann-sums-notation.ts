import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "riemann-sums-notation",
  title: "Riemann sums, summation notation and definite integral notation",
  summary: "Write Riemann sums in sigma notation, define the definite integral as their limit, and translate between limits of sums and integrals.",
  minutes: 30,
  objectives: [
    "Write a right Riemann sum with sigma notation.",
    "Define the definite integral as the limit of Riemann sums.",
    "Convert a limit of a sum into a definite integral, and back.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  formulas: ["riemann-sum"],
  blocks: [
    def("Right Riemann sum", r`With $n$ equal subintervals of $[a, b]$, $\Delta x = \frac{b - a}{n}$ and $x_i = a + i\Delta x$, the right sum is $\sum_{i=1}^{n} f(x_i)\Delta x$.`),
    def("Definite integral", r`$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i)\Delta x$, when the limit exists. $f$ is the integrand; $a$ and $b$ are the limits of integration.`),
    example(r`Write $\lim_{n \to \infty} \sum_{i=1}^{n} \left(1 + \frac{2i}{n}\right)^2 \frac{2}{n}$ as an integral`, [
      [r`\Delta x = \tfrac{2}{n},\ x_i = 1 + \tfrac{2i}{n}`, r`So $a = 1$ and $b - a = 2$.`],
      [r`\int_1^3 x^2\,dx`, ""],
    ]),
    example(r`$R_4$ for $f(x) = x^2$ on $[0, 2]$`, [
      [r`\Delta x = 0.5;\ x_i = 0.5, 1, 1.5, 2`, ""],
      [r`0.5(0.25 + 1 + 2.25 + 4) = 3.75`, r`The exact value $\int_0^2 x^2\,dx = \frac{8}{3} \approx 2.67$.`],
    ]),
    activity("riemann-sum", { title: "From sums to the integral", params: { fn: "x^2" } }),
    callout("application", "Where this shows up", r`Computers approximate integrals with sums like these (often the trapezoid rule) whenever no formula for an antiderivative exists.`),
  ],
  questions: [
    num(1, r`Find $L_4$ (left sum) for $f(x) = x^2$ on $[0, 2]$.`, 1.75, { tolerance: 0.001 }, [r`Left endpoints 0, 0.5, 1, 1.5.`], r`$0.5(0 + 0.25 + 1 + 2.25) = 1.75$.`),
    mc(2, r`$\lim_{n \to \infty} \sum_{i=1}^{n} \sqrt{\frac{3i}{n}}\cdot\frac{3}{n}$ equals…`, [r`$\int_0^1 \sqrt{x}\,dx$`, r`$\int_0^3 \sqrt{x}\,dx$`, r`$\int_0^3 \sqrt{3x}\,dx$`, r`$\int_1^4 \sqrt{x}\,dx$`], 1, [], r`$\Delta x = \frac{3}{n}$, $x_i = \frac{3i}{n}$, starting at 0.`),
    mc(2, r`For an increasing function, a right Riemann sum is…`, ["an underestimate", "an overestimate", "exact", "always zero"], 1, [], r`Right endpoints are the highest points of each strip.`),
    num(3, r`Evaluate $\sum_{i=1}^{4} (2i + 1)$.`, 24, {}, [], r`$3 + 5 + 7 + 9 = 24$.`, "review"),
  ],
});
