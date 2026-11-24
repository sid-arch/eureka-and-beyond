import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sample-spaces-probability",
  title: "Sample spaces and basic probability",
  summary: "List sample spaces with lists, tables and tree diagrams, compute theoretical and experimental probabilities, and use complements and the addition rule.",
  minutes: 25,
  objectives: [
    "Describe a sample space with a list, table or tree diagram, and use the counting principle.",
    "Compute theoretical and experimental probability and compare them.",
    "Use complements and the addition rule for 'or' events.",
  ],
  concepts: [
    { slug: "probability", name: "Probability", description: "A number from 0 to 1 measuring how likely an event is.", subject: "subj_math" },
  ],
  formulas: ["probability-rules"],
  blocks: [
    def("Sample space and events", r`The sample space is the set of all possible outcomes; an event is a subset of it. When outcomes are equally likely, $P(E) = \frac{\text{number of outcomes in } E}{\text{number of outcomes in the sample space}}$.`),
    def("Fundamental Counting Principle", r`If one choice can be made in $m$ ways and a second in $n$ ways, the two can be made together in $m \cdot n$ ways. Rolling two dice gives $6 \cdot 6 = 36$ outcomes.`),
    example(r`Two dice are rolled. Find $P(\text{sum} = 7)$.`, [
      [r`(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)`, "List the outcomes with sum 7."],
      [r`P = \tfrac{6}{36} = \tfrac{1}{6}`, ""],
    ]),
    def("Complement and addition rule", r`$P(\text{not } A) = 1 - P(A)$. $P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$; subtract the overlap so it isn't counted twice. If $A$ and $B$ can't both happen (mutually exclusive), the overlap is 0.`),
    example(r`A card is drawn from a standard 52-card deck. Find $P(\text{heart or king})$.`, [
      [r`\tfrac{13}{52} + \tfrac{4}{52} - \tfrac{1}{52}`, "The king of hearts is in both events."],
      [r`= \tfrac{16}{52} = \tfrac{4}{13}`, ""],
    ]),
    text(r`Experimental probability comes from trials: $\frac{\text{times the event occurred}}{\text{number of trials}}$. By the law of large numbers, it tends to get close to the theoretical probability as the number of trials grows.`),
    activity("dice-simulation", { title: "Experimental vs theoretical" }),
    callout("tip", "Try this", r`Run a few rolls and then many. How close does the experimental frequency get to the theoretical value? Small samples can be far off.`, "experiment"),
    callout("application", "Where this shows up", r`Weather forecasts, insurance, medical test results and games of chance all report probabilities. Understanding complements makes "at least one" questions easy.`),
  ],
  questions: [
    num(1, r`A fair coin is flipped 3 times. How many outcomes are in the sample space?`, 8, {}, [], r`$2^3 = 8$.`),
    num(1, r`A bag has 4 red, 5 blue and 3 green marbles. What is P(blue)? Enter a fraction or decimal.`, 5 / 12, { tolerance: 1e-3 }, [], r`$\frac{5}{12}$.`),
    num(2, r`Two dice are rolled. What is the probability the sum is 10? Enter a fraction or decimal.`, 1 / 12, { tolerance: 1e-3 }, ["(4,6), (5,5), (6,4)."], r`$\frac{3}{36} = \frac{1}{12}$.`),
    num(2, r`The probability of rain is 0.35. What is the probability of no rain?`, 0.65, {}, [], r`$1 - 0.35 = 0.65$.`),
    num(2, r`From a deck, what is P(face card or red card)? (Face cards: J, Q, K.) Enter a fraction or decimal.`, 32 / 52, { tolerance: 1e-3 }, ["12 face cards, 26 red, 6 red face cards."], r`$\frac{12 + 26 - 6}{52} = \frac{32}{52} = \frac{8}{13}$.`),
    mc(3, r`A spinner landed on blue 18 times in 50 spins. The theoretical probability is 1/4. Which is true?`, ["The spinner must be unfair", "The experimental probability is 0.36, which can differ from 0.25 in a small sample", "The theoretical probability is wrong", "Experimental always equals theoretical"], 1, [], r`$18 / 50 = 0.36$. With only 50 spins, a gap from 0.25 can happen by chance; more trials would tell you more.`, "review"),
  ],
});
