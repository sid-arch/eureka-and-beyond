import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "simplifying-rational-expressions",
  title: "Simplifying rational expressions",
  summary: "Simplify rational expressions by factoring and canceling common factors, and state the values excluded from the domain.",
  minutes: 25,
  objectives: [
    "Identify excluded values of a rational expression.",
    "Simplify by factoring numerator and denominator and canceling common factors.",
    "Recognize opposite factors such as (a − b) and (b − a).",
  ],
  concepts: [
    { slug: "rational-expressions", name: "Rational expressions", description: "Ratios of polynomials, defined where the denominator is not zero.", subject: "subj_math" },
  ],
  blocks: [
    def("Rational expression", r`A ratio $\frac{P(x)}{Q(x)}$ of polynomials. It is undefined where $Q(x) = 0$; those values are excluded from the domain.`),
    example(r`Simplify $\dfrac{x^2 - 9}{x^2 + 5x + 6}$`, [
      [r`\frac{(x - 3)(x + 3)}{(x + 2)(x + 3)}`, "Factor both."],
      [r`\frac{x - 3}{x + 2},\quad x \ne -2,\ -3`, "Cancel the common factor; keep both excluded values from the original."],
    ]),
    example(r`Simplify $\dfrac{4 - x}{x^2 - 16}$`, [
      [r`\frac{-(x - 4)}{(x - 4)(x + 4)}`, r`$4 - x = -(x - 4)$.`],
      [r`-\frac{1}{x + 4},\quad x \ne \pm 4`, ""],
    ]),
    callout("warning", "Cancel factors, never terms", r`In $\frac{x + 5}{x}$ nothing cancels: the $x$ in the numerator is a term, not a factor. Only factors of the entire numerator and denominator can be divided out.`),
    callout("application", "Where this shows up", r`Average cost $\frac{C(x)}{x}$, rates of work, and lens and circuit formulas are rational expressions; simplifying makes them easier to evaluate and analyze.`),
  ],
  questions: [
    short(1, r`Simplify $\dfrac{6x^3}{9x}$ for $x \ne 0$. Use the format 2x^2/3.`, ["2x^2/3", "(2/3)x^2"], [], r`$\frac{2x^2}{3}$.`),
    short(2, r`Simplify $\dfrac{x^2 - 4x}{x^2 - 16}$. Use the format x/(x+4).`, ["x/(x+4)"], [], r`$\frac{x(x - 4)}{(x - 4)(x + 4)} = \frac{x}{x + 4}$.`),
    short(2, r`Simplify $\dfrac{x^2 + x - 12}{x^2 - 9}$.`, ["(x+4)/(x+3)"], [], r`$\frac{(x + 4)(x - 3)}{(x - 3)(x + 3)} = \frac{x + 4}{x + 3}$.`),
    mc(2, r`Which values are excluded from $\dfrac{x + 1}{x^2 - 5x + 6}$?`, ["−1", "2 and 3", "−2 and −3", "none"], 1, [], r`$(x - 2)(x - 3) = 0$ at 2 and 3.`),
    short(3, r`Simplify $\dfrac{5 - x}{x^2 - 25}$. Use the format -1/(x+5).`, ["-1/(x+5)"], [], r`$\frac{-(x - 5)}{(x - 5)(x + 5)} = -\frac{1}{x + 5}$.`, "review"),
  ],
});
