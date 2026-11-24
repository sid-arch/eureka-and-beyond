import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "t-distributions",
  title: "Introducing statistics: should I worry about error?",
  summary: "Understand standard error and why estimating σ with s calls for t distributions; read t* critical values for different degrees of freedom.",
  minutes: 25,
  objectives: [
    "Distinguish standard deviation, standard error and margin of error.",
    "Describe how t distributions differ from the standard normal.",
    "Find t* for a confidence level and degrees of freedom.",
  ],
  concepts: [
    { slug: "confidence-intervals", name: "Confidence intervals", description: "Intervals of plausible values for a population parameter, built from sample data with a stated confidence level.", subject: "subj_math" },
  ],
  blocks: [
    def("Standard error", r`When we estimate the standard deviation of a statistic from data, we call it a standard error. For $\bar{x}$: $SE = \frac{s}{\sqrt{n}}$. It describes how far $\bar{x}$ typically is from $\mu$.`),
    def("t distributions", r`$t = \frac{\bar{x} - \mu}{s/\sqrt{n}}$ follows a $t$ distribution with $n - 1$ degrees of freedom. It's symmetric about 0 with heavier tails than the normal, because $s$ varies from sample to sample. As df grows, $t$ approaches $z$.`),
    example(r`95% critical values`, [
      [r`df = 5: t^* = 2.571;\ df = 10: 2.228;\ df = 30: 2.042`, ""],
      [r`z^* = 1.960`, "The t values shrink toward z* as df grows."],
    ]),
    callout("tip", "Three kinds of 'error'", r`Standard deviation: spread of the data. Standard error: estimated spread of a statistic. Margin of error: critical value × standard error, the half-width of an interval. None of them accounts for bias.`),
    callout("application", "Where this shows up", r`William Gosset developed the t distribution at the Guinness brewery to make reliable decisions from small samples of barley and beer.`),
  ],
  questions: [
    num(1, r`$s = 12$, $n = 9$. Find the standard error of $\bar{x}$.`, 4, {}, [], r`$\frac{12}{3} = 4$.`),
    mc(1, r`How many degrees of freedom for a one-sample t procedure with $n = 20$?`, ["20", "19", "21", "18"], 1, [], r`$n - 1$.`),
    mc(2, r`Compared with the standard normal, a t distribution with 4 df has…`, ["lighter tails", "heavier tails", "a different center", "no symmetry"], 1, [], r`More probability in the tails.`),
    mc(3, r`Margin of error accounts for…`, ["sampling variability only", "bias from nonresponse", "wording bias", "all errors"], 0, [], r`It reflects random sampling variability, not bias.`, "review"),
  ],
});
