import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "extreme-value-critical-points",
  title: "The Extreme Value Theorem, global versus local extrema, and critical points",
  summary: "Distinguish local from global extrema, state the Extreme Value Theorem, and find critical points where f′ is zero or undefined.",
  minutes: 25,
  objectives: [
    "Define local (relative) and global (absolute) extrema.",
    "State when the EVT guarantees a maximum and minimum.",
    "Find critical points, including where f′ is undefined.",
  ],
  concepts: [
    { slug: "extrema", name: "Extrema", description: "Maximum and minimum values of a function, locally or over its whole domain.", subject: "subj_math" },
  ],
  blocks: [
    def("Local and global extrema", r`$f(c)$ is a local maximum if $f(c) \ge f(x)$ for $x$ near $c$, and a global (absolute) maximum if $f(c) \ge f(x)$ for all $x$ in the domain. Minimums are defined the same way.`),
    def("Extreme Value Theorem", r`If $f$ is continuous on a closed interval $[a, b]$, then $f$ has both an absolute maximum and an absolute minimum on $[a, b]$.`),
    def("Critical points", r`$c$ is a critical point of $f$ if $c$ is in the domain and $f'(c) = 0$ or $f'(c)$ is undefined. Local extrema inside an interval can only occur at critical points.`),
    example(r`Critical points of $f(x) = x^3 - 12x$ and $g(x) = x^{2/3}$`, [
      [r`f'(x) = 3x^2 - 12 = 0 \Rightarrow x = \pm 2`, ""],
      [r`g'(x) = \tfrac{2}{3}x^{-1/3},\ \text{undefined at } 0`, "x = 0 is critical (a cusp minimum)."],
    ]),
    activity("derivative-graph", { title: "Local extrema sit where f′ crosses zero", params: { fn: "quartic", a: -1.4 } }),
    callout("warning", "Critical doesn't mean extreme", r`$f(x) = x^3$ has $f'(0) = 0$, but 0 isn't a maximum or minimum. Critical points are only candidates.`),
    callout("application", "Where this shows up", r`Engineers look for critical points of stress in a beam: the maximum stress must occur at a critical point or at an end.`),
  ],
  questions: [
    mc(1, r`The critical points of $x^3 - 3x^2$ are…`, ["x = 0 only", "x = 0 and x = 2", "x = 3", "x = 1 and x = 3"], 1, [], r`$3x^2 - 6x = 3x(x - 2)$.`),
    mc(2, r`Which function is guaranteed an absolute max and min by the EVT?`, [r`$\frac{1}{x}$ on $[-1, 1]$`, r`$x^2$ on $(0, 1)$`, r`$\sin x$ on $[0, 10]$`, r`$\tan x$ on $[0, \pi]$`], 2, [], r`Continuous on a closed interval.`),
    mc(2, r`$f(x) = |x - 2|$ has a critical point at…`, ["x = 0", "x = 2", "none", "x = −2"], 1, [], r`$f'(2)$ is undefined, and 2 is in the domain.`),
    mc(3, r`On $(0, 1)$, $f(x) = x$ has…`, ["absolute max 1", "absolute min 0", "no absolute extrema", "a critical point"], 2, [], r`The interval is open, so the endpoints aren't included; the EVT doesn't apply.`, "review"),
  ],
});
