import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "limits-at-infinity",
  title: "Limits at infinity and horizontal asymptotes",
  summary: "Find limits as x → ±∞ by comparing dominant terms, handle radicals and exponentials, and identify horizontal asymptotes.",
  minutes: 25,
  objectives: [
    "Evaluate limits at infinity of rational functions by dividing by the highest power.",
    "Handle square roots carefully when x → −∞.",
    "Use growth rates of exponential, polynomial and logarithmic functions.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function's outputs approach as the input approaches a given value.", subject: "subj_math" },
  ],
  blocks: [
    def("Horizontal asymptote", r`If $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$, the line $y = L$ is a horizontal asymptote. A function can have different horizontal asymptotes in the two directions.`),
    example(r`$\lim_{x \to \infty} \dfrac{3x^2 - x}{5x^2 + 2}$`, [
      [r`\frac{3 - 1/x}{5 + 2/x^2}`, "Divide by x²."],
      [r`\to \frac{3}{5} = 0.6`, ""],
    ]),
    example(r`$\lim_{x \to -\infty} \dfrac{2x + 1}{\sqrt{x^2 + 3}}$`, [
      [r`\sqrt{x^2} = |x| = -x \text{ for } x < 0`, ""],
      [r`\frac{2x + 1}{-x\sqrt{1 + 3/x^2}}`, "Factor √(x²) = −x out of the root."],
      [r`= \frac{2 + 1/x}{-\sqrt{1 + 3/x^2}} \to -2`, "Divide top and bottom by x."],
      [r`\text{as } x \to +\infty \text{ the limit is } +2`, "Two different horizontal asymptotes."],
    ]),
    def("Growth rates", r`As $x \to \infty$: $\ln x$ grows slower than any positive power of $x$, which grows slower than $e^x$. So $\frac{x^{10}}{e^x} \to 0$ and $\frac{\ln x}{x} \to 0$. Also $e^{-x} \to 0$ and $\arctan x \to \frac{\pi}{2}$.`),
    callout("application", "Where this shows up", r`Long-run behavior: a drug concentration $C(t) = \frac{50t}{t^2 + 4}$ tends to 0, while a learning curve $\frac{100t}{t + 5}$ levels off at 100.`),
  ],
  questions: [
    num(1, r`Find $\lim_{x \to \infty} \dfrac{7x^3 + 1}{2x^3 - x}$.`, 3.5, { tolerance: 0.001 }, [], r`Leading coefficients: $\frac{7}{2}$.`),
    num(2, r`Find $\lim_{x \to \infty} \dfrac{4x + 5}{x^2 + 1}$.`, 0, {}, [], r`Lower degree on top.`),
    num(2, r`Find $\lim_{t \to \infty} \dfrac{100t}{t + 5}$.`, 100, {}, [], r`Divide by $t$: $\frac{100}{1 + 5/t} \to 100$.`),
    mc(2, r`$\lim_{x \to \infty} \dfrac{x^5}{e^x}$ equals…`, ["∞", "1", "0", "5"], 2, [], r`Exponentials outgrow polynomials.`),
    num(3, r`Find $\lim_{x \to -\infty} \dfrac{3x}{\sqrt{4x^2 + 1}}$.`, -1.5, { tolerance: 0.001 }, [r`$\sqrt{4x^2} = 2|x| = -2x$ for $x < 0$.`], r`$\frac{3x}{-2x} = -1.5$.`, "review"),
  ],
});
