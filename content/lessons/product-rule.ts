import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "product-rule",
  title: "The Product Rule",
  summary: "Differentiate products of functions with (fg)′ = f′g + fg′, including from tables of values, and avoid the common mistake of multiplying derivatives.",
  minutes: 25,
  objectives: [
    "Apply the Product Rule to products of two functions.",
    "Use the Product Rule with values from a table.",
    "Explain why (fg)′ ≠ f′g′.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["derivative-rules"],
  blocks: [
    def("Product Rule", r`$\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$.`),
    example(r`$\frac{d}{dx}\left[x^2 \sin x\right]$`, [
      [r`2x \sin x + x^2 \cos x`, ""],
    ]),
    example(r`Where does $y = xe^x$ have a horizontal tangent?`, [
      [r`y' = e^x + xe^x = e^x(1 + x)`, ""],
      [r`e^x > 0 \Rightarrow x = -1`, ""],
    ]),
    example(r`$h(x) = f(x)g(x)$ with $f(2) = 3$, $f'(2) = -1$, $g(2) = 4$, $g'(2) = 5$`, [
      [r`h'(2) = (-1)(4) + (3)(5) = 11`, ""],
    ]),
    callout("warning", "Not the product of derivatives", r`For $x \cdot x = x^2$, multiplying derivatives would give $1 \cdot 1 = 1$, but the derivative is $2x$.`),
    callout("application", "Where this shows up", r`Revenue = price × quantity. If both change over time, the rate of change of revenue uses the Product Rule.`),
  ],
  questions: [
    num(1, r`Find $\frac{d}{dx}[x^3 \ln x]$ at $x = 1$.`, 1, {}, [], r`$3x^2\ln x + x^2 = 0 + 1$.`),
    num(2, r`Using the table values above, find $(fg)'(2)$ if instead $g'(2) = -2$.`, -10, {}, [], r`$(-1)(4) + 3(-2) = -10$.`),
    mc(2, r`$\frac{d}{dx}[e^x \cos x]$ is…`, [r`$-e^x \sin x$`, r`$e^x(\cos x - \sin x)$`, r`$e^x(\cos x + \sin x)$`, r`$e^x \cos x$`], 1, [], r`$e^x\cos x + e^x(-\sin x)$.`),
    num(3, r`A store's price is $p = 20$ dollars, falling at 0.5 dollars per week; sales are $q = 300$ items per week, rising by 10 per week. How fast is revenue $pq$ changing, in dollars per week per week?`, 50, { unit: "dollars/week²" }, [], r`$p'q + pq' = (-0.5)(300) + (20)(10) = -150 + 200 = 50$.`, "review"),
  ],
});
