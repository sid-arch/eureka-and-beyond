import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sampling-methods",
  title: "Sampling methods",
  summary: "Choose random samples with simple random, stratified, cluster and systematic sampling, and recognize convenience and voluntary response samples as biased.",
  minutes: 25,
  objectives: [
    "Select a simple random sample using a random number generator or table.",
    "Describe stratified, cluster and systematic random samples and when each is useful.",
    "Explain why convenience and voluntary response samples are biased.",
  ],
  concepts: [
    { slug: "sampling", name: "Sampling", description: "Choosing part of a population to learn about the whole.", subject: "subj_math" },
  ],
  blocks: [
    def("Simple random sample (SRS)", r`Every group of $n$ individuals has the same chance of being chosen. Label individuals 1 to $N$ and use a random number generator to pick $n$ different labels.`),
    def("Stratified random sample", r`Split the population into groups of similar individuals (strata), such as grade levels, and take an SRS from each. Useful when the strata differ on the variable of interest; it gives more precise estimates.`),
    def("Cluster sample", r`Split the population into groups that each look like the population (clusters), such as homerooms, randomly choose some clusters, and include everyone in them. Useful because it's cheaper and easier.`),
    def("Systematic random sample", r`Choose a random starting point among the first $k$ individuals, then take every $k$th individual on the list.`),
    example(r`A school of 1,200 students (300 per grade) wants opinions on a new schedule.`, [
      [r`\text{stratified: an SRS of 25 from each grade}`, "Grades may differ in opinion."],
      [r`\text{cluster: randomly pick 4 of the 48 homerooms and survey everyone in them}`, "Fast and cheap."],
    ]),
    callout("warning", "Bad samples", r`A convenience sample (whoever is easy to reach) and a voluntary response sample (whoever chooses to respond) are biased: they systematically over-represent some groups. Bigger samples of this kind don't fix the bias.`),
    callout("application", "Where this shows up", r`National polls use stratified, multistage samples; manufacturers use systematic samples from production lines to check quality.`),
  ],
  questions: [
    mc(1, r`A radio host asks listeners to call in with their opinions. This is a…`, ["Simple random sample", "Voluntary response sample", "Stratified sample", "Cluster sample"], 1, [], r`People choose to respond, typically those with strong opinions.`),
    mc(2, r`A researcher randomly selects 10 city blocks and surveys every household on them. This is a…`, ["Stratified sample", "Cluster sample", "Systematic sample", "Convenience sample"], 1, [], r`Whole groups (blocks) are chosen at random.`),
    mc(2, r`Why might a company stratify a customer survey by region?`, ["It's always cheaper", "Regions may differ in satisfaction, and stratifying ensures each is represented", "It removes all bias", "It makes the sample voluntary"], 1, [], r`Stratifying on a variable related to the response improves precision.`),
    mc(3, r`An online poll gets 50,000 responses. Which is true?`, ["The large size guarantees accuracy", "It may still be badly biased because respondents chose themselves", "It's a simple random sample", "It's a census"], 1, [], r`Size doesn't fix voluntary response bias.`, "review"),
  ],
});
