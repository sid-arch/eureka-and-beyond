import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "net-ionic-equations",
  title: "Net ionic equations",
  summary: "Write molecular, complete ionic and net ionic equations, identify spectator ions, and use them in precipitation stoichiometry.",
  minutes: 35,
  objectives: [
    "Split strong electrolytes into ions; keep solids, liquids, gases and weak electrolytes together.",
    "Cancel spectator ions to write net ionic equations.",
    "Compute precipitate masses from net ionic equations.",
  ],
  concepts: [
    { slug: "chemical-reactions", name: "Chemical reactions", description: "How substances rearrange into new ones, described by balanced equations.", subject: "subj_chem" },
  ],
  blocks: [
    def("Three levels", r`Molecular: AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq). Complete ionic: split every soluble strong electrolyte into ions. Net ionic: remove the spectator ions that appear unchanged on both sides.`),
    example(r`Silver nitrate plus sodium chloride`, [
      [r`\text{Ag}^+ + \text{NO}_3^- + \text{Na}^+ + \text{Cl}^- \to`, "Complete ionic equation."],
      [r`\text{AgCl}(s) + \text{Na}^+ + \text{NO}_3^-`, ""],
      [r`\text{Ag}^+(aq) + \text{Cl}^-(aq) \to \text{AgCl}(s)`, "Net ionic: Na⁺ and NO₃⁻ are spectators."],
    ]),
    example(r`Mass of AgCl from 50.0 mL of 0.100 M AgNO₃ with excess NaCl`, [
      [r`n_{\text{Ag}^+} = 0.0500(0.100) = 0.00500\ \text{mol}`, ""],
      [r`m = 0.00500(143.32) \approx 0.717\ \text{g}`, ""],
    ]),
    callout("application", "Where this shows up", r`Removing lead from water by precipitation, gravimetric analysis, and kidney stones (calcium oxalate precipitating).`),
  ],
  questions: [
    mc(2, r`What is the net ionic equation for HCl(aq) + NaOH(aq)?`, ["HCl + NaOH → NaCl + H₂O", "H⁺ + OH⁻ → H₂O", "Na⁺ + Cl⁻ → NaCl", "H⁺ + Cl⁻ → HCl"], 1, ["Split the strong acid, strong base and soluble salt into ions, then cancel ions that appear on both sides."], r`Na⁺ and Cl⁻ are spectators.`),
    mc(2, r`In Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq), the spectators are…`, ["Pb²⁺ and I⁻", "K⁺ and NO₃⁻", "Pb²⁺ and K⁺", "none"], 1, ["Spectators are ions that are dissolved both before and after the reaction."], r`They stay dissolved.`),
    num(3, r`How many grams of PbI₂ (461.0 g/mol) form from 25.0 mL of 0.200 M Pb(NO₃)₂ with excess KI? Two decimal places.`, 2.31, { tolerance: 0.01, unit: "g" }, ["Moles Pb²⁺ = 0.0250 L × 0.200 M; each Pb²⁺ makes one PbI₂.", "Convert moles of PbI₂ to grams."], r`$0.00500$ mol $\times 461.0 = 2.305$.`),
    mc(3, r`Why is acetic acid written as a molecule (CH₃COOH) in a net ionic equation?`, ["it's insoluble", "it's a weak electrolyte, mostly un-ionized", "it's a gas", "it's a strong acid"], 1, ["Only strong electrolytes are written as separate ions. How much does acetic acid ionize?"], r`Only strong electrolytes are split.`, "review"),
  ],
});
