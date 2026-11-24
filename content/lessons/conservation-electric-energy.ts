import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "conservation-electric-energy",
  title: "Conservation of electric energy",
  summary: "Use conservation of energy, ΔK = −qΔV, to find speeds of charged particles accelerated through potential differences.",
  minutes: 30,
  objectives: [
    "Apply K_i + qV_i = K_f + qV_f to charged particles.",
    "Find final speeds after acceleration through a potential difference.",
    "Compare protons, electrons and alpha particles accelerated through the same voltage.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Energy conservation", r`With only electric forces doing work, $K_i + qV_i = K_f + qV_f$, so $\Delta K = -q\Delta V$. Positive charges speed up moving toward lower potential; negative charges speed up moving toward higher potential. In eV: a charge $ne$ through $V$ volts gains $nV$ eV.`),
    example(r`A proton accelerated from rest through 2000 V`, [
      [r`K = 2000\ \text{eV} = 3.20\times10^{-16}\ \text{J}`, ""],
      [r`v = \sqrt{\tfrac{2(3.20\times10^{-16})}{1.67\times10^{-27}}}`, ""],
      [r`v \approx 6.2\times10^5\ \text{m/s}`, ""],
    ]),
    example(r`An alpha particle (charge +2e) through 1000 V`, [
      [r`K = 2(1000) = 2000\ \text{eV}`, "Same energy as the proton above, from half the voltage."],
    ]),
    callout("note", "Why use eV", r`Through the same voltage, an electron and a proton gain the same energy (in eV), but the electron is about 43 times faster: $\sqrt{1836} \approx 43$.`),
    callout("application", "Where this shows up", r`X-ray tubes accelerate electrons through tens of kilovolts, and particle accelerators and mass spectrometers start by accelerating ions through known voltages.`),
  ],
  questions: [
    num(2, r`An electron accelerates from rest through 500 V. Find its kinetic energy, in units of $10^{-17}$ J.`, 8.01, { tolerance: 0.01 }, [], r`$500 \times 1.602\times10^{-19}$.`),
    num(3, r`A proton starts at 3 × 10⁵ m/s and moves through a potential rise of 300 V. Find its final speed, in units of $10^5$ m/s, to one decimal place.`, 1.8, { tolerance: 0.05 }, [], r`$K_i = 7.52\times10^{-17}$ J; it loses $4.81\times10^{-17}$ J, leaving $2.71\times10^{-17}$ J, so $v \approx 1.8\times10^5$ m/s.`),
    mc(2, r`An electron released between charged plates moves toward…`, ["the negative plate", "the positive plate (higher potential)", "neither", "the edge"], 1, [], r`Negative charges move toward higher potential.`),
    mc(3, r`An electron and a proton are accelerated through the same voltage. They gain the same…`, ["speed", "kinetic energy", "momentum", "acceleration"], 1, [], r`$K = |q|\Delta V$ with equal |q|.`, "review"),
  ],
});
