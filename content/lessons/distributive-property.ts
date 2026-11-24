import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "distributive-property",
  title: "The distributive property",
  summary: "Multiply a factor across a sum or difference, handle negative factors, and run the property in reverse to factor out a common factor.",
  minutes: 20,
  objectives: [
    "State the distributive property and model it with area.",
    "Expand expressions such as −3(2x − 5) correctly, including signs.",
    "Factor out the greatest common factor from a simple expression.",
  ],
  concepts: [
    { slug: "distributive-property", name: "Distributive property", description: "a(b + c) = ab + ac: multiplication distributes over addition and subtraction.", subject: "subj_math" },
  ],
  blocks: [
    def("Distributive property", r`For any numbers $a$, $b$ and $c$: $a(b + c) = ab + ac$ and $a(b - c) = ab - ac$.`),
    text(r`Picture a rectangle with width $a$ and length $b + c$. Its area is $a(b + c)$, but you can also split it into two rectangles with areas $ab$ and $ac$. Both descriptions measure the same area, so they are equal.`),
    activity("area-model", { title: "See distribution as area", params: { a: 1, b: 4, c: 1, d: 3 } }),
    callout("tip", "Try this", r`The area model shows two binomials multiplied. Treat the side length $x + 3$ as "the factor being distributed": the top row is $x \cdot (x + 4)$ and the bottom row is $3 \cdot (x + 4)$. Make $d$ negative and watch the bottom row turn red.`, "experiment"),
    example(r`Expand $4(3x + 7)$`, [
      [r`4 \cdot 3x + 4 \cdot 7`, "Multiply 4 by each term inside."],
      [r`12x + 28`, ""],
    ]),
    example(r`Expand $-3(2x - 5)$`, [
      [r`(-3)(2x) + (-3)(-5)`, "The −3 multiplies both terms, including the −5."],
      [r`-6x + 15`, "Negative times negative is positive."],
    ], r`Check with $x = 1$: $-3(2 - 5) = -3(-3) = 9$ and $-6 + 15 = 9$. ✓`),
    example(r`Simplify $-(x - 8)$ and $\tfrac{1}{2}(6y + 10)$`, [
      [r`-(x - 8) = -1(x - 8) = -x + 8`, "A minus sign in front of parentheses means −1 times."],
      [r`\tfrac{1}{2}(6y + 10) = 3y + 5`, ""],
    ]),
    text(r`Running the property backwards is called factoring out a common factor. In $12x + 18$, both terms are divisible by 6, so $12x + 18 = 6(2x + 3)$. Using the greatest common factor leaves no common factor inside the parentheses.`),
    callout("warning", "Distribute to every term", r`$5(x + 2) \ne 5x + 2$. The 5 multiplies the 2 as well: $5x + 10$. And $-2(x - 4) \ne -2x - 8$; the second term is $(-2)(-4) = +8$.`),
    callout("application", "Mental math", r`To compute $7 \times 98$ in your head, think $7(100 - 2) = 700 - 14 = 686$. To find the cost of 6 items at 4.95 dollars, think $6(5 - 0.05) = 30 - 0.30 = 29.70$ dollars.`),
  ],
  questions: [
    short(1, r`Expand $6(x + 4)$.`, ["6x+24", "24+6x"], ["Multiply 6 by x and by 4."], r`$6x + 24$.`),
    short(1, r`Expand $-2(5a - 3)$.`, ["-10a+6", "6-10a"], [r`$(-2)(-3) = +6$.`], r`$-10a + 6$.`),
    short(2, r`Expand $-(4 - 3y)$.`, ["-4+3y", "3y-4"], ["Multiply each term by −1."], r`$-4 + 3y$, or $3y - 4$.`),
    short(2, r`Expand $\tfrac{2}{3}(9m - 12)$.`, ["6m-8", "-8+6m"], [r`$\frac{2}{3} \cdot 9 = 6$ and $\frac{2}{3} \cdot 12 = 8$.`], r`$6m - 8$.`),
    short(2, r`Factor out the greatest common factor: $15x + 25$.`, ["5(3x+5)", "5(5+3x)"], ["What is the GCF of 15 and 25?"], r`$5(3x + 5)$.`),
    mc(2, r`Which expression is equivalent to $-4(x - 2y + 1)$?`, [r`$-4x - 8y - 4$`, r`$-4x + 8y - 4$`, r`$-4x + 2y + 1$`, r`$-4x - 2y - 4$`], 1,
      ["Multiply each of the three terms by −4."], r`$(-4)(x) + (-4)(-2y) + (-4)(1) = -4x + 8y - 4$.`),
    short(3, r`Use the distributive property to compute $8 \times 103$ mentally. Enter the product.`, ["824"], [r`$8(100 + 3)$.`], r`$800 + 24 = 824$.`, "review"),
    short(3, r`Factor out the GCF, including a negative sign so the first term inside is positive: $-14x - 21$.`, ["-7(2x+3)", "-7(3+2x)"], ["The GCF of 14 and 21 is 7.", "Factor out −7."], r`$-7(2x + 3)$. Check: $-7 \cdot 2x = -14x$ and $-7 \cdot 3 = -21$.`, "review"),
  ],
});
