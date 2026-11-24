import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "double-angle-formulas",
  title: "Double-angle formulas",
  summary: "Derive the double-angle formulas from the sum formulas, use the three forms of cos 2θ, and find exact values and simplify expressions, including half-angle formulas.",
  minutes: 30,
  objectives: [
    "Derive sin 2θ and cos 2θ from the sum formulas.",
    "Use the three forms of cos 2θ and the power-reducing and half-angle formulas.",
    "Find exact values of sin 2θ and cos 2θ given one trig value and a quadrant.",
  ],
  concepts: [
    { slug: "trig-identities", name: "Trigonometric identities", description: "Equations involving trig functions that are true for every allowed angle.", subject: "subj_math" },
  ],
  formulas: ["trig-identities"],
  blocks: [
    def("Double-angle formulas", r`Set $B = A$ in the sum formulas: $\sin 2\theta = 2\sin\theta\cos\theta$; $\cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta$; $\tan 2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}$.`),
    def("Power-reducing and half-angle", r`Solving the cosine forms: $\cos^2\theta = \frac{1 + \cos 2\theta}{2}$ and $\sin^2\theta = \frac{1 - \cos 2\theta}{2}$. So $\sin\frac{\theta}{2} = \pm\sqrt{\frac{1 - \cos\theta}{2}}$, with the sign set by the quadrant of $\frac{\theta}{2}$.`),
    example(r`$\sin\theta = \tfrac{4}{5}$, $\theta$ in Quadrant II. Find $\sin 2\theta$ and $\cos 2\theta$.`, [
      [r`\cos\theta = -\tfrac{3}{5}`, ""],
      [r`\sin 2\theta = 2\left(\tfrac{4}{5}\right)\left(-\tfrac{3}{5}\right) = -\tfrac{24}{25}`, ""],
      [r`\cos 2\theta = \tfrac{9}{25} - \tfrac{16}{25} = -\tfrac{7}{25}`, r`Check: $\left(\frac{24}{25}\right)^2 + \left(\frac{7}{25}\right)^2 = 1$. ✓`],
    ]),
    callout("application", "Where this shows up", r`A projectile's range $R = \frac{v^2\sin 2\theta}{g}$ uses a double angle; it's largest when $2\theta = 90^\circ$, so a $45^\circ$ launch goes farthest (ignoring air resistance).`),
  ],
  questions: [
    mc(1, r`Which equals $2\sin 15^\circ\cos 15^\circ$?`, [r`$\sin 30^\circ$`, r`$\cos 30^\circ$`, r`$\sin 15^\circ$`, r`$2\sin 30^\circ$`], 0, [], r`$\sin 30^\circ = \frac{1}{2}$.`),
    short(2, r`$\cos\theta = \frac{5}{13}$, θ in Quadrant I. Find $\sin 2\theta$.`, ["120/169"], [r`$\sin\theta = \frac{12}{13}$.`], r`$2 \cdot \frac{12}{13} \cdot \frac{5}{13} = \frac{120}{169}$.`),
    short(2, r`With the same θ, find $\cos 2\theta$.`, ["-119/169"], [], r`$\frac{25 - 144}{169} = -\frac{119}{169}$.`),
    mc(3, r`Simplify $1 - 2\sin^2(3x)$.`, [r`$\cos 6x$`, r`$\cos 3x$`, r`$\sin 6x$`, r`$\cos^2 3x$`], 0, [], r`$\cos(2 \cdot 3x)$.`, "review"),
  ],
});
