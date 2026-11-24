import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "improper-integrals",
  title: "Evaluating improper integrals",
  summary: "Evaluate integrals over infinite intervals or with infinite discontinuities as limits, and decide whether they converge or diverge.",
  minutes: 30,
  objectives: [
    "Rewrite an improper integral as a limit of proper integrals.",
    "Evaluate the limit to decide convergence.",
    "Know the p-integral results for ∫₁^∞ 1/xᵖ dx and ∫₀¹ 1/xᵖ dx.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Improper integrals", r`$\int_a^\infty f(x)\,dx = \lim_{b \to \infty}\int_a^b f(x)\,dx$. If $f$ is unbounded at $a$, $\int_a^c f(x)\,dx = \lim_{t \to a^+}\int_t^c f(x)\,dx$. The integral converges if the limit is a finite number; otherwise it diverges.`),
    example(r`$\int_1^\infty \dfrac{dx}{x^2}$`, [
      [r`\lim_{b \to \infty}\left[-\tfrac{1}{x}\right]_1^b = \lim_{b \to \infty}\left(1 - \tfrac{1}{b}\right) = 1`, "Converges."],
    ]),
    example(r`$\int_1^\infty \dfrac{dx}{x}$`, [
      [r`\lim_{b \to \infty} \ln b = \infty`, "Diverges, even though 1/x → 0."],
    ]),
    example(r`$\int_0^1 \dfrac{dx}{\sqrt{x}}$`, [
      [r`\lim_{t \to 0^+}\left[2\sqrt{x}\right]_t^1 = 2`, "Converges despite the vertical asymptote."],
    ]),
    def("p-integrals", r`$\int_1^\infty \frac{dx}{x^p}$ converges exactly when $p > 1$; $\int_0^1 \frac{dx}{x^p}$ converges exactly when $p < 1$.`),
    callout("application", "Where this shows up", r`The escape velocity of a rocket comes from the work $\int_R^\infty \frac{GMm}{x^2}\,dx$, an improper integral that converges.`),
  ],
  questions: [
    num(1, r`Evaluate $\int_1^\infty \dfrac{dx}{x^3}$.`, 0.5, { tolerance: 0.001 }, [], r`$\left[-\frac{1}{2x^2}\right]_1^\infty = \frac{1}{2}$.`),
    num(2, r`Evaluate $\int_0^\infty e^{-x}\,dx$.`, 1, {}, [], r`$\lim (1 - e^{-b}) = 1$.`),
    num(2, r`Evaluate $\int_0^\infty xe^{-x^2}\,dx$.`, 0.5, { tolerance: 0.001 }, [r`$u = x^2$.`], r`$\left[-\frac{1}{2}e^{-x^2}\right]_0^\infty = \frac{1}{2}$.`),
    mc(3, r`Which integral diverges?`, [r`$\int_1^\infty x^{-1.5}\,dx$`, r`$\int_0^1 x^{-0.5}\,dx$`, r`$\int_0^1 x^{-2}\,dx$`, r`$\int_0^\infty e^{-2x}\,dx$`], 2, [], r`$\int_0^1 \frac{dx}{x^p}$ needs $p < 1$.`, "review"),
  ],
});
