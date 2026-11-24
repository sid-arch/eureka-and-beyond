import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "linearization",
  title: "Approximating values of a function using local linearity and linearization",
  summary: "Approximate function values near a point with the tangent line L(x) = f(a) + f′(a)(x − a), and use concavity to tell whether the estimate is too high or too low.",
  minutes: 25,
  objectives: [
    "Write the linearization of f at x = a.",
    "Use it to approximate nearby values.",
    "Decide whether the approximation is an overestimate or underestimate from concavity.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("Linearization", r`$L(x) = f(a) + f'(a)(x - a)$ is the tangent line at $a$. Zoomed in near $a$, a differentiable function looks almost straight, so $f(x) \approx L(x)$ for $x$ near $a$.`),
    example(r`Approximate $\sqrt{26}$`, [
      [r`f(x) = \sqrt{x},\ a = 25`, "Pick a nearby point where f is easy."],
      [r`f(25) = 5,\ f'(25) = \tfrac{1}{2\sqrt{25}} = \tfrac{1}{10}`, ""],
      [r`L(26) = 5 + \tfrac{1}{10}(1) = 5.1`, "Actual value: 5.0990…"],
      [r`f'' < 0 \text{ (concave down)} \Rightarrow \text{overestimate}`, "The tangent line lies above the curve."],
    ]),
    def("Over or under?", r`If $f$ is concave up near $a$, the tangent line lies below the graph: $L$ underestimates. Concave down: $L$ overestimates.`),
    activity("tangent-line", { title: "Zoom in on a tangent line", params: { fn: "x^2" } }),
    callout("tip", "Try this", r`Shrink $h$: near $a$ the curve and tangent line almost coincide. That closeness is local linearity.`, "experiment"),
    callout("application", "Where this shows up", r`Engineers use $\sin\theta \approx \theta$ (the linearization at 0) for small angles in pendulums and optics; financial analysts use linear approximations for small price changes.`),
  ],
  questions: [
    num(1, r`Use the linearization of $e^x$ at 0 to approximate $e^{0.1}$.`, 1.1, { tolerance: 0.001 }, [], r`$L(x) = 1 + x$.`),
    num(2, r`Use the linearization of $x^{10}$ at $x = 1$ to approximate $(1.02)^{10}$.`, 1.2, { tolerance: 0.001 }, [], r`$1 + 10(0.02) = 1.2$ (actual ≈ 1.219).`),
    mc(2, r`Is the estimate $(1.02)^{10} \approx 1.2$ too high or too low?`, ["Too high", "Too low", "Exact", "Can't tell"], 1, [r`$f'' = 90x^8 > 0$.`], r`Concave up: the tangent line underestimates.`),
    num(3, r`$f(3) = 7$ and $f'(3) = -2$. Estimate $f(3.1)$.`, 6.8, { tolerance: 0.001 }, [], r`$7 - 2(0.1) = 6.8$.`, "review"),
  ],
});
