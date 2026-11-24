import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "combining-random-variables",
  title: "Combining random variables",
  summary: "Find the mean and standard deviation of linear transformations aX + b, and of sums and differences of independent random variables, where variances add.",
  minutes: 30,
  objectives: [
    "Find the mean and standard deviation of a + bX.",
    "Find the mean of X ± Y for any random variables.",
    "Find the standard deviation of X ± Y for independent random variables by adding variances.",
  ],
  concepts: [
    { slug: "random-variables", name: "Random variables", description: "Numerical outcomes of random processes, described by probability distributions with a mean and standard deviation.", subject: "subj_math" },
  ],
  formulas: ["expected-value"],
  blocks: [
    def("Linear transformations", r`For $Y = a + bX$: $\mu_Y = a + b\mu_X$ and $\sigma_Y = |b|\sigma_X$. Adding a constant shifts the center but not the spread.`),
    def("Sums and differences", r`$\mu_{X \pm Y} = \mu_X \pm \mu_Y$ always. If $X$ and $Y$ are independent, $\sigma^2_{X \pm Y} = \sigma_X^2 + \sigma_Y^2$: variances add, even for a difference.`),
    example(r`Shower time $X$: mean 8 min, SD 2 min. Dressing time $Y$: mean 5 min, SD 1.5 min, independent.`, [
      [r`\mu_{X + Y} = 13 \text{ min}`, ""],
      [r`\sigma_{X + Y} = \sqrt{2^2 + 1.5^2} = \sqrt{6.25} = 2.5 \text{ min}`, "Add variances, not standard deviations."],
    ]),
    example(r`Temperatures in °C have mean 20 and SD 5. Convert to °F with $F = 1.8C + 32$.`, [
      [r`\mu_F = 1.8(20) + 32 = 68`, ""],
      [r`\sigma_F = 1.8(5) = 9`, ""],
    ]),
    callout("warning", "Why differences add variance", r`Subtracting one random quantity from another doesn't cancel uncertainty; both sources of variation remain. The variance of $X - Y$ is the same as that of $X + Y$ when they're independent.`),
    callout("application", "Where this shows up", r`Engineers stack part tolerances this way: the total length of several parts has a standard deviation equal to the square root of the summed variances.`),
  ],
  questions: [
    num(2, r`$X$ and $Y$ are independent with $\sigma_X = 3$ and $\sigma_Y = 4$. Find $\sigma_{X - Y}$.`, 5, {}, [], r`$\sqrt{9 + 16} = 5$.`),
    num(1, r`$\mu_X = 10$, $\mu_Y = 4$. Find $\mu_{X - Y}$.`, 6, {}, [], r`$10 - 4 = 6$.`),
    num(2, r`$\sigma_X = 6$. Find the standard deviation of $Y = 50 - 2X$.`, 12, {}, [], r`$|-2| \cdot 6 = 12$.`),
    mc(3, r`Three independent boxes each weigh mean 10 kg, SD 1 kg. The SD of the total weight is…`, ["3 kg", r`$\sqrt{3} \approx 1.73$ kg`, "1 kg", "9 kg"], 1, [], r`Variances add: $1 + 1 + 1 = 3$, so $\sigma = \sqrt{3}$.`, "review"),
  ],
});
