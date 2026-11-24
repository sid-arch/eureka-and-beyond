import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "secant-cosecant-cotangent",
  title: "The secant, cosecant and cotangent functions",
  summary: "Define secant, cosecant and cotangent as reciprocals of cosine, sine and tangent, evaluate them, and locate their asymptotes, domains and ranges.",
  minutes: 25,
  objectives: [
    "Evaluate sec θ, csc θ and cot θ from sine, cosine and tangent values.",
    "Find where each reciprocal function is undefined and has vertical asymptotes.",
    "Describe the ranges of secant and cosecant.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  formulas: ["trig-identities"],
  blocks: [
    def("Reciprocal functions", r`$\sec\theta = \frac{1}{\cos\theta}$, $\csc\theta = \frac{1}{\sin\theta}$, $\cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}$.`),
    def("Where they're undefined", r`Secant has vertical asymptotes where $\cos\theta = 0$ ($\theta = \frac{\pi}{2} + k\pi$). Cosecant and cotangent have them where $\sin\theta = 0$ ($\theta = k\pi$).`),
    def("Ranges", r`Because $|\cos\theta| \le 1$, $|\sec\theta| \ge 1$; the same holds for cosecant. Cotangent takes every real value.`),
    example(r`Evaluate at $\theta = \frac{\pi}{3}$`, [
      [r`\cos\tfrac{\pi}{3} = \tfrac{1}{2} \Rightarrow \sec\tfrac{\pi}{3} = 2`, ""],
      [r`\sin\tfrac{\pi}{3} = \tfrac{\sqrt{3}}{2} \Rightarrow \csc\tfrac{\pi}{3} = \tfrac{2}{\sqrt{3}} \approx 1.155`, ""],
      [r`\tan\tfrac{\pi}{3} = \sqrt{3} \Rightarrow \cot\tfrac{\pi}{3} = \tfrac{1}{\sqrt{3}} \approx 0.577`, ""],
    ]),
    callout("tip", "Sketch from the reciprocal", r`To sketch $y = \sec x$, sketch $y = \cos x$ first. Where cosine is 0, draw asymptotes; where cosine is ±1, secant touches it; elsewhere secant is farther from the axis.`),
    callout("application", "Where this shows up", r`In surveying and optics, the secant of an angle gives the slant distance per unit of horizontal distance, for example the length of a ramp per meter of floor it covers.`),
  ],
  questions: [
    num(1, r`Find $\sec 0$.`, 1, {}, [], r`$\frac{1}{\cos 0} = 1$.`),
    num(1, r`Find $\csc\frac{\pi}{6}$.`, 2, {}, [], r`$\sin\frac{\pi}{6} = \frac{1}{2}$, so $\csc = 2$.`),
    num(2, r`If $\sin\theta = 0.4$, find $\csc\theta$.`, 2.5, { tolerance: 0.001 }, [], r`$\frac{1}{0.4} = 2.5$.`),
    mc(2, r`Where does $y = \cot x$ have vertical asymptotes?`, [r`$x = \frac{\pi}{2} + k\pi$`, r`$x = k\pi$`, r`$x = 2k\pi$`, "Nowhere"], 1, [], r`$\cot x = \frac{\cos x}{\sin x}$ is undefined where $\sin x = 0$.`),
    mc(3, r`Which value can $\sec\theta$ never equal?`, ["−3", "1", "0.5", "2"], 2, [], r`$|\sec\theta| \ge 1$ always.`, "review"),
  ],
});
