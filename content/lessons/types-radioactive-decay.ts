import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "types-radioactive-decay",
  title: "Types of radioactive decay",
  summary: "Write equations for alpha, beta-minus, beta-plus, electron capture and gamma decay, using conservation of charge, nucleon number and energy, and trace decay series.",
  minutes: 35,
  objectives: [
    "Write nuclear equations for α, β⁻, β⁺, electron capture and γ decay.",
    "Apply conservation of charge, nucleon number and energy to decays.",
    "Count the decays in a decay series.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  blocks: [
    def("Decay types", r`Alpha ($^4_2$He): A − 4, Z − 2. Beta-minus: a neutron becomes a proton, emitting an electron and an antineutrino; Z + 1. Beta-plus: a proton becomes a neutron, emitting a positron and a neutrino; Z − 1. Electron capture: the nucleus absorbs an inner electron; Z − 1. Gamma: an excited nucleus emits a photon, with no change in A or Z.`),
    example(r`Fluorine-18 (used in PET scans) decays by positron emission`, [
      [r`^{18}_{9}\text{F} \to\, ^{18}_{8}\text{O} + ^{0}_{+1}e + \nu`, "Top and bottom numbers balance."],
    ]),
    example(r`Uranium-238 decays through a series to lead-206. How many α and β⁻ decays?`, [
      [r`\Delta A = 238 - 206 = 32 \Rightarrow 8\ \alpha`, "Only alpha decay changes A."],
      [r`Z: 92 - 2(8) = 76;\ 82 - 76 = 6\ \beta^-`, "Each β⁻ raises Z by 1."],
    ]),
    callout("note", "Why neutrinos?", r`In beta decay, electrons come out with a range of energies, not one value. Pauli proposed an unseen particle carrying the missing energy: the neutrino, detected in 1956.`),
    activity("half-life", { title: "Random decay, predictable half-life", params: { halfLife: 5 } }),
    callout("application", "Where this shows up", r`PET scans detect the gamma rays from positron–electron annihilation, and smoke detectors use americium-241, an alpha emitter.`),
  ],
  questions: [
    num(2, r`Thorium-232 (Z = 90) decays to lead-208 (Z = 82). How many alpha decays occur?`, 6, {}, [], r`$\frac{232 - 208}{4}$.`),
    num(3, r`How many beta-minus decays in that series?`, 4, {}, [], r`$90 - 12 = 78$, and $82 - 78 = 4$.`),
    mc(2, r`Which decay leaves both A and Z unchanged?`, ["alpha", "beta-minus", "beta-plus", "gamma"], 3, [], r`A gamma ray is just a photon.`),
    mc(3, r`Cobalt-60 (Z = 27) undergoes β⁻ decay. The product is…`, ["iron-60 (Z = 26)", "nickel-60 (Z = 28)", "cobalt-59", "manganese-56"], 1, [], r`Z + 1, same A.`, "review"),
  ],
});
