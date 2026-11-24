import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "mass-energy-equivalence",
  title: "Mass-energy equivalence",
  summary: "Use E = mc² to relate mass and energy, compute nuclear binding energies from mass defects, and work in atomic mass units and MeV.",
  minutes: 30,
  objectives: [
    "Use E = mc² and 1 u = 931.5 MeV/c².",
    "Compute mass defect and binding energy for a nucleus.",
    "Explain why binding energy per nucleon predicts fission and fusion energy.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  formulas: ["modern-physics"],
  blocks: [
    def("Mass is energy", r`Einstein showed that mass and energy are equivalent: $E = mc^2$. A tiny mass is a huge energy, because $c^2 = 9\times10^{16}$ m²/s². In nuclear physics, $1\ \text{u} = 1.6605\times10^{-27}$ kg $= 931.5$ MeV/$c^2$.`),
    example(r`The energy equivalent of 1 gram`, [
      [r`E = (10^{-3})(3\times10^8)^2 = 9\times10^{13}\ \text{J}`, "About what a large power plant produces in a day."],
    ]),
    def("Binding energy", r`A nucleus weighs less than its separate protons and neutrons. The difference, the mass defect $\Delta m$, is the binding energy $\Delta m c^2$ released when the nucleus forms. Binding energy per nucleon peaks near iron-56: fusing light nuclei or splitting heavy ones moves toward that peak and releases energy.`),
    example(r`Helium-4: 2 protons (1.007276 u), 2 neutrons (1.008665 u), nucleus 4.001506 u`, [
      [r`2(1.007276) + 2(1.008665) = 4.031882\ \text{u}`, "Total mass of the separate nucleons."],
      [r`\Delta m = 4.031882 - 4.001506`, ""],
      [r`\Delta m = 0.030376\ \text{u}`, ""],
      [r`E_B = 0.030376(931.5) \approx 28.3\ \text{MeV}`, "About 7.1 MeV per nucleon."],
    ]),
    callout("application", "Where this shows up", r`The Sun loses about 4 million tonnes of mass each second as it radiates energy; fission converts about 0.1% of the mass of the uranium that splits into energy.`),
  ],
  questions: [
    num(2, r`How much energy is released when 0.001 u of mass converts entirely to energy? Give MeV, to two decimal places.`, 0.93, { tolerance: 0.01, unit: "MeV" }, [], r`$0.001 \times 931.5$.`),
    num(2, r`How much mass converts to give 9 × 10¹⁶ J?`, 1, { unit: "kg" }, [], r`$\frac{E}{c^2}$.`),
    mc(2, r`A bound nucleus has ___ mass than its separate nucleons.`, ["more", "less", "the same", "no"], 1, [], r`The missing mass is the binding energy.`),
    mc(3, r`Fusing two light nuclei releases energy because the product has…`, ["less binding energy per nucleon", "more binding energy per nucleon", "more mass", "more protons only"], 1, [], r`Moving toward iron's peak releases energy.`, "review"),
  ],
});
