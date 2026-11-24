import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "real-gases",
  title: "Deviation from ideal gas law",
  summary: "Explain when and why real gases deviate from PV = nRT, and use the van der Waals equation to correct for particle volume and attractions.",
  minutes: 30,
  objectives: [
    "Identify the conditions (high pressure, low temperature) where gases deviate from ideal behavior.",
    "Explain the effects of particle volume and intermolecular attraction.",
    "Use the van der Waals equation for a real-gas pressure.",
  ],
  concepts: [
    { slug: "gas-laws", name: "Gas laws", description: "Relationships among pressure, volume, temperature and amount of a gas.", subject: "subj_chem" },
  ],
  formulas: ["ideal-gas-law"],
  blocks: [
    def("Two corrections", r`Attractions pull particles away from the walls, so the real pressure is lower than ideal. At very high pressure, the particles' own volume takes up space, so the real volume is larger than ideal. Both matter most at high pressure and low temperature, and for large, polar molecules.`),
    def("van der Waals", r`$\left(P + \frac{an^2}{V^2}\right)(V - nb) = nRT$, where $a$ measures attractions and $b$ the particles' size.`),
    example(r`1.00 mol of CO₂ in 1.00 L at 300 K (a = 3.59 L²·atm/mol², b = 0.0427 L/mol)`, [
      [r`P_{ideal} = \tfrac{(1.00)(0.08206)(300)}{1.00} = 24.6\ \text{atm}`, ""],
      [r`P_{vdW} = \tfrac{24.6}{1.00 - 0.0427} - 3.59 \approx 22.1\ \text{atm}`, "Attractions dominate: about 10% lower."],
    ]),
    activity("ideal-gas", { title: "The ideal baseline" }),
    callout("application", "Where this shows up", r`High-pressure gas cylinders, natural-gas pipelines and refrigerants all need real-gas corrections.`),
  ],
  questions: [
    mc(2, r`Which gas behaves most ideally at room conditions?`, ["NH₃", "H₂O vapor", "He", "CO₂"], 2, ["Ideal behavior needs tiny particles with negligible attractions. Which choice is small and nonpolar?"], r`Small and nonpolar.`),
    mc(2, r`Real gases deviate most at…`, ["high T, low P", "low T, high P", "STP", "in a vacuum"], 1, ["Deviations grow when particles are crowded together and moving slowly."], r`Particles are close and slow.`),
    num(3, r`Find P_vdW for 1.00 mol of N₂ in 1.00 L at 300 K (a = 1.39, b = 0.0391), to one decimal place.`, 24.2, { tolerance: 0.1, unit: "atm" }, ["Use (P + a n²/V²)(V − nb) = nRT and solve for P.", "P = nRT/(V − nb) − a n²/V², with R = 0.08206."], r`$\frac{24.62}{0.9609} - 1.39 \approx 24.2$.`),
    mc(3, r`When intermolecular attractions dominate, the measured pressure is…`, ["higher than ideal", "lower than ideal", "equal to ideal", "zero"], 1, ["Attractions tug a particle back just before it hits the wall. Does it hit harder or softer?"], r`Particles hit the walls less hard.`, "review"),
  ],
});
