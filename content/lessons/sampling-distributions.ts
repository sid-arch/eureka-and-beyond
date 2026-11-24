import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sampling-distributions",
  title: "Sampling distributions",
  summary: "Understand that statistics vary from sample to sample, and describe the sampling distributions of a sample proportion and a sample mean, including the Central Limit Theorem.",
  minutes: 30,
  objectives: [
    "Distinguish a parameter from a statistic.",
    "Describe the center, spread and shape of the sampling distribution of p̂ and of x̄.",
    "Explain how sample size affects variability, and state the Central Limit Theorem.",
  ],
  concepts: [
    { slug: "sampling-distributions", name: "Sampling distributions", description: "The distribution of a statistic's values over all possible samples of the same size.", subject: "subj_math" },
  ],
  blocks: [
    def("Parameter and statistic", r`A parameter describes a population (such as $p$ or $\mu$) and is usually unknown. A statistic describes a sample (such as $\hat{p}$ or $\bar{x}$) and varies from sample to sample.`),
    def("Sampling distribution", r`The distribution of a statistic's values over all possible random samples of the same size.`),
    def("Sample proportion", r`Mean $p$ (unbiased), standard deviation $\sqrt{\frac{p(1 - p)}{n}}$ (when the sample is under 10% of the population), approximately normal when $np \ge 10$ and $n(1 - p) \ge 10$.`),
    def("Sample mean", r`Mean $\mu$, standard deviation $\frac{\sigma}{\sqrt{n}}$. Central Limit Theorem: for large $n$ (often $n \ge 30$), $\bar{x}$ is approximately normal whatever the population's shape.`),
    example(r`60% of a city's voters support a measure. Describe $\hat{p}$ for random samples of 100.`, [
      [r`\text{center: } 0.6`, ""],
      [r`\text{SD: } \sqrt{\tfrac{0.6 \cdot 0.4}{100}} \approx 0.049`, ""],
      [r`np = 60,\ n(1 - p) = 40 \Rightarrow \text{approximately normal}`, "About 95% of samples give p̂ between 0.50 and 0.70."],
    ]),
    activity("dice-simulation", { title: "Statistics settle down as n grows" }),
    callout("tip", "Size matters, as a square root", r`To halve the standard deviation of a statistic, you need four times the sample size.`, "experiment"),
    callout("application", "Where this shows up", r`Every poll's margin of error comes from the sampling distribution of $\hat{p}$; quality engineers chart sample means because the CLT makes them nearly normal.`),
  ],
  questions: [
    mc(1, r`The average height of all U.S. adults is a…`, ["statistic", "parameter", "sample", "sampling distribution"], 1, [], r`It describes the whole population.`),
    num(2, r`A population has $\sigma = 12$. Find the standard deviation of $\bar{x}$ for samples of size 36.`, 2, {}, [], r`$\frac{12}{\sqrt{36}} = 2$.`),
    mc(2, r`Sample size goes from 100 to 400. The standard deviation of $\hat{p}$…`, ["doubles", "halves", "is divided by 4", "doesn't change"], 1, [], r`Multiplying $n$ by 4 divides the SD by $\sqrt{4} = 2$.`),
    mc(3, r`A population is strongly skewed right. For samples of size 50, the distribution of $\bar{x}$ is…`, ["strongly skewed right", "approximately normal", "uniform", "skewed left"], 1, [], r`By the Central Limit Theorem.`, "review"),
  ],
});
