import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "naming-molecular-acids",
  title: "Naming molecular compounds and acids",
  summary: "Name binary molecular compounds with Greek prefixes, and name binary acids and oxyacids from their anions.",
  minutes: 30,
  objectives: [
    "Use prefixes (mono-, di-, tri-, tetra-, penta-, hexa-…) for molecular compounds.",
    "Name binary acids: hydro- + root + -ic acid.",
    "Name oxyacids: -ate → -ic acid, -ite → -ous acid.",
  ],
  concepts: [
    { slug: "nomenclature", name: "Chemical nomenclature", description: "Systematic names and formulas for compounds.", subject: "subj_chem" },
  ],
  blocks: [
    def("Molecular compounds", r`Two nonmetals: use prefixes for the number of each atom, ending the second with -ide. Drop mono- on the first element. CO is carbon monoxide, N₂O₅ dinitrogen pentoxide, SF₆ sulfur hexafluoride.`),
    def("Acids", r`Binary acids (H with one nonmetal, in water): hydro- + root + -ic acid, so HCl is hydrochloric acid. Oxyacids come from polyatomic anions: -ate becomes -ic (NO₃⁻ → HNO₃, nitric acid; SO₄²⁻ → H₂SO₄, sulfuric acid); -ite becomes -ous (SO₃²⁻ → H₂SO₃, sulfurous acid).`),
    example(r`Name P₄O₁₀ and HClO₂ (from chlorite, ClO₂⁻)`, [
      [r`\text{P}_4\text{O}_{10}:\ \text{tetraphosphorus decoxide}`, ""],
      [r`\text{HClO}_2:\ \text{chlorous acid}`, "-ite → -ous."],
    ]),
    callout("application", "Where this shows up", r`Nitrous oxide (N₂O) is laughing gas; carbon monoxide is a deadly pollutant; sulfuric acid is one of the most-produced industrial chemicals in the world.`),
  ],
  questions: [
    mc(1, r`Name N₂O₄.`, ["nitrogen oxide", "dinitrogen tetroxide", "nitrogen(IV) oxide", "dinitrogen oxide"], 1, [], r`Prefixes for both elements.`),
    mc(2, r`Name HBr dissolved in water.`, ["bromic acid", "hydrobromic acid", "hydrogen bromate", "bromous acid"], 1, [], r`A binary acid.`),
    mc(2, r`Name HNO₂ (from nitrite).`, ["nitric acid", "nitrous acid", "hydronitric acid", "hydronitrous acid"], 1, [], r`-ite → -ous.`),
    mc(3, r`What is the formula of phosphoric acid (from phosphate, PO₄³⁻)?`, ["HPO₄", "H₂PO₄", "H₃PO₄", "H₃PO₃"], 2, [], r`Three H⁺ balance −3.`, "review"),
  ],
});
