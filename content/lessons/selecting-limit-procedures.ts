import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "selecting-limit-procedures",
  title: "Selecting procedures for determining limits",
  summary: "Choose an efficient method for a limit: direct substitution, factoring, rationalizing, trig identities and special limits, or one-sided sign analysis, based on what substitution produces.",
  minutes: 25,
  objectives: [
    "Start every limit by trying direct substitution.",
    "Recognize 0/0 as a signal to rewrite, and nonzero/0 as a signal for an infinite limit.",
    "Choose factoring, rationalizing or special trig limits to rewrite 0/0 forms.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function's outputs approach as the input approaches a given value.", subject: "subj_math" },
  ],
  formulas: ["special-trig-limits"],
  blocks: [
    def("Decision steps", r`1. Substitute. If you get a number, that's the limit (for continuous functions). 2. If you get $\frac{0}{0}$, rewrite: factor and cancel, rationalize, combine fractions, or use $\frac{\sin x}{x} \to 1$. 3. If you get $\frac{\text{nonzero}}{0}$, the limit is infinite or doesn't exist; check signs from each side.`),
    example(r`$\lim_{x \to 9} \dfrac{\sqrt{x} - 3}{x - 9}$`, [
      [r`\tfrac{0}{0}`, "Rewrite. Note x − 9 = (√x − 3)(√x + 3)."],
      [r`\frac{1}{\sqrt{x} + 3} \to \frac{1}{6}`, ""],
    ]),
    example(r`$\lim_{x \to 0} \dfrac{\sin 3x}{x}$`, [
      [r`\frac{\sin 3x}{x} = 3 \cdot \frac{\sin 3x}{3x}`, "Match the special limit."],
      [r`3 \cdot 1 = 3`, ""],
    ]),
    example(r`$\lim_{x \to 1} \dfrac{x + 2}{(x - 1)^2}$`, [
      [r`\tfrac{3}{0}`, "Nonzero over zero."],
      [r`(x - 1)^2 > 0 \text{ on both sides}`, ""],
      [r`+\infty`, "The limit is infinite (it doesn't exist as a number)."],
    ]),
    callout("warning", "0/0 is not an answer", r`$\frac{0}{0}$ is called an indeterminate form: the limit could be anything. It tells you to do more work, not that the limit fails to exist.`),
    callout("application", "Where this shows up", r`Every derivative from the definition is a 0/0 limit, so these rewriting skills are used constantly in the rest of the course.`),
  ],
  questions: [
    num(1, r`Find $\lim_{x \to 2} (x^3 - x)$.`, 6, {}, [], r`Substitute: $8 - 2 = 6$.`),
    num(2, r`Find $\lim_{x \to -3} \dfrac{x^2 - 9}{x + 3}$.`, -6, {}, [], r`$\frac{(x - 3)(x + 3)}{x + 3} = x - 3 \to -6$.`),
    num(2, r`Find $\lim_{x \to 0} \dfrac{\sin 5x}{2x}$.`, 2.5, { tolerance: 0.001 }, [], r`$\frac{5}{2} \cdot \frac{\sin 5x}{5x} \to 2.5$.`),
    num(2, r`Find $\lim_{x \to 4} \dfrac{x - 4}{\sqrt{x} - 2}$.`, 4, {}, [r`$x - 4 = (\sqrt{x} - 2)(\sqrt{x} + 2)$.`], r`$\sqrt{x} + 2 \to 4$.`),
    mc(3, r`Substituting into $\lim_{x \to 2} \frac{x + 1}{x - 2}$ gives $\frac{3}{0}$. What can you conclude?`, ["The limit is 0", "The limit is infinite or does not exist; check one-sided signs", "The limit is 3", "Factor and cancel"], 1, [], r`From the right it goes to $+\infty$, from the left to $-\infty$, so the two-sided limit does not exist.`, "review"),
  ],
});
