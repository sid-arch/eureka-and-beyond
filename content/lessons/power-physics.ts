import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "power-physics",
  title: "Power",
  summary: "Define power as the rate of doing work, compute it in watts with P = W/t and P = Fv, and relate it to everyday ratings.",
  minutes: 20,
  objectives: [
    "Compute P = W/t in watts.",
    "Use P = Fv for a constant force at constant speed.",
    "Convert between watts, kilowatts and horsepower.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["work-energy"],
  blocks: [
    def("Power", r`Power is the rate of energy transfer: $P = \frac{W}{t}$, in watts (1 W = 1 J/s). For a force $F$ moving something at speed $v$ along the force, $P = Fv$. 1 horsepower ≈ 746 W.`),
    example(r`Lifting a 50 kg crate 3 m in 2 s`, [
      [r`W = 50(9.8)(3) = 1470\ \text{J}`, ""],
      [r`P = \tfrac{1470}{2} = 735\ \text{W}`, "About 1 horsepower."],
    ]),
    example(r`A car's engine pushes with 2000 N at 25 m/s`, [
      [r`P = 2000(25) = 50{,}000\ \text{W} = 50\ \text{kW}`, ""],
    ]),
    callout("application", "Where this shows up", r`Electricity bills charge for energy in kilowatt-hours: a 1000 W heater running for 1 hour uses 1 kWh = 3.6 million joules.`),
  ],
  questions: [
    num(1, r`A motor does 6000 J of work in 20 s. Find its power, in watts.`, 300, { unit: "W" }, [], r`$\frac{6000}{20}$.`),
    num(2, r`A 60 kg student climbs 4 m of stairs in 5 s. Find her power, in watts, to one decimal place.`, 470.4, { tolerance: 0.1, unit: "W" }, [], r`$\frac{60(9.8)(4)}{5} = 470.4$.`),
    num(2, r`How much energy, in kWh, does a 1500 W hair dryer use in 10 minutes?`, 0.25, { tolerance: 0.001, unit: "kWh" }, [], r`$1.5\ \text{kW} \times \frac{1}{6}$ h.`),
    mc(3, r`Two cranes lift identical loads to the same height; crane A takes half the time. Crane A…`, ["does twice the work", "has twice the power", "does half the work", "has half the power"], 1, [], r`Same work, half the time.`, "review"),
  ],
});
