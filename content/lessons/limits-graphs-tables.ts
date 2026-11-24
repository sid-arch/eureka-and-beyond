import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "limits-graphs-tables",
  title: "Limits from graphs and tables",
  summary: "Estimate limits from tables of values and graphs, use one-sided limits, and recognize when a limit does not exist.",
  minutes: 30,
  objectives: [
    "Explain the meaning of lim f(x) = L as x approaches a.",
    "Estimate limits numerically and graphically, including at holes.",
    "Use one-sided limits and identify limits that do not exist.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function approaches as the input approaches a point.", subject: "subj_math" },
  ],
  blocks: [
    def("Limit", r`$\lim_{x \to a} f(x) = L$ means $f(x)$ can be made as close to $L$ as we like by taking $x$ close enough to $a$ (but not equal to $a$). The value $f(a)$ itself doesn't matter, and may not even exist.`),
    example(r`Estimate $\lim_{x \to 2} \dfrac{x^2 - 4}{x - 2}$ from a table`, [
      [r`x = 1.9, 1.99, 1.999: \ f = 3.9, 3.99, 3.999`, ""],
      [r`x = 2.1, 2.01, 2.001: \ f = 4.1, 4.01, 4.001`, ""],
      [r`\text{limit } = 4`, r`f(2) is undefined (0/0), but algebra agrees: $\frac{(x - 2)(x + 2)}{x - 2} = x + 2 \to 4$.`],
    ]),
    def("One-sided limits", r`$\lim_{x \to a^-}$ approaches from the left, $\lim_{x \to a^+}$ from the right. The two-sided limit exists exactly when both one-sided limits exist and are equal.`),
    example(r`$f(x) = \frac{|x|}{x}$ near 0`, [
      [r`\lim_{x \to 0^-} = -1,\ \lim_{x \to 0^+} = 1`, ""],
      [r`\lim_{x \to 0} f(x) \text{ does not exist}`, "The one-sided limits differ (a jump)."],
    ]),
    activity("rational-graph", { title: "Limits near an asymptote", params: { a: 1, h: 0, k: 0 } }),
    callout("tip", "Try this", r`For $y = \frac{1}{x}$, the graph shoots up on the right of 0 and down on the left. Neither one-sided limit is a number, so $\lim_{x \to 0} \frac{1}{x}$ does not exist. But as $x \to \infty$, the graph approaches 0.`, "experiment"),
    callout("application", "Where this shows up", r`Limits are the foundation of calculus: instantaneous speed and the area under curves are both defined as limits.`),
    activity("limits", { title: "One-sided limits", params: { case: "jump" } }),
    callout("tip", "Try this", r`Compare the left and right columns of the table for each function. A two-sided limit exists only when they agree.`, "experiment"),
  ],
  questions: [
    num(1, r`Estimate $\lim_{x \to 3} (2x + 1)$.`, 7, {}, [], r`7.`),
    num(2, r`Find $\lim_{x \to 1} \dfrac{x^2 - 1}{x - 1}$.`, 2, {}, [], r`$x + 1 \to 2$.`),
    mc(2, r`$\lim_{x \to 2^-} f(x) = 5$ and $\lim_{x \to 2^+} f(x) = 5$, and $f(2) = 8$. What is $\lim_{x \to 2} f(x)$?`, ["5", "8", "Does not exist", "13"], 0, [], r`Both sides approach 5; the value at 2 doesn't affect the limit.`),
    mc(3, r`What is $\lim_{x \to 0} \sin\left(\frac{1}{x}\right)$?`, ["0", "1", "Does not exist", "∞"], 2, ["The function oscillates infinitely often near 0."], r`It oscillates between −1 and 1 without settling, so the limit does not exist.`, "review"),
  ],
});
