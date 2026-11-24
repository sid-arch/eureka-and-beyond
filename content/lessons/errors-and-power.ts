import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "errors-and-power",
  title: "Errors and power in significance tests",
  summary: "Describe Type I and Type II errors and their consequences in context, connect α to the Type I error rate, and explain what increases the power of a test.",
  minutes: 25,
  objectives: [
    "Define Type I and Type II errors and describe each in context.",
    "Recognize that P(Type I error) = α when H₀ is true.",
    "Explain how sample size, α and effect size affect power.",
  ],
  concepts: [
    { slug: "significance-tests", name: "Significance tests", description: "Procedures that use sample data to weigh evidence against a claim about a population parameter.", subject: "subj_math" },
  ],
  blocks: [
    def("Type I and Type II errors", r`Type I error: rejecting $H_0$ when it's true (a false alarm). Type II error: failing to reject $H_0$ when $H_a$ is true (a missed effect). If $H_0$ is true, the probability of a Type I error is $\alpha$.`),
    def("Power", r`Power is the probability that the test correctly rejects $H_0$ when a specific alternative is true: power $= 1 - P(\text{Type II error})$.`),
    example(r`A factory tests $H_0$: the machine is working correctly, vs $H_a$: it's out of calibration.`, [
      [r`\text{Type I: stop a working machine}`, "Cost: lost production."],
      [r`\text{Type II: keep running a faulty machine}`, "Cost: defective products shipped."],
    ]),
    def("Increasing power", r`Power goes up with a larger sample size, a larger $\alpha$ (at the cost of more Type I errors), a larger true effect (the farther the truth is from $H_0$), and less variability in the data.`),
    callout("application", "Where this shows up", r`Clinical trials are planned with a target power, often 80% or 90%, by choosing enough patients to detect the smallest effect that would matter medically.`),
  ],
  questions: [
    mc(1, r`A Type I error is…`, ["Failing to reject a false H₀", "Rejecting a true H₀", "Using the wrong test", "A calculation mistake"], 1, [], r`A false alarm.`),
    mc(2, r`A medical test checks $H_0$: no disease. A Type II error means…`, ["A healthy person is told they have the disease", "A sick person is told they're healthy", "The test is too expensive", "The result is correct"], 1, [], r`Failing to reject $H_0$ when the disease is present.`),
    mc(2, r`Which change increases power without changing α?`, ["Decreasing n", "Increasing n", "Using a two-sided test instead of one-sided", "Rounding the data"], 1, [], r`A larger sample makes the sampling distribution narrower, so real effects stand out.`),
    mc(3, r`Lowering α from 0.05 to 0.01 does what to the chance of a Type II error?`, ["Decreases it", "Increases it", "No effect", "Makes it zero"], 1, [], r`A stricter standard makes rejecting harder, so more real effects are missed.`, "review"),
  ],
});
