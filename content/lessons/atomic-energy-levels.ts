import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "atomic-energy-levels",
  title: "Energy in modern physics",
  summary: "Use energy-level diagrams to explain emission and absorption spectra, compute photon energies and wavelengths for hydrogen transitions, and find ionization energies.",
  minutes: 35,
  objectives: [
    "Explain discrete atomic energy levels and line spectra.",
    "Use E_n = −13.6 eV/n² for hydrogen and ΔE = hf for transitions.",
    "Distinguish emission from absorption, and find ionization energy.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  formulas: ["modern-physics", "photon-energy"],
  blocks: [
    def("Energy levels", r`Electrons in atoms can only have certain energies. An electron dropping from a higher level to a lower one emits a photon with exactly the energy difference: $hf = E_{upper} - E_{lower}$. An atom absorbs only photons that match a gap. Each element's set of gaps is a unique fingerprint.`),
    def("Hydrogen", r`$E_n = -\frac{13.6\ \text{eV}}{n^2}$: $E_1 = -13.6$ eV (ground state), $E_2 = -3.40$ eV, $E_3 = -1.51$ eV. Ionizing from the ground state takes 13.6 eV. The shortcut $\lambda\ (\text{nm}) = \frac{1240}{E\ (\text{eV})}$ turns energies into wavelengths.`),
    example(r`Hydrogen's n = 3 → n = 2 transition`, [
      [r`\Delta E = 13.6\left(\tfrac14 - \tfrac19\right) \approx 1.89\ \text{eV}`, ""],
      [r`\lambda = \tfrac{1240}{1.89} \approx 656\ \text{nm}`, "The red H-alpha line that colors nebulae."],
    ]),
    example(r`Hydrogen's n = 2 → n = 1 transition`, [
      [r`\Delta E = 13.6\left(1 - \tfrac14\right) = 10.2\ \text{eV}`, ""],
      [r`\lambda = \tfrac{1240}{10.2} \approx 122\ \text{nm}`, "Ultraviolet."],
    ]),
    callout("application", "Where this shows up", r`Neon signs, fireworks colors, sodium streetlights and lasers all come from specific transitions; astronomers read stars' compositions from their absorption lines.`),
  ],
  questions: [
    num(2, r`How much energy ionizes hydrogen from the n = 2 level?`, 3.4, { unit: "eV" }, [], r`$\frac{13.6}{4}$.`),
    num(2, r`How many different photon energies can be emitted as hydrogen electrons cascade from n = 4 to n = 1 by all possible routes?`, 6, {}, [], r`All pairs from 4 levels: $\binom{4}{2} = 6$.`),
    mc(2, r`An atom with levels at −10, −6 and −4 eV absorbs a photon from the ground state. Which energy could be absorbed?`, ["2 eV", "4 eV", "5 eV", "8 eV"], 1, [], r`Only gaps from −10 eV: 4 eV or 6 eV.`),
    mc(3, r`Lines in an emission spectrum appear because…`, ["electrons are particles", "only certain energy gaps exist", "light is a wave", "atoms are hot"], 1, [], r`Discrete levels give discrete photon energies.`, "review"),
  ],
});
