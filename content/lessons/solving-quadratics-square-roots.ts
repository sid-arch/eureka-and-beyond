import { callout, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-quadratics-square-roots",
  title: "Solving quadratic equations with square roots",
  summary: "Solve equations of the form a(x − h)² = k by isolating the square and taking both square roots, and decide how many real solutions exist.",
  minutes: 20,
  objectives: [
    "Solve x² = k and (x − h)² = k, including both the positive and negative roots.",
    "Simplify square-root answers and give decimal approximations.",
    "Determine the number of real solutions from the sign of k.",
  ],
  concepts: [
    { slug: "square-roots", name: "Square roots", description: "A number that, multiplied by itself, gives a given number.", subject: "subj_math" },
    { slug: "quadratic-functions", name: "Quadratic functions", description: "Functions of the form f(x) = ax² + bx + c with a ≠ 0, whose graphs are parabolas.", subject: "subj_math" },
  ],
  blocks: [
    text(r`When a quadratic has no $x$-term, or the variable appears only inside one squared expression, you don't need to factor. Isolate the square, then undo it with a square root. Since both $5^2$ and $(-5)^2$ equal 25, $x^2 = 25$ has two solutions: $x = \pm 5$.`),
    example(r`Solve $3x^2 - 7 = 41$`, [
      [r`3x^2 = 48 \Rightarrow x^2 = 16`, "Isolate x²."],
      [r`x = \pm 4`, "Take both square roots."],
    ]),
    example(r`Solve $(x - 2)^2 = 18$`, [
      [r`x - 2 = \pm\sqrt{18} = \pm 3\sqrt{2}`, r`$\sqrt{18} = \sqrt{9 \cdot 2} = 3\sqrt{2}$.`],
      [r`x = 2 \pm 3\sqrt{2}`, "Add 2."],
      [r`x \approx 6.24 \text{ or } x \approx -2.24`, ""],
    ]),
    example(r`Solve $2(x + 1)^2 + 10 = 4$`, [
      [r`2(x + 1)^2 = -6 \Rightarrow (x + 1)^2 = -3`, ""],
      [r`\text{No real solution}`, "A square of a real number can't be negative."],
    ]),
    callout("tip", "How many solutions?", r`After isolating, $(\ldots)^2 = k$ has two real solutions if $k > 0$, one if $k = 0$, and none if $k < 0$. Graphically: the parabola $y = (x - h)^2$ meets the line $y = k$ twice, once or not at all.`),
    callout("warning", "Don't forget ±", r`Writing only $x = 4$ for $x^2 = 16$ loses the solution $x = -4$. The symbol $\sqrt{16}$ means only 4, so you add the $\pm$ yourself when solving.`),
    callout("application", "Where this shows up", r`A rock dropped from 64 ft has height $h = 64 - 16t^2$. It lands when $16t^2 = 64$, so $t^2 = 4$ and $t = 2$ s (the negative root makes no sense for time). The area of a square, $A = s^2$, also gives $s = \sqrt{A}$.`),
  ],
  questions: [
    short(1, r`Solve $x^2 = 81$. Enter both solutions, smaller first.`, ["-9,9"], ["Two numbers square to 81."], r`$x = \pm 9$.`),
    short(2, r`Solve $4x^2 - 100 = 0$. Enter both solutions, smaller first.`, ["-5,5"], [r`$x^2 = 25$.`], r`$x = \pm 5$.`),
    short(2, r`Solve $(x + 3)^2 = 49$. Enter both solutions, smaller first.`, ["-10,4"], [r`$x + 3 = \pm 7$.`], r`$x = 4$ or $x = -10$.`),
    num(2, r`Solve $(x - 5)^2 = 12$ and give the larger solution to two decimal places.`, 8.46, { tolerance: 0.006 }, [r`$x = 5 \pm 2\sqrt{3}$.`], r`$5 + 2\sqrt{3} \approx 5 + 3.464 = 8.46$.`),
    mc(2, r`How many real solutions does $5(x - 1)^2 + 20 = 0$ have?`, ["0", "1", "2", "Infinitely many"], 0, [r`Isolate: $(x - 1)^2 = -4$.`], r`A square can't equal $-4$, so there are no real solutions.`),
    mc(2, r`How many real solutions does $(2x - 6)^2 = 0$ have?`, ["0", "1", "2", "4"], 1, ["Only 0 squares to 0."], r`$2x - 6 = 0$ gives the single solution $x = 3$.`),
    num(3, r`A square garden has area 200 m². To the nearest tenth of a meter, how long is each side?`, 14.1, { unit: "m", tolerance: 0.05 }, [r`$s^2 = 200$, and $s$ must be positive.`], r`$s = \sqrt{200} = 10\sqrt{2} \approx 14.1$ m.`, "review"),
  ],
});
