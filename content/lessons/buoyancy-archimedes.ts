import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "buoyancy-archimedes",
  title: "Buoyancy and Archimedes' principle",
  summary: "Explain the buoyant force, use Archimedes' principle to decide whether objects float or sink, and find the fraction submerged and apparent weight.",
  minutes: 30,
  objectives: [
    "State Archimedes' principle: F_b equals the weight of the fluid displaced.",
    "Predict floating or sinking by comparing densities.",
    "Compute the fraction submerged and the apparent weight.",
  ],
  concepts: [
    { slug: "fluids", name: "Fluids", description: "Pressure, buoyancy and flow in liquids and gases.", subject: "subj_phys" },
  ],
  formulas: ["fluids"],
  blocks: [
    def("Archimedes' principle", r`Pressure increases with depth, so a submerged object is pushed up harder on its bottom than down on its top. The net upward push, the buoyant force, equals the weight of the displaced fluid: $F_b = \rho_f V_{sub}\, g$.`),
    def("Float or sink", r`An object floats if it's less dense than the fluid. Floating, it sinks until $F_b$ equals its weight, so the fraction submerged is $\frac{\rho_{obj}}{\rho_f}$. A denser object sinks and has apparent weight $W - F_b$.`),
    example(r`A 2 L block, fully submerged in water`, [
      [r`F_b = 1000(0.002)(9.8) = 19.6\ \text{N}`, "Whatever the block is made of."],
    ]),
    example(r`An iceberg (917 kg/m³) in seawater (1025 kg/m³)`, [
      [r`\tfrac{917}{1025} \approx 0.895`, "About 89% of the ice is below the surface."],
    ]),
    activity("buoyancy", { title: "Float or sink?", params: { fluid: "water", density: 600, volume: 2 } }),
    callout("tip", "Try this", r`With a 600 kg/m³ block, 60% sits underwater. Raise the density past 1000 and it sinks; then switch to glycerin and watch it float again.`, "experiment"),
    callout("application", "Where this shows up", r`Steel ships float because their hulls enclose air, making the average density low; submarines and fish adjust buoyancy by taking in or releasing water or gas.`),
  ],
  questions: [
    num(2, r`A 3 L rock of density 2500 kg/m³ lies underwater. Find its apparent weight.`, 44.1, { tolerance: 0.1, unit: "N" }, [], r`$(2500 - 1000)(0.003)(9.8)$.`),
    num(1, r`Wood of density 800 kg/m³ floats in water. What percent is submerged?`, 80, { unit: "%" }, [], r`$\frac{800}{1000}$.`),
    mc(2, r`A ship sails from a river (fresh water) into the sea. It…`, ["sinks lower", "rises slightly", "stays at the same level", "sinks"], 1, [], r`Seawater is denser, so less volume is needed to displace the ship's weight.`),
    mc(3, r`Two blocks of equal volume, one aluminum and one lead, are fully submerged in water. The buoyant force is…`, ["larger on lead", "larger on aluminum", "the same on both", "zero on lead"], 2, [], r`$F_b$ depends only on the displaced volume.`, "review"),
  ],
});
