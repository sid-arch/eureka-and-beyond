import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ionic-solids-structure",
  title: "Structure of ionic solids",
  summary: "Describe ionic lattices, compare lattice energies with Coulomb's law, and explain the properties of ionic solids from their structure.",
  minutes: 30,
  objectives: [
    "Describe the three-dimensional lattice of alternating ions.",
    "Compare lattice strength using ion charge and size (Coulomb's law).",
    "Explain melting point, brittleness and conductivity from structure.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("The lattice", r`In NaCl each Na⁺ is surrounded by 6 Cl⁻ and vice versa, in a repeating cubic pattern. There are no separate molecules, which is why we write formula units.`),
    def("Lattice energy", r`The energy holding the lattice together grows with charge and shrinks with distance: $E \propto \frac{q_1q_2}{r}$. Doubling both charges (Na⁺Cl⁻ to Mg²⁺O²⁻) roughly quadruples the attraction.`),
    example(r`Rank MgO, NaCl and NaF by lattice energy`, [
      [r`\text{MgO} > \text{NaF} > \text{NaCl}`, "MgO has ±2 charges; F⁻ is smaller than Cl⁻. Melting points: 2852, 993 and 801 °C."],
    ]),
    def("Properties", r`Strong attractions give high melting points and hardness. A shift in the lattice lines up like charges, which repel, so ionic crystals are brittle. They conduct only when melted or dissolved.`),
    callout("application", "Where this shows up", r`MgO lines furnaces because it melts so high; the brittleness of ceramics comes from their ionic bonding.`),
  ],
  questions: [
    mc(2, r`Which has the largest lattice energy?`, ["KCl", "NaCl", "CaO", "KBr"], 2, ["Coulomb's law: attraction grows with the product of the charges and falls with distance.", "Look for the compound with the largest ion charges first."], r`+2 and −2 charges.`),
    mc(2, r`Why does LiF have a higher melting point than KF?`, ["Li⁺ is smaller, so ions are closer", "Li⁺ has higher charge", "F⁻ is larger", "KF is molecular"], 0, ["Both have the same charges. Compare the cation sizes and how close the ions can get."], r`Smaller r, larger attraction.`),
    mc(2, r`Ionic solids shatter when struck because…`, ["they have no bonds", "shifting layers line up like charges, which repel", "they're metals", "electrons flow"], 1, ["Picture one layer of ions sliding by half a spacing. What ends up next to what?"], r`Repulsion splits the crystal.`),
    mc(3, r`Solid NaCl doesn't conduct electricity, but molten NaCl does, because…`, ["electrons appear when melted", "ions become mobile", "it becomes metallic", "chlorine gas conducts"], 1, ["Conduction needs charged particles that can move. Are the ions free to move in the solid?"], r`Charge carriers must move.`, "review"),
  ],
});
