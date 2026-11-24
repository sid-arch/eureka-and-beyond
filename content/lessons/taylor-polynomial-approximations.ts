import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "taylor-polynomial-approximations",
  title: "Finding Taylor polynomial approximations of functions",
  summary: "Build Taylor polynomials that match a function's value and derivatives at a center, and use them to approximate function values.",
  minutes: 30,
  objectives: [
    "Compute Pₙ(x) = Σ f⁽ᵏ⁾(a)(x − a)ᵏ/k! up to degree n.",
    "Read Taylor coefficients from given derivative values.",
    "Use Taylor polynomials to approximate values near the center.",
  ],
  concepts: [
    { slug: "taylor-series", name: "Taylor polynomials and series", description: "Polynomials and series built from a function's derivatives at a point, used to approximate it.", subject: "subj_math" },
  ],
  formulas: ["taylor-series"],
  blocks: [
    def("Taylor polynomial", r`The degree-$n$ Taylor polynomial of $f$ about $x = a$ is $P_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k$. It matches $f$ and its first $n$ derivatives at $a$. About $a = 0$ it's called a Maclaurin polynomial.`),
    example(r`$P_2$ for $e^x$ about 0, and $e^{0.5}$`, [
      [r`f(0) = f'(0) = f''(0) = 1`, ""],
      [r`P_2(x) = 1 + x + \tfrac{x^2}{2}`, ""],
      [r`P_2(0.5) = 1.625`, r`Actual $e^{0.5} \approx 1.6487$.`],
    ]),
    example(r`$f(2) = 3$, $f'(2) = -1$, $f''(2) = 4$, $f'''(2) = 6$. Write $P_3$ about 2.`, [
      [r`3 - (x - 2) + \tfrac{4}{2!}(x - 2)^2 + \tfrac{6}{3!}(x - 2)^3`, ""],
      [r`= 3 - (x - 2) + 2(x - 2)^2 + (x - 2)^3`, ""],
    ]),
    activity("taylor", { title: "Raise the degree", params: { fn: "exp", n: 2, x: 0.5 } }),
    callout("tip", "Try this", r`Near $x = 0$ even low degrees match well. Move the evaluation point to 2.5 and watch how many terms you need.`, "experiment"),
    callout("application", "Where this shows up", r`Physics approximations like $\sin\theta \approx \theta$ and $\sqrt{1 + x} \approx 1 + \frac{x}{2}$ are low-degree Taylor polynomials.`),
  ],
  questions: [
    num(1, r`Use $P_3(x) = x - \frac{x^3}{6}$ for $\sin x$ to approximate $\sin 0.2$, to five decimal places.`, 0.19867, { tolerance: 0.00001 }, [], r`$0.2 - \frac{0.008}{6} \approx 0.198667$.`),
    num(2, r`The coefficient of $(x - 1)^2$ in the Taylor polynomial of $f$ about 1 is 5. Find $f''(1)$.`, 10, {}, [], r`$\frac{f''(1)}{2!} = 5$.`),
    mc(2, r`$P_2$ for $\cos x$ about 0 is…`, [r`$1 - x^2$`, r`$1 - \frac{x^2}{2}$`, r`$1 + \frac{x^2}{2}$`, r`$x - \frac{x^2}{2}$`], 1, [], r`$\cos 0 = 1$, $-\sin 0 = 0$, $-\cos 0 = -1$.`),
    num(3, r`Use $P_2$ for $\ln x$ about $x = 1$ to approximate $\ln 1.1$, to four decimal places.`, 0.095, { tolerance: 0.0001 }, [r`$P_2 = (x - 1) - \frac{(x - 1)^2}{2}$.`], r`$0.1 - 0.005 = 0.095$ (actual 0.0953).`, "review"),
  ],
});
