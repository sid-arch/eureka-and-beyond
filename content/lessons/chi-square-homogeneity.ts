import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "chi-square-homogeneity",
  title: "The chi-square test for homogeneity",
  summary: "Test whether the distribution of a categorical variable is the same in several populations or treatment groups, using separate random samples or random assignment.",
  minutes: 30,
  objectives: [
    "Recognize homogeneity settings: several samples or groups, one categorical variable.",
    "Carry out the test with expected counts and (r − 1)(c − 1) df.",
    "Interpret results, including which cells contribute most.",
  ],
  concepts: [
    { slug: "chi-square", name: "Chi-square tests", description: "Tests comparing observed counts with expected counts for categorical data.", subject: "subj_math" },
  ],
  blocks: [
    def("Hypotheses", r`$H_0$: the distribution of the variable is the same in all populations (or treatments). $H_a$: the distributions are not all the same.`),
    example(r`Randomized experiment: 60 of 100 improved on a treatment, 40 of 100 on a placebo.`, [
      [r`\text{expected: 50 improve, 50 don't, in each group}`, "All ≥ 5."],
      [r`\chi^2 = 4 \cdot \frac{10^2}{50} = 8`, "Each cell contributes 2."],
      [r`df = 1,\ \text{P-value} \approx 0.005`, ""],
      [r`\text{reject } H_0`, "Convincing evidence the improvement distribution differs between treatment and placebo; with random assignment, the treatment causes the difference."],
    ]),
    callout("tip", "Follow-up", r`Look at the components $\frac{(O - E)^2}{E}$: the largest ones show where the distributions differ most.`),
    callout("application", "Where this shows up", r`Researchers compare the distribution of political party, product preference or side effects across several groups.`),
  ],
  questions: [
    mc(1, r`Random samples are taken from three high schools and students report their favorite subject. Which test?`, ["Goodness of fit", "Homogeneity", "Independence", "Two-sample t"], 1, [], r`Several samples, one categorical variable.`),
    num(2, r`Observed 45, expected 36. Find the component of $\chi^2$.`, 2.25, { tolerance: 0.001 }, [], r`$\frac{81}{36} = 2.25$.`),
    num(2, r`A homogeneity test compares 4 groups on a 3-category variable. Find df.`, 6, {}, [], r`$(3 - 1)(4 - 1) = 6$.`),
    mc(3, r`A homogeneity test gives P-value 0.30. Conclusion?`, ["The distributions are identical", "No convincing evidence the distributions differ", "Reject H₀", "The groups are biased"], 1, [], r`Large P-value: fail to reject.`, "review"),
  ],
});
