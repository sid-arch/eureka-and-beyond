import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sampling-surveys",
  title: "Sampling and surveys",
  summary: "Distinguish populations from samples, compare sampling methods, recognize bias, and tell surveys, observational studies and experiments apart.",
  minutes: 25,
  objectives: [
    "Distinguish a population, a sample, a parameter and a statistic.",
    "Describe random, stratified, cluster, systematic and convenience samples.",
    "Identify sources of bias and distinguish surveys, observational studies and experiments.",
  ],
  concepts: [
    { slug: "sampling", name: "Sampling", description: "Choosing part of a population to learn about the whole.", subject: "subj_math" },
  ],
  blocks: [
    def("Population and sample", r`The population is the entire group of interest; a sample is the part you actually measure. A number describing the population is a parameter; the same number computed from a sample is a statistic, which estimates it.`),
    def("Sampling methods", r`Simple random: every group of size n is equally likely. Stratified: split into groups (strata) and randomly sample each. Cluster: randomly choose whole groups. Systematic: every kth member. Convenience: whoever is easy to reach (usually biased).`),
    text(r`Bias is a systematic error that pushes results in one direction. Common sources: undercoverage (some groups can't be selected), nonresponse (selected people don't answer), voluntary response (only people with strong opinions reply), and leading question wording.`),
    example(r`A school wants students' opinion on lunch. Evaluate: surveying the first 50 students in the lunch line.`, [
      [r`\text{convenience sample}`, "Students who skip lunch or come late are left out: undercoverage."],
      [r`\text{better: stratified random by grade}`, "Randomly select students from each grade's roster."],
    ]),
    def("Study types", r`A survey asks questions. An observational study measures without intervening. An experiment randomly assigns treatments, which is the only design that can show cause and effect.`),
    callout("application", "Where this shows up", r`Election polls, product reviews, medical trials and census planning all depend on good sampling. A large biased sample is worse than a small random one.`),
  ],
  questions: [
    mc(1, r`A poll of 1,000 voters finds 52% support. The 52% is a…`, ["parameter", "statistic", "population", "census"], 1, [], r`It describes the sample.`),
    mc(2, r`A radio host asks listeners to call in their opinion. What's the main problem?`, ["Too small", "Voluntary response bias", "Stratification", "Nothing"], 1, [], r`Only people with strong opinions call.`),
    mc(2, r`Choosing 20 students at random from each grade is…`, ["Simple random", "Stratified random", "Cluster", "Systematic"], 1, [], r`Random within each stratum (grade).`),
    mc(3, r`Which study can establish that a new fertilizer causes taller plants?`, ["Survey of farmers", "Observational study of farms", "Randomized experiment with control plots", "Convenience sample of gardens"], 2, [], r`Random assignment controls for other variables.`, "review"),
  ],
});
