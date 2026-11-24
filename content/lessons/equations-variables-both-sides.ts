import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "equations-variables-both-sides",
  title: "Equations with variables on both sides",
  summary: "Collect variable terms on one side, then solve; recognize equations with no solution or infinitely many solutions.",
  minutes: 25,
  objectives: [
    "Solve linear equations that have the variable on both sides.",
    "Use the distributive property and combine like terms before solving.",
    "Identify equations that have no solution or infinitely many solutions.",
  ],
  concepts: [{ slug: "solving-linear-equations", name: "Solving linear equations", description: "Using inverse operations and the properties of equality to find the value of an unknown.", subject: "subj_math" }],
  blocks: [
    text(r`When the variable appears on both sides, as in $5x - 4 = 2x + 11$, the first goal is to gather all the variable terms on one side. Subtracting $2x$ from both sides keeps the equation balanced and leaves a two-step equation you already know how to solve.`),
    example(r`Solve $5x - 4 = 2x + 11$`, [
      [r`5x - 2x - 4 = 2x - 2x + 11`, r`Subtract $2x$ from both sides.`],
      [r`3x - 4 = 11`, "Combine like terms."],
      [r`3x = 15`, "Add 4 to both sides."],
      [r`x = 5`, "Divide both sides by 3."],
    ], r`Left: $5(5) - 4 = 21$. Right: $2(5) + 11 = 21$. Both sides match.`),
    callout("tip", "Which side should the variable go to?", r`Either works. Moving the smaller coefficient avoids negative coefficients: in $2x + 9 = 7x - 1$, subtracting $2x$ gives $9 = 5x - 1$, so $x = 2$.`),
    example(r`Solve $3(2x - 1) = 4x + 9$`, [
      [r`6x - 3 = 4x + 9`, "Distribute the 3 to both terms in parentheses."],
      [r`2x - 3 = 9`, r`Subtract $4x$ from both sides.`],
      [r`2x = 12`, "Add 3."],
      [r`x = 6`, "Divide by 2."],
    ], r`Left: $3(11) = 33$. Right: $24 + 9 = 33$.`),
    def("Identity", r`An equation that is true for every value of the variable, such as $2(x + 3) = 2x + 6$. Simplifying leads to a true statement like $6 = 6$, so there are infinitely many solutions.`),
    def("Contradiction", r`An equation that is never true, such as $x + 4 = x + 7$. Simplifying leads to a false statement like $4 = 7$, so there is no solution.`),
    callout("application", "Where this shows up", r`Plan A costs 40 dollars plus 5 dollars per class; plan B costs 10 dollars per class. Setting $40 + 5c = 10c$ gives $c = 8$: at 8 classes the plans cost the same, and beyond that plan A is cheaper.`),
  ],
  questions: [
    num(1, r`Solve $7x + 2 = 3x + 18$.`, 4, {}, [r`Subtract $3x$ from both sides.`], r`$4x + 2 = 18$, $4x = 16$, $x = 4$.`),
    num(2, r`Solve $4(x - 3) = 2x + 6$.`, 9, {}, ["Distribute first: 4x − 12."], r`$4x - 12 = 2x + 6$, $2x = 18$, $x = 9$.`),
    num(2, r`Solve $2x + 9 = 7x - 1$.`, 2, {}, [r`Subtract $2x$ to keep the coefficient positive.`], r`$9 = 5x - 1$, $10 = 5x$, $x = 2$.`),
    mc(2, r`How many solutions does $3(x + 2) = 3x + 6$ have?`, ["None", "Exactly one", "Exactly two", "Infinitely many"], 3,
      ["Distribute the left side and compare."], r`$3x + 6 = 3x + 6$ is true for every $x$, so it is an identity with infinitely many solutions.`),
    mc(2, r`How many solutions does $5x - 1 = 5x + 4$ have?`, ["None", "Exactly one", "Infinitely many", "It depends on x"], 0,
      [r`Subtract $5x$ from both sides.`], r`You get $-1 = 4$, which is false, so there is no solution.`),
    num(3, r`Two phone plans: A costs 20 dollars plus 0.10 dollars per minute; B costs 0.25 dollars per minute. For how many minutes do they cost the same?`, 133.33, { tolerance: 0.05 }, [r`Set $20 + 0.10m = 0.25m$.`],
      r`$20 = 0.15m$, so $m = \frac{20}{0.15} \approx 133.33$ minutes.`, "review"),
  ],
});
