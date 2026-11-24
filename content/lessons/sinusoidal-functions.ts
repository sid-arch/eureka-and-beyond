import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sinusoidal-functions",
  title: "Sinusoidal functions",
  summary: "Treat sine and cosine as sinusoidal functions: their period, amplitude and midline, where they increase and decrease, their concavity, and how cosine is a shifted sine.",
  minutes: 25,
  objectives: [
    "State the period, amplitude, midline, domain and range of y = sin θ and y = cos θ.",
    "Identify intervals where sine and cosine increase, decrease, and are concave up or down.",
    "Show that cos θ = sin(θ + π/2), so cosine is a horizontal shift of sine.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  formulas: ["sinusoid"],
  blocks: [
    def("Sinusoidal function", r`A sinusoidal function is any transformation of $y = \sin\theta$. Both $\sin\theta$ and $\cos\theta$ have period $2\pi$, amplitude 1, midline $y = 0$, domain all reals and range $[-1, 1]$.`),
    def("Cosine is a shifted sine", r`$\cos\theta = \sin\left(\theta + \frac{\pi}{2}\right)$: the cosine graph is the sine graph shifted $\frac{\pi}{2}$ to the left.`),
    example(r`Behavior of $\sin\theta$ on $[0, 2\pi]$`, [
      [r`\text{increasing on } \left[0, \tfrac{\pi}{2}\right] \cup \left[\tfrac{3\pi}{2}, 2\pi\right]`, ""],
      [r`\text{decreasing on } \left[\tfrac{\pi}{2}, \tfrac{3\pi}{2}\right]`, ""],
      [r`\text{concave down on } (0, \pi)`, ""],
      [r`\text{concave up on } (\pi, 2\pi)`, "Inflection points where the graph crosses the midline."],
    ]),
    activity("sinusoid", { title: "Shift sine into cosine", params: { A: 1, B: 1, C: -1.6, D: 0 } }),
    callout("tip", "Try this", r`With $C \approx -\frac{\pi}{2} \approx -1.57$, the graph of $\sin(x - C)$ starts at its maximum, just like $\cos x$. The sim rounds $C$ to 0.1, so this is approximate.`, "experiment"),
    callout("application", "Where this shows up", r`Rates of change matter in context: a sinusoid changes fastest at the midline and slowest at its peaks, which is why tides rise fastest halfway between low and high tide.`),
  ],
  questions: [
    mc(1, r`What is the period of $y = \cos\theta$?`, [r`$\pi$`, r`$2\pi$`, r`$\frac{\pi}{2}$`, "1"], 1, [], r`$2\pi$.`),
    mc(2, r`On which interval is $y = \cos\theta$ decreasing?`, [r`$[0, \pi]$`, r`$[\pi, 2\pi]$`, r`$\left[\frac{\pi}{2}, \frac{3\pi}{2}\right]$`, r`$\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]$`], 0, [], r`Cosine falls from 1 at 0 to −1 at $\pi$.`),
    mc(2, r`Which equals $\cos\theta$ for all $\theta$?`, [r`$\sin\left(\theta - \frac{\pi}{2}\right)$`, r`$\sin\left(\theta + \frac{\pi}{2}\right)$`, r`$-\sin\theta$`, r`$\sin(2\theta)$`], 1, ["Check θ = 0."], r`$\sin\frac{\pi}{2} = 1 = \cos 0$, and the shift works for all $\theta$.`),
    mc(3, r`Where is $y = \sin\theta$ changing fastest?`, ["At its maximum", "At its minimum", "Where it crosses the midline", "It changes at a constant rate"], 2, [], r`The graph is steepest at the midline crossings (slope ±1) and flat at the extremes.`, "review"),
  ],
});
