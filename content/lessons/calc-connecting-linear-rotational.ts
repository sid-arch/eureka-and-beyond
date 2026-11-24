import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-connecting-linear-rotational",
  title: "Connecting linear and rotational motion",
  summary: "Differentiate s = rθ to link linear and angular quantities, and combine tangential and centripetal acceleration for points on spinning objects.",
  minutes: 30,
  objectives: [
    "Derive v = rω and a_t = rα by differentiating s = rθ.",
    "Find total acceleration from a_t and a_c = rω².",
    "Apply the no-slip condition to strings, spools and gears.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Differentiating arc length", r`For a point at fixed radius $r$, $s = r\theta$. Differentiating: $v = \frac{ds}{dt} = r\omega$ and $a_t = \frac{dv}{dt} = r\alpha$. The point also has $a_c = \frac{v^2}{r} = r\omega^2$ toward the axis.`),
    example(r`A string unwinds from a spool (R = 0.05 m) with θ(t) = 4t² rad`, [
      [r`s = R\theta = 0.2t^2,\ v = 0.4t`, ""],
      [r`t = 2:\ v = 0.8\ \text{m/s},\ a_t = 0.4\ \text{m/s}^2`, ""],
      [r`a_c = \tfrac{0.8^2}{0.05} = 12.8\ \text{m/s}^2`, "For a point on the rim. The string itself has only a_t."],
    ]),
    callout("application", "Where this shows up", r`Film reels and tape drives must adjust ω as the radius of wound material changes to keep v steady.`),
  ],
  questions: [
    num(2, r`A wheel of radius 0.3 m has ω(t) = 2t rad/s. Find the tangential acceleration of its rim.`, 0.6, { unit: "m/s²" }, ["a_t = rα, with α = dω/dt."], r`$r\alpha = 0.3(2)$.`),
    num(3, r`For that wheel at t = 1 s, find the magnitude of a rim point's total acceleration, to two decimal places.`, 1.34, { tolerance: 0.01, unit: "m/s²" }, ["Combine a_t = rα and a_c = rω² at right angles."], r`$a_c = 0.3(4) = 1.2$; $\sqrt{0.6^2 + 1.2^2} \approx 1.34$.`),
    mc(2, r`A string wound on a spool doesn't slip. Its linear acceleration equals…`, ["α", "Rα", "Rω²", "α/R"], 1, ["No slipping links the string's motion to the rim: a = ?"], r`$a = R\alpha$.`),
    mc(3, r`For a wheel spinning at constant ω, a rim point's acceleration is…`, ["zero", "tangential only", "centripetal only", "both"], 2, ["Constant ω means α = 0. What acceleration remains for circular motion?"], r`$\alpha = 0$.`, "review"),
  ],
});
