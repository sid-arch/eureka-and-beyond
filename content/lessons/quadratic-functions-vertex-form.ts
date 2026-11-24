import { activity, callout, def, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "quadratic-functions-vertex-form",
  title: "Graphing quadratic functions in vertex form",
  summary: "Read the vertex, axis of symmetry and direction of a parabola from y = a(x − h)² + k, and connect it to the graph.",
  minutes: 30,
  objectives: [
    "Identify the vertex and axis of symmetry from vertex form.",
    "Describe how a, h and k transform the graph of y = x².",
    "Find the zeros of a quadratic written in vertex form.",
  ],
  concepts: [{ slug: "quadratic-functions", name: "Quadratic functions", description: "Functions of the form ax² + bx + c whose graphs are parabolas.", subject: "subj_math" }],
  formulas: ["vertex-form"],
  blocks: [
    text(r`The graph of $y = x^2$ is a U-shaped curve called a parabola, with its lowest point at the origin. Every quadratic function's graph is a parabola that has been shifted, stretched or flipped from this one.`),
    formula(r`y = a(x - h)^2 + k`, "Vertex form", r`The vertex is $(h, k)$. The axis of symmetry is the vertical line $x = h$.`),
    def("Vertex", r`The turning point of a parabola: the minimum point when $a > 0$ and the maximum point when $a < 0$.`),
    text(r`Each parameter has one job. $h$ shifts the graph left or right; note the minus sign in $(x - h)$, so $(x + 3)^2$ means $h = -3$. $k$ shifts it up or down. $a$ flips the graph when negative and makes it narrower when $|a| > 1$ or wider when $0 < |a| < 1$.`),
    example(r`Describe $y = -2(x + 1)^2 + 8$ and find its zeros`, [
      [r`a = -2,\ h = -1,\ k = 8`, r`Rewrite $(x + 1)$ as $(x - (-1))$.`],
      [r`\text{vertex } (-1, 8),\ \text{axis } x = -1`, "Opens down because a < 0, so the vertex is a maximum."],
      [r`0 = -2(x + 1)^2 + 8`, "Zeros are where y = 0."],
      [r`(x + 1)^2 = 4`, "Subtract 8, then divide by −2."],
      [r`x + 1 = \pm 2 \Rightarrow x = 1 \text{ or } x = -3`, "Take square roots: both signs."],
    ], r`$-2(2)^2 + 8 = 0$ and $-2(-2)^2 + 8 = 0$. The zeros are symmetric about $x = -1$, as they must be.`),
    callout("note", "When are there no real zeros?", r`If the parabola opens up ($a > 0$) and its vertex is above the x-axis ($k > 0$), it never reaches $y = 0$. In general there are real zeros exactly when $-\frac{k}{a} \ge 0$.`),
    callout("application", "Where this shows up", r`A ball's height might be modeled by $h = -4.9(t - 1.5)^2 + 12$ meters. The vertex says it reaches its highest point, 12 m, at $t = 1.5$ s.`),
    activity("vertex-explorer", { title: "Move the vertex" }),
    callout("tip", "Investigate", r`Make the zeros $x = 0$ and $x = 4$. Where must the vertex be? Try it with $a = 1$, then with $a = -1$. What has to change about $k$?`, "experiment"),
    activity("vertex-explorer", {
      title: "Walkthrough: from y = x² to any parabola",
      steps: [
        { title: "The parent graph", body: "y = x² has its vertex at the origin and opens up.", params: { a: 1, h: 0, k: 0 } },
        { title: "Shift right", body: "Replacing x with (x − 2) moves every point 2 units right: the vertex is now (2, 0).", params: { a: 1, h: 2, k: 0 } },
        { title: "Shift down", body: "Subtracting 3 moves the graph down: vertex (2, −3). It now crosses the x-axis twice.", params: { a: 1, h: 2, k: -3 } },
        { title: "Flip and stretch", body: "a = −2 flips it upside down and makes it narrower, and k = 3 moves the vertex up to (2, 3). The vertex is now a maximum.", params: { a: -2, h: 2, k: 3 } },
      ],
    }, "watch"),
  ],
  questions: [
    short(1, r`What is the vertex of $y = 3(x - 4)^2 - 5$? Enter it as (h, k).`, ["(4,-5)"], [r`Compare with $a(x - h)^2 + k$.`], r`$h = 4$ and $k = -5$, so the vertex is $(4, -5)$.`),
    mc(1, r`Which parabola opens downward and is wider than $y = x^2$?`, [r`$y = 2x^2$`, r`$y = -2x^2$`, r`$y = -\tfrac{1}{2}x^2$`, r`$y = \tfrac{1}{2}x^2$`], 2,
      ["Downward needs a < 0. Wider needs |a| < 1."], r`$a = -\tfrac{1}{2}$ is negative (opens down) and $|a| < 1$ (wider).`),
    short(2, r`What is the vertex of $y = (x + 6)^2 + 1$? Enter it as (h, k).`, ["(-6,1)"], [r`$(x + 6) = (x - (-6))$.`], r`$h = -6$, $k = 1$: vertex $(-6, 1)$.`),
    num(2, r`Find the larger zero of $y = (x - 3)^2 - 16$.`, 7, {}, [r`Solve $(x - 3)^2 = 16$.`], r`$x - 3 = \pm 4$, so $x = 7$ or $x = -1$. The larger is 7.`),
    mc(2, r`How many real zeros does $y = 2(x + 1)^2 + 3$ have?`, ["0", "1", "2", "Infinitely many"], 0,
      ["Which way does it open, and where is the vertex?"], r`It opens up ($a = 2 > 0$) and its lowest point is $(-1, 3)$, above the x-axis, so it never reaches $y = 0$.`),
    num(3, r`A parabola has vertex $(2, -8)$ and passes through $(4, 0)$. Find $a$ in $y = a(x - h)^2 + k$.`, 2, {},
      [r`Substitute the point into $y = a(x - 2)^2 - 8$.`], r`$0 = a(2)^2 - 8 \Rightarrow 4a = 8 \Rightarrow a = 2$.`, "review"),
  ],
});
