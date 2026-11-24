import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "higher-order-derivatives",
  title: "Calculating higher-order derivatives",
  summary: "Compute second and higher derivatives, use their notation, interpret acceleration and concavity, and find patterns in repeated derivatives.",
  minutes: 25,
  objectives: [
    "Compute f″, f‴ and f⁽ⁿ⁾ and use the notations d²y/dx².",
    "Interpret the second derivative as acceleration and as a rate of change of slope.",
    "Spot repeating patterns, such as in derivatives of sin x.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
    { slug: "concavity", name: "Concavity", description: "Whether a function's rate of change is increasing (concave up) or decreasing (concave down).", subject: "subj_math" },
  ],
  blocks: [
    def("Notation", r`$f''(x) = \frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right)$; then $f'''(x)$ and $f^{(n)}(x)$. If $s(t)$ is position, $s'(t) = v(t)$ is velocity and $s''(t) = a(t)$ is acceleration.`),
    example(r`$f(x) = x^4$`, [
      [r`f' = 4x^3,\ f'' = 12x^2`, ""],
      [r`f''' = 24x,\ f^{(4)} = 24,\ f^{(5)} = 0`, "Every derivative after the fourth is 0."],
    ]),
    example(r`Derivatives of $\sin x$ repeat every 4`, [
      [r`\sin x \to \cos x \to -\sin x \to -\cos x \to \sin x`, ""],
      [r`27 = 4 \cdot 6 + 3 \Rightarrow f^{(27)}(x) = -\cos x`, ""],
    ]),
    example(r`$s(t) = t^3 - 6t^2$ meters`, [
      [r`v(t) = 3t^2 - 12t,\ a(t) = 6t - 12`, ""],
      [r`a(3) = 6 \text{ m/s}^2`, ""],
    ]),
    activity("derivative-graph", { title: "Read f″ from the slope of f′", params: { fn: "quartic", a: 0.8 } }),
    callout("tip", "Try this", r`Where the lower graph $f'$ is increasing, $f''$ is positive and $f$ is concave up. Find the two points where $f''(a) = 0$ for $\frac{1}{4}x^4 - x^2$ (at $x = \pm\sqrt{2/3} \approx \pm 0.82$).`, "experiment"),
    callout("application", "Where this shows up", r`Engineers limit "jerk", the third derivative of position, in elevators and trains because sudden changes in acceleration feel uncomfortable.`),
  ],
  questions: [
    num(1, r`If $f(x) = x^5$, find $f'''(1)$.`, 60, {}, [], r`$f''' = 60x^2$.`),
    num(2, r`If $f(x) = e^{2x}$, find $f''(0)$.`, 4, {}, [], r`$f'' = 4e^{2x}$.`),
    mc(2, r`$\frac{d^{30}}{dx^{30}}\cos x$ is…`, [r`$\cos x$`, r`$-\cos x$`, r`$\sin x$`, r`$-\sin x$`], 1, [r`$30 = 4 \cdot 7 + 2$.`], r`The second derivative of $\cos x$ is $-\cos x$.`),
    num(3, r`For $x^2 + y^2 = 25$, $y'' = -\frac{25}{y^3}$. Find $y''$ at $(0, 5)$.`, -0.2, { tolerance: 0.001 }, [], r`$-\frac{25}{125} = -0.2$: the top of the circle is concave down.`, "review"),
  ],
});
