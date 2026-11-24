import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "derivative-in-context",
  title: "Interpreting the meaning of the derivative in context",
  summary: "Interpret f′(a) in a real situation with the correct units, sign and time or input reference, and distinguish it from f(a) and from average rates.",
  minutes: 20,
  objectives: [
    "Write a complete interpretation of f′(a): what changes, how fast, in what units, at what input.",
    "Explain what a positive, negative or zero derivative means in context.",
    "Avoid interpreting a rate as an amount.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("A complete interpretation", r`"At [input value with units], [output quantity] is [increasing/decreasing] at a rate of [|f′(a)|] [output units] per [input unit]." The units of $f'$ are output units divided by input units.`),
    example(r`$V(t)$ is the water in a tank, in liters, $t$ minutes after noon. $V'(3) = -2$.`, [
      [r`\text{units: liters per minute}`, ""],
      [r`\text{at 12:03 p.m., the water is decreasing at 2 L/min}`, "Not 'the tank has 2 liters' and not 'it lost 2 liters over 3 minutes.'"],
    ]),
    example(r`$C(q)$ is the cost in dollars of making $q$ bicycles. $C'(100) = 85$.`, [
      [r`\text{when 100 bikes are being made, cost rises about 85 dollars per additional bike}`, "So the 101st bike costs about 85 dollars."],
    ]),
    callout("warning", "Rate vs amount", r`$V(3)$ is an amount (liters). $V'(3)$ is a rate (liters per minute). Mixing them up is the most common error.`),
    callout("application", "Where this shows up", r`Economists call derivatives "marginal" quantities; physicians read the rate of change of a drug level, not just the level, to adjust doses.`),
  ],
  questions: [
    mc(1, r`$h(t)$ is a plant's height in cm, $t$ in days. The units of $h'(t)$ are…`, ["cm", "days", "cm per day", "days per cm"], 2, [], r`Output units per input unit.`),
    mc(2, r`$P(t)$ is a town's population, $t$ years after 2020. $P'(5) = -120$ means…`, ["The population in 2025 was −120", "In 2025 the population was decreasing at about 120 people per year", "The population fell 120 people from 2020 to 2025", "The population will be 120 in 5 years"], 1, [], r`A rate at the moment $t = 5$.`),
    mc(2, r`$T(x)$ is the temperature in °C at depth $x$ meters in a lake, and $T'(10) = -0.4$. Which is correct?`, ["At 10 m deep, the water is 0.4 °C", "At 10 m deep, temperature drops about 0.4 °C per additional meter of depth", "The lake cools 0.4 °C per hour", "At 10 m the temperature is decreasing over time"], 1, [], r`The input is depth, not time.`),
    mc(3, r`$C'(100) = 85$ for bicycle cost. Which is the best estimate of the cost of making 101 bikes, if $C(100) = 20{,}000$?`, ["85 dollars", "20,000 dollars", "20,085 dollars", "28,500 dollars"], 2, [], r`$C(101) \approx C(100) + C'(100)(1)$.`, "review"),
  ],
});
