import { activity, callout, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "interpreting-linear-models",
  title: "Interpreting linear models",
  summary: "Interpret the slope and intercept of a linear model in context with units, build models from descriptions, and judge when a linear model is reasonable.",
  minutes: 25,
  objectives: [
    "Interpret slope as a rate of change and the intercept as a starting value, with units.",
    "Write a linear model from a verbal description or two data points.",
    "Decide whether the intercept and predictions make sense in context and identify limits of the model.",
  ],
  concepts: [
    { slug: "linear-models", name: "Linear models", description: "Using y = mx + b to describe a quantity that changes at a constant rate.", subject: "subj_math" },
  ],
  formulas: ["slope-intercept-form"],
  blocks: [
    text(r`A linear model $y = mx + b$ says two things about a situation. The slope $m$ is the rate: how much $y$ changes for each 1-unit increase in $x$, in units of "$y$-units per $x$-unit." The intercept $b$ is the value of $y$ when $x = 0$, often a starting amount.`),
    example(r`A candle's height is $h = 24 - 1.5t$ cm after $t$ hours. Interpret the numbers.`, [
      [r`m = -1.5 \text{ cm per hour}`, "The candle gets 1.5 cm shorter each hour."],
      [r`b = 24 \text{ cm}`, "Its height when lit (t = 0)."],
      [r`0 = 24 - 1.5t \Rightarrow t = 16`, "The x-intercept: it burns out after 16 hours."],
    ], "A sensible domain is 0 ≤ t ≤ 16. The model says nothing about times after the candle is gone."),
    activity("linear-graph", { title: "Read slope and intercept as a story", params: { m: -1.5, b: 4 } }),
    callout("tip", "Try this", r`Imagine $y$ is dollars left on a transit card and $x$ is rides. Describe the line in words. Which slider changes the price per ride, and which changes the starting balance? Where does the card run out?`, "experiment"),
    example(r`A plumber charged 170 dollars for a 2-hour job and 290 dollars for a 5-hour job. Build and interpret a linear model.`, [
      [r`m = \frac{290 - 170}{5 - 2} = 40`, "40 dollars per hour of labor."],
      [r`C - 170 = 40(h - 2) \Rightarrow C = 40h + 90`, ""],
      [r`b = 90`, "A 90-dollar call-out fee before any work."],
    ]),
    callout("warning", "Intercepts that don't make sense", r`A model of adult height versus shoe size might give a "height" of 120 cm for shoe size 0. That intercept is just where the line crosses the axis; no one has shoe size 0. Say when an intercept has no real meaning.`),
    callout("warning", "Is linear the right model?", r`Linear models assume a constant rate. Population growth, cooling coffee and compound interest change at changing rates. If the differences in your data aren't roughly constant, try another model.`),
    callout("application", "Where this shows up", r`"The average US gas price rose 0.04 dollars per month this year" is a slope. Fitness apps estimate calories as a rate times minutes, and phone plans list a monthly fee (intercept) plus a per-gigabyte charge (slope).`),
  ],
  questions: [
    mc(1, r`In $C = 12n + 30$, $C$ is the cost in dollars of a party for $n$ guests. What does 12 mean?`, ["A 12-dollar fixed fee", "12 dollars per guest", "12 guests", "The total cost"], 1,
      ["The slope multiplies the number of guests."], r`Each additional guest adds 12 dollars.`),
    mc(1, r`In the same model, what does 30 mean?`, ["30 guests", "30 dollars per guest", "A 30-dollar cost even with no guests", "The maximum cost"], 2,
      ["What is C when n = 0?"], r`A fixed 30-dollar cost, such as a room fee.`),
    num(2, r`A tank holds $W = 800 - 25t$ liters after $t$ minutes of draining. How many minutes until it is empty?`, 32, { unit: "min" }, [r`Solve $800 - 25t = 0$.`], r`$t = 32$ minutes.`),
    num(2, r`A tree was 1.2 m tall when planted and grows 0.45 m per year. Using a linear model, how tall is it after 6 years?`, 3.9, { unit: "m" }, [r`$h = 1.2 + 0.45t$.`], r`$1.2 + 0.45(6) = 3.9$ m.`),
    num(2, r`A rideshare costs 11.50 dollars for 3 miles and 21.50 dollars for 7 miles. What is the cost per mile?`, 2.5, { unit: "dollars per mile" }, ["Slope between the two points."], r`$\frac{21.50 - 11.50}{7 - 3} = 2.50$ dollars per mile.`),
    num(3, r`For that rideshare, what is the base fare (the cost at 0 miles)?`, 4, { unit: "dollars" }, [r`$11.50 = 2.5(3) + b$.`], r`$b = 11.50 - 7.50 = 4$ dollars.`, "review"),
    mc(3, r`A model for a child's height is $h = 6.5a + 77$ cm for ages 2 to 10. What's wrong with using it to predict height at age 40?`, ["Nothing", "Children stop growing, so the constant rate doesn't continue", "The intercept is negative", "The slope should be negative"], 1,
      ["Does height increase at a steady rate forever?"], r`It predicts 337 cm at age 40. Growth stops in the late teens, so the linear trend can't be extended that far.`, "review"),
  ],
});
