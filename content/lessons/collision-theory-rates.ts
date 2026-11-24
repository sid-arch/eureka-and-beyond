import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "collision-theory-rates",
  title: "Collision theory and reaction rates",
  summary: "Explain reaction rates with collision theory and activation energy, compute average rates from data, and predict how concentration, temperature, surface area and catalysts change the rate.",
  minutes: 35,
  objectives: [
    "Explain collision theory: particles must collide with enough energy and the right orientation.",
    "Compute an average rate, −Δ[A]/Δt.",
    "Predict the effects of concentration, temperature, surface area and catalysts.",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  blocks: [
    def("Collision theory", r`Reactions happen when particles collide with at least the activation energy Eₐ and in a suitable orientation. Anything that raises the number of effective collisions per second raises the rate.`),
    def("Factors", r`Higher concentration (or pressure) means more collisions. Higher temperature means faster particles: more collisions, and a much larger fraction above Eₐ. More surface area (powders) means more exposed particles. A catalyst lowers Eₐ by providing another pathway, without being used up.`),
    example(r`[A] drops from 0.80 M to 0.50 M in 30 s`, [
      [r`\text{rate} = -\tfrac{\Delta[A]}{\Delta t} = -\tfrac{0.50 - 0.80}{30}`, ""],
      [r`\text{rate} = 0.010\ \text{M/s}`, ""],
    ]),
    activity("kinetics", { title: "Temperature and activation energy", params: { order: "1", k: 0.1, A0: 1, temperature: 298, Ea: 50 } }),
    callout("tip", "Try this", r`Raise the temperature from 298 K to 308 K with Eₐ = 50 kJ/mol: the rate constant roughly doubles, the old "10-degree rule". Then lower Eₐ, as a catalyst would.`, "experiment"),
    callout("application", "Where this shows up", r`Refrigerators slow spoilage, catalytic converters clean exhaust, and grain-dust explosions show what huge surface area can do.`),
  ],
  questions: [
    num(2, r`[B] rises from 0 to 0.24 M in 60 s. Find the average rate of formation, in M/s.`, 0.004, { tolerance: 0.0001, unit: "M/s" }, [], r`$\frac{0.24}{60}$.`),
    mc(2, r`A catalyst speeds up a reaction by…`, ["raising the temperature", "lowering the activation energy", "adding reactants", "changing ΔH"], 1, [], r`It offers a lower-energy pathway.`),
    mc(2, r`Why does powdered sugar dissolve faster than a sugar cube?`, ["it's a different compound", "more surface area", "higher temperature", "it's lighter"], 1, [], r`More particles exposed.`),
    mc(3, r`Raising temperature speeds reactions mainly because…`, ["particles get bigger", "a larger fraction of collisions exceeds Eₐ", "Eₐ decreases", "fewer collisions happen"], 1, [], r`The energy distribution shifts upward.`, "review"),
  ],
});
