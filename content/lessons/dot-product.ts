import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "dot-product",
  title: "The dot product",
  summary: "Compute dot products, find the angle between vectors, test for orthogonality, find projections and compute work.",
  minutes: 30,
  objectives: [
    "Compute u · v from components.",
    "Find the angle between two vectors and test for orthogonality.",
    "Find the projection of one vector onto another and compute work W = F · d.",
  ],
  concepts: [
    { slug: "vectors", name: "Vectors", description: "Quantities with magnitude and direction, written in components.", subject: "subj_math" },
  ],
  formulas: ["dot-product"],
  blocks: [
    def("Dot product", r`$\mathbf{u}\cdot\mathbf{v} = u_1v_1 + u_2v_2$, a number (scalar). Geometrically, $\mathbf{u}\cdot\mathbf{v} = |\mathbf{u}||\mathbf{v}|\cos\theta$, so $\cos\theta = \frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{u}||\mathbf{v}|}$. Vectors are orthogonal exactly when $\mathbf{u}\cdot\mathbf{v} = 0$.`),
    activity("vectors", { title: "Watch the dot product and angle", params: { ux: 4, uy: 0, vx: 2, vy: 3 } }),
    callout("tip", "Try this", r`Switch to "Dot product" view. Rotate v until the dot product is 0: the angle reads 90°. When is the dot product negative?`, "experiment"),
    example(r`Find the angle between $\langle 2, 1 \rangle$ and $\langle -1, 3 \rangle$`, [
      [r`\mathbf{u}\cdot\mathbf{v} = -2 + 3 = 1`, ""],
      [r`\cos\theta = \frac{1}{\sqrt{5}\sqrt{10}} = \frac{1}{\sqrt{50}} \approx 0.1414`, ""],
      [r`\theta \approx 81.9^\circ`, ""],
    ]),
    def("Projection and work", r`The projection of $\mathbf{v}$ onto $\mathbf{u}$ is $\text{proj}_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{u}|^2}\mathbf{u}$. Work done by a constant force $\mathbf{F}$ along displacement $\mathbf{d}$ is $W = \mathbf{F}\cdot\mathbf{d}$.`),
    callout("application", "Where this shows up", r`Work in physics, lighting calculations in 3D graphics (brightness depends on the angle between light and surface), and similarity scores in search engines all use dot products.`),
  ],
  questions: [
    num(1, r`Compute $\langle 3, -2 \rangle \cdot \langle 4, 5 \rangle$.`, 2, {}, [], r`$12 - 10 = 2$.`),
    mc(2, r`Which pair is orthogonal?`, [r`$\langle 1, 2 \rangle, \langle 2, 1 \rangle$`, r`$\langle 3, -6 \rangle, \langle 4, 2 \rangle$`, r`$\langle 1, 1 \rangle, \langle 1, 2 \rangle$`, r`$\langle 0, 1 \rangle, \langle 1, 1 \rangle$`], 1, [], r`$12 - 12 = 0$.`),
    num(2, r`Find the angle between $\langle 1, 0 \rangle$ and $\langle 1, 1 \rangle$ in degrees.`, 45, { unit: "°" }, [], r`$\cos\theta = \frac{1}{\sqrt{2}}$.`),
    num(3, r`A 20 N force $\mathbf{F} = \langle 16, 12 \rangle$ moves an object along $\mathbf{d} = \langle 5, 0 \rangle$ meters. How much work is done, in joules?`, 80, { unit: "J" }, [], r`$16 \cdot 5 + 12 \cdot 0 = 80$ J.`, "review"),
  ],
});
