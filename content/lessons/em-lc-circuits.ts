import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-lc-circuits",
  title: "Circuits with capacitors and inductors (LC circuits)",
  summary: "Derive the LC differential equation, show it's simple harmonic motion with ω = 1/√(LC), and track energy sloshing between the capacitor and inductor.",
  minutes: 40,
  objectives: [
    "Derive d²q/dt² = −q/(LC) from the loop rule.",
    "Use q = Q₀cos ωt and I = −Q₀ω sin ωt with ω = 1/√(LC).",
    "Track energy between ½q²/C and ½LI², and find the maximum current.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["induction-circuits"],
  blocks: [
    def("The equation", r`Around the loop, $\frac qC + L\frac{dI}{dt} = 0$ with $I = \frac{dq}{dt}$: $\frac{d^2q}{dt^2} = -\frac{1}{LC}q$. That's SHM: charge plays position, inductance plays mass and $\frac1C$ plays the spring constant.`),
    example(r`L = 10 mH, C = 1 μF, capacitor starts with 5 μC`, [
      [r`\omega = \tfrac{1}{\sqrt{(0.01)(10^{-6})}} = 10^4\ \text{rad/s}`, ""],
      [r`f = \tfrac{\omega}{2\pi} \approx 1590\ \text{Hz}`, ""],
      [r`I_{max} = Q_0\omega = (5\times10^{-6})(10^4) = 0.05\ \text{A}`, ""],
    ]),
    def("Energy", r`$\frac{q^2}{2C} + \frac12LI^2 = \frac{Q_0^2}{2C}$ at all times, like $U + K$ for a spring. Real circuits have some resistance, so the oscillation decays, the way a damped spring does.`),
    activity("inductor-circuit", { title: "Energy sloshing in an LC circuit", params: { mode: "lc", emf: 12, inductance: 0.5, capacitance: 100 } }),
    callout("application", "Where this shows up", r`Every radio tuner is an LC circuit adjusted to resonate at one station's frequency; metal detectors and wireless chargers use them too.`),
    activity("rlc-circuit", { title: "Resonance in a driven RLC circuit", params: { R: 50, L: 100, C: 10, f: 60 } }),
    callout("tip", "Try this", r`An LC circuit rings at 1/(2π√(LC)). Drive one through a resistor and sweep the frequency: the current peaks exactly there, where the inductor and capacitor phasors cancel.`, "experiment"),
  ],
  questions: [
    num(2, r`Find f for L = 2 mH and C = 50 nF, in kHz, to one decimal place.`, 15.9, { tolerance: 0.1, unit: "kHz" }, ["f = 1/(2π√(LC))."], r`$\frac{1}{2\pi\sqrt{10^{-10}}} \approx 15{,}915$ Hz.`),
    num(3, r`An LC circuit (L = 0.5 H, C = 100 μF) starts with its capacitor at 12 V. Find the maximum current, to three decimal places.`, 0.17, { tolerance: 0.001, unit: "A" }, ["Energy swaps between the capacitor and the inductor: ½CV₀² = ½LI_max²."], r`$I_{max} = Q_0\omega = (1.2\times10^{-3})(141.4) \approx 0.170$ A.`),
    mc(2, r`When the capacitor's charge is zero, the current is…`, ["zero", "maximum", "half of maximum", "reversing"], 1, ["Total energy is constant. If the capacitor holds none, where is it all?"], r`All the energy is in the inductor.`),
    mc(3, r`In the mechanical analogy, inductance corresponds to…`, ["spring constant", "mass", "position", "friction"], 1, ["Match the energies: ½LI² and ½mv². Which mechanical quantity pairs with L?"], r`It resists changes in current, as mass resists changes in velocity.`, "review"),
  ],
});
