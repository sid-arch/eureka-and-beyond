import { activity, callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polynomial-graphs",
  title: "Graphs of polynomial functions",
  summary: "Sketch polynomials from factored form using zeros, multiplicity, the y-intercept and end behavior.",
  minutes: 30,
  objectives: [
    "Find the zeros and their multiplicities from factored form.",
    "Explain how multiplicity determines whether a graph crosses or touches the x-axis.",
    "Sketch a polynomial from its factored form and write a polynomial from a graph.",
  ],
  concepts: [
    { slug: "polynomial-functions", name: "Polynomial functions", description: "Functions built from sums of powers of x with whole-number exponents.", subject: "subj_math" },
  ],
  blocks: [
    def("Multiplicity", r`If $(x - r)^m$ is a factor, $r$ is a zero of multiplicity $m$. Odd multiplicity: the graph crosses the x-axis at $r$ (flattening if $m \ge 3$). Even multiplicity: it touches and turns around.`),
    activity("polynomial-zeros", { title: "Zeros and multiplicity", params: { a: 0.25, r1: -3, m1: 1, r2: 1, m2: 2, r3: 4, m3: 1 } }),
    callout("tip", "Try this", r`The graph touches at $x = 1$ (multiplicity 2) and crosses at $-3$ and $4$. Change multiplicity 2 to 3: the graph now flattens and crosses. Make $a$ negative and watch both ends flip.`, "experiment"),
    example(r`Sketch $f(x) = -(x + 2)(x - 1)^2$`, [
      [r`\text{zeros: } -2 \text{ (cross)},\ 1 \text{ (touch)}`, ""],
      [r`\text{degree } 3,\ \text{leading coefficient } -1`, "Left end up, right end down."],
      [r`f(0) = -(2)(1) = -2`, "y-intercept."],
    ], "Start high on the left, cross at −2, dip to a low point (−4 at x = −1), rise through the y-intercept −2 to touch at 1, then fall."),
    example(r`Write a polynomial with zeros $-1$ (multiplicity 2) and $3$ that passes through $(0, 6)$`, [
      [r`f(x) = a(x + 1)^2(x - 3)`, ""],
      [r`6 = a(1)(-3) \Rightarrow a = -2`, ""],
      [r`f(x) = -2(x + 1)^2(x - 3)`, ""],
    ]),
    callout("application", "Where this shows up", r`Polynomial models approximate roller-coaster tracks, the volume of a box made by folding up corners of a sheet, and smooth curves in computer graphics.`),
  ],
  questions: [
    mc(1, r`At a zero of multiplicity 2, the graph…`, ["crosses the x-axis", "touches and turns around", "has an asymptote", "is undefined"], 1, [], r`Even multiplicity: touches and turns.`),
    short(2, r`List the zeros of $f(x) = x(x - 4)^3(x + 5)^2$, smallest first.`, ["-5,0,4"], [], r`$-5, 0, 4$.`),
    num(2, r`What is the degree of $f(x) = x(x - 4)^3(x + 5)^2$?`, 6, {}, ["Add the multiplicities."], r`$1 + 3 + 2 = 6$.`),
    num(2, r`Find the y-intercept of $f(x) = 2(x - 1)(x + 3)(x - 2)$.`, 12, {}, [], r`$2(-1)(3)(-2) = 12$.`),
    num(3, r`A polynomial has zeros 2 (multiplicity 1) and −1 (multiplicity 2), and $f(0) = -4$. Find the leading coefficient $a$ in $a(x - 2)(x + 1)^2$.`, 2, {}, [], r`$-4 = a(-2)(1)$, so $a = 2$.`, "review"),
  ],
});
