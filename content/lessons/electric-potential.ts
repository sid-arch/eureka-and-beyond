import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electric-potential",
  title: "Electric potential",
  summary: "Define electric potential and potential difference, compute potentials of point charges, relate a uniform field to ΔV/d, and read equipotential maps.",
  minutes: 35,
  objectives: [
    "Define potential V = U/q and potential difference (voltage).",
    "Compute V = kq/r and add potentials of several charges as scalars.",
    "Use E = ΔV/d in a uniform field and explain why equipotentials are perpendicular to field lines.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Potential", r`Electric potential is potential energy per unit charge: $V = \frac{U}{q}$, in volts (1 V = 1 J/C). Only differences matter physically: moving charge $q$ through $\Delta V$ changes its energy by $\Delta U = q\Delta V$. For a point charge, $V = \frac{kq}{r}$; for several, add the potentials (no vectors needed).`),
    example(r`Potential 0.3 m from a +1 nC charge`, [
      [r`V = \tfrac{(8.99\times10^9)(10^{-9})}{0.3} \approx 30\ \text{V}`, ""],
    ]),
    def("Uniform fields and equipotentials", r`Between parallel plates, the field is uniform and $E = \frac{\Delta V}{d}$ (so V/m = N/C). Equipotentials are surfaces of constant V. They are always perpendicular to field lines, and the field points toward lower potential; moving along an equipotential takes no work.`),
    example(r`12 V across plates 3 mm apart`, [
      [r`E = \tfrac{12}{0.003} = 4000\ \text{V/m}`, ""],
    ]),
    activity("electric-potential", { title: "Map the potential", params: { q1: 2, q2: -2, separation: 4 } }),
    callout("tip", "Try this", r`Put the probe exactly midway between +2 μC and −2 μC: the potential is zero, yet the field there isn't. Then make both charges positive and compare.`, "experiment"),
    callout("application", "Where this shows up", r`Batteries are rated by potential difference, birds sit safely on one power line (no ΔV across them), and ECGs measure tiny potential differences across your chest.`),
  ],
  questions: [
    num(2, r`Find V at the midpoint between +2 μC and +2 μC charges 4 m apart, in kV, to two decimal places.`, 17.98, { tolerance: 0.02, unit: "kV" }, [], r`$2 \times \frac{8.99\times10^9 (2\times10^{-6})}{2}$.`),
    num(2, r`A proton moves from a 500 V point to a 200 V point. Find its kinetic energy gain in eV.`, 300, { unit: "eV" }, [], r`$\Delta K = -q\Delta V = e(300\ \text{V})$.`),
    mc(2, r`Field lines and equipotential lines meet at…`, ["0°", "45°", "90°", "any angle"], 2, [], r`Moving along an equipotential takes no work, so there's no field component along it.`),
    mc(3, r`Where V = 0 between two charges, E must also be zero.`, ["true", "false"], 1, [], r`At the midpoint of + and − charges, V = 0 but E points toward the negative charge.`, "review"),
  ],
});
