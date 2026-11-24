import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "two-way-frequency-tables",
  title: "Two-way frequency tables",
  summary: "Organize two categorical variables in a two-way table, compute joint, marginal and conditional relative frequencies, and look for associations.",
  minutes: 25,
  objectives: [
    "Build a two-way frequency table and find marginal totals.",
    "Compute joint, marginal and conditional relative frequencies.",
    "Use conditional relative frequencies to decide whether two categorical variables are associated.",
  ],
  concepts: [
    { slug: "two-way-tables", name: "Two-way tables", description: "Tables that summarize two categorical variables and their relationship.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Some data are categories, not numbers: grade level, favorite sport, yes or no. To study two categorical variables at once, count how many individuals fall in each combination and arrange the counts in a grid.`),
    example(r`A survey of 200 students: do they play a sport, and do they prefer morning or evening classes?`, [
      [r`\begin{array}{l|cc|c} & \text{Morning} & \text{Evening} & \text{Total} \\ \hline \text{Sport} & 54 & 66 & 120 \\ \text{No sport} & 26 & 54 & 80 \\ \hline \text{Total} & 80 & 120 & 200 \end{array}`, "Inner cells are joint frequencies; the totals are marginal frequencies."],
    ]),
    def("Relative frequencies", r`Joint: a cell divided by the grand total ($\frac{54}{200} = 27\%$ play a sport and prefer mornings). Marginal: a row or column total divided by the grand total ($\frac{120}{200} = 60\%$ play a sport). Conditional: a cell divided by its row or column total ($\frac{54}{120} = 45\%$ of athletes prefer mornings).`),
    text(r`Conditional relative frequencies answer "among this group, what fraction…?" They are the key to spotting an association. If the variables were unrelated, athletes and non-athletes would prefer mornings at about the same rate.`),
    example(r`Is there an association between playing a sport and class-time preference?`, [
      [r`P(\text{morning} \mid \text{sport}) = \tfrac{54}{120} = 45\%`, "Among athletes."],
      [r`P(\text{morning} \mid \text{no sport}) = \tfrac{26}{80} = 32.5\%`, "Among non-athletes."],
      [r`45\% \ne 32.5\%`, "Athletes are more likely to prefer mornings, so there is an association in this sample."],
    ], "An association doesn't prove that playing a sport causes the preference."),
    callout("warning", "Which total?", r`"What percent of athletes prefer mornings?" divides by the athletes' total (120). "What percent of morning-preferring students are athletes?" divides by the morning total (80): $\frac{54}{80} = 67.5\%$. The wording decides the denominator.`),
    callout("application", "Where this shows up", r`Medical studies compare outcome rates for treated and untreated groups, marketers compare purchase rates across age groups, and schools compare course choices by grade, all with two-way tables.`),
  ],
  questions: [
    num(1, r`Using the survey table, how many students prefer evening classes?`, 120, {}, ["Look at the column total."], r`120.`),
    num(2, r`What percent of all students do not play a sport and prefer evening classes? Enter just the number.`, 27, { unit: "%" }, [r`$\frac{54}{200}$.`], r`$54 \div 200 = 0.27 = 27\%$.`),
    num(2, r`What percent of non-athletes prefer evening classes? Enter just the number.`, 67.5, { unit: "%" }, [r`Divide by the non-athletes' total, 80.`], r`$54 \div 80 = 67.5\%$.`),
    num(2, r`What percent of students who prefer evening classes play a sport? Enter just the number.`, 55, { unit: "%" }, ["Divide by the evening total, 120."], r`$66 \div 120 = 55\%$.`),
    mc(3, r`In a survey, 30% of 7th graders and 31% of 8th graders chose soccer as their favorite sport. What does this suggest?`, ["A strong association between grade and choosing soccer", "Little or no association between grade and choosing soccer", "8th grade causes soccer preference", "The survey is wrong"], 1,
      ["Compare the conditional percentages."], r`The conditional percentages are nearly equal, so grade and choosing soccer appear unrelated in this sample.`, "review"),
    num(3, r`In a group, 40 of 100 adults own a cat. Of the cat owners, 25 also own a dog; of the others, 30 own a dog. What percent of dog owners also own a cat? Round to the nearest tenth.`, 45.5, { unit: "%", tolerance: 0.05 }, ["Dog owners: 25 + 30 = 55.", "Divide the 25 cat-and-dog owners by 55."], r`$25 \div 55 \approx 45.5\%$.`, "review"),
  ],
});
