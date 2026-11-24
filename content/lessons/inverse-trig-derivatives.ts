import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inverse-trig-derivatives",
  title: "Differentiating inverse trigonometric functions",
  summary: "Derive and use the derivatives of arcsin x, arccos x and arctan x, combined with the Chain Rule.",
  minutes: 25,
  objectives: [
    "Derive (arcsin x)′ = 1/√(1 − x²) with implicit differentiation.",
    "Use the derivatives of arcsin, arccos and arctan.",
    "Combine them with the Chain Rule.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["inverse-derivatives"],
  blocks: [
    example(r`Derive $\frac{d}{dx}\arcsin x$`, [
      [r`y = \arcsin x \iff \sin y = x,\ -\tfrac{\pi}{2} \le y \le \tfrac{\pi}{2}`, ""],
      [r`\cos y \cdot y' = 1 \Rightarrow y' = \frac{1}{\cos y}`, ""],
      [r`\cos y = \sqrt{1 - x^2}`, "cos y ≥ 0 on this interval."],
    ]),
    def("Derivatives", r`$(\arcsin x)' = \frac{1}{\sqrt{1 - x^2}}$, $(\arccos x)' = -\frac{1}{\sqrt{1 - x^2}}$, $(\arctan x)' = \frac{1}{1 + x^2}$.`),
    example(r`With the Chain Rule`, [
      [r`\frac{d}{dx}\arctan(2x) = \frac{2}{1 + 4x^2}`, ""],
      [r`\frac{d}{dx}\arcsin(x^2) = \frac{2x}{\sqrt{1 - x^4}}`, ""],
    ]),
    callout("application", "Where this shows up", r`An observer watching a rocket rise from a distance $d$ sees it at angle $\theta = \arctan\frac{h}{d}$; the rate the angle changes uses $(\arctan u)'$.`),
  ],
  questions: [
    num(1, r`Find the derivative of $\arctan x$ at $x = 1$.`, 0.5, { tolerance: 0.001 }, [], r`$\frac{1}{1 + 1} = 0.5$.`),
    num(1, r`Find the derivative of $\arccos x$ at $x = 0$.`, -1, {}, [], r`$-\frac{1}{\sqrt{1}} = -1$.`),
    num(2, r`Find $\frac{d}{dx}\arcsin\frac{x}{2}$ at $x = 1$, to three decimal places.`, 0.577, { tolerance: 0.001 }, [r`Chain factor $\frac{1}{2}$.`], r`$\frac{1/2}{\sqrt{1 - 1/4}} = \frac{1}{\sqrt{3}} \approx 0.577$.`),
    mc(3, r`What is the domain of $(\arcsin x)'$?`, [r`$[-1, 1]$`, r`$(-1, 1)$`, "All reals", r`$x \ne 0$`], 1, [], r`At $x = \pm 1$ the denominator is 0.`, "review"),
  ],
});
