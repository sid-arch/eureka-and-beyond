import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-potential-field",
  title: "Electric potential and electric field",
  summary: "Move between field and potential with V = −∫E·dr and E = −dV/dx (the gradient), and read equipotential maps.",
  minutes: 35,
  objectives: [
    "Compute ΔV = −∫E·dr along a path.",
    "Find E = −dV/dx (and −∇V in more dimensions).",
    "Explain why E is perpendicular to equipotentials and points downhill in V.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["gauss-ampere", "electric-potential"],
  blocks: [
    def("Two directions", r`$V_B - V_A = -\int_A^B\vec E\cdot d\vec r$; conversely, $E_x = -\frac{\partial V}{\partial x}$, and in general $\vec E = -\nabla V$. The field points in the direction V decreases fastest, perpendicular to equipotentials.`),
    example(r`V(x) = 3x² − 2x volts`, [
      [r`E_x = -\tfrac{dV}{dx} = -(6x - 2)`, ""],
      [r`E_x(1) = -4\ \text{V/m}`, "Pointing in −x."],
    ]),
    example(r`Potential difference across a sphere's field, from r = 0.2 m out to r = 0.4 m (Q = 6 nC)`, [
      [r`\Delta V = -\int_{0.2}^{0.4}\tfrac{kQ}{r^2}\,dr = kQ\left(\tfrac1{0.4} - \tfrac1{0.2}\right)`, ""],
      [r`\Delta V \approx -135\ \text{V}`, "Potential falls moving outward from a positive charge."],
    ]),
    activity("electric-potential", { title: "Field lines cross equipotentials at right angles", params: { q1: 3, q2: -2, separation: 5 } }),
    callout("application", "Where this shows up", r`Topographic maps work the same way: contour lines are equipotentials, and water flows downhill perpendicular to them.`),
  ],
  questions: [
    num(2, r`V(x) = 50/x volts. Find E_x at x = 2 m.`, 12.5, { unit: "V/m" }, ["E_x = −dV/dx."], r`$-\frac{d}{dx}\frac{50}{x} = \frac{50}{x^2}$.`),
    num(2, r`A uniform field E = 300 î V/m. Find V_B − V_A from x = 0 to x = 0.5 m.`, -150, { unit: "V" }, ["In a uniform field, ΔV = −E·Δx."], r`$-300(0.5)$.`),
    mc(2, r`Where equipotential lines are closest together, the field is…`, ["weakest", "strongest", "zero", "parallel to them"], 1, ["The field size is how fast V changes with distance."], r`Large $\frac{dV}{dx}$.`),
    mc(3, r`A positive charge released from rest moves toward…`, ["higher potential", "lower potential", "constant potential", "higher field"], 1, ["A positive charge moves along E, and E points from high to low potential."], r`It accelerates along E, downhill in V.`, "review"),
  ],
});
