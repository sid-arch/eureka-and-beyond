import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-gravitational-force",
  title: "Gravitational force",
  summary: "Use Newton's law of gravitation and the gravitational field g(r), apply the shell theorem, and find the field inside a uniform planet.",
  minutes: 35,
  objectives: [
    "Compute gravitational forces and fields, g = GM/r².",
    "State the shell theorem.",
    "Show that inside a uniform sphere g = GMr/R³, increasing linearly from the center.",
  ],
  concepts: [
    { slug: "circular-motion", name: "Circular motion and gravitation", description: "Motion in circles, centripetal force and universal gravitation.", subject: "subj_phys" },
  ],
  formulas: ["universal-gravitation"],
  blocks: [
    def("Field", r`The gravitational field is force per unit mass: $\vec g = \frac{\vec F}{m}$, of size $\frac{GM}{r^2}$ outside a spherical mass $M$. With $G = 6.674\times10^{-11}$ N·m²/kg², Earth's surface field is about 9.8 N/kg.`),
    def("Shell theorem", r`Newton proved, by integrating over the mass, that a uniform spherical shell attracts an outside mass as if all its mass were at its center, and exerts zero net force on a mass inside it.`),
    def("Inside a uniform planet", r`At radius $r < R$, only the mass inside $r$ pulls: $M_{in} = M\frac{r^3}{R^3}$, so $g = \frac{GM_{in}}{r^2} = \frac{GMr}{R^3}$. The field grows linearly from zero at the center to its maximum at the surface, then falls off as $\frac{1}{r^2}$.`),
    example(r`Earth's field at its surface, halfway to the center and at 2R (uniform-density model)`, [
      [r`g(R) = \tfrac{GM}{R^2} \approx 9.82\ \text{N/kg}`, ""],
      [r`g\left(\tfrac R2\right) = \tfrac{g(R)}{2} \approx 4.91\ \text{N/kg}`, "Linear inside."],
      [r`g(2R) = \tfrac{g(R)}{4} \approx 2.45\ \text{N/kg}`, "Inverse square outside."],
    ]),
    callout("note", "Real Earth", r`Earth's density isn't uniform (its iron core is dense), so g actually rises slightly below the surface before falling; the uniform model is the AP approximation.`),
    callout("application", "Where this shows up", r`Gravimeters map oil and mineral deposits from tiny changes in g, and GRACE satellites track melting ice sheets the same way.`),
  ],
  questions: [
    num(2, r`At what height above Earth's surface (as a multiple of R) is g a quarter of its surface value?`, 1, {}, ["g ∝ 1/r². For g/4, how far from Earth's center must you be?", "Height is measured from the surface, not the center."], r`At $r = 2R$, a height of 1R.`),
    num(2, r`In the uniform model, find g at r = 0.25R in N/kg, to two decimal places.`, 2.45, { tolerance: 0.01, unit: "N/kg" }, ["Inside a uniform sphere, g grows linearly with r: g(r) = g_surface·r/R."], r`$0.25 \times 9.82$.`),
    mc(2, r`A mass sits inside a hollow uniform spherical shell, off-center. The shell's net gravitational force on it is…`, ["toward the center", "toward the nearest wall", "zero", "infinite"], 2, ["What does the shell theorem say about the field inside a uniform shell?"], r`Shell theorem.`),
    mc(3, r`Where is g largest for a uniform-density planet?`, ["at the center", "at the surface", "at infinity", "halfway down"], 1, ["Inside, g ∝ r; outside, g ∝ 1/r². Where do the two pieces meet?"], r`It rises linearly inside, then falls outside.`, "review"),
  ],
});
