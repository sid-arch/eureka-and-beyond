import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "photoelectric-effect",
  title: "The photoelectric effect",
  summary: "Connect blackbody radiation to quantized energy, explain the photoelectric effect with photons, compute photon energies, and use K_max = hf − φ and the threshold frequency.",
  minutes: 30,
  objectives: [
    "Describe blackbody radiation and use Wien's law, λ_max T = 2.898 × 10⁻³ m·K.",
    "Describe the photoelectric experiment and why the wave model fails to explain it.",
    "Compute photon energy E = hf = hc/λ in joules and electron-volts.",
    "Use K_max = hf − φ and find the threshold frequency.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  formulas: ["photon-energy"],
  blocks: [
    def("Blackbody radiation", r`Every object glows with a spectrum set by its temperature. A hotter object emits more in total and peaks at a shorter wavelength: Wien's law $\lambda_{max}T = 2.898\times10^{-3}$ m·K. Classical physics predicted infinite ultraviolet emission; Planck fixed it in 1900 by assuming energy comes in packets $E = hf$, the start of quantum physics.`),
    example(r`Peak wavelengths of the Sun (5800 K) and a person (310 K)`, [
      [r`\lambda_{Sun} = \tfrac{2.898\times10^{-3}}{5800} \approx 500\ \text{nm}`, "Visible light."],
      [r`\lambda_{person} = \tfrac{2.898\times10^{-3}}{310} \approx 9.3\ \mu\text{m}`, "Infrared, which is why thermal cameras see people in the dark."],
    ]),
    def("The puzzle", r`Light shining on a metal can eject electrons. Experiments showed that below a threshold frequency no electrons come out, however bright the light; above it, electrons emerge instantly; and brighter light ejects more electrons, but not faster ones. Waves can't explain this.`),
    def("Einstein's photons", r`Light comes in packets (photons) of energy $E = hf$, with $h = 6.626\times10^{-34}$ J·s. One photon gives its energy to one electron, which needs at least the work function $\phi$ to escape: $K_{max} = hf - \phi$. 1 eV $= 1.602\times10^{-19}$ J.`),
    example(r`Energy of a 500 nm (green) photon`, [
      [r`E = \tfrac{hc}{\lambda}`, ""],
      [r`E = \tfrac{(6.626\times10^{-34})(3\times10^8)}{5\times10^{-7}}`, ""],
      [r`E \approx 3.98\times10^{-19}\ \text{J} \approx 2.48\ \text{eV}`, ""],
    ]),
    example(r`250 nm UV light on sodium (φ = 2.28 eV)`, [
      [r`E = \tfrac{1240\ \text{eV·nm}}{250\ \text{nm}} \approx 4.96\ \text{eV}`, "The shortcut hc ≈ 1240 eV·nm."],
      [r`K_{max} = 4.96 - 2.28 \approx 2.68\ \text{eV}`, ""],
    ]),
    callout("application", "Where this shows up", r`Solar cells, camera sensors and the photomultipliers in medical scanners all rely on photons freeing electrons. Einstein's 1921 Nobel Prize was for this explanation.`),
  ],
  questions: [
    num(2, r`Find the threshold frequency for sodium (φ = 2.28 eV), in units of $10^{14}$ Hz.`, 5.51, { tolerance: 0.02 }, [], r`$f_0 = \frac{\phi}{h} = \frac{2.28(1.602\times10^{-19})}{6.626\times10^{-34}}$.`),
    num(2, r`Find the energy of a 620 nm photon, in eV.`, 2, { tolerance: 0.01, unit: "eV" }, [], r`$\frac{1240}{620}$.`),
    mc(2, r`Red light (700 nm, 1.77 eV) shines on sodium. Electrons are…`, ["ejected slowly", "not ejected, however bright the light", "ejected only if the light is bright", "ejected at 1.77 eV"], 1, [], r`$1.77 < 2.28$ eV.`),
    mc(3, r`Doubling the intensity of light above the threshold frequency…`, ["doubles K_max", "doubles the number of electrons ejected", "halves the wavelength", "has no effect"], 1, [], r`More photons, same energy each.`, "review"),
  ],
});
