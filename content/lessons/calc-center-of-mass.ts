import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-center-of-mass",
  title: "Systems and center of mass",
  summary: "Find the center of mass of continuous objects by integration using linear density, and connect it to the motion of systems.",
  minutes: 35,
  objectives: [
    "Use linear density λ = dm/dx to find total mass M = ∫λ dx.",
    "Compute x_cm = (1/M)∫x dm for rods with varying density.",
    "Explain why Σ F_ext = M a_cm for any system.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  formulas: ["calculus-rotation"],
  blocks: [
    def("Continuous objects", r`Replace the sum $\sum m_ix_i$ with an integral: $x_{cm} = \frac{1}{M}\int x\,dm$. For a rod with linear density $\lambda(x)$, $dm = \lambda\,dx$ and $M = \int\lambda\,dx$. For a uniform object, the center of mass is at the geometric center.`),
    example(r`A 2 m rod with density λ = 3x kg/m`, [
      [r`M = \int_0^2 3x\,dx = 6\ \text{kg}`, ""],
      [r`x_{cm} = \tfrac16\int_0^2 3x^2\,dx = \tfrac{8}{6} \approx 1.33\ \text{m}`, "Shifted toward the denser end."],
    ]),
    def("Systems", r`Summing Newton's second law over every particle, internal forces cancel in pairs, leaving $\sum\vec F_{ext} = M\vec a_{cm}$. The center of mass moves like a single particle carrying all the mass.`),
    callout("application", "Where this shows up", r`Aircraft are loaded to keep the center of mass in a safe range, and a diver's center of mass follows a parabola however they twist.`),
  ],
  questions: [
    num(2, r`A 2 m rod has λ = 2 + x kg/m. Find its mass.`, 6, { unit: "kg" }, ["M = ∫λ dx over the rod's length."], r`$2x + \frac{x^2}{2}$ from 0 to 2.`),
    num(3, r`Find that rod's center of mass, to two decimal places.`, 1.11, { tolerance: 0.01, unit: "m" }, ["x_cm = (1/M)∫xλ dx; M = 6 kg from the previous question."], r`$\frac16\int_0^2 (2x + x^2)\,dx = \frac{1}{6}\left(4 + \frac83\right)$.`),
    num(2, r`A 1 m rod has λ = 6x² kg/m. Find x_cm, to two decimal places.`, 0.75, { tolerance: 0.01, unit: "m" }, ["Find M = ∫λ dx first, then x_cm = (1/M)∫xλ dx."], r`$M = 2$; $\int 6x^3\,dx = 1.5$.`),
    mc(3, r`If a rod's density increases toward one end, its center of mass is…`, ["at the middle", "closer to the denser end", "closer to the lighter end", "outside the rod"], 1, ["The center of mass is a mass-weighted average of position."], r`More mass, more weight in the average.`, "review"),
  ],
});
