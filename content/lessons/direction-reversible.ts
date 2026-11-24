import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "direction-reversible",
  title: "Direction of reversible reactions",
  summary: "Predict whether a reversible reaction proceeds forward or in reverse by comparing forward and reverse rates, and connect that to macroscopic observations.",
  minutes: 25,
  objectives: [
    "Decide the net direction from which rate is larger.",
    "Connect net direction to observable changes (color, pressure, pH).",
    "Explain that a reaction can be run from either side to the same equilibrium.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Net direction", r`If the forward rate is larger, the net reaction goes forward: products accumulate. If the reverse rate is larger, it goes backward. At equilibrium the rates are equal and nothing changes macroscopically.`),
    example(r`Start the N₂O₄ ⇌ 2NO₂ system with pure NO₂ instead`, [
      [r`\text{reverse rate} > \text{forward rate initially}`, "The brown color fades as N₂O₄ forms."],
      [r`K\ \text{is unchanged}`, "Same equilibrium ratio at the same temperature: either starting point works."],
    ]),
    callout("application", "Where this shows up", r`Rechargeable batteries are run forward to discharge and backward to recharge.`),
  ],
  questions: [
    mc(2, r`Starting with only products, the net reaction initially goes…`, ["forward", "in reverse", "nowhere", "it can't happen"], 1, ["With no reactants present, which reaction is the only one possible at first?"], r`Only the reverse reaction can occur at first.`),
    mc(2, r`A brown NO₂ sample slowly gets lighter in a sealed flask. The net reaction is…`, ["2NO₂ → N₂O₄", "N₂O₄ → 2NO₂", "at equilibrium", "stopped"], 0, ["NO₂ is the brown gas. If the color fades, is NO₂ being made or used up?"], r`NO₂ is being consumed.`),
    mc(3, r`Starting from pure reactants versus pure products (same atoms and temperature), the equilibrium state is…`, ["different", "the same", "reached only from reactants", "random"], 1, ["At a given temperature, K is fixed. Does the route to equilibrium change where it ends up?"], r`K is fixed at a given temperature.`),
    mc(3, r`When the forward rate exceeds the reverse rate,…`, ["the system is at equilibrium", "products are accumulating", "reactants are accumulating", "K changes"], 1, ["If the forward reaction runs faster than the reverse, what builds up?"], r`Net forward reaction.`, "review"),
  ],
});
