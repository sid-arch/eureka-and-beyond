import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sampling-bias",
  title: "Potential problems with sampling",
  summary: "Recognize undercoverage, nonresponse, response bias and question-wording effects, and explain how each can bias the results of a survey even when the sample is random.",
  minutes: 25,
  objectives: [
    "Identify undercoverage, nonresponse bias, response bias and wording bias.",
    "Predict the direction of the bias in context.",
    "Distinguish bias from ordinary sampling variability.",
  ],
  concepts: [
    { slug: "sampling", name: "Sampling", description: "Choosing part of a population to learn about the whole.", subject: "subj_math" },
  ],
  blocks: [
    def("Undercoverage", r`Some members of the population are less likely to be chosen or can't be chosen at all, for example a phone survey that misses people without phones.`),
    def("Nonresponse", r`Selected individuals can't be contacted or refuse to answer, and nonresponders may differ from responders.`),
    def("Response bias", r`Answers are systematically inaccurate: people misremember, or give socially desirable answers, especially to a live interviewer.`),
    def("Wording", r`Leading or confusing questions push answers in one direction.`),
    example(r`"Don't you agree that the city should fix its dangerous, crumbling roads?"`, [
      [r`\text{wording bias}`, "'Don't you agree' and 'dangerous, crumbling' push toward yes."],
      [r`\text{estimate of support is likely too high}`, "State the direction of the bias."],
    ]),
    callout("warning", "Bias isn't fixed by size", r`Sampling variability shrinks as $n$ grows; bias doesn't. A huge sample with undercoverage is precisely wrong.`),
    callout("application", "Where this shows up", r`Pollsters weight responses and test question wording because nonresponse and wording have shifted real election and health-survey results.`),
  ],
  questions: [
    mc(1, r`A survey on internet use is conducted only online. What problem is most likely?`, ["Nonresponse", "Undercoverage of people without internet access", "Wording", "None"], 1, [], r`People offline can't be selected.`),
    mc(2, r`Asked in person how often they wash their hands, people overstate it. This is…`, ["Undercoverage", "Nonresponse", "Response bias", "Sampling variability"], 2, [], r`Socially desirable answers.`),
    mc(2, r`Only 20% of mailed surveys about a new tax are returned, mostly from people angry about it. The likely effect is…`, ["Overestimating opposition to the tax", "Underestimating opposition", "No effect", "Undercoverage"], 0, [], r`Nonresponse bias in the direction of the angry responders.`),
    mc(3, r`Which reduces sampling variability but not bias?`, ["Better question wording", "Increasing the sample size", "Following up nonresponders", "Including people without phones"], 1, [], r`Larger $n$ makes estimates more consistent, not more correct.`, "review"),
  ],
});
