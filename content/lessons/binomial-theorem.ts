import { callout, def, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "binomial-theorem",
  title: "The Binomial Theorem",
  summary: "Expand powers of binomials with Pascal's triangle and combinations, and find a specific term without expanding everything.",
  minutes: 30,
  objectives: [
    "Build Pascal's triangle and connect its entries to combinations.",
    "Expand (a + b)^n with the Binomial Theorem.",
    "Find a specific term or coefficient of an expansion.",
  ],
  concepts: [
    { slug: "binomial-theorem", name: "Binomial Theorem", description: "A formula for expanding (a + b)^n using combinations.", subject: "subj_math" },
    { slug: "counting", name: "Counting principles", description: "Factorials, permutations and combinations.", subject: "subj_math" },
  ],
  formulas: ["binomial-theorem", "permutations-combinations"],
  blocks: [
    text(r`Expanding $(a + b)^n$ means choosing $a$ or $b$ from each of the $n$ factors. The term $a^{n-k}b^k$ appears once for each way to choose which $k$ factors contribute a $b$, which is $\binom{n}{k}$ ways. That's the whole theorem.`),
    def("Binomial Theorem", r`$(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k$. The coefficients form row $n$ of Pascal's triangle (1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; …), where each entry is the sum of the two above it.`),
    example(r`Expand $(x - 2)^4$`, [
      [r`\binom{4}{k}: 1, 4, 6, 4, 1`, ""],
      [r`x^4 + 4x^3(-2) + 6x^2(4) + 4x(-8) + 16`, ""],
      [r`x^4 - 8x^3 + 24x^2 - 32x + 16`, ""],
    ]),
    example(r`Find the $x^3$ term of $(2x + 1)^7$`, [
      [r`\binom{7}{4}(2x)^3(1)^4`, "The term with (2x)³ has k = 4 factors of 1."],
      [r`35 \cdot 8x^3 = 280x^3`, ""],
    ]),
    callout("application", "Where this shows up", r`Binomial probabilities (exactly k successes in n trials), approximations like $(1.01)^{10} \approx 1 + 10(0.01) + 45(0.0001) = 1.1045$, and counting paths on a grid all use binomial coefficients.`),
  ],
  questions: [
    num(1, r`Evaluate $\binom{6}{2}$.`, 15, {}, [], r`15.`),
    short(2, r`Expand $(x + 1)^3$.`, ["x^3+3x^2+3x+1"], [], r`$x^3 + 3x^2 + 3x + 1$.`),
    num(2, r`Find the coefficient of $x^2$ in $(x + 3)^5$.`, 270, {}, [r`$\binom{5}{3}3^3$.`], r`$10 \cdot 27 = 270$.`),
    num(3, r`Find the coefficient of $x^4$ in $(2x - 1)^6$.`, 240, {}, [r`$\binom{6}{2}(2)^4(-1)^2$.`], r`$15 \cdot 16 = 240$.`, "review"),
  ],
});
