import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inference-and-experiments",
  title: "Inference and experiments",
  summary: "Use simulation of random reassignment to judge whether a difference in an experiment is statistically significant, and state the scope of inference from how the data were collected.",
  minutes: 25,
  objectives: [
    "Explain statistical significance as 'unlikely to happen by chance alone'.",
    "Use a randomization simulation to judge an observed difference.",
    "State the scope of inference: generalization from random sampling, causation from random assignment.",
  ],
  concepts: [
    { slug: "study-design", name: "Study design", description: "How data are produced (sample surveys, observational studies, experiments) and what conclusions each design supports.", subject: "subj_math" },
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("Statistically significant", r`An observed effect is statistically significant if it's so large that it would rarely occur by chance alone, if the treatments really had no effect.`),
    example(r`In an experiment, 18 of 30 subjects improved with a new treatment vs 9 of 30 with a placebo: a difference of 0.30.`, [
      [r`\text{assume no effect: the 27 improvers would improve either way}`, ""],
      [r`\text{simulate: reshuffle the 60 outcomes into two groups of 30, many times}`, "Record the difference each time."],
      [r`\text{if differences} \ge 0.30 \text{ occur in only about 1\% of reshuffles}`, "The observed result is unlikely by chance alone: statistically significant."],
    ]),
    def("Scope of inference", r`Random sampling allows generalizing to the population sampled. Random assignment to treatments allows cause-and-effect conclusions. Most experiments use volunteers: causation is supported, but only for subjects like these.`),
    callout("application", "Where this shows up", r`Randomization tests are used in clinical research and A/B testing because they rely only on the random assignment actually performed.`),
  ],
  questions: [
    mc(1, r`A result is statistically significant when it is…`, ["large in practical terms", "unlikely to occur by chance alone if there is no real effect", "based on a big sample", "from an observational study"], 1, [], r`Significance is about chance, not importance.`),
    mc(2, r`In 1,000 reshuffles, a difference as large as the observed one appeared 230 times. The result is…`, ["Statistically significant", "Not statistically significant: chance alone often produces it", "Proof of no effect", "Biased"], 1, [], r`23% of the time is not rare.`),
    mc(2, r`Volunteers are randomly assigned to two diets. What can be concluded from a significant difference?`, ["Diet causes the difference for people like these volunteers", "The result applies to all adults", "Only association", "Nothing"], 0, [], r`Random assignment supports causation; no random sample limits generalization.`),
    mc(3, r`A random sample of adults is surveyed about exercise and mood. A significant association can be…`, ["generalized to the population, but not shown to be causal", "shown to be causal, but not generalized", "both", "neither"], 0, [], r`Random sampling without random assignment.`, "review"),
  ],
});
