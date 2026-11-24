import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "one-step-equations",
  title: "One-step equations",
  summary: "Solve equations that need a single inverse operation, using the properties of equality, and check every solution.",
  minutes: 20,
  objectives: [
    "Explain what a solution of an equation is.",
    "Solve one-step equations using inverse operations and the properties of equality.",
    "Write and solve a one-step equation from a word problem and check the answer in context.",
  ],
  concepts: [
    { slug: "properties-of-equality", name: "Properties of equality", description: "Doing the same operation to both sides of an equation keeps it true.", subject: "subj_math" },
  ],
  blocks: [
    def("Equation and solution", r`An equation states that two expressions are equal, like $x + 9 = 4$. A solution is a value of the variable that makes the statement true. Here $x = -5$ is the solution because $-5 + 9 = 4$.`),
    text(r`An equation is like a balanced scale. To keep it balanced, whatever you do to one side you must do to the other. To solve, use the inverse operation that undoes what has been done to the variable. Addition and subtraction undo each other, and so do multiplication and division.`),
    def("Properties of equality", r`If $a = b$, then $a + c = b + c$, $a - c = b - c$, $ac = bc$, and $\frac{a}{c} = \frac{b}{c}$ for $c \ne 0$.`),
    activity("balance-equation", { title: "Keep the scale balanced", params: { a: 1, b: 9, c: 4 } }),
    callout("tip", "Try this", r`Solve $x + 9 = 4$ in the balance. Then set $a = 4$, $b = 0$, $c = -28$ to solve $4x = -28$. Which operation removes the 4?`, "experiment"),
    example(r`Solve $y - 12 = -7$`, [
      [r`y - 12 + 12 = -7 + 12`, "12 is subtracted from y; add 12 to both sides."],
      [r`y = 5`, ""],
    ], r`Check: $5 - 12 = -7$. ✓`),
    example(r`Solve $-6n = 42$`, [
      [r`\frac{-6n}{-6} = \frac{42}{-6}`, "n is multiplied by −6; divide both sides by −6."],
      [r`n = -7`, ""],
    ], r`Check: $-6(-7) = 42$. ✓`),
    example(r`Solve $\tfrac{3}{4}k = 18$`, [
      [r`\tfrac{4}{3} \cdot \tfrac{3}{4}k = \tfrac{4}{3} \cdot 18`, "Multiply by the reciprocal, 4/3, to undo multiplying by 3/4."],
      [r`k = 24`, r`$\frac{4 \cdot 18}{3} = 24$.`],
    ], r`Check: $\frac{3}{4} \cdot 24 = 18$. ✓`),
    example(r`After spending 23.75 dollars, Jay has 41.50 dollars left. How much did he start with?`, [
      [r`s - 23.75 = 41.50`, "Let s be the starting amount."],
      [r`s = 41.50 + 23.75 = 65.25`, "Add 23.75 to both sides."],
    ], "Jay started with 65.25 dollars. Check: 65.25 − 23.75 = 41.50."),
    callout("warning", "Divide by the whole coefficient", r`In $-x = 9$, the coefficient is $-1$. Divide (or multiply) by $-1$: $x = -9$. Writing $x = 9$ ignores the negative sign.`),
    callout("application", "Where this shows up", r`"A box of 8 identical bottles weighs 6 kg; how much does one weigh?" is $8w = 6$, so $w = 0.75$ kg. Many everyday questions are one-step equations in disguise.`),
  ],
  questions: [
    num(1, r`Solve $x + 15 = 6$.`, -9, {}, ["Subtract 15 from both sides."], r`$x = 6 - 15 = -9$.`),
    num(1, r`Solve $\frac{m}{4} = -3$.`, -12, {}, ["Multiply both sides by 4."], r`$m = -12$. Check: $-12 \div 4 = -3$.`),
    num(1, r`Solve $-9p = -54$.`, 6, {}, ["Divide both sides by −9."], r`$p = 6$.`),
    num(2, r`Solve $w - 3.6 = -1.2$.`, 2.4, {}, ["Add 3.6 to both sides."], r`$w = -1.2 + 3.6 = 2.4$.`),
    num(2, r`Solve $-\tfrac{2}{5}x = 8$.`, -20, {}, [r`Multiply by $-\frac{5}{2}$.`], r`$x = 8 \cdot \left(-\frac{5}{2}\right) = -20$.`),
    mc(2, r`Which equation has the solution $x = -4$?`, [r`$x + 7 = -11$`, r`$-3x = 12$`, r`$\frac{x}{2} = 2$`, r`$x - 5 = 1$`], 1,
      ["Substitute −4 into each equation."], r`$-3(-4) = 12$ is true. The others give $3 \ne -11$, $-2 \ne 2$ and $-9 \ne 1$.`),
    num(2, r`A shirt costs 3 times as much as a pair of socks. The shirt costs 22.50 dollars. How much do the socks cost?`, 7.5, { unit: "dollars" },
      [r`$3s = 22.50$.`], r`$s = 22.50 \div 3 = 7.50$ dollars.`),
    num(3, r`The temperature dropped 14 degrees overnight to $-5^\circ$F. What was the temperature the evening before?`, 9, { unit: "°F" },
      [r`$t - 14 = -5$.`], r`$t = -5 + 14 = 9^\circ$F.`, "review"),
    short(3, r`Solve $-x = -\tfrac{3}{8}$. Enter x as a fraction.`, ["3/8", "x=3/8"], ["Multiply both sides by −1."], r`$x = \frac{3}{8}$.`, "review"),
  ],
});
