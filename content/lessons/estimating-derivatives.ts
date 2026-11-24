import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "estimating-derivatives",
  title: "Estimating derivatives at a point",
  summary: "Estimate derivatives from tables and graphs using difference quotients, choose the best interval around the point, and interpret the estimate with units.",
  minutes: 25,
  objectives: [
    "Estimate f′(a) from a table using the closest values on either side of a.",
    "Estimate a derivative from a graph by drawing a tangent line.",
    "State the estimate with correct units and interpret it in context.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("Estimating from a table", r`If $a$ is between two table values $x_1 < a < x_2$, use $f'(a) \approx \frac{f(x_2) - f(x_1)}{x_2 - x_1}$. Use the closest values available; a symmetric interval around $a$ usually gives the best estimate.`),
    example(r`Coffee temperature $T(t)$ in °C, $t$ in minutes: $T(0) = 90$, $T(5) = 60$, $T(10) = 52$, $T(15) = 46$. Estimate $T'(7)$.`, [
      [r`T'(7) \approx \frac{T(10) - T(5)}{10 - 5} = \frac{52 - 60}{5}`, "Closest values around 7."],
      [r`= -1.6 \ \text{°C per minute}`, "At t = 7 the coffee is cooling about 1.6 °C per minute."],
    ]),
    def("Estimating from a graph", r`Sketch the tangent line at the point, pick two points on it far apart, and compute its slope.`),
    callout("tip", "Units", r`The units of $f'(x)$ are (units of $f$) per (unit of $x$). Always include them.`),
    callout("application", "Where this shows up", r`Weather services estimate how fast pressure is falling from hourly readings: a derivative estimated from a table, used to forecast storms.`),
  ],
  questions: [
    num(1, r`Using the coffee table, estimate $T'(12)$ in °C per minute.`, -1.2, { tolerance: 0.001, unit: "°C/min" }, [], r`$\frac{46 - 52}{5} = -1.2$.`),
    num(2, r`$x$: 1, 2, 4, 5 and $f(x)$: 3, 7, 13, 14. Estimate $f'(3)$.`, 3, {}, [], r`$\frac{13 - 7}{4 - 2} = 3$.`),
    mc(2, r`$P(t)$ is a population in thousands, $t$ in years. $P'(4) \approx 2.5$ means…`, ["The population is 2,500", "At t = 4 the population is growing about 2,500 people per year", "The population grows 2.5% per year", "In 4 years it will be 2,500"], 1, [], r`Units: thousands of people per year.`),
    mc(3, r`For estimating $f'(2)$, which table interval is usually best?`, ["[0, 4]", "[1, 3]", "[2, 6]", "[1, 10]"], 1, [], r`Short and centered on 2.`, "review"),
  ],
});
