import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "simplifying-expressions",
  title: "Simplifying expressions",
  summary: "Simplify algebraic expressions with distribution, like terms, fractions and nested grouping, and test equivalence by substitution.",
  minutes: 25,
  objectives: [
    "Simplify expressions by distributing and combining like terms, including nested grouping symbols.",
    "Simplify expressions with fractional coefficients.",
    "Decide whether two expressions are equivalent, and use a counterexample to show they are not.",
  ],
  concepts: [
    { slug: "equivalent-expressions", name: "Equivalent expressions", description: "Expressions that have the same value for every value of the variables.", subject: "subj_math" },
    { slug: "like-terms", name: "Like terms", description: "Terms with exactly the same variables raised to the same powers.", subject: "subj_math" },
  ],
  blocks: [
    def("Equivalent expressions", r`Two expressions are equivalent if they have the same value for every value of their variables. $3(x + 2)$ and $3x + 6$ are equivalent; $3x + 2$ is not equivalent to either.`),
    text(r`Simplifying means rewriting an expression as an equivalent one that is shorter and easier to use: no parentheses left to distribute and no like terms left to combine. The standard order is distribute, then combine like terms, writing terms from the highest power down.`),
    example(r`Simplify $3(2x - 5) - 4(x - 3) + 2x$`, [
      [r`6x - 15 - 4x + 12 + 2x`, "Distribute 3 and −4. Note (−4)(−3) = +12."],
      [r`(6x - 4x + 2x) + (-15 + 12)`, "Group like terms."],
      [r`4x - 3`, ""],
    ], r`Check with $x = 1$: $3(-3) - 4(-2) + 2 = -9 + 8 + 2 = 1$, and $4(1) - 3 = 1$. ✓`),
    example(r`Simplify $5 - 2[\,x - 3(x + 1)\,]$`, [
      [r`5 - 2[\,x - 3x - 3\,]`, "Work from the innermost grouping out."],
      [r`5 - 2[\,-2x - 3\,]`, "Combine inside the brackets."],
      [r`5 + 4x + 6 = 4x + 11`, "Distribute −2."],
    ]),
    example(r`Simplify $\tfrac{1}{2}(4a - 6) + \tfrac{2}{3}(3a + 9)$`, [
      [r`2a - 3 + 2a + 6`, "Distribute each fraction."],
      [r`4a + 3`, ""],
    ]),
    example(r`Simplify $\dfrac{x}{3} + \dfrac{x}{4}$`, [
      [r`\tfrac{4x}{12} + \tfrac{3x}{12}`, "Common denominator 12."],
      [r`\tfrac{7x}{12}`, r`Or think of it as $\frac{1}{3}x + \frac{1}{4}x = \frac{7}{12}x$.`],
    ]),
    activity("area-model", { title: "Distributing and combining in one picture", params: { a: 2, b: -3, c: 1, d: 4 } }),
    callout("tip", "Try this", r`The model multiplies $(2x - 3)(x + 4)$. The two middle cells, $-3x$ and $8x$, are like terms. Change $b$ until they cancel exactly. What is the product then?`, "experiment"),
    callout("warning", "A counterexample settles it", r`To show two expressions are not equivalent, one value is enough. $(x + 3)^2$ and $x^2 + 9$ differ at $x = 1$: $16 \ne 10$. To show they are equivalent, you need algebra, because checking a few values doesn't cover every number.`),
    callout("application", "Where this shows up", r`Simplified formulas are faster to compute and easier to compare. A store's total for $n$ items at 4 dollars with a 10% discount and a 5-dollar fee, $0.9(4n) + 5$, simplifies to $3.6n + 5$.`),
  ],
  questions: [
    short(1, r`Simplify $7x - 2(3x + 4)$.`, ["x-8", "-8+x"], ["Distribute −2 to both terms."], r`$7x - 6x - 8 = x - 8$.`),
    short(2, r`Simplify $-(2y - 5) + 3(y - 1)$.`, ["y+2", "2+y"], [r`$-2y + 5 + 3y - 3$.`], r`$y + 2$.`),
    short(2, r`Simplify $4 - 3[\,2 - (x - 5)\,]$.`, ["3x-17", "-17+3x"], ["Innermost first: 2 − (x − 5) = 7 − x.", "Then 4 − 3(7 − x)."], r`$4 - 21 + 3x = 3x - 17$.`),
    short(2, r`Simplify $\tfrac{3}{4}(8m + 12) - 5m$.`, ["m+9", "9+m"], [r`$\frac{3}{4} \cdot 8 = 6$ and $\frac{3}{4} \cdot 12 = 9$.`], r`$6m + 9 - 5m = m + 9$.`),
    short(2, r`Simplify $\frac{x}{2} - \frac{x}{5}$. Write the answer like 3x/10.`, ["3x/10", "(3/10)x", "3/10x"], ["Common denominator 10."], r`$\frac{5x}{10} - \frac{2x}{10} = \frac{3x}{10}$.`),
    mc(2, r`Which expression is equivalent to $2(x - 4) + 3(x + 1)$?`, [r`$5x - 5$`, r`$5x - 3$`, r`$5x + 11$`, r`$6x - 5$`], 0,
      ["Distribute and combine."], r`$2x - 8 + 3x + 3 = 5x - 5$.`),
    mc(3, r`Which value of $x$ shows that $2(x + 3)$ and $2x + 3$ are not equivalent?`, ["Any value of x", "Only x = 0", "No value", "Only x = 3"], 0,
      ["Simplify 2(x + 3) and compare."], r`$2(x + 3) = 2x + 6$, which is always 3 more than $2x + 3$. They differ for every value of $x$.`, "review"),
    short(3, r`Simplify $0.4(5n - 10) - 0.2(5n + 15)$.`, ["n-7", "-7+n"], [r`$2n - 4 - n - 3$.`], r`$n - 7$.`, "review"),
  ],
});
