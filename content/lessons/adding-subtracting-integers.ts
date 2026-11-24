import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "adding-subtracting-integers",
  title: "Adding and subtracting integers",
  summary: "Add integers as moves on a number line, use rules for like and unlike signs, and subtract by adding the opposite.",
  minutes: 25,
  objectives: [
    "Model integer addition as movement on a number line.",
    "Add integers with the same sign and with different signs using absolute values.",
    "Rewrite subtraction as addition of the opposite and evaluate integer expressions.",
  ],
  concepts: [
    { slug: "integer-addition", name: "Integer addition and subtraction", description: "Combining signed numbers; subtraction is adding the opposite.", subject: "subj_math" },
    { slug: "additive-inverse", name: "Additive inverse", description: "A number and its opposite add to zero: a + (−a) = 0.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Think of every integer as a move on the number line: a positive number moves right and a negative number moves left. To find $3 + (-7)$, start at 3 and move 7 to the left. You land on $-4$.`),
    activity("number-line", {
      title: "Walkthrough: three kinds of moves",
      steps: [
        { title: "Same signs", body: "−3 + (−5): start at −3 and move 5 more to the left. Two moves in the same direction combine, so you land 8 units left of 0, at −8.", params: { a: -3, b: -5, op: "add" } },
        { title: "Different signs", body: "6 + (−9): start at 6 and move 9 left. The moves partly cancel. The larger move (9 left) wins by 3, so the result is −3.", params: { a: 6, b: -9, op: "add" } },
        { title: "Subtracting a negative", body: "2 − (−5): subtracting means moving the opposite way from adding. Adding −5 would move left, so subtracting −5 moves right. The result is 2 + 5 = 7.", params: { a: 2, b: -5, op: "subtract" } },
      ],
    }, "watch"),
    def("Adding with the same sign", r`Add the absolute values and keep the common sign. $-4 + (-9) = -13$ and $4 + 9 = 13$.`),
    def("Adding with different signs", r`Subtract the smaller absolute value from the larger and keep the sign of the number with the larger absolute value. $-12 + 5 = -7$ because $12 - 5 = 7$ and $-12$ has the larger absolute value.`),
    def("Subtraction as adding the opposite", r`For any numbers $a$ and $b$, $a - b = a + (-b)$. So $5 - 8 = 5 + (-8) = -3$ and $-6 - (-10) = -6 + 10 = 4$.`),
    text(r`A number plus its opposite is always 0: $7 + (-7) = 0$. This "zero pair" idea explains the different-signs rule. In $-12 + 5$, five of the negative units cancel the five positive ones, leaving seven negative units.`),
    example(r`Evaluate $-8 - 3 + 15 - (-4)$`, [
      [r`-8 + (-3) + 15 + 4`, "Rewrite each subtraction as adding the opposite."],
      [r`-11 + 15 + 4`, "Same signs: −8 and −3 combine to −11."],
      [r`4 + 4 = 8`, "Different signs: 15 − 11 = 4, positive because 15 is larger. Then add 4."],
    ], "Group the positives (15 + 4 = 19) and the negatives (−8 − 3 = −11), then combine: 19 − 11 = 8. Same answer."),
    example(r`A submarine at $-120$ m rises 45 m and then dives 70 m. Where is it?`, [
      [r`-120 + 45 + (-70)`, "Rising is positive, diving is negative."],
      [r`-75 + (-70)`, "−120 + 45: different signs, 120 − 45 = 75, keep the negative sign."],
      [r`-145`, "Same signs: add 75 and 70 and keep the negative sign."],
    ], "The submarine ends deeper than it started, which makes sense because it dove more than it rose."),
    callout("warning", "Two signs in a row", r`In $4 - (-6)$ the first sign is the operation and the second belongs to the number. Rewrite before you compute: $4 + 6 = 10$. Writing $4 - 6$ by mistake gives $-2$.`),
    callout("application", "Where this shows up", r`Banks track deposits as positive and withdrawals as negative. A balance of 35 dollars followed by a 60-dollar purchase is $35 + (-60) = -25$, an overdraft of 25 dollars.`),
    activity("number-line", { title: "Experiment with subtraction", params: { a: -3, b: -6, op: "subtract" } }),
    callout("tip", "Try this", r`Keep the start at $-3$. Compare subtracting 6 with adding $-6$, then subtracting $-6$ with adding 6. Which pairs give the same arrow?`, "experiment"),
  ],
  questions: [
    num(1, r`Evaluate $-9 + (-6)$.`, -15, {}, ["Same signs: add the absolute values and keep the sign."], r`$9 + 6 = 15$, and both are negative, so $-15$.`),
    num(1, r`Evaluate $-14 + 9$.`, -5, {}, ["Different signs: subtract the absolute values.", "Which number has the larger absolute value?"], r`$14 - 9 = 5$. $-14$ has the larger absolute value, so the sum is $-5$.`),
    num(1, r`Evaluate $7 - 12$.`, -5, {}, [r`Rewrite as $7 + (-12)$.`], r`$7 + (-12) = -5$.`),
    num(2, r`Evaluate $-5 - (-13)$.`, 8, {}, ["Subtracting a negative is adding a positive."], r`$-5 + 13 = 8$.`),
    num(2, r`Evaluate $-20 - 7 + 11$.`, -16, {}, [r`$-20 - 7 = -27$.`], r`$-20 + (-7) = -27$, then $-27 + 11 = -16$.`),
    mc(2, r`Which expression has the same value as $-4 - 9$?`, [r`$-4 + 9$`, r`$4 + 9$`, r`$-4 + (-9)$`, r`$4 - 9$`], 2,
      ["Subtraction means adding the opposite of the second number."], r`$-4 - 9 = -4 + (-9) = -13$.`),
    num(2, r`The temperature was $-6^\circ$C at midnight and dropped $8^\circ$ by 4 a.m. What was the temperature at 4 a.m.?`, -14, { unit: "°C" },
      ["A drop means adding a negative."], r`$-6 + (-8) = -14^\circ$C.`),
    num(3, r`A hiker starts 35 m below the rim of a canyon ($-35$), climbs down 80 m, then climbs up 52 m. What is the hiker's final position relative to the rim?`, -63, { unit: "m" },
      ["Down is negative, up is positive.", r`Compute $-35 + (-80) + 52$.`], r`$-35 - 80 = -115$, then $-115 + 52 = -63$ m, 63 m below the rim.`),
    short(3, r`Find the missing number: $-7 - \square = 3$.`, ["-10"], [r`Subtracting $\square$ is adding $-\square$. What do you add to $-7$ to get 3?`], r`$-7 + 10 = 3$, so $-\square = 10$ and $\square = -10$. Check: $-7 - (-10) = 3$.`, "review"),
    num(2, r`Evaluate $|-8 + 3| - |-8| + |3|$.`, 0, {}, [r`$-8 + 3 = -5$, so the first term is 5.`], r`$|-5| - 8 + 3 = 5 - 8 + 3 = 0$.`, "review"),
  ],
});
