import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "probability-rules",
  title: "Addition and multiplication rules",
  summary: "Use the general addition rule for 'or' events, the multiplication rule for 'and' events (independent or not), and Venn diagrams and tree diagrams to organize them.",
  minutes: 30,
  objectives: [
    "Use P(A or B) = P(A) + P(B) − P(A and B), and the special case for mutually exclusive events.",
    "Use P(A and B) = P(A)·P(B | A), and P(A)·P(B) for independent events.",
    "Organize probabilities with Venn and tree diagrams.",
  ],
  concepts: [
    { slug: "probability", name: "Probability", description: "The long-run relative frequency with which an outcome of a random process occurs.", subject: "subj_math" },
  ],
  formulas: ["probability-rules"],
  blocks: [
    def("General addition rule", r`$P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$. Subtracting removes the overlap counted twice. If $A$ and $B$ are mutually exclusive (can't both happen), $P(A \text{ or } B) = P(A) + P(B)$.`),
    example(r`Draw one card from a standard deck. Find $P(\text{heart or face card})$.`, [
      [r`\frac{13}{52} + \frac{12}{52} - \frac{3}{52}`, "Three face cards are hearts."],
      [r`= \frac{22}{52} = \frac{11}{26} \approx 0.423`, ""],
    ]),
    def("General multiplication rule", r`$P(A \text{ and } B) = P(A) \cdot P(B \mid A)$. If $A$ and $B$ are independent, $P(B \mid A) = P(B)$, so $P(A \text{ and } B) = P(A)P(B)$.`),
    example(r`Draw two cards without replacement. Find $P(\text{both aces})$.`, [
      [r`\frac{4}{52} \cdot \frac{3}{51} = \frac{12}{2652}`, "The second draw depends on the first."],
      [r`\approx 0.0045`, ""],
    ]),
    callout("warning", "Mutually exclusive ≠ independent", r`If $A$ and $B$ are mutually exclusive with positive probabilities, knowing $A$ happened tells you $B$ didn't, so they are dependent.`),
    callout("application", "Where this shows up", r`Reliability engineers compute the chance a system fails using these rules: parallel backups fail only if all fail ('and'), while a chain fails if any link fails ('or').`),
  ],
  questions: [
    num(1, r`$P(A) = 0.5$, $P(B) = 0.4$ and $P(A \text{ and } B) = 0.2$. Find $P(A \text{ or } B)$.`, 0.7, { tolerance: 0.001 }, [], r`$0.5 + 0.4 - 0.2 = 0.7$.`),
    num(1, r`Roll two fair dice. Find $P(\text{both show 6})$ to four decimal places.`, 0.0278, { tolerance: 0.0001 }, [], r`$\frac{1}{6} \cdot \frac{1}{6} = \frac{1}{36} \approx 0.0278$.`),
    num(2, r`A backup generator fails 5% of the time and a second, independent one fails 10% of the time. What is the probability that both fail?`, 0.005, { tolerance: 0.0001 }, [], r`$0.05 \cdot 0.10 = 0.005$.`),
    mc(2, r`Events $A$ and $B$ are mutually exclusive, with $P(A) = 0.3$ and $P(B) = 0.2$. Are they independent?`, ["Yes", "No", "Only if P(A or B) = 0.5", "Can't tell"], 1, [], r`$P(A \text{ and } B) = 0 \ne 0.3 \cdot 0.2$.`),
    num(3, r`A test detects a condition 90% of the time when present; 2% of people have it. Find $P(\text{has it and tests positive})$.`, 0.018, { tolerance: 0.0001 }, [], r`$0.02 \cdot 0.90 = 0.018$.`, "review"),
  ],
});
