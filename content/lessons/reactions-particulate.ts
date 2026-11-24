import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reactions-particulate",
  title: "Introduction for reactions",
  summary: "Describe chemical reactions as rearrangements of atoms, interpret particle diagrams of reactions (including leftover reactant), and use evidence to identify a reaction.",
  minutes: 30,
  objectives: [
    "Describe reactions as breaking and forming bonds with atoms conserved.",
    "Interpret and draw particle diagrams before and after a reaction.",
    "Identify the limiting and excess reactants from a diagram.",
  ],
  concepts: [
    { slug: "chemical-reactions", name: "Chemical reactions", description: "How substances rearrange into new ones, described by balanced equations.", subject: "subj_chem" },
  ],
  blocks: [
    def("Rearranging atoms", r`A chemical reaction breaks bonds in the reactants and forms new ones in the products; the atoms themselves are conserved. Evidence (gas, precipitate, color or temperature change) suggests a reaction, but only new substances confirm it.`),
    example(r`A diagram shows 6 H₂ and 4 O₂ molecules reacting: 2H₂ + O₂ → 2H₂O`, [
      [r`6\ \text{H}_2\ \text{need}\ 3\ \text{O}_2 \Rightarrow 6\ \text{H}_2\text{O}`, "H₂ is limiting."],
      [r`4 - 3 = 1\ \text{O}_2\ \text{left over}`, "The after-picture must show 6 H₂O and 1 O₂."],
    ]),
    activity("stoichiometry", { title: "Limiting reactant, particle by particle" }),
    callout("application", "Where this shows up", r`AP free-response questions often ask you to draw or check particle diagrams, and engineers balance fuel–air mixtures the same way.`),
  ],
  questions: [
    num(2, r`N₂ + 3H₂ → 2NH₃. A diagram has 4 N₂ and 9 H₂. How many NH₃ can form?`, 6, {}, ["Find the limiting reactant: 3 H₂ are needed for every N₂.", "How many NH₃ can 9 H₂ make?"], r`9 H₂ make 6 NH₃ (using 3 N₂); H₂ is limiting.`),
    num(2, r`In that reaction, how many N₂ molecules are left over?`, 1, {}, ["How many N₂ molecules did the reaction actually use? Subtract from 4."], r`$4 - 3$.`),
    mc(2, r`Which observation alone proves a chemical reaction occurred?`, ["bubbles", "a temperature change", "a new substance with different properties", "a color change"], 2, ["Bubbles, heat and color can come from physical changes too. What can only a reaction produce?"], r`The others can happen physically.`),
    mc(3, r`In every chemical reaction, which is conserved?`, ["molecules", "atoms", "moles of substance", "volume"], 1, ["Molecules break apart and recombine. What doesn't change identity?"], r`Atoms rearrange; molecules change.`, "review"),
  ],
});
