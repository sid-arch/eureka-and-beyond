import { activity, callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polar-coordinates",
  title: "Polar coordinates",
  summary: "Plot points in polar coordinates, convert points and equations between polar and rectangular form, and recognize that a point has many polar names.",
  minutes: 30,
  objectives: [
    "Plot (r, θ), including negative r.",
    "Convert points between polar and rectangular coordinates.",
    "Convert simple equations between polar and rectangular form.",
  ],
  concepts: [
    { slug: "polar-coordinates", name: "Polar coordinates", description: "Locating points by distance r from the pole and angle θ.", subject: "subj_math" },
  ],
  formulas: ["polar-conversion"],
  blocks: [
    def("Polar coordinates", r`$(r, \theta)$ means: face direction $\theta$ from the positive x-axis and go $r$ units (backwards if $r < 0$). Every point has infinitely many names: $(r, \theta) = (r, \theta + 2\pi) = (-r, \theta + \pi)$.`),
    def("Conversions", r`$x = r\cos\theta$, $y = r\sin\theta$; $r^2 = x^2 + y^2$, $\tan\theta = \frac{y}{x}$ (choose $\theta$ in the right quadrant).`),
    example(r`Convert $\left(4, \tfrac{2\pi}{3}\right)$ to rectangular and $(-3, 3)$ to polar`, [
      [r`x = 4\cos\tfrac{2\pi}{3} = -2,\ y = 4\sin\tfrac{2\pi}{3} = 2\sqrt{3}`, ""],
      [r`r = \sqrt{18} = 3\sqrt{2},\ \theta = \tfrac{3\pi}{4}`, "Quadrant II, so not −π/4."],
    ]),
    example(r`Convert $r = 6\sin\theta$ to rectangular form`, [
      [r`r^2 = 6r\sin\theta \Rightarrow x^2 + y^2 = 6y`, "Multiply both sides by r."],
      [r`x^2 + (y - 3)^2 = 9`, "A circle with center (0, 3) and radius 3."],
    ]),
    activity("polar-graph", { title: "Trace a polar curve", params: { kind: "circle", b: 2 } }),
    callout("application", "Where this shows up", r`Radar, sonar and air traffic control report positions as distance and bearing; antenna radiation patterns and spiral galaxies are naturally described in polar form.`),
  ],
  questions: [
    short(1, r`Convert $(2, \pi)$ to rectangular. Enter as (x,y).`, ["(-2,0)"], [], r`$(-2, 0)$.`),
    num(2, r`Convert $(5, -5)$ to polar: find $r$ to two decimals.`, 7.07, { tolerance: 0.006 }, [], r`$5\sqrt{2} \approx 7.07$, with $\theta = -\frac{\pi}{4}$ (or $\frac{7\pi}{4}$).`),
    mc(2, r`Which is another name for $\left(3, \frac{\pi}{6}\right)$?`, [r`$\left(-3, \frac{\pi}{6}\right)$`, r`$\left(-3, \frac{7\pi}{6}\right)$`, r`$\left(3, -\frac{\pi}{6}\right)$`, r`$\left(3, \frac{7\pi}{6}\right)$`], 1, [r`$(-r, \theta + \pi)$.`], r`$\left(-3, \frac{7\pi}{6}\right)$.`),
    short(3, r`Convert $r = 4$ to rectangular form.`, ["x^2+y^2=16"], [], r`A circle: $x^2 + y^2 = 16$.`, "review"),
  ],
});
