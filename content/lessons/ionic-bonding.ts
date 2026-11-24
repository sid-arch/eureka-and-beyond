import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ionic-bonding",
  title: "Ionic bonding and ionic compounds",
  summary: "Explain ionic bonding as electron transfer, predict ion charges, write formulas by balancing charges, and relate structure to properties.",
  minutes: 30,
  objectives: [
    "Predict common ion charges from group number.",
    "Write formulas of ionic compounds by balancing total charge.",
    "Explain the properties of ionic compounds from their crystal lattice.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("Electron transfer", r`Metals lose electrons to reach a noble-gas configuration (Na → Na⁺); nonmetals gain them (Cl → Cl⁻). The oppositely charged ions attract strongly, forming a lattice. Common charges: Group 1 +1, Group 2 +2, Al +3, N −3, O −2, halogens −1.`),
    def("Formulas", r`The formula unit has zero net charge. Use the lowest whole-number ratio: crossing the charge magnitudes often works, then reduce.`),
    example(r`Aluminum oxide and calcium nitride`, [
      [r`\text{Al}^{3+},\ \text{O}^{2-} \Rightarrow \text{Al}_2\text{O}_3`, "2(+3) + 3(−2) = 0."],
      [r`\text{Ca}^{2+},\ \text{N}^{3-} \Rightarrow \text{Ca}_3\text{N}_2`, "3(+2) + 2(−3) = 0."],
    ]),
    def("Properties", r`Ionic solids are hard, brittle and have high melting points (NaCl melts at 801 °C). They conduct electricity when melted or dissolved, when ions are free to move, but not as solids.`),
    callout("application", "Where this shows up", r`Table salt, the calcium phosphate in bones, and electrolytes in sports drinks and batteries.`),
  ],
  questions: [
    mc(2, r`What is the formula of magnesium chloride?`, ["MgCl", "MgCl₂", "Mg₂Cl", "Mg₂Cl₃"], 1, [], r`Mg²⁺ needs two Cl⁻.`),
    num(2, r`How many ions are in one formula unit of Al₂O₃?`, 5, {}, [], r`2 Al³⁺ + 3 O²⁻.`),
    mc(2, r`Solid NaCl doesn't conduct electricity because…`, ["it has no ions", "its ions are locked in place", "it's a metal", "chlorine is a gas"], 1, [], r`Ions must be free to move.`),
    mc(3, r`Which pair forms an ionic compound?`, ["C and O", "K and Br", "N and H", "S and O"], 1, [], r`A metal and a nonmetal.`, "review"),
  ],
});
