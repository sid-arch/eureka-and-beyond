import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "secant-to-tangent",
  title: "From average to instantaneous rate of change",
  summary: "Approximate the slope of a curve at a point with secant lines and see how the limit of their slopes defines the derivative.",
  minutes: 35,
  objectives: [
    "Compute the average rate of change of a function on an interval.",
    "Estimate an instantaneous rate of change using shrinking intervals.",
    "Interpret the derivative as the limit of secant slopes and as the slope of the tangent line.",
  ],
  concepts: [
    { slug: "derivative", name: "Derivative", description: "The instantaneous rate of change of a function; the limit of secant slopes.", subject: "subj_math" },
    { slug: "limits", name: "Limits", description: "The value a function's output approaches as its input approaches a given value.", subject: "subj_math" },
  ],
  formulas: ["derivative-definition", "power-rule"],
  blocks: [
    text(r`A car's speedometer reads 50 mph at one instant. But speed is distance divided by time, and at a single instant no time passes and no distance is covered. This puzzle, how change can happen at an instant, is the starting point of calculus.`),
    def("Average rate of change", r`For $f$ on $[a, b]$, the change in output divided by the change in input: $\frac{f(b) - f(a)}{b - a}$. It is the slope of the secant line through $(a, f(a))$ and $(b, f(b))$.`),
    example(r`Average rate of change of $f(x) = x^2$ on $[1, 3]$`, [
      [r`\frac{f(3) - f(1)}{3 - 1} = \frac{9 - 1}{2}`, "Evaluate at the endpoints."],
      [r`= 4`, "On average, f increases 4 units per unit of x on this interval."],
    ]),
    text(r`To find the rate at exactly $x = 1$, use intervals $[1, 1 + h]$ with smaller and smaller $h$. For $f(x) = x^2$ the secant slope is $\frac{(1 + h)^2 - 1}{h} = \frac{2h + h^2}{h} = 2 + h$. With $h = 0.1$ it's 2.1; with $h = 0.01$ it's 2.01; with $h = 0.001$ it's 2.001. The slopes approach 2.`),
    formula(r`f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}`, "The derivative at a point", r`When this limit exists, $f'(a)$ is the instantaneous rate of change at $a$ and the slope of the tangent line there.`),
    example(r`Use the definition to find $f'(3)$ for $f(x) = x^2$`, [
      [r`\frac{(3 + h)^2 - 9}{h} = \frac{9 + 6h + h^2 - 9}{h}`, "Expand."],
      [r`= \frac{6h + h^2}{h} = 6 + h \quad (h \neq 0)`, "Factor out h and cancel; h is never exactly 0 in the limit."],
      [r`f'(3) = \lim_{h \to 0}(6 + h) = 6`, "Now let h approach 0."],
    ], r`This matches the pattern $f'(x) = 2x$ for $f(x) = x^2$, which the power rule gives directly.`),
    callout("note", "Tangent line", r`The tangent line to $y = f(x)$ at $x = a$ is $y = f(a) + f'(a)(x - a)$. Near $a$ it is the best straight-line approximation of the curve.`),
    callout("application", "Where this shows up", r`If $s(t) = 4.9t^2$ is the distance in meters a dropped object has fallen after $t$ seconds, then $s'(2) = 9.8 \cdot 2 = 19.6$ m/s is its speed at exactly 2 seconds.`),
    activity("tangent-line", { title: "Shrink the interval", params: { fn: "x^2" } }),
    callout("tip", "Investigate", r`With $f(x) = x^3$ at $a = 1$, record the secant slope for $h = 1, 0.5, 0.1, 0.01$. What value do they approach? Try a negative $h$: do the slopes approach the same number from the other side?`, "experiment"),
    activity("tangent-line", {
      title: "Walkthrough: secant slopes approach the tangent slope",
      steps: [
        { title: "A wide secant", body: "With h = 2 on f(x) = x² at a = 1, the secant slope is 4.", params: { fn: "x^2", a: 1, h: 2 } },
        { title: "Narrower", body: "h = 1 gives slope 3; h = 0.5 gives 2.5.", params: { fn: "x^2", a: 1, h: 0.5 } },
        { title: "Very close", body: "h = 0.05 gives 2.05. The secant is almost indistinguishable from the tangent.", params: { fn: "x^2", a: 1, h: 0.05 } },
        { title: "The limit", body: "As h → 0 the slopes approach 2 = f′(1).", params: { fn: "x^2", a: 1, h: 0.01 } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`Find the average rate of change of $f(x) = 3x^2$ on $[0, 2]$.`, 6, {}, [r`$\frac{f(2) - f(0)}{2 - 0}$.`], r`$\frac{12 - 0}{2} = 6$.`),
    num(2, r`For $f(x) = x^2$, what is the slope of the secant line from $x = 2$ to $x = 2.1$?`, 4.1, { tolerance: 0.0001 }, [r`$\frac{2.1^2 - 2^2}{0.1}$.`], r`$\frac{4.41 - 4}{0.1} = 4.1$.`),
    num(2, r`Use the limit definition to find $f'(1)$ for $f(x) = x^2 + 3x$.`, 5, {},
      [r`Compute $\frac{f(1 + h) - f(1)}{h}$ and simplify before letting $h \to 0$.`], r`$\frac{(1 + h)^2 + 3(1 + h) - 4}{h} = \frac{5h + h^2}{h} = 5 + h \to 5$.`),
    mc(2, r`$f'(a)$ represents all of the following except:`, [
      "The slope of the tangent line at x = a",
      "The instantaneous rate of change of f at a",
      "The limit of secant slopes as h → 0",
      "The average rate of change of f on [0, a]",
    ], 3, ["Which one uses a whole interval?"], r`The average rate on $[0, a]$ is a secant slope over a fixed interval, not the derivative at $a$.`),
    num(3, r`Write the tangent line to $f(x) = x^2$ at $x = 3$ as $y = mx + b$. Enter $b$.`, -9, {},
      [r`$f(3) = 9$ and $f'(3) = 6$.`, r`$y = 9 + 6(x - 3)$.`], r`$y = 9 + 6x - 18 = 6x - 9$, so $b = -9$.`, "review"),
  ],
});
