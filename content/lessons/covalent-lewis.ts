import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "covalent-lewis",
  title: "Covalent bonding and Lewis structures",
  summary: "Explain covalent bonds as shared electron pairs, draw Lewis structures by counting valence electrons, and recognize multiple bonds.",
  minutes: 35,
  objectives: [
    "Explain covalent bonding between nonmetals.",
    "Draw Lewis structures: count valence electrons, connect atoms, complete octets.",
    "Recognize when double or triple bonds are needed.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("Shared pairs", r`Nonmetals bond by sharing electron pairs so each atom reaches a stable octet (2 for hydrogen). A single bond shares one pair, a double bond two, a triple bond three. More shared pairs means a shorter, stronger bond.`),
    def("Drawing Lewis structures", r`1. Add up all valence electrons. 2. Put the least electronegative atom in the center (never H) and connect atoms with single bonds. 3. Complete the outer atoms' octets with lone pairs. 4. Put leftover electrons on the central atom. 5. If the central atom lacks an octet, turn lone pairs into multiple bonds.`),
    example(r`Carbon dioxide, CO₂`, [
      [r`4 + 2(6) = 16\ \text{valence electrons}`, ""],
      [r`\text{O–C–O}`, "Completing the oxygens' octets uses all 16 electrons, leaving carbon with only 4: no octet."],
      [r`\text{O=C=O}`, "Move one lone pair from each O into a double bond."],
    ]),
    callout("application", "Where this shows up", r`Lewis structures predict which molecules are reactive: O₂'s double bond, N₂'s very strong triple bond (why nitrogen gas is so unreactive) and the radicals in smog.`),
    activity("lewis-structures", { title: "Lewis structures", params: { molecule: "co2" } }),
    callout("tip", "Try this", r`Compare the two CO₂ structures. Both use 16 electrons, but only one gives every atom a formal charge of zero.`, "experiment"),
  ],
  questions: [
    num(1, r`How many valence electrons are in NH₃?`, 8, {}, [], r`$5 + 3(1)$.`),
    num(2, r`How many lone pairs are on the oxygen in H₂O?`, 2, {}, [], r`8 electrons: 2 bonds and 2 lone pairs.`),
    mc(2, r`N₂ contains a…`, ["single bond", "double bond", "triple bond", "ionic bond"], 2, [], r`10 valence electrons: N≡N with one lone pair on each N.`),
    mc(3, r`Which bond is strongest?`, ["C–C", "C=C", "C≡C", "all equal"], 2, [], r`More shared pairs.`, "review"),
  ],
});
