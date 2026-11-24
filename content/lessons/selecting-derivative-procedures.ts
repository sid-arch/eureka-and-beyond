import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "selecting-derivative-procedures",
  title: "Selecting procedures for calculating derivatives",
  summary: "Plan a derivative before computing it: simplify first, identify the outermost structure, and apply product, quotient and chain rules in the right order.",
  minutes: 25,
  objectives: [
    "Identify the outermost operation (sum, product, quotient or composition).",
    "Simplify or rewrite expressions before differentiating when it helps.",
    "Combine rules correctly in multi-step derivatives.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["derivative-rules", "chain-rule"],
  blocks: [
    def("A plan", r`1. Can you rewrite it simpler (split a fraction, use log properties, negative exponents)? 2. What's the last operation you'd do to compute it? That's the outermost rule. 3. Work inward, applying the Chain Rule at each layer.`),
    example(r`$f(x) = x^2 e^{3x}$`, [
      [r`\text{outermost: product}`, ""],
      [r`2x e^{3x} + x^2 \cdot 3e^{3x}`, "Chain Rule inside the second term."],
      [r`= xe^{3x}(2 + 3x)`, ""],
    ]),
    example(r`$g(x) = \ln\dfrac{x^2}{\sqrt{x + 1}}$`, [
      [r`= 2\ln x - \tfrac{1}{2}\ln(x + 1)`, "Log properties first."],
      [r`g'(x) = \frac{2}{x} - \frac{1}{2(x + 1)}`, "Much easier than the Quotient Rule inside a log."],
    ]),
    callout("tip", "Check the structure", r`$\sin^2 x$ means $(\sin x)^2$ (power outside), while $\sin(x^2)$ has the power inside. Their derivatives are $2\sin x\cos x$ and $2x\cos(x^2)$.`),
    callout("application", "Where this shows up", r`Real models combine pieces: a damped vibration $e^{-0.1t}\cos(2t)$ needs both the Product and Chain Rules to find its velocity.`),
  ],
  questions: [
    num(1, r`Find $\frac{d}{dx}\ln(x^2 + 1)$ at $x = 1$.`, 1, {}, [], r`$\frac{2x}{x^2 + 1} = 1$.`),
    num(2, r`Find $\frac{d}{dx}\sin^2 x$ at $x = \frac{\pi}{4}$.`, 1, { tolerance: 0.001 }, [], r`$2\sin x\cos x = \sin 2x = 1$.`),
    num(2, r`Find $\frac{d}{dt}\left[e^{-0.1t}\cos 2t\right]$ at $t = 0$.`, -0.1, { tolerance: 0.001 }, [], r`$-0.1e^{-0.1t}\cos 2t - 2e^{-0.1t}\sin 2t = -0.1$ at 0.`),
    mc(3, r`What is the outermost rule for $\dfrac{x}{(x^2 + 1)^3}$?`, ["Chain Rule", "Quotient Rule (or Product Rule with a negative power)", "Power Rule", "Sum Rule"], 1, [], r`It's a quotient; the Chain Rule appears inside for $(x^2 + 1)^3$.`, "review"),
  ],
});
