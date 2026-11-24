import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "lagrange-error-bound",
  title: "Lagrange error bound",
  summary: "Bound the error of a Taylor polynomial approximation using an upper bound M on the next derivative: |Rₙ| ≤ M|x − a|ⁿ⁺¹/(n + 1)!.",
  minutes: 30,
  objectives: [
    "State the Lagrange error bound.",
    "Find a valid M = max |f⁽ⁿ⁺¹⁾| between the center and x.",
    "Choose the degree needed for a desired accuracy.",
  ],
  concepts: [
    { slug: "taylor-series", name: "Taylor polynomials and series", description: "Polynomials and series built from a function's derivatives at a point, used to approximate it.", subject: "subj_math" },
  ],
  formulas: ["series-error-bounds"],
  blocks: [
    def("Lagrange error bound", r`If $|f^{(n+1)}(t)| \le M$ for all $t$ between $a$ and $x$, then $|f(x) - P_n(x)| \le \frac{M}{(n + 1)!}|x - a|^{n+1}$.`),
    example(r`Bound the error of $P_2(0.5)$ for $e^x$ about 0`, [
      [r`f'''(t) = e^t \le e^{0.5} \text{ on } [0, 0.5]`, "Use M = e^0.5 < 2."],
      [r`|R_2| \le \frac{2}{3!}(0.5)^3 = \frac{1}{24} \approx 0.042`, "Actual error ≈ 0.024."],
    ]),
    example(r`What degree makes $P_n(1)$ for $e^x$ accurate to 0.001?`, [
      [r`M \le e < 3 \text{ on } [0, 1]`, ""],
      [r`\frac{3}{(n + 1)!} < 0.001 \Rightarrow (n + 1)! > 3000`, ""],
      [r`7! = 5040 \Rightarrow n = 6`, ""],
    ]),
    activity("taylor", { title: "Error at x = 1", params: { fn: "exp", n: 6, x: 1 } }),
    callout("tip", "For sine and cosine", r`Every derivative of $\sin x$ or $\cos x$ is at most 1 in size, so $M = 1$ always works.`),
    callout("application", "Where this shows up", r`Numerical libraries choose how many series terms to use with bounds like this, guaranteeing results to the last displayed digit.`),
  ],
  questions: [
    num(2, r`$P_3(x) = x - \frac{x^3}{6}$ for $\sin x$. Bound the error at $x = 0.2$ with the Lagrange bound for $n = 3$ and $M = 1$. Give the bound to six decimal places.`, 0.000067, { tolerance: 0.000001 }, [], r`$\frac{(0.2)^4}{24} \approx 0.0000667$. (Since the $x^4$ coefficient is 0, a sharper bound $\frac{(0.2)^5}{120}$ also holds.)`),
    mc(2, r`$|f^{(4)}(t)| \le 12$ on $[1, 1.5]$. The error bound for $P_3(1.5)$ about 1 is…`, [r`$\frac{12}{24}(0.5)^4$`, r`$\frac{12}{6}(0.5)^3$`, r`$12(0.5)^4$`, r`$\frac{12}{24}(1.5)^4$`], 0, [], r`$\frac{M}{4!}|x - a|^4$.`),
    num(2, r`Using $M = 3$, what is the smallest $n$ with $\frac{3}{(n + 1)!} < 0.01$?`, 5, {}, [], r`$(n + 1)! > 300$: $6! = 720$.`),
    mc(3, r`Why use $M = e^{0.5}$ rather than $M = e^0 = 1$ when bounding $e^x$ on $[0, 0.5]$?`, ["M must be at least the maximum on the interval", "M must be the minimum", "Either works", "Because e > 1"], 0, [], r`The bound must hold for every $t$ in the interval.`, "review"),
  ],
});
