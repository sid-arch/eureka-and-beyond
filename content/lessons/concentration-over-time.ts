import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "concentration-over-time",
  title: "Concentration changes over time",
  summary: "Use integrated rate laws to find concentrations and times, identify reaction order from linear plots, and compare half-lives of different orders.",
  minutes: 40,
  objectives: [
    "Apply zero-, first- and second-order integrated rate laws.",
    "Identify order from which plot is linear: [A], ln[A] or 1/[A] against t.",
    "Use half-life relationships, including the constant first-order half-life.",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  formulas: ["rate-laws"],
  blocks: [
    def("Integrated laws", r`Zero order: $[A] = [A]_0 - kt$ (a plot of [A] vs t is linear, slope −k). First order: $\ln[A] = \ln[A]_0 - kt$ (ln[A] vs t is linear). Second order: $\frac1{[A]} = \frac1{[A]_0} + kt$ (1/[A] vs t is linear, slope +k).`),
    example(r`First order, k = 0.10 s⁻¹, [A]₀ = 0.50 M`, [
      [r`[A]_{10\ \text{s}} = 0.50e^{-1.0} \approx 0.184\ \text{M}`, ""],
      [r`t = \tfrac{\ln(0.50/0.10)}{0.10} \approx 16.1\ \text{s}`, "Time to reach 0.10 M."],
    ]),
    example(r`Second order, k = 0.20 M⁻¹s⁻¹, [A]₀ = 0.50 M`, [
      [r`t_{1/2} = \tfrac{1}{k[A]_0} = \tfrac{1}{0.20(0.50)} = 10\ \text{s}`, "The next half-life is 20 s: second-order half-lives grow."],
    ]),
    activity("kinetics", { title: "Watch each order decay", params: { order: "1", k: 0.1, A0: 0.5 } }),
    callout("application", "Where this shows up", r`Radioactive dating and drug clearance are first order; the dimerization of some gases is second order.`),
  ],
  questions: [
    num(2, r`A first-order reaction has t½ = 25 s. What fraction remains after 100 s? Give a decimal.`, 0.0625, { tolerance: 0.0001 }, ["How many half-lives fit into 100 s?", "Each half-life leaves half as much."], r`Four half-lives: $\left(\frac12\right)^4$.`),
    num(3, r`Zero order with k = 0.020 M/s and [A]₀ = 0.80 M. How long until A is used up?`, 40, { unit: "s" }, ["For zero order, [A] falls at a constant rate: [A] = [A]₀ − kt. Set [A] = 0."], r`$\frac{0.80}{0.020}$.`),
    mc(2, r`A plot of 1/[A] against t is a straight line with positive slope. The reaction is…`, ["zero order", "first order", "second order", "can't tell"], 2, ["Each order has one plot that comes out straight: [A], ln[A] or 1/[A] against t."], r`Integrated second-order law.`),
    mc(3, r`Which order has a half-life independent of starting concentration?`, ["zero", "first", "second", "all"], 1, ["Compare the half-life formulas. Which one has no [A]₀ in it?"], r`$t_{1/2} = \frac{0.693}{k}$.`, "review"),
  ],
});
