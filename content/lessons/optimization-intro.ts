import { activity, callout, def, example, lesson, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "optimization-intro",
  title: "Introduction to optimization problems",
  summary: "Turn a word problem into a function of one variable on a sensible domain, then find its maximum or minimum with derivatives.",
  minutes: 25,
  objectives: [
    "Identify the quantity to optimize and the constraint.",
    "Use the constraint to write the objective as a function of one variable with a domain.",
    "Find and justify the optimal value.",
  ],
  concepts: [
    { slug: "optimization", name: "Optimization", description: "Finding the largest or smallest value of a quantity using derivatives.", subject: "subj_math" },
  ],
  blocks: [
    def("Setting up", r`1. Name the quantity to maximize or minimize (the objective). 2. Write the constraint relating the variables. 3. Substitute so the objective uses one variable, and state its domain. 4. Find critical points and compare candidates (or use a derivative test).`),
    example(r`400 m of fence encloses a rectangle against a river (no fence on the river side). Maximize the area.`, [
      [r`\text{objective } A = xy;\ \text{constraint } 2x + y = 400`, "x: the two sides perpendicular to the river."],
      [r`A(x) = x(400 - 2x),\ 0 < x < 200`, ""],
      [r`A'(x) = 400 - 4x = 0 \Rightarrow x = 100`, ""],
      [r`A(100) = 100 \cdot 200 = 20{,}000 \text{ m}^2`, "A″ = −4 < 0 confirms a maximum."],
    ]),
    activity("optimization-box", { title: "Find the best cut", params: { length: 12, width: 12, x: 1 } }),
    callout("tip", "Try this", r`For a 12 × 12 sheet, find the cut with the largest volume by dragging $x$. Then check: $V'(x) = 12x^2 - 96x + 144 = 0$ gives $x = 2$, volume 128.`, "experiment"),
    callout("application", "Where this shows up", r`Packaging engineers choose dimensions that hold the most for the least material; farmers plan fields to enclose the most area with a given fence.`),
  ],
  questions: [
    num(1, r`Two positive numbers sum to 20. What is the largest possible product?`, 100, {}, [], r`$P = x(20 - x)$; $P' = 20 - 2x = 0$ at 10; $10 \cdot 10 = 100$.`),
    num(2, r`A rectangle has perimeter 60 cm. What is its maximum area, in cm²?`, 225, { unit: "cm²" }, [], r`$A = x(30 - x)$, max at 15: a 15 × 15 square.`),
    num(2, r`In the river problem with 600 m of fence, what is the maximum area in m²?`, 45000, { unit: "m²" }, [], r`$A = x(600 - 2x)$, $x = 150$, $150 \cdot 300 = 45{,}000$.`),
    num(3, r`For a 12 × 12 sheet, what is the volume of the box when $x = 3$?`, 108, {}, [], r`$3 \cdot 6 \cdot 6 = 108$, less than the maximum 128 at $x = 2$.`, "review"),
  ],
});
