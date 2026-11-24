import { callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "greatest-common-factor",
  title: "Factoring out the greatest common factor",
  summary: "Find the GCF of monomials, factor it out of a polynomial, and factor four-term polynomials by grouping.",
  minutes: 20,
  objectives: [
    "Find the greatest common factor of two or more monomials.",
    "Factor the GCF out of a polynomial and check by multiplying.",
    "Factor four-term polynomials by grouping, including a common binomial factor.",
  ],
  concepts: [
    { slug: "factoring", name: "Factoring", description: "Writing a polynomial as a product of simpler polynomials.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Factoring reverses multiplication. Multiplying turns $3x(x + 4)$ into $3x^2 + 12x$; factoring turns $3x^2 + 12x$ back into $3x(x + 4)$. The first step in every factoring problem is to look for a greatest common factor.`),
    def("Greatest common factor (GCF) of monomials", r`The GCF of the coefficients times each variable that appears in every term, raised to its smallest exponent. GCF of $12x^3y^2$ and $18x^2y^5$: $\gcd(12, 18) = 6$, $x^2$, $y^2$, so $6x^2y^2$.`),
    example(r`Factor $8x^4 - 20x^3 + 4x^2$`, [
      [r`\text{GCF} = 4x^2`, "gcd(8, 20, 4) = 4; smallest power of x is 2."],
      [r`4x^2(2x^2 - 5x + 1)`, "Divide each term by 4x²."],
    ], r`Check: $4x^2 \cdot 2x^2 - 4x^2 \cdot 5x + 4x^2 \cdot 1 = 8x^4 - 20x^3 + 4x^2$. ✓`),
    example(r`Factor $-6y^3 + 9y$ with a positive leading term inside`, [
      [r`-3y(2y^2 - 3)`, "Factoring out −3y makes the first term inside positive."],
    ]),
    example(r`Factor $5x(x - 2) + 3(x - 2)$`, [
      [r`(x - 2)(5x + 3)`, "The binomial (x − 2) is itself a common factor."],
    ]),
    def("Factoring by grouping", r`For four terms: group them in pairs, factor the GCF from each pair, then factor out the common binomial.`),
    example(r`Factor $x^3 + 4x^2 + 3x + 12$`, [
      [r`(x^3 + 4x^2) + (3x + 12)`, "Group in pairs."],
      [r`x^2(x + 4) + 3(x + 4)`, "Factor each pair."],
      [r`(x + 4)(x^2 + 3)`, "Factor out (x + 4)."],
    ]),
    callout("warning", "Don't drop the 1", r`Factoring $3x$ out of $3x^2 + 3x$ gives $3x(x + 1)$, not $3x(x)$. Each term must leave something behind, and dividing a term by itself leaves 1.`),
    callout("application", "Where this shows up", r`Factoring out a GCF simplifies formulas, such as $A = 2\pi r^2 + 2\pi rh = 2\pi r(r + h)$ for a cylinder's surface area, and it is the first step in solving many polynomial equations.`),
  ],
  questions: [
    mc(1, r`What is the GCF of $14a^3$ and $21a^2$?`, [r`$7a^3$`, r`$7a^2$`, r`$42a^3$`, r`$7a$`], 1, ["gcd(14, 21) and the smaller power of a."], r`$7a^2$.`),
    short(1, r`Factor $6x + 15$.`, ["3(2x+5)"], ["GCF of 6 and 15."], r`$3(2x + 5)$.`),
    short(2, r`Factor $10m^3 - 25m^2$.`, ["5m^2(2m-5)"], ["GCF is 5m²."], r`$5m^2(2m - 5)$.`),
    short(2, r`Factor $9x^2y + 12xy^2 - 3xy$.`, ["3xy(3x+4y-1)"], ["GCF is 3xy.", "Don't forget the −1."], r`$3xy(3x + 4y - 1)$.`),
    short(2, r`Factor $2x(x + 7) - 5(x + 7)$.`, ["(x+7)(2x-5)", "(2x-5)(x+7)"], ["(x + 7) is common to both terms."], r`$(x + 7)(2x - 5)$.`),
    short(3, r`Factor by grouping: $x^3 - 2x^2 + 5x - 10$.`, ["(x-2)(x^2+5)", "(x^2+5)(x-2)"], [r`$x^2(x - 2) + 5(x - 2)$.`], r`$(x - 2)(x^2 + 5)$.`, "review"),
    short(3, r`Factor by grouping: $6x^2 + 9x - 4x - 6$.`, ["(2x+3)(3x-2)", "(3x-2)(2x+3)"], [r`$3x(2x + 3) - 2(2x + 3)$.`], r`$(2x + 3)(3x - 2)$.`, "review"),
  ],
});
