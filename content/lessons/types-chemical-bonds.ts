import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "types-chemical-bonds",
  title: "Types of chemical bonds",
  summary: "Classify bonds as nonpolar covalent, polar covalent, ionic or metallic using electronegativity, and connect bond type to the particles involved.",
  minutes: 30,
  objectives: [
    "Use electronegativity differences to place bonds on a continuum.",
    "Describe ionic, covalent and metallic bonding at the particle level.",
    "Identify partial charges (δ+, δ−) in polar bonds.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("A continuum", r`Bond character depends on the electronegativity difference Δχ: about 0 gives nonpolar covalent (Cl₂), intermediate gives polar covalent (HCl, Δχ = 0.96, with δ− on Cl), and large gives mostly ionic (NaCl, Δχ = 2.23). Between metals, valence electrons are delocalized: metallic bonding.`),
    example(r`Rank O–H, C–H and Na–O by polarity (χ: O 3.44, H 2.20, C 2.55, Na 0.93)`, [
      [r`\Delta\chi:\ 1.24,\ 0.35,\ 2.51`, ""],
      [r`\text{C–H} < \text{O–H} < \text{Na–O}`, "Na–O is essentially ionic."],
    ]),
    callout("note", "Exceptions", r`Bond type is a model. Real bonds have mixed character, and AP questions usually ask you to justify a classification with electronegativity and the kinds of elements involved.`),
    callout("application", "Where this shows up", r`Bond polarity sets solubility, boiling points and how drugs bind to proteins.`),
  ],
  questions: [
    num(2, r`Find Δχ for a C–O bond (C 2.55, O 3.44), to two decimal places.`, 0.89, { tolerance: 0.001 }, ["Δχ is the difference between the two electronegativities: larger minus smaller."], r`Polar covalent.`),
    mc(2, r`Which bond is most polar?`, ["C–C", "C–N", "C–F", "C–H"], 2, ["Polarity grows with the electronegativity difference. Which partner of carbon is most electronegative?"], r`F is the most electronegative element.`),
    mc(2, r`In H–Cl, the partial negative charge is on…`, ["H", "Cl", "both", "neither"], 1, ["Shared electrons spend more time near the more electronegative atom."], r`Cl is more electronegative.`),
    mc(3, r`Which describes bonding in copper metal?`, ["shared pairs between two atoms", "transferred electrons", "cations in a sea of delocalized electrons", "hydrogen bonds"], 2, ["In a metal the valence electrons aren't tied to any one pair of atoms."], r`Metallic bonding.`, "review"),
  ],
});
