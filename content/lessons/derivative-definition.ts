import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "derivative-definition",
  title: "Defining the derivative of a function and using derivative notation",
  summary: "Define the derivative as a limit, compute it from the definition, read the notations f′(x), dy/dx and d/dx, and write tangent line equations.",
  minutes: 30,
  objectives: [
    "Compute f′(x) from the limit definition for simple functions.",
    "Use the notations f′(x), y′, dy/dx and d/dx[f(x)].",
    "Recognize a limit as the derivative of some function at a point, and write a tangent line.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["derivative-definition"],
  blocks: [
    def("The derivative", r`$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$, wherever the limit exists. At a point, the equivalent form $f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$ is also common.`),
    example(r`$f(x) = x^2$`, [
      [r`\frac{(x + h)^2 - x^2}{h} = \frac{2xh + h^2}{h}`, ""],
      [r`= 2x + h \to 2x`, r`So $f'(x) = 2x$.`],
    ]),
    example(r`$f(x) = \dfrac{1}{x}$`, [
      [r`\frac{\frac{1}{x + h} - \frac{1}{x}}{h} = \frac{-h}{h\,x(x + h)}`, "Combine fractions."],
      [r`= \frac{-1}{x(x + h)} \to -\frac{1}{x^2}`, ""],
    ]),
    example(r`Tangent line to $y = x^2$ at $x = 3$`, [
      [r`f(3) = 9,\ f'(3) = 6`, ""],
      [r`y - 9 = 6(x - 3)`, "Point-slope form."],
    ]),
    activity("derivative-graph", { title: "The slope of f becomes the height of f′", params: { fn: "cubic", a: 1.5 } }),
    callout("tip", "Try this", r`Slide $a$ across the graph. Where $f$ has a peak or valley, the tangent is flat and the lower graph crosses zero.`, "experiment"),
    callout("application", "Where this shows up", r`If $C(q)$ is the cost of producing $q$ items, $C'(q)$ is the marginal cost: about how much the next item costs.`),
  ],
  questions: [
    num(2, r`Evaluate $\lim_{h \to 0} \dfrac{(2 + h)^3 - 8}{h}$.`, 12, {}, ["It's f′(2) for f(x) = x³."], r`$f'(x) = 3x^2$, so $f'(2) = 12$.`),
    mc(2, r`Which equals $f'(5)$?`, [r`$\lim_{x \to 5} \frac{f(x) - f(5)}{x - 5}$`, r`$\frac{f(5 + h) - f(5)}{h}$`, r`$\lim_{h \to 0} f(5 + h)$`, r`$\frac{f(5)}{5}$`], 0, [], r`The alternate form of the definition.`),
    num(2, r`Using $f(x) = x^2$, find the $y$-intercept of the tangent line at $x = 3$.`, -9, {}, [], r`$y = 9 + 6(x - 3) = 6x - 9$.`),
    num(3, r`From the definition, $\frac{d}{dx}\sqrt{x} = \frac{1}{2\sqrt{x}}$. Find the slope of $y = \sqrt{x}$ at $x = 9$, to four decimal places.`, 0.1667, { tolerance: 0.0001 }, [], r`$\frac{1}{6} \approx 0.1667$.`, "review"),
  ],
});
