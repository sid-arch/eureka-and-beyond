import { callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "proof-with-properties",
  title: "Proof with the properties of real numbers",
  summary: "Write short algebraic proofs, justifying every step with a property, and prove general facts about even and odd integers and simple identities.",
  minutes: 30,
  objectives: [
    "Justify each step of solving an equation with a property of equality or of real numbers.",
    "Prove simple identities and facts about integers, such as 'the sum of two odd numbers is even'.",
    "Distinguish a proof from checking examples, and use a counterexample to disprove a claim.",
  ],
  concepts: [
    { slug: "field-properties", name: "Properties of real numbers", description: "Commutative, associative, distributive, identity and inverse properties.", subject: "subj_math" },
    { slug: "algebraic-proof", name: "Algebraic proof", description: "A sequence of justified steps showing a statement holds for all values.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Checking that a statement works for 5 or 50 examples shows it's plausible, not that it's always true. A proof shows it holds for every possible value by using only steps that are guaranteed: definitions, the properties of equality and the properties of real numbers.`),
    example(r`Prove that if $3(x - 4) = 2x + 1$, then $x = 13$`, [
      [r`3x - 12 = 2x + 1`, "Distributive property."],
      [r`3x - 12 - 2x = 2x + 1 - 2x`, "Subtraction property of equality."],
      [r`x - 12 = 1`, "Combine like terms (distributive property) and additive inverse/identity."],
      [r`x = 13`, "Addition property of equality."],
    ]),
    def("Even and odd integers", r`An integer is even if it equals $2k$ for some integer $k$, and odd if it equals $2k + 1$ for some integer $k$.`),
    example(r`Prove: the sum of any two odd integers is even`, [
      [r`a = 2m + 1,\ b = 2n + 1`, "Let a and b be any odd integers (m and n are integers). Use different letters: the numbers needn't be equal."],
      [r`a + b = 2m + 2n + 2`, "Add and rearrange (commutative and associative properties)."],
      [r`= 2(m + n + 1)`, "Distributive property."],
      [r`m + n + 1 \text{ is an integer}`, "Integers are closed under addition, so a + b is 2 times an integer: even. ∎"],
    ]),
    example(r`Prove the identity $(a + b)^2 - (a - b)^2 = 4ab$`, [
      [r`(a^2 + 2ab + b^2) - (a^2 - 2ab + b^2)`, "Expand both squares (distributive property)."],
      [r`a^2 + 2ab + b^2 - a^2 + 2ab - b^2`, "Distribute the subtraction."],
      [r`4ab`, "Combine like terms. ∎"],
    ]),
    callout("warning", "Examples aren't proof, but one counterexample is enough", r`"$n^2 + n + 41$ is always prime" holds for $n = 0, 1, \dots, 39$, but at $n = 40$ it equals $41^2$. To disprove a general claim, a single counterexample suffices.`),
    callout("tip", "Write proofs in two columns", r`List each statement on the left and its reason on the right. Each reason should be a definition, a given, a property, or a previously proved fact.`),
    callout("application", "Where this shows up", r`Proof is how mathematics guarantees its results; it also underpins computer science (proving an algorithm always works) and cryptography, whose security rests on proved facts about integers.`),
  ],
  questions: [
    mc(1, r`Which property justifies going from $x + 7 = 12$ to $x = 5$?`, ["Addition property of equality", "Subtraction property of equality", "Distributive property", "Commutative property"], 1, ["What was done to both sides?"], r`7 was subtracted from both sides.`),
    mc(2, r`To prove "the product of two even integers is even," how should the integers be written?`, [r`$2k$ and $2k$`, r`$2m$ and $2n$ for integers m, n`, r`$k$ and $k + 2$`, r`$2$ and $4$`], 1, ["The two even numbers needn't be equal."], r`Use $2m$ and $2n$. Then the product is $4mn = 2(2mn)$, which is even.`),
    mc(2, r`What does $(2m + 1)(2n + 1)$ simplify to, showing that the product of two odd numbers is odd?`, [r`$2(2mn + m + n) + 1$`, r`$4mn + 1$`, r`$2(mn) + 2$`, r`$4mn + 2m + 2n$`], 0, ["Expand: 4mn + 2m + 2n + 1."], r`$4mn + 2m + 2n + 1 = 2(2mn + m + n) + 1$, which is odd.`),
    short(2, r`Give a counterexample to "the sum of two prime numbers is always even." Enter the two primes separated by a comma, smaller first.`, ["2,3", "2,5", "2,7", "2,11", "2,13", "2,17", "2,19", "2,23", "2,29", "2,31", "2,37", "2,41", "2,43", "2,47"], ["Which prime is even?"], r`$2 + 3 = 5$ is odd. Any sum of 2 and an odd prime is a counterexample.`),
    mc(3, r`A student "proves" $a = b$ like this: $a^2 = ab \Rightarrow a^2 - b^2 = ab - b^2 \Rightarrow (a + b)(a - b) = b(a - b) \Rightarrow a + b = b$. Which step is invalid when a = b?`, ["Subtracting b²", "Factoring", "Dividing both sides by (a − b)", "Writing a² = ab"], 2, ["What is a − b if a = b?"], r`If $a = b$, then $a - b = 0$, and dividing by zero is not allowed. That step is invalid.`, "review"),
    short(3, r`Simplify to prove the identity: $(x + 3)^2 - (x - 3)^2 = ?$ Enter the simplified expression.`, ["12x"], [r`Use $(a + b)^2 - (a - b)^2 = 4ab$.`], r`$4 \cdot x \cdot 3 = 12x$.`, "review"),
  ],
});
