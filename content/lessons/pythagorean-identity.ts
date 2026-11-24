import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "pythagorean-identity",
  title: "The Pythagorean identity",
  summary: "Prove sin²θ + cos²θ = 1 from the unit circle and use it to find one trig value from another, given the quadrant.",
  minutes: 25,
  objectives: [
    "Prove the Pythagorean identity using the unit circle.",
    "Find sin θ, cos θ or tan θ from one known value and the quadrant.",
    "Derive the related identities 1 + tan²θ = sec²θ and 1 + cot²θ = csc²θ.",
  ],
  concepts: [
    { slug: "trig-identities", name: "Trigonometric identities", description: "Equations involving trig functions that are true for every allowed angle.", subject: "subj_math" },
  ],
  formulas: ["pythagorean-identity"],
  blocks: [
    text(r`The point at angle $\theta$ on the unit circle is $(\cos\theta, \sin\theta)$, and it lies on $x^2 + y^2 = 1$. Substituting gives the identity for every angle.`),
    def("Pythagorean identity", r`$\sin^2\theta + \cos^2\theta = 1$. Dividing by $\cos^2\theta$ gives $\tan^2\theta + 1 = \sec^2\theta$; dividing by $\sin^2\theta$ gives $1 + \cot^2\theta = \csc^2\theta$.`),
    activity("unit-circle", { title: "The point stays on x² + y² = 1" }),
    example(r`$\sin\theta = \tfrac{3}{5}$ with $\theta$ in Quadrant II. Find $\cos\theta$ and $\tan\theta$.`, [
      [r`\cos^2\theta = 1 - \tfrac{9}{25} = \tfrac{16}{25}`, ""],
      [r`\cos\theta = -\tfrac{4}{5}`, "Cosine is negative in Quadrant II."],
      [r`\tan\theta = \tfrac{3/5}{-4/5} = -\tfrac{3}{4}`, ""],
    ]),
    callout("warning", "Choose the sign by quadrant", r`Taking a square root gives ±. Sine is positive in Quadrants I and II, cosine in I and IV, tangent in I and III.`),
    callout("application", "Where this shows up", r`Physics resolves forces into components whose squares add to the whole; signal processing, navigation and computer graphics use this identity to keep rotations accurate.`),
  ],
  questions: [
    num(1, r`If $\cos\theta = 0.6$, what is $\sin^2\theta$?`, 0.64, {}, [], r`$1 - 0.36 = 0.64$.`),
    short(2, r`$\cos\theta = -\frac{5}{13}$ in Quadrant III. Find $\sin\theta$.`, ["-12/13"], [], r`$\sin^2\theta = \frac{144}{169}$, negative in QIII: $-\frac{12}{13}$.`),
    short(2, r`With the same angle, find $\tan\theta$.`, ["12/5"], [], r`$\frac{-12/13}{-5/13} = \frac{12}{5}$.`),
    mc(3, r`Simplify $\frac{1 - \cos^2\theta}{\sin\theta}$ (sin θ ≠ 0).`, [r`$\cos\theta$`, r`$\sin\theta$`, r`$1$`, r`$\tan\theta$`], 1, [], r`$\frac{\sin^2\theta}{\sin\theta} = \sin\theta$.`, "review"),
  ],
});
