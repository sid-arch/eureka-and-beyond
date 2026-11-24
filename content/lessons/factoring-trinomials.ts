import { activity, callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "factoring-trinomials",
  title: "Factoring trinomials",
  summary: "Factor x² + bx + c by finding two numbers with the right product and sum, and factor ax² + bx + c with the ac (grouping) method.",
  minutes: 30,
  objectives: [
    "Factor x² + bx + c by finding integers whose product is c and sum is b.",
    "Use signs of b and c to narrow the search.",
    "Factor ax² + bx + c with a ≠ 1 using the ac method, after removing any GCF.",
  ],
  concepts: [
    { slug: "factoring", name: "Factoring", description: "Writing a polynomial as a product of simpler polynomials.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Multiplying $(x + p)(x + q)$ gives $x^2 + (p + q)x + pq$. So to factor $x^2 + bx + c$, look for two numbers $p$ and $q$ with product $c$ and sum $b$.`),
    example(r`Factor $x^2 + 7x + 12$`, [
      [r`pq = 12,\ p + q = 7`, "List factor pairs of 12: 1·12, 2·6, 3·4."],
      [r`3 \cdot 4 = 12,\ 3 + 4 = 7`, ""],
      [r`(x + 3)(x + 4)`, ""],
    ]),
    callout("tip", "Let the signs guide you", r`If $c > 0$, both numbers have the same sign as $b$. If $c < 0$, the numbers have opposite signs, and the larger absolute value takes the sign of $b$.`),
    example(r`Factor $x^2 - 2x - 15$`, [
      [r`pq = -15,\ p + q = -2`, "c is negative: opposite signs."],
      [r`-5 \cdot 3 = -15,\ -5 + 3 = -2`, ""],
      [r`(x - 5)(x + 3)`, ""],
    ], r`Check: $x^2 + 3x - 5x - 15 = x^2 - 2x - 15$. ✓`),
    activity("area-model", { title: "Factoring as finding the edges", params: { a: 1, b: -5, c: 1, d: 3 } }),
    callout("tip", "Try this", r`Set the sliders so the product reads $x^2 + x - 12$. Which edges do you need? Then try $x^2 - 7x + 12$. The constant cell is $bd$ and the middle cells add to the $x$-coefficient.`, "experiment"),
    example(r`Factor $6x^2 + 11x - 10$ (the ac method)`, [
      [r`ac = 6(-10) = -60,\ b = 11`, "Find two numbers with product −60 and sum 11."],
      [r`15 \cdot (-4) = -60,\ 15 - 4 = 11`, ""],
      [r`6x^2 + 15x - 4x - 10`, "Split the middle term."],
      [r`3x(2x + 5) - 2(2x + 5) = (2x + 5)(3x - 2)`, "Factor by grouping."],
    ], r`Check: $6x^2 - 4x + 15x - 10$. ✓`),
    example(r`Factor $2x^3 - 8x^2 - 24x$ completely`, [
      [r`2x(x^2 - 4x - 12)`, "Always take out the GCF first."],
      [r`2x(x - 6)(x + 2)`, "−6 · 2 = −12 and −6 + 2 = −4."],
    ]),
    callout("warning", "Some trinomials don't factor", r`$x^2 + 3x + 5$ has no integer pair with product 5 and sum 3. It is prime over the integers. Later, the quadratic formula will handle these.`),
    callout("application", "Where this shows up", r`Factoring turns a quadratic equation into a product equal to zero, which can then be solved. A ball's height $-16t^2 + 32t + 48 = -16(t - 3)(t + 1)$ shows it hits the ground at $t = 3$ s.`),
  ],
  questions: [
    short(1, r`Factor $x^2 + 9x + 20$.`, ["(x+4)(x+5)", "(x+5)(x+4)"], ["Product 20, sum 9."], r`$(x + 4)(x + 5)$.`),
    short(2, r`Factor $x^2 - 10x + 21$.`, ["(x-3)(x-7)", "(x-7)(x-3)"], ["Product 21, sum −10: both negative."], r`$(x - 3)(x - 7)$.`),
    short(2, r`Factor $x^2 + 4x - 32$.`, ["(x+8)(x-4)", "(x-4)(x+8)"], ["Product −32, sum 4."], r`$8 \cdot (-4) = -32$ and $8 - 4 = 4$: $(x + 8)(x - 4)$.`),
    short(2, r`Factor $2x^2 + 7x + 3$.`, ["(2x+1)(x+3)", "(x+3)(2x+1)"], ["ac = 6, b = 7: use 6 and 1.", r`$2x^2 + 6x + x + 3$.`], r`$2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)$.`),
    short(3, r`Factor $3x^2 - 10x - 8$.`, ["(3x+2)(x-4)", "(x-4)(3x+2)"], ["ac = −24, b = −10: use −12 and 2."], r`$3x^2 - 12x + 2x - 8 = 3x(x - 4) + 2(x - 4) = (3x + 2)(x - 4)$.`),
    short(3, r`Factor completely: $5x^2 - 5x - 30$.`, ["5(x-3)(x+2)", "5(x+2)(x-3)"], ["GCF first: 5."], r`$5(x^2 - x - 6) = 5(x - 3)(x + 2)$.`, "review"),
    mc(3, r`Which trinomial cannot be factored over the integers?`, [r`$x^2 + 5x + 6$`, r`$x^2 - x - 6$`, r`$x^2 + 2x + 6$`, r`$x^2 - 5x + 6$`], 2,
      ["Look for a pair with product 6 and the given sum."], r`The integer pairs with product 6 are $1 \cdot 6$, $2 \cdot 3$, $(-1)(-6)$ and $(-2)(-3)$, with sums 7, 5, −7 and −5. None sums to 2, so $x^2 + 2x + 6$ is prime.`, "review"),
  ],
});
