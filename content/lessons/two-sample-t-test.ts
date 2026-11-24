import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "two-sample-t-test",
  title: "Carrying out a test for the difference of two population means",
  summary: "Carry out a two-sample t test of H₀: μ₁ = μ₂ with independent samples or groups, using technology degrees of freedom or the conservative choice, and conclude in context.",
  minutes: 30,
  objectives: [
    "Check conditions for both groups.",
    "Compute t = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂) and its P-value.",
    "Distinguish two-sample from paired situations.",
  ],
  concepts: [
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("The test", r`$t = \frac{(\bar{x}_1 - \bar{x}_2) - 0}{\sqrt{s_1^2/n_1 + s_2^2/n_2}}$. Technology gives the degrees of freedom (often not a whole number); the conservative choice is the smaller of $n_1 - 1$ and $n_2 - 1$, which gives a slightly larger P-value.`),
    example(r`Plant growth (cm) with fertilizer: $n_1 = 20$, $\bar{x}_1 = 15.2$, $s_1 = 3$. Without: $n_2 = 20$, $\bar{x}_2 = 13.0$, $s_2 = 4$. Random assignment. $H_a: \mu_1 \ne \mu_2$, $\alpha = 0.05$.`, [
      [r`SE = \sqrt{\tfrac{9}{20} + \tfrac{16}{20}} = \sqrt{1.25} \approx 1.118`, ""],
      [r`t = \frac{2.2}{1.118} \approx 1.97`, ""],
      [r`df \approx 35.2 \text{ (technology)},\ \text{P-value} \approx 0.057`, "Conservative df = 19 gives about 0.064."],
      [r`0.057 > 0.05 \Rightarrow \text{fail to reject } H_0`, "Not convincing evidence that the fertilizer changes mean growth."],
    ]),
    callout("warning", "Failing to reject isn't proving no effect", r`A real effect of about 2 cm is still plausible; a larger experiment might detect it.`),
    callout("application", "Where this shows up", r`Clinical trials comparing mean blood pressure between treatment groups and education studies comparing two teaching methods use this test.`),
  ],
  questions: [
    num(2, r`$\bar{x}_1 - \bar{x}_2 = 3$, $s_1 = 6$, $n_1 = 36$, $s_2 = 8$, $n_2 = 64$. Find $t$ to two decimal places.`, 2.12, { tolerance: 0.01 }, [r`$SE = \sqrt{1 + 1}$.`], r`$\frac{3}{1.414} \approx 2.12$.`),
    mc(2, r`The conservative degrees of freedom for $n_1 = 15$, $n_2 = 22$ are…`, ["14", "21", "35", "37"], 0, [], r`The smaller of 14 and 21.`),
    mc(2, r`Ten twins are split so one twin of each pair gets diet A and the other diet B. Which test fits?`, ["Two-sample t", "Paired t", "Chi-square", "z for proportions"], 1, [], r`Twins form natural pairs.`),
    mc(3, r`A two-sample t test gives P-value 0.21. The best conclusion is…`, ["The means are equal", "There's no convincing evidence the means differ", "The means differ by 21%", "Reject H₀"], 1, [], r`Large P-value: not convincing evidence; never "accept" $H_0$.`, "review"),
  ],
});
