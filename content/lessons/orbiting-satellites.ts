import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "orbiting-satellites",
  title: "Motion of orbiting satellites",
  summary: "Analyze circular and elliptical orbits with forces, energy and angular momentum; compute orbital speed, period, orbital energy and escape speed.",
  minutes: 35,
  objectives: [
    "Derive v = √(GM/r) and T = 2πr/v for circular orbits.",
    "Use total orbital energy E = −GMm/(2r).",
    "Compute escape speed, and apply Kepler's laws.",
  ],
  concepts: [
    { slug: "circular-motion", name: "Circular motion and gravitation", description: "Motion in circles, centripetal force and universal gravitation.", subject: "subj_phys" },
  ],
  formulas: ["universal-gravitation"],
  blocks: [
    def("Circular orbits", r`Gravity provides the centripetal force: $\frac{GMm}{r^2} = \frac{mv^2}{r}$, so $v = \sqrt{\frac{GM}{r}}$ and $T = \frac{2\pi r}{v}$. Squaring gives Kepler's third law, $T^2 = \frac{4\pi^2}{GM}r^3$.`),
    example(r`The ISS at 400 km altitude (r = 6.77 × 10⁶ m)`, [
      [r`v = \sqrt{\tfrac{(6.674\times10^{-11})(5.97\times10^{24})}{6.77\times10^6}}`, ""],
      [r`v \approx 7670\ \text{m/s}`, ""],
      [r`T = \tfrac{2\pi(6.77\times10^6)}{7670}`, ""],
      [r`T \approx 5540\ \text{s} \approx 92\ \text{min}`, ""],
    ]),
    def("Orbital energy", r`$K = \frac{GMm}{2r}$ and $U = -\frac{GMm}{r}$, so $E = -\frac{GMm}{2r}$. A lower orbit has less total energy but more kinetic energy: drag makes a satellite spiral down and speed up. To escape completely, $E \ge 0$: $v_{esc} = \sqrt{\frac{2GM}{R}} \approx 11.2$ km/s from Earth's surface.`),
    def("Elliptical orbits", r`In an ellipse, energy and angular momentum about the central body are both conserved. The satellite is fastest at closest approach, where $U$ is most negative.`),
    callout("application", "Where this shows up", r`GPS satellites orbit at about 20,200 km with 12-hour periods; geostationary satellites at r ≈ 42,200 km take 24 hours and appear fixed in the sky.`),
  ],
  questions: [
    num(2, r`A satellite's orbital radius is multiplied by 4. By what factor does its period change?`, 8, {}, ["Kepler's third law: T² ∝ r³."], r`$T \propto r^{3/2} = 4^{1.5}$.`),
    num(2, r`By what factor does its orbital speed change?`, 0.5, {}, ["For a circular orbit, v = √(GM/r)."], r`$v \propto \frac{1}{\sqrt r}$.`),
    mc(2, r`Astronauts on the ISS float because…`, ["there's no gravity in orbit", "they and the station are in free fall together", "the station spins", "air pressure holds them"], 1, ["Gravity is still strong at ISS altitude. What are the astronauts and the station all doing?"], r`Gravity there is still about 90% of surface gravity.`),
    mc(3, r`To move a satellite to a higher circular orbit, its total energy must…`, ["decrease", "increase", "stay the same", "become zero"], 1, ["Orbital total energy is E = −GMm/(2r). What happens to E as r grows?"], r`$E = -\frac{GMm}{2r}$ rises toward zero as r grows, even though the final speed is lower.`, "review"),
  ],
});
