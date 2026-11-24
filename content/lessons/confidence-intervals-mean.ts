import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "confidence-intervals-mean",
  title: "Confidence intervals for a mean",
  summary: "Construct and interpret a t interval for a population mean, use t distributions with n − 1 degrees of freedom, and check the conditions.",
  minutes: 30,
  objectives: [
    "Explain why we use t* instead of z* when σ is unknown.",
    "Compute x̄ ± t*·s/√n with n − 1 degrees of freedom.",
    "Check the Random, 10% and Normal/Large Sample conditions.",
  ],
  concepts: [
    { slug: "confidence-intervals", name: "Confidence intervals", description: "Intervals of plausible values for a population parameter, built from sample data with a stated confidence level.", subject: "subj_math" },
  ],
  blocks: [
    def("t distributions", r`When we estimate $\sigma$ with the sample SD $s$, the standardized statistic follows a $t$ distribution with $n - 1$ degrees of freedom. It's bell-shaped like the normal but with heavier tails, so $t^* > z^*$; as $n$ grows it approaches the normal.`),
    def("The interval", r`$\bar{x} \pm t^*\frac{s}{\sqrt{n}}$. Conditions: Random; $n \le 10\%$ of the population; and the population is approximately normal, or $n \ge 30$, or the sample shows no strong skew or outliers.`),
    example(r`A random sample of 16 batteries lasts a mean of 52 hours with $s = 8$. Build a 95% interval.`, [
      [r`df = 15,\ t^* = 2.131`, "From a t table or technology."],
      [r`SE = \frac{8}{\sqrt{16}} = 2`, ""],
      [r`52 \pm 2.131(2) = 52 \pm 4.26`, ""],
      [r`(47.7,\ 56.3) \text{ hours}`, "We are 95% confident the true mean battery life is in this interval."],
    ]),
    callout("tip", "Width depends on three things", r`Larger confidence → wider. Larger $s$ → wider. Larger $n$ → narrower (by a factor of $\sqrt{n}$).`),
    callout("application", "Where this shows up", r`Manufacturers estimate mean product lifetimes, and researchers report mean blood pressure changes, with t intervals.`),
  ],
  questions: [
    num(1, r`Find the standard error $\frac{s}{\sqrt{n}}$ for $s = 10$ and $n = 25$.`, 2, {}, [], r`$\frac{10}{5} = 2$.`),
    mc(2, r`For the same confidence level, $t^*$ with 5 degrees of freedom is…`, [r`smaller than $z^*$`, r`larger than $z^*$`, r`equal to $z^*$`, "negative"], 1, [], r`Heavier tails mean larger critical values.`),
    num(2, r`A 95% t interval uses $t^* = 2.064$, $\bar{x} = 30$ and $SE = 1.5$. Find the upper bound to two decimal places.`, 33.1, { tolerance: 0.01 }, [], r`$30 + 2.064(1.5) = 33.096 \approx 33.10$.`),
    mc(3, r`A sample of 12 has a strongly skewed dot plot with an outlier. Is a t interval appropriate?`, ["Yes, always", "No: the Normal/Large Sample condition isn't met", "Yes, because n < 30", "Only at 99% confidence"], 1, [], r`With a small sample, strong skew and outliers make the t procedure unreliable.`, "review"),
  ],
});
