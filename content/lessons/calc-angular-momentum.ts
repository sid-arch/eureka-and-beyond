import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-angular-momentum",
  title: "Angular momentum and angular impulse",
  summary: "Define angular momentum L = r × p for particles, connect torque to its rate of change, τ = dL/dt, and compute angular impulse as ∫τ dt.",
  minutes: 35,
  objectives: [
    "Compute L = r × p for a particle and L = Iω for a rigid body.",
    "Use τ_net = dL/dt.",
    "Compute angular impulse ∫τ dt = ΔL.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["calculus-rotation"],
  blocks: [
    def("Definitions", r`For a particle, $\vec L = \vec r\times\vec p$, so $L_z = m(xv_y - yv_x)$. For a rigid body rotating about a fixed axis, $L = I\omega$. Differentiating, $\frac{d\vec L}{dt} = \vec r\times\vec F = \vec\tau$, because $\frac{d\vec r}{dt}\times\vec p = \vec v\times m\vec v = 0$.`),
    example(r`A 2 kg particle at r = (3, 0) m with velocity (0, 4) m/s`, [
      [r`L_z = 2[(3)(4) - (0)(0)] = 24\ \text{kg·m}^2/\text{s}`, ""],
    ]),
    example(r`A wheel's angular momentum is L(t) = 2t³ kg·m²/s`, [
      [r`\tau = \tfrac{dL}{dt} = 6t^2`, ""],
      [r`\tau(2) = 24\ \text{N·m}`, ""],
    ]),
    def("Angular impulse", r`$\int_{t_1}^{t_2}\tau\,dt = \Delta L$: the area under a torque–time graph.`),
    callout("note", "Straight-line motion", r`A particle moving in a straight line at constant velocity has constant angular momentum about any point, because no torque acts on it.`),
    callout("application", "Where this shows up", r`Reaction wheels in satellites trade angular momentum with the craft to point telescopes precisely.`),
  ],
  questions: [
    num(2, r`A torque τ(t) = 3t² N·m acts on a wheel from rest (I = 0.5 kg·m²) for 2 s. Find ω afterward.`, 16, { unit: "rad/s" }, ["ΔL = ∫τ dt, then ω = L/I."], r`$\Delta L = t^3 = 8$, so $\omega = \frac{8}{0.5}$.`),
    num(2, r`A 0.5 kg particle at r = (0, 2) m moves with v = (3, 0) m/s. Find L_z.`, -3, { unit: "kg·m²/s" }, ["L = r × p; for the z-component, L_z = m(xv_y − yv_x)."], r`$0.5[0 - (2)(3)]$.`),
    mc(2, r`A particle moves in a straight line at constant velocity. Its angular momentum about a point off the line…`, ["is zero", "is constant and nonzero", "increases", "decreases"], 1, ["With no net force there's no torque, so L stays…?", "L = mv·r_⊥, and r_⊥ is the same at every point of the line."], r`No torque, so constant: $L = mvr_\perp$.`),
    mc(3, r`τ = dL/dt is the rotational analog of…`, ["W = Fd", "F = dp/dt", "p = mv", "K = ½mv²"], 1, ["Match L with p and τ with F."], r`Newton's second law in momentum form.`, "review"),
  ],
});
