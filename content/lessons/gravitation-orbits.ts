import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "gravitation-orbits",
  title: "Universal gravitation and orbits",
  summary: "Use Newton's law of universal gravitation, explain the value of g at Earth's surface, and find orbital speeds and periods for circular orbits.",
  minutes: 30,
  objectives: [
    "Compute gravitational forces with F = Gm₁m₂/r².",
    "Explain the inverse-square dependence on distance.",
    "Find orbital speed v = √(GM/r) and period for a circular orbit.",
  ],
  concepts: [
    { slug: "circular-motion", name: "Circular motion and gravitation", description: "Motion in circles, centripetal force and universal gravitation.", subject: "subj_phys" },
  ],
  formulas: ["universal-gravitation", "centripetal-acceleration"],
  blocks: [
    def("Universal gravitation", r`Every two masses attract with $F = \frac{Gm_1m_2}{r^2}$, $G = 6.67 \times 10^{-11}$ N·m²/kg². At Earth's surface, $g = \frac{GM_E}{R_E^2} \approx 9.8$ m/s².`),
    example(r`Speed of the International Space Station, 420 km up`, [
      [r`r = 6.371 \times 10^6 + 4.2 \times 10^5 = 6.79 \times 10^6\ \text{m}`, "Measured from Earth's center."],
      [r`\tfrac{mv^2}{r} = \tfrac{GMm}{r^2} \Rightarrow v = \sqrt{\tfrac{GM}{r}} \approx 7.66\ \text{km/s}`, r`With $M_E = 5.97 \times 10^{24}$ kg.`],
      [r`T = \tfrac{2\pi r}{v} \approx 93\ \text{min}`, ""],
    ]),
    callout("note", "Weightlessness", r`Astronauts on the ISS still have about 90% of their surface weight. They feel weightless because they and the station fall around Earth together.`),
    callout("application", "Where this shows up", r`GPS satellites, weather satellites and the Moon all follow the same rule; geostationary satellites orbit at the one radius where the period matches Earth's rotation (one sidereal day, about 23 h 56 min).`),
  ],
  questions: [
    mc(1, r`If the distance between two masses triples, the gravitational force becomes…`, ["1/3 as large", "1/9 as large", "3 times as large", "9 times as large"], 1, [], r`Inverse square.`),
    num(2, r`Find the gravitational force between two 100 kg masses 1 m apart, in units of $10^{-7}$ N.`, 6.67, { tolerance: 0.01 }, [], r`$6.67 \times 10^{-11} \times 10^4 = 6.67 \times 10^{-7}$ N.`),
    mc(2, r`A satellite in a lower circular orbit moves…`, ["slower", "faster", "at the same speed", "backward"], 1, [], r`$v = \sqrt{GM/r}$ grows as $r$ shrinks.`),
    mc(3, r`On a planet with twice Earth's mass and twice its radius, surface gravity is…`, ["2g", "g", "g/2", "4g"], 2, [], r`$\frac{2}{2^2} = \frac{1}{2}$.`, "review"),
  ],
});
