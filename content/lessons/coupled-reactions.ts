import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "coupled-reactions",
  title: "Coupled reactions",
  summary: "Drive unfavorable reactions by coupling them to favorable ones with a shared intermediate, by electrical work or by light, and add free energies of coupled steps.",
  minutes: 30,
  objectives: [
    "Explain that free energies of coupled reactions add like enthalpies in Hess's law.",
    "Calculate the overall ΔG° of a coupled process.",
    "Identify external energy sources (electricity, light) that drive unfavorable processes.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["free-energy"],
  blocks: [
    def("Coupling", r`A reaction with $\Delta G^\circ > 0$ can be made to proceed if it shares an intermediate with a reaction whose $\Delta G^\circ$ is more negative. The overall $\Delta G^\circ$ is the sum, and the combined process is favorable if the sum is negative. Other routes: electrical work (electrolysis) or absorbed light (photosynthesis).`),
    example(r`Smelting copper from Cu₂S`, [
      [r`\text{Cu}_2\text{S} \to 2\text{Cu} + \text{S}`, "ΔG° = +86.2 kJ"],
      [r`\text{S} + \text{O}_2 \to \text{SO}_2`, "ΔG° = −300.1 kJ"],
      [r`\Delta G^\circ_{\text{total}} = -213.9\ \text{kJ}`, "Sulfur is the shared intermediate."],
    ]),
    example(r`ATP drives glutamine synthesis in cells`, [
      [r`\text{Glu} + \text{NH}_3 \to \text{Gln}`, "ΔG° = +14.2 kJ"],
      [r`\text{ATP} \to \text{ADP} + \text{P}_i`, "ΔG° = −30.5 kJ"],
      [r`\Delta G^\circ = -16.3\ \text{kJ}`, "A phosphorylated intermediate links them."],
    ]),
    callout("note", "Coupling needs a mechanism", r`You can't just add two reactions on paper. They are coupled only if they actually share an intermediate or happen in the same molecular machinery, as with an enzyme.`),
    callout("application", "Where this shows up", r`Metal refining, recharging batteries, photosynthesis and almost all of metabolism: your body uses ATP hydrolysis to build proteins, contract muscles and pump ions.`),
  ],
  questions: [
    num(2, r`Find the overall ΔG° for the Cu₂S smelting process.`, -213.9, { tolerance: 0.1, unit: "kJ" }, ["Add the two steps."], r`$86.2 + (-300.1) = -213.9$ kJ.`),
    num(3, r`A step has ΔG° = +45.0 kJ. What is the minimum number of ATP hydrolyses (−30.5 kJ each) needed to drive it?`, 2, {}, ["The sum must be negative."], r`One gives +14.5 kJ; two give −16.0 kJ.`),
    mc(2, r`Coupled reactions are favorable overall when…`, ["each step is favorable", "the sum of ΔG° values is negative", "ΔH is positive", "K for each step exceeds 1"], 1, ["Free energies of coupled steps add, like enthalpies in Hess's law."], r`Free energies add.`),
    mc(2, r`Which supplies the energy for photosynthesis's unfavorable sugar synthesis?`, ["heat", "light", "ATP from outside the plant", "entropy"], 1, ["What does a plant absorb from outside to power photosynthesis?"], r`Absorbed photons do the work.`),
    mc(3, r`What makes two reactions genuinely coupled?`, ["They happen in the same flask", "They share an intermediate", "They have the same ΔH", "Both have K > 1"], 1, ["Being in the same place isn't enough. What must link the two reactions chemically?"], r`A shared intermediate or mechanism.`, "review"),
  ],
});
