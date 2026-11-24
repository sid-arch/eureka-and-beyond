import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "justifying-claims-intervals",
  title: "Justifying a claim based on a confidence interval",
  summary: "Use a confidence interval to evaluate a claim about a parameter, explain how confidence level and sample size affect width, and choose a sample size for a desired margin of error.",
  minutes: 25,
  objectives: [
    "Decide whether a claimed value is plausible using an interval.",
    "Explain the effects of confidence level and sample size on the margin of error.",
    "Find the sample size needed for a target margin of error.",
  ],
  concepts: [
    { slug: "confidence-intervals", name: "Confidence intervals", description: "Intervals of plausible values for a population parameter, built from sample data with a stated confidence level.", subject: "subj_math" },
  ],
  formulas: ["proportion-interval"],
  blocks: [
    def("Plausible values", r`Values inside a confidence interval are plausible for the parameter; values outside are not. An interval entirely above 0.5 gives convincing evidence of a majority.`),
    example(r`A 95% interval for the proportion supporting a measure is (0.48, 0.56). Is there convincing evidence of majority support?`, [
      [r`0.5 \text{ is inside the interval}`, ""],
      [r`\text{no convincing evidence of a majority}`, "But values above 0.5 are also plausible: the data don't rule majority support out either."],
    ]),
    def("Choosing n", r`For a margin of error $ME$: $n \ge \left(\frac{z^*}{ME}\right)^2 p^*(1 - p^*)$. Use $p^* = 0.5$ when you have no prior estimate; it gives the largest (safest) $n$. Always round up.`),
    example(r`What sample size gives a 95% margin of error of 3 percentage points?`, [
      [r`n \ge \left(\tfrac{1.96}{0.03}\right)^2(0.25) \approx 1067.1`, ""],
      [r`n = 1068`, "Round up."],
    ]),
    callout("application", "Where this shows up", r`National polls of about 1,000 people report margins near ±3 points, exactly this calculation.`),
  ],
  questions: [
    mc(1, r`A 95% interval for $p$ is (0.31, 0.39). Is $p = 0.4$ plausible?`, ["Yes", "No", "Only at 90%", "Can't tell"], 1, [], r`0.4 is outside the interval.`),
    num(2, r`What sample size gives a 95% margin of error of 0.05 with $p^* = 0.5$?`, 385, {}, [r`$\left(\frac{1.96}{0.05}\right)^2(0.25) = 384.16$.`], r`Round up to 385.`),
    mc(2, r`Holding the confidence level fixed, quadrupling $n$ makes the margin of error…`, ["4 times larger", "half as large", "a quarter as large", "unchanged"], 1, [], r`ME is proportional to $1/\sqrt{n}$.`),
    mc(3, r`A company claims at most 5% of its products are defective. A 99% interval for the defect rate is (0.061, 0.094). What's the conclusion?`, ["The claim is supported", "Convincing evidence the defect rate exceeds 5%", "No evidence either way", "The interval is invalid"], 1, [], r`The whole interval lies above 0.05.`, "review"),
  ],
});
