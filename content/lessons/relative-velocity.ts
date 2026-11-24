import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "relative-velocity",
  title: "Relative velocity",
  summary: "Describe motion from different reference frames, add velocities as vectors, and solve river-crossing and crosswind problems.",
  minutes: 30,
  objectives: [
    "Explain that velocity depends on the reference frame.",
    "Add relative velocities: v(A rel C) = v(A rel B) + v(B rel C).",
    "Solve boat-in-a-current and plane-in-a-wind problems with vector components.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  blocks: [
    def("Reference frames", r`A velocity is always measured relative to something. Velocities chain like subscripts cancelling: $\vec v_{AC} = \vec v_{AB} + \vec v_{BC}$. A passenger walking forward at 1.5 m/s on a train moving at 20 m/s moves at 21.5 m/s relative to the ground.`),
    example(r`A boat heads straight across an 80 m river at 4 m/s; the current is 3 m/s downstream`, [
      [r`v = \sqrt{4^2 + 3^2} = 5\ \text{m/s}`, "Speed relative to the shore."],
      [r`\theta = \tan^{-1}\tfrac{3}{4} \approx 36.9°`, "Angle downstream from straight across."],
      [r`t = \tfrac{80}{4} = 20\ \text{s}`, "Only the cross-river component moves the boat across."],
      [r`\text{drift} = 3 \times 20 = 60\ \text{m}`, "Distance carried downstream."],
    ]),
    example(r`To land directly across, a 5 m/s boat must aim upstream against the 3 m/s current`, [
      [r`\sin\theta = \tfrac{3}{5} \Rightarrow \theta \approx 36.9°`, "Upstream from straight across, so the upstream component cancels the current."],
      [r`v_{\text{across}} = \sqrt{5^2 - 3^2} = 4\ \text{m/s}`, ""],
    ]),
    activity("vectors", { title: "Add the boat and current vectors" }),
    callout("application", "Where this shows up", r`Pilots compute a heading that corrects for wind (the "wind triangle"), and ships and swimmers in rip currents use the same reasoning.`),
  ],
  questions: [
    num(2, r`A plane flies north at 200 km/h relative to the air, with a 50 km/h wind blowing east. Find its ground speed, to the nearest km/h.`, 206, { tolerance: 1, unit: "km/h" }, [], r`$\sqrt{200^2 + 50^2} \approx 206$.`),
    num(1, r`You walk toward the back of a train at 2 m/s; the train moves forward at 25 m/s. Find your speed relative to the ground.`, 23, { unit: "m/s" }, [], r`$25 - 2$.`),
    num(2, r`In the river example, how long does the boat aiming upstream (5 m/s) take to cross 80 m?`, 20, { unit: "s" }, [], r`Cross component 4 m/s: $\frac{80}{4}$.`),
    mc(3, r`Increasing the current speed changes the straight-across crossing time (boat aimed straight across) by…`, ["making it longer", "making it shorter", "not at all", "doubling it"], 2, [], r`The current is perpendicular to the crossing direction; only the drift changes.`, "review"),
  ],
});
