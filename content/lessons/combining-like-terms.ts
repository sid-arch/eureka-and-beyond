import { callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "combining-like-terms",
  title: "Combining like terms",
  summary: "Identify like terms and simplify expressions by combining them, including after distributing.",
  minutes: 20,
  objectives: [
    "Identify like terms by their variable parts.",
    "Combine like terms by adding or subtracting their coefficients.",
    "Simplify expressions that require distributing first, including subtracting a group.",
  ],
  concepts: [
    { slug: "like-terms", name: "Like terms", description: "Terms with exactly the same variables raised to the same powers.", subject: "subj_math" },
  ],
  blocks: [
    def("Like terms", r`Terms whose variable parts are identical: same variables, same exponents. $5x$ and $-2x$ are like terms. $3x^2$ and $3x$ are not, and neither are $4xy$ and $4x$. All constants are like terms with each other.`),
    text(r`Combining like terms is the distributive property in reverse: $5x + 3x = (5 + 3)x = 8x$. Think of $x$ as a unit, like "apples": 5 apples plus 3 apples is 8 apples. But 5 apples plus 3 oranges stays $5a + 3o$.`),
    example(r`Simplify $7x + 4 - 2x + 9$`, [
      [r`(7x - 2x) + (4 + 9)`, "Group like terms, keeping each term's sign with it."],
      [r`5x + 13`, ""],
    ]),
    example(r`Simplify $3a^2 - 5a + a^2 + 8a - 6$`, [
      [r`(3a^2 + a^2) + (-5a + 8a) - 6`, r`$a^2$ means $1a^2$.`],
      [r`4a^2 + 3a - 6`, "Write the highest power first by convention."],
    ]),
    example(r`Simplify $5(2y - 3) - (4y - 7)$`, [
      [r`10y - 15 - 4y + 7`, "Distribute 5 and −1. Subtracting the group changes the sign of every term in it."],
      [r`6y - 8`, "Combine: 10y − 4y and −15 + 7."],
    ], r`Check with $y = 2$: $5(1) - (1) = 4$ and $6(2) - 8 = 4$. ✓`),
    callout("warning", "Exponents don't change when combining", r`$4x^2 + 3x^2 = 7x^2$, not $7x^4$. You add the coefficients; the variable part stays the same. Also, $x + x = 2x$, while $x \cdot x = x^2$.`),
    callout("tip", "Check by substituting", r`Pick an easy value like $x = 2$ and evaluate both the original and your simplified expression. If they disagree, there is an error. (If they agree, you are very likely right.)`),
    callout("application", "Where this shows up", r`A rectangle with length $2x + 5$ and width $x - 1$ has perimeter $2(2x + 5) + 2(x - 1) = 4x + 10 + 2x - 2 = 6x + 8$. Simplifying makes formulas easier to use and compare.`),
  ],
  questions: [
    short(1, r`Simplify $9m + 4m - 3m$.`, ["10m"], ["Add and subtract the coefficients."], r`$(9 + 4 - 3)m = 10m$.`),
    short(1, r`Simplify $6x + 5 - 2x - 8$.`, ["4x-3", "-3+4x"], ["Combine the x-terms and the constants separately."], r`$4x - 3$.`),
    mc(1, r`Which pair are like terms?`, [r`$3x$ and $3y$`, r`$5x^2$ and $5x$`, r`$-7ab$ and $2ab$`, r`$4$ and $4x$`], 2,
      ["Look for identical variable parts."], r`$-7ab$ and $2ab$ both have the variable part $ab$.`),
    short(2, r`Simplify $2p^2 + 3p - 5p^2 + p$.`, ["-3p^2+4p", "4p-3p^2"], [r`$2p^2 - 5p^2 = -3p^2$.`, r`$3p + p = 4p$.`], r`$-3p^2 + 4p$.`),
    short(2, r`Simplify $4(x + 2) + 3(x - 1)$.`, ["7x+5", "5+7x"], ["Distribute both, then combine."], r`$4x + 8 + 3x - 3 = 7x + 5$.`),
    short(2, r`Simplify $8 - (3n - 2)$.`, ["10-3n", "-3n+10"], [r`$-(3n - 2) = -3n + 2$.`], r`$8 - 3n + 2 = 10 - 3n$.`),
    short(3, r`Simplify $\tfrac{1}{2}(4a - 6) - 2(a - 5)$.`, ["7"], [r`$2a - 3 - 2a + 10$.`], r`The $a$-terms cancel: $2a - 2a = 0$, leaving $-3 + 10 = 7$.`, "review"),
    short(3, r`A triangle has sides $x + 3$, $2x - 1$ and $3x$. Write its perimeter in simplest form.`, ["6x+2", "2+6x"], ["Add all three sides."], r`$(x + 2x + 3x) + (3 - 1) = 6x + 2$.`, "review"),
  ],
});
