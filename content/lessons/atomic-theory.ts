import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "atomic-theory",
  title: "Atomic theory and subatomic particles",
  summary: "Trace atomic models from Dalton to Bohr, describe protons, neutrons and electrons, and count particles in atoms and ions.",
  minutes: 30,
  objectives: [
    "Summarize Dalton's theory and the experiments of Thomson and Rutherford.",
    "Compare the charge, mass and location of protons, neutrons and electrons.",
    "Count protons, neutrons and electrons from atomic number, mass number and charge.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  blocks: [
    def("Models of the atom", r`Dalton (1803): elements are made of identical atoms that combine in whole-number ratios. Thomson (1897) discovered electrons with cathode rays: the "plum pudding" model. Rutherford (1911) fired alpha particles at gold foil; a few bounced back, revealing a tiny, dense, positive nucleus. Bohr (1913) put electrons in fixed energy levels.`),
    def("Particles", r`Protons: +1 charge, about 1 u, in the nucleus. Neutrons: neutral, about 1 u, in the nucleus. Electrons: −1 charge, about $\frac{1}{1836}$ of a proton's mass, around the nucleus. The atomic number Z counts protons and identifies the element; the mass number A = protons + neutrons.`),
    example(r`Chlorine-37 and the Mg²⁺ ion`, [
      [r`^{37}_{17}\text{Cl}:\ 17\ p,\ 37 - 17 = 20\ n,\ 17\ e^-`, ""],
      [r`^{24}_{12}\text{Mg}^{2+}:\ 12\ p,\ 12\ n,\ 12 - 2 = 10\ e^-`, "Positive ions have lost electrons."],
    ]),
    callout("application", "Where this shows up", r`Rutherford-style scattering is still used to analyze materials; mass spectrometers sort atoms by mass to identify substances.`),
  ],
  questions: [
    num(1, r`How many neutrons are in iron-56 (Z = 26)?`, 30, {}, [], r`$56 - 26$.`),
    num(2, r`How many electrons does the sulfide ion S²⁻ (Z = 16) have?`, 18, {}, [], r`Negative ions gain electrons: $16 + 2$.`),
    mc(2, r`Rutherford's gold-foil experiment showed that atoms…`, ["are solid spheres", "have a small, dense, positive nucleus", "contain electrons", "have energy levels"], 1, [], r`Rare large-angle deflections.`),
    mc(3, r`What identifies an element?`, ["its number of neutrons", "its mass number", "its number of protons", "its number of electrons"], 2, [], r`The atomic number Z.`, "review"),
  ],
});
