import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "galvanic-cells",
  title: "Galvanic cells",
  summary: "Describe how galvanic cells turn redox reactions into electric current, write cell notation, and compute standard cell potentials and ΔG°.",
  minutes: 40,
  objectives: [
    "Identify the anode, cathode, electron flow and the salt bridge's role.",
    "Write cell notation, anode | anode ion || cathode ion | cathode.",
    "Compute E°cell = E°cathode − E°anode and ΔG° = −nFE°.",
  ],
  concepts: [
    { slug: "electrochemistry", name: "Electrochemistry", description: "Redox reactions and the cells that convert chemical and electrical energy.", subject: "subj_chem" },
  ],
  formulas: ["electrochemistry"],
  blocks: [
    def("Parts of a cell", r`Oxidation happens at the anode, reduction at the cathode ("an ox, red cat"). Electrons flow through the wire from anode to cathode; the salt bridge lets ions move to keep both solutions neutral. In a galvanic cell the anode is negative.`),
    def("Standard potentials", r`Each half-reaction has a standard reduction potential E°. The more positive one is reduced (cathode). $E^\circ_{cell} = E^\circ_{cathode} - E^\circ_{anode}$; don't multiply E° by coefficients. A positive E°cell means a spontaneous reaction: $\Delta G^\circ = -nFE^\circ < 0$.`),
    example(r`Zn | Zn²⁺ || Cu²⁺ | Cu (E°: Cu²⁺ +0.34 V, Zn²⁺ −0.76 V)`, [
      [r`E^\circ = 0.34 - (-0.76) = 1.10\ \text{V}`, ""],
      [r`\Delta G^\circ = -2(96{,}485)(1.10) \approx -212\ \text{kJ}`, "n = 2."],
    ]),
    activity("galvanic-cell", { title: "Build a cell", params: { left: "Zn", right: "Cu", leftConc: 1, rightConc: 1 } }),
    callout("tip", "Try this", r`Swap in silver for copper and predict E° before reading it. Then drop [Zn²⁺] to 0.01 M: the voltage rises a little (the Nernst equation).`, "experiment"),
    callout("application", "Where this shows up", r`Every battery, from AA cells to lithium-ion, and corrosion protection with sacrificial zinc on ship hulls.`),
  ],
  questions: [
    num(2, r`Find E° for a Cu | Cu²⁺ || Ag⁺ | Ag cell (Ag⁺ +0.80 V).`, 0.46, { unit: "V" }, [], r`$0.80 - 0.34$.`),
    num(3, r`Find ΔG° for that cell (n = 2), in kJ, to the nearest kJ.`, -89, { tolerance: 1, unit: "kJ" }, [], r`$-2(96{,}485)(0.46)$.`),
    mc(2, r`In a galvanic cell, electrons flow…`, ["cathode to anode", "anode to cathode through the wire", "through the salt bridge", "both ways"], 1, [], r`From where oxidation releases them.`),
    mc(3, r`The salt bridge is needed because…`, ["it carries electrons", "it keeps the solutions electrically neutral", "it raises the voltage", "it stores charge"], 1, [], r`Ions move to balance charge buildup.`, "review"),
  ],
});
