import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "pressure-gas-laws",
  title: "Pressure and the gas laws",
  summary: "Convert pressure units and apply Boyle's, Charles's, Gay-Lussac's and the combined gas law, always with kelvin temperatures.",
  minutes: 35,
  objectives: [
    "Convert among atm, mmHg (torr) and kPa.",
    "Apply Boyle's (P₁V₁ = P₂V₂), Charles's (V/T) and Gay-Lussac's (P/T) laws.",
    "Use the combined gas law, P₁V₁/T₁ = P₂V₂/T₂.",
  ],
  concepts: [
    { slug: "gas-laws", name: "Gas laws", description: "Relationships among pressure, volume, temperature and amount of a gas.", subject: "subj_chem" },
  ],
  formulas: ["combined-gas-law", "celsius-to-kelvin"],
  blocks: [
    def("Pressure", r`Pressure is force per area from gas particles hitting walls. $1\ \text{atm} = 760\ \text{mmHg} = 760\ \text{torr} = 101.325\ \text{kPa}$. A barometer balances the atmosphere against a column of mercury.`),
    def("The laws", r`For a fixed amount of gas: Boyle, $P_1V_1 = P_2V_2$ (constant T); Charles, $\frac{V_1}{T_1} = \frac{V_2}{T_2}$ (constant P); Gay-Lussac, $\frac{P_1}{T_1} = \frac{P_2}{T_2}$ (constant V). Combined: $\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}$, with T in kelvin.`),
    example(r`2.0 L of gas at 1.0 atm and 273 K is changed to 0.50 atm and 300 K`, [
      [r`V_2 = V_1\tfrac{P_1}{P_2}\tfrac{T_2}{T_1} = 2.0\left(\tfrac{1.0}{0.50}\right)\left(\tfrac{300}{273}\right)`, ""],
      [r`V_2 \approx 4.4\ \text{L}`, ""],
    ]),
    activity("ideal-gas", { title: "Hold one variable fixed" }),
    callout("application", "Where this shows up", r`Scuba tanks (Boyle: air expands as divers rise), hot-air balloons (Charles) and tire-pressure changes with the seasons (Gay-Lussac).`),
  ],
  questions: [
    num(1, r`Convert 1.50 atm to mmHg.`, 1140, { unit: "mmHg" }, [], r`$1.50 \times 760$.`),
    num(2, r`A 2.0 L balloon at 1.0 atm is squeezed to 4.0 atm at constant temperature. Find its volume.`, 0.5, { unit: "L" }, [], r`$\frac{2.0(1.0)}{4.0}$.`),
    num(2, r`A 2.0 L sample at 300 K is heated to 450 K at constant pressure. Find the new volume.`, 3, { unit: "L" }, [], r`$2.0 \times \frac{450}{300}$.`),
    mc(3, r`Doubling the Celsius temperature from 20 °C to 40 °C (constant P) makes the volume…`, ["double", "increase by about 7%", "halve", "stay the same"], 1, [], r`$\frac{313}{293} \approx 1.07$: use kelvin.`, "review"),
  ],
});
