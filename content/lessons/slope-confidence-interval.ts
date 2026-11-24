import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "slope-confidence-interval",
  title: "Confidence intervals for the slope of a regression model",
  summary: "Construct and interpret a t interval for the true slope β of a population regression line, using b ± t*·SE_b with n − 2 degrees of freedom, and check the LINER conditions.",
  minutes: 30,
  objectives: [
    "Distinguish the sample slope b from the population slope β.",
    "Check the conditions: Linear, Independent, Normal, Equal SD, Random.",
    "Compute and interpret b ± t*·SE_b with df = n − 2.",
  ],
  concepts: [
    { slug: "regression", name: "Linear regression", description: "Fitting the least-squares line ŷ = a + bx to predict a response variable from an explanatory variable.", subject: "subj_math" },
    { slug: "confidence-intervals", name: "Confidence intervals", description: "Intervals of plausible values for a population parameter, built from sample data with a stated confidence level.", subject: "subj_math" },
  ],
  formulas: ["least-squares-line"],
  blocks: [
    def("Model", r`The population regression line $\mu_y = \alpha + \beta x$ describes the mean response at each $x$. The sample slope $b$ estimates $\beta$, and varies from sample to sample with standard error $SE_b$ (from computer output).`),
    def("Conditions (LINER)", r`Linear: the residual plot shows no pattern. Independent: observations are independent (10% condition when sampling). Normal: responses vary normally about the line (check a histogram of residuals). Equal SD: the residual plot shows no fan shape. Random: random sample or random assignment.`),
    example(r`A random sample of 12 used cars: price drop vs age, $b = 2.4$ (thousand dollars lost per year), $SE_b = 0.8$. Build a 95% interval.`, [
      [r`df = 10,\ t^* = 2.228`, ""],
      [r`2.4 \pm 2.228(0.8) = 2.4 \pm 1.78`, ""],
      [r`(0.62,\ 4.18)`, "We are 95% confident the true mean price drop is between about 620 and 4,180 dollars per year of age."],
    ]),
    callout("tip", "Reading computer output", r`Regression output lists the slope in the row for the explanatory variable: 'Coef' is $b$ and 'SE Coef' is $SE_b$. The value labeled S is the residual standard deviation, not $SE_b$.`),
    callout("application", "Where this shows up", r`Economists report intervals for slopes such as the effect of an extra year of education on earnings.`),
  ],
  questions: [
    num(1, r`How many degrees of freedom for slope inference with $n = 20$?`, 18, {}, [], r`$n - 2 = 18$.`),
    num(2, r`$b = 1.5$, $SE_b = 0.5$, $t^* = 2.145$. Find the upper bound of the interval to three decimal places.`, 2.573, { tolerance: 0.001 }, [], r`$1.5 + 2.145(0.5) = 2.5725 \approx 2.573$.`),
    mc(2, r`A 95% interval for $\beta$ is (−0.3, 1.2). What does this suggest?`, ["Convincing evidence of a positive slope", "No convincing evidence of a linear relationship; 0 is plausible", "The slope is 0", "The interval is wrong"], 1, [], r`0 is inside the interval.`),
    mc(3, r`A residual plot shows a fan shape. Which condition is violated?`, ["Linear", "Independent", "Normal", "Equal SD"], 3, [], r`The spread of residuals changes with $x$.`, "review"),
  ],
});
