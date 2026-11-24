import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "accumulation-of-change",
  title: "Exploring accumulations of change",
  summary: "Interpret the area between a rate graph and the axis as the accumulated (net) change in a quantity, with units and signs.",
  minutes: 25,
  objectives: [
    "Explain why area under a rate-of-change graph gives total change.",
    "Compute accumulated change from rate graphs made of simple shapes.",
    "Treat area below the axis as negative change.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Rate × time = change", r`If a rate is constant, change = rate × time: a rectangle's area under the rate graph. For a varying rate, the (signed) area under the rate graph still gives the net change. Units: (rate units) × (input units).`),
    example(r`Water flows into a tank at $r(t) = 10 - t$ gallons per minute for $0 \le t \le 10$.`, [
      [r`\text{area of the triangle} = \tfrac{1}{2}(10)(10) = 50`, ""],
      [r`\text{the tank gains 50 gallons}`, "gal/min × min = gal."],
    ]),
    example(r`A walker's velocity is $3 - t$ m/s for $0 \le t \le 5$.`, [
      [r`\text{area above (0 to 3): } \tfrac{1}{2}(3)(3) = 4.5`, "Moving forward."],
      [r`\text{area below (3 to 5): } \tfrac{1}{2}(2)(2) = 2`, "Moving back."],
      [r`\text{net change in position } 4.5 - 2 = 2.5 \text{ m}`, "Total distance walked is 6.5 m."],
    ]),
    activity("accumulation", { title: "Velocity builds displacement", params: { fn: "velocity", x: 3 } }),
    callout("tip", "Try this", r`Sweep $x$ past 3: the walker turns around, the area turns orange, and the lower graph starts going back down.`, "experiment"),
    callout("application", "Where this shows up", r`Utility meters accumulate a rate (kilowatts, liters per second) into a total (kilowatt-hours, liters): physically measuring the area under a rate curve.`),
  ],
  questions: [
    num(1, r`A car travels at a constant 25 m/s for 8 s. How far does it go, in meters?`, 200, { unit: "m" }, [], r`$25 \times 8 = 200$.`),
    num(2, r`For the walker ($v = 3 - t$ on $[0, 5]$), what total distance is walked, in meters?`, 6.5, { tolerance: 0.001, unit: "m" }, [], r`$4.5 + 2 = 6.5$.`),
    num(2, r`A rate is 4 L/h for 2 hours, then −1 L/h for 3 hours. What is the net change, in liters?`, 5, { unit: "L" }, [], r`$8 - 3 = 5$.`),
    mc(3, r`A graph shows the rate at which people enter a stadium, in people per minute, against time in minutes. The area under it from 0 to 30 represents…`, ["The rate at minute 30", "The number of people who entered in the first 30 minutes", "The average rate", "People per minute squared"], 1, [], r`(people/min) × min = people.`, "review"),
  ],
});
