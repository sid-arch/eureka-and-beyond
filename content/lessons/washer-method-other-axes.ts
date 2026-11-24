import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "washer-method-other-axes",
  title: "Volume with washer method: revolving around other axes",
  summary: "Find washer volumes about lines such as y = −1 or y = 2 by measuring outer and inner radii as distances to the axis.",
  minutes: 30,
  objectives: [
    "Determine which curve is farther from the axis (outer radius).",
    "Write both radii as distances to y = k or x = h.",
    "Set up and evaluate the washer integral.",
  ],
  concepts: [
    { slug: "volume-integrals", name: "Volume by integration", description: "Finding volumes by adding up the areas of thin slices with an integral.", subject: "subj_math" },
  ],
  blocks: [
    def("Radii to a line", r`About $y = k$ below the region: $R = (\text{top}) - k$, $r = (\text{bottom}) - k$. About $y = k$ above the region: $R = k - (\text{bottom})$, $r = k - (\text{top})$.`),
    example(r`Region between $y = x$ and $y = x^2$, about $y = -1$`, [
      [r`R = x + 1,\ r = x^2 + 1`, "The axis is below: top is farther."],
      [r`\pi\int_0^1 \left[(x + 1)^2 - (x^2 + 1)^2\right]dx`, ""],
      [r`= \pi\int_0^1 (2x - x^2 - x^4)\,dx = \tfrac{7\pi}{15} \approx 1.466`, ""],
    ]),
    example(r`Same region, about $y = 2$`, [
      [r`R = 2 - x^2,\ r = 2 - x`, "The axis is above: the bottom curve is farther."],
      [r`\pi\int_0^1 (x^4 - 5x^2 + 4x)\,dx = \tfrac{8\pi}{15} \approx 1.676`, ""],
    ]),
    callout("tip", "Sketch the axis", r`Draw the axis line on the region, draw one radius to each curve, and label which is longer before writing anything.`),
    callout("application", "Where this shows up", r`Machinists calculate how much material a lathe removes when the part spins about an offset axis, a washer volume about a line.`),
  ],
  questions: [
    num(2, r`Region between $y = \sqrt{x}$ and $y = 0$ on $[0, 4]$, revolved about $y = -1$. Volume to two decimal places.`, 58.64, { tolerance: 0.05 }, [r`$R = \sqrt{x} + 1$, $r = 1$.`], r`$\pi\int_0^4 (x + 2\sqrt{x})\,dx = \pi\left(8 + \frac{32}{3}\right) = \frac{56\pi}{3} \approx 58.64$.`),
    mc(2, r`Region between $y = 1$ and $y = 3$, revolved about $y = 4$. The outer radius is…`, ["1", "3", "4", "2"], 1, [], r`The bottom curve $y = 1$ is farther: $4 - 1 = 3$.`),
    mc(2, r`About $x = -2$, a curve $x = g(y)$ to the right of the axis has radius…`, [r`$g(y) - 2$`, r`$g(y) + 2$`, r`$2 - g(y)$`, r`$g(y)$`], 1, [], r`$g(y) - (-2)$.`),
    num(3, r`Region between $y = x$ and $y = x^2$, revolved about $x = -1$. Volume to three decimal places.`, 1.571, { tolerance: 0.002 }, [r`In $y$: outer $\sqrt{y} + 1$, inner $y + 1$.`], r`$\pi\int_0^1 \left[(\sqrt{y} + 1)^2 - (y + 1)^2\right]dy = \pi\int_0^1 (2\sqrt{y} - y - y^2)\,dy = \pi\left(\frac{4}{3} - \frac{1}{2} - \frac{1}{3}\right) = \frac{\pi}{2}$.`, "review"),
  ],
});
