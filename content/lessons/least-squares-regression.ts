import { callout, def, example, formula, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "least-squares-regression",
  title: "Least-squares regression lines",
  summary: "Find the least-squares regression line from summary statistics or data, interpret its slope and intercept in context, and use it to predict.",
  minutes: 30,
  objectives: [
    "Explain what 'least squares' means.",
    "Compute b = r·s_y/s_x and a = ȳ − b·x̄.",
    "Interpret slope and y-intercept in context, and avoid extrapolation.",
  ],
  concepts: [
    { slug: "regression", name: "Linear regression", description: "Fitting the least-squares line ŷ = a + bx to predict a response variable from an explanatory variable.", subject: "subj_math" },
    { slug: "correlation", name: "Correlation", description: "A number r between −1 and 1 measuring the direction and strength of a linear relationship between two quantitative variables.", subject: "subj_math" },
  ],
  formulas: ["least-squares-line"],
  blocks: [
    def("Least squares", r`Of all lines, the least-squares regression line makes the sum of squared vertical distances (residuals) from the points to the line as small as possible. It's written $\hat{y} = a + bx$, where $\hat{y}$ is the predicted response.`),
    formula(r`b = r\frac{s_y}{s_x}, \qquad a = \bar{y} - b\bar{x}`, "Slope and intercept from summary statistics", "The line always passes through the point (x̄, ȳ)."),
    example(r`Data $x$: 1, 2, 3, 4, 5 and $y$: 2, 4, 5, 4, 5 (from the correlation lesson)`, [
      [r`b = \frac{\sum (x - \bar{x})(y - \bar{y})}{\sum (x - \bar{x})^2} = \frac{6}{10} = 0.6`, "Same as r · s_y / s_x."],
      [r`a = 4 - 0.6(3) = 2.2`, ""],
      [r`\hat{y} = 2.2 + 0.6x`, ""],
    ]),
    example(r`Interpret a model $\widehat{\text{price}} = 15{,}000 + 120(\text{square meters})$`, [
      [r`b = 120`, "Predicted price rises by 120 dollars for each extra square meter, on average."],
      [r`a = 15{,}000`, "Predicted price of a 0 m² home: not meaningful (extrapolation)."],
    ]),
    callout("warning", "Extrapolation", r`Predicting far outside the range of the $x$ data is unreliable; the linear pattern may not continue.`),
    callout("application", "Where this shows up", r`Regression is how analysts estimate the effect of one variable on another: price per square meter, calories burned per minute, or yield per unit of fertilizer.`),
  ],
  questions: [
    num(2, r`$r = 0.8$, $s_x = 2$, $s_y = 5$. Find the slope $b$.`, 2, {}, [], r`$0.8 \cdot \frac{5}{2} = 2$.`),
    num(2, r`With that slope, $\bar{x} = 10$ and $\bar{y} = 30$, find the intercept $a$.`, 10, {}, [], r`$30 - 2(10) = 10$.`),
    num(2, r`Predict $y$ at $x = 12$ using $\hat{y} = 10 + 2x$.`, 34, {}, [], r`$10 + 24 = 34$.`),
    mc(3, r`In $\widehat{\text{score}} = 52 + 4.5(\text{hours studied})$, the slope means…`, ["Each student scores 4.5", "Predicted score rises 4.5 points per additional hour studied", "Score rises 52 points per hour", "Studying causes 4.5 more points"], 1, [], r`Slope is the predicted change in $y$ per unit increase in $x$; it describes an association, not proven causation.`, "review"),
  ],
});
