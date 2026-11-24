import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electric-potential-energy",
  title: "Electric potential energy",
  summary: "Compute the potential energy of systems of point charges, find the work needed to assemble them, and use electron-volts.",
  minutes: 30,
  objectives: [
    "Compute U = kq₁q₂/r for a pair of charges, with signs.",
    "Find the total potential energy of several charges by adding pairs.",
    "Use the electron-volt, 1 eV = 1.602 × 10⁻¹⁹ J.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Potential energy of charges", r`Two point charges have $U = \frac{kq_1q_2}{r}$, zero when infinitely far apart. Like charges give $U > 0$ (work was needed to push them together); opposite charges give $U < 0$ (a bound system). For three or more charges, add $U$ for every pair.`),
    example(r`+2 μC and +3 μC, 0.1 m apart`, [
      [r`U = \tfrac{(8.99\times10^9)(2\times10^{-6})(3\times10^{-6})}{0.1}`, ""],
      [r`U \approx 0.539\ \text{J}`, "This is the work needed to bring them in from far apart."],
    ]),
    def("Electron-volts", r`One electron-volt is the energy an electron gains moving through 1 V: $1\ \text{eV} = 1.602\times10^{-19}$ J. Atomic energies are a few eV; nuclear energies are millions of eV (MeV).`),
    example(r`An electron accelerates from rest through 100 V`, [
      [r`K = 100\ \text{eV} = 1.6\times10^{-17}\ \text{J}`, ""],
      [r`v = \sqrt{\tfrac{2(1.6\times10^{-17})}{9.11\times10^{-31}}}`, ""],
      [r`v \approx 5.9\times10^6\ \text{m/s}`, ""],
    ]),
    callout("application", "Where this shows up", r`Chemical bond energies, battery energy storage and the energy released when ions combine are all electric potential energy.`),
  ],
  questions: [
    num(2, r`Find U for +1 μC and −1 μC charges 0.3 m apart, to three decimal places.`, -0.03, { tolerance: 0.0002, unit: "J" }, [], r`$\frac{8.99\times10^9(-10^{-12})}{0.3} \approx -0.030$.`),
    num(2, r`Convert 5 eV to joules, in units of $10^{-19}$ J.`, 8.01, { tolerance: 0.01 }, [], r`$5 \times 1.602$.`),
    mc(2, r`Two electrons are released from rest near each other. As they fly apart, the system's potential energy…`, ["increases", "decreases, becoming kinetic energy", "stays the same", "becomes negative"], 1, [], r`Like charges: U falls as r grows.`),
    mc(3, r`Three charges at the corners of a triangle. How many terms are in the total U?`, ["1", "2", "3", "6"], 2, [], r`One for each pair.`, "review"),
  ],
});
