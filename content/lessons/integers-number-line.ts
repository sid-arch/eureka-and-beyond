import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "integers-number-line",
  title: "Integers and the number line",
  summary: "Place positive and negative whole numbers on a number line, compare them, and find opposites and absolute values.",
  minutes: 20,
  objectives: [
    "Locate integers on a horizontal or vertical number line.",
    "Compare and order integers using < and >.",
    "Find the opposite and the absolute value of an integer and explain each as a distance or reflection.",
  ],
  concepts: [
    { slug: "integers", name: "Integers", description: "The whole numbers, their opposites and zero: …, −2, −1, 0, 1, 2, …", subject: "subj_math" },
    { slug: "absolute-value", name: "Absolute value", description: "The distance of a number from zero on the number line.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Many quantities have a direction as well as a size. A temperature can be 5 degrees above zero or 5 degrees below. A bank balance can be 40 dollars or 40 dollars overdrawn. An elevator can stop 3 floors above the lobby or 2 floors below it. Negative numbers let one number line describe both directions.`),
    def("Integers", r`The set $\{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$: the counting numbers, their opposites, and zero. Integers have no fractional or decimal part.`),
    text(r`On a horizontal number line, positive numbers are to the right of 0 and negative numbers are to the left. The further right a number is, the greater it is. That means $-2 > -7$: $-2$ is to the right of $-7$, even though 7 looks "bigger." Think of temperature: $-2^\circ$ is warmer than $-7^\circ$.`),
    def("Opposites", r`Two numbers the same distance from 0 on opposite sides, such as 6 and $-6$. The opposite of $a$ is written $-a$, so $-(-6) = 6$. The opposite of 0 is 0.`),
    def("Absolute value", r`The distance from a number to 0, written $|a|$. Distance is never negative, so $|6| = 6$, $|-6| = 6$ and $|0| = 0$.`),
    example(r`Order $3, -5, 0, -1, 4$ from least to greatest`, [
      [r`-5,\ -1`, "Negatives first. The one furthest left (−5) is least."],
      [r`-5 < -1 < 0`, "Zero is greater than every negative number."],
      [r`-5 < -1 < 0 < 3 < 4`, "Then the positives, smallest first."],
    ], "Read the list on a number line from left to right. Each number should sit to the right of the one before it."),
    example(r`Evaluate $-|-8| + |3|$`, [
      [r`|-8| = 8,\ |3| = 3`, "Find each absolute value first: they are distances from 0."],
      [r`-8 + 3`, "The negative sign outside the bars stays: it takes the opposite of 8."],
      [r`-5`, "Start at −8 and move 3 to the right."],
    ], r`A common slip is to think $-|-8|$ is 8. The bars give 8, and the sign in front makes it $-8$.`),
    callout("warning", "Absolute value is not 'make it positive'", r`$|a|$ is a distance, so it is never negative, but $-|a|$ is never positive. Keep track of what is inside the bars and what is outside.`),
    callout("application", "Where this shows up", r`Sea level is 0 on an elevation scale. Death Valley's lowest point is about $-86$ meters and Denver is about $+1609$ meters. Elevation, temperature, money and golf scores all use the same number line.`),
    activity("number-line", { title: "Move along the number line", params: { a: -4, b: 6, op: "add" } }),
    callout("tip", "Try this", r`Set the start to $-4$ and add 0. Now compare the readouts for $|\text{start}|$ and the start itself. Then try start $= 7$ and add $-14$. Where do you land, and how are 7 and the result related?`, "experiment"),
  ],
  questions: [
    mc(1, r`Which statement is true?`, [r`$-9 > -3$`, r`$-3 > -9$`, r`$0 < -1$`, r`$-4 > 2$`], 1,
      ["Picture each pair on a number line. The number further right is greater."],
      r`$-3$ is to the right of $-9$, so $-3 > -9$.`),
    num(1, r`What is $|-14|$?`, 14, {}, ["Absolute value is distance from 0."], r`$-14$ is 14 units from 0, so $|-14| = 14$.`),
    num(1, r`What is the opposite of $-25$?`, 25, {}, ["The opposite is the same distance from 0 on the other side."], r`$-(-25) = 25$.`),
    mc(2, r`Order from least to greatest: $-2,\ 5,\ -8,\ 0,\ -3$.`, [
      r`$-2, -3, -8, 0, 5$`, r`$-8, -3, -2, 0, 5$`, r`$0, -2, -3, 5, -8$`, r`$-8, -2, -3, 0, 5$`,
    ], 1, ["The most negative number is furthest left, so it is the least."], r`On the number line from left to right: $-8, -3, -2, 0, 5$.`),
    num(2, r`Evaluate $|-6| - |4|$.`, 2, {}, ["Find each absolute value, then subtract."], r`$6 - 4 = 2$.`),
    num(2, r`At 6 a.m. the temperature was $-11^\circ$F. At noon it was $4^\circ$F. How many degrees did it rise?`, 15, { unit: "°F" },
      ["Count the steps from −11 up to 0, then from 0 up to 4."], r`From $-11$ to 0 is 11 degrees and from 0 to 4 is 4 more: $11 + 4 = 15$ degrees.`),
    short(2, r`Name both integers that are 7 units from 0. Enter them separated by a comma, smaller first.`, ["-7,7"], ["There is one on each side of 0."], r`$-7$ and $7$ both have absolute value 7.`),
    num(3, r`Evaluate $-|{-5}| - (-|{-2}|)$.`, -3, {}, [r`$|-5| = 5$ and $|-2| = 2$, so this is $-5 - (-2)$.`, "Subtracting a negative is adding its opposite."],
      r`$-5 - (-2) = -5 + 2 = -3$.`, "review"),
    mc(2, r`If $|x| = 9$, which is true?`, [r`$x = 9$ only`, r`$x = -9$ only`, r`$x = 9$ or $x = -9$`, r`There is no such $x$`], 2,
      ["Which numbers are 9 units from 0?"], r`Both 9 and $-9$ are 9 units from 0, so $x = 9$ or $x = -9$.`, "review"),
  ],
});
