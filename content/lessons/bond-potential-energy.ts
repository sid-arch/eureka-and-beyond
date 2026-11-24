import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "bond-potential-energy",
  title: "Intramolecular force and potential energy",
  summary: "Read potential-energy curves for bond formation to find bond length and bond energy, and connect them to bond order and atomic size.",
  minutes: 30,
  objectives: [
    "Describe how potential energy changes as two atoms approach.",
    "Read bond length and bond energy from a potential-energy curve.",
    "Relate bond order and atomic radius to bond length and strength, and use Coulomb's law for ionic bonds.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("The curve", r`Far apart, two atoms don't interact (energy zero). As they approach, attraction lowers the energy; too close, nuclear repulsion raises it sharply. The minimum sits at the bond length, and its depth is the bond energy, the energy needed to break the bond.`),
    example(r`For H₂, the minimum is at 74 pm and −436 kJ/mol`, [
      [r`r_{min} = 74\ \text{pm}`, "The bond length."],
      [r`D = 436\ \text{kJ/mol}`, "The bond energy: the depth of the well."],
    ]),
    def("Trends", r`Higher bond order means shorter and stronger: C–C 154 pm and 347 kJ/mol; C=C 134 pm and 614 kJ/mol; C≡C 120 pm and 839 kJ/mol. Larger atoms make longer, weaker bonds (H–F stronger than H–I). For ions, Coulomb's law $E \propto \frac{q_1q_2}{r}$ means higher charges and smaller ions bond more strongly.`),
    callout("application", "Where this shows up", r`Infrared spectroscopy probes the curvature of these wells; the strong N≡N bond is why making fertilizer from air takes so much energy.`),
  ],
  questions: [
    mc(2, r`On a potential-energy curve, the bond length is where…`, ["energy is zero", "energy is minimum", "repulsion begins", "the curve ends"], 1, ["Atoms settle where the system is most stable. Where on the curve is that?"], r`The most stable separation.`),
    mc(2, r`Which bond is longest?`, ["H–F", "H–Cl", "H–Br", "H–I"], 3, ["Bond length tracks atomic size. Which halogen is the largest atom?"], r`Iodine is largest.`),
    num(2, r`How much energy (kJ) breaks 2.00 mol of H₂ bonds (436 kJ/mol)?`, 872, { unit: "kJ" }, ["Bond energy is given per mole of bonds; scale it to the number of moles."], r`$2 \times 436$.`),
    mc(3, r`Compared with C–O, a C=O bond is…`, ["longer and weaker", "shorter and stronger", "the same length", "longer and stronger"], 1, ["A double bond shares more electrons between the same two nuclei. How does that affect length and strength?"], r`Higher bond order.`, "review"),
  ],
});
