import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reaction-mechanisms",
  title: "Introduction to reaction mechanisms",
  summary: "Check proposed mechanisms: steps must add to the overall reaction and the rate-determining step must match the observed rate law; handle intermediates and fast pre-equilibria.",
  minutes: 40,
  objectives: [
    "Identify intermediates and confirm the steps add to the overall equation.",
    "Derive the rate law from a slow first step.",
    "Handle a fast pre-equilibrium by replacing the intermediate's concentration.",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  formulas: ["rate-laws"],
  blocks: [
    def("Mechanisms", r`A mechanism is a sequence of elementary steps. Intermediates form in one step and are used up in a later one; they don't appear in the overall equation. The slowest step (rate-determining) sets the rate law.`),
    example(r`NO₂ + CO → NO + CO₂, observed rate = k[NO₂]²`, [
      [r`\text{slow: } 2\text{NO}_2 \to \text{NO}_3 + \text{NO}`, "Its rate law is k[NO₂]²."],
      [r`\text{fast: } \text{NO}_3 + \text{CO} \to \text{NO}_2 + \text{CO}_2`, "NO₃ is an intermediate."],
      [r`\text{sum: } \text{NO}_2 + \text{CO} \to \text{NO} + \text{CO}_2`, "Consistent with the data."],
    ]),
    def("Fast pre-equilibrium", r`If a fast reversible step comes first, express the intermediate through its equilibrium constant. For 2NO ⇌ N₂O₂ (fast), then N₂O₂ + O₂ → 2NO₂ (slow): $[\text{N}_2\text{O}_2] = K[\text{NO}]^2$, so rate $= k_2K[\text{NO}]^2[\text{O}_2]$.`),
    callout("application", "Where this shows up", r`Drug designers target the rate-determining step of enzyme mechanisms; chlorine radicals destroy ozone through a two-step catalytic mechanism.`),
  ],
  questions: [
    mc(2, r`An intermediate…`, ["appears in the overall equation", "forms and is then consumed", "is a catalyst", "is the slowest step"], 1, ["Add up the steps: which species cancel out?"], r`It never appears overall.`),
    mc(2, r`If the first step is slow and is A + B → C, the rate law is…`, ["k[A]", "k[A][B]", "k[C]", "k[A]²"], 1, ["The slow step limits the rate; write its rate law from its own coefficients."], r`The rate-determining step's molecularity.`),
    mc(3, r`A mechanism is consistent with data if…`, ["it has many steps", "the steps sum to the overall equation and predict the observed rate law", "every step is slow", "it has no intermediates"], 1, ["Two checks: do the steps add to the overall equation, and does the slow step give the observed rate law?"], r`Consistent doesn't mean proven.`),
    mc(3, r`A catalyst in a mechanism…`, ["appears only as a product", "is consumed in an early step and regenerated later", "is an intermediate", "slows the reaction"], 1, ["An intermediate is made, then used up. A catalyst does the opposite."], r`The opposite pattern from an intermediate.`, "review"),
  ],
});
