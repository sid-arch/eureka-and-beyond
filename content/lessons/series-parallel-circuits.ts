import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "series-parallel-circuits",
  title: "Series and parallel circuits",
  summary: "Use Ohm's law and conservation of charge and energy to find current, voltage and power in series and parallel resistor circuits.",
  minutes: 40,
  objectives: [
    "Apply Ohm's law to a resistor.",
    "Find the equivalent resistance of resistors in series and in parallel.",
    "Determine the current through and voltage across each resistor.",
    "Calculate power dissipated in circuit elements.",
  ],
  concepts: [
    { slug: "electric-circuits", name: "Electric circuits", description: "Closed paths through which charge flows, driven by a potential difference.", subject: "subj_phys" },
    { slug: "ohms-law", name: "Ohm's law", description: "For ohmic resistors, voltage is proportional to current.", subject: "subj_phys" },
  ],
  formulas: ["ohms-law", "resistors-series-parallel", "electric-power"],
  blocks: [
    def("Current", r`The rate at which charge flows past a point, $I = \frac{\Delta q}{\Delta t}$, measured in amperes (A).`),
    def("Potential difference (voltage)", r`Energy per unit charge transferred between two points, measured in volts (V = J/C). A battery raises the potential; resistors lower it.`),
    formula(r`V = IR`, "Ohm's law", r`Holds for ohmic resistors at constant temperature.`),
    text(r`In series, components share one path, so the same current flows through each. Their voltages add to the battery's voltage, because energy per charge is conserved around the loop. In parallel, components sit on separate branches between the same two points, so each has the same voltage, and the branch currents add to the total, because charge is conserved at the junction.`),
    formula(r`R_s = R_1 + R_2, \qquad \frac{1}{R_p} = \frac{1}{R_1} + \frac{1}{R_2}`, "Equivalent resistance", r`A parallel combination is always smaller than its smallest resistor: adding a branch gives current another path.`),
    example(r`A 12 V battery drives a 4 Ω and an 8 Ω resistor in series.`, [
      [r`R_s = 4 + 8 = 12\ \Omega`, "Series resistances add."],
      [r`I = \frac{12}{12} = 1.0\ \text{A}`, "The same current through both."],
      [r`V_1 = 1.0(4) = 4\ \text{V},\quad V_2 = 1.0(8) = 8\ \text{V}`, "The voltages add to 12 V."],
    ]),
    example(r`The same resistors in parallel across 12 V.`, [
      [r`\frac{1}{R_p} = \frac{1}{4} + \frac{1}{8} = \frac{3}{8} \Rightarrow R_p \approx 2.67\ \Omega`, "Reciprocals add."],
      [r`I_1 = \frac{12}{4} = 3\ \text{A},\quad I_2 = \frac{12}{8} = 1.5\ \text{A}`, "Each branch has the full 12 V."],
      [r`I_{\text{total}} = 4.5\ \text{A} = \frac{12}{2.67}`, "Branch currents add, matching V/R_p."],
    ], r`Power from the battery is $P = IV = 4.5 \times 12 = 54$ W in parallel, versus $12$ W in series: parallel loads draw more power.`),
    callout("warning", "Model limits", r`The simulator treats the battery and wires as ideal (no internal resistance) and the resistors as ohmic. Real batteries' terminal voltage drops as current increases, and bulbs' resistance rises as they heat up.`),
    callout("application", "Where this shows up", r`Household outlets are wired in parallel so each device gets the full voltage and one switch doesn't turn off the whole house. Old holiday lights were wired in series, which is why one dead bulb darkened the whole string.`),
    activity("circuit-builder", { title: "Series or parallel?" }),
    callout("tip", "Investigate", r`With a 9 V battery, set $R_1 = R_2 = 10\ \Omega$. Compare total current in series and in parallel. Now make $R_2$ huge (100 Ω): what happens to the parallel equivalent resistance, and why?`, "experiment"),
  ],
  questions: [
    num(1, r`What current flows through a 6 Ω resistor with 18 V across it?`, 3, { unit: "A" }, [r`$I = V/R$.`], r`$18 / 6 = 3$ A.`),
    num(1, r`Find the equivalent resistance of 3 Ω, 5 Ω and 7 Ω in series.`, 15, { unit: "Ω" }, ["Series resistances add."], r`$3 + 5 + 7 = 15\ \Omega$.`),
    num(2, r`Find the equivalent resistance of 6 Ω and 3 Ω in parallel.`, 2, { unit: "Ω" }, [r`$\frac{1}{R_p} = \frac{1}{6} + \frac{1}{3}$.`], r`$\frac{1}{6} + \frac{2}{6} = \frac{3}{6}$, so $R_p = 2\ \Omega$.`),
    mc(2, r`Two identical bulbs in parallel are connected to a battery. One burns out. The other bulb:`, ["Goes out", "Gets dimmer", "Stays the same brightness", "Gets brighter"], 2,
      ["What is the voltage across each parallel branch?"], r`Each branch still has the full battery voltage (ideal battery), so the remaining bulb's current and brightness don't change.`),
    num(2, r`A 10 Ω and a 15 Ω resistor are in series across 20 V. What is the voltage across the 15 Ω resistor?`, 12, { unit: "V" },
      ["Find the current first: I = 20/25."], r`$I = 0.8$ A, so $V = 0.8 \times 15 = 12$ V.`),
    num(3, r`A 120 V outlet powers a 60 W lamp and a 1200 W heater in parallel. What total current is drawn?`, 10.5, { tolerance: 0.01, unit: "A" },
      [r`$I = P/V$ for each device.`], r`$0.5 + 10 = 10.5$ A.`, "review"),
  ],
});
