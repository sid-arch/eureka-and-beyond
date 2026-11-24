import { callout, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "modeling-quadratics",
  title: "Modeling with quadratic functions",
  summary: "Build quadratic models for projectiles, areas and revenue, fit a quadratic through three points, and interpret the vertex and zeros in context.",
  minutes: 30,
  objectives: [
    "Model projectile height with h(t) = −16t² + v₀t + h₀ (feet) or −4.9t² + v₀t + h₀ (meters).",
    "Maximize area and revenue with the vertex.",
    "Find a quadratic through three points with a system of equations, and judge reasonable domains.",
  ],
  concepts: [
    { slug: "quadratic-functions", name: "Quadratic functions", description: "Functions of the form f(x) = ax² + bx + c with a ≠ 0, whose graphs are parabolas.", subject: "subj_math" },
  ],
  formulas: ["quadratic-formula", "vertex-form"],
  blocks: [
    text(r`Quadratics model situations where something changes at a steadily changing rate: falling objects (gravity), areas (length × width), and revenue (price × quantity when quantity drops as price rises).`),
    example(r`A ball is thrown up from 6 ft at 48 ft/s: $h = -16t^2 + 48t + 6$. When does it land?`, [
      [r`t = \frac{-48 - \sqrt{48^2 + 4(16)(6)}}{-32} = \frac{-48 - \sqrt{2688}}{-32}`, "Quadratic formula with a = −16; take the positive root."],
      [r`t \approx \frac{-48 - 51.85}{-32} \approx 3.12 \text{ s}`, ""],
    ], "The other root is negative and has no meaning here."),
    example(r`A theater sells 300 tickets at 20 dollars; each 1-dollar increase loses 10 sales. What price maximizes revenue?`, [
      [r`R(x) = (20 + x)(300 - 10x)`, "x = number of 1-dollar increases."],
      [r`\text{zeros at } x = -20,\ x = 30 \Rightarrow \text{vertex at } x = 5`, "Halfway between the zeros."],
      [r`\text{price } 25,\ R = 25 \cdot 250 = 6250`, ""],
    ]),
    example(r`Find the quadratic through $(0, 3)$, $(1, 2)$, $(2, 5)$`, [
      [r`c = 3`, "From (0, 3)."],
      [r`a + b = -1,\ 4a + 2b = 2`, "From the other points."],
      [r`a = 2,\ b = -3 \Rightarrow y = 2x^2 - 3x + 3`, ""],
    ]),
    callout("application", "Where this shows up", r`Sports analytics, bridge cables (approximately parabolic), pricing strategy and the design of satellite dishes all use quadratic models.`),
  ],
  questions: [
    num(2, r`A stone is dropped from 64 ft: $h = -16t^2 + 64$. When does it hit the ground, in seconds?`, 2, { unit: "s" }, [], r`$16t^2 = 64$, $t = 2$.`),
    num(2, r`For $h = -16t^2 + 32t + 5$, what is the maximum height in feet?`, 21, { unit: "ft" }, [r`$t = 1$.`], r`$h(1) = -16 + 32 + 5 = 21$.`),
    num(2, r`A rectangle has perimeter 40 m. What is its maximum possible area in m²?`, 100, { unit: "m²" }, [r`$A = x(20 - x)$.`], r`Vertex at $x = 10$: a 10 by 10 square, area 100.`),
    num(3, r`A quadratic passes through $(0, 1)$, $(1, 4)$ and $(2, 11)$. Find its leading coefficient $a$.`, 2, {}, [r`$a + b = 3$, $4a + 2b = 10$.`], r`$2a = 4$, $a = 2$ (and $b = 1$).`, "review"),
  ],
});
