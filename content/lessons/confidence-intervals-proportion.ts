import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "confidence-intervals-proportion",
  title: "Confidence intervals for a proportion",
  summary: "Construct and interpret a confidence interval for a population proportion, check its conditions, and explain what the confidence level means.",
  minutes: 30,
  objectives: [
    "Check the Random, 10% and Large Counts conditions.",
    "Compute p̂ ± z*√(p̂(1 − p̂)/n).",
    "Interpret the interval and the confidence level correctly.",
  ],
  concepts: [
    { slug: "confidence-intervals", name: "Confidence intervals", description: "Intervals of plausible values for a population parameter, built from sample data with a stated confidence level.", subject: "subj_math" },
  ],
  formulas: ["proportion-interval"],
  blocks: [
    def("The interval", r`$\hat{p} \pm z^*\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$, where $z^* = 1.645$, $1.96$ or $2.576$ for 90%, 95% or 99% confidence. The second term is the margin of error.`),
    def("Conditions", r`Random: the data come from a random sample. 10%: $n$ is at most 10% of the population. Large Counts: $n\hat{p} \ge 10$ and $n(1 - \hat{p}) \ge 10$.`),
    example(r`In a random sample of 500 voters, 270 support a measure. Build a 95% interval.`, [
      [r`\hat{p} = 0.54;\ 500(0.54) = 270 \ge 10,\ 500(0.46) = 230 \ge 10`, "Conditions met (assuming many more than 5,000 voters)."],
      [r`SE = \sqrt{\tfrac{0.54 \cdot 0.46}{500}} \approx 0.0223`, ""],
      [r`0.54 \pm 1.96(0.0223) = 0.54 \pm 0.044`, ""],
      [r`(0.496,\ 0.584)`, ""],
    ], r`Interpretation: we are 95% confident that between 49.6% and 58.4% of all voters support the measure. Since the interval includes values below 50%, a majority isn't certain.`),
    callout("warning", "What 95% confidence means", r`If we took many random samples and built an interval from each, about 95% of those intervals would capture the true $p$. It does not mean there's a 95% probability that $p$ is in this particular interval.`),
    callout("application", "Where this shows up", r`Election polls, product defect rates and vaccination coverage surveys report confidence intervals, often as "± 3 percentage points."`),
  ],
  questions: [
    num(1, r`Find the 95% margin of error for $\hat{p} = 0.5$ and $n = 400$, to three decimal places.`, 0.049, { tolerance: 0.001 }, [], r`$1.96\sqrt{\frac{0.25}{400}} = 1.96(0.025) = 0.049$.`),
    num(2, r`Find the lower bound of a 90% interval for $\hat{p} = 0.3$, $n = 100$, to three decimal places.`, 0.225, { tolerance: 0.002 }, [r`$SE = \sqrt{0.21/100} \approx 0.0458$.`], r`$0.3 - 1.645(0.0458) \approx 0.3 - 0.075 = 0.225$.`),
    mc(2, r`Going from 95% to 99% confidence with the same data makes the interval…`, ["narrower", "wider", "the same width", "centered elsewhere"], 1, [], r`A larger $z^*$ means a larger margin of error.`),
    mc(2, r`A sample of 40 finds 3 successes. Which condition fails?`, ["Random", "10%", "Large Counts", "None"], 2, [], r`$n\hat{p} = 3 < 10$.`),
    mc(3, r`A 95% interval for the proportion of students who walk to school is (0.12, 0.20). Which interpretation is correct?`, ["95% of students walk", "There's a 95% chance p is between 0.12 and 0.20", "We are 95% confident the true proportion of students who walk is between 0.12 and 0.20", "95% of samples have p̂ between 0.12 and 0.20"], 2, [], r`Confidence is about the method's long-run success rate.`, "review"),
  ],
});
