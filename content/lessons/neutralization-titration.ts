import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "neutralization-titration",
  title: "Neutralization and titration",
  summary: "Write neutralization reactions, find unknown concentrations by titration, and read titration curves and indicators.",
  minutes: 40,
  objectives: [
    "Write neutralization reactions: acid + base → salt + water.",
    "Find an unknown concentration from titration data with mole ratios.",
    "Read the equivalence point on a titration curve and choose an indicator.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["molarity-dilution", "ph-scale"],
  blocks: [
    def("Neutralization", r`$\text{HCl} + \text{NaOH} \to \text{NaCl} + \text{H}_2\text{O}$: the net reaction is $\text{H}^+ + \text{OH}^- \to \text{H}_2\text{O}$.`),
    def("Titration", r`A solution of known concentration (the titrant) is added from a buret until the equivalence point, when moles of H⁺ equal moles of OH⁻. An indicator changes color at or near that point. For 1 : 1 acid–base pairs, $M_aV_a = M_bV_b$.`),
    example(r`25.0 mL of HCl needs 18.6 mL of 0.100 M NaOH`, [
      [r`n_{\text{NaOH}} = 0.100(0.0186) = 1.86\times10^{-3}\ \text{mol}`, ""],
      [r`M_{\text{HCl}} = \tfrac{1.86\times10^{-3}}{0.0250} = 0.0744\ \text{M}`, ""],
    ]),
    activity("titration", { title: "Run a titration", params: { acid: "strong", acidConc: 0.1, baseConc: 0.1, baseVolume: 20 } }),
    callout("tip", "Try this", r`Switch to acetic acid: the equivalence pH rises above 7, because the acetate ion is a weak base. Phenolphthalein (changes near pH 8–10) suits this titration better than methyl orange.`, "experiment"),
    callout("application", "Where this shows up", r`Quality control of vinegar and juice acidity, water testing, and antacid tablets that neutralize stomach acid.`),
  ],
  questions: [
    num(2, r`How many mL of 0.200 M NaOH neutralize 30.0 mL of 0.150 M HCl?`, 22.5, { unit: "mL" }, [], r`$\frac{0.150(30.0)}{0.200}$.`),
    num(3, r`20.0 mL of H₂SO₄ is neutralized by 32.0 mL of 0.250 M NaOH. Find [H₂SO₄]. (Each H₂SO₄ gives 2 H⁺.)`, 0.2, { unit: "M" }, [], r`$n_{OH} = 0.008$, so $n_{acid} = 0.004$ and $\frac{0.004}{0.0200}$.`),
    mc(2, r`At the equivalence point of a strong acid–strong base titration, pH is about…`, ["1", "4", "7", "10"], 2, [], r`The salt is neutral.`),
    mc(3, r`Titrating a weak acid with a strong base, the equivalence pH is…`, ["below 7", "exactly 7", "above 7", "0"], 2, [], r`The conjugate base raises the pH.`, "review"),
  ],
});
