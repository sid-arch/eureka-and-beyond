import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "resistive-forces-terminal-velocity",
  title: "Resistive forces and terminal velocity",
  summary: "Model drag forces proportional to v and v², solve the differential equation for falling with linear drag, and find terminal velocity and the time constant.",
  minutes: 40,
  objectives: [
    "Write Newton's second law with drag: m dv/dt = mg − bv.",
    "Solve it: v(t) = v_T(1 − e^(−t/τ)), with v_T = mg/b and τ = m/b.",
    "Find terminal velocity for quadratic drag, v_T = √(mg/c).",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Drag forces", r`A resistive force opposes motion and grows with speed. At low speeds in a thick fluid, it's linear: $F = bv$. At higher speeds in air, it's closer to quadratic: $F = cv^2$. Terminal velocity is reached when drag balances weight, so $a = 0$.`),
    def("Solving linear drag", r`Falling from rest: $m\frac{dv}{dt} = mg - bv$. Separate variables: $\int_0^v \frac{dv'}{g - (b/m)v'} = \int_0^t dt'$. This gives $v = v_T\left(1 - e^{-t/\tau}\right)$ with $v_T = \frac{mg}{b}$ and $\tau = \frac{m}{b}$. After one $\tau$, the speed is 63% of terminal.`),
    example(r`A 0.1 kg ball with b = 0.5 kg/s`, [
      [r`v_T = \tfrac{0.1(9.8)}{0.5} = 1.96\ \text{m/s}`, ""],
      [r`\tau = \tfrac{0.1}{0.5} = 0.2\ \text{s}`, ""],
      [r`v(0.2) = 1.96(1 - e^{-1}) \approx 1.24\ \text{m/s}`, ""],
    ]),
    example(r`An 80 kg skydiver with quadratic drag, c = 0.25 kg/m`, [
      [r`v_T = \sqrt{\tfrac{80(9.8)}{0.25}} = 56\ \text{m/s}`, "About 200 km/h."],
    ]),
    activity("drag-fall", { title: "Approach terminal velocity", params: { drag: "linear", mass: 0.1, coefficient: 0.5 } }),
    callout("tip", "Try this", r`Double the mass with linear drag: v_T and τ both double. Switch to quadratic drag and double the mass: v_T grows only by √2.`, "experiment"),
    callout("application", "Where this shows up", r`Parachutes raise c to drop terminal speed to about 5 m/s; sediment settling in water and Millikan's oil-drop experiment use linear drag.`),
  ],
  questions: [
    num(2, r`A 2 kg block coasts on a surface with drag F = −bv (b = 4 kg/s) from 10 m/s. How long until it slows to 5 m/s? Give two decimal places.`, 0.35, { tolerance: 0.01, unit: "s" }, ["With linear drag, v = v₀e^(−bt/m). Solve for when v = v₀/2."], r`$v = v_0e^{-bt/m}$, so $t = \frac{m}{b}\ln 2 = 0.5\ln 2$.`),
    num(2, r`A 0.01 kg raindrop has linear drag with b = 0.02 kg/s. Find its terminal speed.`, 4.9, { tolerance: 0.01, unit: "m/s" }, ["At terminal speed, the drag bv balances mg."], r`$\frac{mg}{b}$.`),
    mc(2, r`At terminal velocity, the net force is…`, ["mg", "zero", "bv", "maximum"], 1, ["Terminal velocity is constant velocity. What does Newton's second law say then?"], r`Constant velocity.`),
    mc(3, r`With linear drag, the time to reach 95% of terminal speed is about…`, ["τ", "2τ", "3τ", "10τ"], 2, ["v/v_t = 1 − e^(−t/τ). For what t does this reach 0.95?"], r`$1 - e^{-3} \approx 0.95$.`, "review"),
  ],
});
