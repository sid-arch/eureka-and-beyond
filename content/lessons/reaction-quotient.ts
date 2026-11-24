import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reaction-quotient",
  title: "Reaction quotient and equilibrium constant",
  summary: "Write Kc and Kp expressions (leaving out solids and liquids), compute the reaction quotient Q at any moment, and compare Q with K to predict the direction of change.",
  minutes: 35,
  objectives: [
    "Write Kc and Kp expressions, omitting pure solids and liquids.",
    "Compute Q from current concentrations or pressures.",
    "Predict direction: Q < K goes forward, Q > K goes in reverse, Q = K is at equilibrium.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Q and K", r`Q has the same form as K but uses the current concentrations. For gases you can use partial pressures (Kp). Pure solids and liquids are left out: for CaCO₃(s) ⇌ CaO(s) + CO₂(g), $K_p = P_{\text{CO}_2}$.`),
    example(r`N₂ + 3H₂ ⇌ 2NH₃ with K = 0.50; currently [N₂] = 1.0, [H₂] = 1.0, [NH₃] = 0.50 M`, [
      [r`Q = \tfrac{(0.50)^2}{(1.0)(1.0)^3} = 0.25`, ""],
      [r`Q < K \Rightarrow \text{shifts forward}`, "More NH₃ will form."],
    ]),
    activity("equilibrium", { title: "Q right after a disturbance", params: { K: 4, A0: 1, B0: 1, amount: 0.5 } }),
    callout("application", "Where this shows up", r`Chemists check Q against K to decide whether a mixture in a reactor will keep producing product or run backward.`),
  ],
  questions: [
    num(2, r`For H₂ + I₂ ⇌ 2HI (K = 49), [H₂] = [I₂] = 0.20 M and [HI] = 1.0 M. Find Q.`, 25, {}, ["Q has the same form as K: [HI]² / ([H₂][I₂]), using the current concentrations."], r`$\frac{1.0}{0.04}$.`),
    mc(2, r`For that mixture, the reaction…`, ["is at equilibrium", "shifts forward", "shifts in reverse", "stops"], 1, ["Compare Q with K. If Q is smaller, which side needs to grow?"], r`Q = 25 < 49.`),
    mc(2, r`Which goes into the K expression for Zn(s) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(s)?`, ["[Zn][Cu²⁺]", "[Zn²⁺]/[Cu²⁺]", "[Cu]/[Zn]", "[Zn²⁺][Cu]"], 1, ["Pure solids (and liquids) are left out of K expressions."], r`Solids are left out.`),
    mc(3, r`If Q > K, then…`, ["more products form", "products convert back to reactants", "K increases", "nothing happens"], 1, ["Q > K means there's more product than at equilibrium. Which way must the reaction shift?"], r`Too much product relative to equilibrium.`, "review"),
  ],
});
