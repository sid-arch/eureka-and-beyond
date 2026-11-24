import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-conservation-energy",
  title: "Conservation of energy",
  summary: "Apply energy conservation with conservative and nonconservative forces, and use potential-energy graphs to find turning points and allowed regions.",
  minutes: 35,
  objectives: [
    "Use K_i + U_i + W_nc = K_f + U_f.",
    "Find turning points where E = U(x), and allowed regions where E ≥ U(x).",
    "Account for friction as nonconservative work.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["work-energy", "calculus-mechanics"],
  blocks: [
    def("The energy equation", r`$K_i + U_i + W_{nc} = K_f + U_f$, where $W_{nc}$ is the work of nonconservative forces like friction (usually negative). With $W_{nc} = 0$, mechanical energy $E = K + U$ is constant.`),
    def("Energy diagrams", r`Since $K = E - U(x) \ge 0$, a particle can only be where $U(x) \le E$. It turns around at points where $U = E$; between them it oscillates.`),
    example(r`A particle with E = 8 J moves in U(x) = 2x² J`, [
      [r`2x^2 = 8 \Rightarrow x = \pm2\ \text{m}`, "Turning points."],
      [r`\text{at}\ x = 0:\ K = 8\ \text{J}`, ""],
    ]),
    example(r`A 2 kg sled slides down a 5 m drop from rest; friction does −30 J`, [
      [r`2(9.8)(5) - 30 = \tfrac12(2)v^2`, ""],
      [r`v = \sqrt{68} \approx 8.25\ \text{m/s}`, ""],
    ]),
    activity("work-integral", { title: "Work by a force that changes sign", params: { law: "decreasing", k: 4, x1: 0, x2: 4 } }),
    callout("application", "Where this shows up", r`Roller-coaster design, pendulum clocks and orbital mechanics all track energy rather than forces, because it's far simpler.`),
  ],
  questions: [
    num(2, r`U(x) = 3x² J and E = 12 J. Find the positive turning point.`, 2, { unit: "m" }, ["Turning points are where K = 0, so U(x) = E."], r`$3x^2 = 12$.`),
    num(2, r`A 1 kg ball dropped from 10 m lands at 12 m/s. How much energy did air resistance remove?`, 26, { unit: "J" }, ["Compare the starting U = mgh with the landing K = ½mv²."], r`$98 - 72$.`),
    mc(2, r`On an energy diagram, the kinetic energy at a point is…`, ["U(x)", "E − U(x)", "E + U(x)", "the slope"], 1, ["Total energy E = K + U at every point."], r`$K = E - U$.`),
    mc(3, r`If E is less than U(x) at every point, the particle…`, ["moves fastest there", "can't be in that region", "oscillates there", "stops there"], 1, ["K = E − U. What would K be there, and is that allowed?"], r`K would be negative.`, "review"),
  ],
});
