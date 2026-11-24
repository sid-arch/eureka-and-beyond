import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "radius-interval-convergence",
  title: "Radius and interval of convergence of power series",
  summary: "Find where a power series converges: the radius from the ratio test, then the interval by testing each endpoint separately.",
  minutes: 30,
  objectives: [
    "Apply the ratio test to Σ cₙ(x − a)ⁿ to find the radius R.",
    "Test the endpoints separately.",
    "Write the interval of convergence.",
  ],
  concepts: [
    { slug: "taylor-series", name: "Taylor polynomials and series", description: "Polynomials and series built from a function's derivatives at a point, used to approximate it.", subject: "subj_math" },
  ],
  blocks: [
    def("Power series", r`$\sum_{n=0}^{\infty} c_n(x - a)^n$ converges for $|x - a| < R$ and diverges for $|x - a| > R$, where $R$ (possibly 0 or $\infty$) is the radius of convergence. The endpoints must be checked one by one.`),
    example(r`$\sum_{n=1}^{\infty} \dfrac{(x - 3)^n}{n}$`, [
      [r`\left|\frac{(x - 3)^{n+1}}{n + 1}\cdot\frac{n}{(x - 3)^n}\right| \to |x - 3|`, "Ratio test."],
      [r`|x - 3| < 1 \Rightarrow R = 1`, ""],
      [r`x = 4: \sum \tfrac{1}{n} \text{ diverges};\ x = 2: \sum \tfrac{(-1)^n}{n} \text{ converges}`, "Check endpoints."],
      [r`\text{interval } [2, 4)`, ""],
    ]),
    activity("taylor", { title: "Inside and outside the interval", params: { fn: "ln", n: 8, x: 0.8 } }),
    callout("tip", "Try this", r`For $\ln(1 + x)$, raise the degree with $x = 0.8$ (inside the interval): the error shrinks. Move to $x = 1.5$ (outside) and the polynomials get worse.`, "experiment"),
    callout("application", "Where this shows up", r`Software that evaluates $\ln x$ first shifts the input into a range where its series converges fast, because outside the radius the series is useless.`),
  ],
  questions: [
    num(1, r`Find the radius of convergence of $\sum \frac{x^n}{2^n}$.`, 2, {}, [], r`$\left|\frac{x}{2}\right| < 1$.`),
    mc(2, r`The interval of convergence of $\sum \frac{x^n}{n^2}$ is…`, [r`$(-1, 1)$`, r`$[-1, 1]$`, r`$[-1, 1)$`, r`$(-1, 1]$`], 1, [], r`$R = 1$; at both endpoints $\sum \frac{(\pm 1)^n}{n^2}$ converges absolutely.`),
    mc(2, r`The radius of convergence of $\sum \frac{x^n}{n!}$ is…`, ["0", "1", "e", "∞"], 3, [], r`Ratio $\frac{|x|}{n + 1} \to 0$ for every $x$.`),
    mc(3, r`$\sum n!\,x^n$ converges…`, ["for all x", "only at x = 0", "for |x| < 1", "for |x| < e"], 1, [], r`Ratio $(n + 1)|x| \to \infty$ unless $x = 0$.`, "review"),
  ],
});
