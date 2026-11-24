import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parallel-perpendicular-lines",
  title: "Parallel and perpendicular lines",
  summary: "Use slopes to decide whether lines are parallel or perpendicular and write equations of lines parallel or perpendicular to a given line.",
  minutes: 25,
  objectives: [
    "State the slope conditions for parallel and perpendicular lines.",
    "Classify pairs of lines as parallel, perpendicular or neither.",
    "Write the equation of a line through a point that is parallel or perpendicular to a given line.",
  ],
  concepts: [
    { slug: "parallel-perpendicular", name: "Parallel and perpendicular lines", description: "Parallel lines have equal slopes; perpendicular slopes are negative reciprocals.", subject: "subj_math" },
  ],
  formulas: ["point-slope-form"],
  blocks: [
    def("Parallel lines", r`Two distinct non-vertical lines are parallel exactly when they have the same slope. All vertical lines are parallel to one another.`),
    def("Perpendicular lines", r`Two non-vertical lines are perpendicular exactly when their slopes multiply to $-1$: $m_2 = -\frac{1}{m_1}$ (negative reciprocals). A horizontal line and a vertical line are perpendicular.`),
    text(r`Why negative reciprocals? Rotate a slope triangle with run 3 and rise 2 by $90°$. The run becomes the rise and the rise becomes the run, with one direction flipped. The slope $\frac{2}{3}$ turns into $-\frac{3}{2}$, and $\frac{2}{3} \cdot \left(-\frac{3}{2}\right) = -1$.`),
    activity("systems-graph", { title: "Make the lines parallel, then perpendicular", params: { m1: 2, b1: 1, m2: 2, b2: -3 } }),
    callout("tip", "Try this", r`The lines start parallel, and the readout says they never meet. Set slope 2 to $-0.5$: now $2 \cdot (-0.5) = -1$, so they are perpendicular. Check the right angle where they cross.`, "experiment"),
    example(r`Classify $y = 4x - 1$ and $x + 4y = 8$`, [
      [r`m_1 = 4`, ""],
      [r`4y = -x + 8 \Rightarrow m_2 = -\tfrac{1}{4}`, "Rewrite the second line in slope-intercept form."],
      [r`4 \cdot \left(-\tfrac{1}{4}\right) = -1`, "Perpendicular."],
    ]),
    example(r`Write the line through $(6, -2)$ parallel to $y = \tfrac{2}{3}x + 5$`, [
      [r`m = \tfrac{2}{3}`, "Parallel: same slope."],
      [r`y + 2 = \tfrac{2}{3}(x - 6)`, "Point-slope form."],
      [r`y = \tfrac{2}{3}x - 6`, ""],
    ]),
    example(r`Write the line through $(6, -2)$ perpendicular to $y = \tfrac{2}{3}x + 5$`, [
      [r`m = -\tfrac{3}{2}`, "Negative reciprocal of 2/3."],
      [r`y + 2 = -\tfrac{3}{2}(x - 6)`, ""],
      [r`y = -\tfrac{3}{2}x + 7`, r`$-\frac{3}{2}(x - 6) = -\frac{3}{2}x + 9$, then subtract 2.`],
    ]),
    callout("warning", "Reciprocal and negate", r`The perpendicular slope to $-5$ is $\frac{1}{5}$, not $5$ or $-\frac{1}{5}$. Do both steps: flip it and change the sign.`),
    callout("application", "Where this shows up", r`City planners lay out streets on parallel and perpendicular grids, carpenters check square corners, and in coordinate geometry you can prove a shape is a rectangle by showing adjacent sides have slopes that multiply to $-1$.`),
  ],
  questions: [
    num(1, r`What is the slope of a line parallel to $y = -3x + 7$?`, -3, {}, ["Parallel lines have equal slopes."], r`$-3$.`),
    short(1, r`What is the slope of a line perpendicular to $y = 4x - 2$? Give a fraction.`, ["-1/4", "-0.25"], ["Negative reciprocal."], r`$-\frac{1}{4}$.`),
    mc(2, r`Classify the lines $2x - y = 3$ and $y = 2x + 9$.`, ["Parallel", "Perpendicular", "Neither", "The same line"], 0,
      [r`The first is $y = 2x - 3$.`], r`Both have slope 2 and different intercepts, so they are parallel.`),
    mc(2, r`Classify the lines $y = \tfrac{3}{5}x$ and $y = \tfrac{5}{3}x - 1$.`, ["Parallel", "Perpendicular", "Neither", "The same line"], 2,
      ["Multiply the slopes."], r`$\frac{3}{5} \cdot \frac{5}{3} = 1$, not $-1$, and the slopes are different: neither.`),
    short(2, r`Write the line through $(2, 3)$ parallel to $y = -x + 4$, in slope-intercept form.`, ["y=-x+5", "y=5-x"], [r`$y - 3 = -1(x - 2)$.`], r`$y = -x + 5$.`),
    short(3, r`Write the line through $(4, 1)$ perpendicular to $y = 2x - 5$, in slope-intercept form.`, ["y=-x/2+3", "y=-(1/2)x+3", "y=-0.5x+3", "y=3-x/2"], [r`Slope $-\frac{1}{2}$.`, r`$y - 1 = -\frac{1}{2}(x - 4)$.`], r`$y = -\frac{1}{2}x + 2 + 1 = -\frac{1}{2}x + 3$.`),
    mc(3, r`Which line is perpendicular to $x = 7$?`, [r`$x = -7$`, r`$y = 7x$`, r`$y = -2$`, r`$y = x$`], 2,
      [r`$x = 7$ is vertical.`], r`A vertical line is perpendicular to every horizontal line, such as $y = -2$.`, "review"),
  ],
});
