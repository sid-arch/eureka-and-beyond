import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "chi-square-independence",
  title: "The chi-square test for independence",
  summary: "Test whether two categorical variables are associated in a population, using a single random sample classified by both variables.",
  minutes: 30,
  objectives: [
    "Distinguish independence (one sample, two variables) from homogeneity (several samples, one variable).",
    "Carry out the test and interpret the P-value.",
    "State conclusions about association, not causation.",
  ],
  concepts: [
    { slug: "chi-square", name: "Chi-square tests", description: "Tests comparing observed counts with expected counts for categorical data.", subject: "subj_math" },
  ],
  blocks: [
    def("Hypotheses", r`$H_0$: there is no association between the two variables in the population (they're independent). $H_a$: there is an association.`),
    example(r`200 randomly chosen students: plays a sport and grade B or above 50; sport and below B 30; no sport and B or above 50; no sport and below B 70.`, [
      [r`\text{totals: sport 80, no sport 120; B+ 100, below 100}`, ""],
      [r`\text{expected: } 40, 40, 60, 60`, ""],
      [r`\chi^2 = \tfrac{10^2}{40} + \tfrac{10^2}{40} + \tfrac{10^2}{60} + \tfrac{10^2}{60}`, "Every cell is off by 10."],
      [r`\chi^2 \approx 8.33`, "2.5 + 2.5 + 1.67 + 1.67"],
      [r`df = 1,\ \text{P-value} \approx 0.004`, ""],
      [r`\text{reject } H_0`, "Convincing evidence of an association between playing a sport and grades among the school's students; no causal claim."],
    ]),
    callout("application", "Where this shows up", r`Survey researchers test whether opinions are associated with age group, region or education level.`),
  ],
  questions: [
    mc(1, r`One random sample of adults is classified by smoking status and exercise level. Which test?`, ["Homogeneity", "Independence", "Goodness of fit", "Paired t"], 1, [], r`One sample, two categorical variables.`),
    mc(2, r`What does the null hypothesis say?`, ["The variables are associated", "There is no association between the variables in the population", "The sample is random", "The means are equal"], 1, [], r`Independence.`),
    num(2, r`A 2 × 3 independence test: how many degrees of freedom?`, 2, {}, [], r`$(2 - 1)(3 - 1) = 2$.`),
    mc(3, r`An independence test from a random sample finds a significant association. You can conclude…`, ["One variable causes the other", "The variables are associated in the population", "Nothing", "The sample is biased"], 1, [], r`Random sampling supports generalization, not causation.`, "review"),
  ],
});
