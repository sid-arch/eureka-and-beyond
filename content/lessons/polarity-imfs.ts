import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polarity-imfs",
  title: "Polarity and intermolecular forces",
  summary: "Predict bond and molecular polarity from electronegativity and shape, rank intermolecular forces, and explain boiling-point trends.",
  minutes: 35,
  objectives: [
    "Classify bonds as nonpolar, polar covalent or ionic from electronegativity differences.",
    "Decide whether a molecule is polar from its bond polarities and shape.",
    "Rank London dispersion, dipole–dipole and hydrogen bonding, and predict boiling points.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("Bond polarity", r`Electronegativity is an atom's pull on shared electrons. A difference under about 0.4 gives a nonpolar bond; 0.4–1.7 polar covalent; above about 1.7 mostly ionic. For O–H: 3.44 − 2.20 = 1.24, polar.`),
    def("Molecular polarity", r`A molecule is polar if its bond dipoles don't cancel. CO₂ has polar bonds but is linear, so they cancel: nonpolar. H₂O is bent, so they don't: polar.`),
    def("Intermolecular forces", r`London dispersion forces exist between all molecules and grow with molecular size. Polar molecules add dipole–dipole attractions. Hydrogen bonds (H bonded to N, O or F, attracted to another N, O or F) are the strongest. Stronger forces mean higher boiling points.`),
    example(r`Why does water (18 g/mol) boil at 100 °C but methane (16 g/mol) at −162 °C?`, [
      [r`\text{CH}_4:\ \text{dispersion only}`, "Nonpolar."],
      [r`\text{H}_2\text{O}:\ \text{hydrogen bonding}`, "Much stronger attractions to overcome."],
    ]),
    activity("vsepr", { title: "Shape decides whether dipoles cancel", params: { domains: 4, lonePairs: 2 } }),
    callout("application", "Where this shows up", r`Ice floats because hydrogen bonds hold it in an open lattice; soap works because one end is polar and the other nonpolar; DNA's two strands are held by hydrogen bonds.`),
  ],
  questions: [
    num(2, r`Find the electronegativity difference for a C–Cl bond (C 2.55, Cl 3.16), to two decimal places.`, 0.61, { tolerance: 0.001 }, [], r`Polar covalent.`),
    mc(2, r`Which molecule is nonpolar despite having polar bonds?`, ["H₂O", "NH₃", "CCl₄", "HCl"], 2, [], r`Tetrahedral symmetry cancels the dipoles.`),
    mc(2, r`Which has the highest boiling point?`, ["CH₄", "HF", "Ne", "F₂"], 1, [], r`Hydrogen bonding.`),
    mc(3, r`Going down the halogens (F₂ → I₂), boiling points rise because…`, ["hydrogen bonding increases", "London dispersion forces grow with size", "they become ionic", "polarity increases"], 1, [], r`Larger electron clouds are more polarizable.`, "review"),
  ],
});
