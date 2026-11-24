import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parametric-derivatives",
  title: "Defining and differentiating parametric equations",
  summary: "Describe curves with x(t) and y(t), compute dy/dx = (dy/dt)/(dx/dt), and find tangent lines and horizontal and vertical tangents.",
  minutes: 30,
  objectives: [
    "Read a parametric curve's direction and position from x(t) and y(t).",
    "Compute dy/dx = (dy/dt)/(dx/dt).",
    "Find horizontal tangents (dy/dt = 0) and vertical tangents (dx/dt = 0).",
  ],
  concepts: [
    { slug: "parametric-curves", name: "Parametric curves", description: "Curves traced by (x(t), y(t)) as a parameter t varies.", subject: "subj_math" },
  ],
  blocks: [
    def("Slope of a parametric curve", r`If $x = x(t)$ and $y = y(t)$ are differentiable and $\frac{dx}{dt} \ne 0$, then $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$. Horizontal tangent: $\frac{dy}{dt} = 0$, $\frac{dx}{dt} \ne 0$. Vertical tangent: $\frac{dx}{dt} = 0$, $\frac{dy}{dt} \ne 0$.`),
    example(r`$x = t^2$, $y = t^3 - 3t$`, [
      [r`\frac{dy}{dx} = \frac{3t^2 - 3}{2t}`, ""],
      [r`t = 2:\ \text{point } (4, 2),\ \text{slope } \tfrac{9}{4}`, r`Tangent: $y - 2 = \frac{9}{4}(x - 4)$.`],
      [r`\text{horizontal at } t = \pm 1;\ \text{vertical at } t = 0`, ""],
    ]),
    callout("tip", "Eliminating t", r`Sometimes you can remove $t$: $x = \cos t$, $y = \sin t$ gives $x^2 + y^2 = 1$. But the parametric form also tells you direction and speed, which the $xy$-equation loses.`),
    callout("application", "Where this shows up", r`A projectile's path is parametric: $x = v_0\cos\theta\,t$, $y = v_0\sin\theta\,t - 4.9t^2$. The slope $\frac{dy}{dx}$ gives its direction of travel at each moment.`),
  ],
  questions: [
    num(1, r`$x = \cos t$, $y = \sin t$. Find $\frac{dy}{dx}$ at $t = \frac{\pi}{4}$.`, -1, {}, [], r`$\frac{\cos t}{-\sin t} = -1$.`),
    num(2, r`$x = 3t + 1$, $y = t^2 - 4t$. Find $\frac{dy}{dx}$ at $t = 5$.`, 2, {}, [], r`$\frac{2t - 4}{3} = 2$.`),
    num(2, r`For $x = 3t + 1$, $y = t^2 - 4t$, at what $t$ is the tangent horizontal?`, 2, {}, [], r`$2t - 4 = 0$.`),
    mc(3, r`For $x = t^3 - 3t$, $y = t^2$, where is the tangent vertical?`, ["t = 0", "t = ±1", "t = ±√3", "nowhere"], 1, [], r`$\frac{dx}{dt} = 3t^2 - 3 = 0$ and $\frac{dy}{dt} = 2t \ne 0$ there.`, "review"),
  ],
});
