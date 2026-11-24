import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "normal-distribution",
  title: "The normal distribution",
  summary: "Describe bell-shaped distributions with a mean and standard deviation, standardize values with z-scores, and find probabilities.",
  minutes: 35,
  objectives: [
    "Describe the shape, center and spread of a normal distribution.",
    "Apply the empirical (68–95–99.7) rule.",
    "Compute and interpret z-scores.",
    "Find the proportion of a normal distribution in an interval.",
  ],
  concepts: [
    { slug: "normal-distribution", name: "Normal distribution", description: "A symmetric, bell-shaped probability distribution described by its mean and standard deviation.", subject: "subj_math" },
    { slug: "z-scores", name: "z-scores", description: "The number of standard deviations a value lies from the mean.", subject: "subj_math" },
  ],
  formulas: ["z-score"],
  blocks: [
    text(r`Many measurements cluster around an average with fewer and fewer values further away: heights of adults, errors in repeated measurements, scores on large standardized tests. When a histogram of such data is smooth and symmetric, a normal curve models it well.`),
    def("Normal distribution", r`A continuous distribution with a symmetric bell-shaped density curve, written $N(\mu, \sigma)$. The mean $\mu$ sets the center (which is also the median and mode) and the standard deviation $\sigma > 0$ sets the spread.`),
    text(r`Probability is area under the density curve. The total area is 1, so the area between two values is the proportion of the distribution, or the probability that a randomly chosen value falls, between them.`),
    callout("note", "The empirical rule", r`In any normal distribution about 68% of values are within $1\sigma$ of the mean, about 95% within $2\sigma$, and about 99.7% within $3\sigma$.`),
    formula(r`z = \frac{x - \mu}{\sigma}`, "Standardizing", r`A z-score converts any normal distribution to the standard normal $N(0, 1)$, so one table or calculator function works for all of them.`),
    example(r`SAT-style scores follow $N(500, 100)$. What proportion score above 650?`, [
      [r`z = \frac{650 - 500}{100} = 1.5`, "650 is 1.5 standard deviations above the mean."],
      [r`P(Z < 1.5) \approx 0.9332`, "From a standard normal table or calculator."],
      [r`P(Z > 1.5) \approx 1 - 0.9332 = 0.0668`, "The area to the right is 1 minus the area to the left."],
    ], r`About 6.7% score above 650. That's a little less than the 16% above $1\sigma$, which makes sense since 650 is further out.`),
    example(r`Heights of a population are $N(170, 8)$ cm. What proportion are between 162 and 186 cm?`, [
      [r`z_1 = \frac{162 - 170}{8} = -1,\quad z_2 = \frac{186 - 170}{8} = 2`, "Standardize both endpoints."],
      [r`P(-1 < Z < 2) = 0.9772 - 0.1587`, "Subtract the left areas."],
      [r`\approx 0.8186`, "About 82%."],
    ]),
    callout("warning", "Check before you assume normal", r`Not every distribution is normal. Incomes and waiting times are usually skewed right. Look at a histogram or normal probability plot before using these methods.`),
    activity("normal-distribution", { title: "Shade an interval" }),
    callout("tip", "Investigate", r`Set the interval to $\mu \pm \sigma$ and change $\sigma$. Does the shaded probability change? Why not? Then find the interval centered at $\mu$ that holds 95%.`, "experiment"),
    activity("normal-distribution", {
      title: "Walkthrough: the empirical rule",
      steps: [
        { title: "One standard deviation", body: "Between μ − σ and μ + σ lies about 68% of the area.", params: { mu: 0, sigma: 1, lo: -1, hi: 1 } },
        { title: "Two", body: "Within two standard deviations: about 95%.", params: { mu: 0, sigma: 1, lo: -2, hi: 2 } },
        { title: "Three", body: "Within three: about 99.7%. Values beyond 3σ are rare.", params: { mu: 0, sigma: 1, lo: -3, hi: 3 } },
        { title: "Any normal curve", body: "The same percentages hold for N(100, 15): 85 to 115 contains about 68%.", params: { mu: 100, sigma: 15, lo: 85, hi: 115 } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`A value of 74 comes from $N(60, 7)$. What is its z-score?`, 2, {}, [r`$z = \frac{x - \mu}{\sigma}$.`], r`$z = \frac{74 - 60}{7} = 2$.`),
    mc(1, r`About what percent of a normal distribution lies within 2 standard deviations of the mean?`, ["50%", "68%", "95%", "99.7%"], 2, ["Recall the empirical rule."], r`About 95% lies within $\mu \pm 2\sigma$.`),
    num(2, r`Test scores are $N(75, 10)$. Using the empirical rule, about what percent score above 85?`, 16, { tolerance: 0.5, unit: "%" },
      ["85 is one standard deviation above the mean.", "68% are within 1σ, so 32% are outside, split evenly between the tails."], r`$(100\% - 68\%) / 2 = 16\%$.`),
    num(2, r`For $N(500, 100)$, find $P(X < 380)$ to three decimals.`, 0.115, { tolerance: 0.002 }, [r`$z = \frac{380 - 500}{100} = -1.2$.`], r`$P(Z < -1.2) \approx 0.1151$.`),
    num(3, r`Lightbulb lifetimes are $N(1200, 150)$ hours. What lifetime marks the top 10%? Round to the nearest hour.`, 1392, { tolerance: 2, unit: "h" },
      [r`Find $z$ with 90% of the area to its left: $z \approx 1.2816$.`, r`Then $x = \mu + z\sigma$.`], r`$x = 1200 + 1.2816(150) \approx 1392$ hours.`, "review"),
  ],
});
