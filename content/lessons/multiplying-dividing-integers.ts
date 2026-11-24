import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "multiplying-dividing-integers",
  title: "Multiplying and dividing integers",
  summary: "Find the sign of a product or quotient, see why a negative times a negative is positive, and work with zero.",
  minutes: 20,
  objectives: [
    "Multiply and divide integers and determine the sign of the result.",
    "Explain why the product of two negative numbers is positive using patterns.",
    "Recognize that division by zero is undefined.",
  ],
  concepts: [
    { slug: "integer-multiplication", name: "Integer multiplication and division", description: "Products and quotients of signed numbers and their signs.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Multiplication is repeated addition: $3 \times (-4)$ means three groups of $-4$, which is $-4 + (-4) + (-4) = -12$. A positive times a negative is negative. Because order doesn't matter in multiplication, $(-4) \times 3$ is also $-12$.`),
    text(r`What about a negative times a negative? Look at the pattern below. Each time the first factor drops by 1, the product goes up by 4. Continuing the pattern forces $(-1)(-4) = 4$ and $(-2)(-4) = 8$.`),
    example(r`A pattern for $(-4)$ times decreasing numbers`, [
      [r`2 \times (-4) = -8`, ""],
      [r`1 \times (-4) = -4`, "Up by 4."],
      [r`0 \times (-4) = 0`, "Up by 4 again."],
      [r`(-1) \times (-4) = 4`, "The pattern continues: up by 4 makes a positive."],
      [r`(-2) \times (-4) = 8`, "So a negative times a negative is positive."],
    ]),
    def("Sign rules", r`Same signs give a positive result; different signs give a negative result. These rules apply to both multiplication and division: $(-24) \div (-6) = 4$ and $24 \div (-6) = -4$.`),
    text(r`With several factors, count the negatives. An even number of negative factors gives a positive product; an odd number gives a negative product. For example $(-1)(-2)(-3) = -6$ has three negative factors, so it is negative.`),
    callout("warning", "Zero", r`$0 \div 5 = 0$, because $0 \times 5 = 0$. But $5 \div 0$ is undefined: no number times 0 gives 5. Expressions like $\frac{7}{0}$ have no value.`),
    example(r`Evaluate $\dfrac{(-6)(5)}{-3} \cdot (-2)$`, [
      [r`(-6)(5) = -30`, "Different signs: negative."],
      [r`-30 \div (-3) = 10`, "Same signs: positive."],
      [r`10 \cdot (-2) = -20`, "Different signs: negative."],
    ], "Count negatives in the whole expression: −6, −3 and −2 make three, an odd number, so the result must be negative. It is."),
    example(r`Evaluate $(-2)^4$ and $-2^4$`, [
      [r`(-2)^4 = (-2)(-2)(-2)(-2) = 16`, "Four negative factors: an even count, so the result is positive."],
      [r`-2^4 = -(2 \cdot 2 \cdot 2 \cdot 2) = -16`, "Without parentheses the exponent applies only to 2. The minus sign is applied afterwards."],
    ]),
    callout("application", "Where this shows up", r`A stock that loses 3 dollars a day for 5 days changes by $5 \times (-3) = -15$ dollars. Looking back, 4 days ago it was $(-4) \times (-3) = 12$ dollars higher than today. Negative time multiplied by a negative rate gives a positive change.`),
  ],
  questions: [
    num(1, r`Evaluate $(-7)(8)$.`, -56, {}, ["Different signs give a negative product."], r`$7 \times 8 = 56$, negative: $-56$.`),
    num(1, r`Evaluate $(-9)(-6)$.`, 54, {}, ["Same signs give a positive product."], r`$(-9)(-6) = 54$.`),
    num(1, r`Evaluate $-63 \div 7$.`, -9, {}, ["Different signs give a negative quotient."], r`$63 \div 7 = 9$, so $-9$.`),
    num(2, r`Evaluate $\dfrac{-84}{-12}$.`, 7, {}, ["Same signs give a positive quotient."], r`$84 \div 12 = 7$, positive.`),
    mc(2, r`What is the sign of $(-3)(-1)(4)(-2)(-5)$?`, ["Positive", "Negative", "Zero", "Not possible to tell"], 0,
      ["Count the negative factors."], r`There are four negative factors, an even number, so the product is positive. (It equals 120.)`),
    num(2, r`Evaluate $(-3)^3$.`, -27, {}, ["Three negative factors."], r`$(-3)(-3)(-3) = 9 \cdot (-3) = -27$.`),
    num(2, r`A diver descends at 4 meters per second for 9 seconds. What is the change in depth, in meters (use a negative number for downward)?`, -36, { unit: "m" },
      ["Rate × time, with descending as negative."], r`$(-4)(9) = -36$ meters.`),
    mc(2, r`Which expression is undefined?`, [r`$0 \div (-8)$`, r`$-8 \div 0$`, r`$0 \times (-8)$`, r`$-8 \div (-8)$`], 1,
      ["Division by zero has no answer."], r`$-8 \div 0$ is undefined; no number times 0 equals $-8$. The others equal 0, 0 and 1.`),
    short(3, r`Find $n$ if $-6n = 72$.`, ["-12", "n=-12"], ["Divide both sides by −6."], r`$n = 72 \div (-6) = -12$. Check: $-6 \cdot (-12) = 72$.`, "review"),
    num(3, r`Evaluate $\dfrac{(-2)^3 \cdot (-3)}{-4}$.`, -6, {}, [r`$(-2)^3 = -8$.`, r`$-8 \cdot (-3) = 24$.`], r`$\frac{(-8)(-3)}{-4} = \frac{24}{-4} = -6$.`, "review"),
  ],
});
