import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-orbits-escape",
  title: "Motion of orbiting satellites",
  summary: "Derive gravitational potential energy by integrating Newton's law, find escape speed and orbital energy, and apply conservation of energy and angular momentum to elliptical orbits.",
  minutes: 40,
  objectives: [
    "Derive U = −GMm/r from W = ∫F dr.",
    "Compute escape speed √(2GM/R) and circular-orbit energy −GMm/(2r).",
    "Use energy and angular momentum conservation between perigee and apogee.",
  ],
  concepts: [
    { slug: "circular-motion", name: "Circular motion and gravitation", description: "Motion in circles, centripetal force and universal gravitation.", subject: "subj_phys" },
  ],
  formulas: ["universal-gravitation", "calculus-mechanics"],
  blocks: [
    def("Potential energy from the force", r`Gravity's work bringing $m$ from infinity to $r$: $W = \int_\infty^r \left(-\frac{GMm}{r'^2}\right)dr' = \frac{GMm}{r}$, so $U(r) = -W = -\frac{GMm}{r}$. Lifting from Earth's surface to infinity takes $\frac{GMm}{R}$: about $6.25\times10^{10}$ J for a 1000 kg craft.`),
    def("Escape speed", r`Just escaping means $K + U = 0$: $\frac12mv^2 = \frac{GMm}{R}$, so $v_{esc} = \sqrt{\frac{2GM}{R}} \approx 11.2$ km/s from Earth's surface, independent of the craft's mass.`),
    def("Elliptical orbits", r`Between closest approach (perigee) and farthest (apogee), both $E = \frac12mv^2 - \frac{GMm}{r}$ and $L = mvr$ (perpendicular at these points) are conserved. Together they determine both speeds.`),
    example(r`A satellite at perigee r_p = 7 × 10⁶ m moves at 8.5 km/s. Find its speed at apogee r_a = 1.2 × 10⁷ m`, [
      [r`v_a = \tfrac{v_pr_p}{r_a} = \tfrac{8500(7\times10^6)}{1.2\times10^7}`, "Angular momentum conservation."],
      [r`v_a \approx 4960\ \text{m/s}`, ""],
    ]),
    callout("application", "Where this shows up", r`Transfer orbits to geostationary altitude and to Mars are ellipses planned with exactly these two conservation laws.`),
  ],
  questions: [
    num(2, r`Find the escape speed from the Moon (M = 7.35 × 10²² kg, R = 1.74 × 10⁶ m), in km/s, to two decimal places.`, 2.37, { tolerance: 0.01, unit: "km/s" }, ["v_esc = √(2GM/R); convert to km/s."], r`$\sqrt{\frac{2(6.674\times10^{-11})(7.35\times10^{22})}{1.74\times10^6}}$.`),
    num(3, r`How much energy (in units of $10^{10}$ J) does it take to move a 1000 kg satellite from Earth's surface into a circular orbit at r = 2R? Use GMm/R = 6.25 × 10¹⁰ J.`, 4.69, { tolerance: 0.02 }, ["Start: E = −GMm/R (at rest on the surface, ignoring rotation). Orbit at 2R: E = −GMm/(2·2R).", "The energy needed is the difference."], r`$E_f - E_i = -\frac{GMm}{4R} + \frac{GMm}{R} = \frac34(6.25)$.`),
    mc(2, r`Escape speed from a planet depends on…`, ["the object's mass", "the planet's mass and radius", "the launch angle only", "the object's shape"], 1, ["Set ½mv² = GMm/R. Does m survive?"], r`$\sqrt{\frac{2GM}{R}}$.`),
    mc(3, r`In an elliptical orbit, the satellite moves fastest at…`, ["apogee", "perigee", "the minor axis", "constant speed"], 1, ["Angular momentum mvr is conserved along the orbit. Where is r smallest?"], r`Smallest r, so the largest v for constant L.`, "review"),
  ],
});
