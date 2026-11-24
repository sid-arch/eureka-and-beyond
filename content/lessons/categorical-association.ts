import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "categorical-association",
  title: "Statistics for two categorical variables",
  summary: "Compare conditional relative frequencies and segmented bar charts to decide whether two categorical variables are associated.",
  minutes: 25,
  objectives: [
    "Compute conditional relative frequencies from a two-way table.",
    "Read segmented (stacked) and side-by-side bar charts.",
    "Decide whether there is an association between two categorical variables.",
  ],
  concepts: [
    { slug: "data-types", name: "Types of data", description: "Categorical variables place individuals into groups; quantitative variables take numerical values that can be measured or counted.", subject: "subj_math" },
  ],
  blocks: [
    def("Association", r`Two categorical variables are associated if knowing the value of one changes the distribution of the other. Compare the conditional distributions: if they're (nearly) the same, there's little or no association.`),
    example(r`Juniors: 72 of 120 prefer online homework. Seniors: 32 of 80.`, [
      [r`\text{juniors } \tfrac{72}{120} = 60\%,\ \text{seniors } \tfrac{32}{80} = 40\%`, "Conditional relative frequencies."],
      [r`\text{the distributions differ}`, "There is an association between grade and preference in these data."],
    ]),
    def("Segmented bar charts", r`Each bar represents 100% of one group, divided into segments for the categories of the other variable. If the segments line up across bars, there's no association.`),
    callout("warning", "Compare percents, not counts", r`Raw counts mislead when groups differ in size: 72 juniors vs 32 seniors exaggerates the difference.`),
    callout("application", "Where this shows up", r`Public health reports compare vaccination rates across age groups; marketers compare product preferences across regions.`),
  ],
  questions: [
    num(1, r`In a table, 45 of 75 dog owners exercise daily. What percent is that?`, 60, { unit: "%" }, [], r`$45/75 = 0.6$.`),
    mc(2, r`Among cat owners, 60% exercise daily; among dog owners, 60% do too. What does this suggest?`, ["Strong association", "No association between pet type and daily exercise in these data", "Dogs cause exercise", "The sample is biased"], 1, [], r`Identical conditional distributions mean no association.`),
    mc(2, r`In a segmented bar chart, the 'yes' segments are 30%, 55% and 80% for three age groups. This shows…`, ["No association", "An association between age group and response", "Causation", "Equal group sizes"], 1, [], r`The conditional distributions differ.`),
    mc(3, r`Which is the conditional relative frequency of 'smoker' among men?`, ["Smoking men ÷ all people", "Smoking men ÷ all men", "Smoking men ÷ all smokers", "All men ÷ all people"], 1, [], r`Condition on men: divide by the men total.`, "review"),
  ],
});
