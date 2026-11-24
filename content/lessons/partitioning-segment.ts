import { callout, example, formula, lesson, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "partitioning-segment",
  title: "Partitioning a segment",
  summary: "Find the point that divides a directed segment in a given ratio, using fractions of the run and rise.",
  minutes: 25,
  objectives: [
    "Interpret a ratio a : b along a directed segment as a fraction a/(a + b) of the way.",
    "Find the partition point with P = A + k(B − A).",
    "Solve for an endpoint given the partition point and ratio.",
  ],
  concepts: [
    { slug: "coordinate-geometry", name: "Coordinate geometry", description: "Studying geometric figures with coordinates and algebra.", subject: "subj_math" },
  ],
  formulas: ["midpoint-formula"],
  blocks: [
    text(r`The midpoint splits a segment in the ratio $1 : 1$. More generally, a point $P$ that divides directed segment $\overline{AB}$ in the ratio $a : b$ is $\frac{a}{a + b}$ of the way from $A$ to $B$. Direction matters: "from A to B" and "from B to A" give different points unless the ratio is 1 : 1.`),
    formula(r`P = \left(x_1 + k(x_2 - x_1),\ y_1 + k(y_2 - y_1)\right), \quad k = \frac{a}{a + b}`, "Partition formula"),
    example(r`Find $P$ on $\overline{AB}$ from $A(-2, 1)$ to $B(10, 7)$ so that $AP : PB = 1 : 2$`, [
      [r`k = \tfrac{1}{3}`, "One third of the way from A."],
      [r`\text{run} = 12,\ \text{rise} = 6`, ""],
      [r`P = (-2 + 4,\ 1 + 2) = (2, 3)`, ""],
    ], r`Check: $AP = \sqrt{16 + 4} = 2\sqrt{5}$ and $PB = \sqrt{64 + 16} = 4\sqrt{5}$, ratio $1 : 2$. ✓`),
    example(r`Same segment, ratio $3 : 1$`, [
      [r`k = \tfrac{3}{4}`, ""],
      [r`P = (-2 + 9,\ 1 + 4.5) = (7, 5.5)`, ""],
    ]),
    callout("warning", "Ratio vs fraction", r`A ratio of $2 : 3$ means $\frac{2}{5}$ of the way, not $\frac{2}{3}$. Add the parts to get the denominator.`),
    callout("application", "Where this shows up", r`Animation interpolates positions between keyframes this way, and maps place a point a given fraction along a road. The centroid of a triangle is the point $2 : 1$ along each median.`),
  ],
  questions: [
    short(1, r`Find the point $\frac{1}{4}$ of the way from $(0, 0)$ to $(8, 12)$. Enter as (x,y).`, ["(2,3)"], [], r`$(2, 3)$.`),
    short(2, r`Find $P$ on directed segment $A(1, 2)$ to $B(11, 7)$ with $AP : PB = 2 : 3$. Enter as (x,y).`, ["(5,4)"], [r`$k = \frac{2}{5}$.`], r`$(1 + 4, 2 + 2) = (5, 4)$.`),
    short(2, r`Find $P$ on directed segment $A(-4, 6)$ to $B(8, -3)$ with $AP : PB = 1 : 2$. Enter as (x,y).`, ["(0,3)"], [r`$k = \frac{1}{3}$; run 12, rise −9.`], r`$(-4 + 4, 6 - 3) = (0, 3)$.`),
    short(3, r`$P(4, 1)$ divides directed segment $A(-2, -2)$ to $B$ in the ratio $3 : 1$. Find $B$. Enter as (x,y).`, ["(6,2)"], [r`$P$ is $\frac{3}{4}$ of the way, so $B - A = \frac{4}{3}(P - A)$.`], r`$P - A = (6, 3)$, so $B - A = (8, 4)$ and $B = (6, 2)$.`, "review"),
  ],
});
