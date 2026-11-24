import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ice-tables",
  title: "Equilibrium constants and ICE tables",
  summary: "Organize equilibrium problems with ICE tables, solve for equilibrium concentrations (exactly or with the small-x approximation), and calculate K from data.",
  minutes: 45,
  objectives: [
    "Set up Initial, Change and Equilibrium rows using stoichiometry.",
    "Solve for x exactly, or with the small-x approximation when it's valid (the 5% rule).",
    "Calculate K from equilibrium data, and Kp from Kc.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("ICE tables", r`Write Initial concentrations, the Change in terms of x using the coefficients, and Equilibrium = initial + change. Substitute into K and solve for x.`),
    example(r`H₂ + I₂ ⇌ 2HI, K = 49, starting with 0.50 M H₂ and I₂`, [
      [r`\text{E: } [\text{H}_2] = [\text{I}_2] = 0.50 - x,\ [\text{HI}] = 2x`, ""],
      [r`\tfrac{(2x)^2}{(0.50 - x)^2} = 49 \Rightarrow \tfrac{2x}{0.50 - x} = 7`, "A perfect square: take the square root."],
      [r`x = 0.389 \Rightarrow [\text{HI}] = 0.778\ \text{M}`, ""],
    ]),
    def("Small-x approximation", r`When K is small, x may be negligible next to the initial concentration. Check afterward: if x is under 5% of the initial value, the shortcut is fine; otherwise solve the quadratic.`),
    example(r`N₂O₄ ⇌ 2NO₂, K = 0.0080, starting with 0.20 M N₂O₄`, [
      [r`\tfrac{(2x)^2}{0.20 - x} = 0.0080`, ""],
      [r`\text{shortcut: } 4x^2 \approx 0.0016 \Rightarrow x \approx 0.020`, "That's 10% of 0.20: too big."],
      [r`\text{quadratic: } x = 0.0190 \Rightarrow [\text{NO}_2] = 0.038\ \text{M}`, ""],
    ]),
    activity("equilibrium", { title: "Exact equilibrium for A + B ⇌ C", params: { K: 4, A0: 1, B0: 1 } }),
    callout("application", "Where this shows up", r`Industrial chemists use ICE tables to predict yields, and the same method underlies every weak-acid and solubility calculation.`),
  ],
  questions: [
    num(2, r`For A ⇌ B, K = 3. Starting with 1.00 M A and no B, find [B] at equilibrium.`, 0.75, { unit: "M" }, [], r`$\frac{x}{1 - x} = 3$.`),
    num(3, r`For 2SO₂ + O₂ ⇌ 2SO₃, at equilibrium [SO₂] = 0.10, [O₂] = 0.050 and [SO₃] = 0.40 M. Find K.`, 320, {}, [], r`$\frac{0.16}{0.01(0.050)}$.`),
    mc(2, r`The small-x approximation is safe when…`, ["K is large", "x is under 5% of the initial concentration", "x is negative", "always"], 1, [], r`Check after solving.`),
    mc(3, r`In an ICE table, the change row uses…`, ["equilibrium concentrations", "coefficients times x", "K", "rates"], 1, [], r`Stoichiometry sets the ratio of changes.`, "review"),
  ],
});
