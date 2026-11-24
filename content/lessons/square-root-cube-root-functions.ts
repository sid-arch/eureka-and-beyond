import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "square-root-cube-root-functions",
  title: "Square root and cube root functions",
  summary: "Graph f(x) = √x and f(x) = ∛x and their transformations, find domain and range, and compare their shapes and rates of change.",
  minutes: 30,
  objectives: [
    "Graph the parent functions √x and ∛x from key points and describe their domain, range and shape.",
    "Graph transformations a√(x − h) + k and a∛(x − h) + k and give their domain and range.",
    "Solve simple radical equations and check for extraneous solutions.",
  ],
  concepts: [
    { slug: "radical-functions", name: "Radical functions", description: "Functions such as √x and ∛x and their transformations.", subject: "subj_math" },
    { slug: "function-transformations", name: "Function transformations", description: "Shifting, reflecting and stretching graphs by changing a function's formula.", subject: "subj_math" },
  ],
  blocks: [
    def("Square root function", r`$f(x) = \sqrt{x}$ has domain $[0, \infty)$ and range $[0, \infty)$. Key points: $(0, 0), (1, 1), (4, 2), (9, 3)$. It rises quickly at first, then more and more slowly.`),
    def("Cube root function", r`$g(x) = \sqrt[3]{x}$ has domain and range all real numbers. Key points: $(-8, -2), (-1, -1), (0, 0), (1, 1), (8, 2)$. It is symmetric about the origin.`),
    text(r`These are inverses of $y = x^2$ (for $x \ge 0$) and $y = x^3$: swap the coordinates of the key points of the square and cube functions and you get these graphs. That's why $\sqrt{x}$ looks like half of a sideways parabola.`),
    example(r`Graph $y = -2\sqrt{x - 3} + 1$ and give its domain and range`, [
      [r`(3, 1)`, "The starting point moves from (0, 0) to (h, k) = (3, 1)."],
      [r`(4, -1),\ (7, -3),\ (12, -5)`, "From (1, 1), (4, 2), (9, 3): shift right 3, multiply y by −2, then add 1."],
      [r`D = [3, \infty),\ R = (-\infty, 1]`, "The reflection makes the graph go down from its start."],
    ]),
    example(r`Give the domain and key points of $y = \sqrt[3]{x + 1} - 2$`, [
      [r`D = R = (-\infty, \infty)`, "Cube roots accept every real input."],
      [r`(-1, -2)`, "The center point (0, 0) moves left 1 and down 2."],
      [r`(-9, -4),\ (0, -1),\ (7, 0)`, "Shift (−8, −2), (1, 1), (8, 2) the same way."],
    ]),
    example(r`Solve $\sqrt{2x + 3} = x$`, [
      [r`2x + 3 = x^2`, "Square both sides."],
      [r`x^2 - 2x - 3 = 0 \Rightarrow x = 3 \text{ or } x = -1`, ""],
      [r`x = 3: \sqrt{9} = 3 ✓ \quad x = -1: \sqrt{1} = 1 \ne -1`, "Check both."],
      [r`x = 3`, "x = −1 is extraneous: it was introduced by squaring."],
    ]),
    callout("warning", "Always check radical equations", r`Squaring both sides can create solutions that don't satisfy the original equation, because $(-1)^2$ and $1^2$ are equal. Substitute every answer back into the original.`),
    callout("application", "Where this shows up", r`The time for a dropped object to fall $d$ meters is $t = \sqrt{d/4.9}$ seconds, a pendulum's period grows with $\sqrt{L}$, and the side of a cube with volume $V$ is $\sqrt[3]{V}$.`),
  ],
  questions: [
    mc(1, r`What is the domain of $f(x) = \sqrt{x + 5}$?`, [r`$x \ge 5$`, r`$x \ge -5$`, "All real numbers", r`$x > 0$`], 1, [r`Require $x + 5 \ge 0$.`], r`$x \ge -5$.`),
    mc(1, r`What is the domain of $g(x) = \sqrt[3]{x - 4}$?`, [r`$x \ge 4$`, r`$x \ge 0$`, "All real numbers", r`$x \ne 4$`], 2, ["Cube roots of negatives are real."], r`All real numbers.`),
    short(2, r`What is the starting point of $y = \sqrt{x + 2} - 6$? Enter as (x,y).`, ["(-2,-6)"], ["(h, k) with h = −2."], r`$(-2, -6)$.`),
    mc(2, r`What is the range of $y = -\sqrt{x} + 4$?`, [r`$y \ge 4$`, r`$y \le 4$`, "All real numbers", r`$y \ge 0$`], 1, ["The reflection makes the graph go down from (0, 4)."], r`$y \le 4$.`),
    num(2, r`Solve $\sqrt{x - 1} = 5$.`, 26, {}, ["Square both sides."], r`$x - 1 = 25$, so $x = 26$. Check: $\sqrt{25} = 5$ ✓.`),
    num(3, r`Solve $\sqrt{x + 6} = x$. (One solution is extraneous; enter the valid one.)`, 3, {}, [r`$x^2 - x - 6 = 0$.`, "Check both candidates."], r`$x = 3$ or $x = -2$. $\sqrt{9} = 3$ ✓, but $\sqrt{4} = 2 \ne -2$, so only $x = 3$.`),
    num(3, r`How long does it take a stone to fall 44.1 m, using $t = \sqrt{d / 4.9}$?`, 3, { unit: "s" }, [r`$44.1 / 4.9 = 9$.`], r`$t = \sqrt{9} = 3$ s.`, "review"),
  ],
});
