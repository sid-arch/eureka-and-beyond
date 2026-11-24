import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "exponential-data-modeling",
  title: "Exponential function context and data modeling",
  summary: "Recognize exponential data from constant ratios, build growth and decay models from two points or a half-life, and interpret the parameters in context.",
  minutes: 30,
  objectives: [
    "Test data for an exponential pattern using successive ratios.",
    "Build models from an initial value and a growth factor, a percent rate, or a doubling time or half-life.",
    "Interpret a and b in context and use the model to predict.",
  ],
  concepts: [
    { slug: "exponential-functions", name: "Exponential functions", description: "Functions of the form y = a·bˣ that change by a constant factor.", subject: "subj_math" },
  ],
  formulas: ["exponential-function"],
  blocks: [
    def("Exponential data", r`If equally spaced inputs give outputs with a (roughly) constant ratio, an exponential model $y = a b^x$ fits. Here $a$ is the initial value and $b$ the growth factor per unit; $b = 1 + r$ for a percent rate $r$.`),
    example(r`A culture has 200 cells at $t = 0$ h and 450 at $t = 2$ h. Model and predict $t = 5$.`, [
      [r`200b^2 = 450,\ b^2 = 2.25,\ b = 1.5`, "50% growth per hour."],
      [r`N(t) = 200 \cdot 1.5^t`, ""],
      [r`N(5) = 200 \cdot 7.59375 \approx 1519`, "cells"],
    ]),
    example(r`A drug dose of 80 mg has a half-life of 6 h. How much remains after 15 h?`, [
      [r`A(t) = 80\left(\tfrac{1}{2}\right)^{t/6}`, ""],
      [r`A(15) = 80 \cdot 0.5^{2.5} \approx 14.1`, "mg"],
    ]),
    activity("growth-models", { title: "Constant factor, step by step", params: { a: 2, b: 1.5, d: 3, compare: true } }, "experiment"),
    callout("tip", "Check the ratio", r`Compute successive ratios $y_{n+1}/y_n$. Real data won't give identical ratios; roughly constant is the signal. Then a regression (on a calculator or by fitting $\ln y$ against $x$ with a line) gives the best $a$ and $b$.`),
    callout("application", "Where this shows up", r`Compound interest, viral spread in early outbreaks, radioactive dating and cooling (as a difference from room temperature) all use exponential models.`),
  ],
  questions: [
    mc(1, r`Outputs 5, 15, 45, 135 at $x = 0, 1, 2, 3$. What is the growth factor?`, ["3", "10", "5", "1.5"], 0, [], r`Each output is 3 times the last.`),
    num(2, r`1000 dollars grows at 4% per year: $1000(1.04)^t$. Find the value after 10 years, to the nearest dollar.`, 1480, { tolerance: 1, unit: "dollars" }, [], r`$1000 \cdot 1.04^{10} \approx 1480.24$.`),
    num(2, r`A town of 12,000 shrinks by 3% per year. What is the decay factor $b$?`, 0.97, { tolerance: 0.0001 }, [], r`$1 - 0.03 = 0.97$.`),
    num(3, r`A substance has a half-life of 10 years. What fraction remains after 30 years? Give a decimal.`, 0.125, { tolerance: 0.0001 }, [], r`$(1/2)^3 = 0.125$.`),
    mc(3, r`In $P(t) = 850(1.12)^t$, what does 850 represent?`, ["The growth rate", "The population when t = 0", "The population after 12 years", "The maximum population"], 1, [], r`$P(0) = 850$, the initial value.`, "review"),
  ],
});
