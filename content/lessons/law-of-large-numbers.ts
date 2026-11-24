import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "law-of-large-numbers",
  title: "Simulation and the law of large numbers",
  summary: "Estimate probabilities by simulation and see why relative frequencies settle down only over many trials.",
  minutes: 25,
  objectives: [
    "Distinguish theoretical probability from relative frequency.",
    "Use a simulation to estimate a probability.",
    "Explain what the law of large numbers does and does not say.",
  ],
  concepts: [{ slug: "probability", name: "Probability", description: "The long-run relative frequency with which an outcome of a random process occurs.", subject: "subj_math" }],
  blocks: [
    def("Probability", r`The proportion of times an outcome would occur in a very long series of repetitions of a random process. It is always between 0 and 1.`),
    def("Relative frequency", r`In an actual series of trials, the number of times an outcome happened divided by the number of trials.`),
    text(r`When two fair dice are rolled, there are 36 equally likely ordered outcomes. Six of them sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). So the theoretical probability of a sum of 7 is $\frac{6}{36} = \frac{1}{6} \approx 0.167$.`),
    text(r`Roll the dice ten times and you might see a 7 zero times or four times. Short runs are unpredictable. The law of large numbers says that as the number of trials grows, the relative frequency of an outcome gets closer and closer to its probability.`),
    callout("warning", "The gambler's fallacy", r`The law of large numbers does not mean outcomes "balance out" in the short run. After five rolls without a 7, the chance of a 7 on the next roll is still $\frac{1}{6}$. Dice have no memory; the early streak just becomes a smaller share of a growing total.`),
    example(r`Design a simulation for: "a basketball player who makes 70% of free throws takes 5 shots; how likely is she to make at least 4?"`, [
      [r`\text{digits } 0\text{–}6 = \text{make},\ 7\text{–}9 = \text{miss}`, "Assign random digits so each shot has a 70% chance."],
      [r`\text{one trial} = 5 \text{ random digits}`, "Count the makes in each group of five."],
      [r`\text{repeat many times}`, "The proportion of trials with 4 or 5 makes estimates the probability."],
    ], r`The exact binomial answer is $\binom{5}{4}(0.7)^4(0.3) + (0.7)^5 \approx 0.528$; a simulation with thousands of trials should land close to it.`),
    callout("application", "Where this shows up", r`Insurance companies can't predict whether one driver will crash, but across millions of policies the rate is very stable. That stability is the law of large numbers, and it's why insurance can be priced at all.`),
    activity("dice-simulation", { title: "Roll two dice thousands of times" }),
    callout("tip", "Investigate", r`Reset and roll 10 times, then 100, then 10,000. Write down the relative frequency of a sum of 7 each time. How far is each from $\frac{1}{6}$? Which sums are least common, and why?`, "experiment"),
  ],
  questions: [
    num(1, r`Two fair dice are rolled. What is the probability that the sum is 8? Give a decimal to three places.`, 0.139, { tolerance: 0.001 },
      ["Count the ordered pairs that add to 8."], r`(2,6), (3,5), (4,4), (5,3), (6,2): 5 of 36, so $\frac{5}{36} \approx 0.139$.`),
    mc(1, r`A coin lands heads 7 times in 10 flips. What does the law of large numbers predict about the next 10,000 flips?`, [
      "Tails will come up more often to make up for it.",
      "The proportion of heads will likely be close to 0.5.",
      "Heads will continue at about 70%.",
      "Nothing can be said.",
    ], 1, ["Each flip is independent."], r`Over many flips the relative frequency approaches the probability, 0.5. There is no "catching up"; the first 10 flips just matter less and less.`),
    num(2, r`In a simulation, an event happened 412 times in 2,500 trials. What is the relative frequency?`, 0.1648, { tolerance: 0.0001 }, ["Divide the count by the number of trials."], r`$\frac{412}{2500} = 0.1648$.`),
    mc(2, r`Which sum of two dice is most likely?`, ["2", "6", "7", "12"], 2, ["Which sum can be made in the most ways?"], r`7 can be made 6 ways, more than any other sum.`),
    num(3, r`A spinner lands on red with probability 0.3. In 400 spins, about how many reds would you expect?`, 120, {}, ["Expected count = n · p."], r`$400 \times 0.3 = 120$.`, "review"),
  ],
});
