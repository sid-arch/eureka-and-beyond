import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "fundamental-identities",
  title: "Fundamental identities",
  summary: "Use reciprocal, quotient, Pythagorean, even-odd and cofunction identities to simplify expressions and verify identities.",
  minutes: 30,
  objectives: [
    "State the reciprocal, quotient, Pythagorean, even-odd and cofunction identities.",
    "Simplify trigonometric expressions.",
    "Verify identities by transforming one side into the other.",
  ],
  concepts: [
    { slug: "trig-identities", name: "Trigonometric identities", description: "Equations involving trig functions that are true for every allowed angle.", subject: "subj_math" },
  ],
  formulas: ["pythagorean-identity"],
  blocks: [
    def("Core identities", r`Reciprocal: $\csc\theta = \frac{1}{\sin\theta}$, $\sec\theta = \frac{1}{\cos\theta}$, $\cot\theta = \frac{1}{\tan\theta}$. Quotient: $\tan\theta = \frac{\sin\theta}{\cos\theta}$. Pythagorean: $\sin^2\theta + \cos^2\theta = 1$, $1 + \tan^2\theta = \sec^2\theta$, $1 + \cot^2\theta = \csc^2\theta$. Even-odd: $\cos(-\theta) = \cos\theta$, $\sin(-\theta) = -\sin\theta$. Cofunction: $\sin\left(\frac{\pi}{2} - \theta\right) = \cos\theta$.`),
    example(r`Simplify $\dfrac{\sec\theta - \cos\theta}{\tan\theta}$`, [
      [r`\frac{\frac{1}{\cos\theta} - \cos\theta}{\tan\theta} = \frac{\frac{1 - \cos^2\theta}{\cos\theta}}{\frac{\sin\theta}{\cos\theta}}`, ""],
      [r`= \frac{\sin^2\theta}{\sin\theta} = \sin\theta`, ""],
    ]),
    example(r`Verify $\dfrac{1}{1 - \sin x} + \dfrac{1}{1 + \sin x} = 2\sec^2 x$`, [
      [r`\frac{(1 + \sin x) + (1 - \sin x)}{1 - \sin^2 x}`, "Common denominator."],
      [r`= \frac{2}{\cos^2 x} = 2\sec^2 x`, "∎"],
    ]),
    callout("tip", "Strategies", r`Work on the more complicated side. Rewrite everything in sines and cosines. Combine fractions. Look for $1 - \sin^2 x$ and similar Pythagorean patterns. Never move terms across the equals sign; transform one side only.`),
    callout("application", "Where this shows up", r`Identities simplify formulas in physics and engineering and are essential in calculus for integrals involving trig functions.`),
  ],
  questions: [
    mc(1, r`Simplify $\tan\theta\cos\theta$.`, [r`$\sin\theta$`, r`$\cos\theta$`, r`$1$`, r`$\sec\theta$`], 0, [], r`$\frac{\sin\theta}{\cos\theta}\cos\theta = \sin\theta$.`),
    mc(2, r`Simplify $\sec^2 x - \tan^2 x$.`, ["0", "1", r`$\sec x$`, r`$-1$`], 1, [], r`From $1 + \tan^2 x = \sec^2 x$.`),
    short(2, r`Simplify $\sin(-x)\csc x$. Enter a number.`, ["-1"], [], r`$-\sin x \cdot \frac{1}{\sin x} = -1$.`),
    mc(3, r`Simplify $\frac{\cos^2 x}{1 - \sin x}$.`, [r`$1 - \sin x$`, r`$1 + \sin x$`, r`$\cos x$`, r`$\sin x$`], 1, [r`$\cos^2 x = (1 - \sin x)(1 + \sin x)$.`], r`$1 + \sin x$.`, "review"),
  ],
});
