import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "conditional-probability",
  title: "Conditional probability",
  summary: "Compute P(B | A) from tables, tree diagrams and the formula, test independence with conditional probabilities, and recognize the difference between P(A | B) and P(B | A).",
  minutes: 30,
  objectives: [
    "Compute conditional probabilities from two-way tables and with P(B | A) = P(A and B) / P(A).",
    "Use tree diagrams for multi-stage experiments.",
    "Test independence by checking whether P(B | A) = P(B), and avoid confusing P(A | B) with P(B | A).",
  ],
  concepts: [
    { slug: "conditional-probability", name: "Conditional probability", description: "The probability of an event given that another event has occurred.", subject: "subj_math" },
    { slug: "independence", name: "Independent events", description: "Events where one occurring does not change the probability of the other.", subject: "subj_math" },
  ],
  formulas: ["probability-rules"],
  blocks: [
    def("Conditional probability", r`$P(B \mid A) = \dfrac{P(A \text{ and } B)}{P(A)}$, for $P(A) > 0$. It's the probability of $B$ when you restrict attention to outcomes where $A$ happened.`),
    example(r`Of 200 students, 120 play a sport; 54 of the athletes and 26 of the non-athletes prefer morning classes. Find $P(\text{morning} \mid \text{athlete})$ and $P(\text{athlete} \mid \text{morning})$.`, [
      [r`P(\text{morning} \mid \text{athlete}) = \tfrac{54}{120} = 0.45`, "Restrict to the 120 athletes."],
      [r`P(\text{athlete} \mid \text{morning}) = \tfrac{54}{80} = 0.675`, "Restrict to the 80 morning-preferrers."],
    ], "Different denominators, different answers: the order in P(A | B) matters."),
    text(r`$A$ and $B$ are independent exactly when $P(B \mid A) = P(B)$: knowing $A$ happened doesn't change the chances of $B$. Here $P(\text{morning}) = \frac{80}{200} = 0.40 \ne 0.45$, so preferring mornings and playing a sport are not independent in this sample.`),
    example(r`A disease affects 1% of people. A test is 95% accurate for people who have it and 90% accurate for people who don't. If someone tests positive, what's the probability they have the disease?`, [
      [r`P(\text{pos and disease}) = 0.01 \cdot 0.95 = 0.0095`, "Tree: branch for 'has disease'."],
      [r`P(\text{pos and healthy}) = 0.99 \cdot 0.10 = 0.099`, "False positives."],
      [r`P(\text{disease} \mid \text{pos}) = \tfrac{0.0095}{0.0095 + 0.099} \approx 0.088`, "Under 9%!"],
    ], "Because the disease is rare, most positives are false positives. This is why doctors confirm with a second test."),
    callout("warning", "The confusion of the inverse", r`$P(\text{positive} \mid \text{disease}) = 0.95$ is not $P(\text{disease} \mid \text{positive})$, which here is about 0.088. Mixing them up is one of the most common errors in medicine, law and the news.`),
    callout("application", "Where this shows up", r`Spam filters, medical diagnosis, insurance pricing and weather forecasts ("chance of rain given these clouds") are all conditional probabilities.`),
  ],
  questions: [
    num(1, r`$P(A) = 0.5$ and $P(A \text{ and } B) = 0.2$. Find $P(B \mid A)$.`, 0.4, {}, [], r`$0.2 / 0.5 = 0.4$.`),
    num(2, r`Two dice are rolled. Given that the sum is 8, what is the probability that one die shows 3? Enter a fraction or decimal.`, 0.4, {}, ["Sum 8: (2,6),(3,5),(4,4),(5,3),(6,2)."], r`(3,5) and (5,3): $\frac{2}{5} = 0.4$.`),
    num(2, r`In a class, 60% study Spanish, 30% study French, and 12% study both. What is P(French | Spanish)?`, 0.2, {}, [r`$0.12 / 0.60$.`], r`$0.2$.`),
    mc(2, r`$P(B) = 0.3$ and $P(B \mid A) = 0.3$. What can you conclude?`, ["A and B are mutually exclusive", "A and B are independent", "A causes B", "P(A) = 0.3"], 1, [], r`Knowing A doesn't change B's probability: independent.`),
    num(3, r`A factory has machines X (60% of output, 2% defective) and Y (40% of output, 5% defective). A random item is defective. What is the probability it came from Y? Round to three decimals.`, 0.625, { tolerance: 0.0006 }, [r`$P(\text{def}) = 0.012 + 0.020$.`], r`$\frac{0.020}{0.032} = 0.625$.`, "review"),
  ],
});
