import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "function-model-selection",
  title: "Function model selection and assumption articulation",
  summary: "Choose linear, quadratic, polynomial, exponential, logarithmic, rational or sinusoidal models from data patterns and context, and state the assumptions and limits of each model.",
  minutes: 25,
  objectives: [
    "Select a function type from patterns in data (differences, ratios, periodicity, asymptotes).",
    "Justify a model choice using the context.",
    "State the assumptions behind a model and the domain where it's reasonable.",
  ],
  concepts: [
    { slug: "function-families", name: "Function families", description: "Groups of functions that share a parent function and its basic shape.", subject: "subj_math" },
  ],
  blocks: [
    def("Clues for choosing a model", r`Constant differences → linear. Constant second differences → quadratic. Constant ratios → exponential. Rapid early change that levels off with no bound → logarithmic. Repeating cycles → sinusoidal. Behavior near a forbidden value or a leveling-off value → rational.`),
    example(r`A savings account earns a fixed percent each year`, [
      [r`\text{constant ratio of balances}`, "Exponential model."],
      [r`\text{assumption: the rate never changes and no withdrawals}`, "State assumptions explicitly."],
    ]),
    example(r`Hours of daylight over a year in Chicago`, [
      [r`\text{repeats every 365 days}`, "Sinusoidal model."],
    ]),
    callout("warning", "Every model has a domain", r`A linear model of a child's height breaks down at adulthood; an exponential model of a population ignores limited resources. Say where the model applies.`),
    callout("application", "Where this shows up", r`Scientists, economists and engineers choose models by matching data patterns and the mechanism behind the data, then check residuals to see if the model fits.`),
  ],
  questions: [
    mc(1, r`Data have outputs that double each step. Which model fits?`, ["Linear", "Quadratic", "Exponential", "Sinusoidal"], 2, [], r`Constant ratio.`),
    mc(2, r`The height of a point on a spinning wheel over time is best modeled by…`, ["Linear", "Exponential", "Sinusoidal", "Logarithmic"], 2, [], r`It repeats periodically.`),
    mc(2, r`The perceived loudness of a sound grows quickly at low intensities and slowly at high ones, without bound. Which model?`, ["Logarithmic", "Exponential", "Quadratic", "Rational"], 0, [], r`That's the logarithmic pattern (the decibel scale).`),
    mc(3, r`A linear model predicts a car's value falls 2,000 dollars per year from 20,000. What's an unstated assumption?`, ["The car is red", "Depreciation is constant each year and value never goes below 0", "The car appreciates", "Prices are exponential"], 1, [], r`A linear model assumes a constant rate, and it only makes sense up to year 10.`, "review"),
  ],
});
