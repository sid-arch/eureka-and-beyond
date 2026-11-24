import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "permutations-combinations",
  title: "Permutations and combinations",
  summary: "Count arrangements with factorials and permutations, count selections with combinations, decide whether order matters, and use counting to find probabilities.",
  minutes: 30,
  objectives: [
    "Use factorials and the counting principle to count arrangements.",
    "Distinguish permutations (order matters) from combinations (order doesn't) and compute each.",
    "Use permutations and combinations to compute probabilities.",
  ],
  concepts: [
    { slug: "counting", name: "Counting principles", description: "Factorials, permutations and combinations.", subject: "subj_math" },
  ],
  formulas: ["permutations-combinations"],
  blocks: [
    def("Factorial", r`$n! = n(n - 1)(n - 2)\cdots 1$, the number of ways to arrange $n$ distinct items in a row. $5! = 120$, and by definition $0! = 1$.`),
    def("Permutations", r`Ordered arrangements of $r$ items chosen from $n$: $ {}_nP_r = \frac{n!}{(n - r)!}$. Choosing a president, vice president and secretary from 10 people: $ {}_{10}P_3 = 10 \cdot 9 \cdot 8 = 720$.`),
    def("Combinations", r`Unordered selections: $ {}_nC_r = \frac{n!}{r!(n - r)!}$. Choosing a 3-person committee from 10: $ {}_{10}C_3 = \frac{720}{3!} = 120$. Each committee corresponds to $3! = 6$ ordered lists, so we divide by 6.`),
    text(r`The key question is: would swapping two chosen items give a different result? Race finishes, passwords and officer roles: yes, so permutations. Teams, pizza toppings and lottery picks: no, so combinations.`),
    example(r`How many 4-digit PINs have no repeated digits?`, [
      [r`{}_{10}P_4 = 10 \cdot 9 \cdot 8 \cdot 7 = 5040`, "Order matters: 1234 and 4321 are different PINs."],
    ]),
    example(r`A 5-card hand is dealt from 52 cards. What is the probability all 5 are hearts?`, [
      [r`{}_{13}C_5 = 1287`, "Ways to choose 5 hearts."],
      [r`{}_{52}C_5 = 2{,}598{,}960`, "All possible hands."],
      [r`P = \tfrac{1287}{2598960} \approx 0.000495`, "About 1 in 2,020."],
    ]),
    callout("warning", "Repetition changes things", r`The formulas assume no repetition. If repetition is allowed (like a PIN where digits may repeat), use the counting principle: $10^4 = 10{,}000$.`),
    callout("application", "Where this shows up", r`Password strength, lottery odds, scheduling tournaments, and genetics (combinations of alleles) all rely on counting.`),
  ],
  questions: [
    num(1, r`Evaluate $6!$.`, 720, {}, [], r`$720$.`),
    num(2, r`In how many ways can 1st, 2nd and 3rd place be awarded among 8 runners?`, 336, {}, ["Order matters."], r`$ {}_8P_3 = 8 \cdot 7 \cdot 6 = 336$.`),
    num(2, r`How many ways can 4 toppings be chosen from 9?`, 126, {}, ["Order doesn't matter."], r`$ {}_9C_4 = \frac{9 \cdot 8 \cdot 7 \cdot 6}{24} = 126$.`),
    mc(2, r`Choosing a team captain and co-captain from 15 players is a…`, ["Combination", "Permutation", "Neither", "Factorial only"], 1, ["Are the roles different?"], r`The roles differ, so order matters: a permutation ($ {}_{15}P_2 = 210$).`),
    num(3, r`A committee of 3 is chosen at random from 5 girls and 4 boys. What is the probability all 3 are girls? Enter a fraction or decimal.`, 10 / 84, { tolerance: 1e-3 }, [r`$ {}_5C_3 / {}_9C_3$.`], r`$\frac{10}{84} = \frac{5}{42} \approx 0.119$.`, "review"),
    num(3, r`How many different arrangements of the letters in LEVEL are there?`, 30, {}, ["Divide 5! by the arrangements of the repeated letters: 2! for L and 2! for E."], r`$\frac{5!}{2!\,2!} = \frac{120}{4} = 30$.`, "review"),
  ],
});
