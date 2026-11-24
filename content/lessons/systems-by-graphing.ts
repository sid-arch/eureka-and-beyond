import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "systems-by-graphing",
  title: "Solving systems by graphing",
  summary: "Solve a system of two linear equations by graphing, check solutions algebraically, and recognize systems with no solution or infinitely many.",
  minutes: 25,
  objectives: [
    "Define a system of linear equations and its solution.",
    "Solve a system by graphing and verify the intersection point in both equations.",
    "Classify systems as having one solution, no solution or infinitely many by comparing slopes and intercepts.",
  ],
  concepts: [
    { slug: "systems-of-equations", name: "Systems of linear equations", description: "Two or more equations solved together; solutions satisfy all of them.", subject: "subj_math" },
  ],
  blocks: [
    def("System of linear equations", r`Two or more linear equations in the same variables. A solution is an ordered pair that makes every equation true at the same time.`),
    text(r`Each equation's graph is the set of all points that satisfy it. A point that satisfies both must lie on both lines, so the solution of the system is where the lines intersect.`),
    activity("systems-graph", { title: "Find the intersection", params: { m1: 1, b1: 1, m2: -0.5, b2: 4 } }),
    callout("tip", "Try this", r`The system $y = x + 1$, $y = -\frac{1}{2}x + 4$ meets at $(2, 3)$. Check that point in both equations by hand. Then make the slopes equal. What happens to the solution, and what if the intercepts are also equal?`, "experiment"),
    example(r`Solve by graphing: $y = 2x - 3$ and $x + y = 3$`, [
      [r`y = -x + 3`, "Rewrite the second equation in slope-intercept form."],
      [r`\text{Graph both: they cross at } (2, 1)`, "Line 1 from (0, −3) up 2, right 1; line 2 from (0, 3) down 1, right 1."],
      [r`1 = 2(2) - 3 ✓ \quad 2 + 1 = 3 ✓`, "Always check the point in both original equations."],
    ]),
    def("Number of solutions", r`Different slopes: the lines cross once, so exactly one solution. Same slope, different intercepts: parallel lines, no solution (inconsistent). Same slope and same intercept: the same line, infinitely many solutions (dependent).`),
    example(r`Classify $2x - y = 4$ and $-6x + 3y = -12$`, [
      [r`y = 2x - 4`, "First equation."],
      [r`3y = 6x - 12 \Rightarrow y = 2x - 4`, "Second equation: the same line."],
      [r`\text{Infinitely many solutions}`, "Every point on y = 2x − 4 works."],
    ]),
    callout("warning", "Graphs can mislead", r`If the intersection is at a point like $(\frac{7}{3}, -\frac{1}{4})$, reading it from a graph only gives an estimate. Graphing is great for seeing the situation; substitution and elimination give exact answers.`),
    callout("application", "Where this shows up", r`Break-even analysis: a business's cost line and revenue line cross where profit is zero. Comparing two phone plans graphically shows the usage at which they cost the same.`),
  ],
  questions: [
    mc(1, r`Which point is a solution of the system $y = x + 2$ and $y = 3x - 2$?`, [r`$(1, 3)$`, r`$(2, 4)$`, r`$(0, 2)$`, r`$(4, 6)$`], 1,
      ["Check each point in both equations."], r`$(2, 4)$: $2 + 2 = 4$ ✓ and $3(2) - 2 = 4$ ✓.`),
    short(2, r`Solve by graphing (or check): $y = -x + 5$ and $y = x - 1$. Enter as (x,y).`, ["(3,2)"], ["Where are the y-values equal?"], r`$-x + 5 = x - 1$ gives $x = 3$ and $y = 2$: $(3, 2)$.`),
    mc(2, r`How many solutions does $y = 3x + 1$, $y = 3x - 4$ have?`, ["One", "None", "Infinitely many", "Two"], 1,
      ["Compare slopes and intercepts."], r`Same slope, different intercepts: parallel lines, no solution.`),
    mc(2, r`How many solutions does $x + 2y = 6$, $2x + 4y = 12$ have?`, ["One", "None", "Infinitely many", "Two"], 2,
      ["Divide the second equation by 2."], r`The second equation is the first multiplied by 2, so they describe the same line: infinitely many solutions.`),
    mc(2, r`The lines in a system have slopes $\frac{1}{2}$ and $-2$. How many solutions does it have?`, ["One", "None", "Infinitely many", "Cannot tell"], 0,
      ["Lines with different slopes always cross."], r`Different slopes, so the lines intersect exactly once. (They are also perpendicular.)`),
    short(3, r`Plan A: 40 dollars plus 5 dollars per class. Plan B: 10 dollars per class. After how many classes do they cost the same? Enter the number.`, ["8"], [r`Solve $40 + 5c = 10c$.`], r`$40 = 5c$, so $c = 8$ classes (both cost 80 dollars).`, "review"),
  ],
});
