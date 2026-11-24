import { callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "systems-by-elimination",
  title: "Solving systems by elimination",
  summary: "Add or subtract equations, after scaling if needed, to eliminate a variable, and choose between substitution and elimination.",
  minutes: 25,
  objectives: [
    "Explain why adding equations produces an equation that the solution still satisfies.",
    "Solve systems by elimination, multiplying one or both equations to create opposite coefficients.",
    "Choose an efficient method for a given system.",
  ],
  concepts: [
    { slug: "systems-of-equations", name: "Systems of linear equations", description: "Two or more equations solved together; solutions satisfy all of them.", subject: "subj_math" },
    { slug: "elimination", name: "Elimination method", description: "Combining equations so that one variable cancels.", subject: "subj_math" },
  ],
  blocks: [
    text(r`If $A = B$ and $C = D$, then $A + C = B + D$: adding equal amounts to equal amounts keeps things equal. So you can add two equations of a system, and the solution still satisfies the result. If a variable has opposite coefficients, it cancels.`),
    example(r`Solve $3x + 2y = 11$ and $5x - 2y = 13$`, [
      [r`8x = 24`, "Add the equations: +2y and −2y cancel."],
      [r`x = 3`, ""],
      [r`3(3) + 2y = 11 \Rightarrow y = 1`, "Substitute back."],
    ], r`Check: $5(3) - 2(1) = 13$ ✓.`),
    example(r`Solve $2x + 5y = 1$ and $3x - 2y = 11$`, [
      [r`4x + 10y = 2`, "Multiply the first equation by 2."],
      [r`15x - 10y = 55`, "Multiply the second by 5. Now the y-terms are opposites."],
      [r`19x = 57 \Rightarrow x = 3`, "Add."],
      [r`2(3) + 5y = 1 \Rightarrow y = -1`, "Solution: (3, −1)."],
    ], r`Check: $3(3) - 2(-1) = 11$ ✓.`),
    callout("tip", "Which method?", r`Use substitution when a variable is already isolated or has coefficient 1. Use elimination when both equations are in standard form, especially when coefficients already match or are easy to make opposite.`),
    example(r`Solve $4x - 6y = 10$ and $-2x + 3y = 7$`, [
      [r`4x - 6y = 10,\quad -4x + 6y = 14`, "Multiply the second by 2."],
      [r`0 = 24`, "Both variables cancel and the statement is false."],
      [r`\text{No solution}`, "The lines are parallel."],
    ]),
    callout("warning", "Multiply every term", r`When scaling an equation, multiply both sides completely, including the constant: $2(3x - 2y = 11)$ is $6x - 4y = 22$. Forgetting the 11 is a common slip.`),
    callout("application", "Where this shows up", r`A chemistry lab mixes a 10% acid solution with a 40% solution to make 30 L of a 20% solution: $x + y = 30$ and $0.10x + 0.40y = 6$. Multiplying the first by $-0.10$ and adding gives $0.30y = 3$, so $y = 10$ L and $x = 20$ L.`),
  ],
  questions: [
    short(1, r`Solve $x + y = 9$ and $x - y = 1$. Enter as (x,y).`, ["(5,4)"], ["Add the equations."], r`$2x = 10$, $x = 5$, $y = 4$.`),
    short(2, r`Solve $2x + 3y = 12$ and $2x - y = 4$. Enter as (x,y).`, ["(3,2)"], ["Subtract the second equation from the first."], r`$4y = 8$, $y = 2$, then $2x = 6$, $x = 3$.`),
    short(2, r`Solve $3x - 2y = 4$ and $x + 4y = 20$. Enter as (x,y).`, ["(4,4)"], ["Multiply the first equation by 2.", r`$6x - 4y = 8$, then add.`], r`$7x = 28$, $x = 4$, and $4 + 4y = 20$ gives $y = 4$.`),
    short(3, r`Solve $5x + 2y = 3$ and $3x + 5y = -21$. Enter as (x,y).`, ["(3,-6)"], ["Multiply the first by 5 and the second by −2.", r`$25x + 10y = 15$ and $-6x - 10y = 42$.`], r`$19x = 57$, $x = 3$; $15 + 2y = 3$, $y = -6$.`),
    mc(2, r`Adding two equations gives $0 = 0$. What does that tell you?`, ["The solution is (0, 0)", "No solution", "Infinitely many solutions", "x = 0"], 2,
      ["Is 0 = 0 ever false?"], r`A true statement with no variables means the equations describe the same line: infinitely many solutions.`),
    short(3, r`Four pens and three notebooks cost 18 dollars. Two pens and five notebooks cost 23 dollars. How much is one notebook, in dollars?`, ["4"], [r`$4p + 3n = 18$ and $2p + 5n = 23$.`, "Multiply the second by −2 and add."], r`$-7n = -28$, so $n = 4$ dollars (and $p = 1.50$ dollars).`, "review"),
  ],
});
