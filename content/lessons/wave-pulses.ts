import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "wave-pulses",
  title: "Properties of wave pulses and waves",
  summary: "Describe pulses on strings, find wave speed from tension and linear density, and apply superposition to overlapping pulses.",
  minutes: 30,
  objectives: [
    "Describe a pulse as a disturbance carrying energy without carrying the medium.",
    "Use v = √(F_T/μ) for waves on a string.",
    "Apply superposition: overlapping pulses add, then pass through each other unchanged.",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  formulas: ["wave-speed"],
  blocks: [
    def("Pulses", r`A single flick of a rope sends a pulse along it: each bit of rope moves up and back down, but the shape travels. A periodic wave is a regular train of pulses.`),
    def("Speed on a string", r`The medium sets the speed: on a string under tension $F_T$ with mass per length $\mu$, $v = \sqrt{\frac{F_T}{\mu}}$. Tighter and lighter strings carry faster waves.`),
    example(r`A string with μ = 0.01 kg/m under 100 N of tension`, [
      [r`v = \sqrt{\tfrac{100}{0.01}} = 100\ \text{m/s}`, ""],
      [r`\text{4× tension: } v = 200\ \text{m/s}`, "Speed scales as the square root of tension."],
    ]),
    def("Superposition", r`When pulses overlap, the displacements add. Two upward pulses add to a taller one (constructive); an upward and a downward pulse of equal size cancel for an instant (destructive). Then each continues unchanged, as if the other weren't there.`),
    activity("waves", { title: "Add two waves", params: { mode: "superpose", phase: 180 } }),
    callout("application", "Where this shows up", r`Guitar strings are tuned by tension, noise-cancelling headphones use destructive superposition, and seismologists time pulses through Earth to map its interior.`),
  ],
  questions: [
    num(2, r`A 0.5 m string has a mass of 0.005 kg and tension 40 N. Find the wave speed.`, 63.2, { tolerance: 0.1, unit: "m/s" }, [], r`$\mu = 0.01$ kg/m; $\sqrt{4000}$.`),
    num(2, r`Pulses of +3 cm and −1 cm overlap. Find the combined displacement.`, 2, { unit: "cm" }, [], r`$3 + (-1)$.`),
    mc(2, r`To double a string's wave speed, the tension must be…`, ["doubled", "quadrupled", "halved", "squared"], 1, [], r`$v \propto \sqrt{F_T}$.`),
    mc(3, r`After two equal and opposite pulses momentarily cancel, they…`, ["vanish permanently", "continue on unchanged", "reflect", "merge into one"], 1, [], r`The energy is still there, stored as the string's motion.`, "review"),
  ],
});
