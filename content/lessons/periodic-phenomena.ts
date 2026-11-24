import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "periodic-phenomena",
  title: "Periodic phenomena",
  summary: "Describe repeating patterns with period, amplitude and midline, and read these features from graphs, tables and situations such as Ferris wheels and tides.",
  minutes: 25,
  objectives: [
    "Define a periodic function and identify its period.",
    "Find the amplitude and midline from maximum and minimum values.",
    "Use one period of behavior to predict values far in the future.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  blocks: [
    def("Periodic function", r`A function $f$ is periodic if there is a positive number $p$ with $f(x + p) = f(x)$ for all $x$. The smallest such $p$ is the period. Knowing one period of the graph tells you the whole graph.`),
    def("Amplitude and midline", r`For a periodic function that oscillates between a maximum $M$ and a minimum $m$: the midline is $y = \frac{M + m}{2}$ and the amplitude is $\frac{M - m}{2}$.`),
    example(r`A Ferris wheel 40 m across has its center 25 m above the ground and turns once every 8 minutes.`, [
      [r`M = 45,\ m = 5`, "Top and bottom of the wheel."],
      [r`\text{midline } y = 25,\ \text{amplitude } 20`, ""],
      [r`\text{period } 8 \text{ min}`, "A rider's height repeats every 8 minutes."],
    ]),
    example(r`A rider is at the bottom at $t = 0$. Where are they at $t = 26$ minutes?`, [
      [r`26 = 3 \cdot 8 + 2`, "Three full turns plus 2 minutes."],
      [r`2 \text{ min} = \tfrac{1}{4} \text{ turn}`, "Halfway up: at the midline, 25 m."],
    ]),
    callout("application", "Where this shows up", r`Tides, daylight hours, heartbeats, sound waves and alternating current are all periodic. Engineers and scientists describe them by period (or frequency) and amplitude.`),
  ],
  questions: [
    num(1, r`A periodic function has maximum 18 and minimum 4. What is its amplitude?`, 7, {}, [], r`$\frac{18 - 4}{2} = 7$.`),
    num(1, r`For the same function, the midline is $y = ?$`, 11, {}, [], r`$\frac{18 + 4}{2} = 11$.`),
    num(2, r`$f$ has period 6 and $f(2) = 5$. Find $f(20)$.`, 5, {}, ["20 − 2 is a multiple of 6."], r`$20 = 2 + 3 \cdot 6$, so $f(20) = f(2) = 5$.`),
    mc(2, r`A tide is high at 4:00 a.m. and the next high is at 4:24 p.m. What is the period?`, ["12 h 24 min", "6 h 12 min", "24 h", "12 h"], 0, [], r`From high to the next high is one full period.`),
    num(3, r`On the Ferris wheel above (starting at the bottom at $t = 0$), what is the rider's height in meters at $t = 12$ minutes?`, 45, { unit: "m" }, [], r`12 = 8 + 4: half a turn past the bottom, so at the top, 45 m.`, "review"),
  ],
});
