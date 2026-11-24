import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "fission-fusion",
  title: "Fission, fusion and nuclear excitation",
  summary: "Explain fission chain reactions and fusion in stars, compute energy releases, and describe excited nuclei emitting gamma rays.",
  minutes: 35,
  objectives: [
    "Describe fission of heavy nuclei and chain reactions.",
    "Describe fusion of light nuclei and why it needs extreme temperatures.",
    "Compute energy released per reaction and per kilogram, and describe nuclear excitation.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  formulas: ["modern-physics"],
  blocks: [
    def("Fission", r`A slow neutron absorbed by uranium-235 makes it split into two medium nuclei, releasing about 200 MeV and 2–3 neutrons. Those neutrons can trigger more fissions: a chain reaction. Reactors keep it steady with control rods that absorb neutrons; bombs let it run away.`),
    example(r`Energy from fissioning 1 kg of uranium-235`, [
      [r`N = \tfrac{1\ \text{kg}}{235(1.6605\times10^{-27}\ \text{kg})}`, ""],
      [r`N \approx 2.56\times10^{24}`, ""],
      [r`E = (2.56\times10^{24})(200\ \text{MeV})`, ""],
      [r`E \approx 8.2\times10^{13}\ \text{J}`, "About 3 million times more than burning 1 kg of coal."],
    ]),
    def("Fusion", r`Light nuclei fuse into heavier ones, for example deuterium + tritium → helium-4 + neutron, releasing 17.6 MeV. Nuclei must get close enough for the strong force despite electric repulsion, which takes temperatures of millions of kelvin, like those in stars' cores.`),
    def("Nuclear excitation", r`Like atoms, nuclei have discrete energy levels. A nucleus left excited after a decay or collision drops to its ground state by emitting a gamma-ray photon of a specific energy (keV to MeV).`),
    callout("application", "Where this shows up", r`Nuclear plants supply about 10% of the world's electricity; the Sun fuses 600 million tonnes of hydrogen per second; fusion reactors like ITER aim to reproduce that on Earth.`),
  ],
  questions: [
    num(2, r`Convert the 17.6 MeV released by one D–T fusion to joules, in units of $10^{-12}$ J, to two decimal places.`, 2.82, { tolerance: 0.01 }, [], r`$17.6\times10^6 \times 1.602\times10^{-19}$.`),
    mc(2, r`Control rods in a reactor work by…`, ["adding fuel", "absorbing neutrons", "cooling the water", "speeding up neutrons"], 1, [], r`Fewer neutrons, fewer fissions.`),
    mc(2, r`Fusion needs extremely high temperatures because…`, ["nuclei must overcome electric repulsion", "neutrons need heat", "the strong force is weak", "light nuclei are unstable"], 0, [], r`Only very fast nuclei get close enough.`),
    mc(3, r`Both fission of uranium and fusion of hydrogen release energy because the products…`, ["have more mass", "have higher binding energy per nucleon", "are lighter elements", "are radioactive"], 1, [], r`Both move toward iron's peak.`, "review"),
  ],
});
