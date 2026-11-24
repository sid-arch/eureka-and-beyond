import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "internal-structure-density",
  title: "Internal structure and density",
  summary: "Model fluids as collections of particles, use density to identify materials, compute average densities of mixtures, and test for purity with Archimedes' method.",
  minutes: 30,
  objectives: [
    "Describe what makes a substance a fluid, and the ideal-fluid model.",
    "Use density ρ = m/V to identify materials and compute average densities.",
    "Find an object's density from its weight in air and in water.",
  ],
  concepts: [
    { slug: "fluids", name: "Fluids", description: "Pressure, buoyancy and flow in liquids and gases.", subject: "subj_phys" },
  ],
  formulas: ["fluids"],
  blocks: [
    def("Fluids", r`Liquids and gases are fluids: their particles can slide past one another, so they flow and take the shape of their container. Liquids are nearly incompressible; gases compress easily. An ideal fluid is incompressible with no internal friction (viscosity), the model used in AP Physics.`),
    def("Density", r`$\rho = \frac{m}{V}$ is a property of the material, not the sample. Water is 1000 kg/m³ (1 g/cm³), aluminum 2700, iron 7870, gold 19,300 and air about 1.2. For a mixture, the average density is total mass divided by total volume.`),
    example(r`A mix of 80% oil (920 kg/m³) and 20% water by volume`, [
      [r`\rho_{avg} = 0.8(920) + 0.2(1000) = 936\ \text{kg/m}^3`, "By volume fractions."],
    ]),
    example(r`Archimedes' crown: 1.000 kg in air, apparent mass 0.940 kg in water`, [
      [r`m_{water} = 1.000 - 0.940 = 0.060\ \text{kg}`, "The mass of water the crown displaces."],
      [r`V = \tfrac{0.060}{1000} = 6.0\times10^{-5}\ \text{m}^3`, ""],
      [r`\rho = \tfrac{1.000}{6.0\times10^{-5}} \approx 16{,}700\ \text{kg/m}^3`, "Less than gold's 19,300, so the crown isn't pure gold."],
    ]),
    activity("buoyancy", { title: "Densities compared", params: { fluid: "water", density: 2700, volume: 1 } }),
    callout("application", "Where this shows up", r`Hydrometers measure battery acid and the sugar content of wine by how high they float; jewelers use the crown method to test precious metals.`),
  ],
  questions: [
    num(1, r`A 500 cm³ block has a mass of 3.935 kg. Find its density in kg/m³.`, 7870, { unit: "kg/m³" }, ["ρ = m/V; convert 500 cm³ to m³ first (1 m³ = 10⁶ cm³)."], r`$\frac{3.935}{5\times10^{-4}}$ (iron).`),
    num(2, r`A metal object weighs 10.0 N in air and 8.0 N in water. Find its density.`, 5000, { unit: "kg/m³" }, ["The apparent weight loss is the buoyant force, which equals the weight of water displaced.", "That gives the object's volume; its density follows from its weight."], r`$F_b = 2$ N displaces $\frac{2}{9800}$ m³, so $\rho = 5 \times 1000$.`),
    mc(2, r`Cutting a block of wood in half changes its density by…`, ["halving it", "doubling it", "nothing", "it depends"], 2, ["Density is mass per volume. Cutting the block halves both."], r`Density is a material property.`),
    mc(3, r`Which property best separates liquids from gases?`, ["Viscosity", "Compressibility", "Color", "Temperature"], 1, ["Squeeze a liquid and a gas. Which one's volume barely changes?"], r`Liquids are nearly incompressible; gases are not.`, "review"),
  ],
});
