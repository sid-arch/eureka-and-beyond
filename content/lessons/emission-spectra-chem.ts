import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "emission-spectra-chem",
  title: "Light and atomic emission spectra",
  summary: "Relate wavelength, frequency and photon energy, explain line spectra from electron transitions, and use flame tests to identify elements.",
  minutes: 30,
  objectives: [
    "Use c = λν and E = hν.",
    "Explain line spectra as electrons dropping between fixed energy levels.",
    "Use flame colors and spectra to identify elements.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  formulas: ["photon-energy"],
  blocks: [
    def("Light", r`Light travels at $c = 3.00\times10^8$ m/s, with $c = \lambda\nu$ (chemists write frequency as ν). Each photon carries energy $E = h\nu$, with $h = 6.626\times10^{-34}$ J·s, so shorter wavelengths carry more energy.`),
    def("Line spectra", r`Heated atoms' electrons jump to higher energy levels, then fall back, emitting photons whose energies equal the gaps. Since each element has its own set of levels, it emits only certain wavelengths: a bright-line spectrum that acts as a fingerprint.`),
    example(r`Hydrogen's red line at 656 nm`, [
      [r`\nu = \tfrac{3.00\times10^8}{656\times10^{-9}} \approx 4.57\times10^{14}\ \text{Hz}`, ""],
      [r`E = h\nu \approx 3.03\times10^{-19}\ \text{J}`, "Per photon."],
    ]),
    callout("application", "Where this shows up", r`Fireworks colors (strontium red, copper blue-green, sodium yellow), sodium streetlights, and astronomers identifying elements in distant stars.`),
    activity("hydrogen-spectrum", { title: "Hydrogen's spectrum", params: { upper: 3, lower: 2, mode: "emission" } }),
    callout("tip", "Try this", r`Find all four visible lines by dropping to n = 2 from n = 3, 4, 5 and 6. Then drop to n = 1: the photon is ultraviolet.`, "experiment"),
  ],
  questions: [
    num(2, r`Find the energy of a sodium photon at 589 nm, in units of $10^{-19}$ J, to two decimal places.`, 3.37, { tolerance: 0.01 }, [], r`$\frac{(6.626\times10^{-34})(3.00\times10^8)}{589\times10^{-9}}$.`),
    num(2, r`Find the wavelength of light with frequency 6.0 × 10¹⁴ Hz, in nm.`, 500, { unit: "nm" }, [], r`$\frac{3.00\times10^8}{6.0\times10^{14}}$.`),
    mc(2, r`Which carries the most energy per photon?`, ["red light", "green light", "violet light", "infrared"], 2, [], r`Shortest wavelength.`),
    mc(3, r`An element's emission lines appear only at specific wavelengths because…`, ["light is a wave", "electron energies are quantized", "atoms are hot", "flames are colored"], 1, [], r`Only certain gaps exist.`, "review"),
  ],
});
