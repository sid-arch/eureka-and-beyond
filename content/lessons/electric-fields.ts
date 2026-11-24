import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electric-fields",
  title: "Electric fields",
  summary: "Define the electric field as force per unit charge, compute fields of point charges, add fields as vectors and read field-line diagrams.",
  minutes: 30,
  objectives: [
    "Define E = F/q and give its units (N/C).",
    "Compute the field of a point charge, E = kq/r².",
    "Sketch and interpret field lines for one and two charges.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["coulombs-law"],
  blocks: [
    def("Electric field", r`The field at a point is the force per unit positive test charge: $\vec{E} = \frac{\vec{F}}{q}$, in N/C. For a point charge, $E = \frac{k|q|}{r^2}$, pointing away from positive charges and toward negative ones. Fields from several charges add as vectors.`),
    def("Field lines", r`Field lines start on positive charges and end on negative ones. They never cross, and they bunch together where the field is strong.`),
    example(r`Field 0.5 m from a +3 μC charge`, [
      [r`E = \tfrac{(8.99\times10^9)(3\times10^{-6})}{0.5^2}`, ""],
      [r`E \approx 1.08 \times 10^5\ \text{N/C}`, "Pointing away from the charge."],
    ]),
    example(r`Force on an electron in a 1000 N/C field`, [
      [r`F = qE = (1.6\times10^{-19})(1000)`, ""],
      [r`F = 1.6 \times 10^{-16}\ \text{N}`, "Opposite the field, since the charge is negative."],
    ]),
    activity("electric-field", { title: "Probe the field", params: { q1: 2, q2: -2, separation: 4, px: 0, py: 2 } }),
    callout("tip", "Try this", r`Drag the probe between the charges and then far away: the arrows fade as the field weakens. Make both charges positive and find the point midway between them where the field is zero.`, "experiment"),
    callout("application", "Where this shows up", r`Old CRT TVs and particle accelerators steer charged beams with fields, and a car's metal body shields you in a lightning storm because the field inside a conductor is zero.`),
  ],
  questions: [
    num(2, r`A 2 μC charge feels a 0.01 N force. Find the field strength, in N/C.`, 5000, { unit: "N/C" }, [], r`$\frac{0.01}{2\times10^{-6}}$.`),
    num(2, r`Find the field 0.3 m from a 1 μC charge, to the nearest 10 N/C.`, 99900, { tolerance: 50, unit: "N/C" }, [], r`$\frac{8.99\times10^9\cdot10^{-6}}{0.09} \approx 9.99\times10^4$.`),
    mc(2, r`A proton is released in a uniform field pointing east. It accelerates…`, ["east", "west", "north", "not at all"], 0, [], r`Positive charges are pushed along the field.`),
    mc(3, r`Two equal positive charges. At the midpoint between them, the field is…`, ["twice one charge's field", "zero", "pointing toward one charge", "infinite"], 1, [], r`Equal and opposite contributions cancel.`, "review"),
  ],
});
