import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "lhospitals-rule",
  title: "Using L'Hospital's Rule for determining limits of indeterminate forms",
  summary: "Evaluate 0/0 and ∞/∞ limits by differentiating numerator and denominator separately, check the hypotheses, and apply the rule repeatedly when needed.",
  minutes: 25,
  objectives: [
    "Confirm a limit has the form 0/0 or ∞/∞ before using the rule.",
    "Apply lim f/g = lim f′/g′, repeating if needed.",
    "Avoid misusing the Quotient Rule or applying the rule to non-indeterminate forms.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function's outputs approach as the input approaches a given value.", subject: "subj_math" },
  ],
  blocks: [
    def("L'Hospital's Rule", r`If $\lim f(x)$ and $\lim g(x)$ are both 0, or both $\pm\infty$, and $f$ and $g$ are differentiable near the point with $g'(x) \ne 0$, then $\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}$, provided the second limit exists (or is infinite).`),
    example(r`$\lim_{x \to 0} \dfrac{e^x - 1}{x}$`, [
      [r`\tfrac{0}{0}`, "Check the form."],
      [r`\lim_{x \to 0} \frac{e^x}{1} = 1`, ""],
    ]),
    example(r`$\lim_{x \to \infty} \dfrac{x^2}{e^x}$`, [
      [r`\tfrac{\infty}{\infty} \Rightarrow \lim \frac{2x}{e^x}`, ""],
      [r`\tfrac{\infty}{\infty} \Rightarrow \lim \frac{2}{e^x} = 0`, "Apply it again."],
    ]),
    example(r`$\lim_{x \to 0} \dfrac{1 - \cos x}{x^2}$`, [
      [r`\tfrac{0}{0} \Rightarrow \lim \frac{\sin x}{2x}`, ""],
      [r`\tfrac{0}{0} \Rightarrow \lim \frac{\cos x}{2} = \tfrac{1}{2}`, ""],
    ]),
    callout("warning", "Two common errors", r`Differentiate the top and bottom separately: this is not the Quotient Rule. And don't use it on $\frac{\sin x}{x + 1}$ as $x \to 0$: that's $\frac{0}{1} = 0$, not indeterminate.`),
    callout("application", "Where this shows up", r`Comparing growth rates, such as whether an algorithm's running time $n\log n$ grows slower than $n^{1.1}$, comes down to limits that L'Hospital's Rule settles.`),
  ],
  questions: [
    num(1, r`Find $\lim_{x \to 0} \dfrac{e^{2x} - 1}{x}$.`, 2, {}, [], r`$\frac{2e^{2x}}{1} \to 2$.`),
    num(2, r`Find $\lim_{x \to 1} \dfrac{\ln x}{x - 1}$.`, 1, {}, [], r`$\frac{1/x}{1} \to 1$.`),
    num(2, r`Find $\lim_{x \to \infty} \dfrac{\ln x}{x}$.`, 0, {}, [], r`$\frac{1/x}{1} \to 0$.`),
    mc(3, r`A student applies L'Hospital's Rule to $\lim_{x \to 0} \frac{x + 1}{x + 2}$ and gets 1. What went wrong?`, ["Nothing; the answer is 1", "The limit isn't indeterminate; direct substitution gives 1/2", "They should have used the Quotient Rule", "The limit doesn't exist"], 1, [], r`The rule applies only to 0/0 or ∞/∞.`, "review"),
  ],
});
