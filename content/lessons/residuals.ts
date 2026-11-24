import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "residuals",
  title: "Residuals",
  summary: "Compute and interpret residuals, read residual plots to judge whether a linear model is appropriate, and interpret r² and the standard deviation of the residuals.",
  minutes: 30,
  objectives: [
    "Compute residuals as actual minus predicted, and interpret their sign.",
    "Use a residual plot to judge whether a linear model fits.",
    "Interpret r² as the fraction of variation in y explained by the line.",
  ],
  concepts: [
    { slug: "regression", name: "Linear regression", description: "Fitting the least-squares line ŷ = a + bx to predict a response variable from an explanatory variable.", subject: "subj_math" },
  ],
  blocks: [
    def("Residual", r`$\text{residual} = y - \hat{y}$. Positive: the point is above the line (the model underpredicted). Negative: below the line. Least-squares residuals always sum to 0.`),
    example(r`For $\hat{y} = 2.2 + 0.6x$ with data $(1, 2), (2, 4), (3, 5), (4, 4), (5, 5)$`, [
      [r`\hat{y}: 2.8, 3.4, 4.0, 4.6, 5.2`, ""],
      [r`\text{residuals: } -0.8, 0.6, 1.0, -0.6, -0.2`, ""],
      [r`\text{sum} = 0`, "As always for least squares."],
    ]),
    def("Residual plots", r`Plot residuals against $x$. A random scatter around 0 means a line fits. A curved pattern means a curve fits better. A fan shape means predictions are less reliable for some $x$.`),
    def("r² and s", r`$r^2$ is the fraction of the variation in $y$ that is accounted for by the linear model. The standard deviation of the residuals, $s$, is the typical size of a prediction error.`),
    example(r`Interpret $r^2 = 0.6$ for the data above`, [
      [r`r = 0.775,\ r^2 \approx 0.60`, ""],
      [r`\text{about 60\% of the variation in } y \text{ is explained by the linear relationship with } x`, ""],
    ]),
    callout("application", "Where this shows up", r`Appraisers look at large positive residuals to spot homes priced high for their size; scientists check residual plots before trusting a model.`),
  ],
  questions: [
    num(1, r`A model predicts 140 and the actual value is 132. What is the residual?`, -8, {}, [], r`$132 - 140 = -8$.`),
    num(2, r`Using $\hat{y} = 2.2 + 0.6x$, find the residual for the point $(3, 5)$.`, 1, { tolerance: 0.001 }, [], r`$5 - 4.0 = 1.0$.`),
    mc(2, r`A residual plot shows a clear U-shaped curve. What does that mean?`, ["The line is a good fit", "A nonlinear model would fit better", "r is close to 1", "There are no outliers"], 1, [], r`Curved residuals mean the relationship is curved.`),
    num(3, r`If $r = -0.9$, what percent of the variation in $y$ is explained by the linear model?`, 81, { tolerance: 0.1, unit: "%" }, [], r`$r^2 = 0.81$.`, "review"),
  ],
});
