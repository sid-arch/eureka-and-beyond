import { activity, callout, def, example, formula, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "z-scores-percentiles",
  title: "z-scores and percentiles",
  summary: "Measure relative standing with percentiles and z-scores, compare values from different distributions, and use the empirical rule.",
  minutes: 25,
  objectives: [
    "Find and interpret the percentile of a value.",
    "Compute and interpret z-scores, and convert a z-score back to a value.",
    "Use z-scores to compare values from different distributions.",
  ],
  concepts: [
    { slug: "z-scores", name: "z-scores", description: "The number of standard deviations a value is above or below the mean.", subject: "subj_math" },
  ],
  formulas: ["z-score"],
  blocks: [
    def("Percentile", r`The $p$th percentile is the value with $p\%$ of the data at or below it. Being at the 90th percentile means scoring as well as or better than 90% of the group.`),
    formula(r`z = \frac{x - \mu}{\sigma} \qquad x = \mu + z\sigma`, "Standardizing and un-standardizing"),
    example(r`Ana scores 85 on a test with mean 75 and SD 5. Ben scores 90 on a test with mean 80 and SD 8. Who did better relative to their class?`, [
      [r`z_A = \frac{85 - 75}{5} = 2`, ""],
      [r`z_B = \frac{90 - 80}{8} = 1.25`, ""],
      [r`\text{Ana did better relative to her class}`, "Her score is farther above average in SD units."],
    ]),
    def("Empirical rule", r`In an approximately normal distribution, about 68%, 95% and 99.7% of values lie within 1, 2 and 3 standard deviations of the mean. So $z = 1$ is near the 84th percentile, and $z = -2$ near the 2.5th.`),
    activity("normal-distribution", { title: "From z-scores to percentiles" }),
    callout("application", "Where this shows up", r`Pediatric growth charts report a child's height as a percentile; standardized tests report scaled scores and percentiles so results compare across years.`),
  ],
  questions: [
    num(1, r`Find the z-score of 62 when $\mu = 70$ and $\sigma = 4$.`, -2, {}, [], r`$\frac{62 - 70}{4} = -2$.`),
    num(2, r`IQ scores have mean 100 and SD 15. What score has $z = 1.5$?`, 122.5, { tolerance: 0.01 }, [], r`$100 + 1.5(15) = 122.5$.`),
    num(2, r`In an approximately normal distribution, about what percent of values lie below $z = -1$?`, 16, { tolerance: 0.5, unit: "%" }, ["68% lie within 1 SD; split the rest."], r`$(100 - 68)/2 = 16\%$.`),
    mc(2, r`A runner's time is at the 30th percentile of race times. That means…`, ["70% of runners were faster than her", "30% of runners had times at or below hers", "She was 30% faster than average", "She finished 30th"], 1, [], r`Percentile counts the share at or below the value. (For race times, lower is faster, so 30% of runners were at least as fast.)`),
    mc(3, r`A value has $z = 0$. It equals…`, ["the median", "the mean", "zero", "the standard deviation"], 1, [], r`$x = \mu + 0 \cdot \sigma = \mu$.`, "review"),
  ],
});
