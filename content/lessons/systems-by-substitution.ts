import { callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "systems-by-substitution",
  title: "Solving systems by substitution",
  summary: "Solve systems exactly by solving one equation for a variable and substituting into the other, including systems with no solution or infinitely many.",
  minutes: 25,
  objectives: [
    "Solve a system by substitution and check the solution in both equations.",
    "Choose the variable that is easiest to isolate.",
    "Recognize no-solution and infinitely-many-solution systems from the algebra.",
  ],
  concepts: [
    { slug: "systems-of-equations", name: "Systems of linear equations", description: "Two or more equations solved together; solutions satisfy all of them.", subject: "subj_math" },
    { slug: "substitution", name: "Substitution", description: "Replacing a variable with a value to evaluate an expression.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Substitution turns two equations in two unknowns into one equation in one unknown. If one equation says $y = 2x + 1$, then wherever $y$ appears in the other equation you can write $2x + 1$ instead, because at the solution they are the same number.`),
    example(r`Solve $y = 2x + 1$ and $3x + 2y = 16$`, [
      [r`3x + 2(2x + 1) = 16`, "Substitute 2x + 1 for y. Keep the parentheses."],
      [r`7x + 2 = 16 \Rightarrow x = 2`, "Solve for x."],
      [r`y = 2(2) + 1 = 5`, "Substitute back to find y."],
      [r`(2, 5)`, ""],
    ], r`Check: $3(2) + 2(5) = 16$ ✓ and $5 = 2(2) + 1$ ✓.`),
    callout("tip", "Isolate a variable with coefficient 1 or −1", r`In $x - 4y = 3$, solving for $x$ gives $x = 4y + 3$ with no fractions. Solving for $y$ would introduce fractions.`),
    example(r`Solve $x - 4y = 3$ and $2x + 5y = -20$`, [
      [r`x = 4y + 3`, "Isolate x in the first equation."],
      [r`2(4y + 3) + 5y = -20`, "Substitute into the second."],
      [r`13y + 6 = -20 \Rightarrow y = -2`, ""],
      [r`x = 4(-2) + 3 = -5`, "Solution: (−5, −2)."],
    ]),
    example(r`Solve $y = 3x - 2$ and $6x - 2y = 4$`, [
      [r`6x - 2(3x - 2) = 4`, ""],
      [r`6x - 6x + 4 = 4 \Rightarrow 4 = 4`, "The variable disappears and a true statement is left."],
      [r`\text{Infinitely many solutions}`, "The equations describe the same line."],
    ], r`If instead you got a false statement like $4 = 9$, there would be no solution (parallel lines).`),
    callout("warning", "Finish the job", r`After finding $x$, you still need $y$. A solution of a system is an ordered pair. Substitute into the simpler equation, then check both.`),
    callout("application", "Where this shows up", r`A concert sold 500 tickets: adult tickets at 15 dollars and student tickets at 9 dollars, for 6,300 dollars in all. With $a + s = 500$ and $15a + 9s = 6300$, substituting $s = 500 - a$ gives $6a + 4500 = 6300$, so $a = 300$ and $s = 200$.`),
  ],
  questions: [
    short(1, r`Solve $y = x + 3$ and $2x + y = 12$. Enter as (x,y).`, ["(3,6)"], ["Substitute x + 3 for y."], r`$2x + x + 3 = 12$, $x = 3$, $y = 6$.`),
    short(2, r`Solve $x = 2y - 1$ and $3x - 4y = 5$. Enter as (x,y).`, ["(7,4)"], [r`$3(2y - 1) - 4y = 5$.`], r`$2y - 3 = 5$, $y = 4$, $x = 7$.`),
    short(2, r`Solve $x + y = 10$ and $x - y = 4$. Enter as (x,y).`, ["(7,3)"], [r`$x = 10 - y$.`], r`$10 - 2y = 4$, $y = 3$, $x = 7$.`),
    mc(2, r`Solving a system by substitution gives $-3 = 5$. What does this mean?`, ["x = −3", "There is no solution", "There are infinitely many solutions", "You made an error"], 1,
      ["Can −3 ever equal 5?"], r`A false statement means no ordered pair satisfies both equations: the lines are parallel.`),
    short(3, r`Solve $2x + 3y = 7$ and $x - 2y = 7$. Enter as (x,y).`, ["(5,-1)"], [r`$x = 2y + 7$.`, r`$2(2y + 7) + 3y = 7$.`], r`$7y + 14 = 7$, $y = -1$, $x = 5$. Check: $10 - 3 = 7$ ✓ and $5 + 2 = 7$ ✓.`),
    short(3, r`The sum of two numbers is 42 and one is 6 more than twice the other. Find the larger number.`, ["30"], [r`$x + y = 42$ and $y = 2x + 6$.`], r`$x + 2x + 6 = 42$, $x = 12$, $y = 30$.`, "review"),
  ],
});
