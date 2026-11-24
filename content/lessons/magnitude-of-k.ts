import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "magnitude-of-k",
  title: "Magnitude of the equilibrium constant",
  summary: "Interpret very large and very small K values, decide when a reaction essentially goes to completion, and separate equilibrium position from reaction rate.",
  minutes: 25,
  objectives: [
    "Interpret K ≫ 1 (products favored) and K ≪ 1 (reactants favored).",
    "Recognize when a reaction effectively goes to completion.",
    "Explain why a large K says nothing about how fast equilibrium is reached.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Reading K", r`K ≫ 1 (say above 10³): mostly products at equilibrium. K ≪ 1 (below 10⁻³): mostly reactants. In between, significant amounts of both.`),
    example(r`Two reactions at 25 °C`, [
      [r`\text{N}_2 + \text{O}_2 \rightleftharpoons 2\text{NO},\ K \approx 10^{-30}`, "Air doesn't turn into NO on its own."],
      [r`\text{H}^+ + \text{OH}^- \rightleftharpoons \text{H}_2\text{O},\ K = 10^{14}`, "Neutralization goes essentially to completion."],
    ]),
    callout("warning", "K isn't speed", r`Burning sugar has an enormous K, yet sugar sits in air for years: the activation energy is high. Thermodynamics says where a reaction ends; kinetics says how fast it gets there.`),
    callout("application", "Where this shows up", r`Car engines produce NO only because the high temperature raises K for N₂ + O₂; catalytic converters then help it decompose.`),
  ],
  questions: [
    mc(2, r`A reaction has K = 2 × 10⁻⁸. At equilibrium the mixture is…`, ["mostly products", "mostly reactants", "equal amounts", "empty"], 1, ["K is products over reactants. What does a tiny ratio tell you?"], r`K ≪ 1.`),
    mc(2, r`K = 4 × 10¹⁵ means the reaction…`, ["is fast", "essentially goes to completion", "barely happens", "is at equilibrium immediately"], 1, ["A huge K tells you about the equilibrium mixture, not the speed."], r`Says nothing about rate.`),
    mc(2, r`If K for A ⇌ B is 10⁵, then K for B ⇌ A is…`, ["10⁵", "10⁻⁵", "−10⁵", "1"], 1, ["Reversing the reaction flips the K expression upside down."], r`Reciprocal.`),
    mc(3, r`Gasoline and oxygen coexist in a tank despite a huge K for combustion because…`, ["K is small", "the activation energy is high", "it's at equilibrium", "oxygen is inert"], 1, ["K says products are favored. What else does a reaction need before it actually happens?"], r`Kinetic stability.`, "review"),
  ],
});
