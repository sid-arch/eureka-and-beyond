import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "slope-t-test",
  title: "Carrying out a test for the slope of a regression model",
  summary: "Test whether there is a linear relationship between two quantitative variables in a population with t = b / SE_b and n − 2 degrees of freedom.",
  minutes: 30,
  objectives: [
    "State hypotheses H₀: β = 0 and an appropriate alternative.",
    "Compute t = (b − 0)/SE_b and its P-value, or read them from computer output.",
    "Conclude in context about the linear relationship.",
  ],
  concepts: [
    { slug: "regression", name: "Linear regression", description: "Fitting the least-squares line ŷ = a + bx to predict a response variable from an explanatory variable.", subject: "subj_math" },
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("The test", r`$H_0: \beta = 0$ (no linear relationship). $t = \frac{b - 0}{SE_b}$ with $df = n - 2$. Conditions are the same as for the interval (LINER).`),
    example(r`For the 12 used cars ($b = 2.4$, $SE_b = 0.8$), is there a linear relationship between age and price drop? $\alpha = 0.05$.`, [
      [r`H_0: \beta = 0,\ H_a: \beta \ne 0`, ""],
      [r`t = \frac{2.4}{0.8} = 3.0,\ df = 10`, ""],
      [r`\text{P-value} = 2P(t_{10} \ge 3.0) \approx 0.013`, ""],
      [r`\text{reject } H_0`, "Convincing evidence of a linear relationship between age and price for cars like these. The 95% interval (0.62, 4.18) agrees: it excludes 0."],
    ]),
    callout("tip", "Computer output", r`Most software reports $t$ and a two-sided P-value for $H_0: \beta = 0$ in the slope row. For a one-sided alternative, halve the P-value if $b$ is in the direction of $H_a$.`),
    callout("application", "Where this shows up", r`Scientists test whether a dose is linearly related to a response before using the slope to make predictions.`),
  ],
  questions: [
    num(1, r`$b = -1.2$, $SE_b = 0.4$. Find $t$.`, -3, {}, [], r`$\frac{-1.2}{0.4} = -3$.`),
    mc(2, r`Output shows a slope P-value of 0.25 for $H_a: \beta \ne 0$. The conclusion is…`, ["Reject H₀", "No convincing evidence of a linear relationship", "β = 0", "r = 0.25"], 1, [], r`Large P-value.`),
    mc(2, r`Output gives a two-sided P-value of 0.04, and $b > 0$. What is the P-value for $H_a: \beta > 0$?`, ["0.02", "0.04", "0.08", "0.96"], 0, [], r`Half of 0.04, since $b$ is positive.`),
    num(3, r`With $n = 16$, $t = 2.5$ for $H_a: \beta \ne 0$. How many degrees of freedom does the test use?`, 14, {}, [], r`$16 - 2 = 14$ (the P-value is about 0.025).`, "review"),
  ],
});
