import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "special-products-factoring",
  title: "Special products and factoring patterns",
  summary: "Recognize and use perfect-square trinomials and the difference of two squares, both for multiplying quickly and for factoring.",
  minutes: 25,
  objectives: [
    "Expand (a + b)², (a − b)² and (a + b)(a − b) using the patterns.",
    "Recognize perfect-square trinomials and differences of squares.",
    "Factor completely using these patterns together with the GCF.",
  ],
  concepts: [
    { slug: "special-products", name: "Special products", description: "Perfect-square trinomials and the difference of two squares.", subject: "subj_math" },
    { slug: "factoring", name: "Factoring", description: "Writing a polynomial as a product of simpler polynomials.", subject: "subj_math" },
  ],
  formulas: ["special-products"],
  blocks: [
    def("Square of a binomial", r`$(a + b)^2 = a^2 + 2ab + b^2$ and $(a - b)^2 = a^2 - 2ab + b^2$. The middle term is twice the product of the two terms.`),
    def("Difference of two squares", r`$(a + b)(a - b) = a^2 - b^2$. The middle terms $+ab$ and $-ab$ cancel.`),
    activity("area-model", { title: "See the perfect square", params: { a: 1, b: 3, c: 1, d: 3 } }),
    callout("tip", "Try this", r`With $(x + 3)(x + 3)$, the model is a square with two identical $3x$ rectangles: that's where $2ab$ comes from. Change $d$ to $-3$. The middle cells become $3x$ and $-3x$ and cancel, leaving $x^2 - 9$.`, "experiment"),
    callout("warning", "The classic mistake", r`$(x + 5)^2 \ne x^2 + 25$. It is $x^2 + 10x + 25$. Check with $x = 1$: $36$, not $26$.`),
    example(r`Expand $(3x - 4)^2$ and $(2y + 7)(2y - 7)$`, [
      [r`(3x)^2 - 2(3x)(4) + 4^2 = 9x^2 - 24x + 16`, "a = 3x, b = 4."],
      [r`(2y)^2 - 7^2 = 4y^2 - 49`, "Difference of squares."],
    ]),
    text(r`To factor with these patterns, check whether the first and last terms are perfect squares. A trinomial $a^2 \pm 2ab + b^2$ is a perfect square if its middle term is exactly twice the product of the square roots. A binomial $a^2 - b^2$ is a difference of squares. A sum of squares like $x^2 + 9$ does not factor over the real numbers.`),
    example(r`Factor $x^2 - 14x + 49$`, [
      [r`x^2 = (x)^2,\ 49 = 7^2`, "First and last are squares."],
      [r`2 \cdot x \cdot 7 = 14x`, "The middle term matches."],
      [r`(x - 7)^2`, ""],
    ]),
    example(r`Factor $3x^3 - 75x$ completely`, [
      [r`3x(x^2 - 25)`, "GCF first."],
      [r`3x(x + 5)(x - 5)`, "Difference of squares."],
    ]),
    example(r`Factor $16a^4 - 81$`, [
      [r`(4a^2 + 9)(4a^2 - 9)`, "16a⁴ = (4a²)² and 81 = 9²."],
      [r`(4a^2 + 9)(2a + 3)(2a - 3)`, "4a² − 9 is again a difference of squares; 4a² + 9 is not factorable."],
    ]),
    callout("application", "Mental math", r`$47 \times 53 = (50 - 3)(50 + 3) = 2500 - 9 = 2491$, and $99^2 = (100 - 1)^2 = 10{,}000 - 200 + 1 = 9801$.`),
  ],
  questions: [
    short(1, r`Expand $(x + 6)^2$.`, ["x^2+12x+36"], ["Middle term: 2 · x · 6."], r`$x^2 + 12x + 36$.`),
    short(1, r`Expand $(a - 9)(a + 9)$.`, ["a^2-81"], ["Difference of squares."], r`$a^2 - 81$.`),
    short(2, r`Expand $(5y - 2)^2$.`, ["25y^2-20y+4"], [r`$(5y)^2 - 2(5y)(2) + 2^2$.`], r`$25y^2 - 20y + 4$.`),
    short(2, r`Factor $x^2 - 64$.`, ["(x+8)(x-8)", "(x-8)(x+8)"], ["64 = 8²."], r`$(x + 8)(x - 8)$.`),
    short(2, r`Factor $x^2 + 10x + 25$.`, ["(x+5)^2", "(x+5)(x+5)"], ["25 = 5², and 2 · 5 = 10."], r`$(x + 5)^2$.`),
    mc(2, r`Which polynomial is a perfect-square trinomial?`, [r`$x^2 + 6x + 36$`, r`$4x^2 - 12x + 9$`, r`$x^2 - 8x - 16$`, r`$9x^2 + 6x + 4$`], 1,
      ["Check whether the middle term is 2ab."], r`$4x^2 - 12x + 9 = (2x - 3)^2$ since $2(2x)(3) = 12x$.`),
    short(3, r`Factor completely: $2x^3 - 32x$.`, ["2x(x+4)(x-4)", "2x(x-4)(x+4)"], ["GCF 2x first.", "Then x² − 16."], r`$2x(x^2 - 16) = 2x(x + 4)(x - 4)$.`, "review"),
    short(3, r`Compute $102 \times 98$ using a special product. Enter the product.`, ["9996"], [r`$(100 + 2)(100 - 2)$.`], r`$10{,}000 - 4 = 9996$.`, "review"),
  ],
});
