import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ideal-gas-law",
  title: "The ideal gas law",
  summary: "Relate pressure, volume, temperature and amount of a gas with PV = nRT, and recognize when real gases depart from it.",
  minutes: 40,
  objectives: [
    "Use the ideal gas law to find an unknown property of a gas.",
    "Derive Boyle's, Charles's and Gay-Lussac's laws as special cases.",
    "Convert temperatures to kelvin and choose R with consistent units.",
    "Explain the assumptions of the ideal gas model and when it fails.",
  ],
  concepts: [
    { slug: "gas-laws", name: "Gas laws", description: "Relationships among pressure, volume, temperature and amount of a gas.", subject: "subj_chem" },
    { slug: "kinetic-molecular-theory", name: "Kinetic molecular theory", description: "A model of gases as tiny particles in constant random motion with elastic collisions.", subject: "subj_chem" },
  ],
  formulas: ["ideal-gas-law", "combined-gas-law", "celsius-to-kelvin"],
  blocks: [
    formula(r`PV = nRT`, "The ideal gas law", r`$R = 0.08206$ L·atm/(mol·K) or $8.314$ J/(mol·K). Temperature must be in kelvin.`),
    text(r`The law combines four observations. At fixed $n$ and $T$, pressure and volume are inversely proportional (Boyle). At fixed $n$ and $P$, volume is proportional to absolute temperature (Charles). At fixed $n$ and $V$, pressure is proportional to absolute temperature (Gay-Lussac). And at fixed $P$ and $T$, volume is proportional to the amount of gas (Avogadro).`),
    def("Ideal gas", r`A model gas whose particles take up no volume and don't attract or repel each other, colliding elastically. Real gases behave nearly ideally at low pressure and high temperature.`),
    example(r`What volume does 0.500 mol of N₂ occupy at 25 °C and 1.20 atm?`, [
      [r`T = 25 + 273.15 = 298.15\ \text{K}`, "Always convert to kelvin."],
      [r`V = \frac{nRT}{P} = \frac{(0.500)(0.08206)(298.15)}{1.20}`, "Solve for V."],
      [r`V \approx 10.2\ \text{L}`, "Units: mol × L·atm/(mol·K) × K ÷ atm = L."],
    ]),
    example(r`A sealed 2.0 L can at 20 °C and 1.0 atm is heated to 300 °C. Find the new pressure.`, [
      [r`\frac{P_1}{T_1} = \frac{P_2}{T_2}`, "n and V are fixed, so P/T is constant."],
      [r`P_2 = 1.0 \times \frac{573.15}{293.15}`, "Both temperatures in kelvin."],
      [r`P_2 \approx 1.96\ \text{atm}`, "Nearly double: this is why aerosol cans warn against heat."],
    ], r`Using Celsius would give $1.0 \times \frac{300}{20} = 15$ atm, wildly wrong. Kelvin is required because pressure is proportional to absolute temperature.`),
    callout("warning", "When gases aren't ideal", r`At high pressure, molecules are close enough that their own volume matters, and at low temperature their attractions pull them together. Both make real behavior deviate from $PV = nRT$. Polar gases such as ammonia deviate more than noble gases like helium.`),
    callout("application", "Where this shows up", r`Car airbags inflate in milliseconds from a reaction that produces a calculated number of moles of nitrogen gas; the bag's volume is designed with $PV = nRT$. Weather balloons expand as they rise because outside pressure drops.`),
    activity("ideal-gas", { title: "Change the conditions" }),
    callout("tip", "Investigate", r`Hold temperature constant and halve the volume. What happens to pressure? Now hold pressure constant and double the kelvin temperature. Predict before you change each slider.`, "experiment"),
    activity("ideal-gas", {
      title: "Walkthrough: the gas laws as special cases",
      steps: [
        { title: "Starting point", body: "1.00 mol at 273 K in 22.4 L exerts about 1.00 atm.", params: { n: 1, T: 273.15, V: 22.4, hold: "T" } },
        { title: "Boyle's law", body: "Halve the volume at constant temperature: the pressure doubles to about 2.00 atm.", params: { n: 1, T: 273.15, V: 11.2, hold: "T" } },
        { title: "Gay-Lussac's law", body: "Back to 22.4 L, now at 546 K: doubling the kelvin temperature doubles the pressure.", params: { n: 1, T: 546.3, V: 22.4, hold: "V" } },
        { title: "Avogadro's law", body: "Twice the gas at 273 K and 22.4 L: twice the pressure.", params: { n: 2, T: 273.15, V: 22.4, hold: "V" } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`Convert 27 °C to kelvin (use 273.15).`, 300.15, { tolerance: 0.01, unit: "K" }, ["Add 273.15."], r`$27 + 273.15 = 300.15$ K.`),
    num(2, r`How many moles of gas occupy 5.00 L at 2.00 atm and 300 K? Use R = 0.08206 and give three significant figures.`, 0.406, { tolerance: 0.001, unit: "mol" },
      [r`$n = \frac{PV}{RT}$.`], r`$n = \frac{(2.00)(5.00)}{(0.08206)(300)} = \frac{10.0}{24.62} \approx 0.406$ mol.`),
    num(2, r`A gas occupies 4.0 L at 1.0 atm. At constant temperature, what volume does it occupy at 2.5 atm?`, 1.6, { tolerance: 0.01, unit: "L" },
      [r`Boyle: $P_1V_1 = P_2V_2$.`], r`$V_2 = \frac{1.0 \times 4.0}{2.5} = 1.6$ L.`),
    mc(2, r`At constant pressure, a balloon's temperature rises from 200 K to 400 K. Its volume:`, ["Halves", "Doubles", "Quadruples", "Stays the same"], 1,
      ["Charles's law: V ∝ T in kelvin."], r`Doubling the absolute temperature doubles the volume.`),
    mc(3, r`Under which conditions does a real gas behave most like an ideal gas?`, ["High P, low T", "Low P, high T", "High P, high T", "Low P, low T"], 1,
      ["When are particles far apart and moving fast?"], r`At low pressure the particles' own volume is negligible; at high temperature their attractions matter little.`, "review"),
    num(3, r`What is the molar mass of a gas if 1.60 g occupies 1.12 L at 273.15 K and 1.00 atm? (R = 0.08206; three significant figures.)`, 32, { tolerance: 0.2, unit: "g/mol" },
      [r`Find $n$ with $PV = nRT$, then $M = \frac{m}{n}$.`], r`$n = \frac{(1.00)(1.12)}{(0.08206)(273.15)} \approx 0.0500$ mol, so $M = \frac{1.60}{0.0500} \approx 32.0$ g/mol (consistent with O₂).`, "review"),
  ],
});
