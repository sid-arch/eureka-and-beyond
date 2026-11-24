import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "comparing-distributions",
  title: "Comparing distributions",
  summary: "Compare two or more distributions using parallel displays and comparative language for shape, center, spread and outliers.",
  minutes: 25,
  objectives: [
    "Use parallel box plots, back-to-back stemplots or stacked dot plots to compare groups.",
    "Compare centers and spreads with explicit comparative language.",
    "Avoid conclusions that the data can't support.",
  ],
  concepts: [
    { slug: "distributions", name: "Distributions", description: "The values a variable takes and how often it takes them.", subject: "subj_math" },
  ],
  blocks: [
    def("Comparing, not just describing", r`A comparison uses words like "greater than", "about the same as" and "more variable than". Describing each group separately isn't a comparison.`),
    example(r`Quiz scores. Class A: median 78, IQR 12, symmetric. Class B: median 72, IQR 20, skewed left, low outlier at 31.`, [
      [r`\text{center: A's median is 6 points higher than B's}`, ""],
      [r`\text{spread: B's scores are more variable (IQR 20 vs 12)}`, ""],
      [r`\text{shape and outliers: A symmetric; B skewed left with a low outlier}`, ""],
    ]),
    callout("warning", "Don't overreach", r`If these are two class sections, the difference doesn't prove one teacher is better: the students weren't randomly assigned. Comparisons of existing groups describe differences; they don't explain them.`),
    callout("application", "Where this shows up", r`Doctors compare blood-pressure distributions for treatment and control groups; manufacturers compare output from two machines for consistency (spread), not just average (center).`),
  ],
  questions: [
    num(1, r`Group 1 has median 45 and Group 2 has median 38. How much greater is Group 1's median?`, 7, {}, [], r`$45 - 38 = 7$.`),
    mc(2, r`Machine X fills bottles with SD 1.2 mL; Machine Y with SD 3.5 mL. Both average 500 mL. Which is more consistent?`, ["X", "Y", "They're the same", "Can't tell"], 0, [], r`Smaller standard deviation means less variation.`),
    mc(2, r`Which statement is a comparison?`, ["Boys' heights have a median of 68 in.", "Girls' heights are symmetric.", "Boys' median height is about 4 in. greater than girls', and the two have similar spreads.", "Heights vary."], 2, [], r`It relates the two groups directly.`),
    mc(3, r`Parallel box plots show that students who sleep more have higher median GPAs. What can you conclude?`, ["More sleep causes higher GPA", "There is an association between sleep and GPA in these data", "Higher GPA causes more sleep", "Nothing"], 1, [], r`This is observational data: an association, not cause and effect.`, "review"),
  ],
});
