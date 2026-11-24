import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "order-of-operations",
  title: "The order of operations",
  summary: "Evaluate expressions with several operations in the agreed order, including grouping symbols, fraction bars and negative numbers.",
  minutes: 20,
  objectives: [
    "State the order of operations and explain why a shared convention is needed.",
    "Evaluate expressions with grouping symbols, exponents, multiplication, division, addition and subtraction.",
    "Treat a fraction bar and absolute value bars as grouping symbols.",
  ],
  concepts: [
    { slug: "order-of-operations", name: "Order of operations", description: "The convention for which operations to carry out first in an expression.", subject: "subj_math" },
  ],
  blocks: [
    text(r`What is $3 + 4 \times 5$? If you add first you get 35; if you multiply first you get 23. Both can't be right, so mathematicians agree on one order. The agreed answer is 23.`),
    def("Order of operations", r`1. Grouping symbols: parentheses ( ), brackets [ ], braces { }, absolute value bars, fraction bars and radicals, innermost first.
2. Exponents (powers and roots).
3. Multiplication and division, from left to right.
4. Addition and subtraction, from left to right.`),
    callout("warning", "PEMDAS can mislead", r`The memory aid PEMDAS lists M before D and A before S, but multiplication and division have equal rank (as do addition and subtraction). Work left to right within each rank. $12 \div 3 \times 2 = 4 \times 2 = 8$, not $12 \div 6 = 2$.`),
    example(r`Evaluate $20 - 3(4 - 6)^2 \div 6$`, [
      [r`20 - 3(-2)^2 \div 6`, "Parentheses first: 4 − 6 = −2."],
      [r`20 - 3(4) \div 6`, "Exponent: (−2)² = 4."],
      [r`20 - 12 \div 6 = 20 - 2`, "Multiply and divide left to right: 3 · 4 = 12, then 12 ÷ 6 = 2."],
      [r`18`, "Subtract last."],
    ]),
    example(r`Evaluate $\dfrac{5^2 - 9}{2 + 6} + |{-3}|$`, [
      [r`\dfrac{25 - 9}{8} + 3`, "The fraction bar groups the top and the bottom separately. Absolute value bars group too."],
      [r`\dfrac{16}{8} + 3 = 2 + 3`, "Finish the top, then divide."],
      [r`5`, ""],
    ]),
    example(r`Evaluate $2[\,9 - (1 + 3)^2\,] - 4$`, [
      [r`2[\,9 - 4^2\,] - 4`, "Innermost grouping first."],
      [r`2[\,9 - 16\,] - 4 = 2(-7) - 4`, ""],
      [r`-14 - 4 = -18`, ""],
    ]),
    callout("tip", "Underline as you go", r`Rewrite the whole expression after each step, changing only one part. It is slower on paper but almost eliminates mistakes with signs and skipped terms.`),
    callout("application", "Where this shows up", r`Spreadsheets and calculators follow the same order. Typing =100-20/4 gives 95, not 20. To average three test scores you need =(85+90+77)/3; without the parentheses only 77 is divided.`),
  ],
  questions: [
    num(1, r`Evaluate $6 + 8 \div 2$.`, 10, {}, ["Divide before adding."], r`$8 \div 2 = 4$, then $6 + 4 = 10$.`),
    num(1, r`Evaluate $(6 + 8) \div 2$.`, 7, {}, ["Parentheses first."], r`$14 \div 2 = 7$.`),
    num(2, r`Evaluate $18 \div 3 \times 2 - 4$.`, 8, {}, ["Divide and multiply from left to right."], r`$18 \div 3 = 6$, $6 \times 2 = 12$, $12 - 4 = 8$.`),
    num(2, r`Evaluate $5 - 2^3 + 4 \cdot 3$.`, 9, {}, ["Exponent first: 2³ = 8."], r`$5 - 8 + 12 = 9$.`),
    num(2, r`Evaluate $\dfrac{3 + 4 \cdot 6}{7 - 4}$.`, 9, {}, ["Simplify the numerator and denominator separately.", "Numerator: 3 + 24."], r`$\frac{27}{3} = 9$.`),
    num(2, r`Evaluate $-3^2 + (-3)^2$.`, 0, {}, [r`$-3^2 = -9$ and $(-3)^2 = 9$.`], r`$-9 + 9 = 0$.`),
    mc(2, r`Where should parentheses go so that $2 + 6 \times 3 - 1 = 16$?`, [r`$(2 + 6) \times 3 - 1$`, r`$2 + 6 \times (3 - 1)$`, r`$(2 + 6) \times (3 - 1)$`, r`$2 + (6 \times 3 - 1)$`], 2,
      ["Evaluate each option.", "16 = 8 × 2. Which grouping makes an 8 and a 2?"], r`$(2 + 6) \times (3 - 1) = 8 \times 2 = 16$. The others give $23$, $14$ and $19$.`),
    num(3, r`Evaluate $4\left[\,10 - 2(7 - 9)\,\right] \div 8$.`, 7, {}, ["Innermost: 7 − 9 = −2.", "Then 10 − 2(−2) = 14."], r`$4 \cdot 14 \div 8 = 56 \div 8 = 7$.`, "review"),
    short(3, r`A student evaluated $24 \div 4 \cdot 2$ as 3. What is the correct value?`, ["12"], ["Division and multiplication have equal rank; go left to right."], r`$24 \div 4 = 6$, then $6 \cdot 2 = 12$. The student multiplied first.`, "review"),
  ],
});
