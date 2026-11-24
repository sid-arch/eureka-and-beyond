import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-kinematics-derivatives",
  title: "Displacement, velocity and acceleration as derivatives",
  summary: "Define instantaneous velocity and acceleration as derivatives of position, find when an object is at rest or turning around, and tell speeding up from slowing down.",
  minutes: 35,
  objectives: [
    "Compute v = dx/dt and a = dv/dt = d²x/dt² from a position function.",
    "Find when an object is at rest and when it changes direction.",
    "Decide whether an object is speeding up or slowing down from the signs of v and a.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Instantaneous rates", r`Average velocity over an interval, $\frac{\Delta x}{\Delta t}$, becomes the instantaneous velocity in the limit $\Delta t \to 0$: $v = \frac{dx}{dt}$, the slope of the position graph. Likewise $a = \frac{dv}{dt} = \frac{d^2x}{dt^2}$.`),
    example(r`x(t) = t³ − 6t² + 9t (meters, seconds)`, [
      [r`v = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)`, ""],
      [r`a = 6t - 12`, ""],
      [r`v = 0\ \text{at}\ t = 1\ \text{s and}\ t = 3\ \text{s}`, "Turning points: v changes sign at both."],
      [r`t = 2:\ x = 2\ \text{m},\ v = -3\ \text{m/s},\ a = 0`, ""],
    ]),
    def("Speeding up or slowing down", r`Speed increases when $v$ and $a$ have the same sign, and decreases when they have opposite signs. In the example, between 1 s and 2 s both are negative, so the object speeds up while moving backward; between 2 s and 3 s it slows down.`),
    activity("motion-graphs", { title: "Position and velocity graphs together" }),
    callout("application", "Where this shows up", r`Phone accelerometers and car crash sensors measure a; navigation software integrates and differentiates to track motion between GPS fixes.`),
  ],
  questions: [
    num(2, r`For x(t) = 4t² − t³, find v at t = 1 s.`, 5, { unit: "m/s" }, ["v = dx/dt."], r`$v = 8t - 3t^2$.`),
    num(2, r`For the same motion, find a at t = 1 s.`, 2, { unit: "m/s²" }, ["a = dv/dt = d²x/dt²."], r`$a = 8 - 6t$.`),
    num(3, r`For x(t) = 4t² − t³, at what positive time is the object momentarily at rest? Give two decimal places.`, 2.67, { tolerance: 0.01, unit: "s" }, ["At rest means v = 0. Solve dx/dt = 0 for t > 0."], r`$8t - 3t^2 = 0$ gives $t = \frac83$.`),
    mc(3, r`At an instant, v = −2 m/s and a = +3 m/s². The object is…`, ["speeding up", "slowing down", "at rest", "moving at constant speed"], 1, ["Compare the signs of v and a. Is the acceleration with the motion or against it?"], r`Opposite signs: slowing down.`, "review"),
  ],
});
