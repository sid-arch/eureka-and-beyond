import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "magnetic-fields-moving-charges",
  title: "Magnetic fields from moving charges",
  summary: "Find the circular paths of charges in magnetic fields, use velocity selectors, and compute the forces between parallel current-carrying wires.",
  minutes: 35,
  objectives: [
    "Find the radius r = mv/(qB) and period T = 2πm/(qB) of a charge circling in a uniform field.",
    "Use crossed fields as a velocity selector, v = E/B.",
    "Compute the force between parallel wires and predict attraction or repulsion.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction"],
  blocks: [
    def("Circular motion in a field", r`A charge moving perpendicular to a uniform field feels a force $qvB$ at right angles to its velocity, so it moves in a circle: $qvB = \frac{mv^2}{r}$, giving $r = \frac{mv}{qB}$. The period $T = \frac{2\pi m}{qB}$ doesn't depend on speed.`),
    example(r`A proton at 1 × 10⁶ m/s in a 0.5 T field`, [
      [r`r = \tfrac{(1.67\times10^{-27})(10^6)}{(1.6\times10^{-19})(0.5)}`, ""],
      [r`r \approx 0.021\ \text{m}`, ""],
      [r`r_e \approx 1.1\times10^{-5}\ \text{m}`, "An electron at the same speed: about 1800 times smaller, and circling the other way."],
    ]),
    def("Velocity selector", r`With an electric field and a magnetic field at right angles, the forces $qE$ and $qvB$ cancel only for $v = \frac{E}{B}$; particles at other speeds are deflected away.`),
    def("Parallel wires", r`Each current sits in the other's field ($B = \frac{\mu_0 I}{2\pi d}$), so the force per length is $\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi d}$. Currents in the same direction attract; opposite directions repel.`),
    example(r`Two wires 0.1 m apart, each carrying 10 A in the same direction`, [
      [r`\tfrac{F}{L} = \tfrac{(4\pi\times10^{-7})(10)(10)}{2\pi(0.1)}`, ""],
      [r`\tfrac{F}{L} = 2\times10^{-4}\ \text{N/m}`, "Attractive."],
    ]),
    callout("application", "Where this shows up", r`Mass spectrometers sort ions by the radius of their paths, cyclotrons use the speed-independent period, and Earth's field funnels charged particles toward the poles to make auroras.`),
    activity("magnetic-orbit", { title: "Charges in a magnetic field", params: { species: "proton", speed: 10, field: 0.1 } }),
    callout("tip", "Try this", r`The force is always perpendicular to the velocity, so the particle circles at constant speed. Raise the speed and watch the radius grow in proportion.`, "experiment"),
  ],
  questions: [
    num(2, r`A velocity selector has E = 2000 V/m and B = 0.01 T. Find the selected speed.`, 200000, { unit: "m/s" }, [], r`$\frac{E}{B}$.`),
    num(3, r`An alpha particle (m = 6.64 × 10⁻²⁷ kg, q = 3.2 × 10⁻¹⁹ C) moves at 2 × 10⁶ m/s perpendicular to a 1 T field. Find r in cm, to two decimal places.`, 4.15, { tolerance: 0.02, unit: "cm" }, [], r`$\frac{6.64\times10^{-27}(2\times10^6)}{3.2\times10^{-19}} \approx 0.0415$ m.`),
    mc(2, r`Doubling a proton's speed in a uniform field changes its period by a factor of…`, ["2", "½", "1", "4"], 2, [], r`$T = \frac{2\pi m}{qB}$.`),
    mc(3, r`Two parallel wires carry currents in opposite directions. They…`, ["attract", "repel", "feel no force", "twist"], 1, [], r`Opposite currents repel.`, "review"),
  ],
});
