import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "expected-value-random-variables",
  title: "Expected value and spread of a random variable",
  summary: "Describe discrete random variables with probability distributions, and compute and interpret their mean (expected value) and standard deviation.",
  minutes: 30,
  objectives: [
    "Write a valid probability distribution for a discrete random variable.",
    "Compute and interpret the expected value μ_X.",
    "Compute and interpret the standard deviation σ_X.",
  ],
  concepts: [
    { slug: "random-variables", name: "Random variables", description: "Numerical outcomes of random processes, described by probability distributions with a mean and standard deviation.", subject: "subj_math" },
  ],
  formulas: ["expected-value"],
  blocks: [
    def("Random variable", r`A random variable $X$ takes numerical values that describe the outcomes of a random process. A discrete random variable has a list of possible values, each with a probability; the probabilities are between 0 and 1 and add to 1.`),
    def("Expected value", r`$\mu_X = \sum x_i p_i$: the long-run average of $X$ over many repetitions. It need not be a possible value of $X$.`),
    example(r`A 5-dollar raffle ticket wins 100 dollars with probability 0.02 and 20 dollars with probability 0.05. What is the expected net gain?`, [
      [r`E(\text{prize}) = 100(0.02) + 20(0.05) + 0(0.93) = 3`, ""],
      [r`E(\text{net}) = 3 - 5 = -2`, "On average a buyer loses 2 dollars per ticket."],
    ]),
    example(r`$X$ = number of heads in 2 coin flips: values 0, 1, 2 with probabilities 0.25, 0.5, 0.25`, [
      [r`\mu_X = 0 + 0.5 + 0.5 = 1`, ""],
      [r`\sigma_X^2 = (0 - 1)^2(0.25) + 0 + (2 - 1)^2(0.25) = 0.5`, ""],
      [r`\sigma_X = \sqrt{0.5} \approx 0.707`, "Typical distance from the mean of 1 head."],
    ]),
    callout("application", "Where this shows up", r`Insurance premiums and casino games are priced from expected values: the insurer's expected payout per policy is less than the premium, which is how the business stays solvent.`),
  ],
  questions: [
    num(1, r`$X$ takes values 1, 2, 3 with probabilities 0.2, 0.5, 0.3. Find $\mu_X$.`, 2.1, { tolerance: 0.001 }, [], r`$0.2 + 1.0 + 0.9 = 2.1$.`),
    num(2, r`$X$ takes values 0 and 10, each with probability 0.5. Find $\sigma_X$.`, 5, { tolerance: 0.001 }, [r`$\mu_X = 5$.`], r`$\sigma_X^2 = 25(0.5) + 25(0.5) = 25$, $\sigma_X = 5$.`),
    mc(2, r`Which is a valid probability distribution?`, ["0.3, 0.3, 0.3", "0.5, 0.6, −0.1", "0.2, 0.3, 0.5", "0.4, 0.4, 0.4"], 2, [], r`Probabilities must be between 0 and 1 and sum to 1.`),
    num(3, r`A game costs 2 dollars. You win 10 dollars with probability 0.15, otherwise nothing. What is your expected net gain per game, in dollars?`, -0.5, { tolerance: 0.001, unit: "dollars" }, [], r`$10(0.15) - 2 = -0.5$.`, "review"),
  ],
});
