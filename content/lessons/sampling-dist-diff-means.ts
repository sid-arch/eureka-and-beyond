import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sampling-dist-diff-means",
  title: "Sampling distributions for differences in sample means",
  summary: "Describe the sampling distribution of x̄₁ − x̄₂ for independent samples, compute its standard deviation by adding variances, and find probabilities.",
  minutes: 25,
  objectives: [
    "State the mean μ₁ − μ₂ of x̄₁ − x̄₂.",
    "Compute its standard deviation √(σ₁²/n₁ + σ₂²/n₂).",
    "Check normality for both groups and compute probabilities.",
  ],
  concepts: [
    { slug: "sampling-distributions", name: "Sampling distributions", description: "The distribution of a statistic's values over all possible samples of the same size.", subject: "subj_math" },
  ],
  blocks: [
    def("The distribution", r`For independent random samples: mean $\mu_1 - \mu_2$; standard deviation $\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}$; normal if both populations are normal, approximately normal if both $n_1$ and $n_2$ are at least 30.`),
    example(r`Brand A batteries: $\mu = 40$ h, $\sigma = 6$; brand B: $\mu = 38$ h, $\sigma = 8$. Samples of 36 A and 64 B.`, [
      [r`\text{mean} = 2`, ""],
      [r`\text{SD} = \sqrt{\tfrac{36}{36} + \tfrac{64}{64}} = \sqrt{2} \approx 1.41`, ""],
      [r`P(\bar{x}_A - \bar{x}_B < 0) = P(Z < -1.41) \approx 0.079`, "About an 8% chance the B sample averages longer."],
    ]),
    callout("application", "Where this shows up", r`Before running a study, researchers use this distribution to see how likely they are to detect a real difference in means with the sample sizes they can afford.`),
  ],
  questions: [
    num(1, r`$\mu_1 = 75$, $\mu_2 = 70$. Find the mean of $\bar{x}_1 - \bar{x}_2$.`, 5, {}, [], r`$75 - 70 = 5$.`),
    num(2, r`$\sigma_1 = 10$, $n_1 = 25$, $\sigma_2 = 12$, $n_2 = 36$. Find the SD of $\bar{x}_1 - \bar{x}_2$ to two decimal places.`, 2.83, { tolerance: 0.01 }, [], r`$\sqrt{4 + 4} = \sqrt{8} \approx 2.83$.`),
    mc(2, r`Both populations are skewed, with $n_1 = 50$ and $n_2 = 12$. Is $\bar{x}_1 - \bar{x}_2$ approximately normal?`, ["Yes", "Not necessarily: n₂ is small and that population is skewed", "Only if μ₁ = μ₂", "Always"], 1, [], r`Both samples need to be large (or their populations normal).`),
    mc(3, r`Why is the SD of the difference larger than either group's SD of $\bar{x}$?`, ["Rounding", "Variability from both independent samples adds", "Because μ₁ > μ₂", "It isn't"], 1, [], r`Variances add.`, "review"),
  ],
});
