import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "power-rule",
  title: "The Power Rule",
  summary: "Differentiate powers of x, including negative and fractional exponents, by rewriting radicals and reciprocals as powers first.",
  minutes: 20,
  objectives: [
    "Apply d/dx xⁿ = nxⁿ⁻¹ for any real n.",
    "Rewrite radicals and reciprocals as powers before differentiating.",
    "Use the Power Rule to write tangent lines.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["power-rule"],
  blocks: [
    def("Power Rule", r`$\frac{d}{dx}x^n = nx^{n - 1}$ for every real number $n$ (where $x^n$ is defined and differentiable).`),
    example(r`Rewrite, then differentiate`, [
      [r`\frac{d}{dx}x^7 = 7x^6`, ""],
      [r`\frac{1}{x^3} = x^{-3} \Rightarrow -3x^{-4}`, ""],
      [r`\sqrt{x} = x^{1/2} \Rightarrow \tfrac{1}{2}x^{-1/2}`, ""],
      [r`x^{2/3} \Rightarrow \tfrac{2}{3}x^{-1/3}`, ""],
    ]),
    example(r`Tangent line to $y = \sqrt{x}$ at $x = 4$`, [
      [r`y(4) = 2,\ y'(4) = \tfrac{1}{2}(4)^{-1/2} = \tfrac{1}{4}`, ""],
      [r`y = 2 + \tfrac{1}{4}(x - 4)`, ""],
    ]),
    callout("warning", "Rewrite first", r`$\frac{1}{x^3}$ is not differentiated as $\frac{1}{3x^2}$. Convert to $x^{-3}$ first.`),
    callout("application", "Where this shows up", r`The area of a circle $A = \pi r^2$ has $\frac{dA}{dr} = 2\pi r$, the circumference: a thin ring added to a circle has area about circumference × thickness.`),
  ],
  questions: [
    num(1, r`If $f(x) = x^{-2}$, find $f'(1)$.`, -2, {}, [], r`$-2x^{-3}$ at 1 is $-2$.`),
    num(2, r`If $f(x) = \sqrt[3]{x}$, find $f'(8)$ to four decimal places.`, 0.0833, { tolerance: 0.0001 }, [], r`$\frac{1}{3}8^{-2/3} = \frac{1}{12} \approx 0.0833$.`),
    mc(2, r`$\frac{d}{dx}\frac{1}{\sqrt{x}}$ is…`, [r`$\frac{1}{2\sqrt{x}}$`, r`$-\frac{1}{2}x^{-3/2}$`, r`$-\frac{1}{2}x^{-1/2}$`, r`$\frac{-1}{x}$`], 1, [], r`$x^{-1/2} \Rightarrow -\frac{1}{2}x^{-3/2}$.`),
    num(3, r`Find the $y$-intercept of the tangent line to $y = \sqrt{x}$ at $x = 4$.`, 1, {}, [], r`$y = 2 + \frac{1}{4}(x - 4) = \frac{1}{4}x + 1$.`, "review"),
  ],
});
