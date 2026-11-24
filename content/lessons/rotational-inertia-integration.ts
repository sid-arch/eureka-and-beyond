import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rotational-inertia-integration",
  title: "Rotational inertia by integration",
  summary: "Derive rotational inertias of rods, hoops and disks with I = ∫r² dm, handle non-uniform density, and use the parallel-axis theorem.",
  minutes: 40,
  objectives: [
    "Set up I = ∫r² dm with dm = λ dx or dm = σ dA.",
    "Derive I for a rod (center and end) and a solid disk.",
    "Use the parallel-axis theorem, I = I_cm + Md².",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["calculus-rotation"],
  blocks: [
    def("Definition", r`For a continuous object, $I = \int r^2\,dm$, where $r$ is each piece's distance from the axis. Choose $dm$ so every bit of it sits at the same $r$.`),
    example(r`A uniform rod (mass M, length L) about one end`, [
      [r`dm = \tfrac{M}{L}dx`, ""],
      [r`I = \int_0^L x^2\tfrac{M}{L}\,dx = \tfrac13 ML^2`, ""],
    ]),
    example(r`A uniform solid disk (mass M, radius R) about its center`, [
      [r`dm = \sigma(2\pi r\,dr),\ \sigma = \tfrac{M}{\pi R^2}`, "Thin rings of radius r."],
      [r`I = \int_0^R r^2\,\sigma 2\pi r\,dr = \tfrac{\pi\sigma R^4}{2}`, ""],
      [r`I = \tfrac12 MR^2`, ""],
    ]),
    example(r`A 2 m rod with density λ = 3x kg/m, about x = 0`, [
      [r`I = \int_0^2 x^2(3x)\,dx`, ""],
      [r`I = \tfrac34 x^4\Big|_0^2 = 12\ \text{kg·m}^2`, ""],
    ]),
    def("Parallel-axis theorem", r`$I = I_{cm} + Md^2$ for an axis a distance $d$ from a parallel axis through the center of mass. Check: rod about its center, $\frac{1}{12}ML^2 + M\left(\frac L2\right)^2 = \frac13ML^2$.`),
    callout("application", "Where this shows up", r`Engineers compute I for turbine blades, flywheels and figure skaters' body positions; rims are made light because $r^2$ weights them heavily.`),
  ],
  questions: [
    num(2, r`Find I of a 4 kg, 3 m uniform rod about its center.`, 3, { unit: "kg·m²" }, ["A rod about its center: I = (1/12)ML²."], r`$\frac{1}{12}(4)(9)$.`),
    num(3, r`A 1 m rod has λ = 6x kg/m. Find I about x = 0.`, 1.5, { unit: "kg·m²" }, ["I = ∫x² dm = ∫x²λ dx from 0 to 1."], r`$\int_0^1 6x^3\,dx = 1.5$.`),
    num(2, r`A 2 kg disk of radius 0.5 m rotates about a parallel axis through its rim. Find I.`, 0.75, { unit: "kg·m²" }, ["Parallel-axis theorem: I = I_cm + Md², with d = R here."], r`$\frac12(2)(0.25) + 2(0.25)$.`),
    mc(3, r`Of these 1 kg, 1 m radius objects, which has the largest I about its central axis?`, ["solid sphere", "solid disk", "thin hoop", "thin rod along a diameter"], 2, ["I sums mr². Which object has all of its mass at the greatest distance?"], r`All of a hoop's mass is at r = R.`, "review"),
  ],
});
