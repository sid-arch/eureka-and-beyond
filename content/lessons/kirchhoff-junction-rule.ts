import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "kirchhoff-junction-rule",
  title: "Kirchhoff's junction rule and conservation of charge",
  summary: "Apply the junction rule, then combine junction and loop equations to solve circuits with two batteries in different branches.",
  minutes: 40,
  objectives: [
    "State the junction rule: current in equals current out.",
    "Write junction and loop equations for multi-loop circuits.",
    "Solve them and interpret negative currents.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Junction rule", r`Charge can't pile up at a junction, so $\sum I_{in} = \sum I_{out}$. With $n$ junctions you get $n - 1$ independent junction equations; loops supply the rest.`),
    example(r`Three branches join two nodes A (top) and B (bottom, 0 V): left, a 10 V battery with 2 Ω; middle, a 4 Ω resistor; right, a 4 V battery with 2 Ω. Both batteries have + toward A`, [
      [r`I_1 + I_2 = I_3`, "Junction A: currents up the battery branches and down the middle."],
      [r`I_1 = \tfrac{10 - V_A}{2},\ I_2 = \tfrac{4 - V_A}{2},\ I_3 = \tfrac{V_A}{4}`, "Each branch's loop with B."],
      [r`\tfrac{10 - V_A}{2} + \tfrac{4 - V_A}{2} = \tfrac{V_A}{4}`, ""],
      [r`V_A = 5.6\ \text{V}`, ""],
      [r`I_1 = 2.2\ \text{A},\ I_2 = -0.8\ \text{A},\ I_3 = 1.4\ \text{A}`, "I₂ is negative: current flows backward through the 4 V battery, charging it."],
    ], r`Check: $2.2 + (-0.8) = 1.4$. ✓`),
    callout("tip", "Strategy", r`Label each branch current with a guessed direction, write the junction equations, write enough loop equations to match the number of unknowns, and solve. Never redraw directions mid-problem; let the signs tell you.`),
    callout("application", "Where this shows up", r`Car electrical systems (alternator, battery and loads in parallel) and solar panels with storage batteries are multi-loop circuits solved exactly this way.`),
  ],
  questions: [
    num(1, r`3 A and 2 A flow into a junction; one wire carries 4 A out. Find the current in the other outgoing wire.`, 1, { unit: "A" }, [], r`$5 - 4$.`),
    num(3, r`In the example, replace the 4 V battery with a 10 V one. Find the middle-branch current.`, 2, { unit: "A" }, [], r`$\frac{10 - V}{2} \times 2 = \frac{V}{4}$ gives $V = 8$ V, so $I_3 = 2$ A.`),
    mc(2, r`A calculated branch current comes out −0.5 A. This means…`, ["an error", "it flows opposite to the assumed direction", "the battery is dead", "the junction rule failed"], 1, [], r`Signs encode direction.`),
    mc(3, r`The junction rule follows from conservation of…`, ["energy", "charge", "momentum", "power"], 1, [], r`Charge doesn't accumulate at a point.`, "review"),
  ],
});
