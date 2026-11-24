import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "intermediate-value-theorem",
  title: "The Intermediate Value Theorem",
  summary: "State the Intermediate Value Theorem, check its continuity hypothesis, and write complete justifications that a function takes a value or has a zero on an interval.",
  minutes: 25,
  objectives: [
    "State the IVT and its hypotheses.",
    "Use the IVT to guarantee a solution of f(x) = k on an interval.",
    "Write a complete AP-style justification.",
  ],
  concepts: [
    { slug: "continuity", name: "Continuity", description: "A function is continuous at c when its limit at c exists and equals f(c).", subject: "subj_math" },
  ],
  blocks: [
    def("Intermediate Value Theorem", r`If $f$ is continuous on $[a, b]$ and $k$ is any number between $f(a)$ and $f(b)$, then there is at least one $c$ in $(a, b)$ with $f(c) = k$.`),
    example(r`Show $f(x) = x^3 + x - 1$ has a zero in $(0, 1)$.`, [
      [r`f \text{ is a polynomial, so continuous on } [0, 1]`, "State the hypothesis."],
      [r`f(0) = -1 < 0 < 1 = f(1)`, ""],
      [r`\text{by the IVT, } f(c) = 0 \text{ for some } c \in (0, 1)`, "Name the theorem in the conclusion."],
    ]),
    example(r`$f$ is continuous with $f(1) = 3$, $f(2) = -1$, $f(4) = 5$. How many zeros must $f$ have on $(1, 4)$?`, [
      [r`3 \to -1 \text{ on } [1, 2]`, "Sign change: at least one zero."],
      [r`-1 \to 5 \text{ on } [2, 4]`, "Another sign change."],
      [r`\text{at least 2}`, "There could be more."],
    ]),
    callout("warning", "Continuity is required", r`$f(x) = \frac{1}{x}$ has $f(-1) = -1$ and $f(1) = 1$ but never equals 0: it isn't continuous on $[-1, 1]$.`),
    callout("application", "Where this shows up", r`Root-finding algorithms like bisection rely on the IVT: if a continuous function changes sign on an interval, halve the interval and keep the half where the sign still changes.`),
  ],
  questions: [
    mc(1, r`Which hypothesis does the IVT require on $[a, b]$?`, ["f is differentiable", "f is continuous", "f is increasing", "f(a) = f(b)"], 1, [], r`Continuity on the closed interval.`),
    num(2, r`$g$ is continuous, $g(0) = 2$, $g(3) = 8$. The IVT guarantees $g(c) = k$ for some $c \in (0, 3)$ for which value: 1, 5, 9 or 10?`, 5, {}, [], r`Only 5 is between 2 and 8.`),
    mc(2, r`A continuous $h$ has $h(1) = 4$ and $h(5) = 4$. What does the IVT guarantee about zeros of $h$ on $(1, 5)$?`, ["At least one", "Exactly one", "Nothing", "Exactly two"], 2, [], r`No sign change, so the IVT guarantees nothing (there might still be zeros).`),
    mc(3, r`Temperature at 6 a.m. was 50 °F and at noon 74 °F. Why must it have been 65 °F at some time between?`, ["Temperature is increasing", "Temperature varies continuously with time, and 65 is between 50 and 74 (IVT)", "The average is 62", "It must have been"], 1, [], r`Continuity plus the IVT.`, "review"),
  ],
});
