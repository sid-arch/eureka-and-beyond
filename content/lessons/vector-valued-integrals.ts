import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "vector-valued-integrals",
  title: "Integrating vector-valued functions",
  summary: "Integrate vector-valued functions component by component, and recover position from velocity using an initial position.",
  minutes: 25,
  objectives: [
    "Integrate ⟨f(t), g(t)⟩ component by component, with a vector constant.",
    "Find r(b) = r(a) + ∫ₐᵇ v(t) dt.",
    "Find velocity from acceleration the same way.",
  ],
  concepts: [
    { slug: "parametric-curves", name: "Parametric curves", description: "Curves traced by (x(t), y(t)) as a parameter t varies.", subject: "subj_math" },
    { slug: "vectors", name: "Vectors", description: "Quantities with magnitude and direction, written in component form.", subject: "subj_math" },
  ],
  blocks: [
    def("Component by component", r`$\int \langle f(t), g(t)\rangle\,dt = \left\langle \int f(t)\,dt, \int g(t)\,dt \right\rangle + \mathbf{C}$, and $\int_a^b \mathbf{v}(t)\,dt = \mathbf{r}(b) - \mathbf{r}(a)$ (displacement).`),
    example(r`$\mathbf{v}(t) = \langle 1, 2t\rangle$, $\mathbf{r}(0) = \langle 2, 1\rangle$. Find $\mathbf{r}(3)$.`, [
      [r`\int_0^3 \langle 1, 2t\rangle\,dt = \langle 3, 9\rangle`, "Displacement."],
      [r`\mathbf{r}(3) = \langle 2, 1\rangle + \langle 3, 9\rangle = \langle 5, 10\rangle`, ""],
    ]),
    callout("application", "Where this shows up", r`Drones and submarines estimate their position by integrating measured velocity vectors from a known start (dead reckoning).`),
  ],
  questions: [
    mc(1, r`$\int \langle 2t, \cos t\rangle\,dt$ is…`, [r`$\langle t^2, \sin t\rangle + \mathbf{C}$`, r`$\langle 2, -\sin t\rangle + \mathbf{C}$`, r`$\langle t^2, -\sin t\rangle + \mathbf{C}$`, r`$t^2 + \sin t + C$`], 0, [], r`Integrate each component.`),
    num(2, r`$\mathbf{v}(t) = \langle 6t, 8t\rangle$, $\mathbf{r}(0) = \langle 1, 0\rangle$. Find the $x$-coordinate of $\mathbf{r}(2)$.`, 13, {}, [], r`$1 + [3t^2]_0^2 = 13$.`),
    num(2, r`For the same motion, find the $y$-coordinate of $\mathbf{r}(2)$.`, 16, {}, [], r`$0 + [4t^2]_0^2 = 16$.`),
    num(3, r`$\mathbf{a}(t) = \langle 0, -10\rangle$, $\mathbf{v}(0) = \langle 4, 20\rangle$. At what time is the vertical velocity 0?`, 2, {}, [], r`$v_y = 20 - 10t = 0$.`, "review"),
  ],
});
