import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "hess-law-formation",
  title: "Hess's law and enthalpies of formation",
  summary: "Combine thermochemical equations with Hess's law, and compute reaction enthalpies from standard enthalpies of formation.",
  minutes: 40,
  objectives: [
    "Manipulate thermochemical equations: reverse (flip sign) and scale (multiply ΔH).",
    "Add steps to reach a target reaction (Hess's law).",
    "Use ΔH°_rxn = ΣnΔH°_f(products) − ΣnΔH°_f(reactants).",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("Hess's law", r`Enthalpy is a state function, so ΔH depends only on the start and end, not the path. Reverse a reaction: flip the sign of ΔH. Multiply a reaction: multiply ΔH.`),
    example(r`Find ΔH for C(s) + ½O₂ → CO(g)`, [
      [r`\text{C} + \text{O}_2 \to \text{CO}_2\quad \Delta H = -393.5`, ""],
      [r`\text{CO}_2 \to \text{CO} + \tfrac12\text{O}_2\quad \Delta H = +283.0`, "The CO combustion, reversed."],
      [r`\Delta H = -393.5 + 283.0 = -110.5\ \text{kJ}`, ""],
    ]),
    def("Formation enthalpies", r`ΔH°_f is the enthalpy change to form 1 mol of a compound from its elements in standard states. It's zero for elements in standard state (O₂, C graphite). Then $\Delta H^\circ_{rxn} = \sum n\Delta H^\circ_f(\text{products}) - \sum n\Delta H^\circ_f(\text{reactants})$.`),
    example(r`CH₄ + 2O₂ → CO₂ + 2H₂O(l), with ΔH°_f: CH₄ −74.8, CO₂ −393.5, H₂O(l) −285.8 kJ/mol`, [
      [r`\textstyle\sum_{prod} = -393.5 + 2(-285.8) = -965.1`, "Products."],
      [r`\Delta H^\circ = -965.1 - (-74.8)`, "O₂ is zero."],
      [r`\Delta H^\circ = -890.3\ \text{kJ}`, ""],
    ]),
    callout("application", "Where this shows up", r`Fuel energy ratings and rocket propellant design are computed from formation-enthalpy tables; food calories are combustion enthalpies too, measured by burning food in a calorimeter.`),
  ],
  questions: [
    num(2, r`Find ΔH° for 2CO + O₂ → 2CO₂ using ΔH°_f(CO) = −110.5 and ΔH°_f(CO₂) = −393.5 kJ/mol.`, -566, { unit: "kJ" }, [], r`$2(-393.5) - 2(-110.5)$.`),
    num(3, r`Find ΔH° for C₂H₄ + H₂ → C₂H₆ (ΔH°_f: C₂H₄ +52.3, C₂H₆ −84.7 kJ/mol).`, -137, { unit: "kJ" }, [], r`$-84.7 - 52.3$.`),
    mc(2, r`ΔH°_f of O₂(g) is…`, ["−249 kJ/mol", "0", "+498 kJ/mol", "undefined"], 1, [], r`An element in its standard state.`),
    mc(3, r`Hess's law works because enthalpy is…`, ["always negative", "a state function", "path-dependent", "measured in joules"], 1, [], r`Only start and end states matter.`, "review"),
  ],
});
