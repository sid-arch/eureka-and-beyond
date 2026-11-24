import { callout, def, example, formula, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "chi-square-goodness-of-fit",
  title: "The chi-square goodness of fit test",
  summary: "Test whether a categorical variable's distribution matches a hypothesized distribution, using expected counts, the chi-square statistic and k − 1 degrees of freedom.",
  minutes: 30,
  objectives: [
    "State hypotheses about a claimed distribution.",
    "Compute expected counts and the chi-square statistic.",
    "Find the P-value with k − 1 degrees of freedom and conclude.",
  ],
  concepts: [
    { slug: "chi-square", name: "Chi-square tests", description: "Tests comparing observed counts with expected counts for categorical data.", subject: "subj_math" },
  ],
  blocks: [
    formula(r`\chi^2 = \sum \frac{(\text{observed} - \text{expected})^2}{\text{expected}}`, "Chi-square statistic", "Larger values mean observed counts are farther from what H₀ predicts."),
    def("Conditions and df", r`Random sample; 10% condition; all expected counts at least 5. Degrees of freedom: number of categories minus 1. P-value: area to the right of $\chi^2$ under the chi-square distribution.`),
    example(r`Is a die fair? 60 rolls give counts 8, 9, 12, 11, 6, 14 for faces 1 to 6.`, [
      [r`H_0: \text{each face has probability } \tfrac{1}{6}`, "Expected count 10 each (all ≥ 5)."],
      [r`\chi^2 = \tfrac{4 + 1 + 4 + 1 + 16 + 16}{10} = 4.2`, ""],
      [r`df = 5,\ \text{P-value} \approx 0.52`, ""],
      [r`\text{fail to reject } H_0`, "No convincing evidence the die is unfair."],
    ]),
    callout("application", "Where this shows up", r`Geneticists test whether offspring match Mendel's predicted ratios, and auditors test whether digits follow an expected pattern.`),
  ],
  questions: [
    num(1, r`200 trials, hypothesized proportion 0.25 for one category. Find its expected count.`, 50, {}, [], r`$200(0.25) = 50$.`),
    num(2, r`Observed 30, expected 25. Find this category's contribution to $\chi^2$.`, 1, {}, [], r`$\frac{25}{25} = 1$.`),
    num(2, r`A test has 4 categories. How many degrees of freedom?`, 3, {}, [], r`$4 - 1 = 3$.`),
    mc(3, r`$\chi^2 = 10.5$ with $df = 3$. Using the critical value 7.81 at $\alpha = 0.05$, you…`, ["reject H₀", "fail to reject H₀", "need more categories", "accept H₀"], 0, [], r`$10.5 > 7.81$ (P-value ≈ 0.015).`, "review"),
  ],
});
