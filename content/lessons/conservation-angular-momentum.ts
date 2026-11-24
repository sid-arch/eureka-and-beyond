import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "conservation-angular-momentum",
  title: "Conservation of angular momentum",
  summary: "Apply conservation of angular momentum to changing shapes, rotational collisions and orbits, and track what happens to kinetic energy.",
  minutes: 30,
  objectives: [
    "Identify when angular momentum is conserved (no external torque).",
    "Solve problems where rotational inertia changes or objects join a rotating system.",
    "Compare kinetic energy before and after.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Conservation", r`If the net external torque on a system is zero, its total angular momentum is constant: $I_i\omega_i = I_f\omega_f$. Internal forces, like muscles pulling arms in, can change $I$ but not $L$.`),
    example(r`A merry-go-round (I = 200 kg·m²) turns at 1 rad/s; a 40 kg child steps on at the rim, 2 m from the axis`, [
      [r`I_f = 200 + 40(2^2) = 360\ \text{kg·m}^2`, "The child joins as a point mass."],
      [r`\omega_f = \tfrac{200(1)}{360} \approx 0.56\ \text{rad/s}`, ""],
      [r`K: 100\ \text{J} \to \tfrac12(360)(0.556^2) \approx 56\ \text{J}`, "Like a perfectly inelastic collision, kinetic energy is lost."],
    ]),
    def("Orbits", r`Gravity points toward the Sun, so it exerts no torque about it, and a planet's angular momentum is conserved. At closest approach (perihelion) the planet moves fastest: $r_p v_p = r_a v_a$. That's Kepler's second law.`),
    callout("application", "Where this shows up", r`Helicopters need a tail rotor to keep the body from spinning opposite the main rotor; neutron stars can spin dozens of times per second after collapsing.`),
  ],
  questions: [
    num(2, r`Earth's distance from the Sun ranges from 1.47 to 1.52 × 10¹¹ m. Its speed at perihelion is 30.3 km/s. Find its speed at aphelion, in km/s.`, 29.3, { tolerance: 0.05, unit: "km/s" }, ["At perihelion and aphelion, velocity is perpendicular to r, so L = mrv is conserved."], r`$30.3 \cdot \frac{1.47}{1.52} \approx 29.3$.`),
    num(2, r`A 4 kg·m² turntable spins at 3 rad/s. A 1 kg·m² disk at rest drops onto it and sticks. Find the final ω.`, 2.4, { unit: "rad/s" }, ["No external torque: I₁ω₁ = (I₁ + I₂)ω_f."], r`$\frac{12}{5}$.`),
    mc(2, r`A diver tucks in midair. Her angular momentum…`, ["increases", "stays the same", "decreases", "becomes zero"], 1, ["Is there any external torque about her center of mass while she's in the air?"], r`No external torque about her center of mass (gravity acts there).`),
    mc(3, r`If the Earth shrank to half its radius with the same mass, a day would be…`, ["twice as long", "the same", "one quarter as long", "half as long"], 2, ["L = Iω is conserved and I ∝ R². How does ω change, and so the length of a day?"], r`$I \propto R^2$ drops to ¼, so ω is 4 times larger.`, "review"),
  ],
});
