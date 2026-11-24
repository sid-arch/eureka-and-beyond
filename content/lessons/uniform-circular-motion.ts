import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "uniform-circular-motion",
  title: "Uniform circular motion",
  summary: "Explain why motion in a circle at constant speed is accelerated, compute centripetal acceleration and force, and identify which real force provides it.",
  minutes: 30,
  objectives: [
    "Compute v = 2πr/T and a_c = v²/r.",
    "Explain that the net force points toward the center.",
    "Identify the force supplying the centripetal force (tension, friction, gravity, normal force).",
  ],
  concepts: [
    { slug: "circular-motion", name: "Circular motion and gravitation", description: "Motion in circles, centripetal force and universal gravitation.", subject: "subj_phys" },
  ],
  formulas: ["centripetal-acceleration"],
  blocks: [
    def("Centripetal acceleration", r`At constant speed in a circle, velocity keeps changing direction, so the object accelerates toward the center: $a_c = \frac{v^2}{r}$. By Newton's second law the net force is also inward: $F_c = \frac{mv^2}{r}$.`),
    example(r`A 1000 kg car rounds a curve of radius 50 m at 20 m/s`, [
      [r`a_c = \tfrac{20^2}{50} = 8\ \text{m/s}^2`, ""],
      [r`F_c = 1000(8) = 8000\ \text{N}`, "Supplied by friction between tires and road."],
    ]),
    example(r`A 0.5 kg ball on a 1.2 m string makes one turn every 0.8 s`, [
      [r`v = \tfrac{2\pi(1.2)}{0.8} \approx 9.42\ \text{m/s}`, ""],
      [r`T_{\text{string}} = \tfrac{0.5(9.42)^2}{1.2} \approx 37\ \text{N}`, "Ignoring gravity's small effect."],
    ]),
    callout("warning", "No outward force", r`"Centrifugal force" isn't a real force on the object. If the string breaks, the ball flies off along the tangent, not outward along the radius.`),
    callout("application", "Where this shows up", r`Highway curves are banked and given speed limits so that friction plus the tilted normal force can supply $\frac{mv^2}{r}$; centrifuges spin samples to separate them.`),
  ],
  questions: [
    num(1, r`Find the centripetal acceleration of a point moving at 6 m/s on a circle of radius 3 m.`, 12, { unit: "m/s²" }, [], r`$\frac{36}{3}$.`),
    mc(2, r`If the speed doubles on the same circle, the centripetal force…`, ["doubles", "quadruples", "halves", "stays the same"], 1, [], r`$F \propto v^2$.`),
    num(2, r`A 0.2 kg stone whirls at 5 m/s on a 0.5 m string (horizontal circle). Find the tension, in newtons.`, 10, { unit: "N" }, [], r`$\frac{0.2 \cdot 25}{0.5}$.`),
    mc(3, r`What supplies the centripetal force for the Moon orbiting Earth?`, ["Tension", "Friction", "Earth's gravity", "The Moon's inertia"], 2, [], r`Gravity points toward Earth's center.`, "review"),
  ],
});
