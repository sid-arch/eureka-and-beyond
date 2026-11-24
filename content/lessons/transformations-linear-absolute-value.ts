import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "transformations-linear-absolute-value",
  title: "Transformations of linear and absolute value functions",
  summary: "Describe and graph translations, reflections, stretches and compressions of f(x) = x and f(x) = |x|, and write the equation of a transformed graph.",
  minutes: 30,
  objectives: [
    "Describe how a, h and k change the graph of g(x) = a|x − h| + k relative to f(x) = |x|.",
    "Graph transformed linear and absolute value functions from their equations.",
    "Write the equation of a transformed absolute value graph from its vertex and one other point.",
  ],
  concepts: [
    { slug: "function-transformations", name: "Function transformations", description: "Shifting, reflecting and stretching graphs by changing a function's formula.", subject: "subj_math" },
    { slug: "absolute-value", name: "Absolute value", description: "The distance of a number from zero on the number line.", subject: "subj_math" },
  ],
  blocks: [
    text(r`The parent function $f(x) = |x|$ is a V with vertex $(0, 0)$ and slopes $\pm 1$. Every function $g(x) = a|x - h| + k$ is the same V, moved and reshaped. Learning what each parameter does lets you sketch the graph without a table.`),
    def("Effects of the parameters", r`$k$: shifts the graph up ($k > 0$) or down. $h$: shifts it right ($h > 0$) or left; note the minus sign in $x - h$. $|a| > 1$: vertical stretch (narrower V); $0 < |a| < 1$: vertical compression (wider V). $a < 0$: reflection over the $x$-axis (upside-down V). The vertex is $(h, k)$.`),
    example(r`Describe and graph $g(x) = -2|x + 3| + 4$`, [
      [r`h = -3,\ k = 4`, "x + 3 = x − (−3): left 3, then up 4. Vertex (−3, 4)."],
      [r`a = -2`, "Reflected over the x-axis and stretched by 2: slopes −2 and 2 on the two sides."],
      [r`(-2, 2),\ (-4, 2)`, "One unit from the vertex, the graph drops 2."],
    ], r`Zeros: $-2|x + 3| + 4 = 0$ gives $|x + 3| = 2$, so $x = -1$ or $x = -5$.`),
    activity("vertex-explorer", { title: "The same parameters on a parabola", params: { a: -2, h: -3, k: 4 } }),
    callout("tip", "Try this", r`The parabola $y = -2(x + 3)^2 + 4$ uses the same $a$, $h$ and $k$ as $g$. Drag the vertex: the rules for $h$ and $k$ are identical for every parent function. Now change $a$ by dragging the hollow point. Which way does a negative $a$ flip the graph?`, "experiment"),
    text(r`Linear functions transform the same way. Starting from $f(x) = x$, the function $g(x) = a(x - h) + k$ is a line through $(h, k)$ with slope $a$. That's point-slope form! For lines, a vertical shift and a horizontal shift can look the same: $y = x + 3$ is both "up 3" and "left 3."`),
    example(r`Write the absolute value function with vertex $(2, -1)$ through $(4, 5)$`, [
      [r`g(x) = a|x - 2| - 1`, "Use the vertex."],
      [r`5 = a|4 - 2| - 1 \Rightarrow 6 = 2a \Rightarrow a = 3`, "Substitute the point."],
      [r`g(x) = 3|x - 2| - 1`, ""],
    ]),
    callout("warning", "Inside vs outside", r`Changes inside the absolute value (to $x$) move the graph horizontally and act opposite to their sign. Changes outside move it vertically and act as written. $|x - 5|$ moves right 5; $|x| - 5$ moves down 5.`),
    callout("application", "Where this shows up", r`A car driving at a steady 60 km/h passes a toll booth at time $t_0$ hours. Its distance from the booth is $d = 60|t - t_0|$ km, a V-shaped graph with its vertex at the moment it passes. Absolute value functions model distances, tolerances and reflections such as light bouncing off a mirror.`),
  ],
  questions: [
    short(1, r`What is the vertex of $g(x) = |x - 4| + 7$? Enter as (x,y).`, ["(4,7)"], ["Vertex is (h, k)."], r`$(4, 7)$.`),
    mc(1, r`How does $g(x) = |x| - 6$ compare with $f(x) = |x|$?`, ["Left 6", "Right 6", "Down 6", "Up 6"], 2, ["The change is outside the absolute value."], r`Subtracting 6 outside shifts the graph down 6.`),
    mc(2, r`How does $g(x) = \frac{1}{2}|x + 1|$ compare with $|x|$?`, ["Right 1 and stretched", "Left 1 and compressed vertically", "Left 1 and reflected", "Up 1 and compressed"], 1, ["x + 1 = x − (−1).", "a = 1/2."], r`Left 1, with a vertical compression by $\frac{1}{2}$ (wider V).`),
    short(2, r`Write the function for $|x|$ reflected over the x-axis, shifted right 3 and up 2. Use the format y=a|x-h|+k.`, ["y=-|x-3|+2", "y=2-|x-3|"], ["Reflection: a = −1."], r`$y = -|x - 3| + 2$.`),
    short(3, r`Find the zeros of $g(x) = 2|x - 1| - 6$. Enter both, smaller first.`, ["-2,4"], [r`$|x - 1| = 3$.`], r`$x - 1 = \pm 3$: $x = -2$ or $x = 4$.`),
    short(3, r`An absolute value graph has vertex $(-1, 3)$ and passes through $(1, -1)$. Find $a$.`, ["-2", "a=-2"], [r`$-1 = a|1 + 1| + 3$.`], r`$-4 = 2a$, so $a = -2$.`, "review"),
    mc(3, r`The line $y = 2(x - 1) + 5$ is a transformation of $y = x$. Which describes it?`, ["Slope 2 through (1, 5)", "Slope 5 through (1, 2)", "Slope 2 through (−1, 5)", "Slope 1 through (2, 5)"], 0, ["Compare with y = a(x − h) + k."], r`$a = 2$ is the slope and $(h, k) = (1, 5)$ is a point on the line.`, "review"),
  ],
});
