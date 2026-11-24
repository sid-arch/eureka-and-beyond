import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "thermal-equilibrium-chem",
  title: "Heat transfer and thermal equilibrium",
  summary: "Explain heat transfer between objects in particle terms, and solve for final temperatures and specific heats when substances reach thermal equilibrium.",
  minutes: 30,
  objectives: [
    "Explain heat flow as transfer of kinetic energy in particle collisions, from hot to cold.",
    "Use q_lost = −q_gained to find a final temperature.",
    "Find an unknown specific heat from mixing data.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("Particle picture", r`Faster particles in the hotter object collide with slower ones in the cooler object, transferring kinetic energy until the average kinetic energies, and so the temperatures, are equal: thermal equilibrium.`),
    example(r`50.0 g of aluminum (c = 0.897 J/(g·°C)) at 100.0 °C is dropped into 100.0 g of water at 20.0 °C`, [
      [r`44.85(T - 100) + 418.4(T - 20) = 0`, "Heat lost + heat gained = 0, with mc = 50.0(0.897) and 100.0(4.184)."],
      [r`T = \tfrac{4485 + 8368}{44.85 + 418.4} \approx 27.7\ °\text{C}`, "Water's large heat capacity keeps T low."],
    ]),
    callout("application", "Where this shows up", r`Coffee-cup calorimetry, engine cooling systems, and why coastal cities have mild climates.`),
  ],
  questions: [
    num(3, r`A 30.0 g metal at 95.0 °C is put in 50.0 g of water at 22.0 °C; the final temperature is 25.0 °C. Find the metal's specific heat, to three decimal places.`, 0.299, { tolerance: 0.002, unit: "J/(g·°C)" }, ["Heat lost by the metal = heat gained by the water: m c ΔT for each.", "The metal cools by 70.0 °C; the water warms by 3.0 °C."], r`$c = \frac{50.0(4.184)(3.0)}{30.0(70.0)} \approx 0.299$.`),
    num(2, r`100 g of water at 80 °C mixes with 100 g at 20 °C. Find the final temperature.`, 50, { unit: "°C" }, ["Heat lost by the hot water = heat gained by the cold water. Same mass, same c."], r`Equal masses, same c: the average.`),
    mc(2, r`Heat flows from A to B until…`, ["A is empty of energy", "both reach the same temperature", "both have the same heat", "B is hotter"], 1, ["What stops heat flowing between two objects in contact?"], r`Thermal equilibrium.`),
    mc(3, r`At thermal equilibrium, which is equal for both objects?`, ["total thermal energy", "average kinetic energy of particles", "mass", "specific heat"], 1, ["Temperature is a measure of something about the particles. What is it?"], r`Temperature measures it.`, "review"),
  ],
});
