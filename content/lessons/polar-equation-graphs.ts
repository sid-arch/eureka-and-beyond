import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polar-equation-graphs",
  title: "Graphs of polar equations",
  summary: "Graph circles, limaçons, cardioids, roses and spirals in polar form, using symmetry, zeros and maximum r.",
  minutes: 30,
  objectives: [
    "Graph polar equations by tables and by recognizing families.",
    "Classify limaçons by comparing a and b, and count rose petals.",
    "Use symmetry tests and the maximum value of |r|.",
  ],
  concepts: [
    { slug: "polar-coordinates", name: "Polar coordinates", description: "Locating points by distance r from the pole and angle θ.", subject: "subj_math" },
  ],
  formulas: ["polar-conversion"],
  blocks: [
    def("Families", r`Circles: $r = a$, $r = 2a\cos\theta$, $r = 2a\sin\theta$. Limaçons $r = a + b\cos\theta$: inner loop if $a < b$, cardioid if $a = b$, dimpled if $b < a < 2b$, convex if $a \ge 2b$. Roses $r = b\cos(n\theta)$: $n$ petals if $n$ is odd, $2n$ if even. Spiral of Archimedes: $r = c\theta$.`),
    activity("polar-graph", { title: "Explore the families", params: { kind: "limacon", a: 1, b: 2 } }),
    callout("tip", "Try this", r`Start with $a = 1$, $b = 2$ (inner loop) and raise $a$ to 2 (cardioid), 3 (dimpled), then 4 (convex). Switch to roses and compare $n = 3$ and $n = 4$.`, "experiment"),
    example(r`Describe $r = 3 + 3\sin\theta$`, [
      [r`a = b = 3`, "A cardioid."],
      [r`\text{symmetric about } \theta = \tfrac{\pi}{2}`, "Sine-based: vertical symmetry."],
      [r`\max r = 6 \text{ at } \theta = \tfrac{\pi}{2};\ r = 0 \text{ at } \theta = \tfrac{3\pi}{2}`, ""],
    ]),
    callout("application", "Where this shows up", r`Many microphone pickup patterns are cardioids, antennas have rose-like radiation lobes, and spirals describe shells, galaxies and record grooves.`),
  ],
  questions: [
    num(1, r`How many petals does $r = 5\cos(3\theta)$ have?`, 3, {}, [], r`Odd n: 3 petals.`),
    num(2, r`How many petals does $r = 2\sin(4\theta)$ have?`, 8, {}, [], r`Even n: 8 petals.`),
    mc(2, r`Classify $r = 2 + 5\cos\theta$.`, ["Cardioid", "Limaçon with inner loop", "Dimpled limaçon", "Circle"], 1, [], r`$a = 2 < b = 5$: inner loop.`),
    num(3, r`What is the maximum value of r for $r = 4 - 4\cos\theta$?`, 8, {}, [], r`At $\theta = \pi$: $4 + 4 = 8$.`, "review"),
  ],
});
