import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "standing-waves-resonance",
  title: "Standing waves and resonance",
  summary: "Explain standing waves as interference of opposite-moving waves, find the harmonics of strings and open and closed pipes, and connect them to resonance.",
  minutes: 30,
  objectives: [
    "Describe superposition, nodes and antinodes.",
    "Find fₙ = nv/(2L) for strings and open pipes, and fₙ = nv/(4L) (odd n) for closed pipes.",
    "Explain resonance as driving a system at a natural frequency.",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  formulas: ["wave-speed"],
  blocks: [
    def("Standing waves", r`Two identical waves moving in opposite directions add to a standing wave with fixed nodes (no motion) and antinodes (maximum motion). On a string fixed at both ends: $\lambda_n = \frac{2L}{n}$ and $f_n = \frac{nv}{2L}$, $n = 1, 2, 3, \ldots$`),
    example(r`A guitar string, L = 0.65 m, wave speed 286 m/s`, [
      [r`f_1 = \tfrac{286}{2(0.65)} = 220\ \text{Hz}`, "The fundamental."],
      [r`f_2 = 440\ \text{Hz}`, "Second harmonic, an octave higher."],
    ]),
    def("Pipes", r`An open pipe behaves like a string: $f_n = \frac{nv}{2L}$. A pipe closed at one end has only odd harmonics: $f_n = \frac{nv}{4L}$, $n = 1, 3, 5, \ldots$`),
    activity("waves", { title: "Harmonics on a string", params: { mode: "standing", harmonic: 3 } }),
    callout("tip", "Try this", r`Switch to Superposition and set the phase to 180°: the waves cancel (destructive interference). At 0° they double (constructive).`, "experiment"),
    callout("application", "Where this shows up", r`Resonance makes instruments loud and can be destructive: soldiers break step on bridges, and engineers design buildings so earthquake frequencies don't match their natural frequencies.`),
  ],
  questions: [
    num(1, r`Find the third harmonic of the guitar string above.`, 660, { unit: "Hz" }, [], r`$3 \times 220$.`),
    num(2, r`A 0.5 m pipe closed at one end ($v = 343$ m/s). Find its fundamental frequency, to one decimal place.`, 171.5, { tolerance: 0.1, unit: "Hz" }, [], r`$\frac{343}{4(0.5)}$.`),
    mc(2, r`How many nodes does the 3rd harmonic on a string fixed at both ends have (counting the ends)?`, ["2", "3", "4", "6"], 2, [], r`$n + 1 = 4$.`),
    mc(3, r`Tightening a guitar string raises its pitch because…`, ["the string gets longer", "the wave speed increases", "the wavelength increases", "the amplitude increases"], 1, [], r`Higher tension, faster waves, higher $f = \frac{v}{2L}$.`, "review"),
  ],
});
