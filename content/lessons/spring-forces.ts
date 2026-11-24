import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "spring-forces",
  title: "Spring forces and Hooke's law",
  summary: "Use Hooke's law F = −kx, find spring constants from data, analyze hanging masses, and combine springs.",
  minutes: 30,
  objectives: [
    "Apply Hooke's law, F = −kx, and interpret its sign.",
    "Find a spring constant from a force–stretch graph.",
    "Find equilibrium stretch and effective spring constants of springs in series and parallel.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("Hooke's law", r`An ideal spring stretched or compressed by $x$ from its natural length pushes back with $F_s = -kx$. The minus sign means the force points toward equilibrium. The spring constant $k$ (N/m) measures stiffness and is the slope of a force-versus-stretch graph.`),
    example(r`A 2 N force stretches a spring 4 cm`, [
      [r`k = \tfrac{F}{x} = \tfrac{2}{0.04} = 50\ \text{N/m}`, ""],
    ]),
    example(r`A 0.5 kg mass hangs at rest from a 200 N/m spring`, [
      [r`kx = mg \Rightarrow x = \tfrac{0.5(9.8)}{200} = 0.0245\ \text{m}`, "About 2.5 cm."],
    ]),
    def("Combining springs", r`Side by side (parallel): $k_{eff} = k_1 + k_2$, stiffer. End to end (series): $\frac{1}{k_{eff}} = \frac{1}{k_1} + \frac{1}{k_2}$, softer. That's the opposite of the rule for resistors.`),
    activity("spring-oscillator", { title: "Feel the spring constant", params: { mass: 0.5, k: 50, amplitude: 0.2 } }),
    callout("warning", "Limits", r`Hooke's law holds only up to the elastic limit; stretch a spring too far and it deforms permanently.`),
    callout("application", "Where this shows up", r`Spring scales, car suspensions, mattresses and atomic bonds (modelled as tiny springs) all follow Hooke's law for small stretches.`),
  ],
  questions: [
    num(2, r`A 300 N/m spring is compressed 0.1 m. Find the size of its force.`, 30, { unit: "N" }, ["Hooke's law: the size of the force is kx."], r`$kx$.`),
    num(2, r`Two 100 N/m springs are connected end to end. Find the effective spring constant.`, 50, { unit: "N/m" }, ["Springs in series stretch more: 1/k_eff = 1/k₁ + 1/k₂."], r`$\frac{1}{k} = \frac{1}{100} + \frac{1}{100}$.`),
    num(3, r`A 2 kg mass hangs from two identical parallel springs and stretches them 0.049 m. Find each spring's constant.`, 200, { unit: "N/m" }, ["Parallel springs share the load: k_eff = k₁ + k₂.", "Find k_eff from mg = k_eff·x first."], r`$k_{eff} = \frac{19.6}{0.049} = 400$, split between two springs.`),
    mc(3, r`A spring is cut in half. Each half's spring constant is…`, ["half the original", "the same", "twice the original", "four times the original"], 2, ["Think of the original spring as two halves in series."], r`The original is two halves in series: $\frac1k = \frac{2}{k_{half}}$.`, "review"),
  ],
});
