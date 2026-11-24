import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "physical-chemical-changes",
  title: "Physical and chemical changes",
  summary: "Distinguish physical from chemical changes and properties, recognize evidence of chemical reactions, and apply conservation of mass.",
  minutes: 25,
  objectives: [
    "Distinguish physical and chemical properties and changes.",
    "Recognize evidence of a chemical change.",
    "Apply the law of conservation of mass.",
  ],
  concepts: [
    { slug: "matter", name: "Matter", description: "Anything with mass and volume, classified as pure substances or mixtures.", subject: "subj_chem" },
  ],
  blocks: [
    def("Physical vs chemical", r`A physical change alters form but not identity: melting, dissolving, cutting. A chemical change makes new substances: burning, rusting, cooking. Physical properties (density, boiling point, color) can be measured without changing the substance; chemical properties (flammability, reactivity) describe how it reacts.`),
    def("Evidence of a chemical change", r`Gas produced (bubbles not from boiling), a precipitate forming, an unexpected color change, light or heat given off, or a new odor. None is proof alone; boiling also makes bubbles.`),
    def("Conservation of mass", r`In a closed system, the total mass before a reaction equals the total mass after: atoms are rearranged, not created or destroyed.`),
    example(r`Heating 10.0 g of limestone (CaCO₃) leaves 5.6 g of lime (CaO). How much CO₂ escaped?`, [
      [r`m_{CO_2} = 10.0 - 5.6 = 4.4\ \text{g}`, "Mass is conserved."],
    ]),
    callout("application", "Where this shows up", r`Cooking (chemical), ice melting (physical), and Lavoisier's careful weighings that founded modern chemistry by showing mass is conserved.`),
  ],
  questions: [
    mc(1, r`Which is a chemical change?`, ["ice melting", "sugar dissolving", "wood burning", "glass breaking"], 2, [], r`New substances (CO₂, water, ash) form.`),
    mc(2, r`Which is a chemical property?`, ["density", "boiling point", "flammability", "color"], 2, [], r`It describes how the substance reacts.`),
    num(2, r`4.0 g of hydrogen reacts completely with 32.0 g of oxygen. What mass of water forms?`, 36, { unit: "g" }, [], r`$4.0 + 32.0$.`),
    mc(3, r`A burning candle loses mass. This doesn't violate conservation of mass because…`, ["mass is destroyed in fire", "products escape as gases", "candles are an exception", "light has mass"], 1, [], r`CO₂ and water vapor leave the system.`, "review"),
  ],
});
