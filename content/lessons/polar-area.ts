import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polar-area",
  title: "Finding the area of a polar region or the area bounded by a single polar curve",
  summary: "Find areas swept out by polar curves with A = ½∫r² dθ, choosing θ-limits that trace the region exactly once.",
  minutes: 30,
  objectives: [
    "Derive A = ½∫ r² dθ from sector areas.",
    "Choose limits that trace the region once (one petal, a full loop).",
    "Evaluate using cos²θ = (1 + cos 2θ)/2.",
  ],
  concepts: [
    { slug: "polar-coordinates", name: "Polar coordinates", description: "Locating points by distance r from the pole and angle θ.", subject: "subj_math" },
  ],
  blocks: [
    def("Polar area", r`A thin sector with radius $r$ and angle $d\theta$ has area $\frac{1}{2}r^2\,d\theta$. So the region swept from $\theta = \alpha$ to $\theta = \beta$ has area $A = \frac{1}{2}\int_\alpha^\beta r^2\,d\theta$.`),
    example(r`The cardioid $r = 1 + \cos\theta$`, [
      [r`\tfrac{1}{2}\int_0^{2\pi} (1 + 2\cos\theta + \cos^2\theta)\,d\theta`, ""],
      [r`= \tfrac{1}{2}(2\pi + 0 + \pi) = \tfrac{3\pi}{2} \approx 4.71`, r`$\int_0^{2\pi}\cos^2\theta\,d\theta = \pi$.`],
    ]),
    example(r`One petal of $r = \cos 2\theta$`, [
      [r`r = 0 \text{ at } \theta = \pm\tfrac{\pi}{4}`, "The petal's endpoints."],
      [r`\tfrac{1}{2}\int_{-\pi/4}^{\pi/4}\cos^2 2\theta\,d\theta = \tfrac{\pi}{8} \approx 0.393`, ""],
    ]),
    activity("polar-graph", { title: "Count the petals", params: { kind: "rose", a: 1, b: 1, n: 2 } }),
    callout("warning", "Don't double count", r`$r = 2\cos\theta$ traces its circle once for $0 \le \theta \le \pi$. Integrating over $[0, 2\pi]$ would give twice the area.`),
    callout("application", "Where this shows up", r`The coverage area of a directional microphone or Wi-Fi antenna, given as a polar pattern, is a polar area integral.`),
  ],
  questions: [
    num(1, r`Find the area enclosed by $r = 3$, to two decimal places.`, 28.27, { tolerance: 0.02 }, [], r`$\frac{1}{2}\int_0^{2\pi} 9\,d\theta = 9\pi$.`),
    num(2, r`Find the area enclosed by $r = 2\cos\theta$, to three decimal places.`, 3.142, { tolerance: 0.002 }, [r`Use $-\frac{\pi}{2} \le \theta \le \frac{\pi}{2}$.`], r`$\frac{1}{2}\int 4\cos^2\theta\,d\theta = \pi$: a circle of radius 1.`),
    mc(2, r`What are the limits for one petal of $r = \sin 3\theta$?`, [r`$0$ to $\pi$`, r`$0$ to $\frac{\pi}{3}$`, r`$0$ to $\frac{\pi}{6}$`, r`$0$ to $2\pi$`], 1, [], r`$\sin 3\theta = 0$ at 0 and $\frac{\pi}{3}$.`),
    num(3, r`Find the total area of the 4-petal rose $r = \cos 2\theta$, to three decimal places.`, 1.571, { tolerance: 0.002 }, [], r`Four petals of $\frac{\pi}{8}$: $\frac{\pi}{2}$.`, "review"),
  ],
});
