import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "margin-of-error",
  title: "Margin of error",
  summary: "Use simulation and the normal model to understand sampling variability, compute and interpret a margin of error for a proportion, and see how sample size affects it.",
  minutes: 30,
  objectives: [
    "Explain sampling variability with simulation.",
    "Compute a 95% margin of error for a sample proportion.",
    "Interpret a confidence interval and explain how sample size affects precision.",
  ],
  concepts: [
    { slug: "sampling", name: "Sampling", description: "Choosing part of a population to learn about the whole.", subject: "subj_math" },
    { slug: "margin-of-error", name: "Margin of error", description: "How far a sample estimate is likely to be from the true population value.", subject: "subj_math" },
  ],
  formulas: ["margin-of-error"],
  blocks: [
    text(r`Two random samples from the same population almost never give exactly the same result. If you took many samples, the sample proportions would cluster around the true value in an approximately normal shape. The margin of error describes how wide that cluster is.`),
    def("Margin of error (95%)", r`For a random sample of size $n$ with proportion $\hat{p}$: $\text{ME} \approx 1.96\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$. A quick upper bound is $\frac{1}{\sqrt{n}}$. The interval $\hat{p} \pm \text{ME}$ is a 95% confidence interval.`),
    example(r`A random sample of 400 students finds 62% like the new schedule. Find the margin of error.`, [
      [r`1.96\sqrt{\frac{0.62 \cdot 0.38}{400}} \approx 1.96(0.0243) \approx 0.048`, ""],
      [r`62\% \pm 4.8\% \Rightarrow (57.2\%, 66.8\%)`, ""],
    ], "Interpretation: we're 95% confident the true proportion of all students is between 57.2% and 66.8%."),
    activity("normal-distribution", { title: "About 95% within 1.96 standard deviations", params: { mu: 0, sigma: 1, lo: -1.96, hi: 1.96 } }),
    callout("warning", "What 95% means", r`It describes the method: about 95% of intervals made this way would contain the true value. It does not cover bias; a biased sample can be precisely wrong.`),
    callout("application", "Where this shows up", r`News polls report "plus or minus 3 points," which corresponds to about 1,000 people (since $1/\sqrt{1000} \approx 0.032$). Quadrupling the sample size only halves the margin.`),
  ],
  questions: [
    num(2, r`Estimate the worst-case 95% margin of error for a sample of 2,500, as a percent.`, 2, { unit: "%" }, [r`$1/\sqrt{2500}$.`], r`$0.02 = 2\%$.`),
    num(2, r`A sample of 100 has $\hat{p} = 0.5$. Find the 95% margin of error, to three decimals.`, 0.098, { tolerance: 0.0006 }, [r`$1.96\sqrt{0.25/100}$.`], r`$1.96 \cdot 0.05 = 0.098$.`),
    mc(2, r`To cut the margin of error in half, the sample size must be…`, ["doubled", "halved", "quadrupled", "unchanged"], 2, [r`ME is proportional to $1/\sqrt{n}$.`], r`$\sqrt{4} = 2$.`),
    mc(3, r`A poll says 48% ± 3%. Which conclusion is best?`, ["Exactly 48% agree", "The true value is likely between 45% and 51%", "A majority definitely disagrees", "The poll is wrong"], 1, [], r`The interval includes values on both sides of 50%.`, "review"),
  ],
});
