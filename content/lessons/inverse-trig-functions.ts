import { callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inverse-trig-functions",
  title: "Inverse trigonometric functions",
  summary: "Define arcsine, arccosine and arctangent on restricted domains, evaluate them exactly and with a calculator, and evaluate compositions.",
  minutes: 30,
  objectives: [
    "Explain why sine, cosine and tangent need restricted domains to have inverses.",
    "Evaluate inverse trig functions, giving answers in the correct range.",
    "Evaluate compositions such as sin(arccos x) using right triangles.",
  ],
  concepts: [
    { slug: "inverse-trig", name: "Inverse trigonometric functions", description: "Functions that return an angle from a trigonometric ratio.", subject: "subj_math" },
  ],
  blocks: [
    def("Restricted ranges", r`$\sin^{-1} x$ (arcsin) returns an angle in $\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$ for $x \in [-1, 1]$. $\cos^{-1} x$ returns an angle in $[0, \pi]$. $\tan^{-1} x$ returns an angle in $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$ for any real $x$.`),
    example(r`Evaluate $\sin^{-1}\left(-\tfrac{1}{2}\right)$, $\cos^{-1}\left(-\tfrac{\sqrt{2}}{2}\right)$, $\tan^{-1}\sqrt{3}$`, [
      [r`-\tfrac{\pi}{6}`, "In [−π/2, π/2]: not 7π/6."],
      [r`\tfrac{3\pi}{4}`, "In [0, π]."],
      [r`\tfrac{\pi}{3}`, ""],
    ]),
    example(r`Evaluate $\sin\left(\cos^{-1}\tfrac{3}{5}\right)$`, [
      [r`\theta = \cos^{-1}\tfrac{3}{5},\ \text{adj } 3,\ \text{hyp } 5`, "θ is in Quadrant I."],
      [r`\text{opp} = 4 \Rightarrow \sin\theta = \tfrac{4}{5}`, ""],
    ]),
    callout("warning", "sin(sin⁻¹ x) vs sin⁻¹(sin x)", r`$\sin(\sin^{-1} x) = x$ for $x \in [-1, 1]$, but $\sin^{-1}(\sin x) = x$ only for $x \in \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$. For example $\sin^{-1}(\sin \pi) = 0$.`),
    callout("application", "Where this shows up", r`Navigation and robotics compute headings with arctangent (often atan2), and surveying finds angles from measured lengths.`),
  ],
  questions: [
    short(1, r`Evaluate $\cos^{-1} 0$. Use the format pi/2.`, ["pi/2", "π/2"], [], r`$\frac{\pi}{2}$.`),
    short(2, r`Evaluate $\sin^{-1}\left(\frac{\sqrt{3}}{2}\right)$. Use the format pi/3.`, ["pi/3", "π/3"], [], r`$\frac{\pi}{3}$.`),
    mc(2, r`What is $\tan^{-1}(-1)$?`, [r`$\frac{3\pi}{4}$`, r`$-\frac{\pi}{4}$`, r`$\frac{7\pi}{4}$`, r`$\frac{\pi}{4}$`], 1, ["The range is (−π/2, π/2)."], r`$-\frac{\pi}{4}$.`),
    short(2, r`Evaluate $\cos\left(\tan^{-1}\frac{5}{12}\right)$. Enter a fraction.`, ["12/13"], [], r`Opp 5, adj 12, hyp 13: $\frac{12}{13}$.`),
    num(3, r`Evaluate $\sin^{-1}(\sin\frac{5\pi}{6})$ as a decimal multiple of π (for π/6, enter 0.1667).`, 1 / 6, { tolerance: 0.001 }, [r`$\sin\frac{5\pi}{6} = \frac{1}{2}$.`], r`$\sin^{-1}\frac{1}{2} = \frac{\pi}{6}$, not $\frac{5\pi}{6}$.`, "review"),
  ],
});
