import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-potential-energy",
  title: "Potential energy and conservative forces",
  summary: "Define conservative forces, find potential energy from force by integration and force from potential energy by differentiation, and classify equilibrium points on U(x) graphs.",
  minutes: 40,
  objectives: [
    "Define a conservative force: path-independent work, zero work around closed loops.",
    "Use ΔU = −∫F dx and F = −dU/dx.",
    "Find equilibria where dU/dx = 0, and classify them with d²U/dx².",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Conservative forces", r`A force is conservative if its work between two points doesn't depend on the path (gravity, springs, electric forces). Friction is not: a longer path does more negative work. Only conservative forces have a potential energy: $\Delta U = -\int_{x_1}^{x_2} F\,dx$, and conversely $F = -\frac{dU}{dx}$.`),
    example(r`Spring and gravity potential energies from their forces`, [
      [r`F = -kx \Rightarrow U = \tfrac12 kx^2`, ""],
      [r`F = -\tfrac{GMm}{r^2} \Rightarrow U = -\tfrac{GMm}{r}`, "Choosing U = 0 at infinity."],
    ]),
    def("Equilibrium", r`Equilibrium is where $F = -\frac{dU}{dx} = 0$, a flat spot on the $U(x)$ graph. A minimum ($U'' > 0$) is stable: nudge it and it returns. A maximum ($U'' < 0$) is unstable.`),
    example(r`U(x) = 2x³ − 6x (joules)`, [
      [r`F = -\tfrac{dU}{dx} = -6x^2 + 6`, ""],
      [r`F = 0\ \text{at}\ x = \pm 1`, ""],
      [r`U'' = 12x:\ x = 1\ \text{stable},\ x = -1\ \text{unstable}`, ""],
      [r`F(2) = -24 + 6 = -18\ \text{N}`, ""],
    ]),
    callout("application", "Where this shows up", r`Chemical bonds sit at the minimum of an interatomic potential, molecular models compute forces as $-\nabla U$, and a ball balanced on a hill is an unstable equilibrium.`),
  ],
  questions: [
    num(2, r`U(x) = x⁴ − 2x². Find F at x = 0.5 m, to two decimal places.`, 1.5, { tolerance: 0.01, unit: "N" }, ["F = −dU/dx; evaluate at x = 0.5."], r`$F = -4x^3 + 4x = -0.5 + 2$.`),
    num(3, r`For U(x) = x⁴ − 2x², how many stable equilibrium points are there?`, 2, {}, ["Equilibria are where dU/dx = 0; stable ones are minima of U."], r`$x = \pm1$ are minima ($U'' = 8$); $x = 0$ is a maximum.`),
    mc(2, r`Which force is NOT conservative?`, ["gravity", "spring force", "kinetic friction", "electric force"], 2, ["A conservative force's work doesn't depend on the path. Which force's work grows with the path length?"], r`Friction's work depends on the path.`),
    mc(3, r`At a point where U(x) has positive slope, the force points…`, ["+x", "−x", "nowhere", "up"], 1, ["F = −dU/dx: the force points downhill on U."], r`$F = -\frac{dU}{dx}$.`, "review"),
  ],
});
