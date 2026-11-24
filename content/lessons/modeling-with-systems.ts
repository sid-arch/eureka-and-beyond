import { activity, callout, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "modeling-with-systems",
  title: "Modeling with systems of equations",
  summary: "Translate word problems about totals, mixtures, rates and comparisons into systems, solve them, and interpret the answers in context.",
  minutes: 30,
  objectives: [
    "Define variables and write a system of two equations from a situation.",
    "Solve mixture, total-value, rate and break-even problems.",
    "Interpret the solution in context and check that it is reasonable.",
  ],
  concepts: [
    { slug: "systems-of-equations", name: "Systems of linear equations", description: "Two or more equations solved together; solutions satisfy all of them.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Most system word problems give two separate facts about the same two unknowns. Each fact becomes one equation. A reliable process: name the variables with units, write one equation per fact, solve by the most convenient method, then answer the question that was actually asked and check it against the story.`),
    example(r`Total and value: 32 coins, all dimes and quarters, are worth 5.75 dollars. How many of each?`, [
      [r`d + q = 32`, "Count equation."],
      [r`0.10d + 0.25q = 5.75`, "Value equation, in dollars."],
      [r`10d + 25q = 575;\ \ 10d + 10q = 320`, "Multiply the value equation by 100 and the count equation by 10."],
      [r`15q = 255 \Rightarrow q = 17,\ d = 15`, "Subtract, then back-substitute."],
    ], "Check: 15 dimes = 1.50 and 17 quarters = 4.25, total 5.75 dollars. ✓"),
    example(r`Rate with a current: a boat goes 36 km downstream in 2 h and returns upstream in 3 h. Find the boat's speed in still water and the current's speed.`, [
      [r`2(b + c) = 36 \Rightarrow b + c = 18`, "Downstream the current helps."],
      [r`3(b - c) = 36 \Rightarrow b - c = 12`, "Upstream it slows the boat."],
      [r`2b = 30 \Rightarrow b = 15,\ c = 3`, "Add the equations."],
    ], "Boat 15 km/h, current 3 km/h. Downstream 18 km/h for 2 h = 36 km ✓."),
    example(r`Break-even: a bakery's costs are $C = 400 + 1.5x$ and revenue is $R = 3.5x$ for $x$ loaves. When does it break even?`, [
      [r`3.5x = 400 + 1.5x`, "Break even when revenue equals cost."],
      [r`2x = 400 \Rightarrow x = 200`, "200 loaves (700 dollars of revenue)."],
    ], "Selling more than 200 loaves makes a profit; fewer causes a loss."),
    activity("systems-graph", { title: "Break-even on a graph (scaled)", params: { m1: 1.5, b1: 4, m2: 3.5, b2: 0 } }),
    callout("tip", "Try this", r`Scaled down by 100 loaves and 100 dollars, cost is $y = 1.5x + 4$ and revenue is $y = 3.5x$. Where do the lines cross? Which line is higher to the right of that point, and what does that mean for the bakery?`, "experiment"),
    callout("warning", "Answer the real question", r`If the problem asks for "the price of an adult ticket," don't stop at listing both variables without saying which is which. And reject answers that make no sense, such as negative coins or 12.6 people; they signal an error in the setup.`),
    callout("application", "Where this shows up", r`Nutrition planning (two foods supplying exactly so much protein and so many calories), comparing job offers, mixing alloys or solutions, and setting prices all lead to systems of equations.`),
  ],
  questions: [
    num(2, r`A theater sold 220 tickets. Adult tickets cost 12 dollars and child tickets 7 dollars, and sales were 2,140 dollars. How many adult tickets were sold?`, 120, {},
      [r`$a + c = 220$, $12a + 7c = 2140$.`, r`Substitute $c = 220 - a$.`], r`$12a + 1540 - 7a = 2140$, so $5a = 600$ and $a = 120$ (and $c = 100$).`),
    num(2, r`How many liters of a 30% salt solution must be mixed with a 70% salt solution to make 20 L of a 45% solution?`, 12.5, { unit: "L" },
      [r`$x + y = 20$, $0.30x + 0.70y = 9$.`], r`From $y = 20 - x$: $0.30x + 14 - 0.70x = 9$, so $-0.40x = -5$ and $x = 12.5$ L of the 30% solution (and 7.5 L of the 70%).`),
    num(2, r`A plane flies 1,200 miles with the wind in 3 hours and returns against the wind in 4 hours. What is the wind speed, in mph?`, 50, { unit: "mph" },
      [r`$p + w = 400$ and $p - w = 300$.`], r`Subtracting gives $2w = 100$, so $w = 50$ mph (and the plane's airspeed is 350 mph).`),
    num(3, r`A company sells shirts for 18 dollars each. It has fixed costs of 2,400 dollars and each shirt costs 6 dollars to make. How many shirts must it sell to break even?`, 200, {},
      [r`$18x = 2400 + 6x$.`], r`$12x = 2400$, so $x = 200$ shirts.`),
    short(3, r`The perimeter of a rectangle is 54 cm and its length is 3 cm less than twice its width. Find the length in cm.`, ["17"], [r`$2l + 2w = 54$ and $l = 2w - 3$.`], r`$2(2w - 3) + 2w = 54$, so $6w = 60$, $w = 10$ and $l = 17$ cm.`, "review"),
    num(3, r`A jar has 40 nickels and quarters worth 6.00 dollars. How many quarters are there?`, 20, {}, [r`$n + q = 40$, $0.05n + 0.25q = 6$.`], r`Multiply value by 20: $n + 5q = 120$. Subtract the count: $4q = 80$, $q = 20$.`, "review"),
  ],
});
