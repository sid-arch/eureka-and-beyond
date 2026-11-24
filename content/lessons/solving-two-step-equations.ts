// This lesson was published in migration 0003. Only additions are emitted:
// objectives, an interactive balance, a guided walkthrough and practice.
import { activity, callout, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-two-step-equations",
  existingId: "les_two_step_eq",
  title: "Solving two-step equations",
  summary: "",
  minutes: 20,
  objectives: [
    "Use inverse operations and the properties of equality to isolate a variable.",
    "Undo operations in the reverse of the order they were applied.",
    "Check a solution by substituting it into the original equation.",
  ],
  formulas: [],
  blocks: [
    activity("balance-equation", {
      title: "Keep the equation balanced",
      params: { a: 3, b: 5, c: 20 },
    }),
    callout("tip", "Try this", r`Set up $-4x + 6 = -10$. Which operation should come first? What happens if you divide by $-4$ first instead? Both orders can work, but one creates fractions.`, "experiment"),
    activity("balance-equation", {
      title: "Walkthrough: solving 3x + 5 = 20",
      steps: [
        { title: "Start", body: "The equation 3x + 5 = 20 says both sides have the same value. Anything we do must be done to both sides.", params: { a: 3, b: 5, c: 20 } },
        { title: "Undo the addition", body: "Subtract 5 from both sides. The +5 disappears on the left and 20 becomes 15.", params: { a: 3, b: 0, c: 15 } },
        { title: "Undo the multiplication", body: "Divide both sides by 3. The left side is now x by itself and the right side is 5.", params: { a: 1, b: 0, c: 5 } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`Solve $2x + 7 = 19$.`, 6, {}, ["Subtract 7 from both sides first."], r`$2x = 12$, so $x = 6$. Check: $2(6) + 7 = 19$.`),
    num(1, r`Solve $\frac{x}{5} - 3 = 4$.`, 35, {}, ["Add 3 to both sides, then multiply by 5."], r`$\frac{x}{5} = 7$, so $x = 35$. Check: $35 \div 5 - 3 = 4$.`),
    num(2, r`Solve $-4x + 6 = -10$.`, 4, {}, ["Subtract 6 from both sides.", r`Divide by $-4$; a negative divided by a negative is positive.`], r`$-4x = -16$, so $x = 4$. Check: $-16 + 6 = -10$.`),
    mc(2, r`A student solved $3x - 9 = 12$ by first dividing both sides by 3 and got $x - 9 = 4$. What went wrong?`, [
      "Nothing; the next step gives x = 13.",
      "Dividing by 3 must divide every term: x − 3 = 4.",
      "You can never divide first.",
      "They should have multiplied by 3.",
    ], 1, ["Division by 3 applies to the whole left side, 3x − 9."],
      r`$\frac{3x - 9}{3} = x - 3$, so the correct equation is $x - 3 = 4$ and $x = 7$. Dividing first works only if every term is divided.`),
    num(2, r`A gym charges a 30-dollar sign-up fee plus 15 dollars per month. Maya has paid 135 dollars in total. How many months has she been a member?`, 7, {}, [r`Write $15m + 30 = 135$.`], r`$15m = 105$, so $m = 7$ months.`),
    short(3, r`Solve $\frac{2x + 1}{3} = 5$. Enter your answer as x = …`, ["x=7", "7"], ["Multiply both sides by 3 first.", "Then 2x + 1 = 15."], r`$2x + 1 = 15$, $2x = 14$, $x = 7$. Check: $\frac{15}{3} = 5$.`, "review"),
  ],
});
