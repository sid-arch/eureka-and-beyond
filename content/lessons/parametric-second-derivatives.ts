import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parametric-second-derivatives",
  title: "Second derivatives of parametric equations",
  summary: "Compute d²y/dx² for parametric curves by differentiating dy/dx with respect to t and dividing by dx/dt, and use it for concavity.",
  minutes: 25,
  objectives: [
    "Compute d²y/dx² = (d/dt [dy/dx]) / (dx/dt).",
    "Avoid the common error d²y/dx² = (d²y/dt²)/(d²x/dt²).",
    "Determine concavity of a parametric curve.",
  ],
  concepts: [
    { slug: "parametric-curves", name: "Parametric curves", description: "Curves traced by (x(t), y(t)) as a parameter t varies.", subject: "subj_math" },
  ],
  blocks: [
    def("Second derivative", r`$\frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right) = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt}$, by the Chain Rule.`),
    example(r`$x = t^2$, $y = t^3 - 3t$`, [
      [r`\frac{dy}{dx} = \tfrac{3}{2}t - \tfrac{3}{2}t^{-1}`, ""],
      [r`\frac{d}{dt}\frac{dy}{dx} = \tfrac{3}{2} + \tfrac{3}{2}t^{-2}`, ""],
      [r`\frac{d^2y}{dx^2} = \frac{\tfrac{3}{2} + \tfrac{3}{2}t^{-2}}{2t}`, "Divide by dx/dt = 2t."],
      [r`t = 1:\ \tfrac{3}{2} > 0`, "Concave up there."],
    ]),
    callout("warning", "Not the ratio of second derivatives", r`$\frac{d^2y}{dx^2} \ne \frac{y''(t)}{x''(t)}$. For $x = t^2$, $y = t^3 - 3t$ at $t = 1$ that ratio is 3, not the correct $\frac{3}{2}$.`),
    callout("application", "Where this shows up", r`Concavity of a parametric path tells which way a vehicle is turning, which matters in designing safe road and track curves.`),
  ],
  questions: [
    num(1, r`$x = t$, $y = t^3$. Find $\frac{d^2y}{dx^2}$ at $t = 2$.`, 12, {}, [], r`With $x = t$, it's just $6t$.`),
    num(2, r`$x = 2t$, $y = t^2$. Find $\frac{d^2y}{dx^2}$.`, 0.5, { tolerance: 0.001 }, [], r`$\frac{dy}{dx} = t$; $\frac{1}{2}$.`),
    num(2, r`$x = \cos t$, $y = \sin t$. Find $\frac{d^2y}{dx^2}$ at $t = \frac{\pi}{2}$.`, -1, {}, [r`$\frac{dy}{dx} = -\cot t$.`], r`$\frac{\csc^2 t}{-\sin t} = -\csc^3 t = -1$: the top of the circle is concave down.`),
    mc(3, r`If $\frac{d}{dt}\left(\frac{dy}{dx}\right) > 0$ and $\frac{dx}{dt} < 0$, the curve is…`, ["concave up", "concave down", "linear", "can't tell"], 1, [], r`Positive divided by negative.`, "review"),
  ],
});
