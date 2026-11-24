import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "function-model-construction",
  title: "Function model construction and application",
  summary: "Build linear, quadratic, exponential and piecewise models from data points or a context, use them to predict, and judge predictions with residuals.",
  minutes: 30,
  objectives: [
    "Construct a model through given points by solving for its parameters.",
    "Build piecewise models when a context changes rules.",
    "Use residuals to judge how well a model fits and when predictions are reasonable.",
  ],
  concepts: [
    { slug: "function-families", name: "Function families", description: "Groups of functions that share a parent function and its basic shape.", subject: "subj_math" },
    { slug: "linear-models", name: "Linear models", description: "Using y = mx + b to describe a quantity that changes at a constant rate.", subject: "subj_math" },
  ],
  blocks: [
    def("Constructing a model", r`Pick a function type, then use known points (or a regression on many points) to find its parameters. A model with $n$ parameters needs at least $n$ points to pin down exactly.`),
    example(r`Quadratic through $(0, 2)$, $(1, 5)$ and $(2, 12)$`, [
      [r`c = 2`, "From (0, 2)."],
      [r`a + b = 3,\ 4a + 2b = 10`, "Substitute the other points."],
      [r`a = 2,\ b = 1:\ y = 2x^2 + x + 2`, ""],
    ], r`Check $x = 2$: $8 + 2 + 2 = 12$.`),
    example(r`Exponential through $(0, 50)$ and $(3, 400)$`, [
      [r`a = 50,\ 50b^3 = 400`, ""],
      [r`b^3 = 8,\ b = 2:\ y = 50 \cdot 2^x`, ""],
    ]),
    example(r`A phone plan: 30 dollars for up to 5 GB, then 10 dollars per extra GB`, [
      [r`C(g) = \begin{cases} 30 & 0 \le g \le 5 \\ 30 + 10(g - 5) & g > 5 \end{cases}`, "Piecewise model."],
    ]),
    def("Residuals", r`A residual is actual minus predicted. Small residuals with no pattern suggest a good fit; a curved pattern suggests the wrong function type.`),
    callout("warning", "Extrapolation", r`Predictions far outside the data range are risky: the pattern may not continue.`),
    callout("application", "Where this shows up", r`Epidemiologists fit models to early case counts, then check residuals each week to see whether the model still fits.`),
  ],
  questions: [
    num(1, r`A linear model passes through $(2, 7)$ and $(6, 19)$. What does it predict at $x = 10$?`, 31, {}, ["Slope (19 − 7)/(6 − 2)."], r`Slope 3; $y = 3x + 1$; $3(10) + 1 = 31$.`),
    num(2, r`A model predicts 12.5 and the actual value is 14. What is the residual?`, 1.5, { tolerance: 0.001 }, [], r`$14 - 12.5 = 1.5$.`),
    num(2, r`An exponential model $y = ab^x$ passes through $(0, 3)$ and $(2, 75)$ with $b > 0$. Find $b$.`, 5, {}, [], r`$3b^2 = 75$, $b^2 = 25$, $b = 5$.`),
    num(2, r`Using the phone plan above, what does 8 GB cost, in dollars?`, 60, { unit: "dollars" }, [], r`$30 + 10(3) = 60$.`),
    mc(3, r`Residuals from a linear model are positive at both ends of the data and negative in the middle. What does that suggest?`, ["The linear model fits well", "A curved model, such as a quadratic, would fit better", "The data have no pattern", "The slope is wrong but the type is right"], 1, [], r`A U-shaped residual pattern means the data curve upward away from the line.`, "review"),
  ],
});
