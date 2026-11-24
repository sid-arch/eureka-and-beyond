import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "strong-acid-base-ph",
  title: "pH and pOH of strong acids and bases",
  summary: "Calculate pH and pOH for strong acids and bases, including bases that release two hydroxides, very dilute solutions and water at other temperatures.",
  minutes: 35,
  objectives: [
    "Treat strong acids and bases as 100% ionized and find [H₃O⁺] or [OH⁻] directly.",
    "Use pH + pOH = pK_w and account for bases such as Ba(OH)₂ that give 2 OH⁻.",
    "Recognize when water's own ionization matters and how K_w changes with temperature.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["ph-scale"],
  blocks: [
    def("Strong means complete", r`The strong acids (HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄ for its first proton) and the group 1 and heavy group 2 hydroxides ionize completely. The ion concentration equals the formula concentration times the number of H⁺ or OH⁻ released: no ICE table needed.`),
    def("The pH toolkit", r`$\text{pH} = -\log[\text{H}_3\text{O}^+]$, $\text{pOH} = -\log[\text{OH}^-]$, and $[\text{H}_3\text{O}^+][\text{OH}^-] = K_w = 1.0\times10^{-14}$ at 25 °C, so $\text{pH} + \text{pOH} = 14.00$. Each pH unit is a factor of 10 in [H₃O⁺].`),
    example(r`pH of 0.020 M HNO₃`, [
      [r`[\text{H}_3\text{O}^+] = 0.020\ \text{M}`, "One H⁺ per HNO₃, fully ionized."],
      [r`\text{pH} = -\log 0.020 = 1.70`, "Two significant figures in 0.020 → two decimal places."],
    ]),
    example(r`pH of 0.0050 M Ba(OH)₂`, [
      [r`[\text{OH}^-] = 2(0.0050) = 0.010\ \text{M}`, "Each Ba(OH)₂ releases two OH⁻."],
      [r`\text{pOH} = 2.00`, ""],
      [r`\text{pH} = 14.00 - 2.00 = 12.00`, ""],
    ]),
    example(r`A very dilute acid: 1.0 × 10⁻⁸ M HCl`, [
      [r`\text{pH} \ne 8`, "An acid can't make water basic."],
      [r`x(x - 10^{-8}) = 10^{-14}`, "x = [H₃O⁺]; water's ions now matter."],
      [r`x = 1.05\times10^{-7}`, "Quadratic formula."],
      [r`\text{pH} = 6.98`, "Just barely acidic."],
    ]),
    callout("note", "Neutral isn't always 7", r`$K_w$ grows with temperature because water's ionization is endothermic. At 50 °C, $K_w \approx 5.5\times10^{-14}$, so neutral water has $[\text{H}_3\text{O}^+] = \sqrt{K_w}$ and pH 6.63. It is still neutral: [H₃O⁺] = [OH⁻].`),
    callout("application", "Where this shows up", r`Lab stock solutions, pool chemistry and industrial cleaning all rely on quick strong-acid and strong-base pH estimates; a 10-fold dilution of a strong acid raises its pH by 1, until it is so dilute that water's own ions matter.`),
  ],
  questions: [
    num(1, r`Find the pH of 0.0035 M HCl, to two decimal places.`, 2.46, { tolerance: 0.01 }, ["HCl is strong: [H₃O⁺] = 0.0035 M."], r`$-\log 0.0035 = 2.46$.`),
    num(2, r`Find the pH of 0.015 M KOH, to two decimal places.`, 12.18, { tolerance: 0.01 }, ["Find pOH first."], r`pOH $= -\log 0.015 = 1.82$; pH $= 14.00 - 1.82 = 12.18$.`),
    num(3, r`You mix 25.0 mL of 0.100 M HCl with 15.0 mL of 0.100 M NaOH. Find the pH, to two decimal places.`, 1.60, { tolerance: 0.01 }, ["Count moles and neutralize first.", "Divide the excess by the total volume."], r`H⁺ 0.00250 mol, OH⁻ 0.00150 mol; excess H⁺ 0.00100 mol in 0.0400 L = 0.0250 M; pH 1.60.`),
    mc(2, r`A 0.010 M solution of which base has pH 12.30?`, ["NaOH", "KOH", "Ca(OH)₂", "NH₃"], 2, ["pOH = 1.70 means [OH⁻] = 0.020 M."], r`Two OH⁻ per formula unit: [OH⁻] = 0.020 M.`),
    mc(3, r`At 50 °C pure water has pH 6.63. It is…`, ["acidic", "neutral", "basic", "impossible to classify"], 1, ["Compare [H₃O⁺] and [OH⁻]."], r`Neutral means equal concentrations, which still holds; only K_w changed.`, "review"),
  ],
});
