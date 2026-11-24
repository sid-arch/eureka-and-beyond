import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inductive-deductive-reasoning",
  title: "Inductive and deductive reasoning",
  summary: "Make conjectures from patterns, test them with counterexamples, and reach certain conclusions with deductive laws (detachment and syllogism).",
  minutes: 25,
  objectives: [
    "Use inductive reasoning to make a conjecture from a pattern.",
    "Disprove a conjecture with a counterexample.",
    "Apply the Law of Detachment and the Law of Syllogism to draw valid conclusions.",
  ],
  concepts: [
    { slug: "logical-reasoning", name: "Logical reasoning", description: "Inductive reasoning from patterns and deductive reasoning from accepted statements.", subject: "subj_math" },
  ],
  blocks: [
    def("Inductive reasoning", r`Reasoning from observed patterns to a general conjecture. It suggests what is probably true but can't guarantee it.`),
    example(r`Make a conjecture: $1 = 1$, $1 + 3 = 4$, $1 + 3 + 5 = 9$, $1 + 3 + 5 + 7 = 16$`, [
      [r`1, 4, 9, 16 \text{ are perfect squares}`, ""],
      [r`\text{Conjecture: the sum of the first } n \text{ odd numbers is } n^2`, "This one is true, but the pattern alone doesn't prove it."],
    ]),
    def("Counterexample", r`A single case where the hypothesis is true but the conclusion is false. One counterexample proves a conjecture false.`),
    example(r`Conjecture: "The sum of two numbers is always greater than either number."`, [
      [r`-3 + 2 = -1`, "−1 is less than 2."],
      [r`\text{False}`, "The conjecture fails for negative numbers."],
    ]),
    def("Deductive reasoning", r`Reasoning from facts, definitions, properties and accepted rules to a conclusion that must be true if the starting statements are true.`),
    def("Law of Detachment", r`If $p \rightarrow q$ is true and $p$ is true, then $q$ is true.`),
    def("Law of Syllogism", r`If $p \rightarrow q$ and $q \rightarrow r$ are true, then $p \rightarrow r$ is true.`),
    example(r`Draw conclusions`, [
      [r`\text{If an angle is right, it measures } 90^\circ.\ \angle A \text{ is right.}`, "Detachment: m∠A = 90°."],
      [r`\text{If } x > 5 \text{ then } x > 3.\ \text{If } x > 3 \text{ then } x > 0.`, "Syllogism: if x > 5, then x > 0."],
    ]),
    callout("warning", "Affirming the conclusion is invalid", r`"If it rains, the grass is wet. The grass is wet." doesn't let you conclude it rained; a sprinkler might be on. Detachment works only when the hypothesis is known to be true.`),
    callout("application", "Where this shows up", r`Scientists use induction to form hypotheses and deduction to test their consequences. Lawyers, programmers debugging code and doctors making diagnoses all switch between the two.`),
  ],
  questions: [
    num(1, r`Find the next term by inductive reasoning: 3, 7, 11, 15, …`, 19, {}, ["Add 4 each time."], r`$15 + 4 = 19$.`),
    num(2, r`Find the next term: 2, 6, 18, 54, …`, 162, {}, ["Multiply by 3."], r`$54 \cdot 3 = 162$.`),
    mc(2, r`Which is a counterexample to "Every prime number is odd"?`, ["3", "9", "2", "15"], 2, ["Look for an even prime."], r`2 is prime and even.`),
    mc(2, r`Given: "If a polygon is a triangle, its angles sum to 180°." Polygon P is a triangle. What follows?`, ["P has 3 sides only if it's equilateral", "P's angles sum to 180°", "P is a square", "Nothing can be concluded"], 1, ["Law of Detachment."], r`The hypothesis is true for P, so the conclusion holds.`),
    mc(2, r`Given "If I study, I pass" and "If I pass, I graduate." Which follows by the Law of Syllogism?`, ["If I graduate, I studied", "If I study, I graduate", "If I pass, I studied", "If I don't study, I don't graduate"], 1, [], r`Chain the statements: $p \rightarrow q$ and $q \rightarrow r$ give $p \rightarrow r$.`),
    mc(3, r`"If a figure is a square, it has four sides. Figure F has four sides." What can you conclude?`, ["F is a square", "F is not a square", "Nothing certain about F being a square", "F is a rectangle"], 2, ["Is this detachment, or affirming the conclusion?"], r`Many figures have four sides, so F might not be a square. The argument is invalid.`, "review"),
  ],
});
