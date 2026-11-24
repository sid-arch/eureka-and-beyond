import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "vector-valued-derivatives",
  title: "Defining and differentiating vector-valued functions",
  summary: "Describe motion with position vectors r(t) = ⟨x(t), y(t)⟩, and find velocity, speed and acceleration by differentiating each component.",
  minutes: 25,
  objectives: [
    "Write position as a vector-valued function.",
    "Compute v(t) = r′(t) and a(t) = r″(t) component by component.",
    "Compute speed |v(t)| and interpret the direction of v.",
  ],
  concepts: [
    { slug: "parametric-curves", name: "Parametric curves", description: "Curves traced by (x(t), y(t)) as a parameter t varies.", subject: "subj_math" },
    { slug: "vectors", name: "Vectors", description: "Quantities with magnitude and direction, written in component form.", subject: "subj_math" },
  ],
  blocks: [
    def("Vector-valued function", r`$\mathbf{r}(t) = \langle x(t), y(t)\rangle$. Velocity $\mathbf{v}(t) = \langle x'(t), y'(t)\rangle$ points along the path; speed is $|\mathbf{v}(t)| = \sqrt{x'(t)^2 + y'(t)^2}$; acceleration $\mathbf{a}(t) = \langle x''(t), y''(t)\rangle$.`),
    example(r`$\mathbf{r}(t) = \langle t^2, \sin t\rangle$`, [
      [r`\mathbf{v}(t) = \langle 2t, \cos t\rangle`, ""],
      [r`\mathbf{a}(t) = \langle 2, -\sin t\rangle`, ""],
      [r`|\mathbf{v}(0)| = |\langle 0, 1\rangle| = 1`, "Speed at t = 0."],
    ]),
    callout("application", "Where this shows up", r`Flight trackers display an aircraft's velocity vector: its direction is the heading and its length is the ground speed.`),
  ],
  questions: [
    num(1, r`$\mathbf{r}(t) = \langle 3t, t^2\rangle$. Find the speed at $t = 2$.`, 5, {}, [], r`$\mathbf{v}(2) = \langle 3, 4\rangle$.`),
    mc(2, r`$\mathbf{r}(t) = \langle e^t, t^3\rangle$. Find $\mathbf{a}(1)$.`, [r`$\langle e, 3\rangle$`, r`$\langle e, 6\rangle$`, r`$\langle 1, 6\rangle$`, r`$\langle e, 1\rangle$`], 1, [], r`$\mathbf{a} = \langle e^t, 6t\rangle$.`),
    num(2, r`$\mathbf{r}(t) = \langle \cos 2t, \sin 2t\rangle$. Find the speed.`, 2, {}, [], r`$|\langle -2\sin 2t, 2\cos 2t\rangle| = 2$.`),
    mc(3, r`At $t = 1$, $\mathbf{v} = \langle -3, 0\rangle$. The particle is moving…`, ["up", "down", "left", "right"], 2, [], r`Negative $x$-component, no vertical motion.`, "review"),
  ],
});
