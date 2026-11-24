import { callout, def, example, figure, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "squeeze-theorem",
  title: "The Squeeze Theorem",
  summary: "Find limits of functions trapped between two functions with the same limit, and use the theorem to establish the special limit sin x / x → 1.",
  minutes: 25,
  objectives: [
    "State the Squeeze Theorem and its conditions.",
    "Find bounding functions using −1 ≤ sin θ ≤ 1 and −1 ≤ cos θ ≤ 1.",
    "Apply lim sin x / x = 1 to related limits.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function's outputs approach as the input approaches a given value.", subject: "subj_math" },
  ],
  formulas: ["special-trig-limits"],
  blocks: [
    def("Squeeze Theorem", r`If $g(x) \le f(x) \le h(x)$ for all $x$ near $c$ (except possibly at $c$), and $\lim_{x \to c} g(x) = \lim_{x \to c} h(x) = L$, then $\lim_{x \to c} f(x) = L$.`),
    figure("/figures/squeeze-theorem.svg", "The graph of x squared times sine of one over x oscillates faster and faster near zero, but always stays between the dashed parabolas y = x squared and y = negative x squared, which both pass through the origin.", "Squeezed between −x² and x², the oscillating graph has no choice: its limit at 0 is 0."),
    example(r`$\lim_{x \to 0} x^2 \sin\frac{1}{x}$`, [
      [r`-1 \le \sin\tfrac{1}{x} \le 1`, ""],
      [r`-x^2 \le x^2 \sin\tfrac{1}{x} \le x^2`, "Multiply by x² ≥ 0."],
      [r`-x^2 \to 0,\ x^2 \to 0`, ""],
      [r`\lim = 0`, "By the Squeeze Theorem."],
    ]),
    example(r`$\lim_{x \to \infty} \dfrac{\sin x}{x}$`, [
      [r`-\tfrac{1}{x} \le \tfrac{\sin x}{x} \le \tfrac{1}{x}`, "For x > 0."],
      [r`\pm\tfrac{1}{x} \to 0 \Rightarrow \lim = 0`, ""],
    ]),
    callout("note", "The famous one", r`A geometric argument with areas on the unit circle gives $\cos x \le \frac{\sin x}{x} \le 1$ near 0, so $\lim_{x \to 0} \frac{\sin x}{x} = 1$ (in radians).`),
    callout("application", "Where this shows up", r`The limit $\frac{\sin x}{x} \to 1$ is why $\sin x \approx x$ for small angles, the approximation behind the simple-pendulum formula in physics.`),
  ],
  questions: [
    num(1, r`$2 - x^2 \le f(x) \le 2 + x^2$ for all $x$. Find $\lim_{x \to 0} f(x)$.`, 2, {}, [], r`Both bounds approach 2.`),
    num(2, r`Find $\lim_{x \to 0} \dfrac{\sin 2x}{\sin 3x}$ as a decimal to three places.`, 0.667, { tolerance: 0.001 }, [r`Write it as $\frac{2}{3} \cdot \frac{\sin 2x}{2x} \cdot \frac{3x}{\sin 3x}$.`], r`$\frac{2}{3} \approx 0.667$.`),
    num(2, r`Find $\lim_{x \to 0} x \cos\frac{1}{x}$.`, 0, {}, [], r`$-|x| \le x\cos\frac{1}{x} \le |x|$, and both bounds go to 0.`),
    mc(3, r`Why can't you find $\lim_{x \to 0} \sin\frac{1}{x}$ with the Squeeze Theorem using bounds −1 and 1?`, ["The bounds have different limits", "sin is not continuous", "The bounds aren't functions", "It's at infinity"], 0, [], r`−1 and 1 don't share a limit, so nothing is forced; in fact this limit doesn't exist.`, "review"),
  ],
});
