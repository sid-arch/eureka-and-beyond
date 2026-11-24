import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calculating-k",
  title: "Calculating the equilibrium constant",
  summary: "Calculate K from equilibrium concentrations, from initial amounts plus one equilibrium measurement, and convert between Kc and Kp.",
  minutes: 35,
  objectives: [
    "Calculate K by substituting equilibrium concentrations.",
    "Use an ICE table when only one equilibrium concentration is known.",
    "Convert Kp = Kc(RT)^Δn.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    example(r`H₂ + I₂ ⇌ 2HI: start with 1.00 M of each reactant; at equilibrium [HI] = 1.56 M`, [
      [r`2x = 1.56 \Rightarrow x = 0.78`, ""],
      [r`[\text{H}_2] = [\text{I}_2] = 1.00 - 0.78 = 0.22\ \text{M}`, ""],
      [r`K = \tfrac{(1.56)^2}{(0.22)^2} \approx 50`, ""],
    ]),
    def("Kp and Kc", r`For gases, $K_p = K_c(RT)^{\Delta n}$, where Δn is moles of gaseous products minus gaseous reactants and R = 0.08206 L·atm/(mol·K).`),
    example(r`2SO₂ + O₂ ⇌ 2SO₃, Kc = 320 at 1000 K`, [
      [r`\Delta n = 2 - 3 = -1`, ""],
      [r`K_p = \tfrac{320}{0.08206(1000)} \approx 3.9`, ""],
    ]),
    callout("application", "Where this shows up", r`Thermodynamic databases list K values measured this way, and they're used to design every chemical plant.`),
  ],
  questions: [
    num(2, r`For PCl₅ ⇌ PCl₃ + Cl₂ at equilibrium, [PCl₅] = 0.20 M and [PCl₃] = [Cl₂] = 0.10 M. Find K.`, 0.05, { tolerance: 0.0001 }, ["K = [PCl₃][Cl₂] / [PCl₅], with the equilibrium concentrations."], r`$\frac{0.01}{0.20}$.`),
    num(3, r`A + B ⇌ C starts with 1.0 M A and B; at equilibrium [C] = 0.40 M. Find K, to two decimal places.`, 1.11, { tolerance: 0.01 }, ["Make an ICE table: A and B each drop by 0.40 M.", "K = [C] / ([A][B]) at equilibrium."], r`$\frac{0.40}{0.60^2}$.`),
    mc(2, r`When Δn = 0 for a gas reaction,…`, ["Kp = Kc", "Kp = 0", "Kp = 1/Kc", "Kp = RT"], 0, ["Kp = Kc(RT)^Δn. What is anything raised to the power 0?"], r`$(RT)^0 = 1$.`),
    mc(3, r`A K value depends on…`, ["starting concentrations", "temperature", "catalysts", "container shape"], 1, ["Changing concentrations shifts the position but not K. What does change K?"], r`Only temperature changes K.`, "review"),
  ],
});
