import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "power-series-representations",
  title: "Representing functions as power series",
  summary: "Differentiate and integrate power series term by term to represent functions such as ln(1 + x) and arctan x, keeping track of the interval of convergence.",
  minutes: 30,
  objectives: [
    "Differentiate and integrate power series term by term.",
    "Derive series for ln(1 + x) and arctan x from geometric series.",
    "Use series to evaluate integrals and limits.",
  ],
  concepts: [
    { slug: "taylor-series", name: "Taylor polynomials and series", description: "Polynomials and series built from a function's derivatives at a point, used to approximate it.", subject: "subj_math" },
  ],
  blocks: [
    def("Term-by-term calculus", r`Inside its interval of convergence, a power series can be differentiated and integrated term by term; the radius stays the same (endpoints may change).`),
    example(r`$\ln(1 + x)$ from a geometric series`, [
      [r`\frac{1}{1 + x} = 1 - x + x^2 - x^3 + \cdots,\ |x| < 1`, ""],
      [r`\ln(1 + x) = x - \tfrac{x^2}{2} + \tfrac{x^3}{3} - \cdots`, "Integrate term by term; the constant is 0."],
    ]),
    example(r`$\arctan x$`, [
      [r`\frac{1}{1 + x^2} = 1 - x^2 + x^4 - \cdots`, ""],
      [r`\arctan x = x - \tfrac{x^3}{3} + \tfrac{x^5}{5} - \cdots`, r`At $x = 1$: $\frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \cdots$.`],
    ]),
    example(r`A limit with series: $\lim_{x \to 0} \dfrac{e^x - 1 - x}{x^2}$`, [
      [r`\frac{\tfrac{x^2}{2} + \tfrac{x^3}{6} + \cdots}{x^2} \to \tfrac{1}{2}`, ""],
    ]),
    activity("taylor", { title: "ln(1 + x) inside its interval", params: { fn: "ln", n: 5, x: 0.5 } }),
    callout("application", "Where this shows up", r`Series for arctan are how mathematicians computed π to millions of digits; Machin's formula combines two of them.`),
  ],
  questions: [
    mc(1, r`Differentiating $\frac{1}{1 - x} = \sum x^n$ gives a series for…`, [r`$\frac{1}{(1 - x)^2}$`, r`$\ln(1 - x)$`, r`$\frac{-1}{(1 - x)^2}$`, r`$\frac{x}{1 - x}$`], 0, [], r`$\sum nx^{n-1} = \frac{1}{(1 - x)^2}$.`),
    num(2, r`Use three terms of the series for $\arctan x$ to approximate $\arctan 0.5$, to four decimal places.`, 0.4646, { tolerance: 0.0002 }, [], r`$0.5 - \frac{0.125}{3} + \frac{0.03125}{5} \approx 0.4646$ (actual 0.4636).`),
    num(2, r`Find $\lim_{x \to 0} \dfrac{\sin x - x}{x^3}$, to four decimal places.`, -0.1667, { tolerance: 0.0002 }, [], r`$\frac{-x^3/6 + \cdots}{x^3} \to -\frac{1}{6}$.`),
    num(3, r`Using $\int_0^{0.5} \frac{dx}{1 + x^2}$ with the first two terms of the integrated series, estimate the integral to four decimal places.`, 0.4583, { tolerance: 0.0002 }, [], r`$0.5 - \frac{0.125}{3} \approx 0.4583$.`, "review"),
  ],
});
