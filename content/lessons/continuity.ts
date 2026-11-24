import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "continuity",
  title: "Continuity",
  summary: "Define continuity at a point with three conditions, classify removable, jump and infinite discontinuities, and apply the Intermediate Value Theorem.",
  minutes: 30,
  objectives: [
    "State the three conditions for continuity at x = a.",
    "Classify discontinuities as removable, jump or infinite.",
    "Make a piecewise function continuous and use the Intermediate Value Theorem to show a zero exists.",
  ],
  concepts: [
    { slug: "continuity", name: "Continuity", description: "A function is continuous at a when its limit there equals its value.", subject: "subj_math" },
    { slug: "limits", name: "Limits", description: "The value a function approaches as the input approaches a point.", subject: "subj_math" },
  ],
  blocks: [
    def("Continuity at a point", r`$f$ is continuous at $a$ if (1) $f(a)$ is defined, (2) $\lim_{x \to a} f(x)$ exists, and (3) they are equal. Informally: you can draw the graph through $a$ without lifting your pencil.`),
    def("Types of discontinuity", r`Removable: the limit exists but doesn't equal $f(a)$ (a hole). Jump: the one-sided limits differ. Infinite: the function grows without bound (a vertical asymptote).`),
    example(r`Find $k$ so that $f(x) = \begin{cases} x^2 + 1, & x < 2 \\ kx - 1, & x \ge 2 \end{cases}$ is continuous`, [
      [r`\lim_{x \to 2^-} = 5,\quad f(2) = 2k - 1`, ""],
      [r`2k - 1 = 5 \Rightarrow k = 3`, ""],
    ]),
    def("Intermediate Value Theorem", r`If $f$ is continuous on $[a, b]$ and $N$ is between $f(a)$ and $f(b)$, then $f(c) = N$ for some $c$ in $(a, b)$. In particular, a sign change guarantees a zero.`),
    example(r`Show $x^3 + x - 1 = 0$ has a solution between 0 and 1`, [
      [r`f(0) = -1,\ f(1) = 1`, "Polynomials are continuous; the sign changes."],
      [r`\text{by the IVT, a zero lies in } (0, 1)`, "It's about 0.682."],
    ]),
    callout("application", "Where this shows up", r`Root-finding algorithms (bisection) rely on the IVT, and physical quantities like temperature are modeled as continuous: to go from 10° to 20°, it must pass through 15°.`),
  ],
  questions: [
    mc(1, r`$f(x) = \frac{x^2 - 1}{x - 1}$ has what kind of discontinuity at $x = 1$?`, ["Removable", "Jump", "Infinite", "None"], 0, [], r`The limit is 2 but $f(1)$ is undefined: a hole.`),
    mc(2, r`$g(x) = \frac{1}{(x - 3)^2}$ has what kind of discontinuity at $x = 3$?`, ["Removable", "Jump", "Infinite", "None"], 2, [], r`A vertical asymptote.`),
    num(2, r`Find $k$ so that $f(x) = \begin{cases} 2x + k, & x < 1 \\ 4 - x, & x \ge 1 \end{cases}$ is continuous.`, 1, {}, [r`$2 + k = 3$.`], r`$k = 1$.`),
    mc(3, r`$f$ is continuous on $[1, 5]$ with $f(1) = -2$ and $f(5) = 6$. Which must be true?`, ["f(3) = 2", "f(c) = 0 for some c in (1, 5)", "f is increasing", "f(c) = 7 for some c in (1, 5)"], 1, [], r`0 is between −2 and 6, so by the IVT some $c$ gives $f(c) = 0$.`, "review"),
  ],
});
