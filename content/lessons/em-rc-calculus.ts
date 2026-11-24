import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-rc-calculus",
  title: "Resistor-capacitor (RC) circuits",
  summary: "Derive and solve the differential equations for charging and discharging capacitors, and track where the battery's energy goes.",
  minutes: 40,
  objectives: [
    "Write the loop equation ε − IR − q/C = 0 with I = dq/dt.",
    "Solve it: q = Cε(1 − e^(−t/RC)) and I = (ε/R)e^(−t/RC).",
    "Show that charging dissipates exactly half the battery's energy in the resistor.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Charging", r`Around the loop, $\varepsilon - R\frac{dq}{dt} - \frac qC = 0$. Separating variables, $\int_0^q\frac{dq'}{C\varepsilon - q'} = \int_0^t\frac{dt'}{RC}$, so $q = C\varepsilon(1 - e^{-t/RC})$ and $I = \frac{dq}{dt} = \frac\varepsilon Re^{-t/RC}$.`),
    def("Discharging", r`With no battery, $R\frac{dq}{dt} + \frac qC = 0$, so $q = Q_0e^{-t/RC}$.`),
    example(r`Energy bookkeeping while charging fully`, [
      [r`W_{battery} = \varepsilon Q = C\varepsilon^2`, ""],
      [r`U_C = \tfrac12 C\varepsilon^2`, ""],
      [r`\int_0^\infty I^2R\,dt = \tfrac{\varepsilon^2}{R}\cdot\tfrac{RC}{2} = \tfrac12C\varepsilon^2`, "Half is always lost as heat, whatever R is."],
    ]),
    activity("rc-circuit", { title: "Charging and discharging curves", params: { mode: "charge", voltage: 9, resistance: 10, capacitance: 100 } }),
    callout("application", "Where this shows up", r`Camera-flash chargers, timing circuits, and the signal delays in computer chips (RC delays in wiring) all follow these exponentials.`),
  ],
  questions: [
    num(2, r`A 100 μF capacitor discharges through 20 kΩ from 12 V. Find the voltage after 3 s, to two decimal places.`, 2.68, { tolerance: 0.01, unit: "V" }, ["Find τ = RC, then V = V₀e^(−t/τ)."], r`$\tau = 2$ s; $12e^{-1.5}$.`),
    num(3, r`How long until a charging RC circuit (τ = 0.5 s) reaches 90% of full charge? Give two decimal places.`, 1.15, { tolerance: 0.01, unit: "s" }, ["Solve 1 − e^(−t/τ) = 0.90 for t."], r`$1 - e^{-t/\tau} = 0.9$, so $t = \tau\ln 10$.`),
    mc(2, r`Right after the switch closes, the uncharged capacitor behaves like…`, ["an open circuit", "a wire", "a resistor of value R", "a battery"], 1, ["With no charge yet, the capacitor's voltage q/C is zero. What element has zero voltage across it?"], r`$q = 0$, so its voltage is zero.`),
    mc(3, r`Charging a capacitor through a smaller resistor changes the energy lost as heat by…`, ["less", "more", "nothing", "it depends on C only"], 2, ["Integrate I²R over the whole charging. Does R survive in the result?"], r`Always $\frac12C\varepsilon^2$; a smaller R just makes it happen faster.`, "review"),
  ],
});
