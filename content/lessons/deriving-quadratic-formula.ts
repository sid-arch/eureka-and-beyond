import { callout, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "deriving-quadratic-formula",
  title: "Deriving the quadratic formula",
  summary: "Derive the quadratic formula by completing the square on ax² + bx + c = 0, see where the discriminant comes from, and connect the formula to the axis of symmetry.",
  minutes: 30,
  objectives: [
    "Complete the square on the general equation ax² + bx + c = 0 to derive the quadratic formula.",
    "Explain the role of the discriminant b² − 4ac in the derivation.",
    "Connect −b/(2a) in the formula to the axis of symmetry and the symmetry of the roots.",
  ],
  concepts: [
    { slug: "completing-the-square", name: "Completing the square", description: "Adding (b/2)² to x² + bx to form a perfect-square trinomial.", subject: "subj_math" },
    { slug: "discriminant", name: "Discriminant", description: "b² − 4ac, which tells how many real solutions a quadratic equation has.", subject: "subj_math" },
  ],
  formulas: ["quadratic-formula", "discriminant"],
  blocks: [
    text(r`Completing the square solves any particular quadratic. Doing it once with letters instead of numbers solves every quadratic at once. The result is the quadratic formula.`),
    example(r`Derive the solutions of $ax^2 + bx + c = 0$, $a \ne 0$`, [
      [r`x^2 + \tfrac{b}{a}x + \tfrac{c}{a} = 0`, "Divide every term by a so the leading coefficient is 1."],
      [r`x^2 + \tfrac{b}{a}x = -\tfrac{c}{a}`, "Move the constant to the right."],
      [r`x^2 + \tfrac{b}{a}x + \tfrac{b^2}{4a^2} = \tfrac{b^2}{4a^2} - \tfrac{c}{a}`, r`Add $\left(\frac{b}{2a}\right)^2 = \frac{b^2}{4a^2}$ to both sides.`],
      [r`\left(x + \tfrac{b}{2a}\right)^2 = \tfrac{b^2 - 4ac}{4a^2}`, r`Factor the left; write the right over the common denominator $4a^2$.`],
      [r`x + \tfrac{b}{2a} = \pm\tfrac{\sqrt{b^2 - 4ac}}{2a}`, r`Take square roots. $\sqrt{4a^2} = 2|a|$, and the $\pm$ covers either sign of $a$.`],
      [r`x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, r`Subtract $\frac{b}{2a}$.`],
    ]),
    text(r`The step before taking square roots explains the discriminant. The left side is a square, so it can't be negative. If $b^2 - 4ac < 0$, the right side is negative and there is no real solution. If it equals 0, there is exactly one solution, $x = -\frac{b}{2a}$. If it is positive, there are two.`),
    text(r`The formula also shows symmetry: both roots are the same distance, $\frac{\sqrt{b^2 - 4ac}}{2|a|}$, from $-\frac{b}{2a}$, which is exactly the axis of symmetry. The average of the roots is always $-\frac{b}{2a}$.`),
    example(r`Use the formula on $2x^2 + 3x - 5 = 0$ and compare with factoring`, [
      [r`x = \frac{-3 \pm \sqrt{9 + 40}}{4} = \frac{-3 \pm 7}{4}`, "a = 2, b = 3, c = −5."],
      [r`x = 1 \text{ or } x = -\tfrac{5}{2}`, ""],
      [r`(2x + 5)(x - 1) = 0`, "Factoring gives the same roots."],
    ], r`The axis of symmetry is $x = -\frac{3}{4}$, and $\frac{1 + (-2.5)}{2} = -0.75$. ✓`),
    callout("warning", "The fraction bar covers everything", r`The $2a$ divides both $-b$ and the square root. Writing $-b \pm \frac{\sqrt{b^2 - 4ac}}{2a}$ is a common error.`),
    callout("note", "Vieta's formulas", r`Adding and multiplying the two roots from the formula gives $x_1 + x_2 = -\frac{b}{a}$ and $x_1 x_2 = \frac{c}{a}$. These are quick checks on any answer.`),
    callout("application", "Where this shows up", r`Every time software solves a quadratic, for projectile timing, optimization or graphics, it uses this formula (often in a rearranged form that avoids rounding error).`),
  ],
  questions: [
    mc(1, r`In the derivation, what is added to both sides to complete the square on $x^2 + \frac{b}{a}x$?`, [r`$\frac{b}{2a}$`, r`$\frac{b^2}{4a^2}$`, r`$\frac{b^2}{4a}$`, r`$\frac{b^2}{a^2}$`], 1, [r`Half of $\frac{b}{a}$, squared.`], r`$\left(\frac{b}{2a}\right)^2 = \frac{b^2}{4a^2}$.`),
    mc(2, r`Why does a negative discriminant mean no real solutions?`, ["The formula divides by zero", "A square can't equal a negative number", "a must be negative", "The roots would be equal"], 1, [r`Look at $\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$.`], r`The left side is a square of a real number, so it is at least 0. It can't equal a negative right side.`),
    num(2, r`What is the sum of the roots of $3x^2 - 12x + 5 = 0$?`, 4, {}, [r`Sum $= -\frac{b}{a}$.`], r`$-\frac{-12}{3} = 4$.`),
    num(2, r`What is the product of the roots of $3x^2 - 12x + 5 = 0$? Enter a fraction or decimal.`, 5 / 3, { tolerance: 1e-6 }, [r`Product $= \frac{c}{a}$.`], r`$\frac{5}{3}$.`),
    short(3, r`Use the formula to solve $x^2 - 6x + 4 = 0$. Enter the solutions in the form a±sqrt(b), like 2±sqrt(7).`, ["3±sqrt(5)", "3±√5", "3+-sqrt(5)", "3±sqrt5"], [r`$\frac{6 \pm \sqrt{36 - 16}}{2} = \frac{6 \pm \sqrt{20}}{2}$.`, r`$\sqrt{20} = 2\sqrt{5}$.`], r`$x = 3 \pm \sqrt{5}$.`),
    num(3, r`The roots of a quadratic are 2 and 8. What is the axis of symmetry? Enter the x-value.`, 5, {}, ["The axis is halfway between the roots."], r`$\frac{2 + 8}{2} = 5$, which equals $-\frac{b}{2a}$.`, "review"),
  ],
});
