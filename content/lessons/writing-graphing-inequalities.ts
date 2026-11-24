import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "writing-graphing-inequalities",
  title: "Writing and graphing inequalities",
  summary: "Translate situations into inequalities, graph them on a number line with open and closed circles, and test whether values are solutions.",
  minutes: 20,
  objectives: [
    "Read and write the symbols <, >, ≤ and ≥ and translate phrases such as 'at least' and 'no more than'.",
    "Graph an inequality on a number line using an open or closed circle and a ray.",
    "Decide whether a value is a solution by substitution.",
  ],
  concepts: [
    { slug: "inequalities", name: "Inequalities", description: "Statements that compare quantities using <, >, ≤ or ≥.", subject: "subj_math" },
  ],
  blocks: [
    text(r`An equation like $x = 3$ has one solution. But many situations allow a whole range of values: you must be at least 48 inches tall to ride, or a bag can hold no more than 23 kg. An inequality describes a range like this, and it usually has infinitely many solutions.`),
    def("Inequality symbols", r`$x < a$: $x$ is less than $a$. $x > a$: greater than. $x \le a$: less than or equal to (at most, no more than). $x \ge a$: greater than or equal to (at least, no less than).`),
    text(r`To graph an inequality, draw a circle at the boundary value and shade the side that contains the solutions. An open circle means the boundary is not included ($<$ or $>$). A closed, filled-in circle means it is included ($\le$ or $\ge$).`),
    activity("inequality-line", { title: "Graph an inequality", params: { rel: "≥", c: -2, mode: "single" } }),
    callout("tip", "Try this", r`Switch between $\ge$ and $>$ and watch the circle at the boundary. Then move the test value to the boundary itself. When is the boundary a solution?`, "experiment"),
    example(r`Write and graph: "You must be at least 16 to drive."`, [
      [r`a \ge 16`, "At least means 16 or more, so the boundary is included."],
      [r`\text{closed circle at 16, shade right}`, "All ages 16 and up."],
    ]),
    example(r`Is $x = -3$ a solution of $2x + 5 < 0$?`, [
      [r`2(-3) + 5 = -1`, "Substitute."],
      [r`-1 < 0 \text{ is true}`, "So −3 is a solution."],
    ], r`Try $x = 0$: $5 < 0$ is false, so 0 is not a solution.`),
    callout("warning", "Reading inequalities backwards", r`$5 > x$ means the same as $x < 5$. Read the inequality with the variable first to see which way to shade: the symbol always points to the smaller side.`),
    callout("application", "Where this shows up", r`Speed limits ($s \le 65$), elevator capacity, minimum order amounts for free shipping ($c \ge 35$), and safe temperature ranges are all inequalities.`),
  ],
  questions: [
    mc(1, r`Which inequality means "$x$ is no more than 12"?`, [r`$x < 12$`, r`$x \le 12$`, r`$x > 12$`, r`$x \ge 12$`], 1,
      [`"No more than" allows 12 itself.`], r`$x \le 12$: twelve or less.`),
    mc(1, r`A graph shows an open circle at 4 with shading to the left. Which inequality does it show?`, [r`$x \le 4$`, r`$x > 4$`, r`$x < 4$`, r`$x \ge 4$`], 2,
      ["An open circle excludes the boundary.", "Left means smaller values."], r`$x < 4$.`),
    mc(2, r`Which value is a solution of $x \ge -1.5$?`, [r`$-2$`, r`$-1.6$`, r`$-1.5$`, r`$-3$`], 2,
      ["Is the boundary included?"], r`$\ge$ includes the boundary, so $-1.5$ is a solution. The others are less than $-1.5$.`),
    short(2, r`Write an inequality: "A suitcase must weigh less than 50 pounds." Use w for weight.`, ["w<50", "50>w"], ["Less than does not include 50."], r`$w < 50$.`),
    short(2, r`Write an inequality: "You need at least 85 points to earn an A." Use p for points.`, ["p>=85", "p≥85", "85<=p", "85≤p"], ["At least includes 85."], r`$p \ge 85$.`),
    mc(2, r`Is $x = 4$ a solution of $3x - 7 > 5$?`, ["Yes, because 3(4) − 7 = 5 and 5 > 5", "No, because 5 > 5 is false", "Yes, because 4 > 5", "No, because 3(4) − 7 = 19"], 1,
      ["Substitute and decide whether the statement is true."], r`$3(4) - 7 = 5$, and $5 > 5$ is false, so 4 is not a solution. (It would be a solution of $3x - 7 \ge 5$.)`),
    short(3, r`Rewrite $-7 \le x$ with $x$ on the left.`, ["x>=-7", "x≥-7"], ["Flip the whole statement around, including the symbol."], r`$x \ge -7$.`, "review"),
  ],
});
