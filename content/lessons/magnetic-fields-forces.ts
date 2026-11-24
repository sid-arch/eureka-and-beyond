import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "magnetic-fields-forces",
  title: "Magnetic fields and forces",
  summary: "Describe magnetic fields of magnets and currents, and compute forces on moving charges and current-carrying wires with right-hand rules.",
  minutes: 30,
  objectives: [
    "Describe magnetic poles and field lines.",
    "Find the field around a long straight wire, B = μ₀I/(2πr).",
    "Use F = qvB sin θ and F = ILB sin θ with the right-hand rule.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction"],
  blocks: [
    def("Magnetic fields", r`Magnets have north and south poles; like poles repel. Field lines leave north and enter south, and poles always come in pairs. Moving charges, meaning currents, create magnetic fields: around a long straight wire, $B = \frac{\mu_0 I}{2\pi r}$ with $\mu_0 = 4\pi\times10^{-7}$ T·m/A, circling the wire (right thumb along the current, fingers curl with B).`),
    def("Magnetic force", r`A charge moving through a field feels $F = qvB\sin\theta$, perpendicular to both $\vec{v}$ and $\vec{B}$. On a wire, $F = ILB\sin\theta$. Point your fingers along $\vec{v}$ (or I), curl them toward $\vec{B}$, and your thumb gives the force on a positive charge.`),
    example(r`Field 2 cm from a wire carrying 10 A`, [
      [r`B = \tfrac{(4\pi\times10^{-7})(10)}{2\pi(0.02)} = 1\times10^{-4}\ \text{T}`, "About twice Earth's field."],
    ]),
    example(r`A 0.2 m wire carrying 3 A at right angles to a 0.4 T field`, [
      [r`F = ILB = (3)(0.2)(0.4) = 0.24\ \text{N}`, ""],
    ]),
    callout("application", "Where this shows up", r`Electric motors spin because of forces on current loops; MRI machines use fields of about 1.5–3 T; Earth's field steers solar wind particles into the auroras.`),
  ],
  questions: [
    num(2, r`A proton ($q = 1.6\times10^{-19}$ C) moves at $1\times10^6$ m/s perpendicular to a 1 T field. Find the force, in units of $10^{-13}$ N.`, 1.6, { tolerance: 0.01 }, [], r`$qvB = 1.6\times10^{-13}$ N.`),
    mc(2, r`A charge moves parallel to a magnetic field. The magnetic force on it is…`, ["maximum", "zero", "along the field", "opposite the field"], 1, [], r`$\sin 0° = 0$.`),
    num(2, r`Find the field 0.05 m from a wire carrying 5 A, in units of $10^{-5}$ T.`, 2, { tolerance: 0.01 }, [], r`$\frac{2\times10^{-7}\cdot 5}{0.05} = 2\times10^{-5}$ T.`),
    mc(3, r`Why can't a magnetic force change a charged particle's speed?`, ["It's too weak", "It's always perpendicular to the velocity, so it does no work", "Charges have no mass", "It only acts on magnets"], 1, [], r`It only turns the particle, which is why charges circle in a field.`, "review"),
  ],
});
