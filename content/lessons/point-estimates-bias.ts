import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "point-estimates-bias",
  title: "Biased and unbiased point estimates",
  summary: "Judge statistics as estimators by their bias (whether the sampling distribution is centered on the parameter) and their variability, and see how sample size affects each.",
  minutes: 20,
  objectives: [
    "Define an unbiased estimator.",
    "Compare estimators by bias and variability using simulated sampling distributions.",
    "Explain that larger samples reduce variability but not bias.",
  ],
  concepts: [
    { slug: "sampling-distributions", name: "Sampling distributions", description: "The distribution of a statistic's values over all possible samples of the same size.", subject: "subj_math" },
  ],
  blocks: [
    def("Unbiased estimator", r`A statistic is an unbiased estimator of a parameter if the mean of its sampling distribution equals the parameter. $\hat{p}$ is unbiased for $p$, $\bar{x}$ for $\mu$, and $s^2$ (dividing by $n - 1$) for $\sigma^2$.`),
    def("Variability", r`The spread of the sampling distribution. Larger random samples give less variability, which is why bigger samples give more precise estimates.`),
    example(r`Simulated sampling distributions of two estimators of a population maximum, 100`, [
      [r`\text{sample maximum: centered near 96}`, "Biased low: a sample can't exceed the population maximum and rarely contains it."],
      [r`\text{an adjusted estimator: centered at 100 but more spread out}`, "Unbiased but more variable."],
      [r`\text{best: low bias and low variability}`, "Sometimes a small bias is worth a big reduction in variability."],
    ]),
    callout("tip", "The target picture", r`Bias is like a rifle sighted off-center: shots cluster in the wrong place. Variability is like a shaky hand: shots scatter. You want both small.`),
    callout("application", "Where this shows up", r`Statisticians compare estimation methods by simulating thousands of samples and measuring each method's bias and variability before using it on real data.`),
  ],
  questions: [
    mc(1, r`An estimator's sampling distribution is centered exactly at the parameter. It is…`, ["biased", "unbiased", "always precise", "a parameter"], 1, [], r`That's the definition.`),
    mc(2, r`Increasing the sample size…`, ["reduces bias", "reduces variability", "reduces both always", "changes neither"], 1, [], r`Variability shrinks with $n$; bias from the method doesn't.`),
    mc(2, r`Why is the sample range a biased estimator of the population range?`, ["It's usually too large", "It's usually too small, since a sample rarely includes the extremes", "It's unbiased", "It depends on units"], 1, [], r`The sample can't spread wider than the population.`),
    mc(3, r`Estimator A: centered on the parameter, SD 5. Estimator B: centered 0.2 above, SD 1. Which is likely to give estimates closer to the truth?`, ["A", "B", "Same", "Can't tell"], 1, [], r`B's tiny bias is outweighed by its much lower variability.`, "review"),
  ],
});
