import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sine-cosine-tangent",
  title: "Sine, cosine and tangent",
  summary: "Define sine, cosine and tangent for any angle in standard position from a point on its terminal ray, and interpret tangent as the slope of that ray.",
  minutes: 25,
  objectives: [
    "Place angles in standard position and find coterminal angles.",
    "Compute sin, cos and tan from a point (x, y) on the terminal ray with r = √(x² + y²).",
    "Interpret tan θ as the slope of the terminal ray and use quadrant signs.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  formulas: ["trig-ratios"],
  blocks: [
    def("Angles in standard position", r`An angle in standard position has its vertex at the origin and its initial ray on the positive $x$-axis. Counterclockwise rotation is positive. Angles that differ by a multiple of $2\pi$ (or 360°) are coterminal.`),
    def("Trig functions from a point", r`If $(x, y)$ is on the terminal ray and $r = \sqrt{x^2 + y^2}$, then $\sin\theta = \frac{y}{r}$, $\cos\theta = \frac{x}{r}$ and $\tan\theta = \frac{y}{x}$. On the unit circle ($r = 1$), the point is $(\cos\theta, \sin\theta)$.`),
    def("Tangent as slope", r`$\tan\theta = \frac{y}{x} = \frac{\sin\theta}{\cos\theta}$ is the slope of the terminal ray. It's undefined where the ray is vertical ($\cos\theta = 0$).`),
    example(r`The terminal ray passes through $(-3, 4)$`, [
      [r`r = \sqrt{9 + 16} = 5`, ""],
      [r`\sin\theta = \tfrac{4}{5},\ \cos\theta = -\tfrac{3}{5},\ \tan\theta = -\tfrac{4}{3}`, "Quadrant II: sine positive, cosine and tangent negative."],
    ]),
    activity("unit-circle", { title: "Sine, cosine and tangent on the circle", params: { degrees: true } }),
    callout("tip", "Signs by quadrant", r`Quadrant I: all positive. II: sine positive. III: tangent positive. IV: cosine positive.`, "experiment"),
    callout("application", "Where this shows up", r`Navigation and robotics describe directions as angles from a reference axis and convert them to $x$ and $y$ components with cosine and sine.`),
  ],
  questions: [
    num(2, r`The terminal ray passes through $(5, -12)$. Find $\sin\theta$ to three decimal places.`, -0.923, { tolerance: 0.001 }, [r`$r = 13$.`], r`$-\frac{12}{13} \approx -0.923$.`),
    num(1, r`What is $\tan 135°$?`, -1, {}, ["Slope of the ray through (−1, 1)."], r`Slope $\frac{1}{-1} = -1$.`),
    mc(1, r`In which quadrant are both $\sin\theta < 0$ and $\tan\theta > 0$?`, ["I", "II", "III", "IV"], 2, [], r`Quadrant III: $x$ and $y$ both negative, so $\frac{y}{x} > 0$.`),
    num(2, r`Find the angle between 0° and 360° that is coterminal with −150°.`, 210, { unit: "°" }, [], r`$-150 + 360 = 210$.`),
    mc(3, r`For which angle is $\tan\theta$ undefined?`, ["0", r`$\frac{\pi}{4}$`, r`$\frac{3\pi}{2}$`, r`$\pi$`], 2, [], r`At $\frac{3\pi}{2}$ the ray is vertical, so $\cos\theta = 0$.`, "review"),
  ],
});
