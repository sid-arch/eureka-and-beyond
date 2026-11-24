import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sampling-distribution-means",
  title: "Sampling distributions for sample means",
  summary: "Describe the sampling distribution of x̄ (mean μ, standard deviation σ/√n, shape normal or approximately normal by the CLT) and use it to find probabilities about sample means.",
  minutes: 25,
  objectives: [
    "State the mean and standard deviation of x̄ and the 10% condition.",
    "Decide whether x̄ is normal, approximately normal or neither.",
    "Compute probabilities about x̄ with z-scores.",
  ],
  concepts: [
    { slug: "sampling-distributions", name: "Sampling distributions", description: "The distribution of a statistic's values over all possible samples of the same size.", subject: "subj_math" },
  ],
  formulas: ["z-score"],
  blocks: [
    def("Sampling distribution of x̄", r`Mean $\mu_{\bar{x}} = \mu$; standard deviation $\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}$ when $n \le 10\%$ of the population. Shape: normal if the population is normal; approximately normal if $n \ge 30$ (CLT).`),
    example(r`Adult men's heights are normal with $\mu = 170$ cm and $\sigma = 10$ cm. Find $P(\bar{x} > 173)$ for 25 men.`, [
      [r`\sigma_{\bar{x}} = \frac{10}{5} = 2`, ""],
      [r`z = \frac{173 - 170}{2} = 1.5`, ""],
      [r`P(Z > 1.5) \approx 0.067`, "Compare: one man taller than 173 cm has probability about 0.38."],
    ]),
    callout("tip", "Individuals vs averages", r`Averages vary less than individuals. A single value 3 cm above average is common; a sample mean 3 cm above average is unusual.`),
    callout("application", "Where this shows up", r`Elevator capacity limits are set using the distribution of the mean weight of a group of riders.`),
  ],
  questions: [
    num(1, r`$\sigma = 20$, $n = 100$. Find $\sigma_{\bar{x}}$.`, 2, {}, [], r`$\frac{20}{10} = 2$.`),
    num(2, r`$\mu = 50$, $\sigma = 8$, $n = 16$, population normal. Find $P(\bar{x} < 47)$ to three decimal places.`, 0.067, { tolerance: 0.002 }, [r`$\sigma_{\bar{x}} = 2$.`], r`$z = -1.5$, $P \approx 0.067$.`),
    mc(2, r`A population is skewed and $n = 10$. The sampling distribution of $\bar{x}$ is…`, ["normal", "approximately normal", "not necessarily normal", "uniform"], 2, [], r`Neither the population is normal nor $n \ge 30$.`),
    mc(3, r`To cut $\sigma_{\bar{x}}$ to one third, multiply the sample size by…`, ["3", "6", "9", "1/3"], 2, [], r`$\sqrt{9} = 3$.`, "review"),
  ],
});
