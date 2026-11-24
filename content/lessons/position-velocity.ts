import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "position-velocity",
  title: "Position, displacement and velocity",
  summary: "Describe one-dimensional motion with position and displacement, compute average velocity and average speed, and read velocity from the slope of a position-time graph.",
  minutes: 25,
  objectives: [
    "Define position relative to an origin and displacement as change in position.",
    "Compute average velocity Δx/Δt and average speed (distance/time).",
    "Interpret slope on a position-time graph as velocity.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  blocks: [
    def("Velocity", r`Average velocity $= \frac{\Delta x}{\Delta t}$, a vector (its sign gives direction). Average speed $= \frac{\text{distance}}{\Delta t}$, a scalar. Instantaneous velocity is the slope of the position-time graph at a moment.`),
    example(r`A runner completes one 400 m lap in 80 s`, [
      [r`\text{average speed} = \tfrac{400}{80} = 5\ \text{m/s}`, ""],
      [r`\text{average velocity} = \tfrac{0}{80} = 0`, "Back at the start."],
    ]),
    activity("motion-graphs", { title: "Slope of x–t is velocity", params: { v0: 4, a: 0, x0: -10, t: 3 } }),
    callout("tip", "Try this", r`With $a = 0$, the position graph is a straight line whose slope equals the velocity you set. Make $v_0$ negative and the line slopes down.`, "experiment"),
    callout("application", "Where this shows up", r`Speed cameras that time cars between two points measure average speed; radar guns measure instantaneous speed.`),
  ],
  questions: [
    num(1, r`A cyclist moves from $x = 20$ m to $x = 80$ m in 12 s. Find the average velocity.`, 5, { unit: "m/s" }, [], r`$\frac{60}{12}$.`),
    num(2, r`A car drives 30 km east in 0.5 h, then 10 km west in 0.25 h. Find its average velocity in km/h (east positive).`, 26.67, { tolerance: 0.02, unit: "km/h" }, [], r`$\frac{20}{0.75} \approx 26.67$.`),
    num(2, r`For that trip, find the average speed in km/h.`, 53.33, { tolerance: 0.02, unit: "km/h" }, [], r`$\frac{40}{0.75} \approx 53.33$.`),
    mc(3, r`A position-time graph is a horizontal line. The object is…`, ["moving at constant speed", "at rest", "accelerating", "moving backward"], 1, [], r`Zero slope: zero velocity.`, "review"),
  ],
});
