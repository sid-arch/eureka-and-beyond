import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "significance-test-idea",
  title: "The idea of a significance test",
  summary: "State null and alternative hypotheses, interpret a P-value as the probability of results at least as extreme if the null is true, and draw conclusions using a significance level.",
  minutes: 30,
  objectives: [
    "Write hypotheses H₀ and Hₐ about a parameter.",
    "Interpret a P-value in context.",
    "Make and state a conclusion by comparing the P-value with α.",
  ],
  concepts: [
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  formulas: ["z-score"],
  blocks: [
    def("Hypotheses", r`The null hypothesis $H_0$ is the claim of "no effect" or "no difference," such as $p = 0.5$. The alternative $H_a$ is what we're looking for evidence of, such as $p > 0.5$. Hypotheses are always about parameters.`),
    def("P-value", r`Assuming $H_0$ is true, the P-value is the probability of getting a statistic at least as extreme as the one observed. Small P-values are evidence against $H_0$.`),
    def("Conclusions", r`Choose a significance level $\alpha$ (often 0.05) in advance. If P-value $< \alpha$, reject $H_0$: there is convincing evidence for $H_a$. Otherwise, fail to reject $H_0$: the evidence isn't convincing. We never "accept" $H_0$.`),
    example(r`Is a coin biased toward heads? 100 flips give 61 heads.`, [
      [r`H_0: p = 0.5,\ H_a: p > 0.5`, ""],
      [r`\text{SD of } \hat{p} \text{ under } H_0 = \sqrt{\tfrac{0.5 \cdot 0.5}{100}} = 0.05`, ""],
      [r`z = \frac{0.61 - 0.5}{0.05} = 2.2,\ \text{P-value} = P(Z \ge 2.2) \approx 0.014`, ""],
      [r`0.014 < 0.05 \Rightarrow \text{reject } H_0`, "Convincing evidence the coin favors heads."],
    ]),
    callout("warning", "What a P-value is not", r`A P-value of 0.014 doesn't mean there's a 1.4% chance $H_0$ is true. It's the chance of data this extreme if $H_0$ were true.`),
    callout("application", "Where this shows up", r`Drug trials, A/B tests on websites, and quality audits all use significance tests to decide whether an observed difference is bigger than chance alone would produce.`),
  ],
  questions: [
    mc(1, r`A company claims 90% of customers are satisfied; you suspect fewer are. The alternative hypothesis is…`, [r`$p = 0.9$`, r`$p > 0.9$`, r`$p < 0.9$`, r`$\hat{p} < 0.9$`], 2, [], r`$H_a$ states what you're seeking evidence for, about the parameter $p$.`),
    mc(2, r`P-value = 0.08 and $\alpha = 0.05$. The conclusion is…`, ["Reject H₀", "Fail to reject H₀", "Accept H₀", "Accept Hₐ"], 1, [], r`$0.08 > 0.05$: the evidence isn't convincing at that level.`),
    num(2, r`Under $H_0: p = 0.5$ with $n = 100$, a sample gives $\hat{p} = 0.58$. Find $z$.`, 1.6, { tolerance: 0.001 }, [], r`$\frac{0.58 - 0.5}{0.05} = 1.6$.`),
    mc(3, r`A P-value of 0.003 means…`, ["H₀ has a 0.3% chance of being true", "If H₀ were true, results this extreme would happen about 0.3% of the time", "The effect is large", "The sample is biased"], 1, [], r`The P-value is computed assuming $H_0$ is true; it says nothing directly about effect size.`, "review"),
  ],
});
