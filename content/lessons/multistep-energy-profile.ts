import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "multistep-energy-profile",
  title: "Multistep reaction energy profile",
  summary: "Interpret energy profiles with several peaks: count steps, locate intermediates in the valleys, and identify the rate-determining step from the largest barrier.",
  minutes: 25,
  objectives: [
    "Count elementary steps from the number of peaks.",
    "Locate intermediates (valleys) and transition states (peaks).",
    "Identify the rate-determining step as the one with the largest activation energy.",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  blocks: [
    def("Reading the curve", r`Each peak is a transition state, one per elementary step. Valleys between peaks are intermediates, which are short-lived but real. The step with the biggest climb from its own starting valley is the slowest: the rate-determining step.`),
    example(r`A profile has two peaks: 40 kJ above the reactants, then 70 kJ above the intermediate valley`, [
      [r`2\ \text{peaks} \Rightarrow 2\ \text{steps},\ 1\ \text{intermediate}`, ""],
      [r`E_{a,2} > E_{a,1}`, "Step 2 has the larger barrier, so it's rate-determining."],
    ]),
    callout("application", "Where this shows up", r`Enzyme diagrams have several humps, and catalysts change the shape by replacing one big hump with several small ones.`),
  ],
  questions: [
    mc(2, r`An energy profile with three peaks represents…`, ["three intermediates", "three elementary steps", "one step", "two catalysts"], 1, ["Each peak is one transition state, and each step has exactly one."], r`One transition state per step.`),
    mc(2, r`How many intermediates are in a three-step mechanism?`, ["1", "2", "3", "0"], 1, ["Intermediates sit in the valleys between peaks. How many valleys separate three peaks?"], r`The valleys between peaks.`),
    mc(2, r`The rate-determining step is the one with…`, ["the highest peak in absolute energy", "the largest activation energy from its own starting point", "the lowest valley", "the most products"], 1, ["Measure each step's climb from the valley it starts in, not from the reactants."], r`Measure each climb.`),
    mc(3, r`Overall ΔH in a multistep profile equals…`, ["the sum of the Eₐ values", "the energy of products minus reactants", "the highest peak", "zero"], 1, ["ΔH depends only on where you start and where you end."], r`Intermediate steps cancel.`, "review"),
  ],
});
