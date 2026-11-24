import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "connecting-f-derivatives",
  title: "Connecting a function, its first derivative and its second derivative",
  summary: "Summarize how the signs of f′ and f″ determine a graph's shape, read all three from tables and graphs, and give AP-style justifications.",
  minutes: 25,
  objectives: [
    "Match graphs of f, f′ and f″.",
    "Combine sign information from f′ and f″ to describe a graph.",
    "Justify claims using the correct derivative.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
    { slug: "concavity", name: "Concavity", description: "Whether a function's rate of change is increasing (concave up) or decreasing (concave down).", subject: "subj_math" },
  ],
  blocks: [
    def("The four shapes", r`$f' > 0, f'' > 0$: increasing, concave up (rising faster). $f' > 0, f'' < 0$: increasing, concave down (rising slower). $f' < 0, f'' > 0$: decreasing, concave up (falling slower). $f' < 0, f'' < 0$: decreasing, concave down (falling faster).`),
    example(r`Given a graph of $f'$ only`, [
      [r`\text{sign of } f' \to \text{where } f \text{ rises or falls}`, ""],
      [r`\text{slope of } f' \to \text{sign of } f'' \to \text{concavity of } f`, ""],
      [r`\text{zeros of } f' \text{ with sign change} \to \text{extrema of } f`, ""],
    ]),
    callout("warning", "Use the right graph", r`If you're given the graph of $f'$, "f is increasing because the graph is going up" is wrong: you must point to $f' > 0$ (the graph of $f'$ is above the axis).`),
    callout("application", "Where this shows up", r`Economic reports talk about growth (first derivative) slowing or speeding up (second derivative); a recession starts when growth turns negative.`),
  ],
  questions: [
    mc(1, r`$f' < 0$ and $f'' > 0$ on an interval. The graph of $f$ is…`, ["rising faster", "rising slower", "falling, but less steeply", "falling more steeply"], 2, [], r`Decreasing and concave up.`),
    mc(2, r`A population's growth rate is positive but decreasing. Which signs apply?`, ["P′ > 0, P″ > 0", "P′ > 0, P″ < 0", "P′ < 0, P″ > 0", "P′ < 0, P″ < 0"], 1, [], r`Increasing population, slowing growth.`),
    mc(2, r`The graph of $f''$ crosses from positive to negative at $x = 5$. At $x = 5$, $f$ has…`, ["a relative max", "an inflection point", "a relative min", "a zero"], 1, [], r`Concavity changes.`),
    mc(3, r`Given only the graph of $f'$, which feature identifies a relative minimum of $f$?`, ["A minimum of the f′ graph", "Where the f′ graph crosses the x-axis from below to above", "Where the f′ graph crosses the x-axis from above to below", "Where the f′ graph is lowest"], 1, [], r`$f'$ changes from negative to positive.`, "review"),
  ],
});
