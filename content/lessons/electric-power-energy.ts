import { callout, def, example, lesson, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electric-power-energy",
  title: "Electric power and energy",
  summary: "Compute electric power with P = IV, I²R and V²/R, convert energy to kilowatt-hours and estimate electricity costs.",
  minutes: 25,
  objectives: [
    "Use P = IV, P = I²R and P = V²/R.",
    "Convert between joules and kilowatt-hours.",
    "Estimate the cost of running household devices.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  blocks: [
    def("Electric power", r`Power is the rate of energy transfer: $P = IV$. Combining with Ohm's law gives $P = I^2R = \frac{V^2}{R}$. Power is measured in watts (1 W = 1 J/s).`),
    def("Kilowatt-hours", r`Utilities bill energy in kilowatt-hours: $1\ \text{kWh} = 1000\ \text{W} \times 3600\ \text{s} = 3.6 \times 10^6\ \text{J}$. Energy = power × time.`),
    example(r`A 60 W bulb on a 120 V circuit`, [
      [r`I = \tfrac{P}{V} = \tfrac{60}{120} = 0.5\ \text{A}`, ""],
      [r`R = \tfrac{V}{I} = 240\ \Omega`, ""],
    ]),
    example(r`Monthly cost: the bulb runs 5 h/day for 30 days at 15 cents per kWh`, [
      [r`E = 0.060\ \text{kW} \times 150\ \text{h} = 9\ \text{kWh}`, ""],
      [r`\text{cost} = 9 \times 0.15 = \$1.35`, ""],
    ]),
    callout("application", "Where this shows up", r`An LED bulb gives the same light as a 60 W incandescent at about 9 W, so swapping cuts that cost by 85%. Circuit breakers trip when total current (total power ÷ 120 V) exceeds about 15–20 A.`),
  ],
  questions: [
    num(1, r`A toaster draws 10 A at 120 V. Find its power.`, 1200, { unit: "W" }, [], r`$10 \times 120$.`),
    num(2, r`A 2 Ω heater carries 5 A. Find its power.`, 50, { unit: "W" }, [], r`$I^2R = 25 \times 2$.`),
    num(2, r`A 1500 W space heater runs 4 hours. How many kWh does it use?`, 6, { unit: "kWh" }, [], r`$1.5 \times 4$.`),
    num(3, r`At 12 cents per kWh, what does running a 100 W TV for 3 hours a day for 30 days cost, in dollars?`, 1.08, { tolerance: 0.01, unit: "dollars" }, [], r`$0.1 \times 90 = 9$ kWh, then $9 \times 0.12$.`, "review"),
  ],
});
