import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ohms-law",
  title: "Current, voltage and resistance (Ohm's law)",
  summary: "Define current, voltage and resistance, use V = IR, and understand what sets a wire's resistance.",
  minutes: 25,
  objectives: [
    "Define current (A), potential difference (V) and resistance (Ω).",
    "Apply Ohm's law V = IR.",
    "Explain how length, area and material affect resistance (R = ρL/A).",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  blocks: [
    def("Current and voltage", r`Current is the rate charge flows: $I = \frac{\Delta q}{\Delta t}$, in amperes (1 A = 1 C/s). Voltage (potential difference) is the energy per unit charge a source provides: 1 V = 1 J/C.`),
    def("Resistance", r`Resistance opposes current. For many materials (ohmic conductors), $V = IR$. A wire's resistance is $R = \frac{\rho L}{A}$: longer and thinner wires resist more, and copper ($\rho$ small) resists less than nichrome.`),
    example(r`A 12 V battery drives current through a 4 Ω resistor`, [
      [r`I = \tfrac{V}{R} = \tfrac{12}{4} = 3\ \text{A}`, ""],
    ]),
    activity("circuit-builder", { title: "Vary the voltage and resistance" }),
    callout("tip", "Try this", r`Double the battery voltage and the current doubles; double a resistor and the current halves. That's Ohm's law.`, "experiment"),
    callout("warning", "Safety", r`Current, not voltage alone, does damage in the body; as little as 0.1 A across the heart can be fatal. Wet skin lowers your resistance, which is why water and outlets don't mix.`),
  ],
  questions: [
    num(1, r`A 9 V battery and a 3 Ω resistor. Find the current.`, 3, { unit: "A" }, [], r`$\frac{9}{3}$.`),
    num(2, r`A 2 A current flows through a 6 Ω resistor. Find the voltage across it.`, 12, { unit: "V" }, [], r`$2 \times 6$.`),
    num(2, r`A 0.5 A current runs for 60 s. How much charge passes, in coulombs?`, 30, { unit: "C" }, [], r`$q = It$.`),
    mc(3, r`A wire is replaced by one twice as long and of the same thickness and material. Its resistance…`, ["halves", "doubles", "quadruples", "stays the same"], 1, [], r`$R \propto L$.`, "review"),
  ],
});
