import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "spectroscopy-em",
  title: "Spectroscopy and the electromagnetic spectrum",
  summary: "Match regions of the electromagnetic spectrum to the molecular transitions they cause, and compute photon energies per photon and per mole.",
  minutes: 30,
  objectives: [
    "Match microwave, infrared and UV-visible radiation to rotational, vibrational and electronic transitions.",
    "Compute photon energy E = hc/λ, per photon and per mole.",
    "Decide whether a photon has enough energy to break a bond.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  formulas: ["photon-energy"],
  blocks: [
    def("What absorbs what", r`Microwaves change molecular rotation; infrared changes bond vibration (the basis of IR spectroscopy and the greenhouse effect); visible and UV light move electrons to higher energy levels; high-energy UV and X-rays can break bonds and ionize.`),
    example(r`254 nm UV light`, [
      [r`E = \tfrac{(6.626\times10^{-34})(3.00\times10^8)}{254\times10^{-9}}`, ""],
      [r`E = 7.83\times10^{-19}\ \text{J}`, "Per photon."],
      [r`\times 6.022\times10^{23} \approx 471\ \text{kJ/mol}`, "More than a C–C bond (347 kJ/mol), which is why UV sterilizes."],
    ]),
    callout("application", "Where this shows up", r`Microwave ovens spin water molecules; IR spectra identify functional groups; UV lamps disinfect water; sunscreen absorbs UV before it reaches skin.`),
  ],
  questions: [
    mc(2, r`Infrared radiation mainly causes…`, ["electronic transitions", "bond vibrations", "molecular rotation", "ionization"], 1, ["Match each region to its effect: UV/visible moves electrons, IR shakes bonds, microwaves spin molecules."], r`IR spectroscopy measures vibrations.`),
    num(2, r`Find the energy per mole of 600 nm photons, to the nearest kJ/mol.`, 199, { tolerance: 1, unit: "kJ/mol" }, ["E = hc/λ per photon; multiply by Avogadro's number and convert to kJ."], r`$\frac{hc}{600\ \text{nm}}N_A \approx 199$.`),
    mc(2, r`Which radiation is energetic enough to break a 400 kJ/mol bond?`, ["microwave", "infrared", "red light (650 nm)", "UV at 250 nm"], 3, ["Convert each wavelength to energy per mole with E = hcN_A/λ.", "Shorter wavelength means more energy per photon."], r`About 479 kJ/mol.`),
    mc(3, r`Greenhouse gases warm the planet because they absorb…`, ["visible light", "infrared radiation", "UV", "radio waves"], 1, ["Earth's warm surface radiates mostly long-wavelength light. Which region is that?"], r`Their bonds vibrate at IR frequencies.`, "review"),
  ],
});
