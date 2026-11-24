import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-charge-redistribution",
  title: "Redistribution of charge between conductors",
  summary: "Find how charge divides between connected conductors by equalizing their potentials, and explain why smaller spheres get higher surface densities.",
  minutes: 30,
  objectives: [
    "Use the condition that connected conductors reach the same potential.",
    "Divide charge between connected spheres: q₁/r₁ = q₂/r₂.",
    "Compare surface charge densities and fields: σ ∝ 1/r.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Equal potentials", r`When conductors are joined by a wire, charge flows until they're at the same potential. For two distant spheres, $\frac{kq_1}{r_1} = \frac{kq_2}{r_2}$, together with charge conservation $q_1 + q_2 = Q$.`),
    example(r`10 nC shared between spheres of radius 0.1 m and 0.3 m, far apart and joined by a thin wire`, [
      [r`q_1 = Q\tfrac{r_1}{r_1 + r_2} = 10\tfrac{0.1}{0.4} = 2.5\ \text{nC}`, ""],
      [r`q_2 = 7.5\ \text{nC}`, "The bigger sphere takes more charge."],
      [r`\tfrac{\sigma_1}{\sigma_2} = \tfrac{q_1/r_1^2}{q_2/r_2^2} = \tfrac{r_2}{r_1} = 3`, "But the small sphere has 3 times the surface density and field."],
    ]),
    callout("application", "Where this shows up", r`This is why charge (and sparking) concentrates at sharp tips, and why grounding a charged object drains nearly all its charge to the enormous Earth.`),
  ],
  questions: [
    num(2, r`Spheres of radii 2 cm and 6 cm are joined and share 16 nC. Find the charge on the small sphere.`, 4, { unit: "nC" }, ["Joined spheres reach equal potential kQ/r, so each charge is proportional to its radius."], r`$16\cdot\frac{2}{8}$.`),
    num(2, r`Find the common potential of the spheres in the example, to the nearest volt.`, 225, { tolerance: 1, unit: "V" }, ["Use V = kQ/r for either sphere with its final charge."], r`$\frac{k(2.5\times10^{-9})}{0.1}$.`),
    mc(2, r`A charged sphere touches a large grounded object. Afterward the sphere is nearly…`, ["fully charged", "neutral", "doubly charged", "opposite charge"], 1, ["Charge splits in proportion to size. How big is the Earth compared with the sphere?"], r`Earth's huge size takes almost everything.`),
    mc(3, r`After connection, which sphere has the stronger field at its surface?`, ["the larger", "the smaller", "equal", "neither has a field"], 1, ["They share V, and at a sphere's surface E = V/r."], r`$E = \frac{V}{r}$ with V shared.`, "review"),
  ],
});
