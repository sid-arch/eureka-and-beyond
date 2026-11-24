import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rotational-kinetic-energy-work",
  title: "Rotational kinetic energy and work",
  summary: "Compute rotational kinetic energy, the work done by a torque, and apply the work–energy theorem to spinning objects.",
  minutes: 30,
  objectives: [
    "Compute K_rot = ½Iω².",
    "Compute the work done by a constant torque, W = τΔθ.",
    "Apply the rotational work–energy theorem, W_net = ΔK_rot.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Rotational kinetic energy", r`A spinning object stores $K_{rot} = \frac12 I\omega^2$, the sum of $\frac12 mv^2$ over all its parts. An object that both moves and spins has $K = \frac12 Mv_{cm}^2 + \frac12 I_{cm}\omega^2$.`),
    def("Work by a torque", r`A constant torque turning an object through $\Delta\theta$ (radians) does work $W = \tau\Delta\theta$, and power $P = \tau\omega$. The work–energy theorem becomes $W_{net} = \Delta K_{rot}$.`),
    example(r`A flywheel (I = 10 kg·m²) spins at 100 rad/s`, [
      [r`K = \tfrac12(10)(100^2) = 50{,}000\ \text{J}`, ""],
    ]),
    example(r`A 20 N·m torque turns a wheel through 5 revolutions`, [
      [r`\Delta\theta = 5(2\pi) = 10\pi\ \text{rad}`, ""],
      [r`W = 20(10\pi) \approx 628\ \text{J}`, "If the wheel started at rest with no friction, that's its final kinetic energy."],
    ]),
    callout("application", "Where this shows up", r`Flywheel energy storage smooths power grids, and regenerative braking turns a vehicle's kinetic energy into stored energy instead of heat.`),
  ],
  questions: [
    num(2, r`A 0.5 kg·m² wheel starts at rest; a 4 N·m torque acts for 2π rad. Find its final ω, to two decimal places.`, 10.03, { tolerance: 0.02, unit: "rad/s" }, ["Work = τθ; it all becomes rotational kinetic energy ½Iω²."], r`$W = 8\pi \approx 25.1$ J $= \frac12(0.5)\omega^2$, so $\omega = \sqrt{32\pi} \approx 10.03$.`),
    num(2, r`A motor delivers 50 N·m at 120 rad/s. Find its power.`, 6000, { unit: "W" }, ["The rotational version of P = Fv is P = τω."], r`$\tau\omega$.`),
    mc(2, r`Doubling a flywheel's angular speed multiplies its stored energy by…`, ["2", "4", "8", "½"], 1, ["K = ½Iω². How does K scale with ω?"], r`$K \propto \omega^2$.`),
    mc(3, r`A hoop and a disk of equal mass and radius spin at the same ω. Which has more kinetic energy?`, ["the disk", "the hoop", "equal", "neither has any"], 1, ["Same ω, so compare rotational inertias: hoop MR² vs disk ½MR²."], r`The hoop's I is twice the disk's.`, "review"),
  ],
});
