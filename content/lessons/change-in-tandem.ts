import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "change-in-tandem",
  title: "Change in tandem",
  summary: "Describe how input and output values change together, using increasing and decreasing behavior and whether the rate of change is itself increasing or decreasing (concavity).",
  minutes: 25,
  objectives: [
    "Describe a function as increasing or decreasing from a graph, table or context.",
    "Identify whether the rate of change is increasing or decreasing (concave up or down).",
    "Locate relative extrema and points of inflection where behavior changes.",
  ],
  concepts: [
    { slug: "rate-of-change", name: "Average rate of change", description: "The change in output divided by the change in input over an interval.", subject: "subj_math" },
    { slug: "concavity", name: "Concavity", description: "Whether a function's rate of change is increasing (concave up) or decreasing (concave down).", subject: "subj_math" },
  ],
  blocks: [
    def("Change in tandem", r`A function describes how outputs change as inputs change. As $x$ increases, the output can increase or decrease, and the rate at which it does so can itself grow or shrink.`),
    def("Concavity", r`A graph is concave up where its rate of change is increasing (it bends upward, like a cup) and concave down where its rate of change is decreasing. A point of inflection is where concavity changes.`),
    example(r`Table: $x$ = 0, 1, 2, 3, 4 and $y$ = 2, 5, 9, 14, 20`, [
      [r`\Delta y: 3, 4, 5, 6`, "y is increasing."],
      [r`\text{the differences increase}`, "The rate of change is increasing: concave up."],
    ]),
    example(r`A cup of coffee cools: 90°, 75°, 64°, 56°, 51° at 5-minute intervals`, [
      [r`\Delta: -15, -11, -8, -5`, "Decreasing."],
      [r`\text{the decreases shrink}`, "Rate of change increasing (toward 0): concave up."],
    ]),
    callout("application", "Where this shows up", r`"Sales are rising, but more slowly" describes an increasing function that's concave down. News and business reports describe concavity all the time without the word.`),
  ],
  questions: [
    mc(1, r`$y$ values 10, 8, 5, 1 for equally spaced $x$. The function is…`, ["Increasing, concave up", "Decreasing, concave down", "Decreasing, concave up", "Increasing, concave down"], 1, [r`Differences −2, −3, −4.`], r`Decreasing, and the rate is decreasing (more negative): concave down.`),
    mc(2, r`A population grows, but each year it adds fewer people than the year before. Its graph is…`, ["Increasing, concave up", "Increasing, concave down", "Decreasing, concave up", "Linear"], 1, [], r`Increasing with a decreasing rate: concave down.`),
    mc(2, r`Where on $y = x^3$ is the point of inflection?`, ["(1, 1)", "(0, 0)", "(−1, −1)", "None"], 1, [], r`Concave down for $x < 0$ and up for $x > 0$.`),
    mc(3, r`A car's speed is increasing at a decreasing rate. Which describes its distance-time graph at that time?`, ["Increasing, concave up", "Increasing, concave down", "Decreasing", "Constant"], 0, ["Speed is the rate of change of distance."], r`Distance increases, and its rate (speed) is increasing: concave up. (The speed graph itself is concave down.)`, "review"),
  ],
});
