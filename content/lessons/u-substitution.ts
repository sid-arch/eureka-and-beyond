import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "u-substitution",
  title: "Integrating using substitution",
  summary: "Reverse the Chain Rule with u-substitution: choose u, rewrite dx in terms of du, integrate, and change limits for definite integrals.",
  minutes: 30,
  objectives: [
    "Choose u as an inner function whose derivative appears in the integrand.",
    "Rewrite the integral completely in terms of u.",
    "Change the limits of integration for definite integrals.",
  ],
  concepts: [
    { slug: "antiderivatives", name: "Antiderivatives", description: "Functions whose derivative is a given function; written as indefinite integrals.", subject: "subj_math" },
  ],
  formulas: ["chain-rule"],
  blocks: [
    def("Substitution", r`If $u = g(x)$, then $du = g'(x)\,dx$ and $\int f(g(x))\,g'(x)\,dx = \int f(u)\,du$. For a definite integral, the limits become $g(a)$ and $g(b)$.`),
    example(r`$\int 2x(x^2 + 1)^5\,dx$`, [
      [r`u = x^2 + 1,\ du = 2x\,dx`, ""],
      [r`\int u^5\,du = \frac{u^6}{6} + C = \frac{(x^2 + 1)^6}{6} + C`, ""],
    ]),
    example(r`$\int_0^1 x e^{x^2}\,dx$`, [
      [r`u = x^2,\ du = 2x\,dx;\ x: 0 \to 1 \Rightarrow u: 0 \to 1`, ""],
      [r`\tfrac{1}{2}\int_0^1 e^u\,du = \tfrac{1}{2}(e - 1) \approx 0.859`, "Adjust for the missing factor 2."],
    ]),
    callout("warning", "Don't mix variables", r`After substituting, the integral must contain only $u$ and $du$. If an $x$ is left over that you can't express in $u$, try a different $u$.`),
    callout("application", "Where this shows up", r`Many physical rates have a "function of a function" form, like $te^{-t^2}$ in diffusion; substitution undoes the Chain Rule that produced them.`),
    activity("u-substitution", { title: "The same area in x and in u", params: { case: "cos" } }),
    callout("tip", "Try this", r`Move the upper limit and compare the two shaded regions. They look different but always have the same area, as long as the limits are changed too.`, "experiment"),
  ],
  questions: [
    num(2, r`Evaluate $\int_0^{\pi/2} \cos x\,\sin^2 x\,dx$ to three decimal places.`, 0.333, { tolerance: 0.001 }, [r`$u = \sin x$.`], r`$\int_0^1 u^2\,du = \frac{1}{3}$.`),
    num(2, r`Evaluate $\int_0^1 \frac{1}{2x + 1}\,dx$ to three decimal places.`, 0.549, { tolerance: 0.001 }, [r`$u = 2x + 1$.`], r`$\frac{1}{2}\ln 3 \approx 0.549$.`),
    mc(2, r`For $\int \frac{\ln x}{x}\,dx$, the best substitution is…`, [r`$u = x$`, r`$u = \ln x$`, r`$u = \frac{1}{x}$`, r`$u = x\ln x$`], 1, [], r`$du = \frac{1}{x}dx$; the answer is $\frac{(\ln x)^2}{2} + C$.`),
    num(3, r`Evaluate $\int_1^2 x\sqrt{x^2 - 1}\,dx$ to three decimal places.`, 1.732, { tolerance: 0.001 }, [r`$u = x^2 - 1$, from 0 to 3.`], r`$\frac{1}{2}\cdot\frac{2}{3}u^{3/2}\Big|_0^3 = \frac{1}{3}\cdot 3\sqrt{3} = \sqrt{3}$.`, "review"),
  ],
});
