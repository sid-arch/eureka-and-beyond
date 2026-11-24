import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electrolysis-faraday",
  title: "Electrolysis and Faraday's law",
  summary: "Describe electrolytic cells, predict electrode products, and use current, time and Faraday's constant to calculate the mass deposited or the time required.",
  minutes: 40,
  objectives: [
    "Compare electrolytic with galvanic cells: an outside source drives a reaction with E° < 0.",
    "Use q = It and n(e⁻) = q/F to relate charge to moles of product.",
    "Calculate mass deposited, current needed or time required.",
  ],
  concepts: [
    { slug: "electrochemistry", name: "Electrochemistry", description: "Redox reactions and the cells that convert chemical and electrical energy.", subject: "subj_chem" },
    { slug: "stoichiometry", name: "Stoichiometry", description: "Quantitative relationships between reactants and products in a balanced equation.", subject: "subj_chem" },
  ],
  formulas: ["electrochemistry"],
  blocks: [
    def("Electrolytic cells", r`A power supply pushes electrons to drive a nonspontaneous reaction ($E^\circ < 0$, $\Delta G^\circ > 0$). The applied voltage must exceed $|E^\circ|$. Oxidation still happens at the anode and reduction at the cathode, but now the anode is positive (connected to the supply's + terminal).`),
    def("Faraday's law", r`Charge $q = It$ (coulombs = amperes × seconds). Moles of electrons $= q/F$. The half-reaction gives moles of product per mole of electrons: Cu²⁺ + 2e⁻ → Cu needs 2, Al³⁺ + 3e⁻ → Al needs 3.`),
    example(r`Plating copper at 2.00 A for 30.0 min`, [
      [r`q = 2.00 \times 1800 = 3600\ \text{C}`, ""],
      [r`n_{e^-} = \tfrac{3600}{96{,}485} = 0.0373\ \text{mol}`, ""],
      [r`n_{\text{Cu}} = 0.0187\ \text{mol}`, "Two electrons per Cu."],
      [r`m = 0.0187 \times 63.55 = 1.19\ \text{g}`, ""],
    ]),
    example(r`Time to make 1.00 kg Al at 100,000 A`, [
      [r`n_{\text{Al}} = \tfrac{1000}{26.98} = 37.1\ \text{mol}`, ""],
      [r`n_{e^-} = 3(37.1) = 111.2\ \text{mol}`, ""],
      [r`t = \tfrac{111.2 \times 96{,}485}{100{,}000}`, ""],
      [r`= 107\ \text{s}`, "Smelters run huge currents nonstop."],
    ]),
    callout("note", "Which product forms?", r`In molten salts the metal cation is reduced and the anion oxidized. In water, H₂O can be reduced to H₂ or oxidized to O₂ instead; compare reduction potentials. Electrolyzing aqueous NaCl gives H₂ at the cathode, not sodium.`),
    callout("application", "Where this shows up", r`Aluminum production (Hall–Héroult process), chlorine and NaOH from brine, electroplating chrome and gold, and charging every rechargeable battery.`),
  ],
  questions: [
    num(2, r`What mass of silver (107.87 g/mol) plates out at 0.500 A in 1.00 h? Two decimal places.`, 2.01, { tolerance: 0.01, unit: "g" }, ["q = It with t in seconds.", "Ag⁺ + e⁻ → Ag."], r`$1800/96{,}485 = 0.01866$ mol; × 107.87 = 2.01 g.`),
    num(3, r`How many minutes does it take to deposit 5.00 g of zinc (65.38 g/mol) at 3.00 A? One decimal place.`, 82.0, { tolerance: 0.2, unit: "min" }, ["Zn²⁺ + 2e⁻ → Zn.", "t = n(e⁻)F/I."], r`$0.0765 \times 2 \times 96{,}485 / 3.00 = 4920$ s = 82.0 min.`),
    mc(2, r`In an electrolytic cell, ΔG° is…`, ["negative", "positive", "zero", "always −nFE"], 1, ["An electrolytic cell needs a power supply to run. Is its reaction favorable by itself?"], r`An outside source drives a nonspontaneous reaction.`),
    mc(2, r`The same charge passes through Ag⁺ and Cu²⁺ cells in series. The ratio of moles Ag : Cu deposited is…`, ["1 : 1", "1 : 2", "2 : 1", "3 : 2"], 2, ["Compare electrons per atom."], r`Ag needs 1 e⁻, Cu needs 2.`),
    mc(3, r`Electrolysis of aqueous NaCl produces at the cathode…`, ["Na(s)", "H₂(g)", "Cl₂(g)", "O₂(g)"], 1, ["Water is easier to reduce than Na⁺."], r`H₂O is reduced to H₂ and OH⁻.`, "review"),
  ],
});
