import { activity, callout, def, example, lesson, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "average-instantaneous-rates",
  title: "Defining average and instantaneous rates of change",
  summary: "Compute average rates of change over intervals, and define the instantaneous rate of change as the limit of average rates over shrinking intervals.",
  minutes: 25,
  objectives: [
    "Compute an average rate of change with units.",
    "Express an instantaneous rate of change as a limit of difference quotients.",
    "Interpret both as slopes: secant and tangent.",
  ],
  concepts: [
    { slug: "rate-of-change", name: "Average rate of change", description: "The change in output divided by the change in input over an interval.", subject: "subj_math" },
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["derivative-definition"],
  blocks: [
    def("Average rate of change", r`On $[a, b]$: $\frac{f(b) - f(a)}{b - a}$, the slope of the secant line through $(a, f(a))$ and $(b, f(b))$.`),
    def("Instantaneous rate of change", r`At $x = a$: $\lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$, the slope of the tangent line, when the limit exists.`),
    example(r`A ball falls $s(t) = 16t^2$ feet in $t$ seconds.`, [
      [r`\text{average on } [1, 3]: \tfrac{144 - 16}{2} = 64 \text{ ft/s}`, ""],
      [r`\frac{16(2 + h)^2 - 64}{h} = 64 + 16h`, "Average velocity on [2, 2 + h]."],
      [r`\lim_{h \to 0} (64 + 16h) = 64 \text{ ft/s}`, "Instantaneous velocity at t = 2."],
    ]),
    activity("tangent-line", { title: "Shrink the interval", params: { fn: "x^2" } }),
    callout("tip", "Try this", r`Set $a = 1$ and slide $h$ toward 0 from both sides. The orange secant slope closes in on the green tangent slope, 2.`, "experiment"),
    callout("application", "Where this shows up", r`A car's trip computer reports average speed; its speedometer reports instantaneous speed. Calculus is the bridge between the two.`),
  ],
  questions: [
    num(1, r`Find the average rate of change of $f(x) = x^3$ on $[1, 3]$.`, 13, {}, [], r`$\frac{27 - 1}{2} = 13$.`),
    num(2, r`Water volume is $V(t) = 200 - 4t^2$ liters. Find the average rate of change on $[0, 5]$, in liters per minute.`, -20, { unit: "L/min" }, [], r`$\frac{100 - 200}{5} = -20$.`),
    num(2, r`Use the limit to find the instantaneous rate of change of $f(x) = x^3$ at $x = 2$.`, 12, {}, [r`$(2 + h)^3 = 8 + 12h + 6h^2 + h^3$.`], r`$\frac{12h + 6h^2 + h^3}{h} \to 12$.`),
    num(3, r`For $s(t) = 16t^2$, find the average velocity on $[2, 2.1]$, in ft/s.`, 65.6, { tolerance: 0.01, unit: "ft/s" }, [], r`$64 + 16(0.1) = 65.6$, close to the instantaneous 64.`, "review"),
  ],
});
