import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-continuous-distributions",
  title: "Electric fields of point charges and continuous distributions",
  summary: "Integrate over charge elements to find the fields of rods, rings and infinite lines, using symmetry to cancel components.",
  minutes: 45,
  objectives: [
    "Write dE = k dq/r² with dq = λ dx (or σ dA).",
    "Find the field on the axis of a finite rod and of a ring.",
    "Use symmetry to cancel perpendicular components, and find the field of an infinite line, λ/(2πε₀r).",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["coulombs-law", "gauss-ampere"],
  blocks: [
    def("Method", r`Split the object into point-like pieces $dq$, write $d\vec E = \frac{k\,dq}{r^2}\hat r$ for each, and integrate component by component. Look for symmetry first: components that cancel in pairs don't need integrating.`),
    example(r`A rod of length L and charge Q, at a point on its axis a distance d beyond one end`, [
      [r`dE = \tfrac{k\lambda\,dx}{x^2},\ \lambda = \tfrac QL`, "x is measured from the point."],
      [r`E = k\lambda\int_d^{d+L}\tfrac{dx}{x^2} = \tfrac{kQ}{d(d + L)}`, ""],
      [r`Q = 4\ \text{nC}`, ""],
      [r`L = 0.2,\ d = 0.1:\ E \approx 1.20\times10^3\ \text{N/C}`, ""],
    ]),
    example(r`A ring of radius R and charge Q, on its axis at distance x`, [
      [r`dE_x = \tfrac{k\,dq}{x^2 + R^2}\cdot\tfrac{x}{\sqrt{x^2 + R^2}}`, "Perpendicular parts cancel around the ring."],
      [r`E = \tfrac{kQx}{(x^2 + R^2)^{3/2}}`, "Zero at the center, and kQ/x² far away."],
      [r`Q = 5\ \text{nC},\ R = 0.3,\ x = 0.4:\ E \approx 144\ \text{N/C}`, ""],
    ]),
    def("Infinite line", r`Integrating over an infinite line of charge density $\lambda$ gives $E = \frac{2k\lambda}{r} = \frac{\lambda}{2\pi\varepsilon_0 r}$, pointing radially. It falls off as $\frac1r$, not $\frac1{r^2}$.`),
    activity("gauss-field", { title: "Field of an infinite line", params: { distribution: "line", charge: 2, gaussian: 0.05 } }),
    callout("application", "Where this shows up", r`Power lines, coaxial cables and ion beams are modeled as line charges; ring and disk fields describe charged particle accelerators.`),
  ],
  questions: [
    num(2, r`An infinite line with λ = 2 nC/m. Find E 5 cm away, to the nearest N/C.`, 719, { tolerance: 1, unit: "N/C" }, ["An infinite line of charge gives E = 2kλ/r."], r`$\frac{2k\lambda}{r} = \frac{2(8.99\times10^9)(2\times10^{-9})}{0.05}$.`),
    num(3, r`At what distance x on a ring's axis is the field largest? Answer as a multiple of R, to three decimal places.`, 0.707, { tolerance: 0.002 }, ["On the axis, E ∝ x/(x² + R²)^{3/2}. Set its derivative with respect to x to zero."], r`$\frac{d}{dx}\frac{x}{(x^2 + R^2)^{3/2}} = 0$ gives $x = \frac{R}{\sqrt2}$.`),
    mc(2, r`At the center of a uniformly charged ring, the field is…`, ["maximum", "zero", "kQ/R²", "infinite"], 1, ["Pair each bit of charge with the bit directly opposite it on the ring."], r`Contributions cancel by symmetry.`),
    mc(3, r`Far from a finite rod (d ≫ L), its field approaches…`, ["zero faster than 1/d²", "kQ/d², like a point charge", "a constant", "λ/(2πε₀d)"], 1, ["The rod's field is kQ/(d(d + L)). What happens when d is much larger than L?"], r`$d(d + L) \to d^2$.`, "review"),
  ],
});
