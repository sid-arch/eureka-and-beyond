import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-energy-conservation",
  title: "Conservation of electric energy",
  summary: "Use K + qV = constant for charged particles moving through fields of point charges and distributions, including closest-approach problems.",
  minutes: 35,
  objectives: [
    "Apply K_i + qV_i = K_f + qV_f with potentials from point charges or distributions.",
    "Find closest-approach distances in head-on encounters.",
    "Find escape speeds from charged objects.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Energy conservation", r`For a charge moving only under electric forces, $\frac12mv_i^2 + qV_i = \frac12mv_f^2 + qV_f$. The potential can come from any source, so no path integrals are needed once V is known.`),
    example(r`An alpha particle (q = 3.2 × 10⁻¹⁹ C) with 5 MeV heads straight at a gold nucleus (q = 79e)`, [
      [r`K_i = \tfrac{kq_\alpha Q}{r_{min}}`, "All kinetic energy becomes potential energy at closest approach."],
      [r`r_{min} = \tfrac{kq_\alpha(79e)}{K}`, "K = 5 MeV = 8.0 × 10⁻¹³ J; q_α = 3.2 × 10⁻¹⁹ C; 79e = 1.26 × 10⁻¹⁷ C."],
      [r`r_{min} = \tfrac{(8.99\times10^9)(4.03\times10^{-36})}{8.0\times10^{-13}}`, "The two charges multiply to 4.03 × 10⁻³⁶ C²."],
      [r`r_{min} \approx 4.5\times10^{-14}\ \text{m}`, "Rutherford used this to bound the nucleus's size."],
    ]),
    callout("application", "Where this shows up", r`Rutherford scattering, ion implantation in chip making and particle accelerators are all energy-conservation problems.`),
  ],
  questions: [
    num(3, r`A proton is released from rest 1 cm from a fixed +2 nC point charge. Find its speed far away, in units of $10^5$ m/s, to two decimal places.`, 5.88, { tolerance: 0.02 }, ["All the initial potential energy kqQ/r becomes kinetic energy far away.", "Solve ½mv² = kqQ/r for v; use r = 0.01 m."], r`$\frac12mv^2 = \frac{kqQ}{r}$: $v = \sqrt{\frac{2(8.99\times10^9)(1.6\times10^{-19})(2\times10^{-9})}{1.67\times10^{-27}(0.01)}}$.`),
    num(2, r`An electron is released from rest at a point where V = 90 V and moves to the center of a ring where V = 150 V. Find its kinetic energy there, in eV.`, 60, { unit: "eV" }, ["ΔK = −qΔV. The electron's charge is −e, so work in eV."], r`$\Delta K = -q\Delta V = -(-e)(60\ \text{V}) = 60$ eV; electrons speed up moving toward higher potential.`),
    mc(2, r`Two protons are released from rest near each other. As they separate, their total kinetic energy…`, ["decreases", "increases toward their initial potential energy", "stays zero", "becomes infinite"], 1, ["Energy is conserved; the protons' U = ke²/r shrinks as r grows."], r`$U \to K$.`),
    mc(3, r`Doubling an alpha particle's kinetic energy changes its closest approach to a nucleus by a factor of…`, ["2", "½", "4", "¼"], 1, ["At the closest approach, all the kinetic energy is potential: K = kqQ/r_min."], r`$r_{min} \propto \frac1K$.`, "review"),
  ],
});
