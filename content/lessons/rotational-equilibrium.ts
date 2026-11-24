import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rotational-equilibrium",
  title: "Rotational equilibrium",
  summary: "Apply Newton's first law in rotational form to extended objects, choose pivots wisely, and solve beam and ladder problems.",
  minutes: 35,
  objectives: [
    "State Newton's first law in rotational form: zero net torque means constant angular velocity.",
    "Treat an extended object's weight as acting at its center of mass.",
    "Solve beam and ladder equilibrium problems with ΣF = 0 and Στ = 0.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Rotational first law", r`If the net torque on a rigid object is zero, its angular velocity stays constant, possibly zero. Static equilibrium requires both $\sum\vec F = 0$ and $\sum\tau = 0$ about every point, so you may choose the pivot. Pick the point where an unknown force acts: that force then drops out of the torque equation.`),
    def("Extended objects", r`Gravity on an extended object acts as if at its center of mass: the middle, for a uniform beam. Torques that would turn the object counterclockwise are positive; clockwise ones are negative.`),
    example(r`A uniform 5 m, 20 kg ladder leans at 60° to the floor against a frictionless wall`, [
      [r`\tau_{base}: N_w L\sin 60° = mg\tfrac{L}{2}\cos 60°`, "Taking torques about the base removes both floor forces."],
      [r`N_w = \tfrac{196(0.5)}{2(0.866)} \approx 56.6\ \text{N}`, ""],
      [r`f_{floor} = 56.6\ \text{N},\ N_{floor} = 196\ \text{N}`, "From ΣF = 0, horizontal and vertical."],
      [r`\mu_s \ge \tfrac{56.6}{196} \approx 0.29`, "The minimum friction coefficient to keep it from slipping."],
    ]),
    activity("torque-balance", { title: "Find the balance point", params: { m1: 5, d1: 2, m2: 8, d2: 1 } }),
    callout("application", "Where this shows up", r`Ladder safety rules (the 4-to-1 rule, about 75°), cantilevered balconies and the forces in your forearm when holding a weight.`),
  ],
  questions: [
    num(2, r`A uniform 6 m, 30 kg beam is supported at its left end and 4 m from the left. Find the force from the support at 4 m.`, 220.5, { tolerance: 0.1, unit: "N" }, ["Take torques about the left end so that support's force drops out.", "The beam's weight acts at its center, 3 m from the left."], r`About the left end: $F(4) = 294(3)$.`),
    num(3, r`For the same beam, find the force at the left end.`, 73.5, { tolerance: 0.1, unit: "N" }, ["Use ΣF = 0: the two support forces together hold up the beam's weight."], r`$294 - 220.5$.`),
    mc(2, r`A ladder is more likely to slip when…`, ["it's nearly vertical", "its angle with the floor is small", "the wall is frictionless and the ladder is short", "a person stands at the bottom"], 1, ["At a shallow angle the ladder's weight has a long lever arm. What must the floor's friction balance?"], r`A shallow angle needs a larger wall force and so more friction.`),
    mc(3, r`An object has zero net force but a nonzero net torque. It…`, ["is in equilibrium", "starts to rotate", "accelerates linearly", "doesn't move"], 1, ["Equilibrium needs both net force and net torque to be zero."], r`Both conditions are needed for equilibrium.`, "review"),
  ],
});
