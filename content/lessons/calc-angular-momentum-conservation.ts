import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-angular-momentum-conservation",
  title: "Conservation of angular momentum",
  summary: "Apply angular momentum conservation to collisions between particles and rotating objects, and compare with energy losses.",
  minutes: 35,
  objectives: [
    "Identify when angular momentum about a pivot is conserved even though linear momentum isn't.",
    "Solve particle–rod collisions with L = mvr⊥ and L = Iω.",
    "Compute kinetic energy lost in rotational collisions.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["calculus-rotation"],
  blocks: [
    def("Conservation about a pivot", r`If the net external torque about a point is zero, $\vec L$ about that point is conserved. In a collision with a rod on a fixed pivot, the pivot exerts a force, so linear momentum isn't conserved; but that force has no torque about the pivot, so angular momentum about the pivot is.`),
    example(r`A 0.05 kg lump of clay at 10 m/s hits the free end of a 0.6 kg, 1 m rod pivoted at its other end, perpendicular, and sticks`, [
      [r`L_i = mvL = 0.05(10)(1) = 0.5\ \text{kg·m}^2/\text{s}`, ""],
      [r`I_f = \tfrac13(0.6)(1^2) + 0.05(1^2)`, "Rod about its end, plus the clay as a point mass."],
      [r`I_f = 0.25\ \text{kg·m}^2`, ""],
      [r`\omega = \tfrac{0.5}{0.25} = 2\ \text{rad/s}`, ""],
      [r`K: 2.5\ \text{J} \to \tfrac12(0.25)(4) = 0.5\ \text{J}`, "80% of the kinetic energy is lost: perfectly inelastic."],
    ]),
    callout("application", "Where this shows up", r`Batters and tennis players aim for the sweet spot, where the impact sends no jolt to the hands; spacecraft docking maneuvers must conserve the combined angular momentum.`),
  ],
  questions: [
    num(2, r`A 0.1 kg ball at 6 m/s hits a door (I = 2 kg·m²) perpendicular, 0.8 m from the hinge, and stops dead. Find the door's ω.`, 0.24, { unit: "rad/s" }, ["The ball's angular momentum about the hinge, mvr, all goes to the door: Iω = mvr."], r`$\frac{0.1(6)(0.8)}{2}$.`),
    num(3, r`A 2 kg disk (R = 0.5 m) spins at 4 rad/s. A 0.5 kg ring of radius 0.5 m drops onto it concentrically. Find the final ω, to two decimal places.`, 2.67, { tolerance: 0.01, unit: "rad/s" }, ["Disk I = ½MR², ring I = MR². Conserve L: I₁ω₁ = (I₁ + I₂)ω."], r`$I_1 = 0.25$, $I_2 = 0.125$; $\omega = \frac{1}{0.375}$.`),
    mc(2, r`When clay hits a pivoted rod, which is conserved about the pivot?`, ["linear momentum", "angular momentum", "kinetic energy", "all three"], 1, ["The pivot exerts a force during impact. Does that force exert any torque about the pivot?"], r`The pivot force has no torque about the pivot.`),
    mc(3, r`A planet's angular momentum about its star is conserved because gravity…`, ["is weak", "points along r, so r × F = 0", "is conservative", "acts at a distance"], 1, ["Torque is r × F. What is r × F when F is parallel to r?"], r`A central force exerts no torque.`, "review"),
  ],
});
