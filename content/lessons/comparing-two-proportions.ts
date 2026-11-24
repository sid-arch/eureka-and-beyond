import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "comparing-two-proportions",
  title: "Comparing two proportions",
  summary: "Estimate and test the difference between two population proportions using independent random samples or a randomized experiment.",
  minutes: 30,
  objectives: [
    "Compute a confidence interval for p₁ − p₂.",
    "Carry out a two-sample z test using the pooled proportion.",
    "Interpret results in context, including whether 0 is a plausible difference.",
  ],
  concepts: [
    { slug: "confidence-intervals", name: "Confidence intervals", description: "Intervals of plausible values for a population parameter, built from sample data with a stated confidence level.", subject: "subj_math" },
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("Interval for p₁ − p₂", r`$(\hat{p}_1 - \hat{p}_2) \pm z^*\sqrt{\frac{\hat{p}_1(1 - \hat{p}_1)}{n_1} + \frac{\hat{p}_2(1 - \hat{p}_2)}{n_2}}$. Conditions: two independent random samples (or random assignment), 10% for each, and at least 10 successes and 10 failures in each group.`),
    def("Test of H₀: p₁ = p₂", r`Use the pooled proportion $\hat{p}_c = \frac{x_1 + x_2}{n_1 + n_2}$: $z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\hat{p}_c(1 - \hat{p}_c)\left(\frac{1}{n_1} + \frac{1}{n_2}\right)}}$.`),
    example(r`In a randomized experiment, 120 of 200 patients improved on a new drug and 90 of 200 on the standard drug. Build a 95% interval.`, [
      [r`\hat{p}_1 = 0.60,\ \hat{p}_2 = 0.45,\ \text{difference } 0.15`, ""],
      [r`SE = \sqrt{\tfrac{0.6 \cdot 0.4}{200} + \tfrac{0.45 \cdot 0.55}{200}} \approx 0.0494`, ""],
      [r`0.15 \pm 1.96(0.0494) = 0.15 \pm 0.097`, ""],
      [r`(0.053,\ 0.247)`, "0 isn't in the interval: convincing evidence the new drug's improvement rate is higher."],
    ]),
    callout("tip", "Why pool for the test?", r`The test assumes $H_0: p_1 = p_2$, so we combine both samples to estimate that one common proportion.`),
    callout("application", "Where this shows up", r`A/B tests compare click-through rates for two web page designs; vaccine trials compare infection rates between vaccine and placebo groups.`),
  ],
  questions: [
    num(1, r`Group 1: 60 of 200 succeed. Group 2: 50 of 200. Find $\hat{p}_1 - \hat{p}_2$.`, 0.05, { tolerance: 0.001 }, [], r`$0.30 - 0.25 = 0.05$.`),
    num(2, r`For those groups, find the pooled proportion $\hat{p}_c$.`, 0.275, { tolerance: 0.001 }, [], r`$\frac{110}{400} = 0.275$.`),
    mc(2, r`A 95% interval for $p_1 - p_2$ is $(-0.04, 0.10)$. What can you conclude?`, ["p₁ is definitely larger", "p₂ is definitely larger", "No convincing evidence of a difference; 0 is plausible", "The samples are biased"], 2, [], r`The interval contains 0.`),
    mc(3, r`Why can the drug example support a cause-and-effect conclusion?`, ["The samples were large", "Patients were randomly assigned to treatments", "The difference was positive", "It used a 95% level"], 1, [], r`Random assignment makes the groups comparable apart from the treatment.`, "review"),
  ],
});
