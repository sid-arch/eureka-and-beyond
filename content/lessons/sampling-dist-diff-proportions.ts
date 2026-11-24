import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sampling-dist-diff-proportions",
  title: "Sampling distributions for differences in sample proportions",
  summary: "Describe the sampling distribution of p̂₁ − p̂₂ from independent samples: its center, its standard deviation from adding variances, and when it is approximately normal.",
  minutes: 25,
  objectives: [
    "State the mean of p̂₁ − p̂₂.",
    "Compute its standard deviation √(p₁(1 − p₁)/n₁ + p₂(1 − p₂)/n₂).",
    "Check the Large Counts condition in both groups and find probabilities.",
  ],
  concepts: [
    { slug: "sampling-distributions", name: "Sampling distributions", description: "The distribution of a statistic's values over all possible samples of the same size.", subject: "subj_math" },
  ],
  blocks: [
    def("The distribution", r`For independent random samples: mean $p_1 - p_2$; standard deviation $\sqrt{\frac{p_1(1 - p_1)}{n_1} + \frac{p_2(1 - p_2)}{n_2}}$ (variances add); approximately normal if $n_1p_1$, $n_1(1 - p_1)$, $n_2p_2$, $n_2(1 - p_2)$ are all at least 10.`),
    example(r`60% of city A residents and 50% of city B residents support a plan. Random samples: 100 from A, 150 from B.`, [
      [r`\text{mean} = 0.6 - 0.5 = 0.1`, ""],
      [r`\text{SD} = \sqrt{\tfrac{0.24}{100} + \tfrac{0.25}{150}} = \sqrt{0.004067} \approx 0.0638`, ""],
      [r`P(\hat{p}_A - \hat{p}_B < 0) = P\left(Z < \tfrac{-0.1}{0.0638}\right) = P(Z < -1.57) \approx 0.058`, "About a 6% chance the samples show B ahead."],
    ]),
    callout("application", "Where this shows up", r`Comparing two polls, two treatment groups or two web designs always involves a difference of proportions and its variability.`),
  ],
  questions: [
    num(1, r`$p_1 = 0.7$, $p_2 = 0.55$. Find the mean of $\hat{p}_1 - \hat{p}_2$.`, 0.15, { tolerance: 0.001 }, [], r`$0.7 - 0.55 = 0.15$.`),
    num(2, r`$p_1 = p_2 = 0.5$, $n_1 = n_2 = 100$. Find the SD of $\hat{p}_1 - \hat{p}_2$ to four decimal places.`, 0.0707, { tolerance: 0.0002 }, [], r`$\sqrt{0.0025 + 0.0025} = \sqrt{0.005} \approx 0.0707$.`),
    mc(2, r`Why do the variances add for a difference?`, ["Because p₁ > p₂", "Because the samples are independent, and both sources of variability remain", "They don't", "Because n is large"], 1, [], r`The variance of a difference of independent variables is the sum of variances.`),
    mc(3, r`$n_1 = 40$, $p_1 = 0.1$; $n_2 = 200$, $p_2 = 0.3$. Is the normal model reasonable?`, ["Yes", "No: n₁p₁ = 4 < 10", "No: n₂p₂ < 10", "Only if p₁ = p₂"], 1, [], r`One group fails the Large Counts condition.`, "review"),
  ],
});
