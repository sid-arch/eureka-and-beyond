import { callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "tangent-reciprocal-graphs",
  title: "Graphs of tangent and reciprocal functions",
  summary: "Graph tangent, cotangent, secant and cosecant, and identify their periods, asymptotes, domains and ranges.",
  minutes: 30,
  objectives: [
    "Graph y = tan x and find its period and vertical asymptotes.",
    "Graph secant, cosecant and cotangent from their reciprocal functions.",
    "State the domain, range and period of each and transform tangent graphs.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  blocks: [
    def("Tangent", r`$\tan x = \frac{\sin x}{\cos x}$. It's undefined where $\cos x = 0$, so it has vertical asymptotes at $x = \frac{\pi}{2} + k\pi$. Its period is $\pi$, its range is all reals, and it passes through $(0, 0)$ increasing.`),
    def("Reciprocal functions", r`$\csc x = \frac{1}{\sin x}$, $\sec x = \frac{1}{\cos x}$, $\cot x = \frac{1}{\tan x}$. Each has asymptotes where its reciprocal is 0. Secant and cosecant have period $2\pi$ and range $(-\infty, -1] \cup [1, \infty)$; cotangent has period $\pi$.`),
    text(r`To sketch $\sec x$, sketch $\cos x$ lightly first. Wherever cosine is 1 or −1, secant equals it; as cosine shrinks toward 0, secant grows without bound, producing U-shaped branches between asymptotes.`),
    example(r`Find the period and asymptotes of $y = \tan(2x)$`, [
      [r`\text{period} = \tfrac{\pi}{2}`, "Tangent's period π divided by B = 2."],
      [r`2x = \tfrac{\pi}{2} + k\pi \Rightarrow x = \tfrac{\pi}{4} + \tfrac{k\pi}{2}`, "Asymptotes."],
    ]),
    callout("application", "Where this shows up", r`Tangent gives slope from an angle (a ramp's grade), and a rotating lighthouse beam's position along a straight shoreline follows a tangent curve.`),
  ],
  questions: [
    short(1, r`What is the period of $y = \tan x$? Use pi.`, ["pi", "π"], [], r`$\pi$.`),
    mc(2, r`Where does $y = \sec x$ have vertical asymptotes?`, ["Where sin x = 0", "Where cos x = 0", "Where tan x = 1", "Nowhere"], 1, [], r`Where cosine is 0.`),
    mc(2, r`What is the range of $y = \csc x$?`, ["All reals", r`$[-1, 1]$`, r`$(-\infty, -1] \cup [1, \infty)$`, r`$(0, \infty)$`], 2, [], r`The reciprocal of values in $[-1, 1]$ (excluding 0).`),
    short(3, r`What is the period of $y = 3\tan\left(\frac{x}{2}\right)$? Use pi.`, ["2pi", "2π"], [], r`$\pi / \frac{1}{2} = 2\pi$.`, "review"),
  ],
});
