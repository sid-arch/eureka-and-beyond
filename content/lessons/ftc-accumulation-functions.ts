import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ftc-accumulation-functions",
  title: "The Fundamental Theorem of Calculus and accumulation functions",
  summary: "Define accumulation functions g(x) = ∫ₐˣ f(t) dt and use the first part of the Fundamental Theorem, g′(x) = f(x), including with the Chain Rule.",
  minutes: 30,
  objectives: [
    "Define an accumulation function and evaluate it from geometry.",
    "Apply d/dx ∫ₐˣ f(t) dt = f(x).",
    "Differentiate integrals with variable upper limits using the Chain Rule.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  formulas: ["ftc"],
  blocks: [
    def("Accumulation function", r`$g(x) = \int_a^x f(t)\,dt$ gives the signed area under $f$ from $a$ to $x$. The variable $t$ is a placeholder; $x$ is the input.`),
    def("FTC, part 1", r`If $f$ is continuous, then $g'(x) = \frac{d}{dx}\int_a^x f(t)\,dt = f(x)$. Accumulated area grows at a rate equal to the current height of $f$.`),
    example(r`Derivatives of accumulation functions`, [
      [r`\frac{d}{dx}\int_2^x \sqrt{1 + t^3}\,dt = \sqrt{1 + x^3}`, ""],
      [r`\frac{d}{dx}\int_0^{x^2} \cos t\,dt = \cos(x^2) \cdot 2x`, "Chain Rule with upper limit x²."],
      [r`\frac{d}{dx}\int_x^5 e^{t^2}\,dt = -e^{x^2}`, "Flip the limits: a minus sign."],
    ]),
    activity("accumulation", { title: "g′(x) = f(x)", params: { fn: "sin", x: 2 } }),
    callout("tip", "Try this", r`Compare the readout "F′(x) = f(x)" with the slope of the lower graph as you move $x$: where $f$ is largest, $F$ is steepest.`, "experiment"),
    callout("application", "Where this shows up", r`Total rainfall since midnight is an accumulation of the rainfall rate; the rate the total rises is the current rainfall rate, which is FTC part 1 in words.`),
  ],
  questions: [
    num(1, r`If $g(x) = \int_1^x t^3\,dt$, find $g'(2)$.`, 8, {}, [], r`$g'(x) = x^3$.`),
    num(2, r`If $h(x) = \int_0^{3x} \sqrt{t + 4}\,dt$, find $h'(0)$.`, 6, {}, [], r`$h'(x) = \sqrt{3x + 4}\cdot 3$; at 0, $2 \cdot 3 = 6$.`),
    mc(2, r`$\frac{d}{dx}\int_x^{1} \sin t\,dt$ is…`, [r`$\sin x$`, r`$-\sin x$`, r`$\cos x$`, r`$\sin 1 - \sin x$`], 1, [], r`$\int_x^1 = -\int_1^x$.`),
    num(3, r`If $g(x) = \int_0^x (t^2 - 4)\,dt$, at what $x > 0$ does $g$ have a critical point?`, 2, {}, [], r`$g'(x) = x^2 - 4 = 0$.`, "review"),
  ],
});
