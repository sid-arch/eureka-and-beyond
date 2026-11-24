import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-linear-momentum",
  title: "Linear momentum",
  summary: "Use F = dp/dt for changing momentum, including systems that gain mass, and connect system momentum to the center of mass velocity.",
  minutes: 30,
  objectives: [
    "Find force from a momentum function, F = dp/dt.",
    "Handle mass flow: the force needed to bring added mass up to speed is v dm/dt.",
    "Use p_total = M v_cm = M dx_cm/dt.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Momentum and force", r`$\vec p = m\vec v$ and $\vec F_{net} = \frac{d\vec p}{dt}$. If $p(t)$ is known, differentiate to get the force.`),
    example(r`p(t) = 3t² kg·m/s`, [
      [r`F = \tfrac{dp}{dt} = 6t`, ""],
      [r`F(2) = 12\ \text{N}`, ""],
    ]),
    def("Mass flow", r`When mass is added to a system moving at constant $v$ (sand dropped on a conveyor belt), the momentum still grows: $\frac{dp}{dt} = v\frac{dm}{dt}$. That's the force the motor must supply.`),
    example(r`Sand falls straight down onto a belt moving at 2 m/s, at 5 kg/s`, [
      [r`F = v\tfrac{dm}{dt} = 2(5) = 10\ \text{N}`, ""],
    ]),
    def("Systems", r`$\vec p_{tot} = \sum m_i\vec v_i = M\vec v_{cm}$, since $\vec v_{cm} = \frac{d\vec r_{cm}}{dt}$. If $\sum \vec F_{ext} = 0$, the center of mass keeps a constant velocity.`),
    callout("application", "Where this shows up", r`Conveyor belts, rockets (which lose mass) and water jets hitting turbine blades are all mass-flow problems.`),
  ],
  questions: [
    num(2, r`p(t) = 4t − t² kg·m/s. Find the force at t = 1 s.`, 2, { unit: "N" }, ["F = dp/dt."], r`$4 - 2t$.`),
    num(2, r`Gravel drops at 8 kg/s onto a belt moving at 1.5 m/s. Find the extra force needed.`, 12, { unit: "N" }, ["The belt must bring each kilogram of gravel up to 1.5 m/s: F = v (dm/dt)."], r`$1.5 \times 8$.`),
    num(2, r`A 2 kg mass at 3 m/s and a 4 kg mass at −1.5 m/s. Find v_cm.`, 0, { unit: "m/s" }, ["v_cm = total momentum / total mass."], r`$\frac{6 - 6}{6}$.`),
    mc(3, r`If a system's total momentum is constant, the net external force is…`, ["constant", "zero", "increasing", "equal to Mg"], 1, ["F_ext = dp/dt for the whole system."], r`$F = \frac{dp}{dt} = 0$.`, "review"),
  ],
});
