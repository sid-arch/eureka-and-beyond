import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "equilibrium-le-chatelier",
  title: "Chemical equilibrium and Le Châtelier's principle",
  summary: "Describe dynamic equilibrium, write equilibrium expressions, compare Q with K, and predict shifts from concentration, pressure and temperature changes.",
  minutes: 40,
  objectives: [
    "Describe dynamic equilibrium: forward and reverse rates are equal.",
    "Write K expressions and interpret large and small K.",
    "Use Q vs K and Le Châtelier's principle to predict shifts.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Dynamic equilibrium", r`In a closed system, a reversible reaction reaches a state where forward and reverse rates are equal, so concentrations stop changing, though both reactions continue. For $aA + bB \rightleftharpoons cC + dD$, $K = \frac{[C]^c[D]^d}{[A]^a[B]^b}$. Leave out pure solids and liquids. A large K favors products; a small K, reactants.`),
    example(r`N₂O₄ ⇌ 2NO₂ at equilibrium has [NO₂] = 0.040 M and [N₂O₄] = 0.20 M`, [
      [r`K = \tfrac{(0.040)^2}{0.20} = 0.0080`, "Reactants are favored."],
    ]),
    def("Le Châtelier's principle", r`A system at equilibrium shifts to partly undo a stress. Add a reactant or remove a product: it shifts right. Raise pressure by shrinking the volume: it shifts toward fewer gas moles. Raising temperature favors the endothermic direction, and changes K itself.`),
    activity("equilibrium", { title: "Stress the equilibrium", params: { K: 4, A0: 1, B0: 1, amount: 0.5 } }),
    callout("tip", "Try this", r`Add A and compare Q with K right after: Q < K, so the bars shift toward C. Now add C instead.`, "experiment"),
    callout("application", "Where this shows up", r`The Haber process makes ammonia at high pressure (4 gas moles → 2), and hemoglobin's oxygen binding shifts with altitude.`),
  ],
  questions: [
    num(2, r`For H₂ + I₂ ⇌ 2HI, [H₂] = [I₂] = 0.10 M and [HI] = 0.70 M. Find K.`, 49, {}, [], r`$\frac{0.49}{0.01}$.`),
    mc(2, r`For N₂ + 3H₂ ⇌ 2NH₃, increasing the pressure shifts it…`, ["left", "right", "not at all", "toward N₂ only"], 1, [], r`4 gas moles → 2.`),
    mc(2, r`If Q > K, the reaction…`, ["shifts right", "shifts left", "is at equilibrium", "stops"], 1, [], r`Too much product.`),
    mc(3, r`Adding a catalyst to a system at equilibrium…`, ["shifts it right", "shifts it left", "doesn't change the equilibrium position", "changes K"], 2, [], r`It speeds both directions equally.`, "review"),
  ],
});
