import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "acceleration-motion-graphs",
  title: "Acceleration and motion graphs",
  summary: "Define acceleration as the rate of change of velocity, and move between position-time, velocity-time and acceleration-time graphs using slopes and areas.",
  minutes: 30,
  objectives: [
    "Compute average acceleration Δv/Δt.",
    "Read acceleration as the slope of a velocity-time graph.",
    "Read displacement as the area under a velocity-time graph.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  blocks: [
    def("Acceleration", r`$a = \frac{\Delta v}{\Delta t}$, in m/s². An object speeds up when velocity and acceleration point the same way, and slows down when they point opposite ways.`),
    example(r`A car goes from 0 to 27 m/s in 9 s`, [
      [r`a = \tfrac{27 - 0}{9} = 3\ \text{m/s}^2`, ""],
    ]),
    def("Reading graphs", r`On a velocity-time graph, slope = acceleration and area between the graph and the time axis = displacement (area below the axis counts as negative).`),
    example(r`Velocity rises steadily from 0 to 10 m/s in 4 s`, [
      [r`\text{slope} = 2.5\ \text{m/s}^2`, ""],
      [r`\text{area} = \tfrac{1}{2}(4)(10) = 20\ \text{m}`, "Displacement."],
    ]),
    activity("motion-graphs", { title: "Throw the cart forward against a backward push", params: { v0: 8, a: -2, x0: 0, t: 4 } }),
    callout("tip", "Try this", r`At $t = 4$ s the velocity graph crosses zero: the cart stops and turns around, and the position graph peaks.`, "experiment"),
    callout("application", "Where this shows up", r`Car reviews quote 0–100 km/h times, which are average accelerations; crash investigators read skid marks to work backward to initial speeds.`),
  ],
  questions: [
    num(1, r`A bike slows from 12 m/s to 4 m/s in 2 s. Find its acceleration.`, -4, { unit: "m/s²" }, [], r`$\frac{4 - 12}{2}$.`),
    mc(2, r`Velocity is −5 m/s and acceleration is −2 m/s². The object is…`, ["speeding up", "slowing down", "at rest", "moving at constant speed"], 0, [], r`Same signs: speeding up (in the negative direction).`),
    num(2, r`A velocity-time graph is constant at 6 m/s from $t = 0$ to $t = 5$ s. Find the displacement.`, 30, { unit: "m" }, [], r`Rectangle area $6 \times 5$.`),
    mc(3, r`A position-time graph is a parabola opening upward. The acceleration is…`, ["zero", "positive and constant", "negative and constant", "increasing"], 1, [], r`$x = x_0 + v_0t + \frac{1}{2}at^2$ with $a > 0$.`, "review"),
  ],
});
