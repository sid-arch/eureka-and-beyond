import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "random-variable-distributions",
  title: "Introduction to random variables and probability distributions",
  summary: "Describe discrete and continuous random variables with probability distributions, compute probabilities of events like X ≤ k, and read probabilities as areas under density curves.",
  minutes: 25,
  objectives: [
    "Write and check a discrete probability distribution.",
    "Compute probabilities of events such as P(X ≥ 2) and cumulative probabilities.",
    "Interpret probabilities for continuous random variables as areas.",
  ],
  concepts: [
    { slug: "random-variables", name: "Random variables", description: "Numerical outcomes of random processes, described by probability distributions with a mean and standard deviation.", subject: "subj_math" },
  ],
  blocks: [
    def("Discrete probability distribution", r`A list of the possible values of $X$ and their probabilities. Each probability is between 0 and 1 and they sum to 1. Display it with a probability histogram.`),
    example(r`$X$ = number of cars in a randomly chosen household: $P(0) = 0.10$, $P(1) = 0.35$, $P(2) = 0.40$, $P(3) = 0.15$`, [
      [r`0.10 + 0.35 + 0.40 + 0.15 = 1`, "Valid."],
      [r`P(X \ge 2) = 0.40 + 0.15 = 0.55`, ""],
      [r`P(X \le 1) = 0.45`, "Cumulative probability (the complement)."],
    ]),
    def("Continuous random variables", r`A continuous random variable takes values in an interval. Probabilities are areas under a density curve (total area 1), so $P(X = a) = 0$ for any single value.`),
    example(r`$X$ is uniform on $[0, 10]$. Find $P(2 < X < 5)$.`, [
      [r`\text{height} = \tfrac{1}{10},\ \text{width} = 3`, ""],
      [r`P = 0.3`, ""],
    ]),
    callout("application", "Where this shows up", r`Insurers model the number of claims per policy (discrete) and the size of a claim (continuous) with probability distributions.`),
  ],
  questions: [
    num(1, r`Using the car distribution, find $P(X = 1 \text{ or } X = 2)$.`, 0.75, { tolerance: 0.001 }, [], r`$0.35 + 0.40 = 0.75$.`),
    num(2, r`A distribution has $P(0) = 0.2$, $P(1) = 0.5$ and $P(2) = k$. Find $k$.`, 0.3, { tolerance: 0.001 }, [], r`$1 - 0.7 = 0.3$.`),
    num(2, r`$X$ is uniform on $[0, 4]$. Find $P(X > 3)$.`, 0.25, { tolerance: 0.001 }, [], r`$\frac{1}{4} \cdot 1 = 0.25$.`),
    mc(3, r`For a continuous random variable, $P(X \le 5)$ and $P(X < 5)$ are…`, ["different by P(X = 5) > 0", "equal", "always 0.5", "undefined"], 1, [], r`$P(X = 5) = 0$ for a continuous variable.`, "review"),
  ],
});
