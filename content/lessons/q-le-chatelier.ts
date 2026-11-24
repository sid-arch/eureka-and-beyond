import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "q-le-chatelier",
  title: "Reaction quotient and Le Châtelier's principle",
  summary: "Explain Le Châtelier shifts quantitatively by showing how a stress changes Q relative to K, including volume changes and the effect of temperature on K.",
  minutes: 35,
  objectives: [
    "Show that adding or removing a species makes Q ≠ K, and predict the shift.",
    "Explain volume and pressure changes through their effect on Q.",
    "Explain that temperature changes K itself (endothermic direction favored by heating).",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Stress changes Q", r`Adding reactant lowers Q below K, so the reaction shifts forward. Removing product does the same. The system shifts until Q equals K again.`),
    example(r`2NO₂ ⇌ N₂O₄: the volume doubles at constant temperature`, [
      [r`Q' = \tfrac{c/2}{(c/2)^2} = 2Q`, "Every concentration halves."],
      [r`Q' > K \Rightarrow \text{shifts left}`, "Toward more gas moles, as Le Châtelier predicts."],
    ]),
    def("Temperature is different", r`Temperature changes K, not Q. For an exothermic reaction, heating lowers K (shift toward reactants); for an endothermic one, heating raises K. Adding an inert gas at constant volume changes nothing, since no partial pressures change.`),
    activity("equilibrium", { title: "Add a species, then compare Q with K", params: { K: 4, A0: 1, B0: 1, amount: 0.5 } }),
    callout("application", "Where this shows up", r`Ammonia plants remove NH₃ as it forms to keep Q below K, and hemoglobin releases O₂ in tissues where its concentration is low.`),
  ],
  questions: [
    mc(2, r`Removing product from a system at equilibrium makes Q…`, ["larger than K", "smaller than K", "equal to K", "zero"], 1, ["Products appear in the numerator of Q. What happens to Q when you remove one?"], r`The numerator shrinks.`),
    mc(2, r`For an exothermic reaction, raising the temperature…`, ["raises K", "lowers K", "doesn't change K", "stops the reaction"], 1, ["Treat heat as a product of an exothermic reaction. Adding heat shifts which way, and how does K change?"], r`Heat acts like a product.`),
    mc(2, r`Adding argon to a rigid container at equilibrium…`, ["shifts it right", "shifts it left", "has no effect", "changes K"], 2, ["At constant volume, does argon change the partial pressures of the reacting gases?"], r`Partial pressures are unchanged.`),
    mc(3, r`For H₂ + I₂ ⇌ 2HI (all gases), compressing the container…`, ["shifts right", "shifts left", "doesn't shift", "changes K"], 2, ["Count moles of gas on each side. Does compressing change Q?"], r`Equal gas moles on both sides: Q is unchanged.`, "review"),
  ],
});
