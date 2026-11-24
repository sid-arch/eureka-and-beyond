import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "compton-scattering",
  title: "Compton scattering",
  summary: "Explain Compton scattering as a photon–electron collision, compute the wavelength shift, and see why it confirms photon momentum.",
  minutes: 30,
  objectives: [
    "Describe Compton scattering as an elastic collision between a photon and an electron.",
    "Compute Δλ = (h/m_ec)(1 − cos θ).",
    "Explain how the result supports photons carrying momentum p = h/λ.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  formulas: ["modern-physics"],
  blocks: [
    def("The effect", r`In 1923 Compton aimed X-rays at graphite and found the scattered X-rays had longer wavelengths, more so at larger angles. Waves can't do that, but a photon colliding with an electron, conserving energy and momentum like billiard balls, does: the photon loses energy to the electron, so its wavelength grows.`),
    def("Shift", r`$\Delta\lambda = \frac{h}{m_ec}(1 - \cos\theta)$, with $\frac{h}{m_ec} = 2.43$ pm (the Compton wavelength). The shift ranges from 0 (no scattering) to 4.85 pm (straight back).`),
    example(r`71 pm X-rays scattered at 90°`, [
      [r`\Delta\lambda = 2.43(1 - \cos 90°) = 2.43\ \text{pm}`, ""],
      [r`\lambda' = 71 + 2.43 \approx 73.4\ \text{pm}`, ""],
    ]),
    callout("note", "Why X-rays?", r`A 2.43 pm shift is about 3% of an X-ray's wavelength but only 0.0005% of visible light's, so the effect is only noticeable for very short wavelengths.`),
    callout("application", "Where this shows up", r`Compton scattering dominates how X-rays and gamma rays deposit energy in tissue, which matters in radiation therapy and medical imaging.`),
  ],
  questions: [
    num(2, r`Find the Compton shift at 180°, in pm, to two decimal places.`, 4.85, { tolerance: 0.02, unit: "pm" }, [], r`$2.43 \times 2$.`),
    num(2, r`Find the shift at 60°, in pm, to two decimal places.`, 1.21, { tolerance: 0.01, unit: "pm" }, [], r`$2.43(1 - 0.5)$.`),
    mc(2, r`After Compton scattering, the photon's energy is…`, ["greater", "smaller", "unchanged", "zero"], 1, [], r`Longer wavelength means less energy.`),
    mc(3, r`Compton scattering is strong evidence that photons…`, ["have mass", "carry momentum", "are waves only", "travel slower than c"], 1, [], r`Momentum conservation in the collision explains the shift.`, "review"),
  ],
});
