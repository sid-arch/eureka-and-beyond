import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rate-laws",
  title: "Rate laws",
  summary: "Determine rate laws from initial-rate data, find rate constants and their units, and use integrated rate laws and half-lives.",
  minutes: 45,
  objectives: [
    "Find reaction orders by the method of initial rates.",
    "Compute k and its units from a rate law.",
    "Use integrated rate laws and identify order from linear plots ([A], ln[A] or 1/[A] vs t).",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  formulas: ["rate-laws"],
  blocks: [
    def("Rate laws", r`$\text{rate} = k[A]^m[B]^n$. The orders m and n come from experiments, not from coefficients. Doubling [A] at first order doubles the rate; at second order, quadruples it; at zero order, leaves it unchanged.`),
    example(r`Initial rates for A + B → C`, [
      [r`[A]\ \times2,\ [B]\ \text{fixed}:\ \text{rate}\ \times4 \Rightarrow m = 2`, "Experiments 1 and 2."],
      [r`[B]\ \times2,\ [A]\ \text{fixed}:\ \text{rate}\ \times2 \Rightarrow n = 1`, "Experiments 1 and 3."],
      [r`k = \tfrac{0.0020}{(0.10)^2(0.20)} = 1.0\ \text{M}^{-2}\text{s}^{-1}`, "From experiment 1: [A] = 0.10 M, [B] = 0.20 M, rate = 0.0020 M/s."],
    ]),
    def("Integrated rate laws", r`Zero order: $[A] = [A]_0 - kt$. First order: $\ln[A] = \ln[A]_0 - kt$, with constant half-life $t_{1/2} = \frac{0.693}{k}$. Second order: $\frac{1}{[A]} = \frac{1}{[A]_0} + kt$. Whichever plot is a straight line reveals the order, and its slope gives k.`),
    example(r`A first-order reaction has k = 0.0231 min⁻¹`, [
      [r`t_{1/2} = \tfrac{0.693}{0.0231} = 30\ \text{min}`, ""],
      [r`\text{after 90 min: } \left(\tfrac12\right)^3 = 12.5\%\ \text{remains}`, ""],
    ]),
    activity("kinetics", { title: "Compare the three orders", params: { order: "2", k: 0.1, A0: 1 } }),
    callout("application", "Where this shows up", r`Drug dosing schedules come from first-order elimination half-lives; ozone depletion was traced through rate-law studies.`),
  ],
  questions: [
    mc(2, r`Tripling [A] increases the rate 9 times. The order in A is…`, ["1", "2", "3", "0"], 1, [], r`$3^2 = 9$.`),
    num(2, r`Rate = k[A]² with k = 0.50 M⁻¹s⁻¹ and [A] = 0.20 M. Find the rate.`, 0.02, { tolerance: 0.0001, unit: "M/s" }, [], r`$0.50(0.04)$.`),
    num(3, r`A first-order reaction drops from 0.80 M to 0.20 M in 40 s. Find k, to three decimal places.`, 0.035, { tolerance: 0.001, unit: "s⁻¹" }, [], r`Two half-lives in 40 s: $t_{1/2} = 20$ s, $k = \frac{0.693}{20}$.`),
    mc(3, r`A plot of ln[A] against t is a straight line. The reaction is…`, ["zero order", "first order", "second order", "third order"], 1, [], r`Integrated first-order law.`, "review"),
  ],
});
