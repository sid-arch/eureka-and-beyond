import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "t-test-mean",
  title: "Carrying out a test for a population mean",
  summary: "Carry out a one-sample t test for μ: hypotheses, conditions, t = (x̄ − μ₀)/(s/√n) with n − 1 df, P-value and conclusion. Paired data use the same test on differences.",
  minutes: 30,
  objectives: [
    "State hypotheses about μ and check the Random, 10% and Normal/Large Sample conditions.",
    "Compute the t statistic and P-value with n − 1 degrees of freedom.",
    "Apply the one-sample t test to paired differences.",
  ],
  concepts: [
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("The test statistic", r`$t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$, with $df = n - 1$. Find the P-value from a t table or technology.`),
    example(r`A machine should fill bottles with 500 mL. A random sample of 25 bottles has $\bar{x} = 497.8$ mL, $s = 5$ mL. Is the mean fill different from 500? $\alpha = 0.05$.`, [
      [r`H_0: \mu = 500,\ H_a: \mu \ne 500`, ""],
      [r`\text{Random; } n = 25 < 30 \text{, so check the sample's dot plot for strong skew or outliers}`, "Assume none."],
      [r`t = \frac{497.8 - 500}{5/\sqrt{25}} = -2.2,\ df = 24`, ""],
      [r`\text{P-value} = 2P(t_{24} \le -2.2) \approx 0.038`, ""],
      [r`0.038 < 0.05 \Rightarrow \text{reject } H_0`, "Convincing evidence the machine's mean fill differs from 500 mL."],
    ]),
    def("Paired t test", r`For paired data, compute the differences and test $H_0: \mu_{\text{diff}} = 0$ with a one-sample t test on the differences.`),
    callout("application", "Where this shows up", r`Regulators test whether mean emissions exceed a limit; coaches test whether training changed mean sprint times (paired, before and after).`),
  ],
  questions: [
    num(1, r`$\bar{x} = 52$, $\mu_0 = 50$, $s = 6$, $n = 36$. Find $t$.`, 2, {}, [], r`$\frac{2}{6/6} = 2$.`),
    mc(2, r`With $t = 2$ and $df = 35$, $H_a: \mu > 50$, the P-value is about…`, ["0.027", "0.05", "0.27", "0.0027"], 0, [], r`$P(t_{35} \ge 2) \approx 0.027$.`),
    mc(2, r`Ten students' scores are measured before and after a course. The right test is…`, ["Two-sample t", "One-sample t on the 10 differences", "Two-proportion z", "Chi-square"], 1, [], r`Paired data.`),
    mc(3, r`A t test with $n = 8$ is planned, and the data's dot plot shows a strong outlier. What should you do?`, ["Proceed normally", "Be cautious: the Normal condition is questionable, so the P-value may be unreliable", "Use z instead", "Double the sample"], 1, [], r`Small samples need roughly symmetric data without outliers.`, "review"),
  ],
});
