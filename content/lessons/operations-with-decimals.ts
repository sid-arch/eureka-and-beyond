import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "operations-with-decimals",
  title: "Operations with decimals",
  summary: "Add, subtract, multiply and divide decimals, including negative decimals, and check answers by estimating.",
  minutes: 25,
  objectives: [
    "Add and subtract decimals by aligning place values.",
    "Multiply decimals and place the decimal point by counting decimal places.",
    "Divide by a decimal by first making the divisor a whole number, and check with estimation.",
  ],
  concepts: [
    { slug: "decimal-operations", name: "Decimal operations", description: "Arithmetic with numbers written in base-ten decimal form.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A decimal is a fraction whose denominator is a power of ten: $0.7 = \frac{7}{10}$ and $2.35 = \frac{235}{100}$. Every rule for decimals comes from that fact plus place value.`),
    def("Adding and subtracting", r`Line up the decimal points so that tenths sit above tenths and hundredths above hundredths. Fill empty places with zeros if that helps: $5.4 - 2.37$ becomes $5.40 - 2.37 = 3.03$.`),
    def("Multiplying", r`Multiply as if the numbers were whole, then give the product as many decimal places as the factors have in total. $0.3 \times 0.04$: $3 \times 4 = 12$, and $1 + 2 = 3$ places gives $0.012$.`),
    text(r`Why count places? $0.3 = \frac{3}{10}$ and $0.04 = \frac{4}{100}$, so the product is $\frac{12}{1000} = 0.012$. The denominators multiply to 1000, which is three decimal places.`),
    def("Dividing", r`Multiply the divisor and the dividend by the same power of ten so the divisor is a whole number, then divide. $4.5 \div 0.15 = 450 \div 15 = 30$. This doesn't change the answer, because $\frac{4.5}{0.15} = \frac{450}{15}$.`),
    example(r`Evaluate $-3.6 + 1.25 - 0.8$`, [
      [r`-3.60 + 1.25 = -2.35`, "Different signs: 3.60 − 1.25 = 2.35, keep the negative."],
      [r`-2.35 - 0.80 = -3.15`, "Same direction (both negative): add and keep the sign."],
    ], "Estimate: −4 + 1 − 1 = −4. The answer −3.15 is reasonably close."),
    example(r`Evaluate $2.6 \times (-0.35)$`, [
      [r`26 \times 35 = 910`, "Multiply as whole numbers."],
      [r`0.910`, "One place + two places = three decimal places."],
      [r`-0.91`, "Different signs: negative. Trailing zeros can be dropped."],
    ], r`Estimate: $3 \times 0.35 \approx 1$, so a size near 0.9 is believable.`),
    example(r`Evaluate $7.68 \div 0.24$`, [
      [r`768 \div 24`, "Move both decimal points two places right."],
      [r`= 32`, "24 × 32 = 768."],
    ], r`Check: $0.24 \times 32 = 7.68$.`),
    callout("warning", "Dividing by a decimal less than 1", r`Dividing by a number between 0 and 1 makes the result larger, and multiplying by one makes it smaller. $6 \div 0.5 = 12$ but $6 \times 0.5 = 3$. If your answer goes the wrong way, recheck the decimal point.`),
    callout("application", "Where this shows up", r`Gas costs 3.49 dollars per gallon and you buy 11.2 gallons: $3.49 \times 11.2 = 39.088$, about 39.09 dollars. A 2.5-liter bottle poured into 0.25-liter cups fills $2.5 \div 0.25 = 10$ cups.`),
  ],
  questions: [
    num(1, r`Evaluate $8.4 - 3.75$.`, 4.65, {}, ["Write 8.4 as 8.40."], r`$8.40 - 3.75 = 4.65$.`),
    num(1, r`Evaluate $0.6 \times 0.7$.`, 0.42, {}, ["6 × 7 = 42; count the decimal places."], r`Two decimal places in total: $0.42$.`),
    num(2, r`Evaluate $1.5 \times (-0.08)$.`, -0.12, {}, ["15 × 8 = 120.", "Three decimal places, negative sign."], r`$-0.120 = -0.12$.`),
    num(2, r`Evaluate $9.1 \div 0.13$.`, 70, {}, ["Move both decimal points two places: 910 ÷ 13."], r`$910 \div 13 = 70$.`),
    num(2, r`Evaluate $-4.2 - (-6.05)$.`, 1.85, {}, ["Subtracting a negative is adding."], r`$-4.20 + 6.05 = 1.85$.`),
    mc(2, r`Without calculating exactly, which is closest to $48.2 \div 0.49$?`, ["About 2.4", "About 24", "About 100", "About 1000"], 2,
      ["0.49 is about one half.", "Dividing by one half doubles."], r`$48 \div 0.5 = 96$, so about 100. (The exact value is about 98.4.)`),
    num(2, r`Notebooks cost 2.35 dollars each. How much do 6 notebooks cost, in dollars?`, 14.1, { unit: "dollars" }, ["Multiply 2.35 by 6."], r`$2.35 \times 6 = 14.10$ dollars.`),
    num(3, r`A 3.6-meter board is cut into pieces 0.45 m long. How many pieces are there?`, 8, {}, ["Divide 3.6 by 0.45.", "Multiply both by 100: 360 ÷ 45."], r`$360 \div 45 = 8$ pieces. Check: $0.45 \times 8 = 3.6$.`, "review"),
    num(3, r`Evaluate $(2.5 - 4.1) \times 0.5 + 0.3$.`, -0.5, {}, ["Parentheses first: 2.5 − 4.1 = −1.6."], r`$-1.6 \times 0.5 = -0.8$, then $-0.8 + 0.3 = -0.5$.`, "review"),
  ],
});
