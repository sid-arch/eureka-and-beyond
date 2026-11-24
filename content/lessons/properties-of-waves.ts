import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "properties-of-waves",
  title: "Properties of waves",
  summary: "Describe mechanical waves as transverse or longitudinal, name amplitude, wavelength, frequency and period, and use v = fλ.",
  minutes: 25,
  objectives: [
    "Distinguish transverse and longitudinal waves.",
    "Identify amplitude, wavelength, frequency and period.",
    "Use v = fλ and T = 1/f.",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  formulas: ["wave-speed"],
  blocks: [
    def("Waves", r`A wave carries energy without carrying matter along. In a transverse wave (a wave on a string) the medium moves perpendicular to the wave's travel (light is also transverse, though it needs no medium); in a longitudinal wave (sound) it moves back and forth along it.`),
    def("Describing a wave", r`Amplitude $A$: maximum displacement. Wavelength $\lambda$: distance between neighboring crests. Frequency $f$: waves per second (Hz). Period $T = \frac{1}{f}$. Speed $v = f\lambda$, set by the medium.`),
    example(r`A 440 Hz tuning fork in air (v = 340 m/s)`, [
      [r`\lambda = \tfrac{v}{f} = \tfrac{340}{440} \approx 0.77\ \text{m}`, ""],
      [r`T = \tfrac{1}{440} \approx 0.0023\ \text{s}`, ""],
    ]),
    activity("waves", { title: "Follow a crest", params: { mode: "travel", wavelength: 2, frequency: 1 } }),
    callout("tip", "Try this", r`Move the time slider and track the orange crest: it moves $\lambda$ in one period, so its speed is $\frac{\lambda}{T} = f\lambda$. Double the frequency: the wavelength stays put in the sim, so the speed doubles. In a real medium the speed stays fixed and the wavelength halves.`, "experiment"),
    callout("application", "Where this shows up", r`Ultrasound imaging, earthquake detection (P-waves are longitudinal, S-waves transverse) and every musical instrument rely on these properties.`),
  ],
  questions: [
    num(1, r`A wave has frequency 5 Hz and wavelength 2 m. Find its speed.`, 10, { unit: "m/s" }, [], r`$5 \times 2$.`),
    num(1, r`Find the period of a 4 Hz wave.`, 0.25, { tolerance: 0.001, unit: "s" }, [], r`$\frac{1}{4}$.`),
    mc(2, r`Sound is a…`, ["transverse wave", "longitudinal wave", "electromagnetic wave", "standing wave only"], 1, [], r`Air compresses and expands along the direction of travel.`),
    mc(3, r`A wave moves from one medium into another and slows down. Its frequency…`, ["increases", "decreases", "stays the same", "becomes zero"], 2, [], r`Frequency is set by the source; the wavelength shortens instead.`, "review"),
  ],
});
