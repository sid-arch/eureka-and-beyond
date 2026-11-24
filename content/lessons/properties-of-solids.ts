import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "properties-of-solids",
  title: "Properties of solids",
  summary: "Classify solids as ionic, molecular, covalent network or metallic, and predict melting point, hardness and conductivity from the particles and forces involved.",
  minutes: 30,
  objectives: [
    "Classify solids by their particles and the forces between them.",
    "Predict relative melting points and hardness.",
    "Predict electrical conductivity in each type, solid and melted.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("Four types", r`Ionic (NaCl): ions held by ionic bonds; high melting point, brittle, conducts when molten. Molecular (ice, sugar): molecules held by intermolecular forces; low melting point, soft, nonconducting. Covalent network (diamond, SiO₂): atoms joined by covalent bonds throughout; very high melting point, very hard. Metallic (Cu): cations in an electron sea; conducts, malleable.`),
    example(r`Why does SiO₂ melt at 1713 °C while CO₂ sublimes at −78 °C?`, [
      [r`\text{SiO}_2:\ \text{covalent network}`, "Melting breaks covalent bonds."],
      [r`\text{CO}_2:\ \text{molecular}`, "Only weak dispersion forces separate the molecules."],
    ]),
    callout("note", "Crystalline vs amorphous", r`Crystalline solids have long-range order and sharp melting points; amorphous solids (glass, many plastics) soften over a temperature range.`),
    callout("application", "Where this shows up", r`Diamond cutting tools (network), silicon chips (network semiconductor), and why sugar melts in a pan while salt doesn't.`),
  ],
  questions: [
    mc(2, r`A solid melts at 1400 °C and doesn't conduct, solid or melted. It's most likely…`, ["ionic", "molecular", "covalent network", "metallic"], 2, ["A very high melting point means strong bonds throughout. Then use conductivity to tell the remaining types apart.", "Ionic compounds conduct when molten; metals conduct as solids."], r`Molten ionic solids conduct.`),
    mc(2, r`Which has the lowest melting point?`, ["NaCl", "diamond", "I₂", "Fe"], 2, ["Melting a molecular solid only overcomes intermolecular forces."], r`Molecular solid.`),
    mc(2, r`Graphite conducts electricity because…`, ["it's ionic", "delocalized electrons move along its layers", "it's metallic", "of hydrogen bonds"], 1, ["Each carbon in graphite bonds to three others. Where does its fourth valence electron go?"], r`Each C uses three bonds; the fourth electron is delocalized.`),
    mc(3, r`What holds a molecular solid together?`, ["covalent bonds between molecules", "intermolecular forces", "ionic bonds", "an electron sea"], 1, ["The covalent bonds are inside each molecule. What acts between molecules?"], r`Covalent bonds are inside each molecule.`, "review"),
  ],
});
