import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-magnetic-flux-calculus",
  title: "Magnetic flux",
  summary: "Compute magnetic flux as ∫B·dA, including through a rectangle near a long wire where B varies, and explain why net flux through any closed surface is zero.",
  minutes: 35,
  objectives: [
    "Compute Φ_B = ∫B·dA for uniform and non-uniform fields.",
    "Find the flux through a rectangular loop beside a long straight wire.",
    "State Gauss's law for magnetism: ∮B·dA = 0.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction", "induction-circuits"],
  blocks: [
    def("Flux", r`$\Phi_B = \int\vec B\cdot d\vec A$ (webers). For a uniform field through a flat loop, $BA\cos\theta$. Magnetic field lines always close on themselves (there are no magnetic monopoles), so through any closed surface $\oint\vec B\cdot d\vec A = 0$.`),
    example(r`A rectangular loop, b = 0.2 m along a long wire carrying 10 A, spanning 0.05 m to 0.15 m from it`, [
      [r`d\Phi = \tfrac{\mu_0I}{2\pi r}\,b\,dr`, "Strips parallel to the wire, where B is constant."],
      [r`\Phi = \tfrac{\mu_0Ib}{2\pi}\ln\tfrac{0.15}{0.05}`, ""],
      [r`\Phi = (2\times10^{-7})(10)(0.2)\ln 3 \approx 4.39\times10^{-7}\ \text{Wb}`, ""],
    ]),
    callout("application", "Where this shows up", r`Transformer cores are shaped to guide flux through both coils; current clamps measure the flux around a wire without touching it.`),
  ],
  questions: [
    num(2, r`B = 0.3x T (perpendicular to a square loop from x = 0 to 2 m, height 1 m). Find the flux.`, 0.6, { unit: "Wb" }, ["Φ = ∫B dA with dA = (1 m) dx; integrate from 0 to 2."], r`$\int_0^2 0.3x\,dx$.`),
    num(3, r`Repeat the wire example with the loop from 0.1 m to 0.3 m. Find Φ, in units of $10^{-7}$ Wb, to two decimal places.`, 4.39, { tolerance: 0.01 }, ["The flux from a long wire depends on ln(far edge/near edge). Compare that ratio with the example's."], r`The ratio is still 3: same flux.`),
    mc(2, r`The net magnetic flux through a closed surface around a bar magnet is…`, ["positive", "negative", "zero", "depends on the magnet"], 2, ["Field lines of a magnet are closed loops. Are there magnetic monopoles?"], r`No monopoles.`),
    mc(3, r`Doubling the loop's distance from the wire (same ratio of far to near edge) changes the flux by…`, ["half", "nothing", "a quarter", "double"], 1, ["The flux ∝ ln(r_far/r_near). What happens to it if both distances double?"], r`It depends only on the ratio of distances.`, "review"),
  ],
});
