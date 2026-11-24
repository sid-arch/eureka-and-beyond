import { activity, callout, def, example, lesson, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "vectors-in-plane",
  title: "Vectors in the plane",
  summary: "Represent vectors in component and magnitude-direction form, add and scale them, find unit vectors, and solve navigation and force problems.",
  minutes: 30,
  objectives: [
    "Write a vector in component form and find its magnitude and direction.",
    "Add, subtract and scale vectors geometrically and algebraically.",
    "Find unit vectors and resolve forces and velocities into components.",
  ],
  concepts: [
    { slug: "vectors", name: "Vectors", description: "Quantities with magnitude and direction, written in components.", subject: "subj_math" },
  ],
  blocks: [
    def("Vector", r`A quantity with magnitude and direction, drawn as an arrow. In component form $\mathbf{v} = \langle a, b \rangle = a\mathbf{i} + b\mathbf{j}$. Magnitude $|\mathbf{v}| = \sqrt{a^2 + b^2}$; direction angle $\theta$ with $\tan\theta = \frac{b}{a}$ (in the right quadrant).`),
    def("Operations", r`$\langle a, b \rangle + \langle c, d \rangle = \langle a + c, b + d \rangle$ (tip-to-tail). $k\langle a, b \rangle = \langle ka, kb \rangle$ scales the length by $|k|$ and reverses direction if $k < 0$. A unit vector in the direction of $\mathbf{v}$ is $\frac{\mathbf{v}}{|\mathbf{v}|}$.`),
    activity("vectors", { title: "Add vectors tip to tail", params: { ux: 4, uy: 1, vx: -1, vy: 3 } }),
    example(r`A plane flies at 300 km/h on a heading of $60^\circ$ (measured from east) in a wind of 40 km/h blowing toward the east. Find the ground velocity.`, [
      [r`\mathbf{p} = 300\langle\cos 60^\circ, \sin 60^\circ\rangle = \langle 150, 259.8 \rangle`, ""],
      [r`\mathbf{p} + \mathbf{w} = \langle 190, 259.8 \rangle`, ""],
      [r`|\cdot| \approx 321.9 \text{ km/h},\ \theta = \tan^{-1}\tfrac{259.8}{190} \approx 53.8^\circ`, ""],
    ]),
    callout("application", "Where this shows up", r`Physics treats forces, velocities and accelerations as vectors; game engines move characters with velocity vectors; GPS navigation combines vectors constantly.`),
  ],
  questions: [
    num(1, r`Find the magnitude of $\langle -6, 8 \rangle$.`, 10, {}, [], r`$\sqrt{36 + 64} = 10$.`),
    short(2, r`Find $2\langle 3, -1 \rangle - \langle 4, 5 \rangle$. Use the format <a,b>.`, ["<2,-7>", "⟨2,-7⟩"], [], r`$\langle 6 - 4, -2 - 5 \rangle = \langle 2, -7 \rangle$.`),
    short(2, r`Find the unit vector in the direction of $\langle 5, 12 \rangle$. Use the format <5/13,12/13>.`, ["<5/13,12/13>", "⟨5/13,12/13⟩"], [], r`Divide by 13.`),
    num(3, r`A force of 50 N acts at $30^\circ$ above horizontal. Find its horizontal component to the nearest tenth.`, 43.3, { unit: "N", tolerance: 0.06 }, [r`$50\cos 30^\circ$.`], r`$25\sqrt{3} \approx 43.3$ N.`, "review"),
  ],
});
