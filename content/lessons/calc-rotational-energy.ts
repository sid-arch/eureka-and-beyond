import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-rotational-energy",
  title: "Rotational kinetic energy",
  summary: "Derive K_rot = ½Iω² by integrating over mass elements, and use energy conservation for rotating and swinging objects.",
  minutes: 30,
  objectives: [
    "Derive K = ½Iω² from ∫½v² dm with v = rω.",
    "Use energy conservation for rods and other objects swinging about a pivot.",
    "Use the center-of-mass height for gravitational energy.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics", "calculus-rotation"],
  blocks: [
    def("Derivation", r`Each mass element moves at $v = r\omega$, so $K = \int\frac12v^2\,dm = \frac12\omega^2\int r^2\,dm = \frac12I\omega^2$.`),
    example(r`A uniform 1.5 m rod pivoted at one end swings down from horizontal`, [
      [r`mg\tfrac L2 = \tfrac12\left(\tfrac13mL^2\right)\omega^2`, "Its center of mass drops L/2."],
      [r`\omega = \sqrt{\tfrac{3g}{L}} = \sqrt{19.6} \approx 4.43\ \text{rad/s}`, ""],
      [r`v_{tip} = \omega L = \sqrt{3gL} \approx 6.64\ \text{m/s}`, "Faster than an object dropped 1.5 m (5.42 m/s)."],
    ]),
    callout("application", "Where this shows up", r`Flywheel energy storage, falling trees, and swinging gates all follow this energy bookkeeping.`),
  ],
  questions: [
    num(2, r`A uniform 0.6 m rod pivoted at one end swings down from horizontal. Find ω at the bottom, to two decimal places.`, 7, { tolerance: 0.01, unit: "rad/s" }, ["The center of mass drops L/2. Set Mg(L/2) = ½(⅓ML²)ω²."], r`$\sqrt{\frac{3(9.8)}{0.6}} = \sqrt{49}$.`),
    num(2, r`Find the kinetic energy of a 3 kg solid disk (R = 0.2 m) at 10 rad/s.`, 3, { unit: "J" }, ["K = ½Iω² with I = ½MR² for a solid disk."], r`$\frac12\left(\frac12(3)(0.04)\right)(100)$.`),
    mc(2, r`For an object both moving and spinning, total kinetic energy is…`, ["½mv² only", "½Iω² only", "½Mv_cm² + ½I_cm ω²", "Iω"], 2, ["Split the motion into the center of mass moving and rotation about the center of mass."], r`Translation of the center of mass plus rotation about it.`),
    mc(3, r`A rod swinging from a pivot: its gravitational potential energy depends on the height of…`, ["its pivot", "its tip", "its center of mass", "its lowest point"], 2, ["U = Mgy for the whole object, using one representative point. Which?"], r`$U = Mgy_{cm}$.`, "review"),
  ],
});
