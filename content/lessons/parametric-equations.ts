import { activity, callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parametric-equations",
  title: "Parametric equations",
  summary: "Graph curves given by x(t) and y(t), eliminate the parameter, and model motion such as projectiles with parametric equations.",
  minutes: 30,
  objectives: [
    "Graph a parametric curve and show its direction of motion.",
    "Eliminate the parameter to find a rectangular equation.",
    "Model projectile motion and circular motion parametrically.",
  ],
  concepts: [
    { slug: "parametric-equations", name: "Parametric equations", description: "Describing x and y separately as functions of a parameter, often time.", subject: "subj_math" },
  ],
  blocks: [
    def("Parametric equations", r`$x = f(t)$, $y = g(t)$ give a point for each value of the parameter $t$. As $t$ increases, the point traces a curve in a definite direction, so parametric equations describe where and when.`),
    example(r`Eliminate the parameter: $x = 2t + 1$, $y = t^2$`, [
      [r`t = \tfrac{x - 1}{2}`, ""],
      [r`y = \left(\tfrac{x - 1}{2}\right)^2`, "A parabola traced left to right as t increases."],
    ]),
    example(r`Eliminate the parameter: $x = 3\cos t$, $y = 3\sin t$, $0 \le t < 2\pi$`, [
      [r`x^2 + y^2 = 9\cos^2 t + 9\sin^2 t = 9`, "Pythagorean identity."],
      [r`\text{circle of radius 3, counterclockwise}`, ""],
    ]),
    activity("projectile", { title: "A projectile is a parametric curve" }),
    callout("tip", "Try this", r`The projectile's position is $x = v\cos\theta \cdot t$ and $y = v\sin\theta \cdot t - \frac{1}{2}gt^2$. Each moment $t$ gives one point; the readouts show the time of flight.`, "experiment"),
    example(r`A ball is kicked at 20 m/s at $30^\circ$. When does it land?`, [
      [r`y(t) = 10t - 4.9t^2`, r`$20\sin 30^\circ = 10$.`],
      [r`t(10 - 4.9t) = 0 \Rightarrow t \approx 2.04 \text{ s}`, ""],
      [r`x(2.04) = 20\cos 30^\circ \cdot 2.04 \approx 35.3 \text{ m}`, ""],
    ]),
    callout("application", "Where this shows up", r`Animation paths, robot arm trajectories, planetary motion and the Bézier curves used in fonts and vector graphics are all parametric.`),
  ],
  questions: [
    short(1, r`Eliminate the parameter: $x = t + 3$, $y = 2t$. Write y in terms of x.`, ["y=2x-6"], [], r`$t = x - 3$, $y = 2x - 6$.`),
    mc(2, r`$x = \cos t$, $y = \sin t$ for $0 \le t \le \pi$ traces…`, ["a full circle", "the upper half of the unit circle", "a line", "a parabola"], 1, [], r`$y \ge 0$: the upper semicircle, from (1, 0) to (−1, 0).`),
    num(2, r`For $x = 4t$, $y = 16t - 5t^2$, find the maximum height y.`, 12.8, {}, [r`Vertex at $t = 1.6$.`], r`$y(1.6) = 25.6 - 12.8 = 12.8$.`),
    num(3, r`A projectile has $x = 30t$, $y = 40t - 4.9t^2$ (meters). How far horizontally does it travel before landing, to the nearest meter?`, 245, { unit: "m", tolerance: 0.5 }, [r`Land when $t = 40/4.9$.`], r`$t \approx 8.163$, so $x \approx 244.9 \approx 245$ m.`, "review"),
  ],
});
