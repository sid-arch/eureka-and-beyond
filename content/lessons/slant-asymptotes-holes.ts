import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "slant-asymptotes-holes",
  title: "Slant asymptotes and holes",
  summary: "Find slant (oblique) asymptotes by polynomial division when the numerator's degree is one more than the denominator's, and locate holes precisely.",
  minutes: 30,
  objectives: [
    "Identify when a rational function has a slant asymptote.",
    "Find the slant asymptote by division.",
    "Find the coordinates of holes and sketch the complete graph.",
  ],
  concepts: [
    { slug: "rational-functions", name: "Rational functions", description: "Functions that are ratios of polynomials, with asymptotes and holes.", subject: "subj_math" },
  ],
  formulas: [],
  blocks: [
    def("Slant asymptote", r`If the numerator's degree is exactly one more than the denominator's, divide: $f(x) = mx + b + \frac{R(x)}{Q(x)}$. As $|x| \to \infty$ the remainder fraction goes to 0, so the graph approaches the line $y = mx + b$.`),
    example(r`Find the asymptotes of $f(x) = \dfrac{x^2 + x - 1}{x - 1}$`, [
      [r`\frac{x^2 + x - 1}{x - 1} = x + 2 + \frac{1}{x - 1}`, "Divide (synthetic with c = 1: 1, 2, 1)."],
      [r`\text{slant: } y = x + 2;\ \text{vertical: } x = 1`, ""],
    ]),
    example(r`Find the hole of $g(x) = \dfrac{x^2 - x - 6}{x^2 - 9}$`, [
      [r`\frac{(x - 3)(x + 2)}{(x - 3)(x + 3)} = \frac{x + 2}{x + 3},\ x \ne 3`, ""],
      [r`\text{hole at } \left(3, \tfrac{5}{6}\right)`, "Evaluate the simplified form at x = 3."],
      [r`\text{VA } x = -3,\ \text{HA } y = 1`, ""],
    ]),
    callout("application", "Where this shows up", r`Average-cost and efficiency curves often have slant asymptotes, describing how a quantity behaves almost linearly at large scale.`),
  ],
  questions: [
    short(2, r`Find the slant asymptote of $f(x) = \dfrac{x^2 + 3x + 5}{x + 1}$. Use the format y=x+2.`, ["y=x+2"], ["Divide: 1, 2, remainder 3."], r`$x + 2 + \frac{3}{x + 1}$, so $y = x + 2$.`),
    short(2, r`Find the slant asymptote of $f(x) = \dfrac{2x^2 - 1}{x}$.`, ["y=2x"], [], r`$2x - \frac{1}{x}$: $y = 2x$.`),
    mc(2, r`Which function has a slant asymptote?`, [r`$\frac{x^2}{x^2 + 1}$`, r`$\frac{x^3}{x^2 + 1}$`, r`$\frac{x}{x^2 + 1}$`, r`$\frac{x^4}{x + 1}$`], 1, ["Numerator degree exactly one more."], r`Degrees 3 and 2.`),
    short(3, r`Find the hole of $f(x) = \dfrac{x^2 - 1}{x - 1}$. Enter as (x,y).`, ["(1,2)"], [], r`$f = x + 1$ for $x \ne 1$; hole at $(1, 2)$.`, "review"),
  ],
});
