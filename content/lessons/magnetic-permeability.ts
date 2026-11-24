import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "magnetic-permeability",
  title: "Magnetic permeability",
  summary: "Classify materials as ferromagnetic, paramagnetic or diamagnetic, use permeability to describe how they change a field, and compute fields inside solenoids with and without cores.",
  minutes: 30,
  objectives: [
    "Define permeability μ and relative permeability μ_r = μ/μ₀.",
    "Classify ferro-, para- and diamagnetic materials.",
    "Compute a solenoid's field, B = μnI, with and without an iron core.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction"],
  blocks: [
    def("Permeability", r`Permeability measures how a material responds to a magnetic field. In vacuum $\mu_0 = 4\pi\times10^{-7}$ T·m/A. Relative permeability $\mu_r = \frac{\mu}{\mu_0}$ tells how much a material multiplies the field.`),
    def("Kinds of materials", r`Ferromagnetic (iron, nickel, cobalt): domains of aligned atoms line up with an applied field, $\mu_r$ in the hundreds to thousands, and they can stay magnetized. Paramagnetic (aluminum, oxygen): weakly attracted, $\mu_r$ slightly above 1. Diamagnetic (water, copper, bismuth): weakly repelled, $\mu_r$ slightly below 1.`),
    def("Solenoids", r`A long coil with $n$ turns per meter carrying current $I$ has a nearly uniform field inside: $B = \mu_0 nI$ in air, or $B = \mu_r\mu_0 nI$ with a core.`),
    example(r`1000 turns/m carrying 2 A`, [
      [r`B = (4\pi\times10^{-7})(1000)(2) \approx 2.5\times10^{-3}\ \text{T}`, "Air core."],
      [r`\text{iron core}\ (\mu_r = 200):\ B \approx 0.50\ \text{T}`, "Iron saturates near 2 T, so μ_r falls at high fields."],
    ]),
    callout("application", "Where this shows up", r`Electromagnets in scrapyards, transformer cores and magnetic shielding all use high-permeability metals; a strong enough magnet can levitate a frog, because water is diamagnetic.`),
  ],
  questions: [
    num(2, r`Find B inside an air-core solenoid with 500 turns/m and 4 A, in mT, to two decimal places.`, 2.51, { tolerance: 0.01, unit: "mT" }, [], r`$4\pi\times10^{-7}(500)(4)$.`),
    mc(2, r`A material is weakly pushed out of a strong magnetic field. It is…`, ["ferromagnetic", "paramagnetic", "diamagnetic", "superconducting only"], 2, [], r`Diamagnets are repelled.`),
    mc(2, r`Why does an iron nail stick to a magnet but not stay magnetized much after?`, ["Iron is diamagnetic", "Its domains align in the field, then mostly randomize when removed", "It's a conductor", "Gravity"], 1, [], r`Soft iron loses alignment easily.`),
    mc(3, r`Putting an iron core inside a solenoid…`, ["weakens the field", "greatly strengthens the field", "has no effect", "reverses the field"], 1, [], r`$B = \mu_r\mu_0 nI$ with large $\mu_r$.`, "review"),
  ],
});
