import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "log-data-modeling",
  title: "Logarithmic function context and data modeling",
  summary: "Recognize logarithmic data (equal output increases over equal input factors), build log models, and use logarithmic scales such as pH and earthquake magnitude.",
  minutes: 25,
  objectives: [
    "Identify logarithmic patterns in data: inputs multiply while outputs add.",
    "Build a model of the form y = a + b log x or y = a + b ln x.",
    "Interpret logarithmic scales in science contexts.",
  ],
  concepts: [
    { slug: "logarithms", name: "Logarithms", description: "Exponents: log_b x is the power of b that gives x.", subject: "subj_math" },
  ],
  formulas: ["log-properties"],
  blocks: [
    def("Logarithmic data", r`If multiplying the input by a constant factor adds a constant amount to the output, a logarithmic model $y = a + b\log x$ fits. Logarithmic models rise quickly at first and then ever more slowly, without a bound.`),
    example(r`$x$: 1, 10, 100, 1000 and $y$: 2, 5, 8, 11`, [
      [r`\times 10 \text{ in } x \Rightarrow +3 \text{ in } y`, "Log pattern."],
      [r`y = 2 + 3\log x`, r`At $x = 1$, $\log 1 = 0$, so $a = 2$.`],
      [r`y(10^4) = 2 + 3 \cdot 4 = 14`, "Prediction."],
    ]),
    example(r`pH $= -\log[\mathrm{H^+}]$. Find the pH when $[\mathrm{H^+}] = 2.5 \times 10^{-5}$.`, [
      [r`-\log(2.5) - \log(10^{-5}) = -0.398 + 5`, ""],
      [r`\text{pH} \approx 4.60`, ""],
    ]),
    activity("exp-log", { title: "The log grows slowly", params: { b: 3 } }, "experiment"),
    callout("application", "Where this shows up", r`Earthquake magnitude, decibels and pH are logarithmic: each 1-unit step on the Richter scale is a 10-fold change in measured wave amplitude, and each 10 dB step is a 10-fold change in sound intensity.`),
  ],
  questions: [
    num(1, r`Find the pH of a solution with $[\mathrm{H^+}] = 10^{-3}$.`, 3, {}, [], r`$-\log 10^{-3} = 3$.`),
    num(2, r`Using $y = 2 + 3\log x$, find $y$ when $x = 100{,}000$.`, 17, {}, [], r`$\log 10^5 = 5$, so $y = 17$.`),
    num(2, r`Two earthquakes differ by 2 on the Richter scale. How many times larger is the wave amplitude of the larger one?`, 100, {}, [], r`$10^2 = 100$.`),
    mc(3, r`Which data set is best modeled by a logarithmic function?`, ["x: 1, 2, 3, 4; y: 3, 6, 12, 24", "x: 1, 2, 4, 8; y: 5, 7, 9, 11", "x: 1, 2, 3, 4; y: 1, 4, 9, 16", "x: 1, 2, 3, 4; y: 2, 4, 6, 8"], 1, ["Look for inputs that multiply while outputs add."], r`Doubling $x$ adds 2 to $y$: $y = 5 + 2\log_2 x$.`, "review"),
  ],
});
