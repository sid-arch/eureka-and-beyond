import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "acid-strength-structure",
  title: "Molecular structure of acids and bases",
  summary: "Explain acid strength from structure: bond strength and size for binary acids, electronegativity and oxygen count for oxyacids, and inductive effects in organic acids.",
  minutes: 30,
  objectives: [
    "Rank binary acids using bond strength down a group and electronegativity across a period.",
    "Rank oxyacids by central-atom electronegativity and number of oxygens.",
    "Explain strength through the stability of the conjugate base.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers"],
  blocks: [
    def("The guiding idea", r`An acid is stronger when its conjugate base is more stable, that is, when the negative charge left behind is spread out or pulled toward electronegative atoms. A stronger acid has a larger $K_a$ and a smaller p$K_a$.`),
    def("Binary acids, H–X", r`Down a group, bond length grows and bond strength falls, so acidity rises: HF < HCl < HBr < HI. Across a period, electronegativity dominates: CH₄ < NH₃ < H₂O < HF. HF is weak (pKa 3.2) despite fluorine's electronegativity because the H–F bond is very strong and F⁻ is small.`),
    def("Oxyacids, H–O–Y", r`More electronegative Y pulls electron density from the O–H bond: HOI < HOBr < HOCl. More oxygens on Y spread the negative charge of the conjugate base by resonance: HClO < HClO₂ < HClO₃ < HClO₄ (pKa 7.5, 2.0, about −1, about −8).`),
    example(r`Why chloroacetic acid is stronger than acetic acid`, [
      [r`\text{CH}_3\text{COOH: p}K_a = 4.74`, ""],
      [r`\text{ClCH}_2\text{COOH: p}K_a = 2.85`, ""],
      [r`\Delta\text{p}K_a \approx 1.9`, "About 80 times larger K_a."],
      [r`\text{Cl pulls charge from COO}^-`, "Inductive effect stabilizes the base."],
    ]),
    callout("note", "Bases mirror acids", r`A strong acid has a negligibly weak conjugate base. Amines are bases because the N lone pair can accept H⁺; electron-withdrawing groups near nitrogen make that lone pair less available and the base weaker.`),
    callout("application", "Where this shows up", r`Drug designers tune pKa with substituents so a molecule is charged or neutral at the pH of blood or the stomach, controlling absorption.`),
  ],
  questions: [
    num(2, r`Chloroacetic acid has Ka = 1.4 × 10⁻³. Find its pKa, to two decimal places.`, 2.85, { tolerance: 0.01 }, ["pKa = −log Ka."], r`$-\log(1.4\times10^{-3}) = 2.85$.`),
    mc(2, r`Which is the strongest acid?`, ["HF", "HCl", "HBr", "HI"], 3, ["Down a group, bond strength decides."], r`The H–I bond is longest and weakest.`),
    mc(2, r`Which is the strongest acid?`, ["HOCl", "HClO₂", "HClO₃", "HClO₄"], 3, ["Count the oxygens."], r`Four oxygens spread the conjugate base's charge most.`),
    mc(3, r`HOCl is stronger than HOBr because…`, ["Cl is larger", "Cl is more electronegative and pulls density from O–H", "HOBr has more oxygens", "Br⁻ is more stable"], 1, ["Same structure; compare the central atom."], r`Greater pull weakens the O–H bond and stabilizes OCl⁻.`),
    mc(3, r`Trichloroacetic acid (pKa 0.7) vs acetic acid (4.74): the trend shows that…`, ["more Cl weakens the acid", "electron-withdrawing groups strengthen acids", "Cl donates electrons", "size controls acidity"], 1, ["Each Cl pulls charge."], r`Three Cl atoms stabilize the carboxylate strongly.`, "review"),
  ],
});
