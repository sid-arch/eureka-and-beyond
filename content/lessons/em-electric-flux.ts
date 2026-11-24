import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-electric-flux",
  title: "Electric flux",
  summary: "Define electric flux as ∫E·dA, compute it for flat and closed surfaces, and see why net flux through a closed surface depends only on enclosed charge.",
  minutes: 30,
  objectives: [
    "Compute Φ = E·A = EA cos θ for a uniform field through a flat surface.",
    "Use Φ = ∫E·dA for non-uniform fields and closed surfaces (outward normals).",
    "Explain why a closed surface with no charge inside has zero net flux.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["gauss-ampere"],
  blocks: [
    def("Flux", r`Electric flux measures how much field passes through a surface: $\Phi_E = \int\vec E\cdot d\vec A$, where $d\vec A$ is perpendicular to the surface. For a uniform field and a flat surface, $\Phi = EA\cos\theta$. For a closed surface, $d\vec A$ points outward: field leaving counts positive, field entering negative.`),
    example(r`A 500 N/C uniform field through a 0.02 m² square tilted so its normal is 30° from the field`, [
      [r`\Phi = (500)(0.02)\cos 30° \approx 8.66\ \text{N·m}^2/\text{C}`, ""],
    ]),
    example(r`A cube in a uniform field along +x`, [
      [r`\Phi_{right} = +EA,\ \Phi_{left} = -EA`, "The other four faces are parallel to E."],
      [r`\Phi_{net} = 0`, "No charge inside: every field line that enters also leaves."],
    ]),
    callout("note", "Coming next", r`For any closed surface, the net flux equals $\frac{Q_{enc}}{\varepsilon_0}$: a 3 nC charge anywhere inside gives about 339 N·m²/C, whatever the surface's shape. That's Gauss's law.`),
    callout("application", "Where this shows up", r`Flux is the same idea as water flow through a net, and it underlies sensors that measure field strength across a known area.`),
  ],
  questions: [
    num(2, r`A 2 nC charge sits inside a closed balloon. Find the net flux through the balloon, to the nearest unit.`, 226, { tolerance: 1, unit: "N·m²/C" }, ["Gauss's law: net flux = Q_enclosed/ε₀, whatever the surface's shape."], r`$\frac{2\times10^{-9}}{8.854\times10^{-12}}$.`),
    num(2, r`A 0.1 m² sheet sits in a 400 N/C uniform field with its normal at 60° to the field. Find the flux.`, 20, { unit: "N·m²/C" }, ["Φ = EA cos θ, where θ is the angle between E and the surface's normal."], r`$400(0.1)(0.5)$.`),
    mc(2, r`A 5 nC charge is at the center of a cube. The flux through one face is…`, ["Q/ε₀", "Q/(6ε₀)", "zero", "6Q/ε₀"], 1, ["The total flux is Q/ε₀. The six faces are identical relative to the charge."], r`By symmetry, each of six faces carries a sixth.`),
    mc(3, r`A closed surface has zero net flux. Which must be true?`, ["E = 0 everywhere on it", "the net enclosed charge is zero", "no charges are nearby", "the surface is a sphere"], 1, ["Gauss's law relates net flux to one thing only. What is it?"], r`Outside charges can make field lines pass through, but they cancel.`, "review"),
  ],
});
