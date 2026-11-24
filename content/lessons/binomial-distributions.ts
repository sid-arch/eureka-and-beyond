import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "binomial-distributions",
  title: "Binomial distributions",
  summary: "Recognize binomial settings, compute binomial probabilities with the formula and complements, and find the mean and standard deviation of a binomial random variable.",
  minutes: 30,
  objectives: [
    "Check the binomial conditions: binary outcomes, independent trials, fixed number of trials, same probability of success.",
    "Compute P(X = k) and 'at least' probabilities.",
    "Compute and interpret μ = np and σ = √(np(1 − p)).",
  ],
  concepts: [
    { slug: "random-variables", name: "Random variables", description: "Numerical outcomes of random processes, described by probability distributions with a mean and standard deviation.", subject: "subj_math" },
  ],
  formulas: ["binomial-probability", "permutations-combinations"],
  blocks: [
    def("Binomial setting", r`$n$ independent trials, each a success or failure, with the same success probability $p$. $X$ = the number of successes. (Sampling without replacement is close enough to independent if the sample is less than 10% of the population.)`),
    def("Binomial probability", r`$P(X = k) = \binom{n}{k}p^k(1 - p)^{n - k}$. The $\binom{n}{k}$ counts the arrangements of $k$ successes among $n$ trials.`),
    example(r`A basketball player makes 30% of her 3-point shots. In 5 independent shots, find $P(X = 2)$.`, [
      [r`\binom{5}{2}(0.3)^2(0.7)^3 = 10 \cdot 0.09 \cdot 0.343`, ""],
      [r`= 0.3087`, ""],
      [r`\mu = 5(0.3) = 1.5,\ \sigma = \sqrt{5(0.3)(0.7)} \approx 1.02`, "On average 1.5 makes per 5 shots."],
    ]),
    callout("tip", "At least one", r`$P(X \ge 1) = 1 - P(X = 0) = 1 - (1 - p)^n$.`),
    callout("application", "Where this shows up", r`Quality control (defective items in a batch), clinical trials (patients who respond), and genetics (offspring with a trait) all use binomial models.`),
  ],
  questions: [
    num(1, r`Flip a fair coin 4 times. Find $P(\text{exactly 3 heads})$.`, 0.25, { tolerance: 0.001 }, [], r`$\binom{4}{3}(0.5)^4 = \frac{4}{16} = 0.25$.`),
    num(1, r`$n = 20$, $p = 0.1$. Find the mean number of successes.`, 2, {}, [], r`$np = 2$.`),
    num(2, r`Each of 3 independent parts is defective with probability 0.2. Find $P(\text{at least one defective})$.`, 0.488, { tolerance: 0.001 }, [], r`$1 - 0.8^3 = 1 - 0.512 = 0.488$.`),
    mc(2, r`Which is NOT a binomial setting?`, ["Counting heads in 10 coin flips", "Counting rolls until the first 6", "Counting correct guesses on 20 true/false questions", "Counting defective bulbs in a random sample of 15 from a large shipment"], 1, [], r`The number of trials isn't fixed: that's a geometric setting.`),
    num(3, r`$n = 100$, $p = 0.5$. Find $\sigma$.`, 5, { tolerance: 0.001 }, [], r`$\sqrt{100(0.5)(0.5)} = 5$.`, "review"),
  ],
});
