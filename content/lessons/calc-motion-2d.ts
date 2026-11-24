import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-motion-2d",
  title: "Vectors and motion in two dimensions",
  summary: "Describe 2D motion with position vectors r(t), differentiate component by component, and analyze projectiles and uniform circular motion with calculus.",
  minutes: 35,
  objectives: [
    "Write r(t) = x(t) î + y(t) ĵ and find v = dr/dt and a = dv/dt.",
    "Find speed, direction and the top of a projectile's path.",
    "Show that uniform circular motion has acceleration of size rω² toward the center.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Vector kinematics", r`$\vec r(t) = x(t)\,\hat\imath + y(t)\,\hat\jmath$. Differentiate each component: $\vec v = \frac{d\vec r}{dt}$ and $\vec a = \frac{d\vec v}{dt}$. Speed is $|\vec v| = \sqrt{v_x^2 + v_y^2}$.`),
    example(r`A projectile with r(t) = 3t î + (4t − 4.9t²) ĵ`, [
      [r`\vec v = 3\,\hat\imath + (4 - 9.8t)\,\hat\jmath`, ""],
      [r`\vec a = -9.8\,\hat\jmath`, ""],
      [r`v_y = 0\ \text{at}\ t = \tfrac{4}{9.8} \approx 0.41\ \text{s}`, "The top of the path."],
      [r`|\vec v(1)| = \sqrt{3^2 + 5.8^2} \approx 6.53\ \text{m/s}`, ""],
    ]),
    example(r`Uniform circular motion: r(t) = R cos(ωt) î + R sin(ωt) ĵ`, [
      [r`\vec v = -R\omega\sin(\omega t)\,\hat\imath + R\omega\cos(\omega t)\,\hat\jmath`, ""],
      [r`\vec a = -\omega^2\vec r`, "Points to the center, with magnitude Rω²."],
    ]),
    activity("projectile", { title: "Projectile components", params: { speed: 20, angle: 45 } }),
    callout("application", "Where this shows up", r`Game engines and flight software update position vectors this way many times per second.`),
  ],
  questions: [
    num(2, r`r(t) = t² î + 2t ĵ. Find the speed at t = 2 s, to two decimal places.`, 4.47, { tolerance: 0.01, unit: "m/s" }, ["Differentiate each component to get v, then take its magnitude."], r`$\vec v = (2t, 2) = (4, 2)$.`),
    num(2, r`For r(t) = 5cos(2t) î + 5sin(2t) ĵ, find the magnitude of the acceleration.`, 20, { unit: "m/s²" }, ["This is a circle of radius 5 m with ω = 2 rad/s. Centripetal acceleration is Rω²."], r`$R\omega^2 = 5(4)$.`),
    mc(2, r`For a projectile (no air resistance), which component of velocity stays constant?`, ["vertical", "horizontal", "both", "neither"], 1, ["Gravity acts only vertically. Which acceleration component is zero?"], r`$a_x = 0$.`),
    mc(3, r`In uniform circular motion, v and a are…`, ["parallel", "perpendicular", "opposite", "both zero"], 1, ["At constant speed the acceleration has no component along v."], r`$\vec v \cdot \vec a = 0$ for constant speed.`, "review"),
  ],
});
