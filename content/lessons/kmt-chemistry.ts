import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "kmt-chemistry",
  title: "Kinetic molecular theory",
  summary: "State the postulates of kinetic molecular theory, explain gas properties with them, and compare effusion rates with Graham's law.",
  minutes: 30,
  objectives: [
    "State the postulates of kinetic molecular theory.",
    "Explain pressure, diffusion and compressibility with particle motion.",
    "Use Graham's law: rate₁/rate₂ = √(M₂/M₁).",
  ],
  concepts: [
    { slug: "kinetic-molecular-theory", name: "Kinetic molecular theory", description: "A model of gases as tiny particles in constant random motion with elastic collisions.", subject: "subj_chem" },
  ],
  blocks: [
    def("Postulates", r`Gas particles: are tiny compared with the spaces between them; move constantly and randomly in straight lines; collide elastically; don't attract or repel each other; and have an average kinetic energy proportional to the kelvin temperature.`),
    def("Graham's law", r`At the same temperature, all gases have the same average kinetic energy, so lighter molecules move faster: $\frac{\text{rate}_1}{\text{rate}_2} = \sqrt{\frac{M_2}{M_1}}$.`),
    example(r`How much faster does helium (4.00 g/mol) effuse than oxygen (32.00 g/mol)?`, [
      [r`\sqrt{\tfrac{32.00}{4.00}} = \sqrt8 \approx 2.83\ \text{times faster}`, ""],
    ]),
    activity("ideal-gas", { title: "Particles and pressure" }),
    callout("application", "Where this shows up", r`Helium balloons deflate faster than air-filled ones, and uranium was enriched for reactors by repeated effusion of UF₆.`),
  ],
  questions: [
    num(2, r`How much faster does H₂ (2.016 g/mol) effuse than CO₂ (44.01 g/mol)? Two decimal places.`, 4.67, { tolerance: 0.01 }, [], r`$\sqrt{\frac{44.01}{2.016}}$.`),
    mc(2, r`Gases are easily compressed because…`, ["particles are soft", "there's mostly empty space between particles", "particles attract", "they're hot"], 1, [], r`Postulate 1.`),
    mc(2, r`Raising the temperature of a gas raises the particles'…`, ["mass", "average kinetic energy", "size", "number"], 1, [], r`KE is proportional to T in kelvin.`),
    mc(3, r`Real gases deviate most from the KMT model at…`, ["high T, low P", "low T, high P", "room conditions", "in vacuum"], 1, [], r`Particles are close and attract.`, "review"),
  ],
});
