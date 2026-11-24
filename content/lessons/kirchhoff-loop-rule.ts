import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "kirchhoff-loop-rule",
  title: "Kirchhoff's loop rule",
  summary: "Apply conservation of energy around closed loops, with sign conventions for batteries and resistors, including loops with more than one battery.",
  minutes: 30,
  objectives: [
    "State the loop rule: the sum of potential changes around any closed loop is zero.",
    "Apply sign conventions for batteries and resistors.",
    "Solve single-loop circuits with several batteries.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Loop rule", r`Going around any closed loop and returning to the start, the potential must return to its original value: $\sum\Delta V = 0$. It's conservation of energy for charges.`),
    def("Signs", r`Choose a current direction and a direction to walk the loop. Crossing a battery from − to +: $+\varepsilon$. Crossing a resistor in the direction of the current: $-IR$ (potential drops). Against the current: $+IR$. A negative answer just means the current flows the other way.`),
    example(r`A 12 V battery and a 3 V battery oppose each other in one loop with 1 Ω and 2 Ω resistors`, [
      [r`+12 - I(1) - 3 - I(2) = 0`, "Walking clockwise with the assumed current."],
      [r`I = \tfrac{9}{3} = 3\ \text{A}`, "The 3 V battery is being charged."],
    ]),
    callout("note", "Potential maps", r`Plotting the potential at each point around the loop shows rises at batteries and drops at resistors, ending where it started.`),
    callout("application", "Where this shows up", r`Jump-starting a car connects batteries in a loop, and the loop rule shows why reversing the cables is dangerous: the emfs add instead of cancelling.`),
  ],
  questions: [
    num(2, r`A 9 V battery drives current through 1 Ω, 2 Ω and 6 Ω in series. Find the voltage drop across the 6 Ω resistor.`, 6, { unit: "V" }, [], r`$I = 1$ A, so $1 \times 6$.`),
    num(3, r`Two 6 V batteries are connected in series, but one is accidentally reversed, with a 4 Ω resistor. Find the current.`, 0, { unit: "A" }, [], r`The emfs cancel.`),
    mc(2, r`Walking through a resistor opposite to the current direction, the potential…`, ["drops by IR", "rises by IR", "doesn't change", "drops by ε"], 1, [], r`Current flows from high to low potential.`),
    mc(3, r`The loop rule is a statement of conservation of…`, ["charge", "energy", "momentum", "mass"], 1, [], r`Potential is energy per charge.`, "review"),
  ],
});
