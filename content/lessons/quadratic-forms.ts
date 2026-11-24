import { activity, callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "quadratic-forms",
  title: "Vertex, standard and factored forms",
  summary: "Move between the three forms of a quadratic and choose the form that reveals the feature you need: vertex, y-intercept or zeros.",
  minutes: 30,
  objectives: [
    "Read the vertex from vertex form, the y-intercept from standard form and the zeros from factored form.",
    "Convert between forms by expanding, factoring and completing the square.",
    "Write a quadratic from its zeros and one other point.",
  ],
  concepts: [
    { slug: "quadratic-functions", name: "Quadratic functions", description: "Functions of the form f(x) = ax² + bx + c with a ≠ 0, whose graphs are parabolas.", subject: "subj_math" },
  ],
  formulas: ["vertex-form", "quadratic-formula"],
  blocks: [
    def("Three forms", r`Standard: $y = ax^2 + bx + c$ (y-intercept $c$). Vertex: $y = a(x - h)^2 + k$ (vertex $(h, k)$). Factored: $y = a(x - p)(x - q)$ (zeros $p$ and $q$; axis of symmetry halfway between, $x = \frac{p + q}{2}$). All three have the same $a$.`),
    example(r`Write $y = 2x^2 - 4x - 6$ in factored and vertex forms`, [
      [r`y = 2(x^2 - 2x - 3) = 2(x - 3)(x + 1)`, "Factor: zeros 3 and −1."],
      [r`h = \tfrac{3 + (-1)}{2} = 1,\ k = 2(1)^2 - 4 - 6 = -8`, "Vertex halfway between the zeros."],
      [r`y = 2(x - 1)^2 - 8`, ""],
    ]),
    example(r`Write the quadratic with zeros $-2$ and 5 that passes through $(3, -20)$`, [
      [r`y = a(x + 2)(x - 5)`, ""],
      [r`-20 = a(5)(-2) \Rightarrow a = 2`, ""],
      [r`y = 2(x + 2)(x - 5) = 2x^2 - 6x - 20`, ""],
    ]),
    activity("vertex-explorer", { title: "Vertex form and expanded form together", params: { a: 2, h: 1, k: -4 } }),
    callout("tip", "Try this", r`The readouts show the zeros and the expanded (standard) form for the vertex form you set. Move the vertex so the zeros are integers, then write the factored form yourself.`, "experiment"),
    callout("warning", "Not every quadratic factors over the reals", r`If the parabola doesn't cross the x-axis (for example $y = x^2 + 4$), it has no real zeros and no real factored form. Its zeros are complex, as the next lessons show.`),
    callout("application", "Where this shows up", r`An engineer uses vertex form for the maximum height of an arch, factored form for where it meets the ground, and standard form for its height at the center line (x = 0).`),
  ],
  questions: [
    short(1, r`What is the vertex of $y = -3(x + 4)^2 + 7$? Enter as (h,k).`, ["(-4,7)"], [], r`$(-4, 7)$.`),
    short(2, r`What are the zeros of $y = 5(x - 2)(x + 6)$? Enter both, smaller first.`, ["-6,2"], [], r`$-6$ and $2$.`),
    short(2, r`Write $y = (x - 3)^2 - 4$ in standard form.`, ["x^2-6x+5"], [], r`$x^2 - 6x + 9 - 4 = x^2 - 6x + 5$.`),
    short(2, r`Write $y = x^2 + 2x - 15$ in factored form.`, ["(x+5)(x-3)", "(x-3)(x+5)"], [], r`$(x + 5)(x - 3)$.`),
    mc(3, r`A parabola has zeros 1 and 7 and vertex $(4, -18)$. What is $a$?`, ["1", "2", "−2", "−18"], 1, [r`$y = a(x - 1)(x - 7)$ at $x = 4$.`], r`$-18 = a(3)(-3)$, so $a = 2$.`, "review"),
  ],
});
