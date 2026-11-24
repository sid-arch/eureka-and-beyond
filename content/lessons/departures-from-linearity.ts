import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "departures-from-linearity",
  title: "Analyzing departures from linearity",
  summary: "Identify outliers, high-leverage points and influential points in regression, and transform data with logarithms or powers to straighten curved relationships.",
  minutes: 30,
  objectives: [
    "Distinguish outliers, high-leverage points and influential points.",
    "Describe how an influential point changes the slope, intercept and r.",
    "Use log and power transformations to linearize data, then back-transform predictions.",
  ],
  concepts: [
    { slug: "regression", name: "Linear regression", description: "Fitting the least-squares line ŷ = a + bx to predict a response variable from an explanatory variable.", subject: "subj_math" },
  ],
  blocks: [
    def("Unusual points", r`An outlier in regression has a large residual. A high-leverage point has an $x$-value far from $\bar{x}$. A point is influential if removing it substantially changes the slope, intercept or correlation; high-leverage points are often influential.`),
    example(r`10 points with $r = 0.2$; adding one point far to the right and high makes $r = 0.8$`, [
      [r`\text{the new point is high-leverage and influential}`, "One point manufactured most of the correlation."],
      [r`\text{report results with and without it}`, ""],
    ]),
    def("Transformations", r`If $y$ grows exponentially in $x$, then $\ln y$ is linear in $x$. If $y$ follows a power model $y = ax^p$, then $\ln y$ is linear in $\ln x$. Fit a line to the transformed data, check its residual plot, then undo the transformation to predict.`),
    example(r`A fitted model is $\widehat{\ln y} = 1.2 + 0.3x$. Predict $y$ at $x = 4$.`, [
      [r`\widehat{\ln y} = 1.2 + 1.2 = 2.4`, ""],
      [r`\hat{y} = e^{2.4} \approx 11.0`, "Back-transform."],
    ]),
    callout("application", "Where this shows up", r`Biologists fit power models (metabolism vs body mass) on log-log scales; epidemiologists fit early outbreak data on a log scale.`),
  ],
  questions: [
    mc(1, r`A point with an unusually large residual is…`, ["high-leverage", "an outlier", "always influential", "the mean"], 1, [], r`Outliers in regression are far from the line vertically.`),
    mc(2, r`Which point is most likely to be influential?`, ["One near the middle of the x-values, on the line", "One with an extreme x-value that doesn't follow the pattern", "One with a small residual near x̄", "The point (x̄, ȳ)"], 1, [], r`High leverage plus not following the pattern pulls the line.`),
    num(2, r`A model is $\widehat{\ln y} = 0.5 + 0.2x$. Predict $y$ at $x = 5$, to two decimal places.`, 4.48, { tolerance: 0.01 }, [], r`$\widehat{\ln y} = 1.5$, so $\hat{y} = e^{1.5} \approx 4.48$.`),
    mc(3, r`A scatterplot of $\ln y$ against $x$ is linear. Which model fits $y$ and $x$?`, ["Linear", "Exponential", "Power", "Logarithmic"], 1, [], r`$\ln y = a + bx$ means $y = e^a(e^b)^x$.`, "review"),
  ],
});
