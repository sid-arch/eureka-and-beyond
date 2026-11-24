import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-rolling",
  title: "Rolling",
  summary: "Analyze rolling with forces and torques to find acceleration and the static friction required, and solve the transition from sliding to rolling.",
  minutes: 40,
  objectives: [
    "Write Newton's laws for translation and rotation of a rolling object and solve for a and f.",
    "Find the minimum μ_s for rolling without slipping on an incline.",
    "Solve a ball that starts sliding and ends rolling (v_final = 5/7 v₀ for a solid sphere).",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Forces on an incline", r`Translation: $mg\sin\theta - f = ma$. Rotation about the center: $fR = I\alpha = \beta mR^2\frac aR$. Solving: $a = \frac{g\sin\theta}{1 + \beta}$ and $f = \frac{\beta}{1 + \beta}mg\sin\theta$. Rolling without slipping needs $f \le \mu_sN$, so $\mu_s \ge \frac{\beta}{1 + \beta}\tan\theta$.`),
    example(r`A solid sphere (β = 2/5) on a 30° incline`, [
      [r`a = \tfrac{g\sin 30°}{1.4} = 3.5\ \text{m/s}^2`, ""],
      [r`\mu_{s,min} = \tfrac27\tan 30° \approx 0.165`, ""],
    ]),
    def("From sliding to rolling", r`A bowling ball released sliding with $v_0$ and no spin: kinetic friction slows it while spinning it up until $v = R\omega$. Angular momentum about the contact point on the floor is conserved (friction acts there): $mv_0R = mvR + I\frac vR$, so $v = \frac{v_0}{1 + \beta} = \frac57v_0$.`),
    activity("rolling-race", { title: "Race the shapes", params: { height: 1, angle: 30 } }),
    callout("application", "Where this shows up", r`Bowling-ball skid distance, ABS braking and tire design all depend on this transition between sliding and rolling.`),
  ],
  questions: [
    num(2, r`A bowling ball is released sliding at 7 m/s with no spin. Find its final rolling speed.`, 5, { unit: "m/s" }, ["Friction exerts no torque about the contact point, so angular momentum about it is conserved.", "mv₀R = mvR + (2/5)mR²(v/R)."], r`$\frac57(7)$.`),
    num(2, r`Find the friction force on a 2 kg solid disk rolling down a 30° incline.`, 3.27, { tolerance: 0.01, unit: "N" }, ["Rolling acceleration: a = g sin θ/(1 + β). Then use mg sin θ − f = ma."], r`$\frac13(2)(9.8)(0.5)$.`),
    num(3, r`What minimum μ_s lets a hoop roll without slipping on a 20° incline? Two decimal places.`, 0.18, { tolerance: 0.01 }, ["Find the friction needed for rolling, f = βmg sin θ/(1 + β), and set it ≤ μ_s mg cos θ.", "A hoop has β = 1."], r`$\frac12\tan 20° \approx 0.18$.`),
    mc(3, r`For an object rolling without slipping, static friction does how much work?`, ["mgh", "zero", "½mv²", "negative work"], 1, ["Work requires sliding through a distance. Does the contact point slide?"], r`The contact point doesn't slide.`, "review"),
  ],
});
