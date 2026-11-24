import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parent-functions",
  title: "Parent functions and their graphs",
  summary: "Recognize the graphs, domains, ranges and key features of the main parent functions, and identify the family a function belongs to.",
  minutes: 25,
  objectives: [
    "Sketch the linear, quadratic, cubic, absolute value, square root, cube root, reciprocal and exponential parent functions.",
    "State the domain, range, intercepts and end behavior of each.",
    "Identify the parent function of a transformed equation or graph.",
  ],
  concepts: [
    { slug: "function-families", name: "Function families", description: "Groups of functions that share a parent function and its basic shape.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A function family is all the transformations of one simple parent function. Know the parent graphs well and every transformed function becomes a shift, stretch or reflection of a shape you already know.`),
    def("The main parents", r`Linear $y = x$; quadratic $y = x^2$ (parabola, range $y \ge 0$); cubic $y = x^3$ (S-shape, all reals); absolute value $y = |x|$ (V, range $y \ge 0$); square root $y = \sqrt{x}$ (domain and range $\ge 0$); cube root $y = \sqrt[3]{x}$ (all reals); reciprocal $y = \frac{1}{x}$ (asymptotes $x = 0$ and $y = 0$); exponential $y = 2^x$ (range $y > 0$, asymptote $y = 0$).`),
    example(r`Identify the parent and describe $g(x) = -\sqrt{x + 3}$`, [
      [r`\text{parent } y = \sqrt{x}`, ""],
      [r`\text{left 3, reflected over the } x\text{-axis}`, "Domain x ≥ −3, range y ≤ 0."],
    ]),
    activity("polynomial-zeros", { title: "Cubic and quadratic shapes", params: { a: 0.2, r1: 0, m1: 3, r2: 0, m2: 0, r3: 0, m3: 0 } }),
    callout("tip", "Try this", r`This shows $y = 0.2x^3$, a scaled cubic parent. Change the multiplicity to 2 for a parabola shape. Which parents are symmetric about the y-axis (even) and which about the origin (odd)?`, "experiment"),
    def("Even and odd functions", r`A function is even if $f(-x) = f(x)$ (symmetric about the y-axis), like $x^2$ and $|x|$. It is odd if $f(-x) = -f(x)$ (symmetric about the origin), like $x^3$, $\frac{1}{x}$ and $\sqrt[3]{x}$.`),
    callout("application", "Where this shows up", r`Recognizing a family from data guides modeling: a falling object follows a quadratic, inverse-square laws follow a reciprocal-type curve, and populations follow exponentials.`),
  ],
  questions: [
    mc(1, r`Which parent function has range $y \ge 0$ and a V shape?`, [r`$y = x^2$`, r`$y = |x|$`, r`$y = \sqrt{x}$`, r`$y = x^3$`], 1, [], r`The absolute value function.`),
    mc(2, r`Which parent function has domain $x \ge 0$?`, [r`$y = \sqrt[3]{x}$`, r`$y = \sqrt{x}$`, r`$y = \frac{1}{x}$`, r`$y = 2^x$`], 1, [], r`Square roots of negatives aren't real.`),
    mc(2, r`What is the parent function of $f(x) = 3(x - 1)^3 + 2$?`, ["Quadratic", "Cubic", "Absolute value", "Exponential"], 1, [], r`The cubic $y = x^3$.`),
    mc(2, r`Which function is odd?`, [r`$y = x^2$`, r`$y = |x|$`, r`$y = x^3$`, r`$y = \sqrt{x}$`], 2, [r`Check $f(-x) = -f(x)$.`], r`$(-x)^3 = -x^3$.`),
    short(3, r`State the domain of $g(x) = \sqrt{x - 4} + 1$ as an inequality, like x>=…`, ["x>=4", "x≥4"], [], r`$x \ge 4$.`, "review"),
  ],
});
