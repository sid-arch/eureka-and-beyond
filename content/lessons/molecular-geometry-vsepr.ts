import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "molecular-geometry-vsepr",
  title: "Molecular geometry (VSEPR)",
  summary: "Predict molecular shapes and bond angles from Lewis structures using VSEPR theory, including the effect of lone pairs.",
  minutes: 35,
  objectives: [
    "Count electron domains (bonds and lone pairs) on a central atom.",
    "Predict electron geometry and molecular geometry.",
    "Explain why lone pairs compress bond angles.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("VSEPR", r`Valence-shell electron-pair repulsion: electron domains around a central atom spread out as far as possible. A single, double or triple bond counts as one domain, and so does each lone pair. The electron geometry uses all domains; the molecular geometry names only the atoms' positions.`),
    example(r`CH₄, NH₃ and H₂O all have 4 electron domains`, [
      [r`\text{CH}_4:\ 4\ \text{bonds, 0 lone pairs}`, "Tetrahedral, 109.5°."],
      [r`\text{NH}_3:\ 3\ \text{bonds, 1 lone pair}`, "Trigonal pyramidal, about 107°."],
      [r`\text{H}_2\text{O}:\ 2\ \text{bonds, 2 lone pairs}`, "Bent, about 104.5°."],
    ]),
    activity("vsepr", { title: "Build the shapes", params: { domains: 4, lonePairs: 0 } }),
    callout("tip", "Try this", r`With 4 domains, add lone pairs one at a time and watch the molecular shape change from tetrahedral to pyramidal to bent. Then try 6 domains with 2 lone pairs: the lone pairs sit opposite each other, leaving a square plane.`, "experiment"),
    callout("application", "Where this shows up", r`Shape decides how molecules fit together: enzymes recognize substrates by shape, and water's bent shape makes it polar, which makes life's chemistry possible.`),
  ],
  questions: [
    mc(1, r`What is the shape of CO₂?`, ["bent", "linear", "trigonal planar", "tetrahedral"], 1, [], r`Two domains (two double bonds), no lone pairs.`),
    mc(2, r`What is the molecular geometry of PCl₃?`, ["trigonal planar", "trigonal pyramidal", "T-shaped", "tetrahedral"], 1, [], r`3 bonds and 1 lone pair on P.`),
    mc(2, r`BF₃ has a bond angle of…`, ["90°", "109.5°", "120°", "180°"], 2, [], r`Trigonal planar: boron has no lone pairs.`),
    mc(3, r`Why is water's bond angle smaller than methane's?`, ["oxygen is larger", "lone pairs repel more strongly than bonding pairs", "hydrogen is small", "it's a double bond"], 1, [], r`Lone pairs spread out and squeeze the bonds.`, "review"),
  ],
});
