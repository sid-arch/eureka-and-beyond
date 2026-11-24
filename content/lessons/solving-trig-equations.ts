import { activity, callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-trig-equations",
  title: "Solving trigonometric equations",
  summary: "Solve trig equations on [0, 2π) and in general, using inverse functions, factoring, identities and the periodicity of trig functions.",
  minutes: 30,
  objectives: [
    "Find all solutions in [0, 2π) of linear and quadratic trig equations.",
    "Write general solutions using periodicity.",
    "Use identities and factoring to solve, without dividing out solutions.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Trig functions repeat, so a trig equation usually has infinitely many solutions. Find the solutions in one period, then add multiples of the period: $2\pi$ for sine and cosine, $\pi$ for tangent.`),
    example(r`Solve $2\sin x + 1 = 0$ on $[0, 2\pi)$`, [
      [r`\sin x = -\tfrac{1}{2}`, ""],
      [r`x = \tfrac{7\pi}{6},\ \tfrac{11\pi}{6}`, "Sine is negative in Quadrants III and IV, with reference angle π/6."],
    ], r`General solution: $x = \frac{7\pi}{6} + 2k\pi$ or $x = \frac{11\pi}{6} + 2k\pi$.`),
    example(r`Solve $2\cos^2 x - \cos x - 1 = 0$ on $[0, 2\pi)$`, [
      [r`(2\cos x + 1)(\cos x - 1) = 0`, "Factor like a quadratic in cos x."],
      [r`\cos x = -\tfrac{1}{2} \Rightarrow x = \tfrac{2\pi}{3}, \tfrac{4\pi}{3};\quad \cos x = 1 \Rightarrow x = 0`, ""],
    ]),
    example(r`Solve $\sin 2x = \cos x$ on $[0, 2\pi)$`, [
      [r`2\sin x\cos x - \cos x = 0 \Rightarrow \cos x(2\sin x - 1) = 0`, "Factor; don't divide by cos x."],
      [r`x = \tfrac{\pi}{2}, \tfrac{3\pi}{2}, \tfrac{\pi}{6}, \tfrac{5\pi}{6}`, ""],
    ]),
    activity("sinusoid", { title: "Where does sin x cross a line?", params: { A: 1, B: 1, C: 0, D: 0.5 } }),
    callout("tip", "Try this", r`$y = \sin x + 0.5$ crosses the x-axis where $\sin x = -0.5$. Read the crossings between 0 and 2π and compare with the first example.`, "experiment"),
    callout("application", "Where this shows up", r`Finding when the tide reaches a certain height, when a Ferris wheel car is at a given level, or when AC voltage crosses a threshold means solving trig equations.`),
  ],
  questions: [
    short(1, r`Solve $\cos x = 0$ on $[0, 2\pi)$. Use the format pi/2,3pi/2.`, ["pi/2,3pi/2", "π/2,3π/2"], [], r`$\frac{\pi}{2}, \frac{3\pi}{2}$.`),
    short(2, r`Solve $\tan x = 1$ on $[0, 2\pi)$. Use the format pi/4,5pi/4.`, ["pi/4,5pi/4", "π/4,5π/4"], [], r`$\frac{\pi}{4}, \frac{5\pi}{4}$.`),
    short(2, r`Solve $2\sin^2 x = 1$ on $[0, 2\pi)$. List in order like pi/4,3pi/4,5pi/4,7pi/4.`, ["pi/4,3pi/4,5pi/4,7pi/4", "π/4,3π/4,5π/4,7π/4"], [r`$\sin x = \pm\frac{\sqrt{2}}{2}$.`], r`All four odd multiples of $\frac{\pi}{4}$.`),
    mc(3, r`How many solutions does $\sin 3x = 0$ have on $[0, 2\pi)$?`, ["3", "4", "6", "7"], 2, [r`$3x = k\pi$ for $0 \le 3x < 6\pi$.`], r`$k = 0, 1, \dots, 5$: six solutions.`, "review"),
  ],
});
