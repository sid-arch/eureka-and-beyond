import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "complex-numbers",
  title: "Imaginary and complex numbers",
  summary: "Define i, simplify square roots of negatives and powers of i, and add, subtract, multiply and divide complex numbers.",
  minutes: 30,
  objectives: [
    "Define i and write square roots of negative numbers in terms of i.",
    "Simplify powers of i using the cycle i, −1, −i, 1.",
    "Add, subtract, multiply and divide complex numbers, using conjugates to divide.",
  ],
  concepts: [
    { slug: "complex-numbers", name: "Complex numbers", description: "Numbers a + bi with real a and b, where i² = −1.", subject: "subj_math" },
  ],
  formulas: ["complex-numbers"],
  blocks: [
    text(r`No real number squares to $-1$. Mathematicians defined a new number $i$ with $i^2 = -1$ and found that the rules of algebra still work. With $i$, every quadratic equation has solutions.`),
    def("Complex numbers", r`$\sqrt{-k} = i\sqrt{k}$ for $k > 0$. A complex number is $a + bi$ with real part $a$ and imaginary part $b$. Real numbers ($b = 0$) and pure imaginary numbers ($a = 0$) are special cases.`),
    def("Powers of i", r`$i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, then the cycle repeats. To simplify $i^n$, divide $n$ by 4 and use the remainder: $i^{23} = i^{3} = -i$.`),
    example(r`Multiply $(3 + 2i)(4 - 5i)$`, [
      [r`12 - 15i + 8i - 10i^2`, "Distribute (FOIL)."],
      [r`12 - 7i + 10 = 22 - 7i`, r`$-10i^2 = +10$.`],
    ]),
    example(r`Divide $\dfrac{5 + i}{2 - 3i}$`, [
      [r`\frac{5 + i}{2 - 3i} \cdot \frac{2 + 3i}{2 + 3i}`, "Multiply by the conjugate of the denominator."],
      [r`\frac{10 + 15i + 2i + 3i^2}{4 + 9} = \frac{7 + 17i}{13}`, ""],
      [r`\tfrac{7}{13} + \tfrac{17}{13}i`, ""],
    ]),
    callout("warning", "Simplify roots of negatives first", r`$\sqrt{-4} \cdot \sqrt{-9} = 2i \cdot 3i = 6i^2 = -6$, not $\sqrt{36} = 6$. The rule $\sqrt{a}\sqrt{b} = \sqrt{ab}$ only holds when $a, b \ge 0$.`),
    callout("application", "Where this shows up", r`Electrical engineers describe AC circuits with complex numbers, signal processing (audio, images, Wi-Fi) runs on them, and quantum mechanics is written in them.`),
  ],
  questions: [
    short(1, r`Simplify $\sqrt{-49}$.`, ["7i"], [], r`$7i$.`),
    short(2, r`Simplify $(6 - 2i) - (1 + 5i)$.`, ["5-7i"], [], r`$5 - 7i$.`),
    short(2, r`Multiply $(2 + i)(3 - i)$.`, ["7+i"], [r`$6 - 2i + 3i - i^2$.`], r`$6 + i + 1 = 7 + i$.`),
    mc(2, r`Simplify $i^{50}$.`, ["1", "i", "−1", "−i"], 2, ["50 = 4 · 12 + 2."], r`$i^2 = -1$.`),
    num(3, r`What is the product of $4 + 3i$ and its conjugate?`, 25, {}, [r`$a^2 + b^2$.`], r`$16 + 9 = 25$.`, "review"),
  ],
});
