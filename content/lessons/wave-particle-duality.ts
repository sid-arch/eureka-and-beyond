import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "wave-particle-duality",
  title: "Quantum theory and wave-particle duality",
  summary: "See how light shows particle behavior and matter shows wave behavior, compute de Broglie wavelengths, and explain electron diffraction.",
  minutes: 30,
  objectives: [
    "Describe evidence that light acts as both a wave and a particle.",
    "Compute de Broglie wavelengths, λ = h/p, and photon momentum p = h/λ.",
    "Explain why wave behavior shows up for electrons but not baseballs.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  formulas: ["modern-physics", "photon-energy"],
  blocks: [
    def("Duality", r`Light interferes and diffracts like a wave, but in the photoelectric effect and Compton scattering it delivers energy in packets, like particles. In 1924 de Broglie proposed that matter does the reverse: a particle with momentum $p$ has wavelength $\lambda = \frac{h}{p}$. Photons carry momentum too: $p = \frac{h}{\lambda}$.`),
    example(r`An electron at 1 × 10⁶ m/s and a baseball (0.145 kg) at 40 m/s`, [
      [r`\lambda_e = \tfrac{6.626\times10^{-34}}{(9.11\times10^{-31})(10^6)}`, ""],
      [r`\lambda_e \approx 7.3\times10^{-10}\ \text{m}`, "Comparable to atomic spacing, so crystals diffract electrons."],
      [r`\lambda_{ball} = \tfrac{6.626\times10^{-34}}{(0.145)(40)}`, ""],
      [r`\lambda_{ball} \approx 1.1\times10^{-34}\ \text{m}`, "Unmeasurably small."],
    ]),
    def("Evidence", r`In 1927 Davisson and Germer saw electrons diffract off a nickel crystal, exactly as de Broglie predicted. Fired one at a time through two slits, electrons still build up an interference pattern: each one's arrival point is random, but the probabilities follow the wave.`),
    callout("application", "Where this shows up", r`Electron microscopes resolve detail far finer than light microscopes because electrons' wavelengths are thousands of times shorter than visible light's.`),
  ],
  questions: [
    num(2, r`Find the momentum of a 500 nm photon, in units of $10^{-27}$ kg·m/s, to two decimal places.`, 1.33, { tolerance: 0.01 }, [], r`$\frac{6.626\times10^{-34}}{5\times10^{-7}}$.`),
    num(3, r`Find the de Broglie wavelength of a proton at 1 × 10⁴ m/s, in nm, to two decimal places.`, 0.04, { tolerance: 0.001, unit: "nm" }, [], r`$\frac{6.626\times10^{-34}}{1.67\times10^{-27}(10^4)} \approx 3.97\times10^{-11}$ m.`),
    mc(2, r`If an electron's speed doubles, its de Broglie wavelength…`, ["doubles", "halves", "stays the same", "quadruples"], 1, [], r`$\lambda \propto \frac{1}{p}$.`),
    mc(3, r`Which experiment showed the wave nature of electrons?`, ["photoelectric effect", "Davisson–Germer electron diffraction", "Rutherford scattering", "Millikan oil drop"], 1, [], r`Diffraction is wave behavior.`, "review"),
  ],
});
