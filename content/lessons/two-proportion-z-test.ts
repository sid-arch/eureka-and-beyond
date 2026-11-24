import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "two-proportion-z-test",
  title: "Testing for a difference in two population proportions",
  summary: "Carry out a two-sample z test for p₁ − p₂ using the pooled proportion, from hypotheses through conditions, P-value and a conclusion in context.",
  minutes: 30,
  objectives: [
    "State H₀: p₁ = p₂ and an appropriate alternative.",
    "Compute the pooled proportion and the z statistic.",
    "Conclude in context, including scope of inference.",
  ],
  concepts: [
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("The test", r`$z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\hat{p}_c(1 - \hat{p}_c)\left(\frac{1}{n_1} + \frac{1}{n_2}\right)}}$ with $\hat{p}_c = \frac{x_1 + x_2}{n_1 + n_2}$. Large Counts: $n_1\hat{p}_c$, $n_1(1 - \hat{p}_c)$, $n_2\hat{p}_c$, $n_2(1 - \hat{p}_c)$ all at least 10.`),
    example(r`Randomized experiment: 120 of 200 improved on a new drug, 90 of 200 on the standard. Does the new drug work better? $\alpha = 0.05$.`, [
      [r`H_0: p_N = p_S,\ H_a: p_N > p_S`, ""],
      [r`\hat{p}_c = \tfrac{210}{400} = 0.525`, "Counts: 105 and 95 in each group, all ≥ 10."],
      [r`SE = \sqrt{0.525 \cdot 0.475 \cdot \tfrac{2}{200}} \approx 0.0499`, ""],
      [r`z = \frac{0.60 - 0.45}{0.0499} \approx 3.00,\ \text{P-value} \approx 0.0013`, ""],
      [r`\text{reject } H_0`, "Convincing evidence the new drug causes a higher improvement rate for subjects like these."],
    ]),
    callout("application", "Where this shows up", r`A/B tests on websites run this test on conversion rates before a company switches designs.`),
  ],
  questions: [
    num(1, r`$x_1 = 30$, $n_1 = 100$, $x_2 = 50$, $n_2 = 150$. Find $\hat{p}_c$.`, 0.32, { tolerance: 0.001 }, [], r`$\frac{80}{250} = 0.32$.`),
    mc(2, r`Why use the pooled proportion in the test?`, ["It's always more accurate", "H₀ assumes p₁ = p₂, so we estimate the common value", "It makes z larger", "It's required for intervals"], 1, [], r`The calculation assumes the null hypothesis.`),
    num(2, r`A two-proportion test gives $z = 1.75$ for $H_a: p_1 \ne p_2$. Find the P-value to three decimal places.`, 0.08, { tolerance: 0.002 }, [r`$P(Z > 1.75) \approx 0.040$.`], r`Two-sided: $2(0.0401) \approx 0.080$.`),
    mc(3, r`Two random samples (not an experiment) show a significant difference in voting rates between age groups. The conclusion should say…`, ["Age causes the difference", "The population proportions differ", "There's no difference", "The samples are biased"], 1, [], r`Random samples allow generalization, not causation.`, "review"),
  ],
});
