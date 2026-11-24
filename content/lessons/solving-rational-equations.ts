import { callout, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-rational-equations",
  title: "Solving rational equations",
  summary: "Solve rational equations by multiplying by the LCD, check for extraneous solutions, and solve work and rate problems.",
  minutes: 30,
  objectives: [
    "Clear denominators by multiplying both sides by the LCD.",
    "Identify extraneous solutions that make a denominator zero.",
    "Solve work, rate and mixture problems modeled by rational equations.",
  ],
  concepts: [
    { slug: "rational-expressions", name: "Rational expressions", description: "Ratios of polynomials, defined where the denominator is not zero.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Multiplying every term by the least common denominator turns a rational equation into a polynomial equation. But that step can introduce solutions that make an original denominator zero. Those are extraneous and must be rejected.`),
    example(r`Solve $\dfrac{x}{x - 3} = \dfrac{3}{x - 3} + 2$`, [
      [r`x = 3 + 2(x - 3)`, "Multiply by x − 3."],
      [r`x = 2x - 3 \Rightarrow x = 3`, ""],
      [r`x = 3 \text{ makes a denominator } 0`, "Extraneous: no solution."],
    ]),
    example(r`Solve $\dfrac{2}{x} + \dfrac{1}{x + 2} = 1$`, [
      [r`2(x + 2) + x = x(x + 2)`, "LCD x(x + 2)."],
      [r`3x + 4 = x^2 + 2x \Rightarrow x^2 - x - 4 = 0`, ""],
      [r`x = \frac{1 \pm \sqrt{17}}{2} \approx 2.56,\ -1.56`, "Neither is 0 or −2, so both are valid."],
    ]),
    example(r`One pump fills a tank in 6 hours and another in 3 hours. How long together?`, [
      [r`\tfrac{t}{6} + \tfrac{t}{3} = 1`, "Fraction of the job each does in t hours."],
      [r`t + 2t = 6 \Rightarrow t = 2 \text{ h}`, ""],
    ]),
    callout("warning", "Always check", r`List the excluded values before solving, and compare your answers against them.`),
    callout("application", "Where this shows up", r`Work rates, average speeds, lens equations ($\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}$) and parallel resistors all lead to rational equations.`),
  ],
  questions: [
    num(1, r`Solve $\dfrac{12}{x} = 4$.`, 3, {}, [], r`$x = 3$.`),
    num(2, r`Solve $\dfrac{x + 1}{x - 2} = 4$.`, 3, {}, [r`$x + 1 = 4x - 8$.`], r`$3x = 9$, $x = 3$.`),
    short(2, r`Solve $\dfrac{x^2}{x - 1} = \dfrac{1}{x - 1}$. Enter the solution, or "none".`, ["-1", "x=-1"], [r`$x^2 = 1$, but $x = 1$ is excluded.`], r`$x = \pm 1$; $x = 1$ is extraneous, so $x = -1$.`),
    num(2, r`Ana paints a room in 4 hours; Ben in 12 hours. How many hours together?`, 3, { unit: "h" }, [r`$\frac{t}{4} + \frac{t}{12} = 1$.`], r`$3t + t = 12$, $t = 3$ hours.`),
    num(3, r`A boat goes 24 km downstream and 24 km back in 5 hours total. The current is 2 km/h. What is the boat's speed in still water?`, 10, { unit: "km/h" }, [r`$\frac{24}{b + 2} + \frac{24}{b - 2} = 5$.`], r`$48b = 5(b^2 - 4)$, so $5b^2 - 48b - 20 = 0$ and $b = 10$ (the other root is negative).`, "review"),
  ],
});
