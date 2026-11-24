import { callout, def, example, lesson, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "evaluating-limits-algebraically",
  title: "Evaluating limits algebraically",
  summary: "Evaluate limits by direct substitution, factoring, rationalizing and simplifying complex fractions, and find limits at infinity of rational functions.",
  minutes: 30,
  objectives: [
    "Use limit laws and direct substitution.",
    "Resolve 0/0 forms by factoring, rationalizing or simplifying.",
    "Find limits at infinity of rational functions by comparing degrees.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function approaches as the input approaches a point.", subject: "subj_math" },
  ],
  blocks: [
    def("Direct substitution", r`If $f$ is a polynomial, or a rational function defined at $a$, then $\lim_{x \to a} f(x) = f(a)$. If substitution gives $\frac{0}{0}$, the limit may still exist: simplify first.`),
    example(r`$\lim_{x \to 3} \dfrac{x^2 - 9}{x^2 - 3x}$`, [
      [r`\frac{(x - 3)(x + 3)}{x(x - 3)} = \frac{x + 3}{x}`, "Factor and cancel."],
      [r`\to \tfrac{6}{3} = 2`, ""],
    ]),
    example(r`$\lim_{x \to 0} \dfrac{\sqrt{x + 9} - 3}{x}$`, [
      [r`\frac{(\sqrt{x + 9} - 3)(\sqrt{x + 9} + 3)}{x(\sqrt{x + 9} + 3)} = \frac{1}{\sqrt{x + 9} + 3}`, "Multiply by the conjugate."],
      [r`\to \tfrac{1}{6}`, ""],
    ]),
    def("Limits at infinity", r`For a rational function, compare degrees: numerator lower → 0; equal → ratio of leading coefficients; numerator higher → the function grows without bound. These match horizontal asymptotes.`),
    example(r`$\lim_{x \to \infty} \dfrac{4x^2 - x}{2x^2 + 5}$`, [
      [r`= \tfrac{4}{2} = 2`, "Equal degrees."],
    ]),
    callout("application", "Where this shows up", r`The derivative is defined as a limit of difference quotients, which almost always start as 0/0 and need exactly these algebraic tricks.`),
  ],
  questions: [
    num(1, r`Evaluate $\lim_{x \to 2} (x^3 - 4x + 1)$.`, 1, {}, [], r`$8 - 8 + 1 = 1$.`),
    num(2, r`Evaluate $\lim_{x \to -4} \dfrac{x^2 + 7x + 12}{x + 4}$.`, -1, {}, [r`$(x + 3)(x + 4)$.`], r`$x + 3 \to -1$.`),
    num(2, r`Evaluate $\lim_{x \to 4} \dfrac{\sqrt{x} - 2}{x - 4}$. Enter a decimal.`, 0.25, {}, ["Rationalize the numerator."], r`$\frac{1}{\sqrt{x} + 2} \to \frac{1}{4}$.`),
    num(2, r`Evaluate $\lim_{x \to \infty} \dfrac{3x + 1}{x^2 - 2}$.`, 0, {}, [], r`Numerator degree lower: 0.`),
    short(3, r`Evaluate $\lim_{h \to 0} \dfrac{(2 + h)^2 - 4}{h}$.`, ["4"], [r`$\frac{4h + h^2}{h} = 4 + h$.`], r`4. (This is the slope of $x^2$ at $x = 2$.)`, "review"),
  ],
});
