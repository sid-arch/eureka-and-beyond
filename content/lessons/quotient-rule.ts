import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "quotient-rule",
  title: "The Quotient Rule",
  summary: "Differentiate quotients with (f/g)′ = (f′g − fg′)/g², use it with tables, and know when rewriting is simpler.",
  minutes: 25,
  objectives: [
    "Apply the Quotient Rule in the correct order.",
    "Use the Quotient Rule with values from a table.",
    "Recognize when rewriting a quotient avoids the rule entirely.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["derivative-rules"],
  blocks: [
    def("Quotient Rule", r`$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$, where $g(x) \ne 0$. Memory aid: "low d-high minus high d-low, over low squared."`),
    example(r`$\frac{d}{dx}\dfrac{x^2 + 1}{x - 1}$`, [
      [r`\frac{2x(x - 1) - (x^2 + 1)(1)}{(x - 1)^2}`, ""],
      [r`= \frac{x^2 - 2x - 1}{(x - 1)^2}`, ""],
      [r`\text{at } x = 2: \tfrac{4 - 4 - 1}{1} = -1`, ""],
    ]),
    example(r`When to rewrite instead: $\dfrac{x^3 + 4}{x}$`, [
      [r`= x^2 + 4x^{-1}`, "Split the fraction."],
      [r`\Rightarrow 2x - 4x^{-2}`, "No Quotient Rule needed."],
    ]),
    callout("warning", "Order matters", r`The numerator is $f'g - fg'$, with the minus sign. Swapping the order flips the sign of the answer.`),
    callout("application", "Where this shows up", r`Average cost $\frac{C(q)}{q}$ and concentration $\frac{\text{amount}}{\text{volume}}$ are quotients; their rates of change come from the Quotient Rule.`),
  ],
  questions: [
    num(2, r`$f(1) = 2$, $f'(1) = 3$, $g(1) = 4$, $g'(1) = -1$. Find $\left(\frac{f}{g}\right)'(1)$.`, 0.875, { tolerance: 0.001 }, [], r`$\frac{3 \cdot 4 - 2(-1)}{16} = \frac{14}{16} = 0.875$.`),
    num(2, r`Find $\frac{d}{dx}\dfrac{e^x}{x}$ at $x = 1$.`, 0, {}, [], r`$\frac{e^x x - e^x}{x^2} = 0$ at 1.`),
    mc(2, r`$\frac{d}{dx}\dfrac{1}{g(x)}$ equals…`, [r`$\frac{1}{g'(x)}$`, r`$-\frac{g'(x)}{[g(x)]^2}$`, r`$\frac{g'(x)}{g(x)}$`, r`$-\frac{1}{[g(x)]^2}$`], 1, [], r`Quotient Rule with $f = 1$, $f' = 0$.`),
    num(3, r`Find $\frac{d}{dx}\dfrac{3x}{x^2 + 1}$ at $x = 0$.`, 3, {}, [], r`$\frac{3(x^2 + 1) - 3x(2x)}{(x^2 + 1)^2} = 3$ at 0.`, "review"),
  ],
});
