import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-optimization",
  title: "Solving optimization problems",
  summary: "Solve geometric and applied optimization problems such as minimum surface area, minimum distance and maximum volume, and justify that the answer is a global optimum.",
  minutes: 35,
  objectives: [
    "Solve multi-step optimization problems from geometry and applications.",
    "Simplify by optimizing the square of a distance.",
    "Justify a global optimum with the Candidates Test or a single critical point argument.",
  ],
  concepts: [
    { slug: "optimization", name: "Optimization", description: "Finding the largest or smallest value of a quantity using derivatives.", subject: "subj_math" },
  ],
  blocks: [
    example(r`A can must hold 1000 cm³. Minimize the metal used (surface area).`, [
      [r`\pi r^2 h = 1000 \Rightarrow h = \frac{1000}{\pi r^2}`, "Constraint."],
      [r`S(r) = 2\pi r^2 + 2\pi r h = 2\pi r^2 + \frac{2000}{r}`, ""],
      [r`S'(r) = 4\pi r - \frac{2000}{r^2} = 0`, ""],
      [r`r^3 = \frac{500}{\pi} \Rightarrow r \approx 5.42 \text{ cm}`, "Then h = 2r ≈ 10.84 cm."],
    ]),
    example(r`Closest point on $y = \sqrt{x}$ to $(4, 0)$`, [
      [r`D^2 = (x - 4)^2 + x`, "Minimizing D² minimizes D."],
      [r`\frac{d}{dx}D^2 = 2(x - 4) + 1 = 0 \Rightarrow x = 3.5`, ""],
      [r`\text{point } (3.5, \sqrt{3.5}) \approx (3.5, 1.87)`, ""],
    ]),
    def("Justifying a global optimum", r`On a closed interval, use the Candidates Test. On an open interval, if there is only one critical point and it's a relative minimum (or maximum), it's the absolute one.`),
    activity("optimization-box", { title: "A rectangular sheet", params: { length: 16, width: 10, x: 1 } }),
    callout("tip", "Try this", r`For a 16 × 10 sheet the best cut is exactly 2, giving volume $2 \cdot 12 \cdot 6 = 144$. Change the sheet and watch the best cut move.`, "experiment"),
    callout("application", "Where this shows up", r`Real cans are taller than the "optimal" 2r because the top and bottom use thicker metal, a reminder to check a model's assumptions.`),
  ],
  questions: [
    num(2, r`For the can problem, what is the optimal height-to-radius ratio $h/r$?`, 2, {}, [], r`At the optimum, $h = \frac{1000}{\pi r^2}$ and $\pi r^3 = 500$ give $h = 2r$.`),
    num(2, r`Find the $x$-coordinate of the point on $y = x^2$ closest to $(0, 2)$, with $x > 0$. Round to three decimal places.`, 1.225, { tolerance: 0.002 }, [r`Minimize $x^2 + (x^2 - 2)^2$.`], r`Derivative $2x + 4x(x^2 - 2) = 2x(2x^2 - 3) = 0 \Rightarrow x = \sqrt{1.5} \approx 1.225$.`),
    mc(2, r`Why can we minimize $D^2$ instead of $D$?`, ["D² is always smaller", "Squaring is increasing for nonnegative numbers, so both have the minimum at the same place", "D isn't differentiable", "It changes the answer but is easier"], 1, [], r`And $D^2$ avoids a square root.`),
    num(3, r`An open box is made from a 16 × 10 sheet. What is its maximum volume?`, 144, {}, [], r`$V'(x) = 12x^2 - 104x + 160 = 4(3x - 20)(x - 2)$; $x = 2$ is in $(0, 5)$; $V = 144$.`, "review"),
  ],
});
