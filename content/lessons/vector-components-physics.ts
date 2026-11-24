import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "vector-components-physics",
  title: "Vector components",
  summary: "Resolve vectors into perpendicular components with sine and cosine, and rebuild a resultant from components to find its magnitude and direction.",
  minutes: 30,
  objectives: [
    "Resolve a vector: Aₓ = A cos θ, A_y = A sin θ.",
    "Add vectors by adding components.",
    "Find magnitude and direction from components.",
  ],
  concepts: [
    { slug: "vectors", name: "Vectors", description: "Quantities with magnitude and direction, written in component form.", subject: "subj_math" },
  ],
  blocks: [
    def("Components", r`A vector of size $A$ at angle $\theta$ above the $+x$-axis has $A_x = A\cos\theta$ and $A_y = A\sin\theta$. Going back: $A = \sqrt{A_x^2 + A_y^2}$, $\theta = \tan^{-1}\frac{A_y}{A_x}$ (check the quadrant).`),
    example(r`A 50 N pull at 30° above horizontal`, [
      [r`F_x = 50\cos 30° \approx 43.3\ \text{N}`, ""],
      [r`F_y = 50\sin 30° = 25\ \text{N}`, ""],
    ]),
    example(r`A plane flies 200 km/h east in a 50 km/h wind blowing north`, [
      [r`v = \sqrt{200^2 + 50^2} \approx 206\ \text{km/h}`, ""],
      [r`\theta = \tan^{-1}\tfrac{50}{200} \approx 14.0° \text{ north of east}`, ""],
    ]),
    activity("vectors", { title: "Build a vector from components", params: { ux: 4, uy: 0, vx: 0, vy: 1 } }),
    callout("application", "Where this shows up", r`Engineers resolve cable tensions on bridges into horizontal and vertical parts; video games move characters by adding velocity components each frame.`),
  ],
  questions: [
    num(1, r`Find the horizontal component of a 20 m/s velocity at 60° above horizontal.`, 10, { tolerance: 0.01, unit: "m/s" }, [], r`$20\cos 60° = 10$.`),
    num(2, r`Components are $A_x = 6$ and $A_y = 8$. Find the magnitude.`, 10, {}, [], r`$\sqrt{36 + 64}$.`),
    num(2, r`For those components, find the angle above the $+x$-axis, in degrees, to one decimal place.`, 53.1, { tolerance: 0.1, unit: "°" }, [], r`$\tan^{-1}\frac{8}{6} \approx 53.1°$.`),
    mc(3, r`A vector has $A_x = -3$ and $A_y = 3$. Its direction is…`, ["45°", "135°", "−45°", "225°"], 1, [], r`Second quadrant: $180° - 45°$.`, "review"),
  ],
});
