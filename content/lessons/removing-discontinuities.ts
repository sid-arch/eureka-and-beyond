import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "removing-discontinuities",
  title: "Removing discontinuities",
  summary: "Recognize removable discontinuities, where the limit exists but the function is undefined or has the wrong value, and redefine the function at one point to make it continuous.",
  minutes: 20,
  objectives: [
    "Identify a removable discontinuity by checking that the limit exists.",
    "Redefine a function at a point to remove a discontinuity.",
    "Explain why jump and infinite discontinuities can't be removed.",
  ],
  concepts: [
    { slug: "continuity", name: "Continuity", description: "A function is continuous at c when its limit at c exists and equals f(c).", subject: "subj_math" },
  ],
  blocks: [
    def("Removable discontinuity", r`A discontinuity at $c$ is removable if $\lim_{x \to c} f(x)$ exists. Defining (or redefining) $f(c)$ to equal that limit makes $f$ continuous at $c$.`),
    example(r`Remove the discontinuity of $g(x) = \dfrac{x^2 - 9}{x - 3}$`, [
      [r`\lim_{x \to 3} g(x) = \lim_{x \to 3} (x + 3) = 6`, ""],
      [r`\text{define } g(3) = 6`, "Now g equals x + 3 everywhere."],
    ]),
    example(r`$f(x) = \dfrac{\sin x}{x}$ is undefined at 0`, [
      [r`\lim_{x \to 0} \frac{\sin x}{x} = 1`, ""],
      [r`\text{define } f(0) = 1`, "The extended function is continuous everywhere."],
    ]),
    callout("warning", "Not every discontinuity is removable", r`At a jump the one-sided limits differ, and at a vertical asymptote the function is unbounded. No single value fixes either one.`),
    callout("application", "Where this shows up", r`The function $\frac{\sin x}{x}$, extended with value 1 at 0, is the "sinc" function used in signal processing.`),
  ],
  questions: [
    num(1, r`What value should $h(5)$ have so $h(x) = \dfrac{x^2 - 25}{x - 5}$ is continuous at 5?`, 10, {}, [], r`$x + 5 \to 10$.`),
    num(2, r`What value makes $f(x) = \dfrac{\sqrt{x + 4} - 2}{x}$ continuous at 0? Give a decimal.`, 0.25, { tolerance: 0.001 }, [r`Rationalize.`], r`$\frac{1}{\sqrt{x + 4} + 2} \to \frac{1}{4}$.`),
    mc(2, r`Which discontinuity is removable?`, [r`$\frac{1}{x}$ at 0`, r`$\frac{x^2 - x}{x}$ at 0`, r`$\frac{|x|}{x}$ at 0`, r`$\tan x$ at $\frac{\pi}{2}$`], 1, [], r`$\frac{x^2 - x}{x} = x - 1$ for $x \ne 0$; the limit is −1.`),
    mc(3, r`$\lim_{x \to 2^-} f(x) = 1$, $\lim_{x \to 2^+} f(x) = 5$. Can redefining $f(2)$ make $f$ continuous at 2?`, ["Yes, set f(2) = 3", "Yes, set f(2) = 1", "No: the two-sided limit doesn't exist", "Yes, set f(2) = 5"], 2, [], r`A jump can't be removed.`, "review"),
  ],
});
