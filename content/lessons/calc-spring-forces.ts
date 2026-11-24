import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-spring-forces",
  title: "Spring forces",
  summary: "Use Hooke's law for horizontal and vertical springs, derive spring potential energy by integration, and analyze spring launchers.",
  minutes: 30,
  objectives: [
    "Apply F = −kx, including the new equilibrium of a vertical spring.",
    "Derive U = ½kx² from the spring force by integration.",
    "Use energy conservation for spring launchers.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Hooke's law and energy", r`An ideal spring exerts $F = -kx$. Its potential energy is $U = -\int_0^x(-kx')\,dx' = \frac12kx^2$.`),
    def("Vertical springs", r`A hanging mass stretches the spring to a new equilibrium $y_0 = \frac{mg}{k}$. Measured from there, gravity and the extra spring force combine into a pure $-ky$: the motion is the same as horizontal, just shifted.`),
    example(r`1 kg on a 100 N/m spring`, [
      [r`y_0 = \tfrac{1(9.8)}{100} = 0.098\ \text{m}`, ""],
    ]),
    example(r`A 500 N/m launcher is compressed 0.1 m and fires a 0.2 kg ball horizontally`, [
      [r`\tfrac12(500)(0.1^2) = \tfrac12(0.2)v^2`, ""],
      [r`v = 5\ \text{m/s}`, ""],
    ]),
    activity("work-integral", { title: "Spring work is a triangle", params: { law: "spring", k: 2, x1: 0, x2: 3 } }),
    callout("application", "Where this shows up", r`Pinball plungers, car suspensions, trampolines and atomic-force microscope cantilevers.`),
  ],
  questions: [
    num(2, r`A 0.5 kg mass stretches a vertical spring 0.049 m. Find k.`, 100, { unit: "N/m" }, ["At rest, the spring force balances the weight: ky₀ = mg."], r`$\frac{mg}{y_0}$.`),
    num(2, r`How much energy is stored in a 400 N/m spring compressed 0.05 m?`, 0.5, { unit: "J" }, ["U = ½kx²."], r`$\frac12(400)(0.0025)$.`),
    num(3, r`A 2 kg block moving at 3 m/s hits a 450 N/m spring. Find the maximum compression.`, 0.2, { unit: "m" }, ["All the block's kinetic energy goes into the spring: ½mv² = ½kx²."], r`$\frac12(2)(9) = \frac12(450)x^2$.`),
    mc(3, r`Compressing a spring twice as far takes ___ the work.`, ["2 times", "4 times", "√2 times", "the same"], 1, ["W = ½kx². How does W scale with x?"], r`$U \propto x^2$.`, "review"),
  ],
});
