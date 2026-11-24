import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reaction-energy-profile",
  title: "Reaction energy profile",
  summary: "Read activation energy, the transition state and ΔH from energy profiles, and use the Arrhenius equation to relate rate constants and temperature.",
  minutes: 35,
  objectives: [
    "Label reactants, products, the transition state, Eₐ and ΔH on an energy profile.",
    "Find the reverse activation energy: Eₐ(reverse) = Eₐ(forward) − ΔH.",
    "Use the Arrhenius equation: ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂).",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  formulas: ["rate-laws"],
  blocks: [
    def("Energy profiles", r`Potential energy along the reaction path rises from the reactants to a peak, the transition state (activated complex), then falls to the products. The rise is Eₐ; the overall difference is ΔH. For the reverse reaction, $E_a(\text{rev}) = E_a(\text{fwd}) - \Delta H$.`),
    def("Arrhenius", r`$k = Ae^{-E_a/RT}$, so $\ln\frac{k_2}{k_1} = \frac{E_a}{R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right)$.`),
    example(r`A rate constant doubles from 298 K to 308 K. Find Eₐ`, [
      [r`E_a = \tfrac{R\ln 2}{\frac1{298} - \frac1{308}}`, ""],
      [r`E_a \approx 52.9\ \text{kJ/mol}`, ""],
    ]),
    activity("kinetics", { title: "Temperature and Eₐ", params: { order: "1", k: 0.1, A0: 1, temperature: 308, Ea: 53 } }),
    callout("application", "Where this shows up", r`Food expiration testing at raised temperatures, and why fevers speed up metabolism.`),
  ],
  questions: [
    num(2, r`Eₐ(forward) = 80 kJ/mol and ΔH = −30 kJ/mol. Find Eₐ(reverse).`, 110, { unit: "kJ/mol" }, ["Sketch the profile: the products sit 30 kJ below the reactants.", "The reverse climb starts from the products' level."], r`$80 - (-30)$.`),
    num(3, r`k = 0.010 s⁻¹ at 300 K and Eₐ = 60 kJ/mol. Find k at 320 K, to three decimal places.`, 0.045, { tolerance: 0.001, unit: "s⁻¹" }, ["Use the two-point Arrhenius equation: ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂)."], r`$0.010\,e^{(60{,}000/8.314)(1/300 - 1/320)} \approx 0.045$.`),
    mc(2, r`On an energy profile, the transition state is at…`, ["the reactants", "the highest point", "the products", "the lowest point"], 1, ["The transition state is the least stable arrangement along the path."], r`The top of the barrier.`),
    mc(3, r`A larger Eₐ makes the rate constant…`, ["less sensitive to temperature", "more sensitive to temperature", "independent of temperature", "negative"], 1, ["In k = Ae^(−Eₐ/RT), Eₐ multiplies 1/T. What does a bigger multiplier do to the effect of T?"], r`Eₐ multiplies the 1/T term.`, "review"),
  ],
});
