import { activity, callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "slopes-parallel-perpendicular-geometry",
  title: "Slopes of parallel and perpendicular lines",
  summary: "Use slopes to classify sides of figures on the coordinate plane as parallel or perpendicular, and to find equations of lines and the distance from a point to a line.",
  minutes: 25,
  objectives: [
    "Use slopes to decide whether segments in a figure are parallel or perpendicular.",
    "Classify quadrilaterals on the coordinate plane with slopes.",
    "Write the equation of the perpendicular from a point to a line and find the distance from the point to the line.",
  ],
  concepts: [
    { slug: "parallel-perpendicular", name: "Parallel and perpendicular lines", description: "Parallel lines have equal slopes; perpendicular slopes are negative reciprocals.", subject: "subj_math" },
    { slug: "coordinate-geometry", name: "Coordinate geometry", description: "Studying geometric figures with coordinates and algebra.", subject: "subj_math" },
  ],
  formulas: ["slope", "distance-formula", "point-slope-form"],
  blocks: [
    text(r`In the coordinate plane, slopes turn questions about angles into arithmetic. Non-vertical lines are parallel exactly when their slopes are equal, and perpendicular exactly when their slopes multiply to $-1$. Vertical lines are parallel to each other and perpendicular to horizontal lines.`),
    example(r`Show that $A(0, 0)$, $B(4, 1)$, $C(5, 5)$, $D(1, 4)$ is a parallelogram, and decide whether it's a rectangle`, [
      [r`m_{AB} = \tfrac{1}{4},\ m_{DC} = \tfrac{1}{4}`, "AB ∥ DC."],
      [r`m_{BC} = \tfrac{4}{1} = 4,\ m_{AD} = 4`, "BC ∥ AD. Both pairs of opposite sides are parallel: a parallelogram."],
      [r`\tfrac{1}{4} \cdot 4 = 1 \ne -1`, "Adjacent sides aren't perpendicular, so it isn't a rectangle."],
    ], r`All four sides have length $\sqrt{17}$, so it is a rhombus.`),
    example(r`Find the distance from $P(5, 1)$ to the line $y = 2x$`, [
      [r`y - 1 = -\tfrac{1}{2}(x - 5)`, "The perpendicular through P has slope −1/2."],
      [r`2x = -\tfrac{1}{2}x + \tfrac{7}{2} \Rightarrow x = \tfrac{7}{5},\ y = \tfrac{14}{5}`, "Intersect the two lines to find the foot F."],
      [r`PF = \sqrt{\left(5 - \tfrac{7}{5}\right)^2 + \left(1 - \tfrac{14}{5}\right)^2} = \sqrt{\tfrac{324}{25} + \tfrac{81}{25}} = \tfrac{9}{\sqrt{5}} \approx 4.02`, ""],
    ], "The distance from a point to a line is always measured along the perpendicular, the shortest path."),
    activity("systems-graph", { title: "Perpendicular slopes", params: { m1: 2, b1: 0, m2: -0.5, b2: 3.5 } }),
    callout("tip", "Try this", r`These are $y = 2x$ and the perpendicular through $(5, 1)$. The intersection is the foot of the perpendicular, $(1.4, 2.8)$. Change slope 2 slightly: does the angle at the intersection still look right?`, "experiment"),
    callout("application", "Where this shows up", r`Mapping software checks whether streets are parallel or perpendicular from coordinates, and computer graphics uses perpendiculars to find the closest point on a path.`),
  ],
  questions: [
    mc(1, r`Which pair of slopes belongs to perpendicular lines?`, [r`$3$ and $3$`, r`$-\frac{2}{5}$ and $\frac{5}{2}$`, r`$\frac{1}{2}$ and $2$`, r`$-4$ and $4$`], 1, ["Multiply the slopes."], r`$-\frac{2}{5} \cdot \frac{5}{2} = -1$.`),
    mc(2, r`Is the quadrilateral with vertices $(0, 0)$, $(3, 0)$, $(3, 2)$, $(0, 2)$ a rectangle?`, ["Yes", "No, it's only a parallelogram", "No, it's a trapezoid", "No, it's a kite"], 0, ["Sides are horizontal and vertical."], r`Horizontal and vertical sides are perpendicular, and opposite sides are parallel: a rectangle.`),
    mc(2, r`Segment $\overline{PQ}$ joins $(1, 2)$ and $(4, 8)$. Segment $\overline{RS}$ joins $(0, 5)$ and $(6, 2)$. How are they related?`, ["Parallel", "Perpendicular", "Neither", "The same line"], 1, [r`$m_{PQ} = 2$ and $m_{RS} = -\frac{1}{2}$.`], r`$2 \cdot \left(-\frac{1}{2}\right) = -1$: perpendicular.`),
    short(2, r`Write the line through $(2, -3)$ perpendicular to $y = \tfrac{2}{3}x + 1$, in slope-intercept form.`, ["y=-3x/2", "y=-(3/2)x", "y=-1.5x"], [r`Slope $-\frac{3}{2}$.`, r`$y + 3 = -\frac{3}{2}(x - 2)$.`], r`$y = -\frac{3}{2}x + 3 - 3 = -\frac{3}{2}x$.`),
    mc(3, r`What is the distance from $(0, 5)$ to the line $y = 1$?`, ["1", "4", "5", "6"], 1, ["The perpendicular to a horizontal line is vertical."], r`The foot is $(0, 1)$, so the distance is 4.`, "review"),
  ],
});
