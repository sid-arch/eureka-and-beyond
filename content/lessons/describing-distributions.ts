import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "describing-distributions",
  title: "Describing shape, center and spread",
  summary: "Describe a quantitative distribution completely, covering shape, outliers, center and spread, always in the context of the data.",
  minutes: 25,
  objectives: [
    "Describe shape: symmetric, skewed left or right, unimodal or bimodal.",
    "Identify possible outliers and gaps.",
    "Report a center and spread that fit the shape, in context.",
  ],
  concepts: [
    { slug: "distributions", name: "Distributions", description: "The values a variable takes and how often it takes them.", subject: "subj_math" },
  ],
  blocks: [
    def("A distribution", r`The distribution of a variable tells what values it takes and how often. To describe one, address shape, outliers, center and spread, and name the variable and its units.`),
    def("Shape", r`Symmetric: the two sides are near mirror images. Skewed right: a long tail toward larger values. Skewed left: a long tail toward smaller values. Unimodal or bimodal: one or two clear peaks.`),
    def("Matching center and spread to shape", r`In a skewed distribution, the mean is pulled toward the tail, so report the median and IQR. For roughly symmetric distributions without outliers, the mean and standard deviation work well.`),
    example(r`Commute times (minutes) for 25 workers: most between 10 and 30, a few at 50, 55 and 70`, [
      [r`\text{shape: skewed right}`, "Long tail of long commutes."],
      [r`\text{outlier candidate: } 70`, "Check with the 1.5 × IQR rule."],
      [r`\text{center and spread: median and IQR}`, "Resistant to the tail."],
    ]),
    activity("data-explorer", { title: "Shape, center and spread", params: { dataset: "skewed", view: "histogram" } }),
    callout("tip", "Try this", r`With the skewed data set, compare the mean and median. Then drag the largest values farther right: the mean moves, the median barely does.`, "experiment"),
    callout("application", "Where this shows up", r`Income is skewed right, so governments report median household income; a few very high incomes would inflate the mean.`),
  ],
  questions: [
    mc(1, r`A distribution has a long tail to the right. It is…`, ["Skewed left", "Skewed right", "Symmetric", "Bimodal"], 1, [], r`Skew is named for the direction of the tail.`),
    mc(2, r`In a strongly left-skewed distribution, the mean is usually…`, ["greater than the median", "less than the median", "equal to the median", "unrelated to the median"], 1, [], r`The tail of small values pulls the mean down.`),
    mc(2, r`Heights of a mixed group of 7-year-olds and adults would most likely be…`, ["Unimodal and symmetric", "Bimodal", "Skewed right", "Uniform"], 1, [], r`Two clusters, children and adults, give two peaks.`),
    mc(3, r`Which description is most complete?`, ["The data are skewed.", "The median is 22.", "Commute times are skewed right with a median of 22 minutes, IQR 12 minutes, and one high outlier at 70 minutes.", "The data have a mean."], 2, [], r`It covers shape, center, spread and outliers, in context with units.`, "review"),
  ],
});
