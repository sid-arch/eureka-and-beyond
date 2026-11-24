import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ftc-definite-integrals",
  title: "The Fundamental Theorem of Calculus and definite integrals",
  summary: "Evaluate definite integrals with antiderivatives using FTC part 2, and interpret the result as net change.",
  minutes: 30,
  objectives: [
    "Evaluate ∫ₐᵇ f(x) dx = F(b) − F(a) for an antiderivative F.",
    "Use the net change theorem: ∫ₐᵇ F′(x) dx = F(b) − F(a).",
    "Find a function value from a starting value and an integral of its rate.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  formulas: ["ftc"],
  blocks: [
    def("FTC, part 2", r`If $f$ is continuous on $[a, b]$ and $F' = f$, then $\int_a^b f(x)\,dx = F(b) - F(a)$, written $\Big[F(x)\Big]_a^b$.`),
    example(r`$\int_1^3 x^2\,dx$`, [
      [r`\left[\tfrac{x^3}{3}\right]_1^3 = 9 - \tfrac{1}{3}`, ""],
      [r`= \tfrac{26}{3} \approx 8.667`, ""],
    ]),
    example(r`$\int_0^{\pi} \sin x\,dx$`, [
      [r`\Big[-\cos x\Big]_0^{\pi} = 1 - (-1) = 2`, ""],
    ]),
    example(r`A tank has 50 L at $t = 0$ and fills at $r(t) = 6t$ L/min. How much is in it at $t = 3$?`, [
      [r`50 + \int_0^3 6t\,dt = 50 + \Big[3t^2\Big]_0^3`, "Start value plus net change."],
      [r`= 50 + 27 = 77 \text{ L}`, ""],
    ]),
    callout("application", "Where this shows up", r`Every physical "total from a rate" calculation, from distance traveled to drug absorbed, uses FTC part 2 to replace a limit of sums with two function values.`),
  ],
  questions: [
    num(1, r`Evaluate $\int_0^2 (3x^2 - 2x)\,dx$.`, 4, {}, [], r`$[x^3 - x^2]_0^2 = 8 - 4 = 4$.`),
    num(1, r`Evaluate $\int_1^e \frac{1}{x}\,dx$.`, 1, {}, [], r`$\ln e - \ln 1 = 1$.`),
    num(2, r`Evaluate $\int_0^{1} e^x\,dx$ to three decimal places.`, 1.718, { tolerance: 0.001 }, [], r`$e - 1$.`),
    num(2, r`$f(2) = 5$ and $f'(x) = 4x$. Find $f(4)$.`, 29, {}, [], r`$5 + \int_2^4 4x\,dx = 5 + [2x^2]_2^4 = 5 + 24 = 29$.`),
    mc(3, r`$\int_0^{2\pi} \sin x\,dx = 0$. What does this mean?`, ["The area between sin x and the axis is 0", "The areas above and below the axis are equal, so the net signed area is 0", "sin x = 0 on [0, 2π]", "The integral doesn't exist"], 1, [], r`Signed area cancels.`, "review"),
  ],
});
