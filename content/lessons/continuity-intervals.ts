import { callout, def, example, figure, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "continuity-intervals",
  title: "Defining continuity at a point and over an interval",
  summary: "Use the three-part definition of continuity, extend it to intervals with one-sided continuity at endpoints, and choose constants that make piecewise functions continuous.",
  minutes: 25,
  objectives: [
    "Check continuity at a point: f(c) defined, limit exists, and they are equal.",
    "Decide whether a function is continuous on an open or closed interval.",
    "Find constants that make a piecewise function continuous.",
  ],
  concepts: [
    { slug: "continuity", name: "Continuity", description: "A function is continuous at c when its limit at c exists and equals f(c).", subject: "subj_math" },
  ],
  blocks: [
    def("Continuity at a point", r`$f$ is continuous at $c$ if (1) $f(c)$ is defined, (2) $\lim_{x \to c} f(x)$ exists, and (3) $\lim_{x \to c} f(x) = f(c)$.`),
    figure("/figures/discontinuity-types.svg", "Three graphs. Removable: a line with a hole where the function's value is plotted elsewhere. Jump: the graph jumps from one height to another. Infinite: the graph shoots up and down beside a vertical asymptote.", "Each graph fails a different condition of the definition."),
    def("On an interval", r`$f$ is continuous on $(a, b)$ if it is continuous at every point inside. On $[a, b]$ it must also be continuous from the right at $a$ ($\lim_{x \to a^+} f(x) = f(a)$) and from the left at $b$. Polynomials, rational, exponential, logarithmic and trig functions are continuous on their domains.`),
    example(r`Find $k$ so $f(x) = kx + 1$ for $x < 2$ and $f(x) = x^2$ for $x \ge 2$ is continuous.`, [
      [r`\lim_{x \to 2^-} f(x) = 2k + 1`, ""],
      [r`\lim_{x \to 2^+} f(x) = 4 = f(2)`, ""],
      [r`2k + 1 = 4 \Rightarrow k = 1.5`, "The pieces must meet."],
    ]),
    callout("application", "Where this shows up", r`Tax brackets and shipping rates are piecewise; engineers choose constants so connected pieces of a road or track join without a jump.`),
  ],
  questions: [
    num(2, r`$f(x) = ax - 3$ for $x \le 1$ and $f(x) = 2x^2 + 1$ for $x > 1$. Find $a$ so $f$ is continuous.`, 6, {}, [], r`$a - 3 = 3$, so $a = 6$.`),
    mc(1, r`On which interval is $f(x) = \frac{1}{x - 4}$ continuous?`, [r`$(-\infty, \infty)$`, r`$[0, 5]$`, r`$(4, \infty)$`, r`$[4, 8]$`], 2, [], r`It's continuous everywhere except $x = 4$.`),
    mc(2, r`$\lim_{x \to 3} f(x) = 7$ and $f(3) = 5$. Which condition fails?`, ["f(3) is defined", "The limit exists", "The limit equals f(3)", "None"], 2, [], r`The limit and the value differ.`),
    mc(3, r`Is $f(x) = \sqrt{x}$ continuous on $[0, 4]$?`, ["Yes: continuous inside and from the right at 0, from the left at 4", "No, because f(0) = 0", "No, because the limit at 0 doesn't exist", "Only on (0, 4)"], 0, [], r`At the endpoint 0 only the right-hand limit is needed, and it equals $f(0) = 0$.`, "review"),
  ],
});
