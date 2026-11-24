import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-conductors",
  title: "Electrostatics with conductors",
  summary: "Use the properties of conductors in equilibrium: zero field inside, charge on the surface, equipotential volume, and E = σ/ε₀ just outside.",
  minutes: 35,
  objectives: [
    "Explain why E = 0 inside a conductor in electrostatic equilibrium.",
    "Use Gauss's law to show excess charge resides on the surface, with E = σ/ε₀ just outside.",
    "Explain shielding and why charge concentrates at sharp points.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["gauss-ampere"],
  blocks: [
    def("Equilibrium rules", r`Free charges in a conductor move until they feel no force, so $\vec E = 0$ inside and the whole conductor is one equipotential. A Gaussian surface just inside the surface encloses zero charge, so any excess charge sits on the surface. Just outside, the field is perpendicular to the surface with $E = \frac{\sigma}{\varepsilon_0}$.`),
    example(r`A conducting sphere of radius 0.1 m holds 6 nC`, [
      [r`\sigma = \tfrac{6\times10^{-9}}{4\pi(0.1)^2} \approx 4.77\times10^{-8}\ \text{C/m}^2`, ""],
      [r`E_{surface} = \tfrac{\sigma}{\varepsilon_0} \approx 5390\ \text{N/C}`, "Equal to kQ/R², as it must be."],
    ]),
    def("Cavities and shielding", r`An empty cavity inside a conductor has zero field, whatever charges sit outside: a Faraday cage. A charge $q$ placed in a cavity induces $-q$ on the cavity wall and $+q$ on the outer surface.`),
    activity("gauss-field", { title: "Conductor vs insulator", params: { distribution: "shell", charge: 6, radius: 0.1, gaussian: 0.05 } }),
    callout("application", "Where this shows up", r`Faraday cages shield MRI rooms and microwave ovens; lightning rods are sharp because the field, and so ionization, is strongest at points.`),
  ],
  questions: [
    num(2, r`Find the field just outside a conductor with σ = 8.854 × 10⁻⁹ C/m².`, 1000, { unit: "N/C" }, ["Just outside a conductor, E = σ/ε₀."], r`$\frac{\sigma}{\varepsilon_0}$.`),
    num(3, r`A +3 nC charge sits in a cavity inside a neutral conducting shell. How much charge is on the shell's outer surface, in nC?`, 3, { unit: "nC" }, ["Inside the conductor E = 0, so the cavity wall must hold charge canceling +3 nC.", "The shell is neutral overall; where does the balancing charge go?"], r`−3 nC is induced on the cavity wall, leaving +3 nC outside.`),
    mc(2, r`Inside a solid charged conductor in equilibrium, the electric potential is…`, ["zero", "constant, equal to the surface value", "largest at the center", "undefined"], 1, ["E = 0 inside the conductor. What does that mean for how V changes from point to point?"], r`E = 0 means V doesn't change.`),
    mc(3, r`On an irregularly shaped conductor, surface charge density is greatest where…`, ["the surface is flattest", "the surface is most sharply curved", "it's thickest", "it's uniform"], 1, ["Connected parts share one potential, and V ∝ σr for a sphere of radius r. Where is r smallest?"], r`Sharp points have small radius of curvature.`, "review"),
  ],
});
