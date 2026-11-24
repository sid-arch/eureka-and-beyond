import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "nuclear-decay-half-life",
  title: "Nuclear decay and half-life",
  summary: "Describe alpha, beta and gamma decay, balance nuclear equations, and use half-life to find remaining amounts and ages.",
  minutes: 35,
  objectives: [
    "Describe alpha, beta and gamma radiation and their penetrating power.",
    "Balance nuclear equations by conserving mass number and charge.",
    "Use N = N₀(½)^(t/T) to find remaining amounts and elapsed time.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  blocks: [
    def("Types of decay", r`Alpha ($^4_2\text{He}$): mass number −4, atomic number −2; stopped by paper. Beta-minus ($^0_{-1}e$): a neutron becomes a proton, so atomic number +1; stopped by aluminum. Gamma: a high-energy photon; reduced by thick lead or concrete.`),
    example(r`Balance the decays of uranium-238 (alpha) and carbon-14 (beta)`, [
      [r`^{238}_{92}\text{U} \to\, ^{234}_{90}\text{Th} + ^4_2\text{He}`, "Top numbers and bottom numbers each balance."],
      [r`^{14}_{6}\text{C} \to\, ^{14}_{7}\text{N} + ^0_{-1}e`, ""],
    ]),
    def("Half-life", r`Each nucleus decays at random, but a large sample halves in a fixed time $T$, its half-life: $N = N_0\left(\frac12\right)^{t/T}$.`),
    example(r`80 g of iodine-131 (half-life 8 days) after 24 days`, [
      [r`\tfrac{24}{8} = 3\ \text{half-lives}`, ""],
      [r`80 \to 40 \to 20 \to 10\ \text{g}`, ""],
    ]),
    example(r`A bone has 25% of its original carbon-14 (T = 5730 years)`, [
      [r`\tfrac14 = \left(\tfrac12\right)^2 \Rightarrow 2\ \text{half-lives}`, ""],
      [r`t = 2(5730) = 11{,}460\ \text{years}`, ""],
    ]),
    activity("half-life", { title: "Watch a sample decay", params: { halfLife: 5, time: 0 } }),
    callout("tip", "Try this", r`Move time to 5, 10 and 15 years: about 200, 100 and 50 nuclei remain. Press "New random sample" a few times and notice that the count scatters around the curve, more noticeably when few nuclei are left.`, "experiment"),
    callout("application", "Where this shows up", r`Carbon dating, smoke detectors (americium alpha source), medical tracers like technetium-99m (6-hour half-life) and cancer radiotherapy.`),
  ],
  questions: [
    num(2, r`What fraction of a sample remains after 4 half-lives? Give a decimal.`, 0.0625, { tolerance: 0.0001 }, [], r`$\left(\frac12\right)^4 = \frac{1}{16}$.`),
    num(2, r`A sample drops from 64 mg to 4 mg in 20 hours. Find the half-life.`, 5, { unit: "h" }, [], r`$\frac{64}{4} = 16 = 2^4$: four half-lives in 20 h.`),
    mc(2, r`Polonium-210 ($Z = 84$) undergoes alpha decay. The product is…`, ["Pb-206 (Z = 82)", "Pb-210 (Z = 82)", "Rn-214 (Z = 86)", "Bi-210 (Z = 83)"], 0, [], r`Mass −4, atomic number −2.`),
    mc(3, r`Which radiation needs the most shielding?`, ["alpha", "beta", "gamma", "all equal"], 2, [], r`Gamma rays are uncharged, high-energy photons.`, "review"),
  ],
});
