import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rates-change-linear-quadratic",
  title: "Rates of change in linear and quadratic functions",
  summary: "Compare average rates of change of linear and quadratic functions over equal-length intervals: constant for linear, changing at a constant rate for quadratic.",
  minutes: 25,
  objectives: [
    "Compute average rates of change over consecutive equal-length intervals.",
    "Recognize linear functions by constant rates and quadratics by rates that change by a constant amount.",
    "Use second differences to identify and build quadratic models.",
  ],
  concepts: [
    { slug: "rate-of-change", name: "Average rate of change", description: "The change in output divided by the change in input over an interval.", subject: "subj_math" },
  ],
  blocks: [
    def("Linear and quadratic patterns", r`Over consecutive equal-length input intervals, a linear function has a constant average rate of change. A quadratic function's average rates of change form an arithmetic sequence: the second differences are constant. For $y = ax^2 + bx + c$ with step 1, the second difference is $2a$.`),
    example(r`$f(x) = 3x^2 - x$ on $[0, 1], [1, 2], [2, 3]$`, [
      [r`f: 0, 2, 10, 24`, ""],
      [r`\text{rates: } 2, 8, 14`, "The rate increases by 6 each step."],
      [r`6 = 2a \Rightarrow a = 3`, "Second difference 2a."],
    ]),
    callout("application", "Where this shows up", r`A falling object's average velocity changes by a constant amount each second (constant acceleration), which is exactly the quadratic pattern.`),
  ],
  questions: [
    num(1, r`Find the average rate of change of $g(x) = 4x - 7$ on $[2, 10]$.`, 4, {}, [], r`Linear: always 4.`),
    num(2, r`For $f(x) = x^2$, find the average rate of change on $[3, 5]$.`, 8, {}, [], r`$\frac{25 - 9}{2} = 8$.`),
    mc(2, r`A table has outputs 1, 4, 11, 22, 37 at x = 0, 1, 2, 3, 4. What kind of function fits?`, ["Linear", "Quadratic", "Exponential", "None"], 1, [r`First differences 3, 7, 11, 15.`], r`Second differences are all 4: quadratic (with $a = 2$).`),
    num(3, r`The second differences of a quadratic table with step 1 are all −6. What is the leading coefficient?`, -3, {}, [], r`$2a = -6$, $a = -3$.`, "review"),
  ],
});
