import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "average-value",
  title: "Finding the average value of a function on an interval",
  summary: "Compute the average value of a continuous function with an integral, interpret it as the height of an equal-area rectangle, and use the Mean Value Theorem for integrals.",
  minutes: 25,
  objectives: [
    "Compute f_avg = (1/(b − a)) ∫ₐᵇ f(x) dx.",
    "Interpret the average value geometrically and in context.",
    "Find where f equals its average value.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Average value", r`$f_{\text{avg}} = \frac{1}{b - a}\int_a^b f(x)\,dx$. It's the height of the rectangle on $[a, b]$ with the same area as the region under $f$. By the Mean Value Theorem for integrals, a continuous $f$ equals its average value at some $c$ in $[a, b]$.`),
    example(r`$f(x) = x^2$ on $[0, 3]$`, [
      [r`\frac{1}{3}\int_0^3 x^2\,dx = \frac{1}{3}\cdot 9 = 3`, ""],
      [r`c^2 = 3 \Rightarrow c = \sqrt{3} \approx 1.73`, "Where f equals its average."],
    ]),
    example(r`Temperature $T(t) = 60 + 10\sin\frac{\pi t}{12}$ °F over a full day`, [
      [r`\frac{1}{24}\int_0^{24} T\,dt = \frac{1}{24}(1440 + 0) = 60 \ \text{°F}`, "The sine part averages to 0 over a full period."],
    ]),
    callout("warning", "Average value vs average rate of change", r`The average value of $f$ uses an integral. The average rate of change of $f$ is $\frac{f(b) - f(a)}{b - a}$. Note: the average value of $f'$ equals the average rate of change of $f$.`),
    callout("application", "Where this shows up", r`Average daily temperature, average concentration of a drug over a dosing interval, and average power in an AC circuit are all average values.`),
  ],
  questions: [
    num(1, r`Find the average value of $f(x) = 2x$ on $[1, 4]$.`, 5, {}, [], r`$\frac{1}{3}[x^2]_1^4 = \frac{15}{3} = 5$.`),
    num(2, r`Find the average value of $\sin x$ on $[0, \pi]$, to three decimal places.`, 0.637, { tolerance: 0.001 }, [], r`$\frac{1}{\pi}\cdot 2 = \frac{2}{\pi}$.`),
    num(2, r`A car's velocity is $v(t) = 3t^2$ m/s for $0 \le t \le 2$. What is its average velocity, in m/s?`, 4, { unit: "m/s" }, [], r`$\frac{1}{2}\int_0^2 3t^2\,dt = \frac{8}{2} = 4$.`),
    mc(3, r`$\int_2^6 g(x)\,dx = 20$. The average value of $g$ on $[2, 6]$ is…`, ["20", "5", "4", "80"], 1, [], r`$\frac{20}{6 - 2} = 5$.`, "review"),
  ],
});
