import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "thermal-conductivity",
  title: "Specific heat and thermal conductivity",
  summary: "Connect specific heat to how fast temperatures change, and compute the rate of heat conduction through materials with P = kAΔT/L.",
  minutes: 30,
  objectives: [
    "Use Q = mcΔT to compare how materials warm.",
    "Compute conduction rates with P = kAΔT/L.",
    "Explain how thickness, area and material control heat loss.",
  ],
  concepts: [
    { slug: "thermal-physics", name: "Thermal physics", description: "Temperature, heat, phase changes and the laws of thermodynamics.", subject: "subj_phys" },
  ],
  formulas: ["heat-thermodynamics"],
  blocks: [
    def("Specific heat, revisited", r`For the same heat input, a material with low specific heat changes temperature quickly: 1 kJ warms 1 kg of copper ($c = 385$) by 2.6 °C but 1 kg of water ($c = 4186$) by only 0.24 °C.`),
    def("Conduction rate", r`Heat conducts through a slab at rate $P = \frac{Q}{\Delta t} = \frac{kA\Delta T}{L}$, where $k$ is the thermal conductivity (W/(m·K)), $A$ the area, $L$ the thickness and $\Delta T$ the temperature difference. Copper $k \approx 400$, glass 0.8, wood 0.1, fiberglass 0.04, still air 0.025.`),
    example(r`A 1 m² single-pane window, 4 mm thick, 20 °C warmer inside`, [
      [r`P = \tfrac{(0.8)(1)(20)}{0.004} = 4000\ \text{W}`, "Real windows lose less, because still air layers on each surface add insulation."],
    ]),
    example(r`10 m² of 10 cm fiberglass with the same 20 °C difference`, [
      [r`P = \tfrac{(0.04)(10)(20)}{0.1} = 80\ \text{W}`, ""],
    ]),
    callout("note", "Feeling temperature", r`Metal feels colder than wood at the same temperature because its high $k$ draws heat from your skin faster.`),
    callout("application", "Where this shows up", r`Double-pane windows trap a gas layer, cooking pans pair a copper base with a wooden handle, and insulation is sold by R-value, which is proportional to $\frac{L}{k}$.`),
  ],
  questions: [
    num(2, r`A copper rod (k = 400) of cross-section 1 cm² and length 0.5 m has ends 100 °C apart. Find the heat flow.`, 8, { unit: "W" }, [], r`$\frac{400(10^{-4})(100)}{0.5}$.`),
    mc(2, r`Doubling a wall's thickness changes the heat loss by a factor of…`, ["2", "½", "4", "1"], 1, [], r`$P \propto \frac{1}{L}$.`),
    num(2, r`How much heat warms 0.2 kg of copper by 50 °C?`, 3850, { unit: "J" }, [], r`$0.2(385)(50)$.`),
    mc(3, r`Why does a puffy jacket keep you warm?`, ["It generates heat", "It traps still air, which conducts poorly", "Feathers are hot", "It reflects all radiation"], 1, [], r`Air's $k$ is tiny if it can't circulate.`, "review"),
  ],
});
