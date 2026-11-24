import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "geometric-distributions",
  title: "Geometric distributions",
  summary: "Model the number of trials until the first success, compute geometric probabilities, and find the mean number of trials.",
  minutes: 25,
  objectives: [
    "Recognize geometric settings: independent trials with the same p, counting trials until the first success.",
    "Compute P(X = k) = (1 − p)^(k − 1)·p and P(X > k) = (1 − p)^k.",
    "Interpret the mean 1/p.",
  ],
  concepts: [
    { slug: "random-variables", name: "Random variables", description: "Numerical outcomes of random processes, described by probability distributions with a mean and standard deviation.", subject: "subj_math" },
  ],
  blocks: [
    def("Geometric setting", r`Independent trials, each a success or failure with the same probability $p$; $X$ counts the trials up to and including the first success. Possible values: 1, 2, 3, …`),
    def("Formulas", r`$P(X = k) = (1 - p)^{k - 1}p$; $P(X > k) = (1 - p)^k$ (the first $k$ trials all fail); $\mu_X = \frac{1}{p}$; $\sigma_X = \frac{\sqrt{1 - p}}{p}$.`),
    example(r`Roll a fair die until a 6 appears. Find $P(\text{first 6 on roll 3})$ and the mean.`, [
      [r`\left(\tfrac{5}{6}\right)^2 \cdot \tfrac{1}{6} = \tfrac{25}{216} \approx 0.116`, ""],
      [r`\mu = \frac{1}{1/6} = 6 \text{ rolls}`, "On average it takes 6 rolls."],
    ]),
    callout("tip", "The distribution is always skewed right", r`$P(X = 1) = p$ is the most likely single value, and each later probability is $(1 - p)$ times the one before.`),
    callout("application", "Where this shows up", r`Sales calls until the first sale, attempts until a network connection succeeds, and screenings until finding a matching donor are geometric.`),
  ],
  questions: [
    num(1, r`$p = 0.2$. Find $P(X = 2)$.`, 0.16, { tolerance: 0.001 }, [], r`$0.8 \cdot 0.2 = 0.16$.`),
    num(1, r`$p = 0.25$. Find the mean number of trials to the first success.`, 4, {}, [], r`$\frac{1}{0.25} = 4$.`),
    num(2, r`Flip a fair coin until heads. Find $P(\text{more than 3 flips are needed})$.`, 0.125, { tolerance: 0.001 }, [], r`$0.5^3 = 0.125$.`),
    mc(3, r`Which is a geometric setting?`, ["Number of heads in 10 flips", "Number of cards drawn without replacement until an ace, from one deck", "Number of free throws until the first miss, for a 70% shooter with independent shots", "Number of girls in a family of 4"], 2, [], r`Independent trials, constant $p$ = 0.3 of a miss, counting to the first "success."`, "review"),
  ],
});
