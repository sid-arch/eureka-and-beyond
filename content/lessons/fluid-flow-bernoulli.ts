import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "fluid-flow-bernoulli",
  title: "Fluid flow and Bernoulli's equation",
  summary: "Use the continuity equation for flow through pipes of changing size, and apply Bernoulli's equation to relate pressure, speed and height.",
  minutes: 35,
  objectives: [
    "Apply the continuity equation A₁v₁ = A₂v₂.",
    "State and apply Bernoulli's equation.",
    "Find the speed of fluid draining from a tank (Torricelli's result).",
  ],
  concepts: [
    { slug: "fluids", name: "Fluids", description: "Pressure, buoyancy and flow in liquids and gases.", subject: "subj_phys" },
  ],
  formulas: ["fluids"],
  blocks: [
    def("Continuity", r`For an incompressible fluid, the volume flow rate $Q = Av$ is the same everywhere along a pipe: $A_1 v_1 = A_2 v_2$. Where the pipe narrows, the fluid speeds up.`),
    example(r`Water leaves a 2 cm² hose at 1.5 m/s into a 0.5 cm² nozzle`, [
      [r`v_2 = \tfrac{A_1 v_1}{A_2} = \tfrac{2(1.5)}{0.5} = 6\ \text{m/s}`, ""],
    ]),
    def("Bernoulli's equation", r`Along a streamline of steady, non-viscous, incompressible flow: $P + \frac12\rho v^2 + \rho g h = \text{constant}$. It's conservation of energy per unit volume, and where fluid moves faster its pressure is lower.`),
    example(r`Water speeds up from 2 m/s to 6 m/s in a horizontal pipe`, [
      [r`P_1 - P_2 = \tfrac12\rho(v_2^2 - v_1^2)`, ""],
      [r`P_1 - P_2 = \tfrac12(1000)(36 - 4) = 16{,}000\ \text{Pa}`, "The pressure is lower in the narrow, fast section."],
    ]),
    example(r`Water drains from a hole 5 m below the surface of an open tank`, [
      [r`v = \sqrt{2gh} = \sqrt{2(9.8)(5)} \approx 9.9\ \text{m/s}`, "The same speed as an object dropped 5 m."],
    ]),
    callout("note", "Lift", r`Bernoulli's principle explains part of airplane lift (faster air over the wing, lower pressure), along with the wing deflecting air downward (Newton's third law).`),
    callout("application", "Where this shows up", r`Putting your thumb over a hose, perfume atomizers, carburetors and a shower curtain drawn inward by the moving spray.`),
  ],
  questions: [
    num(2, r`A pipe's radius halves. By what factor does the water speed change?`, 4, {}, [], r`Area scales as $r^2$, so the area is ¼ and the speed ×4.`),
    num(2, r`Find the drain speed from a hole 1.25 m below the water surface.`, 4.95, { tolerance: 0.02, unit: "m/s" }, [], r`$\sqrt{2(9.8)(1.25)} \approx 4.95$.`),
    num(3, r`Air (ρ = 1.2 kg/m³) flows over a wing at 70 m/s and under it at 60 m/s. Find the pressure difference.`, 780, { tolerance: 1, unit: "Pa" }, [], r`$\frac12(1.2)(4900 - 3600) = 780$ Pa.`),
    mc(3, r`Two ships sailing close side by side tend to…`, ["drift apart", "be pushed together", "speed up", "sink lower"], 1, [], r`Water between them moves faster, so its pressure is lower.`, "review"),
  ],
});
