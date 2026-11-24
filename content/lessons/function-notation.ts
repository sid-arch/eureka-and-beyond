import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "function-notation",
  title: "Function notation",
  summary: "Read and use f(x) notation: evaluate functions, solve f(x) = k, read values from graphs and interpret function statements in context.",
  minutes: 25,
  objectives: [
    "Read f(x) as 'the output of f when the input is x' and avoid reading it as multiplication.",
    "Evaluate functions for numbers and expressions, and solve f(x) = k for x.",
    "Interpret statements such as f(3) = 12 in context and from a graph.",
  ],
  concepts: [
    { slug: "function-notation", name: "Function notation", description: "Writing f(x) for the output of function f at input x.", subject: "subj_math" },
    { slug: "functions", name: "Functions", description: "Relations that assign exactly one output to each input.", subject: "subj_math" },
  ],
  blocks: [
    def("Function notation", r`If $f$ is a function, $f(x)$ (read "f of x") is the output of $f$ for the input $x$. Writing $f(x) = 2x + 3$ names the function $f$ and gives its rule.`),
    callout("warning", "Not multiplication", r`$f(x)$ does not mean $f$ times $x$. The parentheses hold the input. $f(4)$ means "put 4 into $f$."`),
    text(r`Function notation lets you name several functions and say exactly which input you mean. Instead of "find $y$ when $x = 4$", you can write $f(4)$. The letter can be anything: $g(t)$, $h(n)$ or $C(m)$ for a cost after $m$ minutes.`),
    example(r`Let $f(x) = x^2 - 3x$. Find $f(-2)$ and $f(a + 1)$.`, [
      [r`f(-2) = (-2)^2 - 3(-2) = 4 + 6 = 10`, "Replace every x with (−2)."],
      [r`f(a + 1) = (a + 1)^2 - 3(a + 1)`, "Replace every x with (a + 1)."],
      [r`= a^2 + 2a + 1 - 3a - 3 = a^2 - a - 2`, "Expand and combine."],
    ]),
    example(r`Let $g(x) = 5 - 2x$. Solve $g(x) = -7$.`, [
      [r`5 - 2x = -7`, "This time the output is given; find the input."],
      [r`-2x = -12 \Rightarrow x = 6`, ""],
    ], r`Check: $g(6) = 5 - 12 = -7$. ✓`),
    example(r`$C(m) = 0.15m + 20$ is a monthly phone bill in dollars for $m$ minutes. Interpret $C(300) = 65$.`, [
      [r`C(300) = 0.15(300) + 20 = 65`, ""],
      [r`\text{300 minutes cost 65 dollars}`, "The input is minutes, the output is dollars."],
    ]),
    text(r`On a graph, $f(a)$ is the $y$-coordinate of the point above (or below) $x = a$. Solving $f(x) = k$ means finding the $x$-values where the graph has height $k$, that is, where it meets the horizontal line $y = k$.`),
    callout("tip", "Two kinds of question", r`"Find $f(5)$": you know the input, so compute the output. "Find $x$ such that $f(x) = 5$": you know the output, so solve an equation. Mixing these up is the most common error.`),
    callout("application", "Where this shows up", r`Spreadsheets and programming languages use exactly this notation: =AVERAGE(B2:B9) or area(5). A function of time, such as $h(t)$ for height, makes physics formulas easy to read.`),
  ],
  questions: [
    num(1, r`If $f(x) = 4x - 9$, find $f(3)$.`, 3, {}, ["Replace x with 3."], r`$4(3) - 9 = 3$.`),
    num(1, r`If $g(x) = x^2 + 1$, find $g(-4)$.`, 17, {}, [r`$(-4)^2 = 16$.`], r`$16 + 1 = 17$.`),
    num(2, r`If $h(t) = -16t^2 + 64t$, find $h(1.5)$.`, 60, {}, [r`$-16(2.25) + 96$.`], r`$-36 + 96 = 60$.`),
    num(2, r`If $f(x) = 3x + 7$, find $x$ so that $f(x) = 25$.`, 6, {}, [r`Solve $3x + 7 = 25$.`], r`$3x = 18$, $x = 6$.`),
    short(2, r`If $f(x) = 2x - 5$, find $f(x + 3)$ in simplest form.`, ["2x+1", "1+2x"], ["Replace x with (x + 3)."], r`$2(x + 3) - 5 = 2x + 6 - 5 = 2x + 1$.`),
    mc(2, r`$T(d)$ is the temperature in °F on day $d$ of March. What does $T(10) = 48$ mean?`, ["On March 48 it was 10 °F", "On March 10 it was 48 °F", "The temperature rose 48 degrees in 10 days", "T times 10 equals 48"], 1,
      ["The input is the day, the output is the temperature."], r`The input 10 is the day and the output 48 is the temperature.`),
    num(3, r`If $f(x) = x^2 - 2x$ and $g(x) = 3x + 1$, find $f(g(1))$.`, 8, {}, ["Work from the inside out: g(1) = 4.", "Then find f(4)."], r`$g(1) = 4$ and $f(4) = 16 - 8 = 8$.`, "review"),
    short(3, r`If $f(x) = x^2$, solve $f(x) = 49$. Enter both solutions, smaller first.`, ["-7,7"], ["Which numbers squared give 49?"], r`$x = -7$ or $x = 7$.`, "review"),
  ],
});
