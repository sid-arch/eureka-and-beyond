import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rotational-kinematics",
  title: "Rotational kinematics",
  summary: "Describe spinning objects with angular position, velocity and acceleration, use the rotational kinematic equations, and connect them to linear motion.",
  minutes: 30,
  objectives: [
    "Measure angles in radians, and convert rpm to rad/s.",
    "Use ω = ω₀ + αt and θ = ω₀t + ½αt².",
    "Relate linear and angular quantities: s = rθ, v = rω, a_t = rα, a_c = rω².",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Angular quantities", r`Angular position $\theta$ is in radians (one turn = $2\pi$ rad). Angular velocity is $\omega = \frac{\Delta\theta}{\Delta t}$ (rad/s), and angular acceleration is $\alpha = \frac{\Delta\omega}{\Delta t}$ (rad/s²). The constant-$\alpha$ equations mirror linear ones: $\omega = \omega_0 + \alpha t$, $\theta = \omega_0 t + \frac12\alpha t^2$, $\omega^2 = \omega_0^2 + 2\alpha\theta$.`),
    def("Linking to linear motion", r`A point at radius $r$ moves $s = r\theta$ with speed $v = r\omega$. Every point on a rigid wheel shares the same $\omega$, but points farther out move faster.`),
    example(r`A wheel spins at 120 rpm`, [
      [r`\omega = 120 \cdot \tfrac{2\pi}{60} = 4\pi \approx 12.6\ \text{rad/s}`, ""],
    ]),
    example(r`A disk starts from rest with α = 2 rad/s² for 5 s`, [
      [r`\omega = 0 + 2(5) = 10\ \text{rad/s}`, ""],
      [r`\theta = \tfrac12(2)(5^2) = 25\ \text{rad} \approx 4\ \text{turns}`, ""],
      [r`v = r\omega = 0.3(10) = 3\ \text{m/s at}\ r = 0.3\ \text{m}`, ""],
    ]),
    callout("application", "Where this shows up", r`A car's speedometer counts wheel rotations and multiplies by the wheel radius; oversized tires make it read too low.`),
  ],
  questions: [
    num(1, r`Convert 33.3 rpm (a vinyl record) to rad/s.`, 3.49, { tolerance: 0.01, unit: "rad/s" }, [], r`$33.3 \cdot \frac{2\pi}{60}$.`),
    num(2, r`Find the centripetal acceleration at r = 0.3 m when ω = 10 rad/s.`, 30, { unit: "m/s²" }, [], r`$r\omega^2 = 0.3(100)$.`),
    num(2, r`A fan at 20 rad/s slows uniformly to rest in 4 s. Find α.`, -5, { unit: "rad/s²" }, [], r`$\frac{0 - 20}{4}$.`),
    mc(3, r`On a spinning merry-go-round, a child at the rim compared with one halfway out has…`, ["the same ω and twice the speed", "twice ω and the same speed", "the same ω and speed", "half the speed"], 0, [], r`$v = r\omega$ with $\omega$ shared.`, "review"),
  ],
});
