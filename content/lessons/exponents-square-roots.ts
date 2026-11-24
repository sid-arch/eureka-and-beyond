import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "exponents-square-roots",
  title: "Exponents and square roots",
  summary: "Read and evaluate powers, including negative bases and zero exponents, and find and estimate square roots.",
  minutes: 25,
  objectives: [
    "Write repeated multiplication with exponents and evaluate powers.",
    "Distinguish between (−a)ⁿ and −aⁿ.",
    "Find square roots of perfect squares and estimate other square roots between consecutive integers.",
  ],
  concepts: [
    { slug: "exponents", name: "Exponents", description: "Notation for repeated multiplication of a base.", subject: "subj_math" },
    { slug: "square-roots", name: "Square roots", description: "A number that, multiplied by itself, gives a given number.", subject: "subj_math" },
  ],
  blocks: [
    def("Power", r`$a^n$ means $n$ factors of $a$: $a^n = a \cdot a \cdots a$. In $2^5$, 2 is the base and 5 is the exponent: $2^5 = 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 32$.`),
    text(r`Squares and cubes get their names from geometry: a square with side 4 has area $4^2 = 16$, and a cube with edge 4 has volume $4^3 = 64$. Any number to the first power is itself ($9^1 = 9$), and any nonzero number to the zero power is 1 ($9^0 = 1$). The zero-power rule comes from patterns: $3^3 = 27$, $3^2 = 9$, $3^1 = 3$, so each step divides by 3 and the next step gives $3^0 = 1$.`),
    callout("warning", "Parentheses matter", r`$(-5)^2 = (-5)(-5) = 25$, but $-5^2 = -(5 \cdot 5) = -25$. The exponent applies only to what is directly in front of it.`),
    def("Square root", r`$\sqrt{n}$ (the principal square root) is the nonnegative number whose square is $n$. $\sqrt{49} = 7$ because $7^2 = 49$. Both 7 and $-7$ square to 49, but the symbol $\sqrt{\phantom{x}}$ means the nonnegative one.`),
    text(r`Numbers like 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121 and 144 are perfect squares: their square roots are whole numbers. Other square roots are irrational decimals, but you can estimate them. Since $36 < 40 < 49$, $\sqrt{40}$ is between 6 and 7, and closer to 6.`),
    example(r`Evaluate $(-2)^3 + 4^2 - 10^0$`, [
      [r`(-2)^3 = -8`, "Three negative factors: negative."],
      [r`4^2 = 16, \quad 10^0 = 1`, ""],
      [r`-8 + 16 - 1 = 7`, "Combine left to right."],
    ]),
    example(r`Estimate $\sqrt{70}$ to one decimal place`, [
      [r`64 < 70 < 81 \Rightarrow 8 < \sqrt{70} < 9`, "Find the perfect squares on each side."],
      [r`8.3^2 = 68.89, \quad 8.4^2 = 70.56`, "Test tenths near the lower end."],
      [r`\sqrt{70} \approx 8.4`, "70 is closer to 70.56 than to 68.89."],
    ], r`A calculator gives $\sqrt{70} = 8.3666\ldots$, which rounds to 8.4.`),
    example(r`Evaluate $\sqrt{\tfrac{9}{25}}$ and $\sqrt{0.16}$`, [
      [r`\sqrt{\tfrac{9}{25}} = \tfrac{3}{5}`, r`Because $\left(\frac{3}{5}\right)^2 = \frac{9}{25}$.`],
      [r`\sqrt{0.16} = 0.4`, r`Because $0.4^2 = 0.16$.`],
    ]),
    callout("note", "Negative numbers under the root", r`$\sqrt{-9}$ is not a real number: no real number squared gives a negative. (In Algebra 2 you'll meet the imaginary number $i$, which handles this.)`),
    callout("application", "Where this shows up", r`A square garden with area 50 square meters has sides $\sqrt{50} \approx 7.07$ m. Bacteria that double every hour multiply by $2^{10} = 1024$ in ten hours.`),
  ],
  questions: [
    num(1, r`Evaluate $3^4$.`, 81, {}, ["Four factors of 3."], r`$3 \cdot 3 \cdot 3 \cdot 3 = 81$.`),
    num(1, r`Evaluate $\sqrt{121}$.`, 11, {}, ["What number times itself is 121?"], r`$11^2 = 121$, so $\sqrt{121} = 11$.`),
    num(2, r`Evaluate $-4^2$.`, -16, {}, ["The exponent applies only to 4."], r`$-4^2 = -(4^2) = -16$.`),
    num(2, r`Evaluate $(-1)^{7} + (-1)^{8}$.`, 0, {}, ["Odd number of negative factors gives −1; even gives 1."], r`$-1 + 1 = 0$.`),
    mc(2, r`Between which two consecutive integers is $\sqrt{55}$?`, ["5 and 6", "6 and 7", "7 and 8", "27 and 28"], 2,
      ["Which perfect squares are just below and above 55?"], r`$49 < 55 < 64$, so $7 < \sqrt{55} < 8$.`),
    num(2, r`Evaluate $\left(\tfrac{2}{3}\right)^3$. Enter a fraction.`, 8 / 27, { tolerance: 1e-6 }, ["Cube the numerator and the denominator."], r`$\frac{2^3}{3^3} = \frac{8}{27}$.`),
    num(2, r`A square tile has an area of 144 square inches. What is the length of one side, in inches?`, 12, { unit: "in" }, ["Side × side = area."], r`$\sqrt{144} = 12$ inches.`),
    num(3, r`Evaluate $2^5 - 5^2 + 7^0 - \sqrt{36}$.`, 2, {}, [r`$2^5 = 32$, $5^2 = 25$, $7^0 = 1$, $\sqrt{36} = 6$.`], r`$32 - 25 + 1 - 6 = 2$.`, "review"),
    short(3, r`Estimate $\sqrt{30}$ to the nearest tenth.`, ["5.5"], ["30 is between 25 and 36.", r`$5.4^2 = 29.16$ and $5.5^2 = 30.25$.`], r`$30$ is closer to $30.25$ than to $29.16$, so $\sqrt{30} \approx 5.5$. (Exact: 5.477…)`, "review"),
  ],
});
