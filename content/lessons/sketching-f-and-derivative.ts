import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sketching-f-and-derivative",
  title: "Sketching graphs of functions and their derivatives",
  summary: "Sketch the graph of f′ from a graph of f and sketch a possible f from a graph of f′, using slopes, extrema and concavity.",
  minutes: 25,
  objectives: [
    "Sketch f′ from f: zeros of f′ at horizontal tangents, sign from increase or decrease.",
    "Sketch f from f′: extrema where f′ changes sign, inflection points at extrema of f′.",
    "Recognize that f is determined by f′ only up to a vertical shift.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("From f to f′", r`Where $f$ has a horizontal tangent, $f'$ crosses or touches 0. Where $f$ rises, $f'$ is above the axis; where it falls, below. Where $f$ is steepest, $f'$ has its largest magnitude.`),
    def("From f′ to f", r`Where $f'$ changes sign, $f$ has a relative extremum. Where $f'$ has a maximum or minimum, $f$ has an inflection point. Any vertical shift of $f$ has the same $f'$.`),
    example(r`$f'$ is a downward parabola with zeros at 0 and 4`, [
      [r`f' < 0 \text{ for } x < 0,\ f' > 0 \text{ on } (0, 4),\ f' < 0 \text{ for } x > 4`, ""],
      [r`f \text{ has a relative min at } 0 \text{ and a relative max at } 4`, ""],
      [r`f' \text{ peaks at } x = 2 \Rightarrow \text{inflection point of } f`, ""],
    ]),
    activity("derivative-graph", { title: "Match f to f′", params: { fn: "sin", a: 1.57 } }),
    callout("tip", "Try this", r`Before moving the slider, predict the shape of the lower graph from the upper one. Check yourself with each function.`, "experiment"),
    callout("application", "Where this shows up", r`A velocity graph from a fitness tracker can be turned into a rough position graph, and vice versa, using exactly these ideas.`),
  ],
  questions: [
    mc(1, r`$f$ has a relative maximum at $x = 2$ and is differentiable. On the graph of $f'$, at $x = 2$…`, ["f′ has a maximum", "f′ crosses the axis from above to below", "f′ crosses from below to above", "f′ is undefined"], 1, [], r`$f'$ changes from positive to negative.`),
    mc(2, r`$f'$ has a relative minimum at $x = -1$. Then $f$ has…`, ["a relative min at −1", "an inflection point at −1", "a relative max at −1", "a zero at −1"], 1, [], r`$f''$ changes sign there.`),
    mc(2, r`$f(x)$ and $g(x) = f(x) + 7$ have derivatives that are…`, ["the same", "differ by 7", "differ by 7x", "unrelated"], 0, [], r`The derivative of a constant is 0.`),
    mc(3, r`$f'$ is positive and decreasing on $(1, 3)$. Then on $(1, 3)$, $f$ is…`, ["increasing and concave up", "increasing and concave down", "decreasing and concave up", "decreasing and concave down"], 1, [], r`$f' > 0$: increasing; $f'$ decreasing: concave down.`, "review"),
  ],
});
