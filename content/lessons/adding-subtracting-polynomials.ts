import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "adding-subtracting-polynomials",
  title: "Adding and subtracting polynomials",
  summary: "Name polynomials by degree and number of terms, write them in standard form, and add and subtract them by combining like terms.",
  minutes: 20,
  objectives: [
    "Identify a polynomial, its terms, degree, leading coefficient and standard form.",
    "Classify polynomials by degree and by number of terms.",
    "Add and subtract polynomials, distributing the subtraction to every term.",
  ],
  concepts: [
    { slug: "polynomials", name: "Polynomials", description: "Sums of terms of the form axⁿ with whole-number exponents.", subject: "subj_math" },
    { slug: "like-terms", name: "Like terms", description: "Terms with exactly the same variables raised to the same powers.", subject: "subj_math" },
  ],
  blocks: [
    def("Polynomial", r`A sum of monomials, terms like $ax^n$ where $a$ is a number and $n$ is a whole number (0, 1, 2, …). $4x^3 - 2x + 7$ is a polynomial; $\frac{1}{x}$ and $\sqrt{x}$ are not, because their exponents are negative or fractional.`),
    def("Degree and standard form", r`The degree of a term is its exponent (add the exponents if there are several variables). The degree of the polynomial is the highest term degree. Standard form lists terms from highest degree to lowest; the first coefficient is the leading coefficient.`),
    text(r`Polynomials are named by degree (constant 0, linear 1, quadratic 2, cubic 3, quartic 4) and by number of terms (monomial 1, binomial 2, trinomial 3). So $5x^2 - 3$ is a quadratic binomial, and $-x^3 + 2x^2 + x$ is a cubic trinomial with leading coefficient $-1$.`),
    example(r`Add $(3x^2 - 5x + 4) + (-x^2 + 7x - 9)$`, [
      [r`(3x^2 - x^2) + (-5x + 7x) + (4 - 9)`, "Group like terms."],
      [r`2x^2 + 2x - 5`, ""],
    ]),
    example(r`Subtract $(4a^3 - 2a + 6) - (a^3 + 3a^2 - 2a - 1)$`, [
      [r`4a^3 - 2a + 6 - a^3 - 3a^2 + 2a + 1`, "Distribute the minus sign to every term of the second polynomial."],
      [r`3a^3 - 3a^2 + 0a + 7`, "Combine like terms."],
      [r`3a^3 - 3a^2 + 7`, ""],
    ], r`Check with $a = 1$: original $(4 - 2 + 6) - (1 + 3 - 2 - 1) = 8 - 1 = 7$; result $3 - 3 + 7 = 7$. ✓`),
    callout("warning", "Subtract every term", r`The most common error is changing only the first sign: $(x^2 + 3x) - (x^2 - 5x)$ is $x^2 + 3x - x^2 + 5x = 8x$, not $-2x$.`),
    callout("tip", "Vertical format", r`For long polynomials, line up like terms in columns, leaving gaps for missing powers. Then add each column, or change all the signs of the bottom row and add when subtracting.`),
    callout("application", "Where this shows up", r`A company's profit is revenue minus cost. If revenue is $-2x^2 + 90x$ and cost is $15x + 300$, profit is $-2x^2 + 75x - 300$. Polynomial arithmetic is how such formulas are combined.`),
  ],
  questions: [
    num(1, r`What is the degree of $6x^4 - x^2 + 9$?`, 4, {}, ["The highest exponent."], r`4.`),
    mc(1, r`Classify $-3x^2 + 8$.`, ["Linear binomial", "Quadratic binomial", "Quadratic trinomial", "Cubic monomial"], 1, ["Degree 2, two terms."], r`Degree 2 with two terms: a quadratic binomial.`),
    short(2, r`Add $(2x^2 + 3x - 1) + (x^2 - 5x + 4)$.`, ["3x^2-2x+3"], ["Combine x², x and constant terms."], r`$3x^2 - 2x + 3$.`),
    short(2, r`Subtract $(5y^2 - 2y + 3) - (2y^2 + 4y - 1)$.`, ["3y^2-6y+4"], ["Change every sign in the second polynomial."], r`$5y^2 - 2y + 3 - 2y^2 - 4y + 1 = 3y^2 - 6y + 4$.`),
    short(2, r`Write $7 - 2x^3 + x - 4x^2$ in standard form.`, ["-2x^3-4x^2+x+7"], ["Order from highest degree to lowest."], r`$-2x^3 - 4x^2 + x + 7$.`),
    short(3, r`A triangle has sides $2x^2 + 1$, $x^2 - 3x$ and $4x + 5$. Write its perimeter in standard form.`, ["3x^2+x+6"], ["Add all three."], r`$3x^2 + x + 6$.`, "review"),
    short(3, r`What polynomial added to $x^2 - 4x + 2$ gives $3x^2 + x - 5$?`, ["2x^2+5x-7"], ["Subtract: (3x² + x − 5) − (x² − 4x + 2)."], r`$2x^2 + 5x - 7$.`, "review"),
  ],
});
