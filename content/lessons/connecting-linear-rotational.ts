import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "connecting-linear-rotational",
  title: "Connecting linear and rotational motion",
  summary: "Relate a point's linear motion to the rotation of the body it rides on, combine tangential and centripetal acceleration, and analyze belts, gears and unwinding strings.",
  minutes: 30,
  objectives: [
    "Use s = rθ, v = rω and a_t = rα for points on a rotating body.",
    "Combine tangential and centripetal acceleration into total acceleration.",
    "Analyze belts, chains, gears and strings that don't slip.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Two kinds of acceleration", r`A point at radius $r$ on a body with angular speed $\omega$ and angular acceleration $\alpha$ has a tangential acceleration $a_t = r\alpha$ (changing its speed) and a centripetal acceleration $a_c = r\omega^2$ (changing its direction). They are perpendicular: $a = \sqrt{a_t^2 + a_c^2}$.`),
    example(r`A point 0.3 m from the axis when ω = 4 rad/s and α = 2 rad/s²`, [
      [r`a_t = 0.3(2) = 0.6\ \text{m/s}^2`, ""],
      [r`a_c = 0.3(4^2) = 4.8\ \text{m/s}^2`, ""],
      [r`a = \sqrt{0.6^2 + 4.8^2} \approx 4.84\ \text{m/s}^2`, ""],
    ]),
    def("No-slip connections", r`A belt, chain or rope that doesn't slip moves at one linear speed everywhere along it. Where it meets two wheels, $r_1\omega_1 = r_2\omega_2$: the smaller wheel spins faster. A string unwinding from a spool has $v = R\omega$ and $a = R\alpha$.`),
    example(r`A bicycle: front sprocket 0.10 m turning at 6 rad/s; rear sprocket 0.04 m; wheel radius 0.35 m`, [
      [r`v_{chain} = 0.10(6) = 0.6\ \text{m/s}`, ""],
      [r`\omega_{rear} = \tfrac{0.6}{0.04} = 15\ \text{rad/s}`, "The rear sprocket and wheel share this ω."],
      [r`v_{bike} = 0.35(15) = 5.25\ \text{m/s}`, ""],
    ]),
    callout("application", "Where this shows up", r`Gear shifting trades pedaling speed for force, car transmissions do the same for engines, and centrifuges are rated by the acceleration at their rim.`),
  ],
  questions: [
    num(2, r`Two gears mesh: a 0.05 m gear at 20 rad/s drives a 0.2 m gear. Find the large gear's ω.`, 5, { unit: "rad/s" }, ["Meshed gears share the same rim speed: v = ωr for both."], r`$\frac{0.05(20)}{0.2}$.`),
    num(2, r`A bucket's rope unwinds from a 0.1 m radius winch as the bucket falls with a = 2 m/s². Find the winch's α.`, 20, { unit: "rad/s²" }, ["The rope's linear acceleration equals the winch rim's tangential acceleration: a = αR."], r`$\frac{a}{R}$.`),
    mc(2, r`A wheel spins at constant ω. A point on its rim has…`, ["no acceleration", "only tangential acceleration", "only centripetal acceleration", "both"], 2, ["Constant ω means α = 0. Which kind of acceleration still exists for circular motion?"], r`$\alpha = 0$, so $a_t = 0$.`),
    mc(3, r`Shifting a bike to a smaller rear sprocket (same pedaling) makes the bike…`, ["slower", "faster but harder to pedal", "easier to pedal", "unchanged"], 1, ["The chain moves both sprockets' rims at the same speed. A smaller rear sprocket then spins at what rate?"], r`Smaller $r_{rear}$, larger $\omega_{rear}$.`, "review"),
  ],
});
