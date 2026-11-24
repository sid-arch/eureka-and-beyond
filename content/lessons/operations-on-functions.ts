import { callout, def, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "operations-on-functions",
  title: "Operations on functions",
  summary: "Add, subtract, multiply and divide functions, evaluate the results, and find the domain of each combination.",
  minutes: 25,
  objectives: [
    "Form (f + g)(x), (f − g)(x), (fg)(x) and (f/g)(x).",
    "Evaluate combined functions at a value.",
    "Find the domain of a combination, excluding zeros of the divisor.",
  ],
  concepts: [
    { slug: "function-operations", name: "Function operations", description: "Combining functions by adding, subtracting, multiplying, dividing or composing.", subject: "subj_math" },
  ],
  blocks: [
    def("Function arithmetic", r`$(f + g)(x) = f(x) + g(x)$, $(f - g)(x) = f(x) - g(x)$, $(fg)(x) = f(x)\,g(x)$, and $\left(\frac{f}{g}\right)(x) = \frac{f(x)}{g(x)}$ where $g(x) \ne 0$.`),
    text(r`The domain of a sum, difference or product is the set of inputs in both domains. For a quotient, also remove every $x$ where the denominator function equals zero.`),
    example(r`Let $f(x) = x^2 - 4$ and $g(x) = x + 2$. Find $f - g$, $fg$ and $\frac{f}{g}$.`, [
      [r`(f - g)(x) = x^2 - 4 - x - 2 = x^2 - x - 6`, "Subtract the whole of g."],
      [r`(fg)(x) = (x^2 - 4)(x + 2) = x^3 + 2x^2 - 4x - 8`, ""],
      [r`\left(\tfrac{f}{g}\right)(x) = \tfrac{(x - 2)(x + 2)}{x + 2} = x - 2,\ x \ne -2`, "The simplified form keeps the restriction from the original."],
    ]),
    example(r`With $f(x) = \sqrt{x}$ and $g(x) = x - 3$, find the domain of $\frac{f}{g}$.`, [
      [r`x \ge 0`, "Domain of f."],
      [r`x \ne 3`, "g(3) = 0."],
      [r`[0, 3) \cup (3, \infty)`, ""],
    ]),
    callout("application", "Where this shows up", r`Profit is revenue minus cost, $P(x) = R(x) - C(x)$; average cost is total cost divided by units, $\frac{C(x)}{x}$. Business models are built by combining functions.`),
  ],
  questions: [
    short(1, r`$f(x) = 3x + 1$, $g(x) = x^2$. Find $(f + g)(x)$ in standard form.`, ["x^2+3x+1"], [], r`$x^2 + 3x + 1$.`),
    num(2, r`With the same functions, find $(fg)(2)$.`, 28, {}, [r`$f(2) = 7$, $g(2) = 4$.`], r`$7 \cdot 4 = 28$.`),
    num(2, r`With the same functions, find $(f - g)(-1)$.`, -3, {}, [r`$f(-1) = -2$, $g(-1) = 1$.`], r`$-2 - 1 = -3$.`),
    short(2, r`$f(x) = x + 5$ and $g(x) = x - 1$. Which x-value is excluded from the domain of $\frac{f}{g}$? Enter the number.`, ["1"], [], r`$g(1) = 0$, so $x \ne 1$.`),
    num(3, r`Revenue is $R(x) = 25x$ and cost is $C(x) = 10x + 600$. Find the profit at $x = 100$.`, 900, { unit: "dollars" }, [r`$P(x) = 15x - 600$.`], r`$P(100) = 1500 - 600 = 900$.`, "review"),
  ],
});
