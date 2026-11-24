import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-work-variable-forces",
  title: "Work done by variable forces",
  summary: "Compute work as the integral of force over displacement, including spring forces and forces given by functions or graphs.",
  minutes: 35,
  objectives: [
    "Compute W = ∫F dx for forces that vary with position.",
    "Derive the work to stretch a spring, ½kx².",
    "Interpret work as the signed area under an F–x graph.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Work as an integral", r`Cut the path into tiny pieces $dx$, each with nearly constant force: $dW = F\,dx$. Adding them up gives $W = \int_{x_1}^{x_2} F(x)\,dx$, the area under the force–position graph. In 3D, $W = \int \vec F\cdot d\vec r$.`),
    example(r`Stretching a spring from 0 to x`, [
      [r`W = \int_0^x kx'\,dx' = \tfrac12 kx^2`, "Applied force F = kx."],
    ]),
    example(r`F(x) = 3x² newtons from x = 0 to 2 m`, [
      [r`W = \int_0^2 3x^2\,dx = x^3\Big|_0^2 = 8\ \text{J}`, ""],
    ]),
    activity("work-integral", { title: "Work is the area under F(x)", params: { law: "square", k: 3, x1: 0, x2: 2 } }),
    callout("tip", "Try this", r`Switch to the decreasing force and slide x₂ past 2.5 m: the force turns negative and the shaded area below the axis subtracts from the work.`, "experiment"),
    callout("application", "Where this shows up", r`Archery bows, bungee cords and car suspensions are rated by their force–draw curves; the area gives the stored energy.`),
  ],
  questions: [
    num(2, r`F(x) = 5 − 2x newtons. Find the work from x = 0 to 3 m.`, 6, { unit: "J" }, ["W = ∫F dx from 0 to 3."], r`$5x - x^2$ from 0 to 3.`),
    num(2, r`How much work stretches a 200 N/m spring from 0.1 m to 0.3 m?`, 8, { unit: "J" }, ["W = ½k(x₂² − x₁²)."], r`$\frac12(200)(0.09 - 0.01)$.`),
    num(3, r`F(x) = 4/x² newtons. Find the work from x = 1 to 4 m.`, 3, { unit: "J" }, ["Integrate 4/x² from 1 to 4; its antiderivative is −4/x."], r`$\left[-\frac4x\right]_1^4 = -1 + 4$.`),
    mc(3, r`Stretching a spring from 0 to 2x takes how much work compared with 0 to x?`, ["the same", "twice as much", "four times as much", "half as much"], 2, ["W = ½kx². Compare (2x)² with x²."], r`$W \propto x^2$.`, "review"),
  ],
});
