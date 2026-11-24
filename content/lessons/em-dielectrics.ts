import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-dielectrics",
  title: "Dielectrics",
  summary: "Explain how dielectric polarization reduces the field and raises capacitance by κ, contrast battery-connected and isolated capacitors, and handle partly filled capacitors.",
  minutes: 35,
  objectives: [
    "Explain polarization and induced surface charge in a dielectric.",
    "Use C = κC₀ and E = E₀/κ.",
    "Predict changes in Q, V, E and U with and without a battery connected.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Polarization", r`In an insulator, molecules stretch or rotate so their charges line up slightly with the field. This leaves induced surface charge that partly cancels the applied field: $E = \frac{E_0}{\kappa}$, where $\kappa$ is the dielectric constant (glass ≈ 5, water ≈ 80). The capacitance rises: $C = \kappa C_0$.`),
    def("Two cases", r`Connected to a battery, V is fixed, so Q, C and U all rise by $\kappa$. Isolated, Q is fixed, so V and U fall by $\kappa$ (the dielectric is pulled in).`),
    example(r`Half the gap of a parallel-plate capacitor (C₀ = 10 pF) is filled with κ = 4, slab parallel to the plates`, [
      [r`C_1 = 2\kappa C_0 = 80\ \text{pF}`, "Treat it as two capacitors in series, each with half the gap: the filled half."],
      [r`C_2 = 2C_0 = 20\ \text{pF}`, "The air half."],
      [r`C = \left(\tfrac{1}{80} + \tfrac{1}{20}\right)^{-1} = 16\ \text{pF}`, ""],
    ]),
    callout("application", "Where this shows up", r`Nearly every real capacitor uses a dielectric (ceramic, plastic film or oxide) to pack more capacitance in less space; dielectrics also raise the breakdown voltage.`),
  ],
  questions: [
    num(2, r`A 50 pF capacitor connected to 12 V has a κ = 3 dielectric inserted. Find the new charge, in pC.`, 1800, { unit: "pC" }, ["Still connected, so V stays 12 V while C becomes κC. Then Q = CV."], r`$3(50)(12)$.`),
    num(3, r`A 20 pF capacitor is filled side by side, half with κ = 5 and half with air (each over half the plate area). Find C.`, 60, { unit: "pF" }, ["Side by side, the two halves act as capacitors in parallel, each with half the area."], r`Parallel: $\frac12(20)(5) + \frac12(20)(1)$.`),
    mc(2, r`An isolated charged capacitor gets a dielectric. Its voltage…`, ["increases", "decreases by κ", "stays the same", "becomes zero"], 1, ["Isolated: Q is fixed and C rises by κ. Use V = Q/C."], r`Q fixed, C up by κ.`),
    mc(3, r`Why is a dielectric slab pulled into a charged isolated capacitor?`, ["magnetism", "the system's energy decreases as it enters", "gravity", "it isn't"], 1, ["Systems move toward lower energy. What happens to U = Q²/2C as the slab enters?"], r`$U = \frac{Q^2}{2C}$ falls as C rises.`, "review"),
  ],
});
