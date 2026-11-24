import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "scatter-plots-lines-of-fit",
  title: "Scatter plots and lines of fit",
  summary: "Describe the direction, form and strength of a relationship in a scatter plot, fit and write a line, interpret the correlation coefficient, and separate correlation from causation.",
  minutes: 30,
  objectives: [
    "Describe a scatter plot by direction, form and strength, and identify outliers.",
    "Draw a line of fit, write its equation from two points, and use it to make predictions.",
    "Interpret the correlation coefficient r and explain why correlation does not imply causation.",
  ],
  concepts: [
    { slug: "scatter-plots", name: "Scatter plots", description: "Graphs of paired numerical data used to look for relationships.", subject: "subj_math" },
    { slug: "correlation", name: "Correlation", description: "The direction and strength of a linear relationship, measured by r between −1 and 1.", subject: "subj_math" },
  ],
  formulas: ["slope", "point-slope-form"],
  blocks: [
    def("Scatter plot", r`A graph of paired data $(x, y)$, one point per individual. It shows whether two quantities are related.`),
    text(r`Describe a scatter plot by its direction (positive: $y$ tends to rise as $x$ rises; negative: $y$ tends to fall), its form (linear, curved or no pattern), and its strength (how tightly the points cluster around a line or curve). Note any outliers, points far from the overall pattern.`),
    def("Line of fit", r`A line that follows the trend of the points, with about as many points above it as below it. A least-squares regression line, computed by calculators and software, is the line that makes the sum of the squared vertical distances to the points as small as possible.`),
    example(r`Hours studied vs test score: a line of fit passes through (1, 62) and (6, 92). Write it and predict the score for 4 hours.`, [
      [r`m = \frac{92 - 62}{6 - 1} = 6`, "About 6 more points per extra hour."],
      [r`y - 62 = 6(x - 1) \Rightarrow y = 6x + 56`, ""],
      [r`y(4) = 6(4) + 56 = 80`, "Predicted score: about 80."],
    ], "The intercept 56 predicts the score with no studying. That is reasonable only if 0 hours is within or near the data."),
    def("Correlation coefficient r", r`A number from $-1$ to $1$ that measures the direction and strength of a linear relationship. $r$ near $1$: strong positive. $r$ near $-1$: strong negative. $r$ near 0: weak or no linear relationship.`),
    callout("warning", "Correlation is not causation", r`Ice-cream sales and drownings are positively correlated, but ice cream doesn't cause drowning. Both rise in hot weather, a lurking variable. Only a controlled experiment can show that one variable causes changes in another.`),
    callout("warning", "Extrapolation is risky", r`Predicting far outside the range of the data, such as a score for 20 hours of studying ($6 \cdot 20 + 56 = 176$ out of 100), can give nonsense. The trend may not continue.`),
    callout("note", "Residuals", r`A residual is actual minus predicted: $y - \hat{y}$. A student who studied 4 hours and scored 85 has residual $85 - 80 = 5$, doing better than the line predicts. Residuals that show a pattern suggest a line isn't the right model.`),
    callout("application", "Where this shows up", r`Doctors relate height to weight, economists relate income to spending, and scientists relate temperature to chirp rates of crickets. A line of fit turns a cloud of data into a usable prediction rule.`),
  ],
  questions: [
    mc(1, r`As the outside temperature rises, heating costs fall. What kind of correlation is this?`, ["Positive", "Negative", "None", "Causation"], 1,
      ["One variable goes up as the other goes down."], r`Negative correlation.`),
    mc(2, r`Which value of r shows the strongest linear relationship?`, ["0.65", "−0.92", "0.08", "−0.40"], 1,
      ["Strength depends on how close |r| is to 1."], r`$|-0.92| = 0.92$ is closest to 1.`),
    num(2, r`A line of fit is $y = 2.5x + 10$, where x is months and y is plant height in cm. Predict the height at 8 months.`, 30, { unit: "cm" }, ["Substitute x = 8."], r`$2.5(8) + 10 = 30$ cm.`),
    num(2, r`A line of fit passes through (2, 15) and (10, 55). What is its slope?`, 5, {}, ["Rise over run."], r`$\frac{55 - 15}{10 - 2} = \frac{40}{8} = 5$.`),
    num(2, r`Using $y = 2.5x + 10$, a plant at 6 months measured 28 cm. What is the residual?`, 3, { unit: "cm" }, ["Predicted value: 2.5 · 6 + 10.", "Residual = actual − predicted."], r`Predicted 25 cm, so the residual is $28 - 25 = 3$ cm.`),
    mc(3, r`Cities with more firefighters tend to have more fires. What's the best explanation?`, ["Firefighters cause fires", "Fires cause firefighters to be hired, so the relationship is causal", "A lurking variable such as city size affects both", "The correlation must be a mistake"], 2,
      ["What makes a city have more of both?"], r`Bigger cities have both more fires and more firefighters. City size is a lurking variable.`, "review"),
    mc(3, r`Data were collected for cars aged 1 to 8 years. Which use of the line of fit is least reliable?`, ["Predicting value at 3 years", "Predicting value at 7.5 years", "Predicting value at 25 years", "Predicting value at 5 years"], 2,
      ["Which input is far outside the data?"], r`25 years is far beyond the data (extrapolation), so the prediction is unreliable and could even be negative.`, "review"),
  ],
});
