import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-circular-motion",
  title: "Circular motion",
  summary: "Analyze circular motion with changing speed, banked curves and vertical loops, combining tangential and centripetal acceleration.",
  minutes: 35,
  objectives: [
    "Combine tangential acceleration dv/dt with centripetal acceleration v²/r.",
    "Find the ideal banking angle, tan θ = v²/(rg).",
    "Find the minimum speed at the top of a vertical loop, v = √(gr).",
  ],
  concepts: [
    { slug: "circular-motion", name: "Circular motion and gravitation", description: "Motion in circles, centripetal force and universal gravitation.", subject: "subj_phys" },
  ],
  formulas: ["centripetal-acceleration"],
  blocks: [
    def("Two accelerations", r`On a curved path, acceleration has a tangential part $a_t = \frac{dv}{dt}$ (changing speed) and a radial part $a_c = \frac{v^2}{r}$ (changing direction). The net force's radial component must supply $\frac{mv^2}{r}$.`),
    example(r`A car on a 4 m radius track with speed v = 2t`, [
      [r`a_t = \tfrac{dv}{dt} = 2\ \text{m/s}^2`, ""],
      [r`t = 2:\ a_c = \tfrac{4^2}{4} = 4\ \text{m/s}^2`, ""],
      [r`a = \sqrt{2^2 + 4^2} \approx 4.47\ \text{m/s}^2`, ""],
    ]),
    def("Banked curves", r`On a frictionless bank at angle $\theta$, the normal force's horizontal component provides the centripetal force: $N\sin\theta = \frac{mv^2}{r}$ and $N\cos\theta = mg$, so $\tan\theta = \frac{v^2}{rg}$.`),
    example(r`Design a 100 m radius curve for 20 m/s`, [
      [r`\theta = \tan^{-1}\tfrac{20^2}{100(9.8)} \approx 22.2°`, ""],
    ]),
    def("Vertical loops", r`At the top of a loop, gravity and the normal force both point toward the center: $N + mg = \frac{mv^2}{r}$. The track just stops pushing ($N = 0$) at $v = \sqrt{gr}$; any slower and the cart leaves the track.`),
    callout("application", "Where this shows up", r`Highway ramps are banked, and roller-coaster loops are teardrop-shaped (clothoids) so riders don't feel huge forces at the bottom.`),
  ],
  questions: [
    num(2, r`Find the minimum speed at the top of a 5 m radius loop.`, 7, { unit: "m/s" }, ["At the minimum speed, gravity alone provides the centripetal force: mg = mv²/r."], r`$\sqrt{9.8 \times 5}$.`),
    num(3, r`A 60 kg rider moves at 10 m/s at the bottom of a 5 m radius loop. Find the normal force on them.`, 1788, { unit: "N" }, ["At the bottom, N points up and mg down; their difference supplies mv²/r."], r`$N - mg = \frac{mv^2}{r}$, so $N = 588 + 1200$.`),
    mc(2, r`A car slows down while rounding a curve. Its acceleration points…`, ["straight to the center", "backward along the path", "inward and backward", "outward"], 2, ["Two parts: centripetal (toward the center) and tangential (from slowing down)."], r`Centripetal plus negative tangential.`),
    mc(3, r`On a banked curve, faster than the design speed, friction on the tires points…`, ["up the bank", "down the bank", "nowhere", "forward"], 1, ["Going too fast, the car tends to slide outward. Friction opposes that tendency."], r`More centripetal force is needed, so friction adds an inward component.`, "review"),
  ],
});
