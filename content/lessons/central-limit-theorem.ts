import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "central-limit-theorem",
  title: "The Central Limit Theorem",
  summary: "See through simulation that sample means from any population become approximately normal as the sample size grows, and use the CLT to justify normal calculations for x̄.",
  minutes: 25,
  objectives: [
    "State the Central Limit Theorem.",
    "Explain how the shape of the population and the sample size affect the shape of the sampling distribution of x̄.",
    "Use the CLT (n ≥ 30 rule of thumb) to justify a normal model.",
  ],
  concepts: [
    { slug: "sampling-distributions", name: "Sampling distributions", description: "The distribution of a statistic's values over all possible samples of the same size.", subject: "subj_math" },
  ],
  blocks: [
    def("Central Limit Theorem", r`When $n$ is large, the sampling distribution of $\bar{x}$ is approximately normal, whatever the shape of the population, with mean $\mu$ and standard deviation $\frac{\sigma}{\sqrt{n}}$.`),
    def("How large is large?", r`If the population is normal, $\bar{x}$ is normal for any $n$. For moderately skewed populations, $n \ge 30$ is usually enough. Very strong skew or extreme outliers need larger samples.`),
    example(r`Wait times at a clinic are skewed right with $\mu = 20$ min and $\sigma = 15$ min. Find $P(\bar{x} > 23)$ for 36 random patients.`, [
      [r`n = 36 \ge 30 \Rightarrow \bar{x} \text{ approximately normal}`, "CLT."],
      [r`\sigma_{\bar{x}} = \frac{15}{6} = 2.5`, ""],
      [r`z = \frac{23 - 20}{2.5} = 1.2,\ P(Z > 1.2) \approx 0.115`, ""],
    ]),
    activity("dice-simulation", { title: "Averages of many rolls" }),
    callout("tip", "Try this", r`A single die roll is uniform, not bell-shaped. The average of many rolls clusters tightly around 3.5, the same mechanism the CLT describes.`, "experiment"),
    callout("warning", "The CLT is about x̄, not the data", r`Individual wait times stay skewed no matter how many you collect. It's the distribution of sample means that becomes normal.`),
    callout("application", "Where this shows up", r`Quality control charts plot sample means because the CLT makes them approximately normal even when individual measurements aren't.`),
  ],
  questions: [
    num(2, r`$\sigma = 12$, $n = 64$. Find $\sigma_{\bar{x}}$.`, 1.5, { tolerance: 0.001 }, [], r`$\frac{12}{8} = 1.5$.`),
    mc(2, r`A population is strongly skewed. As $n$ increases, the sampling distribution of $\bar{x}$ becomes…`, ["more skewed", "closer to normal", "uniform", "bimodal"], 1, [], r`The CLT.`),
    mc(2, r`If a population is normal, the sampling distribution of $\bar{x}$ for $n = 5$ is…`, ["normal", "skewed", "only approximately normal if n ≥ 30", "unknown"], 0, [], r`Means of normal data are exactly normal.`),
    num(3, r`For the clinic example (μ = 20, σ = 15, n = 36), find $P(\bar{x} < 15)$ to three decimal places.`, 0.023, { tolerance: 0.002 }, [r`$z = \frac{15 - 20}{2.5}$.`], r`$z = -2$, $P(Z < -2) \approx 0.023$.`, "review"),
  ],
});
