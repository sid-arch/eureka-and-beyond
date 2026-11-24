import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "comparing-two-means",
  title: "Comparing two means",
  summary: "Estimate and test the difference between two population means with two-sample t procedures, and distinguish them from paired data.",
  minutes: 30,
  objectives: [
    "Compute the standard error √(s₁²/n₁ + s₂²/n₂) and a two-sample t statistic.",
    "Build and interpret a t interval for μ₁ − μ₂.",
    "Recognize paired data, which call for a one-sample analysis of differences.",
  ],
  concepts: [
    { slug: "confidence-intervals", name: "Confidence intervals", description: "Intervals of plausible values for a population parameter, built from sample data with a stated confidence level.", subject: "subj_math" },
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("Two-sample t procedures", r`Interval: $(\bar{x}_1 - \bar{x}_2) \pm t^*\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$. Test of $H_0: \mu_1 = \mu_2$: $t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{s_1^2/n_1 + s_2^2/n_2}}$. Technology gives the degrees of freedom; a conservative choice is the smaller of $n_1 - 1$ and $n_2 - 1$.`),
    example(r`Test scores. Method A: $n_1 = 30$, $\bar{x}_1 = 78$, $s_1 = 10$. Method B: $n_2 = 35$, $\bar{x}_2 = 72$, $s_2 = 12$. Test $H_a: \mu_1 \ne \mu_2$.`, [
      [r`SE = \sqrt{\tfrac{100}{30} + \tfrac{144}{35}} = \sqrt{3.333 + 4.114} \approx 2.73`, ""],
      [r`t = \frac{6}{2.73} \approx 2.20`, ""],
      [r`\text{P-value} \approx 0.04 \ (df = 29 \text{ conservative})`, "Less than 0.05: convincing evidence the mean scores differ."],
    ]),
    def("Paired data", r`If the two measurements come in natural pairs (same person before and after, twins, matched subjects), compute each pair's difference and use one-sample t procedures on the differences. Treating paired data as two independent samples wastes the pairing.`),
    callout("application", "Where this shows up", r`Agricultural trials compare mean yields of two varieties; studies of training programs compare before-and-after scores with paired t procedures.`),
  ],
  questions: [
    num(1, r`$\bar{x}_1 = 54$ and $\bar{x}_2 = 49$. Find the observed difference $\bar{x}_1 - \bar{x}_2$.`, 5, {}, [], r`$54 - 49 = 5$.`),
    num(2, r`$s_1 = 4$, $n_1 = 16$, $s_2 = 3$, $n_2 = 9$. Find the standard error to three decimal places.`, 1.414, { tolerance: 0.001 }, [], r`$\sqrt{\frac{16}{16} + \frac{9}{9}} = \sqrt{2} \approx 1.414$.`),
    mc(2, r`Each of 20 students takes a test before and after tutoring. Which procedure fits?`, ["Two-sample t", "Paired t on the differences", "Two-proportion z", "Binomial"], 1, [], r`The measurements are paired by student.`),
    mc(3, r`A 95% interval for $\mu_1 - \mu_2$ is (2.1, 9.8). Which is true?`, ["The means are equal", "μ₁ is plausibly larger by about 2 to 10 units", "μ₂ is larger", "The test would fail to reject"], 1, [], r`The interval lies entirely above 0.`, "review"),
  ],
});
