import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "even-odd-functions",
  title: "Even and odd functions",
  summary: "Test functions algebraically and graphically for even and odd symmetry, and use symmetry to complete graphs and simplify work.",
  minutes: 20,
  objectives: [
    "Define even and odd functions algebraically.",
    "Test a function by computing f(−x).",
    "Relate even and odd functions to y-axis and origin symmetry.",
  ],
  concepts: [
    { slug: "function-symmetry", name: "Even and odd functions", description: "f(−x) = f(x) (y-axis symmetry) or f(−x) = −f(x) (origin symmetry).", subject: "subj_math" },
  ],
  blocks: [
    def("Even and odd", r`$f$ is even if $f(-x) = f(x)$ for all $x$ in its domain: its graph is symmetric about the y-axis. $f$ is odd if $f(-x) = -f(x)$: its graph is symmetric about the origin (a $180^\circ$ rotation maps it to itself). Most functions are neither.`),
    example(r`Classify $f(x) = x^4 - 3x^2$, $g(x) = x^3 + x$, $h(x) = x^2 + x$`, [
      [r`f(-x) = x^4 - 3x^2 = f(x)`, "Even."],
      [r`g(-x) = -x^3 - x = -g(x)`, "Odd."],
      [r`h(-x) = x^2 - x`, "Neither: not h(x) and not −h(x)."],
    ]),
    callout("tip", "Power shortcut", r`A polynomial with only even powers (including constants) is even; with only odd powers, it's odd. $\cos x$ is even and $\sin x$, $\tan x$ are odd.`),
    callout("application", "Where this shows up", r`Symmetry halves the work in calculus (integrals of odd functions over $[-a, a]$ are 0) and in physics and signal processing, where signals split into even and odd parts.`),
  ],
  questions: [
    mc(1, r`Which function is even?`, [r`$x^5$`, r`$x^2 + 7$`, r`$x^3 - x$`, r`$2x + 1$`], 1, [], r`Only even powers.`),
    mc(2, r`Classify $f(x) = \frac{x}{x^2 + 1}$.`, ["Even", "Odd", "Neither", "Both"], 1, [r`Compute $f(-x)$.`], r`$f(-x) = \frac{-x}{x^2 + 1} = -f(x)$.`),
    mc(2, r`An odd function has $f(3) = 7$. What is $f(-3)$?`, ["7", "−7", "3", "Cannot tell"], 1, [], r`$f(-3) = -f(3) = -7$.`),
    mc(3, r`Which is true of every odd function defined at 0?`, [r`$f(0) = 1$`, r`$f(0) = 0$`, "f(0) is undefined", "Nothing"], 1, [r`$f(0) = -f(0)$.`], r`Only 0 equals its own negative.`, "review"),
  ],
});
