import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-gauss-law",
  title: "Gauss's law",
  summary: "Apply Gauss's law with spherical, cylindrical and planar symmetry to find fields of spheres, lines and sheets, inside and outside.",
  minutes: 45,
  objectives: [
    "State Gauss's law, ∮E·dA = Q_enc/ε₀.",
    "Choose Gaussian surfaces that match the symmetry so E can be pulled out of the integral.",
    "Find E inside and outside uniformly charged spheres and cylinders, and near infinite planes, σ/(2ε₀).",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["gauss-ampere"],
  blocks: [
    def("Gauss's law", r`$\oint\vec E\cdot d\vec A = \frac{Q_{enc}}{\varepsilon_0}$ for any closed surface. It's always true, but it's useful for finding E only when symmetry makes $E$ constant and perpendicular over the surface, so the integral becomes $E\times\text{area}$.`),
    example(r`A uniformly charged insulating sphere (Q = 6 nC, R = 10 cm)`, [
      [r`r > R:\ E(4\pi r^2) = \tfrac{Q}{\varepsilon_0}`, ""],
      [r`E = \tfrac{kQ}{r^2}`, "Like a point charge."],
      [r`r < R:\ Q_{enc} = Q\tfrac{r^3}{R^3} \Rightarrow E = \tfrac{kQr}{R^3}`, ""],
      [r`E(5\ \text{cm}) \approx 2700\ \text{N/C},\ E(20\ \text{cm}) \approx 1350\ \text{N/C}`, ""],
    ]),
    example(r`An infinite sheet with surface charge σ = 2 μC/m²`, [
      [r`E(2A) = \tfrac{\sigma A}{\varepsilon_0}`, ""],
      [r`E = \tfrac{\sigma}{2\varepsilon_0}`, "A pillbox through the sheet; flux leaves both caps."],
      [r`E \approx 1.13\times10^5\ \text{N/C}`, "The same at any distance."],
    ]),
    activity("gauss-field", { title: "Move the Gaussian surface", params: { distribution: "solid", charge: 6, radius: 0.1, gaussian: 0.05 } }),
    callout("tip", "Try this", r`Compare the solid sphere and the conductor with the same charge: outside they match exactly; inside, the conductor's field is zero.`, "experiment"),
    callout("application", "Where this shows up", r`Gauss's law explains why a car shields you from lightning and why charge sits on a conductor's surface; it's one of Maxwell's four equations.`),
  ],
  questions: [
    num(2, r`Find E 30 cm from the center of the 6 nC sphere in the example, to the nearest N/C.`, 599, { tolerance: 1, unit: "N/C" }, ["Outside a spherically symmetric charge, the field is the same as a point charge's."], r`$\frac{8.99\times10^9(6\times10^{-9})}{0.09}$.`),
    num(3, r`An infinite cylinder of radius 2 cm holds 4 nC per meter, uniformly through its volume. Find E 1 cm from the axis, to the nearest N/C.`, 1798, { tolerance: 2, unit: "N/C" }, ["Inside the cylinder, a Gaussian cylinder of radius r encloses only the fraction r²/R² of the charge per length.", "E(2πrL) = (λ r²/R²)L/ε₀."], r`$\frac{\lambda r}{2\pi\varepsilon_0R^2} = \frac{2k\lambda r}{R^2} = \frac{2(8.99\times10^9)(4\times10^{-9})(0.01)}{0.0004}$.`),
    mc(2, r`Two parallel infinite sheets carry +σ and −σ. The field between them is…`, ["zero", "σ/(2ε₀)", "σ/ε₀", "2σ/ε₀"], 2, ["Each sheet alone gives σ/(2ε₀). Between the sheets, do the two fields point the same way?"], r`The two fields add between the sheets and cancel outside.`),
    mc(3, r`Gauss's law can't easily give the field of a finite charged cube because…`, ["it's false for cubes", "E isn't constant over any simple closed surface", "cubes have no flux", "the charge is too big"], 1, ["Gauss's law always holds. What do you need to pull E out of the flux integral?"], r`The law holds, but without symmetry E can't be pulled out of the integral.`, "review"),
  ],
});
