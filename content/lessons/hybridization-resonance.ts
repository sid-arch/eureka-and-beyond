import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "hybridization-resonance",
  title: "Hybridization and resonance",
  summary: "Assign sp, sp² and sp³ hybridization from electron domains, distinguish σ and π bonds, and describe molecules with resonance structures and fractional bond orders.",
  minutes: 40,
  objectives: [
    "Assign hybridization from the number of electron domains.",
    "Count σ and π bonds in single, double and triple bonds.",
    "Draw resonance structures and compute average bond orders.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("Hybrid orbitals", r`Atomic orbitals mix into equivalent hybrids pointing toward the electron domains: 2 domains give sp (180°), 3 give sp² (120°), 4 give sp³ (109.5°). Every single bond is one σ bond; a double bond is σ + π; a triple bond is σ + 2π. π bonds use unhybridized p orbitals.`),
    example(r`Ethylene, H₂C=CH₂`, [
      [r`\text{each C: 3 domains} \Rightarrow sp^2`, "Planar, 120°."],
      [r`5\ \sigma + 1\ \pi`, "4 C–H σ bonds, plus the C=C σ and π."],
    ]),
    def("Resonance", r`When one Lewis structure can't place the electrons, the real molecule is an average (hybrid) of several. In NO₃⁻, the double bond can be drawn to any of three oxygens, so each N–O bond has order $\frac{4}{3}$, between single and double, and all three are identical.`),
    example(r`Bond order in ozone, O₃`, [
      [r`\text{two structures: O=O–O and O–O=O}`, ""],
      [r`\text{bond order} = \tfrac{1 + 2}{2} = 1.5`, "Both O–O bonds are equal in length."],
    ]),
    activity("vsepr", { title: "Domains set the hybridization", params: { domains: 3, lonePairs: 0 } }),
    callout("application", "Where this shows up", r`Benzene's resonance (bond order 1.5) makes it unusually stable; the rigid π bonds in retinal flip with light, which is how your eyes detect it.`),
    activity("lewis-structures", { title: "Resonance structures", params: { molecule: "o3" } }),
    callout("tip", "Try this", r`Switch between ozone's two structures: the formal charges just trade places. Then look at nitrate, whose double bond can sit on any of three oxygens.`, "experiment"),
  ],
  questions: [
    num(2, r`How many π bonds are in CO₂?`, 2, {}, [], r`Two C=O double bonds.`),
    mc(2, r`What is the hybridization of N in NH₃?`, ["sp", "sp²", "sp³", "sp³d"], 2, [], r`4 domains (3 bonds + 1 lone pair).`),
    num(3, r`Find the C–O bond order in carbonate, CO₃²⁻ (3 resonance structures). Give two decimal places.`, 1.33, { tolerance: 0.01 }, [], r`4 bonding pairs over 3 bonds.`),
    mc(3, r`In resonance, the molecule…`, ["flips between structures", "is a single average of the structures", "exists as a mixture of molecules", "has unequal bonds"], 1, [], r`The structures are representations, not different molecules.`, "review"),
  ],
});
