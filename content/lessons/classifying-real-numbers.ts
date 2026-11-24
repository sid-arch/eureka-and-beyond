import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "classifying-real-numbers",
  title: "Classifying real numbers",
  summary: "Sort numbers into natural, whole, integer, rational and irrational sets, see how the sets nest, and order real numbers including square roots.",
  minutes: 25,
  objectives: [
    "Name the subsets of the real numbers and describe how they are nested.",
    "Classify a number as rational or irrational, including square roots and repeating decimals.",
    "Order and compare real numbers, using estimates for irrational values.",
  ],
  concepts: [
    { slug: "real-numbers", name: "Real numbers", description: "All rational and irrational numbers; every point on the number line.", subject: "subj_math" },
    { slug: "irrational-numbers", name: "Irrational numbers", description: "Real numbers that cannot be written as a ratio of integers; their decimals never end or repeat.", subject: "subj_math" },
    { slug: "rational-numbers", name: "Rational numbers", description: "Numbers that can be written as a ratio of two integers with a nonzero denominator.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Every point on the number line is a real number. Mathematicians group real numbers into sets, and each set grew out of a need the previous one couldn't meet: counting needed the natural numbers, "none" needed zero, debts needed negatives, sharing needed fractions, and measuring the diagonal of a square needed irrational numbers.`),
    def("Subsets of the real numbers", r`Natural numbers $\mathbb{N}$: 1, 2, 3, … Whole numbers: 0, 1, 2, 3, … Integers $\mathbb{Z}$: …, −2, −1, 0, 1, 2, … Rational numbers $\mathbb{Q}$: numbers $\frac{a}{b}$ with integers $a, b$ and $b \ne 0$. Irrational numbers: real numbers that are not rational.`),
    text(r`The sets nest inside each other: every natural number is whole, every whole number is an integer, and every integer is rational. The rationals and the irrationals don't overlap; together they make up all the real numbers $\mathbb{R}$.`),
    callout("tip", "Spotting irrational numbers", r`$\sqrt{n}$ is irrational unless $n$ is a perfect square (or a ratio of perfect squares, like $\sqrt{\frac{4}{9}} = \frac{2}{3}$). $\pi$ and $e$ are irrational. A decimal that ends or repeats is rational; one that never ends and never repeats is irrational.`),
    example(r`Classify each number: $-7$, $0.\overline{45}$, $\sqrt{49}$, $\sqrt{50}$, $\frac{\pi}{2}$, $0$`, [
      [r`-7`, "Integer and rational (not whole, because it is negative)."],
      [r`0.\overline{45} = \tfrac{5}{11}`, "Repeating decimal: rational."],
      [r`\sqrt{49} = 7`, "Natural, whole, integer and rational."],
      [r`\sqrt{50} \approx 7.071\ldots`, "50 isn't a perfect square: irrational."],
      [r`\tfrac{\pi}{2}`, "An irrational number divided by 2 stays irrational."],
      [r`0`, "Whole, integer and rational, but not natural."],
    ]),
    example(r`Order from least to greatest: $\sqrt{10},\ 3.1,\ \pi,\ \tfrac{19}{6}$`, [
      [r`\sqrt{10} \approx 3.162`, "Estimate: between 3 and 4, and $3.16^2 \approx 9.99$."],
      [r`\pi \approx 3.1416,\quad \tfrac{19}{6} = 3.1\overline{6}`, ""],
      [r`3.1 < \pi < \sqrt{10} < \tfrac{19}{6}`, "Compare decimals place by place."],
    ]),
    callout("warning", "Calculators round", r`A calculator shows $\sqrt{2} \approx 1.414213562$, but the true decimal never ends or repeats. A displayed decimal is an approximation, not proof that a number is rational.`),
    callout("note", "Why √2 is irrational", r`Suppose $\sqrt{2} = \frac{a}{b}$ in lowest terms. Then $a^2 = 2b^2$, so $a^2$ is even, which makes $a$ even: $a = 2k$. Then $4k^2 = 2b^2$, so $b^2 = 2k^2$ and $b$ is even too. Both being even contradicts "lowest terms," so no such fraction exists.`),
    callout("application", "Where this shows up", r`The diagonal of a 1 m square tile is $\sqrt{2}$ m, and a circle's circumference involves $\pi$. Builders use rational approximations such as 1.414 m, but the exact lengths are irrational.`),
  ],
  questions: [
    mc(1, r`Which number is irrational?`, [r`$\sqrt{81}$`, r`$-\frac{3}{4}$`, r`$\sqrt{12}$`, r`$0.\overline{3}$`], 2,
      ["Which square root is of a non-perfect square?"], r`12 is not a perfect square, so $\sqrt{12}$ is irrational. $\sqrt{81} = 9$.`),
    mc(1, r`Which set contains both $-15$ and $15$?`, ["Natural numbers", "Integers", "Whole numbers", "Irrational numbers"], 1,
      ["Negative numbers are not natural or whole."], r`Both $-15$ and $15$ are integers. Only $15$ is natural and whole.`),
    mc(2, r`Which statement is always true?`, ["Every integer is a whole number.", "Every rational number is an integer.", "Every whole number is rational.", "Every square root is irrational."], 2,
      ["Use the nesting of the sets."], r`Whole numbers are integers, and every integer $n = \frac{n}{1}$ is rational. The other statements have counterexamples: $-1$, $\frac{1}{2}$ and $\sqrt{4}$.`),
    mc(2, r`Between which two consecutive integers does $-\sqrt{30}$ lie?`, ["−5 and −4", "−6 and −5", "5 and 6", "−31 and −30"], 1,
      [r`$5 < \sqrt{30} < 6$.`], r`Since $25 < 30 < 36$, $5 < \sqrt{30} < 6$, so $-6 < -\sqrt{30} < -5$.`),
    num(2, r`How many of these are rational? $\ \sqrt{16},\ \sqrt{17},\ 2.\overline{7},\ \pi,\ -\frac{8}{2},\ 0$`, 4, {},
      ["Check each one: does it end, repeat or simplify to a fraction?"], r`$\sqrt{16} = 4$, $2.\overline{7}$, $-\frac{8}{2} = -4$ and $0$ are rational. $\sqrt{17}$ and $\pi$ are not. That makes 4.`),
    short(3, r`Name the greatest of $\sqrt{8},\ 2.8,\ \frac{17}{6}$. Enter it exactly as written (sqrt8, 2.8 or 17/6).`, ["17/6"], [r`$\sqrt{8} \approx 2.828$; $\frac{17}{6} \approx 2.833$.`], r`$2.8 < 2.828 < 2.8\overline{3}$, so $\frac{17}{6}$ is greatest.`, "review"),
    mc(3, r`Is the sum of two irrational numbers always irrational?`, ["Yes, always", "No; for example √2 + (−√2) = 0", "No; it is always rational", "Only if both are square roots"], 1,
      ["Try a number and its opposite."], r`$\sqrt{2} + (-\sqrt{2}) = 0$, which is rational. So the sum of two irrationals can be rational. (A rational plus an irrational, though, is always irrational.)`, "review"),
  ],
});
