import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rational-numbers-decimals",
  title: "Rational numbers and their decimal forms",
  summary: "Recognize rational numbers, convert fractions to terminating or repeating decimals, and convert decimals back to fractions.",
  minutes: 25,
  objectives: [
    "Define a rational number and give examples, including negatives and integers.",
    "Convert a fraction to a decimal by division and identify terminating and repeating decimals.",
    "Convert terminating and simple repeating decimals to fractions in simplest form.",
  ],
  concepts: [
    { slug: "rational-numbers", name: "Rational numbers", description: "Numbers that can be written as a ratio of two integers with a nonzero denominator.", subject: "subj_math" },
  ],
  blocks: [
    def("Rational number", r`Any number that can be written as $\frac{a}{b}$ where $a$ and $b$ are integers and $b \ne 0$. Examples: $\frac{3}{4}$, $-\frac{5}{2}$, $7 = \frac{7}{1}$, $0.25 = \frac{1}{4}$ and $0.\overline{3} = \frac{1}{3}$.`),
    text(r`Every integer is rational, because it can be written over 1. Negative fractions can put the sign in three places: $-\frac{2}{3} = \frac{-2}{3} = \frac{2}{-3}$. All three name the same point on the number line, two-thirds of the way from 0 to $-1$.`),
    text(r`To turn a fraction into a decimal, divide the numerator by the denominator. Either the division ends (a terminating decimal) or a block of digits repeats forever (a repeating decimal). A bar marks the repeating block: $\frac{2}{11} = 0.181818\ldots = 0.\overline{18}$.`),
    callout("tip", "Which fractions terminate?", r`In simplest form, a fraction terminates exactly when its denominator has no prime factors other than 2 and 5. $\frac{7}{40}$ terminates because $40 = 2^3 \cdot 5$. $\frac{5}{12}$ repeats because 12 has a factor of 3.`),
    example(r`Write $\frac{5}{8}$ and $\frac{5}{6}$ as decimals`, [
      [r`5 \div 8 = 0.625`, "The division ends after three places: terminating."],
      [r`5 \div 6 = 0.8333\ldots`, "After the 8, the remainder 2 repeats, so 3 repeats."],
      [r`\tfrac{5}{6} = 0.8\overline{3}`, "Only the 3 repeats, so the bar goes over the 3 alone."],
    ], r`Check: $8 = 2^3$ (terminates) and $6 = 2 \cdot 3$ (repeats), matching the tip above.`),
    example(r`Write $0.45$ and $-2.6$ as fractions in simplest form`, [
      [r`0.45 = \tfrac{45}{100}`, "Two decimal places means hundredths."],
      [r`\tfrac{45}{100} = \tfrac{9}{20}`, "Divide the top and bottom by their GCF, 5."],
      [r`-2.6 = -2\tfrac{6}{10} = -\tfrac{26}{10} = -\tfrac{13}{5}`, "One decimal place means tenths. Then simplify by 2."],
    ]),
    example(r`Write $0.\overline{7}$ as a fraction`, [
      [r`x = 0.777\ldots`, "Call the number x."],
      [r`10x = 7.777\ldots`, "One digit repeats, so multiply by 10 to shift one place."],
      [r`10x - x = 7`, "Subtracting removes the endless tail."],
      [r`9x = 7 \Rightarrow x = \tfrac{7}{9}`, "Divide by 9."],
    ], r`Check: $7 \div 9 = 0.777\ldots$`),
    callout("note", "Not every decimal is rational", r`Decimals that never end and never repeat, such as $\pi = 3.14159\ldots$ and $\sqrt{2} = 1.41421\ldots$, are irrational. You will meet them when you study square roots and the real number system.`),
    callout("application", "Where this shows up", r`Batting averages, sale prices and recipe scaling all switch between fractions and decimals. A player with 7 hits in 20 at-bats has an average of $7 \div 20 = 0.350$.`),
  ],
  questions: [
    num(1, r`Write $\frac{3}{8}$ as a decimal.`, 0.375, {}, ["Divide 3 by 8."], r`$3 \div 8 = 0.375$.`),
    mc(1, r`Which number is not rational?`, [r`$-\frac{4}{9}$`, r`$0.\overline{12}$`, r`$\sqrt{2}$`, r`$-6$`], 2,
      ["Rational numbers can be written as a fraction of integers."], r`$\sqrt{2}$ is a non-repeating, non-terminating decimal, so it is irrational. $-6 = \frac{-6}{1}$, and $0.\overline{12} = \frac{12}{99} = \frac{4}{33}$.`),
    mc(2, r`Which fraction has a repeating decimal form?`, [r`$\frac{7}{20}$`, r`$\frac{3}{16}$`, r`$\frac{4}{15}$`, r`$\frac{9}{25}$`], 2,
      ["Factor each denominator. Does it have a prime factor other than 2 or 5?"], r`$15 = 3 \cdot 5$ has a factor of 3, so $\frac{4}{15} = 0.2\overline{6}$ repeats. The others have denominators $2^2 \cdot 5$, $2^4$ and $5^2$.`),
    short(2, r`Write $0.64$ as a fraction in simplest form. Use the format a/b.`, ["16/25"], ["0.64 is 64 hundredths.", "The GCF of 64 and 100 is 4."], r`$\frac{64}{100} = \frac{16}{25}$.`),
    num(2, r`Write $-\frac{7}{4}$ as a decimal.`, -1.75, {}, [r`$7 \div 4 = 1.75$.`], r`$-\frac{7}{4} = -1.75$.`),
    short(3, r`Write $0.\overline{36}$ as a fraction in simplest form. Use the format a/b.`, ["4/11"], ["Two digits repeat, so multiply by 100.", r`$100x - x = 36$.`], r`$99x = 36$, so $x = \frac{36}{99} = \frac{4}{11}$. Check: $4 \div 11 = 0.3636\ldots$`),
    mc(2, r`Order from least to greatest: $-0.6,\ -\frac{2}{3},\ -\frac{1}{2}$.`, [
      r`$-\frac{1}{2}, -0.6, -\frac{2}{3}$`, r`$-\frac{2}{3}, -0.6, -\frac{1}{2}$`, r`$-0.6, -\frac{2}{3}, -\frac{1}{2}$`, r`$-\frac{2}{3}, -\frac{1}{2}, -0.6$`,
    ], 1, [r`Convert: $-\frac{2}{3} \approx -0.667$, $-\frac{1}{2} = -0.5$.`], r`$-0.667 < -0.6 < -0.5$, so $-\frac{2}{3} < -0.6 < -\frac{1}{2}$.`, "review"),
    num(2, r`A runner finishes 9 laps out of 12 planned. Write the fraction completed as a decimal.`, 0.75, {}, [r`$\frac{9}{12}$ simplifies to $\frac{3}{4}$.`], r`$\frac{9}{12} = \frac{3}{4} = 0.75$.`, "review"),
  ],
});
