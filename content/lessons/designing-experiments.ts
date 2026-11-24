import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "designing-experiments",
  title: "Designing experiments",
  summary: "Design experiments using comparison, random assignment, control and replication; use placebos and blinding; and choose completely randomized, randomized block or matched pairs designs.",
  minutes: 30,
  objectives: [
    "Apply the four principles of experimental design.",
    "Explain the purpose of control groups, placebos and double-blinding.",
    "Choose between completely randomized, block and matched pairs designs.",
  ],
  concepts: [
    { slug: "study-design", name: "Study design", description: "How data are produced (sample surveys, observational studies, experiments) and what conclusions each design supports.", subject: "subj_math" },
  ],
  blocks: [
    def("Four principles", r`Comparison: use at least two treatments (often including a control). Random assignment: use chance to assign units to treatments, so groups are similar except for the treatment. Control: keep other variables the same for all groups. Replication: use enough units in each group to see real differences.`),
    def("Placebo and blinding", r`A placebo is a fake treatment; the placebo effect is a response to receiving any treatment. In a double-blind experiment neither the subjects nor those measuring the response know who got which treatment.`),
    def("Blocking", r`A block is a group of units similar in a way expected to affect the response. In a randomized block design, units are randomly assigned to treatments separately within each block. Matched pairs is a block design with blocks of size 2, or each subject receiving both treatments in random order.`),
    example(r`Testing a new sunscreen on 40 volunteers`, [
      [r`\text{matched pairs: each volunteer gets the new sunscreen on one arm, the old on the other}`, ""],
      [r`\text{randomly choose which arm gets which}`, "Controls for arm (dominant hand, sun exposure)."],
      [r`\text{compare redness on the two arms for each person}`, "Differences within a person remove person-to-person variation."],
    ]),
    callout("application", "Where this shows up", r`New medicines are approved after randomized, double-blind, placebo-controlled trials, the strongest design for showing cause and effect.`),
  ],
  questions: [
    mc(1, r`What is the main purpose of random assignment?`, ["To make the sample represent the population", "To create groups that are similar except for the treatment", "To make the experiment cheaper", "To blind the subjects"], 1, [], r`Random assignment balances other variables across groups, allowing causal conclusions.`),
    mc(2, r`A fertilizer study uses fields in two very different soil types. A good design would…`, ["Ignore soil", "Block by soil type and randomize within each block", "Use only one field", "Let farmers choose"], 1, [], r`Blocking removes the variation due to soil.`),
    mc(2, r`In a double-blind experiment…`, ["Subjects know their treatment", "Neither subjects nor evaluators know who got which treatment", "There are two treatments", "Two researchers run it"], 1, [], r`That prevents expectations from affecting responses or measurements.`),
    mc(3, r`Random sampling vs random assignment: which lets you generalize to a population, and which lets you conclude cause and effect?`, ["Sampling: generalize; assignment: cause", "Sampling: cause; assignment: generalize", "Both give both", "Neither"], 0, [], r`Random sampling supports generalization; random assignment supports causation.`, "review"),
  ],
});
