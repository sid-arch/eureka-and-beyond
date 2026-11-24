import { activity, callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "multiplying-polynomials",
  title: "Multiplying polynomials",
  summary: "Multiply monomials, binomials and larger polynomials with the distributive property and the area model, and check products by substitution.",
  minutes: 25,
  objectives: [
    "Multiply a polynomial by a monomial.",
    "Multiply two binomials using the area model or the distributive property (FOIL as a special case).",
    "Multiply a binomial by a trinomial and simplify the product.",
  ],
  concepts: [
    { slug: "polynomials", name: "Polynomials", description: "Sums of terms of the form axⁿ with whole-number exponents.", subject: "subj_math" },
    { slug: "distributive-property", name: "Distributive property", description: "a(b + c) = ab + ac: multiplication distributes over addition and subtraction.", subject: "subj_math" },
  ],
  formulas: ["exponent-rules"],
  blocks: [
    text(r`Every polynomial product is the distributive property applied repeatedly: each term of the first factor multiplies each term of the second. The area model keeps track of all those products in a grid, and then like terms are combined.`),
    example(r`Multiply $-3x^2(4x^2 - 2x + 5)$`, [
      [r`(-3x^2)(4x^2) + (-3x^2)(-2x) + (-3x^2)(5)`, "Distribute to each term."],
      [r`-12x^4 + 6x^3 - 15x^2`, "Multiply coefficients and add exponents."],
    ]),
    activity("area-model", { title: "Binomial times binomial", params: { a: 2, b: 3, c: 1, d: -4 } }),
    callout("tip", "Try this", r`The model shows $(2x + 3)(x - 4)$. Read the four cells: $2x^2$, $3x$, $-8x$ and $-12$. Combine them, then change $d$ to $+4$ and predict the new middle term before looking.`, "experiment"),
    example(r`Multiply $(2x + 3)(x - 4)$`, [
      [r`2x \cdot x + 2x(-4) + 3 \cdot x + 3(-4)`, "Each term times each term (First, Outer, Inner, Last)."],
      [r`2x^2 - 8x + 3x - 12`, ""],
      [r`2x^2 - 5x - 12`, "Combine the like middle terms."],
    ], r`Check with $x = 1$: $(5)(-3) = -15$ and $2 - 5 - 12 = -15$. ✓`),
    example(r`Multiply $(x - 2)(x^2 + 3x - 1)$`, [
      [r`x(x^2 + 3x - 1) - 2(x^2 + 3x - 1)`, "Distribute each term of the binomial."],
      [r`x^3 + 3x^2 - x - 2x^2 - 6x + 2`, ""],
      [r`x^3 + x^2 - 7x + 2`, "Combine like terms."],
    ], "A 2-term factor times a 3-term factor gives 6 products before combining."),
    callout("warning", "FOIL is only for two binomials", r`FOIL is a mnemonic for the four products of two binomials. For longer polynomials, use the distributive property or a larger area grid; every term must meet every term.`),
    callout("application", "Where this shows up", r`A garden $x$ m by $x + 5$ m with a 2-m path all around covers $(x + 4)(x + 9) = x^2 + 13x + 36$ m². Subtract the garden's $x^2 + 5x$ to get the path area, $8x + 36$.`),
  ],
  questions: [
    short(1, r`Multiply $4x(3x - 7)$.`, ["12x^2-28x"], ["Distribute 4x."], r`$12x^2 - 28x$.`),
    short(2, r`Multiply $(x + 5)(x + 2)$.`, ["x^2+7x+10"], ["Four products, then combine the middle terms."], r`$x^2 + 2x + 5x + 10 = x^2 + 7x + 10$.`),
    short(2, r`Multiply $(3x - 1)(2x + 5)$.`, ["6x^2+13x-5"], [r`$6x^2 + 15x - 2x - 5$.`], r`$6x^2 + 13x - 5$.`),
    short(2, r`Multiply $(x - 6)(x + 6)$.`, ["x^2-36"], ["The middle terms cancel."], r`$x^2 + 6x - 6x - 36 = x^2 - 36$.`),
    mc(2, r`What is the coefficient of $x$ in $(2x - 3)(4x + 1)$?`, ["−12", "−10", "2", "14"], 1, [r`Outer + inner: $2x \cdot 1 + (-3)(4x)$.`], r`$2x - 12x = -10x$.`),
    short(3, r`Multiply $(x + 3)(x^2 - 2x + 4)$.`, ["x^3+x^2-2x+12"], [r`$x^3 - 2x^2 + 4x + 3x^2 - 6x + 12$.`], r`$x^3 + x^2 - 2x + 12$.`, "review"),
    short(3, r`A rectangle has length $3x + 2$ and width $x - 1$. Write its area in standard form.`, ["3x^2-x-2"], ["Area = length × width."], r`$3x^2 - 3x + 2x - 2 = 3x^2 - x - 2$.`, "review"),
  ],
});
