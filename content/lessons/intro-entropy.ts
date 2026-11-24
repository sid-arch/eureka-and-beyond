import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "intro-entropy",
  title: "Introduction to entropy",
  summary: "Describe entropy as the dispersal of matter and energy over microstates, and predict the sign of ΔS for physical and chemical changes.",
  minutes: 35,
  objectives: [
    "Connect entropy to the number of microstates with S = k ln W.",
    "Predict the sign of ΔS from phase changes, moles of gas, dissolving, temperature and molecular complexity.",
    "Explain why spontaneous processes spread matter and energy out.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["free-energy"],
  blocks: [
    def("Entropy and microstates", r`A microstate is one specific arrangement of particles and their energies that matches what we observe. Entropy measures how many there are: $S = k\ln W$, where $k = 1.38\times10^{-23}$ J/K. Arrangements that can happen in more ways are more probable, so isolated systems drift toward higher entropy.`),
    example(r`Four particles in a box split into two halves`, [
      [r`2^4 = 16\ \text{arrangements}`, "Each particle can be left or right."],
      [r`W(4\text{ left}) = 1`, "Probability 1/16."],
      [r`W(2\text{ left}) = \binom{4}{2} = 6`, "Probability 6/16: the most likely split."],
      [r`10^{23}\text{ particles} \Rightarrow \text{even split}`, "The odds of anything else become negligible."],
    ]),
    activity("microstates", { title: "Counting microstates", params: { particles: 10, left: 5 } }),
    callout("tip", "Try this", r`With 10 particles, compare all-on-the-left (W = 1) with the 5–5 split (W = 252). Then raise N to 30 and watch the distribution narrow around the middle.`, "experiment"),
    def("Predicting the sign of ΔS", r`Entropy increases when: solid → liquid → gas; a reaction makes more moles of gas; a solid or liquid dissolves (usually); temperature rises; molecules get larger or more flexible. Moles of gas usually dominate a reaction's ΔS.`),
    example(r`Sign of ΔS for 2 SO₂(g) + O₂(g) → 2 SO₃(g)`, [
      [r`3\ \text{mol gas} \to 2\ \text{mol gas}`, ""],
      [r`\Delta S < 0`, "Fewer gas particles, fewer microstates."],
    ]),
    callout("application", "Where this shows up", r`Ice melting on a warm day, perfume spreading through a room and a gas expanding into a vacuum all happen on their own: each simply has overwhelmingly more microstates on the other side.`),
  ],
  questions: [
    num(2, r`Six particles share two halves of a box. How many arrangements put exactly 3 on the left?`, 20, {}, ["Use C(6, 3)."], r`$\binom{6}{3} = 20$ of 64 arrangements.`),
    mc(1, r`Which change has ΔS > 0?`, ["H₂O(g) → H₂O(l)", "CO₂(s) → CO₂(g)", "N₂(g) + 3H₂(g) → 2NH₃(g)", "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)"], 1, ["Look for more freedom of motion."], r`Sublimation turns a solid into a gas.`),
    mc(2, r`For CaCO₃(s) → CaO(s) + CO₂(g), ΔS is…`, ["positive", "negative", "zero", "impossible to predict"], 0, ["Count moles of gas."], r`0 → 1 mol gas.`),
    mc(2, r`Which has the highest molar entropy at 298 K?`, ["CH₄(g)", "C₂H₆(g)", "C₃H₈(g)", "C(diamond)"], 2, ["Bigger, more complex molecules have more ways to move."], r`Propane has the most atoms and vibrational modes.`),
    mc(3, r`Why does a gas expand into a vacuum?`, ["it releases heat", "the expanded state has vastly more microstates", "pressure pulls it", "its energy increases"], 1, ["The energy doesn't change. Compare how many arrangements the spread-out state has."], r`No energy change; probability drives it.`, "review"),
  ],
});
