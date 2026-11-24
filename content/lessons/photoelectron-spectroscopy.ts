import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "photoelectron-spectroscopy",
  title: "Photoelectron spectroscopy",
  summary: "Interpret photoelectron spectra: peak positions give subshell binding energies, peak heights give electron counts, and Coulomb's law explains the trends.",
  minutes: 35,
  objectives: [
    "Explain how PES measures the energy needed to remove electrons from each subshell.",
    "Read electron configurations from PES peaks.",
    "Explain binding-energy trends with Coulomb's law and shielding.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  formulas: ["photon-energy"],
  blocks: [
    def("The method", r`High-energy photons knock electrons out of atoms. Measuring their kinetic energy gives the binding energy: $BE = h\nu - KE$. Each subshell gives one peak; its height is proportional to the number of electrons in that subshell.`),
    def("Coulomb's law at work", r`$F \propto \frac{q_1q_2}{r^2}$: electrons closer to the nucleus (lower n) and atoms with more protons have higher binding energies. Inner electrons shield outer ones, so valence electrons are held far more weakly.`),
    example(r`Oxygen's spectrum has peaks at 52.6, 3.04 and 1.31 MJ/mol with heights 2 : 2 : 4`, [
      [r`1s^2\ 2s^2\ 2p^4`, "High-energy peak = core 1s; the 2p peak is twice as tall as 2s."],
    ]),
    activity("pes", { title: "Compare elements' spectra", params: { element: "O" } }),
    callout("tip", "Try this", r`Step from O to F to Ne: every peak shifts to higher energy because the nuclear charge grows. Then go to Na: a new, very low peak (3s) appears.`, "experiment"),
    callout("application", "Where this shows up", r`X-ray photoelectron spectroscopy analyzes the chemical makeup of surfaces in chip manufacturing and corrosion research.`),
  ],
  questions: [
    mc(2, r`A PES spectrum has peaks with relative heights 2, 2, 6, 1. The element is…`, ["Ne", "Na", "Mg", "F"], 1, ["Peak heights count electrons in each subshell.", "Add them up to get the number of electrons."], r`1s² 2s² 2p⁶ 3s¹.`),
    mc(2, r`Why is Ne's 1s peak at higher energy than F's?`, ["more electrons", "a greater nuclear charge", "a larger radius", "more shielding"], 1, ["Both 1s electrons are close to the nucleus. What differs between the two nuclei?"], r`10 protons vs 9.`),
    mc(2, r`In a spectrum, which peak sits at the lowest binding energy?`, ["1s", "the core electrons", "the valence electrons", "they're all equal"], 2, ["Binding energy is how tightly the nucleus holds an electron. Which electrons are farthest away and most shielded?"], r`Farthest out and most shielded.`),
    mc(3, r`Two peaks with a height ratio of 1 : 3 in the same shell would be…`, ["1s² and 2s²", "2s² and 2p⁶", "2p⁶ and 3s²", "impossible"], 1, ["An s subshell holds up to 2 electrons, a p subshell up to 6."], r`2 : 6 = 1 : 3.`, "review"),
  ],
});
