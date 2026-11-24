import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polar-area-two-curves",
  title: "Finding the area of the region bounded by two polar curves",
  summary: "Find areas inside one polar curve and outside another with ½∫(R² − r²) dθ, using intersection angles as limits.",
  minutes: 30,
  objectives: [
    "Find intersection angles by setting the r-values equal.",
    "Set up A = ½∫ (outer² − inner²) dθ.",
    "Check for intersections at the pole, which may not show up algebraically.",
  ],
  concepts: [
    { slug: "polar-coordinates", name: "Polar coordinates", description: "Locating points by distance r from the pole and angle θ.", subject: "subj_math" },
  ],
  blocks: [
    def("Between two curves", r`If $R(\theta) \ge r(\theta) \ge 0$ for $\alpha \le \theta \le \beta$, the area between them is $\frac{1}{2}\int_\alpha^\beta \left[R(\theta)^2 - r(\theta)^2\right]d\theta$. Square first, then subtract, just as with washers.`),
    example(r`Inside $r = 3\sin\theta$ and outside $r = 1 + \sin\theta$`, [
      [r`3\sin\theta = 1 + \sin\theta \Rightarrow \sin\theta = \tfrac{1}{2}`, ""],
      [r`\theta = \tfrac{\pi}{6},\ \tfrac{5\pi}{6}`, ""],
      [r`\tfrac{1}{2}\int_{\pi/6}^{5\pi/6} \left[9\sin^2\theta - (1 + \sin\theta)^2\right]d\theta = \pi`, ""],
    ]),
    callout("warning", "The pole", r`Two curves can both pass through the pole at different θ-values; setting them equal won't find that intersection. Sketch first.`),
    callout("application", "Where this shows up", r`The area covered by one antenna but not another, both with polar coverage patterns, is an area between polar curves.`),
  ],
  questions: [
    num(1, r`Find the area inside $r = 2$ and outside $r = 1$, to three decimal places.`, 9.425, { tolerance: 0.002 }, [], r`$\frac{1}{2}\int_0^{2\pi}(4 - 1)\,d\theta = 3\pi$.`),
    mc(2, r`Where do $r = 1$ and $r = 2\cos\theta$ intersect (for $-\pi < \theta \le \pi$)?`, [r`$\theta = \pm\frac{\pi}{6}$`, r`$\theta = \pm\frac{\pi}{3}$`, r`$\theta = \pm\frac{\pi}{4}$`, r`$\theta = 0$`], 1, [], r`$\cos\theta = \frac{1}{2}$.`),
    num(2, r`Find the area inside $r = 2\cos\theta$ and outside $r = 1$, to three decimal places.`, 1.913, { tolerance: 0.002 }, [r`$\frac{1}{2}\int_{-\pi/3}^{\pi/3}(4\cos^2\theta - 1)\,d\theta$.`], r`$\frac{\pi}{3} + \frac{\sqrt{3}}{2} \approx 1.913$.`),
    mc(3, r`In $\frac{1}{2}\int (R^2 - r^2)\,d\theta$, a student writes $\frac{1}{2}\int (R - r)^2\,d\theta$. The error is…`, ["wrong limits", "squaring the difference instead of subtracting squares", "missing the ½", "nothing"], 1, [], r`Same mistake as with washers.`, "review"),
  ],
});
