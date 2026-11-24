import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sum-difference-formulas",
  title: "Sum and difference formulas",
  summary: "Use the sum and difference formulas for sine, cosine and tangent to find exact values and verify identities.",
  minutes: 30,
  objectives: [
    "State the sum and difference formulas for sine, cosine and tangent.",
    "Find exact values such as sin 75° and cos 15°.",
    "Use the formulas to simplify expressions and verify identities.",
  ],
  concepts: [
    { slug: "trig-identities", name: "Trigonometric identities", description: "Equations involving trig functions that are true for every allowed angle.", subject: "subj_math" },
  ],
  formulas: ["trig-identities"],
  blocks: [
    def("Formulas", r`$\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B$. $\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B$. $\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$.`),
    callout("warning", "Not distributive", r`$\sin(A + B) \ne \sin A + \sin B$. Check: $\sin(30^\circ + 60^\circ) = 1$, but $\sin 30^\circ + \sin 60^\circ \approx 1.37$.`),
    example(r`Find $\sin 75^\circ$ exactly`, [
      [r`\sin(45^\circ + 30^\circ) = \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ`, ""],
      [r`= \tfrac{\sqrt{2}}{2}\cdot\tfrac{\sqrt{3}}{2} + \tfrac{\sqrt{2}}{2}\cdot\tfrac{1}{2} = \tfrac{\sqrt{6} + \sqrt{2}}{4}`, r`$\approx 0.9659$.`],
    ]),
    example(r`Verify $\cos\left(x - \tfrac{\pi}{2}\right) = \sin x$`, [
      [r`\cos x\cos\tfrac{\pi}{2} + \sin x\sin\tfrac{\pi}{2}`, ""],
      [r`= \cos x \cdot 0 + \sin x \cdot 1 = \sin x`, "∎"],
    ]),
    callout("application", "Where this shows up", r`Adding waves (sound, light, AC power) with phase differences uses these formulas, and they're how rotation matrices combine two rotations.`),
  ],
  questions: [
    short(2, r`Find $\cos 15^\circ$ exactly. Use the format (sqrt(6)+sqrt(2))/4.`, ["(sqrt(6)+sqrt(2))/4", "(√6+√2)/4"], [r`$\cos(45^\circ - 30^\circ)$.`], r`$\frac{\sqrt{6} + \sqrt{2}}{4}$.`),
    short(2, r`Find $\sin 15^\circ$ exactly. Use the format (sqrt(6)-sqrt(2))/4.`, ["(sqrt(6)-sqrt(2))/4", "(√6-√2)/4"], [], r`$\sin(45^\circ - 30^\circ) = \frac{\sqrt{6} - \sqrt{2}}{4}$.`),
    mc(2, r`Simplify $\sin 50^\circ\cos 10^\circ + \cos 50^\circ\sin 10^\circ$.`, [r`$\sin 40^\circ$`, r`$\sin 60^\circ$`, r`$\cos 60^\circ$`, r`$\cos 40^\circ$`], 1, [], r`$\sin(50^\circ + 10^\circ) = \sin 60^\circ = \frac{\sqrt{3}}{2}$.`),
    short(3, r`Find $\tan 105^\circ$ exactly. Use the format -2-sqrt(3).`, ["-2-sqrt(3)", "-2-√3"], [r`$\tan(60^\circ + 45^\circ) = \frac{\sqrt{3} + 1}{1 - \sqrt{3}}$.`], r`Rationalizing gives $-2 - \sqrt{3} \approx -3.732$.`, "review"),
  ],
});
