import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "variables-and-expressions",
  title: "Variables and algebraic expressions",
  summary: "Use letters to stand for numbers, translate words into expressions, and evaluate expressions for given values.",
  minutes: 20,
  objectives: [
    "Identify variables, coefficients, constants and terms in an expression.",
    "Translate verbal descriptions into algebraic expressions.",
    "Evaluate an expression by substituting values and following the order of operations.",
  ],
  concepts: [
    { slug: "algebraic-expressions", name: "Algebraic expressions", description: "Combinations of numbers, variables and operations that represent a quantity.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A variable is a letter that stands for a number we don't know yet, or a number that can change. Instead of writing "some number plus five", algebra writes $n + 5$. That short line can describe every possible case at once: if $n$ is 2 the value is 7, if $n$ is 10 the value is 15.`),
    def("Algebraic expression", r`A combination of numbers, variables and operations, such as $3x + 7$ or $\frac{a}{2} - b$. An expression has a value but no equals sign.`),
    text(r`Expressions are built from terms, which are separated by $+$ and $-$ signs. In $4x^2 - 3x + 9$ there are three terms. The number multiplying a variable is its coefficient: the coefficient of $x^2$ is 4 and the coefficient of $x$ is $-3$. A term with no variable, like 9, is a constant.`),
    callout("tip", "Key phrases", r`"More than" and "increased by" mean add. "Less than" reverses the order: "5 less than $x$" is $x - 5$, not $5 - x$. "Product" means multiply and "quotient" means divide.`),
    example(r`Write "three times a number, decreased by 4" as an expression`, [
      [r`n`, "Let n stand for the unknown number."],
      [r`3n`, "Three times the number."],
      [r`3n - 4`, "Decreased by 4 means subtract 4 from that product."],
    ]),
    example(r`Evaluate $2a^2 - 3b$ when $a = -3$ and $b = 4$`, [
      [r`2(-3)^2 - 3(4)`, "Substitute, keeping each value in parentheses so signs aren't lost."],
      [r`2(9) - 12`, "Exponents first: (−3)² = 9. Then multiply 3 · 4."],
      [r`18 - 12 = 6`, "Multiply, then subtract."],
    ], r`Writing $-3^2$ without parentheses would give $-9$, a common error. The square applies to $-3$ as a whole because we substituted it in parentheses.`),
    callout("application", "Where this shows up", r`A phone plan charges 25 dollars a month plus 2 dollars per gigabyte. The monthly cost is $25 + 2g$ for $g$ gigabytes. Evaluating at $g = 8$ gives $25 + 16 = 41$ dollars.`),
    callout("note", "Coming next", r`Once two expressions are set equal to each other, you have an equation. Solving equations is the next step and builds directly on evaluating expressions.`),
  ],
  questions: [
    mc(1, r`Which expression means "7 less than a number $x$"?`, [r`$7 - x$`, r`$x - 7$`, r`$7x$`, r`$x + 7$`], 1,
      [`"Less than" reverses the order in which the words appear.`],
      r`Start with $x$ and take 7 away: $x - 7$.`),
    num(1, r`Evaluate $5x + 3$ when $x = 4$.`, 23, {}, ["Replace x with 4, then multiply before adding."], r`$5(4) + 3 = 20 + 3 = 23$.`),
    num(2, r`Evaluate $3a^2 - 2b$ when $a = -2$ and $b = 5$.`, 2, {}, [r`Square $-2$ first: $(-2)^2 = 4$.`, "Then 3 · 4 = 12 and 2 · 5 = 10."], r`$3(-2)^2 - 2(5) = 3(4) - 10 = 12 - 10 = 2$.`),
    mc(2, r`What is the coefficient of $x$ in $6x^2 - x + 11$?`, ["6", "1", "−1", "11"], 2,
      [r`The term with $x$ (not $x^2$) is $-x$.`], r`$-x$ means $-1 \cdot x$, so the coefficient is $-1$.`),
    short(2, r`A taxi charges a 4-dollar base fare plus 3 dollars per mile. Write an expression for the cost of $m$ miles, using $m$.`, ["4+3m", "3m+4", "4+3*m", "3*m+4"],
      ["What is charged once, and what is charged for each mile?"], r`The 4 dollars is charged once and 3 dollars for each of the $m$ miles: $3m + 4$.`),
    num(3, r`Evaluate $\frac{x^2 - 4}{x + 2}$ when $x = 6$.`, 4, {}, ["Compute the top and bottom separately before dividing."], r`Top: $36 - 4 = 32$. Bottom: $6 + 2 = 8$. $32 \div 8 = 4$.`, "review"),
  ],
});
