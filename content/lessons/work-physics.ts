import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "work-physics",
  title: "Work",
  summary: "Compute the work done by a constant force, including the angle between force and displacement, and recognize positive, negative and zero work.",
  minutes: 25,
  objectives: [
    "Compute W = Fd cos θ in joules.",
    "Decide when work is positive, negative or zero.",
    "Find total work as the sum of works by each force.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["work-energy"],
  blocks: [
    def("Work", r`A constant force $F$ acting over a displacement $d$ at angle $\theta$ does work $W = Fd\cos\theta$, measured in joules (1 J = 1 N·m). Only the component of force along the motion does work.`),
    example(r`A 50 N pull at 30° above horizontal drags a sled 10 m`, [
      [r`W = 50(10)\cos 30° \approx 433\ \text{J}`, ""],
    ]),
    example(r`Lifting a 10 kg box 2 m at constant speed`, [
      [r`W_{\text{you}} = mgh = 10(9.8)(2) = 196\ \text{J}`, ""],
      [r`W_{\text{gravity}} = -196\ \text{J}`, "Force opposite the motion."],
    ]),
    callout("tip", "Zero work", r`A force perpendicular to motion does no work: the normal force on a sliding box, or gravity on a satellite in a circular orbit.`),
    callout("application", "Where this shows up", r`Food energy is work capacity: 1 food Calorie = 4184 J, about enough to lift a 10 kg box up a 43 m building.`),
  ],
  questions: [
    num(1, r`A 20 N horizontal force pushes a cart 5 m. How much work does it do, in joules?`, 100, { unit: "J" }, [], r`$20 \times 5$.`),
    num(2, r`How much work does friction (8 N) do on a box sliding 3 m?`, -24, { unit: "J" }, [], r`Friction opposes motion: $-24$ J.`),
    mc(2, r`You carry a heavy bag horizontally at constant velocity. The work done by your upward force on the bag is…`, ["positive", "negative", "zero", "equal to mgh"], 2, [], r`Upward force, horizontal displacement: $\cos 90° = 0$.`),
    num(3, r`A 100 N force at 60° to the displacement acts over 4 m. Find the work, in joules.`, 200, { unit: "J" }, [], r`$100 \cdot 4 \cdot 0.5$.`, "review"),
  ],
});
