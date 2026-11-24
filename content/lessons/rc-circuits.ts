import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rc-circuits",
  title: "Resistor-capacitor (RC) circuits",
  summary: "Describe how capacitors charge and discharge through resistors, use the time constant τ = RC, and analyze capacitors in steady-state circuits.",
  minutes: 35,
  objectives: [
    "Describe charging and discharging curves and the time constant τ = RC.",
    "Use V_C = V₀(1 − e^(−t/τ)) and V_C = V₀e^(−t/τ).",
    "Treat an uncharged capacitor as a wire and a fully charged one as a break.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Charging", r`When a switch closes, an uncharged capacitor acts like a wire and the current starts at $\frac{V_0}{R}$. As charge builds, the capacitor's voltage opposes the battery and the current decays: $V_C = V_0(1 - e^{-t/\tau})$ and $I = \frac{V_0}{R}e^{-t/\tau}$, with time constant $\tau = RC$. After one $\tau$ it's 63% charged; after $5\tau$, essentially full, and it then acts like an open switch.`),
    def("Discharging", r`Through a resistor: $V_C = V_0 e^{-t/\tau}$. It falls to half in $t = \tau\ln 2 \approx 0.69\tau$.`),
    example(r`A 10 kΩ resistor, 100 μF capacitor and 9 V battery`, [
      [r`\tau = (10^4)(10^{-4}) = 1\ \text{s}`, ""],
      [r`I_0 = \tfrac{9}{10^4} = 0.9\ \text{mA}`, ""],
      [r`V_C(1\ \text{s}) = 9(1 - e^{-1}) \approx 5.69\ \text{V}`, ""],
      [r`t_{99\%} = \tau\ln 100 \approx 4.6\ \text{s}`, ""],
    ]),
    activity("rc-circuit", { title: "Charge and discharge a capacitor", params: { mode: "charge", voltage: 9, resistance: 10, capacitance: 100 } }),
    callout("tip", "Try this", r`Double R and see the curve stretch: τ doubles. Switch to discharging and find the time when the voltage reaches 4.5 V.`, "experiment"),
    callout("application", "Where this shows up", r`Windshield-wiper delays, camera flashes and blinking LEDs can all be timed by RC circuits.`),
  ],
  questions: [
    num(2, r`Find τ for 2 kΩ and 50 μF.`, 0.1, { unit: "s" }, [], r`$2000 \times 5\times10^{-5}$.`),
    num(2, r`A capacitor discharging with τ = 2 s starts at 10 V. Find V after 2 s, to two decimal places.`, 3.68, { tolerance: 0.01, unit: "V" }, [], r`$10e^{-1}$.`),
    mc(2, r`Long after the switch closes in a charging RC circuit, the current is…`, ["V₀/R", "zero", "maximum", "V₀/(RC)"], 1, [], r`A full capacitor blocks steady current.`),
    mc(3, r`Right after the switch closes, the voltage across the uncharged capacitor is…`, ["V₀", "zero", "V₀/2", "infinite"], 1, [], r`It has no charge yet, so $V = \frac{Q}{C} = 0$.`, "review"),
  ],
});
