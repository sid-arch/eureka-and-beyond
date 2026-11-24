import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rotational-inertia-angular-momentum",
  title: "Rotational inertia and angular momentum",
  summary: "Understand rotational inertia, apply τ = Iα, compute rotational kinetic energy, and use conservation of angular momentum.",
  minutes: 35,
  objectives: [
    "Explain how rotational inertia depends on mass and its distance from the axis.",
    "Apply Newton's second law for rotation, τ = Iα.",
    "Use K = ½Iω² and conservation of angular momentum, L = Iω.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Rotational inertia", r`$I = \sum m r^2$: mass far from the axis counts more. Common shapes of mass $M$ and radius $R$: hoop $MR^2$; solid disk $\frac12 MR^2$; solid sphere $\frac25 MR^2$. Newton's second law for rotation: $\tau_{net} = I\alpha$.`),
    example(r`A 2 kg solid disk of radius 0.5 m with a 1 N·m net torque`, [
      [r`I = \tfrac12(2)(0.5)^2 = 0.25\ \text{kg·m}^2`, ""],
      [r`\alpha = \tfrac{\tau}{I} = \tfrac{1}{0.25} = 4\ \text{rad/s}^2`, ""],
      [r`\text{at}\ \omega = 4\ \text{rad/s: } K = \tfrac12(0.25)(4^2) = 2\ \text{J}`, ""],
    ]),
    def("Angular momentum", r`$L = I\omega$. With no external torque, $L$ is conserved: $I_1\omega_1 = I_2\omega_2$.`),
    example(r`A skater pulls in her arms, reducing I from 4 to 1.6 kg·m² while spinning at 2 rad/s`, [
      [r`\omega_2 = \tfrac{I_1\omega_1}{I_2} = \tfrac{4(2)}{1.6} = 5\ \text{rad/s}`, "She spins 2.5 times faster."],
    ]),
    callout("note", "Rolling races", r`Rolling down a ramp, a solid sphere beats a solid disk, which beats a hoop. Shapes with less of their mass far out put less energy into spinning and more into moving forward, whatever their mass or radius.`),
    callout("application", "Where this shows up", r`Divers tuck to spin faster, cats right themselves in midair, and a collapsing star's spin speeds up enormously to form a pulsar.`),
  ],
  questions: [
    num(2, r`Find the rotational inertia of a 3 kg hoop of radius 0.2 m.`, 0.12, { tolerance: 0.001, unit: "kg·m²" }, [], r`$MR^2 = 3(0.04)$.`),
    num(2, r`A wheel with I = 0.5 kg·m² gets a 2 N·m net torque. Find α.`, 4, { unit: "rad/s²" }, [], r`$\frac{2}{0.5}$.`),
    num(3, r`A spinning stool (I = 3 kg·m²) turns at 2 rad/s. The rider extends weights so I = 6 kg·m². Find the new ω.`, 1, { unit: "rad/s" }, [], r`$\frac{3(2)}{6}$.`),
    mc(3, r`When the skater pulls her arms in, her rotational kinetic energy…`, ["stays the same", "increases", "decreases", "becomes zero"], 1, [], r`$K = \frac{L^2}{2I}$: same $L$, smaller $I$. The extra energy comes from the work her muscles do.`, "review"),
  ],
});
