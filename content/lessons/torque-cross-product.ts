import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "torque-cross-product",
  title: "Torque",
  summary: "Compute torque as the cross product τ = r × F, find its direction with the right-hand rule, and use components.",
  minutes: 30,
  objectives: [
    "Compute τ = r × F with components.",
    "Find torque direction with the right-hand rule.",
    "Relate |τ| = rF sin θ to the lever arm and to the force's perpendicular component.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["calculus-rotation", "rotational-dynamics"],
  blocks: [
    def("Torque as a vector", r`$\vec\tau = \vec r\times\vec F$, where $\vec r$ runs from the pivot to where the force acts. Its magnitude is $rF\sin\theta$. Its direction is along the rotation axis: curl the fingers of your right hand from $\vec r$ toward $\vec F$ and your thumb points along $\vec\tau$. Counterclockwise in the xy-plane is $+\hat k$.`),
    def("Components", r`For vectors in the xy-plane, $\tau_z = xF_y - yF_x$.`),
    example(r`r = 2î m and F = 3ĵ N`, [
      [r`\tau_z = (2)(3) - (0)(0) = 6\ \text{N·m}`, "+k̂: counterclockwise."],
    ]),
    example(r`r = (1, 2) m and F = (3, 1) N`, [
      [r`\tau_z = (1)(1) - (2)(3) = -5\ \text{N·m}`, "−k̂: clockwise."],
    ]),
    callout("application", "Where this shows up", r`Gyroscopes, bicycle wheels and spinning tops respond to torque vectors in surprising directions; robotics software computes joint torques with cross products.`),
  ],
  questions: [
    num(2, r`r = (3, 0) m, F = (4, 5) N. Find τ_z.`, 15, { unit: "N·m" }, ["τ_z = xF_y − yF_x."], r`$3(5) - 0(4)$.`),
    num(2, r`r = (0, 2) m, F = (6, 0) N. Find τ_z.`, -12, { unit: "N·m" }, ["τ_z = xF_y − yF_x; watch the sign."], r`$0(0) - 2(6)$.`),
    mc(2, r`A force acting along the line through the pivot produces…`, ["maximum torque", "zero torque", "negative torque", "torque equal to F"], 1, ["|τ| = rF sin θ. What is θ for a force along the line to the pivot?"], r`$\sin 0° = 0$.`),
    mc(3, r`A torque pointing in the +z direction causes rotation in the xy-plane that is…`, ["clockwise seen from +z", "counterclockwise seen from +z", "along z", "none"], 1, ["Right-hand rule: curl your fingers with the rotation; your thumb gives τ's direction."], r`Right-hand rule.`, "review"),
  ],
});
