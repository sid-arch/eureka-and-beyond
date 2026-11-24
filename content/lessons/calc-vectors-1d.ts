import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-vectors-1d",
  title: "Scalars and vectors in one dimension",
  summary: "Represent one-dimensional vectors with a sign and a unit vector, and distinguish displacement from distance and velocity from speed, including as integrals.",
  minutes: 25,
  objectives: [
    "Write 1D vectors as components times the unit vector î.",
    "Distinguish displacement and distance, velocity and speed.",
    "Express displacement as ∫v dt and distance as ∫|v| dt.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Vectors on a line", r`In one dimension a vector is a signed number times the unit vector $\hat\imath$: $\vec v = -3\,\hat\imath$ m/s points in −x. Scalars such as mass, time, speed and distance have no direction.`),
    def("Displacement and distance", r`Displacement $\Delta x = x_f - x_i = \int v\,dt$ depends only on the endpoints. Distance $\int|v|\,dt$ counts every meter traveled. Average velocity is $\frac{\Delta x}{\Delta t}$; average speed is $\frac{\text{distance}}{\Delta t}$.`),
    example(r`Walk 10 m east in 2 s, then 4 m west in 2 s`, [
      [r`\Delta x = +10 - 4 = +6\ \text{m},\ d = 14\ \text{m}`, ""],
      [r`\bar v = \tfrac{6}{4} = 1.5\ \text{m/s}`, "Average velocity."],
      [r`\tfrac{14}{4} = 3.5\ \text{m/s}`, "Average speed."],
    ]),
    callout("application", "Where this shows up", r`A runner who finishes a 400 m lap where they started has zero displacement and zero average velocity, but a very nonzero average speed.`),
  ],
  questions: [
    num(1, r`An object moves from x = −3 m to x = 5 m in 4 s. Find its average velocity.`, 2, { unit: "m/s" }, ["Average velocity = displacement ÷ time; displacement is final minus initial position."], r`$\frac{8}{4}$.`),
    num(2, r`v(t) = 3 − t from 0 to 6 s. Find the displacement.`, 0, { unit: "m" }, ["Displacement is the integral of v(t) over the interval."], r`$3t - \frac{t^2}{2}$ at 6 is $18 - 18$.`),
    num(2, r`For the same motion, find the distance traveled.`, 9, { unit: "m" }, ["Find when v changes sign, then add the size of each piece's displacement."], r`4.5 m forward (0–3 s), then 4.5 m back.`),
    mc(3, r`Which can be negative?`, ["speed", "distance", "displacement", "mass"], 2, ["Which of these is a vector quantity along a line?"], r`Displacement has a direction.`, "review"),
  ],
});
