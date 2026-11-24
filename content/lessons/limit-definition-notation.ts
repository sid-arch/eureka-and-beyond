import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "limit-definition-notation",
  title: "Defining limits and using limit notation",
  summary: "Understand the limit of f(x) as x approaches a as the value f(x) gets arbitrarily close to, read and write limit notation, and use one-sided limits to decide whether a limit exists.",
  minutes: 25,
  objectives: [
    "Interpret lim f(x) = L as x → a in words and on a graph.",
    "Use one-sided limit notation and decide whether a two-sided limit exists.",
    "Recognize that a limit depends on values near a, not at a.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function's outputs approach as the input approaches a given value.", subject: "subj_math" },
  ],
  blocks: [
    def("Limit", r`$\lim_{x \to a} f(x) = L$ means that $f(x)$ can be made as close to $L$ as we like by taking $x$ close enough to $a$ (but not equal to $a$). The value $f(a)$, if it exists, plays no role.`),
    def("One-sided limits", r`$\lim_{x \to a^-} f(x)$ uses only $x < a$; $\lim_{x \to a^+} f(x)$ uses only $x > a$. The two-sided limit exists exactly when both one-sided limits exist and are equal.`),
    example(r`$f(x) = \dfrac{x^2 - 4}{x - 2}$ near $x = 2$`, [
      [r`f(1.99) = 3.99,\ f(2.01) = 4.01`, "Values approach 4 from both sides."],
      [r`\lim_{x \to 2} f(x) = 4`, ""],
      [r`f(2) \text{ is undefined}`, "The limit exists anyway: limits are about nearby inputs."],
    ]),
    example(r`$g(x) = 1$ for $x < 0$ and $g(x) = 3$ for $x \ge 0$`, [
      [r`\lim_{x \to 0^-} g(x) = 1,\ \lim_{x \to 0^+} g(x) = 3`, ""],
      [r`\lim_{x \to 0} g(x) \text{ does not exist}`, "The one-sided limits differ."],
    ]),
    callout("note", "Three ways a limit can fail to exist", r`The one-sided limits differ (a jump); the values grow without bound; or the values oscillate without settling, as $\sin\frac{1}{x}$ does near 0.`),
    callout("application", "Where this shows up", r`Instantaneous speed is a limit: average speed over shorter and shorter time intervals. Limits are the foundation of every idea in calculus.`),
    activity("limits", { title: "Approaching a limit", params: { case: "hole" } }),
    callout("tip", "Try this", r`Slide closer to a and watch both table columns home in on the same value, even though f(a) itself is undefined. Then try the jump.`, "experiment"),
  ],
  questions: [
    num(1, r`Find $\lim_{x \to 3} (2x + 1)$.`, 7, {}, [], r`The values approach $2(3) + 1 = 7$.`),
    mc(2, r`$f(5) = 2$, but $f(x)$ approaches 6 as $x$ approaches 5 from both sides. What is $\lim_{x \to 5} f(x)$?`, ["2", "6", "4", "It doesn't exist"], 1, [], r`The limit ignores the value at 5.`),
    mc(2, r`$\lim_{x \to 1^-} h(x) = 4$ and $\lim_{x \to 1^+} h(x) = 4$. Then $\lim_{x \to 1} h(x)$…`, ["equals 4", "does not exist", "equals h(1)", "can't be determined"], 0, [], r`Equal one-sided limits.`),
    mc(3, r`Which describes $\lim_{x \to 0} \sin\frac{1}{x}$?`, ["0", "1", "Does not exist: the values oscillate between −1 and 1", "∞"], 2, [], r`As $x \to 0$, $\frac{1}{x}$ sweeps through infinitely many periods.`, "review"),
  ],
});
