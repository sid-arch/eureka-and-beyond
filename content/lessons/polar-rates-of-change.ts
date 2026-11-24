import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polar-rates-of-change",
  title: "Rates of change in polar functions",
  summary: "Interpret how r changes as θ changes in a polar function: whether points move toward or away from the pole, and average rates of change of r over intervals of θ.",
  minutes: 25,
  objectives: [
    "Compute the average rate of change of r = f(θ) over an interval of θ.",
    "Decide whether points on a polar graph are moving toward or away from the pole.",
    "Connect sign and change of r to the shape of the polar graph.",
  ],
  concepts: [
    { slug: "polar-coordinates", name: "Polar coordinates", description: "Locating points by distance r from the pole and angle θ.", subject: "subj_math" },
    { slug: "rate-of-change", name: "Average rate of change", description: "The change in output divided by the change in input over an interval.", subject: "subj_math" },
  ],
  formulas: ["polar-conversion"],
  blocks: [
    def("Average rate of change of r", r`For $r = f(\theta)$ on $[\alpha, \beta]$, the average rate of change is $\frac{f(\beta) - f(\alpha)}{\beta - \alpha}$: the average change in radius per radian.`),
    def("Toward or away from the pole", r`Distance from the pole is $|r|$. If $r > 0$ and increasing, or $r < 0$ and decreasing, points move away from the pole. If $r > 0$ and decreasing, or $r < 0$ and increasing, they move toward it.`),
    example(r`$r = 3\sin(2\theta)$ on $\left[0, \frac{\pi}{4}\right]$ and $\left[\frac{\pi}{4}, \frac{\pi}{2}\right]$`, [
      [r`r: 0 \to 3`, "Positive and increasing: moving away from the pole."],
      [r`\frac{3 - 0}{\pi/4} = \frac{12}{\pi} \approx 3.82`, "Average rate on the first interval."],
      [r`r: 3 \to 0`, "Positive and decreasing: back toward the pole, finishing one petal."],
    ]),
    activity("polar-graph", { title: "Watch r grow and shrink", params: { kind: "rose", a: 2, b: 3, n: 2 } }),
    callout("tip", "Try this", r`Move $\theta$ slowly and watch the readout of $r$. Where $r$ passes through 0, the curve returns to the pole.`, "experiment"),
    callout("application", "Where this shows up", r`Radar and antenna patterns are polar graphs; how fast the radius changes with angle tells engineers how sharply a signal falls off as you turn away from the main direction.`),
  ],
  questions: [
    num(2, r`For $r = 4\cos\theta$, find the average rate of change of $r$ on $\left[0, \frac{\pi}{3}\right]$, to three decimal places.`, -1.91, { tolerance: 0.002 }, [r`$r(0) = 4$, $r(\pi/3) = 2$.`], r`$\frac{2 - 4}{\pi/3} = -\frac{6}{\pi} \approx -1.910$.`),
    mc(2, r`On an interval where $r < 0$ and $r$ is decreasing, points on the graph are…`, ["moving toward the pole", "moving away from the pole", "fixed", "on the polar axis"], 1, [], r`$|r|$ is increasing.`),
    mc(2, r`For $r = 2 + \cos\theta$ on $[0, \pi]$, points move…`, ["away from the pole", "toward the pole", "away, then toward", "toward, then away"], 1, [], r`$r$ falls from 3 to 1 and stays positive.`),
    num(3, r`For $r = \theta$ (a spiral), what is the average rate of change of $r$ on $[\pi, 3\pi]$?`, 1, {}, [], r`$\frac{3\pi - \pi}{2\pi} = 1$: the radius grows 1 unit per radian.`, "review"),
  ],
});
