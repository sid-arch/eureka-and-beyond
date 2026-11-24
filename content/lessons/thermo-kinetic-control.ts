import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "thermo-kinetic-control",
  title: "Thermodynamic and kinetic control",
  summary: "Distinguish whether a reaction can happen (ΔG) from how fast it happens (Ea), and explain why some favorable reactions are not observed.",
  minutes: 30,
  objectives: [
    "Explain that ΔG° predicts favorability but not rate.",
    "Use activation energy to explain why favorable reactions can be too slow to observe.",
    "Distinguish the kinetic product (formed fastest) from the thermodynamic product (most stable).",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  formulas: ["free-energy", "rate-laws"],
  blocks: [
    def("Two separate questions", r`Thermodynamics asks whether products are favored: the sign of $\Delta G^\circ$. Kinetics asks how fast they form: the height of the activation barrier $E_a$. A reaction with $\Delta G^\circ < 0$ but a large $E_a$ is under kinetic control: favorable, yet so slow it doesn't measurably happen.`),
    example(r`Diamond → graphite at 298 K`, [
      [r`\Delta H^\circ = -1.9\ \text{kJ},\ \Delta S^\circ = +3.3\ \text{J/K}`, ""],
      [r`\Delta G^\circ = -1.9 - 298(0.0033)`, ""],
      [r`= -2.9\ \text{kJ}`, "Favorable."],
      [r`E_a \text{ is enormous}`, "Breaking a 3-D covalent network: no change in millions of years."],
    ]),
    callout("note", "Picture it", r`On an energy diagram, ΔG° is the drop from reactants to products and Eₐ is the hill in between. A deep drop behind a tall hill is favorable but slow; a catalyst lowers the hill without changing the drop.`),
    def("Kinetic vs thermodynamic product", r`When two products are possible, the one with the lower barrier forms faster (kinetic product). The one with the lower free energy is favored at equilibrium (thermodynamic product). Low temperature and short times favor the kinetic product; high temperature and long times let the system reach the thermodynamic one.`),
    callout("application", "Where this shows up", r`Wood and gasoline are thermodynamically unstable in air but need a spark to get over the barrier. Living cells survive because their molecules are kinetically stable, and enzymes choose which favorable reactions actually run.`),
  ],
  questions: [
    num(2, r`Find ΔG° for C(diamond) → C(graphite) at 298 K, given ΔH° = −1.9 kJ and ΔS° = +3.3 J/K. One decimal place.`, -2.9, { tolerance: 0.1, unit: "kJ" }, ["Convert ΔS° to kJ/K."], r`$-1.9 - 0.98 = -2.9$ kJ.`),
    mc(2, r`A mixture of H₂ and O₂ sits unchanged for years even though ΔG° ≪ 0. This is because…`, ["ΔH > 0", "the activation energy is high", "K is small", "ΔS > 0"], 1, ["ΔG says the reaction is favorable. What else controls whether it happens at a noticeable rate?"], r`It is kinetically controlled; a spark starts it.`),
    mc(2, r`A catalyst changes…`, ["ΔG°", "K", "Ea and the rate", "which side is favored"], 2, ["A catalyst gives a different path between the same start and end points."], r`Only the pathway.`),
    mc(3, r`Product A forms faster but product B is more stable. At high temperature for a long time you mostly get…`, ["A", "B", "equal amounts", "neither"], 1, ["Given enough energy and time, the system reaches equilibrium."], r`The thermodynamic product.`),
    mc(3, r`If ΔG° > 0 for a reaction, adding a catalyst…`, ["makes it favorable", "doesn't make it favorable", "reverses ΔH", "raises K"], 1, ["Does a catalyst change the energies of the reactants or products?"], r`Catalysts can't change ΔG°.`, "review"),
  ],
});
