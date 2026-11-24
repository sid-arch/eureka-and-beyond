import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "independent-dependent-events",
  title: "Independent and dependent events",
  summary: "Find probabilities of compound 'and' events, distinguish independent from dependent events, and solve 'at least one' problems with complements.",
  minutes: 25,
  objectives: [
    "Decide whether two events are independent or dependent.",
    "Use P(A and B) = P(A) · P(B) for independent events and P(A) · P(B | A) for dependent events.",
    "Compute 'at least one' probabilities using the complement.",
  ],
  concepts: [
    { slug: "probability", name: "Probability", description: "A number from 0 to 1 measuring how likely an event is.", subject: "subj_math" },
    { slug: "independence", name: "Independent events", description: "Events where one occurring does not change the probability of the other.", subject: "subj_math" },
  ],
  formulas: ["probability-rules"],
  blocks: [
    def("Independent events", r`Events $A$ and $B$ are independent if knowing that one happened doesn't change the probability of the other. Then $P(A \text{ and } B) = P(A) \cdot P(B)$.`),
    def("Dependent events", r`If one event affects the other, use $P(A \text{ and } B) = P(A) \cdot P(B \mid A)$, where $P(B \mid A)$ is the probability of $B$ given that $A$ happened. Drawing without replacement makes events dependent.`),
    example(r`A bag has 5 red and 3 blue marbles. Draw two. Find P(both red) with and without replacement.`, [
      [r`\text{with: } \tfrac{5}{8} \cdot \tfrac{5}{8} = \tfrac{25}{64} \approx 0.391`, "Independent: the bag is restored."],
      [r`\text{without: } \tfrac{5}{8} \cdot \tfrac{4}{7} = \tfrac{20}{56} = \tfrac{5}{14} \approx 0.357`, "Dependent: one red is gone."],
    ]),
    text(r`"At least one" problems are easiest with the complement. The opposite of "at least one success" is "no successes," which is usually a single product.`),
    example(r`A free throw goes in 70% of the time, independently. What is P(at least one make in 3 shots)?`, [
      [r`P(\text{all miss}) = 0.3^3 = 0.027`, ""],
      [r`P(\text{at least one}) = 1 - 0.027 = 0.973`, ""],
    ]),
    callout("warning", "Independent is not the same as mutually exclusive", r`Mutually exclusive events can't happen together, so $P(A \text{ and } B) = 0$. If both have positive probability, they're dependent: knowing one happened tells you the other didn't.`),
    callout("application", "Where this shows up", r`Reliability engineering (a system with backups fails only if all parts fail), medical testing, and card games all depend on whether events are independent.`),
  ],
  questions: [
    num(1, r`A coin is flipped and a die is rolled. What is P(heads and a 6)? Enter a fraction or decimal.`, 1 / 12, { tolerance: 1e-3 }, [], r`$\frac{1}{2} \cdot \frac{1}{6} = \frac{1}{12}$.`),
    num(2, r`Two cards are drawn without replacement. What is P(both aces)? Enter a fraction or decimal.`, 1 / 221, { tolerance: 1e-4 }, [r`$\frac{4}{52} \cdot \frac{3}{51}$.`], r`$\frac{12}{2652} = \frac{1}{221} \approx 0.0045$.`),
    mc(2, r`Which pair of events is independent?`, ["Drawing two cards without replacement", "Rolling a die twice", "Picking two students for different roles from one class", "Pulling two socks from a drawer without returning the first"], 1, [], r`Die rolls don't affect each other.`),
    num(2, r`A machine part fails with probability 0.1. Two independent backup parts are installed (3 total). What is the probability all three fail?`, 0.001, {}, [], r`$0.1^3 = 0.001$.`),
    num(3, r`Each day there's a 20% chance of rain, independently. What is the probability of at least one rainy day in a 5-day week? Round to three decimals.`, 0.672, { tolerance: 0.0006 }, [r`$1 - 0.8^5$.`], r`$1 - 0.32768 \approx 0.672$.`, "review"),
  ],
});
