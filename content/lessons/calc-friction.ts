import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-friction",
  title: "Kinetic and static friction",
  summary: "Model static and kinetic friction, find when objects start to slide, and use calculus when the friction coefficient varies along the path.",
  minutes: 35,
  objectives: [
    "Use f_s ≤ μ_sN and f_k = μ_kN.",
    "Find the angle at which a block starts to slide, tan θ = μ_s.",
    "Solve motion with a position-dependent μ using a = v dv/dx.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("Friction models", r`Static friction adjusts to whatever is needed to prevent sliding, up to $\mu_sN$. Once sliding, kinetic friction is roughly constant: $f_k = \mu_kN$, usually with $\mu_k < \mu_s$. On an incline, a block starts to slide when $\tan\theta = \mu_s$.`),
    def("Variable friction", r`If $\mu$ changes with position, use $a = v\frac{dv}{dx}$: $v\,dv = -\mu(x)g\,dx$, then integrate.`),
    example(r`A block slides at 4 m/s onto a rough patch where μ = 0.2x (x in meters)`, [
      [r`v\,dv = -0.2(9.8)x\,dx`, ""],
      [r`\tfrac12(v^2 - 16) = -0.98x^2`, ""],
      [r`v = 0 \Rightarrow x = \tfrac{4}{\sqrt{1.96}} \approx 2.86\ \text{m}`, ""],
    ]),
    activity("forces-incline", { title: "When does the block slip?", params: { mass: 5, angle: 30, mus: 0.4, muk: 0.3 } }),
    callout("application", "Where this shows up", r`Anti-lock brakes keep tires near the static-friction limit, which keeps steering control and usually shortens stops on pavement, and road crews grade surfaces so friction rises toward sharp curves.`),
  ],
  questions: [
    num(2, r`A block on a ramp starts to slide at 25°. Find μ_s, to two decimal places.`, 0.47, { tolerance: 0.01 }, ["At the point of slipping, μ_s = tan θ."], r`$\tan 25° \approx 0.466$.`),
    num(3, r`A block slides at 6 m/s onto a surface with μ = 0.1x. How far does it go? Give two decimal places.`, 6.06, { tolerance: 0.02, unit: "m" }, ["Friction's work ∫μmg dx equals the starting kinetic energy; mass cancels.", "½v₀² = ∫₀ˣ 0.1x′·g dx′."], r`$18 = 0.49x^2$, so $x = \sqrt{36.7} \approx 6.06$.`),
    mc(2, r`A 10 kg crate sits on a floor (μ_s = 0.5). You push horizontally with 30 N. The friction force is…`, ["49 N", "30 N", "0 N", "19 N"], 1, ["First find the maximum static friction μ_sN. Is the push bigger than that?", "If not, static friction just matches the push."], r`Static friction matches the push, up to 49 N.`),
    mc(3, r`Kinetic friction on a sliding block depends mainly on…`, ["speed", "contact area", "normal force", "time"], 2, ["f_k = μ_kN. Which item appears in that formula?"], r`$f_k = \mu_kN$.`, "review"),
  ],
});
