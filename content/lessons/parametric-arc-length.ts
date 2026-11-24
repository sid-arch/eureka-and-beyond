import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parametric-arc-length",
  title: "Finding arc lengths of curves given by parametric equations",
  summary: "Compute the length of a parametric curve with L = ∫√((dx/dt)² + (dy/dt)²) dt, and interpret it as distance traveled.",
  minutes: 25,
  objectives: [
    "Set up L = ∫ₐᵇ √(x′(t)² + y′(t)²) dt.",
    "Evaluate it exactly or with technology.",
    "Distinguish distance traveled from displacement.",
  ],
  concepts: [
    { slug: "parametric-curves", name: "Parametric curves", description: "Curves traced by (x(t), y(t)) as a parameter t varies.", subject: "subj_math" },
  ],
  blocks: [
    def("Parametric arc length", r`If the curve is traced once for $a \le t \le b$: $L = \int_a^b \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt$. The integrand is the speed, so $L$ is the distance traveled.`),
    example(r`$x = \cos t$, $y = \sin t$, $0 \le t \le 2\pi$`, [
      [r`\sqrt{\sin^2 t + \cos^2 t} = 1`, "Constant speed."],
      [r`L = \int_0^{2\pi} 1\,dt = 2\pi`, "The circumference."],
    ]),
    example(r`$x = t^2$, $y = \tfrac{2}{3}t^3$, $0 \le t \le 1$`, [
      [r`\sqrt{4t^2 + 4t^4} = 2t\sqrt{1 + t^2}`, ""],
      [r`L = \tfrac{2}{3}\left[(1 + t^2)^{3/2}\right]_0^1`, "Substitute u = 1 + t²."],
      [r`= \tfrac{2}{3}(2\sqrt{2} - 1) \approx 1.219`, ""],
    ]),
    callout("warning", "Traced twice?", r`If the parameter interval traces part of the curve twice (like $0 \le t \le 4\pi$ for a circle), the integral counts it twice: that's distance traveled, not the length of the curve.`),
    callout("application", "Where this shows up", r`A car's odometer reports the arc length of its path, while the displacement shown by GPS is the straight-line change in position.`),
  ],
  questions: [
    num(1, r`Find the length of $x = 3t$, $y = 4t$ for $0 \le t \le 2$.`, 10, {}, [], r`Speed 5, time 2.`),
    num(2, r`Find the distance traveled by $x = 2\cos t$, $y = 2\sin t$ for $0 \le t \le \pi$, to three decimal places.`, 6.283, { tolerance: 0.002 }, [], r`Speed 2, time $\pi$: $2\pi$.`),
    mc(2, r`Which integral gives the length of $x = e^t$, $y = t$ on $[0, 1]$?`, [r`$\int_0^1 \sqrt{e^{2t} + 1}\,dt$`, r`$\int_0^1 (e^t + 1)\,dt$`, r`$\int_0^1 \sqrt{e^t + t}\,dt$`, r`$\int_0^1 \sqrt{1 + e^t}\,dt$`], 0, [], r`$x' = e^t$, $y' = 1$.`),
    num(3, r`A particle moves with $x = \cos t$, $y = \sin t$ for $0 \le t \le 4\pi$. What total distance does it travel? Three decimal places.`, 12.566, { tolerance: 0.003 }, [], r`Twice around: $4\pi$ (the curve itself has length $2\pi$).`, "review"),
  ],
});
