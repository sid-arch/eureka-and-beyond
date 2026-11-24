import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "simple-circuits-emf",
  title: "Simple circuits",
  summary: "Read circuit diagrams, place meters correctly, and account for a real battery's internal resistance with terminal voltage V = ε − Ir.",
  minutes: 30,
  objectives: [
    "Interpret circuit symbols and tell open circuits from closed and short circuits.",
    "Connect ammeters in series and voltmeters in parallel.",
    "Use emf and internal resistance: I = ε/(R + r) and V_T = ε − Ir.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Circuits", r`Current flows only around a closed loop. An open circuit has a break, so no current flows; a short circuit gives current a path with almost no resistance, so a large current flows. Ideal ammeters have zero resistance and go in series; ideal voltmeters have infinite resistance and go in parallel across the element they measure.`),
    def("Real batteries", r`A battery's emf $\varepsilon$ is the energy it gives each coulomb. It also has internal resistance $r$, so the current is $I = \frac{\varepsilon}{R + r}$ and the voltage at its terminals is $V_T = \varepsilon - Ir$, which falls as the current rises.`),
    example(r`A 12 V battery with r = 0.5 Ω drives a 5.5 Ω load`, [
      [r`I = \tfrac{12}{5.5 + 0.5} = 2\ \text{A}`, ""],
      [r`V_T = 12 - 2(0.5) = 11\ \text{V}`, ""],
      [r`\text{shorted: } I = \tfrac{12}{0.5} = 24\ \text{A}`, "Dangerous: the battery heats rapidly."],
    ]),
    activity("circuit-builder", { title: "Measure currents and voltages" }),
    callout("application", "Where this shows up", r`Car headlights dim while the starter motor runs: the large current makes $Ir$ large, so the terminal voltage drops. Fuses protect against short circuits.`),
  ],
  questions: [
    num(2, r`A 9 V battery reads 8.4 V while delivering 0.3 A. Find its internal resistance.`, 2, { unit: "Ω" }, [], r`$r = \frac{9 - 8.4}{0.3}$.`),
    num(2, r`A 6 V battery with r = 1 Ω powers a 2 Ω resistor. Find the current.`, 2, { unit: "A" }, [], r`$\frac{6}{3}$.`),
    mc(2, r`A voltmeter accidentally connected in series with a bulb causes…`, ["the bulb to burn brighter", "almost no current, so the bulb goes out", "a short circuit", "no change"], 1, [], r`Its huge resistance blocks current.`),
    mc(3, r`When does a battery's terminal voltage equal its emf?`, ["when shorted", "when no current flows", "always", "when the load is small"], 1, [], r`$V_T = \varepsilon - Ir$ with $I = 0$.`, "review"),
  ],
});
