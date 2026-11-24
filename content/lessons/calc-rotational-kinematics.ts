import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-rotational-kinematics",
  title: "Rotational kinematics",
  summary: "Define angular velocity and acceleration as derivatives of angular position, and integrate non-constant angular accelerations.",
  minutes: 30,
  objectives: [
    "Compute ω = dθ/dt and α = dω/dt.",
    "Integrate α(t) and ω(t) with initial conditions.",
    "Recognize when the constant-α equations apply.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Angular derivatives", r`With $\theta$ in radians, $\omega = \frac{d\theta}{dt}$ and $\alpha = \frac{d\omega}{dt} = \frac{d^2\theta}{dt^2}$. Every linear-kinematics method carries over, with $\theta$, $\omega$ and $\alpha$ in place of $x$, $v$ and $a$.`),
    example(r`θ(t) = 2t³ − t² (radians)`, [
      [r`\omega = 6t^2 - 2t,\ \alpha = 12t - 2`, ""],
      [r`t = 1:\ \omega = 4\ \text{rad/s},\ \alpha = 10\ \text{rad/s}^2`, ""],
    ]),
    example(r`A wheel starts from rest with α(t) = 4t rad/s²`, [
      [r`\omega = 2t^2,\ \theta = \tfrac23 t^3`, ""],
      [r`t = 3:\ \omega = 18\ \text{rad/s},\ \theta = 18\ \text{rad}`, "About 2.9 revolutions."],
    ]),
    callout("application", "Where this shows up", r`Hard drives and centrifuges spin up with programmed α(t) profiles to limit stress, and wind turbines' controllers track ω(t) continuously.`),
  ],
  questions: [
    num(2, r`θ(t) = t³ − 3t (rad). When is the object momentarily not rotating? (t > 0)`, 1, { unit: "s" }, ["ω = dθ/dt; set it to zero and solve for t > 0."], r`$\omega = 3t^2 - 3 = 0$.`),
    num(2, r`A disk at 10 rad/s has α = −2t rad/s². Find ω at t = 2 s.`, 6, { unit: "rad/s" }, ["ω(t) = ω₀ + ∫α dt."], r`$\omega = 10 - t^2$.`),
    num(3, r`For that disk, through what angle does it turn before stopping? Give one decimal place.`, 21.1, { tolerance: 0.1, unit: "rad" }, ["Find when ω = 0, then integrate ω(t) from 0 to that time."], r`Stops at $t = \sqrt{10}$; $\theta = 10t - \frac{t^3}{3} = \frac{20}{3}\sqrt{10} \approx 21.1$.`),
    mc(3, r`The equation θ = ω₀t + ½αt² applies when…`, ["always", "α is constant", "ω is constant", "α = 4t"], 1, ["This formula comes from integrating α twice. What must be true of α for that?"], r`It's derived by integrating a constant α.`, "review"),
  ],
});
