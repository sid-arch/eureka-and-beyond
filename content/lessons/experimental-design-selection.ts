import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "experimental-design-selection",
  title: "Selecting an experimental design",
  summary: "Choose between completely randomized, randomized block and matched pairs designs, and describe how to carry out each with random assignment.",
  minutes: 25,
  objectives: [
    "Describe a completely randomized design and how to randomize.",
    "Choose a blocking variable and describe a randomized block design.",
    "Explain when a matched pairs design is most effective.",
  ],
  concepts: [
    { slug: "study-design", name: "Study design", description: "How data are produced (sample surveys, observational studies, experiments) and what conclusions each design supports.", subject: "subj_math" },
  ],
  blocks: [
    def("Completely randomized design", r`All units are assigned to treatments completely at random, for example by drawing numbered slips or using a random number generator to pick half the units for treatment A.`),
    def("Randomized block design", r`First form blocks of units that are similar on a variable expected to affect the response; then randomly assign treatments within each block. Blocking reduces variability, making treatment differences easier to detect.`),
    def("Matched pairs", r`Pairs of very similar units (or each unit used twice, in random order) get the two treatments. Analyze the differences within each pair.`),
    example(r`Comparing two tire brands for wear`, [
      [r`\text{completely randomized: assign brands to 20 cars at random}`, "Car-to-car differences in driving add noise."],
      [r`\text{matched pairs: put one of each brand on each car, sides chosen at random}`, "Each car's driving affects both brands equally."],
      [r`\text{matched pairs is better here}`, ""],
    ]),
    callout("tip", "Choosing a blocking variable", r`Block on a variable that you expect to affect the response (age, soil type, initial fitness), not one you're studying.`),
    callout("application", "Where this shows up", r`Agricultural field trials block by field location; taste tests use matched pairs, with each taster trying both products in random order.`),
  ],
  questions: [
    mc(1, r`Why block in an experiment?`, ["To avoid randomization", "To reduce the variability due to a known source", "To create a placebo", "To increase bias"], 1, [], r`Comparisons happen within similar units.`),
    mc(2, r`A study of a reading program suspects that prior reading level matters. A good design blocks on…`, ["The program", "Prior reading level", "Student ID", "Test date"], 1, [], r`Block on the variable expected to affect the response.`),
    mc(2, r`Each subject tries two keyboards in random order. This is…`, ["Completely randomized", "Matched pairs", "Observational", "Cluster sampling"], 1, [], r`Each subject receives both treatments.`),
    mc(3, r`In a block design with blocks for men and women, how is randomization done?`, ["Once, across everyone", "Separately within each block", "Not at all", "Only for women"], 1, [], r`Random assignment happens within each block.`, "review"),
  ],
});
