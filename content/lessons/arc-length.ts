import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "arc-length",
  title: "The arc length of a smooth, planar curve and distance traveled",
  summary: "Find the length of a curve y = f(x) with L = ∫√(1 + f′(x)²) dx, and relate arc length to distance traveled along a path.",
  minutes: 30,
  objectives: [
    "Derive the arc length formula from the Pythagorean theorem on tiny segments.",
    "Set up and evaluate arc length integrals.",
    "Use technology for integrals without elementary antiderivatives.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Arc length", r`A tiny piece of curve has length $\sqrt{dx^2 + dy^2} = \sqrt{1 + \left(\frac{dy}{dx}\right)^2}\,dx$. So for a smooth $f$ on $[a, b]$: $L = \int_a^b \sqrt{1 + [f'(x)]^2}\,dx$.`),
    example(r`$y = \tfrac{2}{3}x^{3/2}$ on $[0, 3]$`, [
      [r`y' = \sqrt{x},\ 1 + (y')^2 = 1 + x`, ""],
      [r`L = \int_0^3 \sqrt{1 + x}\,dx = \tfrac{2}{3}\left[(1 + x)^{3/2}\right]_0^3`, ""],
      [r`= \tfrac{2}{3}(8 - 1) = \tfrac{14}{3} \approx 4.667`, ""],
    ]),
    callout("tip", "Use a calculator when needed", r`Most arc length integrals, like that of $y = x^2$, have no simple antiderivative. On the AP exam they're evaluated with a calculator.`),
    callout("application", "Where this shows up", r`The length of cable for a hanging bridge, of a curved road, or of a pipe bent along a curve is an arc length integral.`),
  ],
  questions: [
    num(1, r`Find the length of $y = 2x + 1$ on $[0, 3]$, to three decimal places.`, 6.708, { tolerance: 0.002 }, [], r`$\int_0^3 \sqrt{5}\,dx = 3\sqrt{5}$.`),
    num(2, r`Find the length of $y = x^{3/2}$ on $[0, 4]$, to three decimal places.`, 9.073, { tolerance: 0.002 }, [r`$1 + (y')^2 = 1 + \frac{9}{4}x$.`], r`$\frac{8}{27}\left[(1 + \frac{9}{4}x)^{3/2}\right]_0^4 = \frac{8}{27}(10\sqrt{10} - 1) \approx 9.073$.`),
    mc(2, r`Which integral gives the length of $y = \sin x$ on $[0, \pi]$?`, [r`$\int_0^\pi \sqrt{1 + \sin^2 x}\,dx$`, r`$\int_0^\pi \sqrt{1 + \cos^2 x}\,dx$`, r`$\int_0^\pi (1 + \cos x)\,dx$`, r`$\int_0^\pi \sqrt{\sin x}\,dx$`], 1, [], r`$f'(x) = \cos x$.`),
    num(3, r`Use a calculator: the length of $y = x^2$ on $[0, 1]$, to three decimal places.`, 1.479, { tolerance: 0.002 }, [], r`$\int_0^1 \sqrt{1 + 4x^2}\,dx \approx 1.479$.`, "review"),
  ],
});
