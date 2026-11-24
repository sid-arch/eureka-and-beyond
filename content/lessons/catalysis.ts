import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "catalysis",
  title: "Catalysis",
  summary: "Explain how catalysts lower activation energy through new mechanisms, compare homogeneous, heterogeneous and enzyme catalysis, and estimate rate increases.",
  minutes: 30,
  objectives: [
    "Explain that a catalyst provides a new mechanism with lower Eₐ and is regenerated.",
    "Distinguish homogeneous, heterogeneous (surface) and enzyme catalysis.",
    "Estimate the rate increase from a lower Eₐ: k₂/k₁ = e^(ΔEₐ/RT).",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  blocks: [
    def("How catalysts work", r`A catalyst opens a different pathway with lower activation energy. It speeds the forward and reverse reactions equally, so it doesn't change ΔH or the equilibrium position, only how fast equilibrium is reached. It's consumed in one step and regenerated in a later one.`),
    def("Kinds", r`Homogeneous: same phase as the reactants (Cl atoms destroying ozone). Heterogeneous: a surface where reactants adsorb and bonds weaken (Pt in catalytic converters). Enzymes: protein catalysts whose active sites bind specific substrates.`),
    example(r`A catalyst lowers Eₐ from 75 to 50 kJ/mol at 298 K`, [
      [r`\tfrac{k_{cat}}{k} = e^{25{,}000/(8.314\cdot298)} \approx 2.4\times10^4`, "About 24,000 times faster."],
    ]),
    activity("kinetics", { title: "Lower Eₐ, faster reaction", params: { order: "1", k: 0.1, A0: 1, temperature: 298, Ea: 30 } }),
    callout("application", "Where this shows up", r`Catalytic converters, the Haber process (iron catalyst), enzymes in laundry detergents and nearly every reaction in your cells.`),
  ],
  questions: [
    num(3, r`A catalyst lowers Eₐ by 10 kJ/mol at 300 K. By what factor does k increase, to one decimal place?`, 55.1, { tolerance: 0.2 }, ["k is proportional to e^(−Eₐ/RT). Find the ratio of k after to k before.", "The ratio is e^(ΔEₐ/RT), with ΔEₐ in J/mol."], r`$e^{10{,}000/(8.314\cdot300)} \approx 55$.`),
    mc(2, r`A catalyst changes…`, ["ΔH", "the equilibrium constant", "the activation energy", "the products"], 2, ["A catalyst provides a new route between the same reactants and products."], r`Only the pathway.`),
    mc(2, r`Platinum in a catalytic converter is…`, ["homogeneous", "heterogeneous", "an enzyme", "a reactant"], 1, ["Is the platinum in the same phase as the exhaust gases?"], r`A solid surface with gas reactants.`),
    mc(3, r`In a mechanism, a catalyst appears…`, ["only as a reactant", "first as a reactant, later as a product", "only as a product", "as an intermediate"], 1, ["A catalyst isn't used up overall. Where must it show up in the steps?"], r`It's regenerated.`, "review"),
  ],
});
