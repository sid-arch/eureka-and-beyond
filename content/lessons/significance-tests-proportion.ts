import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "significance-tests-proportion",
  title: "Significance tests for a proportion",
  summary: "Carry out a one-sample z test for a proportion: state hypotheses, check conditions, compute the test statistic and P-value, and conclude in context.",
  minutes: 30,
  objectives: [
    "Check conditions using the null value p₀.",
    "Compute z = (p̂ − p₀)/√(p₀(1 − p₀)/n) and a one- or two-sided P-value.",
    "State a conclusion in context.",
  ],
  concepts: [
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  formulas: ["z-score"],
  blocks: [
    def("Test statistic", r`$z = \frac{\hat{p} - p_0}{\sqrt{p_0(1 - p_0)/n}}$. Use $p_0$, not $\hat{p}$, in the standard deviation, because the test assumes $H_0$ is true. Large Counts: $np_0 \ge 10$ and $n(1 - p_0) \ge 10$.`),
    def("Four steps", r`State: hypotheses, $\alpha$, parameter. Plan: name the test, check conditions. Do: compute $z$ and the P-value. Conclude: compare with $\alpha$, in context.`),
    example(r`A school claims 30% of students bike to school. In a random sample of 200, 72 bike. Test at $\alpha = 0.05$.`, [
      [r`H_0: p = 0.3,\ H_a: p \ne 0.3`, "Two-sided: any difference."],
      [r`200(0.3) = 60 \ge 10,\ 200(0.7) = 140 \ge 10`, "Large Counts met; Random given."],
      [r`\hat{p} = 0.36,\ z = \frac{0.06}{\sqrt{0.21/200}} = \frac{0.06}{0.0324} \approx 1.85`, ""],
      [r`\text{P-value} = 2P(Z \ge 1.85) \approx 0.064`, ""],
      [r`0.064 > 0.05 \Rightarrow \text{fail to reject } H_0`, "Not convincing evidence the true proportion differs from 30%."],
    ]),
    callout("tip", "Tests and intervals agree", r`A two-sided test at $\alpha = 0.05$ and a 95% confidence interval usually tell the same story: if $p_0$ is inside the interval, you'd fail to reject.`),
    callout("application", "Where this shows up", r`Election officials test whether a sample of audited ballots matches the reported vote share; manufacturers test whether a defect rate exceeds a contract limit.`),
  ],
  questions: [
    num(2, r`$H_0: p = 0.4$, $n = 150$, $\hat{p} = 0.48$. Find $z$.`, 2, { tolerance: 0.01 }, [r`$\sqrt{0.4 \cdot 0.6/150} = 0.04$.`], r`$\frac{0.08}{0.04} = 2$.`),
    num(2, r`For $H_a: p > p_0$ and $z = 2$, find the P-value to four decimal places.`, 0.0228, { tolerance: 0.0002 }, [], r`$P(Z \ge 2) \approx 0.0228$.`),
    mc(2, r`Why is $p_0$ used in the standard deviation of the test statistic?`, ["It's always larger", "The P-value is computed assuming H₀ is true", "p̂ is unknown", "It makes z positive"], 1, [], r`Everything in the calculation assumes the null value.`),
    mc(3, r`A two-sided test of $H_0: p = 0.5$ gives P-value 0.03. A 95% confidence interval from the same data would…`, ["contain 0.5", "not contain 0.5", "be centered at 0.5", "be impossible to compute"], 1, [], r`Rejecting at 0.05 matches 0.5 lying outside the 95% interval.`, "review"),
  ],
});
