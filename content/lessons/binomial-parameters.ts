import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "binomial-parameters",
  title: "Parameters for a binomial distribution",
  summary: "Compute and interpret the mean and standard deviation of a binomial random variable, describe its shape, and decide when a normal approximation is reasonable.",
  minutes: 25,
  objectives: [
    "Compute μ = np and σ = √(np(1 − p)) and interpret them in context.",
    "Describe how the shape depends on p and n.",
    "Use the Large Counts condition np ≥ 10 and n(1 − p) ≥ 10 for a normal approximation.",
  ],
  concepts: [
    { slug: "random-variables", name: "Random variables", description: "Numerical outcomes of random processes, described by probability distributions with a mean and standard deviation.", subject: "subj_math" },
  ],
  formulas: ["binomial-probability"],
  blocks: [
    def("Mean and SD", r`For $X \sim B(n, p)$: $\mu_X = np$ and $\sigma_X = \sqrt{np(1 - p)}$.`),
    example(r`40% of a town's voters support a candidate. Poll 50 at random; $X$ = number of supporters.`, [
      [r`\mu = 50(0.4) = 20`, "On average, 20 supporters in samples of 50."],
      [r`\sigma = \sqrt{50 \cdot 0.4 \cdot 0.6} = \sqrt{12} \approx 3.46`, "Counts typically vary by about 3.5 from 20."],
    ]),
    def("Shape", r`Symmetric when $p = 0.5$; skewed right when $p$ is small; skewed left when $p$ is large. As $n$ grows the shape becomes approximately normal; a common check is $np \ge 10$ and $n(1 - p) \ge 10$.`),
    callout("tip", "Using the normal approximation", r`With the example above ($np = 20$, $n(1 - p) = 30$), $P(X \ge 27) \approx P\left(Z \ge \frac{27 - 20}{3.46}\right) = P(Z \ge 2.02) \approx 0.022$. Technology gives the exact binomial value.`),
    callout("application", "Where this shows up", r`Airlines overbook flights using the binomial mean and SD of no-shows.`),
  ],
  questions: [
    num(1, r`$n = 80$, $p = 0.25$. Find $\mu$.`, 20, {}, [], r`$80(0.25) = 20$.`),
    num(2, r`$n = 80$, $p = 0.25$. Find $\sigma$ to two decimal places.`, 3.87, { tolerance: 0.01 }, [], r`$\sqrt{80 \cdot 0.25 \cdot 0.75} = \sqrt{15} \approx 3.87$.`),
    mc(2, r`$n = 30$, $p = 0.1$. The binomial distribution is…`, ["approximately normal", "skewed right", "skewed left", "uniform"], 1, [r`$np = 3$.`], r`Small $p$ and $np < 10$: skewed right.`),
    mc(3, r`For which setting is a normal approximation reasonable?`, ["n = 20, p = 0.3", "n = 200, p = 0.03", "n = 100, p = 0.4", "n = 50, p = 0.9"], 2, [], r`$np = 40$ and $n(1 - p) = 60$, both at least 10.`, "review"),
  ],
});
