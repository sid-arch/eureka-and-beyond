import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "density-pressure",
  title: "Density and pressure",
  summary: "Use density and pressure, compute pressure at depth in a fluid, and explain hydraulic systems with Pascal's principle.",
  minutes: 30,
  objectives: [
    "Compute density ρ = m/V and pressure P = F/A.",
    "Find pressure at depth, P = P₀ + ρgh, and tell gauge pressure from absolute pressure.",
    "Apply Pascal's principle to hydraulic lifts.",
  ],
  concepts: [
    { slug: "fluids", name: "Fluids", description: "Pressure, buoyancy and flow in liquids and gases.", subject: "subj_phys" },
  ],
  formulas: ["fluids"],
  blocks: [
    def("Density and pressure", r`Density $\rho = \frac{m}{V}$ (water: 1000 kg/m³). Pressure is force per area: $P = \frac{F}{A}$, in pascals (1 Pa = 1 N/m²). Atmospheric pressure at sea level is about 101,300 Pa.`),
    def("Pressure at depth", r`In a fluid at rest, $P = P_0 + \rho g h$. The term $\rho g h$ is the gauge pressure; $P$ is the absolute pressure. Pressure depends on depth only, not on the container's shape.`),
    example(r`A diver 10 m below the surface of fresh water`, [
      [r`P_{gauge} = 1000(9.8)(10) = 98{,}000\ \text{Pa}`, ""],
      [r`P = 101{,}300 + 98{,}000 = 199{,}300\ \text{Pa}`, "About twice atmospheric pressure."],
    ]),
    def("Pascal's principle", r`Pressure applied to an enclosed fluid is transmitted undiminished everywhere in it. A hydraulic lift gives $\frac{F_1}{A_1} = \frac{F_2}{A_2}$: a small force on a small piston lifts a large load on a large piston, through a shorter distance.`),
    example(r`A 100 N push on a piston; the output piston has 50 times the area`, [
      [r`F_2 = 100 \times 50 = 5000\ \text{N}`, ""],
    ]),
    callout("application", "Where this shows up", r`Car brakes and lifts are hydraulic; dams are thicker at the bottom where the pressure is highest; your ears pop as outside pressure changes.`),
  ],
  questions: [
    num(1, r`A 2.7 kg block has a volume of 0.001 m³. Find its density.`, 2700, { unit: "kg/m³" }, [], r`$\frac{2.7}{0.001}$ (aluminum).`),
    num(2, r`A 600 N person stands on 0.04 m² of shoe soles. Find the pressure.`, 15000, { unit: "Pa" }, [], r`$\frac{600}{0.04}$.`),
    num(2, r`Find the gauge pressure 3 m deep in a pool.`, 29400, { unit: "Pa" }, [], r`$1000(9.8)(3)$.`),
    mc(3, r`Three containers of different shapes are filled with water to the same depth. The pressure at the bottom is…`, ["greatest in the widest", "greatest in the narrowest", "the same in all three", "greatest in the one with most water"], 2, [], r`Only depth matters.`, "review"),
  ],
});
