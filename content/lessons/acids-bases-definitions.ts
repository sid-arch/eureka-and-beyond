import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "acids-bases-definitions",
  title: "Properties and definitions of acids and bases",
  summary: "Describe acid and base properties, apply the Arrhenius and Brønsted–Lowry definitions, identify conjugate pairs, and distinguish strong from weak.",
  minutes: 30,
  objectives: [
    "Describe properties of acids and bases.",
    "Apply Arrhenius (H⁺/OH⁻) and Brønsted–Lowry (proton donor/acceptor) definitions.",
    "Identify conjugate acid–base pairs and strong versus weak acids.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  blocks: [
    def("Properties", r`Acids taste sour, turn blue litmus red and react with active metals to give H₂. Bases taste bitter, feel slippery and turn red litmus blue. Never taste lab chemicals.`),
    def("Definitions", r`Arrhenius: acids produce H⁺ (as H₃O⁺) in water; bases produce OH⁻. Brønsted–Lowry: acids donate protons; bases accept them. Removing H⁺ from an acid gives its conjugate base.`),
    example(r`NH₃ + H₂O ⇌ NH₄⁺ + OH⁻`, [
      [r`\text{NH}_3 \to \text{NH}_4^+`, "NH₃ accepts H⁺, so it's the base; NH₄⁺ is its conjugate acid."],
      [r`\text{H}_2\text{O} \to \text{OH}^-`, "Water donates H⁺, so it's the acid; OH⁻ is its conjugate base. Water can act as either."],
    ]),
    def("Strong and weak", r`Strong acids ionize completely in water: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄. Weak acids only partly: acetic acid, HF, carbonic acid. "Strong" describes ionization, not concentration.`),
    callout("application", "Where this shows up", r`Stomach acid (HCl), antacids (bases), vinegar (acetic acid), and ocean acidification from dissolved CO₂.`),
  ],
  questions: [
    mc(1, r`Which is a strong acid?`, ["HF", "CH₃COOH", "HNO₃", "H₂CO₃"], 2, [], r`One of the six common strong acids.`),
    mc(2, r`What is the conjugate base of HSO₄⁻?`, ["H₂SO₄", "SO₄²⁻", "HSO₃⁻", "OH⁻"], 1, [], r`Remove one H⁺.`),
    mc(2, r`In HCl + H₂O → H₃O⁺ + Cl⁻, water acts as…`, ["an acid", "a base", "a salt", "a catalyst"], 1, [], r`It accepts a proton.`),
    mc(3, r`A dilute solution of a strong acid and a concentrated solution of a weak acid differ mainly in…`, ["nothing", "how much of the acid ionizes versus how much acid there is", "color", "their bases"], 1, [], r`Strength ≠ concentration.`, "review"),
  ],
});
