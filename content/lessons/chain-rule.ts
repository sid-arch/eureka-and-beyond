import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "chain-rule",
  title: "The Chain Rule",
  summary: "Differentiate compositions with the Chain Rule, identify inner and outer functions, and use it with tables, graphs and other rules.",
  minutes: 30,
  objectives: [
    "Identify the inner and outer functions of a composition.",
    "Apply d/dx f(g(x)) = f′(g(x))·g′(x), including repeated use.",
    "Use the Chain Rule with tables of values.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["chain-rule"],
  blocks: [
    def("Chain Rule", r`If $y = f(u)$ and $u = g(x)$, then $\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$, that is, $\frac{d}{dx}f(g(x)) = f'(g(x))\,g'(x)$: the derivative of the outside, evaluated at the inside, times the derivative of the inside.`),
    example(r`Common patterns`, [
      [r`\frac{d}{dx}(3x + 1)^5 = 5(3x + 1)^4 \cdot 3`, ""],
      [r`\frac{d}{dx}\sin(x^2) = \cos(x^2) \cdot 2x`, ""],
      [r`\frac{d}{dx}e^{-2x} = -2e^{-2x}`, ""],
      [r`\frac{d}{dx}\ln(x^2 + 1) = \frac{2x}{x^2 + 1}`, ""],
    ]),
    example(r`$h(x) = f(g(x))$ with $g(1) = 3$, $g'(1) = 2$, $f'(3) = -4$`, [
      [r`h'(1) = f'(g(1)) \cdot g'(1) = f'(3) \cdot 2`, ""],
      [r`= -8`, ""],
    ]),
    example(r`$\frac{d}{dx}\cos^3(2x) = \frac{d}{dx}[\cos(2x)]^3$`, [
      [r`3\cos^2(2x) \cdot (-\sin 2x) \cdot 2`, "Three layers: cube, cosine, 2x."],
      [r`= -6\cos^2(2x)\sin(2x)`, ""],
    ]),
    callout("application", "Where this shows up", r`If air temperature changes with altitude and a balloon's altitude changes with time, the rate the balloon's thermometer changes is (°C per meter) × (meters per second).`),
  ],
  questions: [
    num(1, r`Find $\frac{d}{dx}\sqrt{x^2 + 9}$ at $x = 4$.`, 0.8, { tolerance: 0.001 }, [], r`$\frac{x}{\sqrt{x^2 + 9}} = \frac{4}{5}$.`),
    num(2, r`$g(2) = 5$, $g'(2) = -3$, $f'(5) = 2$. Find $(f \circ g)'(2)$.`, -6, {}, [], r`$f'(5)g'(2) = -6$.`),
    mc(2, r`$\frac{d}{dx}e^{\sin x}$ is…`, [r`$e^{\sin x}$`, r`$e^{\cos x}$`, r`$\cos x\, e^{\sin x}$`, r`$\sin x\, e^{\sin x - 1}$`], 2, [], r`Outside $e^u$, inside $\sin x$.`),
    num(3, r`Find $\frac{d}{dx}\ln(\cos x)$ at $x = \frac{\pi}{4}$.`, -1, {}, [], r`$\frac{-\sin x}{\cos x} = -\tan x = -1$.`, "review"),
  ],
});
