import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "intro-equilibrium",
  title: "Introduction to equilibrium",
  summary: "Describe reversible reactions reaching dynamic equilibrium, read concentration–time and rate–time graphs, and recognize that equilibrium doesn't mean equal concentrations.",
  minutes: 30,
  objectives: [
    "Explain dynamic equilibrium: forward and reverse rates equal, concentrations constant.",
    "Interpret concentration–time and rate–time graphs approaching equilibrium.",
    "Explain why equilibrium concentrations are generally not equal.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Reversible reactions", r`In a closed container, products can react back. At first the forward rate is high and the reverse rate zero; as products build up, the reverse rate rises and the forward rate falls until they're equal. From then on concentrations stay constant, though both reactions continue: equilibrium is dynamic.`),
    def("What equilibrium isn't", r`It isn't equal concentrations of reactants and products, and it isn't a stopped reaction. The ratio described by K is what's fixed at a given temperature.`),
    example(r`N₂O₄ (colorless) ⇌ 2NO₂ (brown) in a sealed tube`, [
      [r`\text{the color darkens, then stops changing}`, "Equilibrium: NO₂ forms and reacts back at equal rates."],
    ]),
    activity("equilibrium", { title: "Equilibrium concentrations aren't equal", params: { K: 4, A0: 1, B0: 1 } }),
    callout("application", "Where this shows up", r`Carbonated drinks (CO₂ dissolving and escaping), oxygen binding to hemoglobin, and every industrial process that can't reach 100% yield.`),
  ],
  questions: [
    mc(1, r`At equilibrium,…`, ["the reaction stops", "forward and reverse rates are equal", "reactant and product concentrations are equal", "only products exist"], 1, ["Equilibrium is dynamic. What is balanced, the amounts or the rates?"], r`Dynamic balance.`),
    mc(2, r`On a rate–time graph for a reaction starting with only reactants, the forward rate…`, ["starts at zero", "decreases until it meets the reverse rate", "increases forever", "stays constant"], 1, ["The forward rate depends on reactant concentration. What happens to the reactants as the reaction runs?"], r`Reactants are used up.`),
    mc(2, r`Isotope-labeled atoms added at equilibrium end up in both reactants and products because…`, ["the system is not at equilibrium", "both reactions continue", "the label reacts", "K changes"], 1, ["For labels to spread into both sides, which reactions must still be happening?"], r`Evidence of dynamic equilibrium.`),
    mc(3, r`Equilibrium can only be established in…`, ["an open system", "a closed system", "a solid", "a gas only"], 1, ["For the reverse reaction to run, the products must stay. What kind of system keeps them?"], r`Products must stay to react back.`, "review"),
  ],
});
