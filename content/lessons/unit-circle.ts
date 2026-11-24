import { activity, callout, def, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "unit-circle",
  title: "The unit circle",
  summary: "Define sine and cosine for any angle using the unit circle, measure angles in radians, and find exact values for special angles.",
  minutes: 35,
  objectives: [
    "Convert between degrees and radians.",
    "Define cos θ and sin θ as the coordinates of a point on the unit circle.",
    "Find exact trigonometric values for multiples of π/6 and π/4, with correct signs in each quadrant.",
  ],
  concepts: [
    { slug: "unit-circle", name: "Unit circle", description: "The circle of radius 1 centered at the origin, used to define trigonometric functions for all angles.", subject: "subj_math" },
    { slug: "radian-measure", name: "Radian measure", description: "Angle measure equal to arc length on a circle of radius 1.", subject: "subj_math" },
  ],
  formulas: ["pythagorean-identity"],
  blocks: [
    def("Unit circle", r`The circle $x^2 + y^2 = 1$: radius 1, centered at the origin. Angles are measured from the positive x-axis, counterclockwise for positive angles.`),
    def("Radian", r`The measure of an angle that cuts off an arc of length 1 on the unit circle. A full turn is the circumference $2\pi$, so $360° = 2\pi$ radians and $180° = \pi$.`),
    formula(r`\text{radians} = \text{degrees} \times \frac{\pi}{180}`, "Converting angles"),
    text(r`For any angle $\theta$, the terminal side meets the unit circle at one point. Its coordinates define the two basic trigonometric functions: $\cos\theta$ is the x-coordinate and $\sin\theta$ is the y-coordinate. This works for every angle, not just acute angles in right triangles, and it agrees with SOH CAH TOA because the hypotenuse here is 1.`),
    formula(r`(\cos\theta,\ \sin\theta), \qquad \tan\theta = \frac{\sin\theta}{\cos\theta}`, "Point on the unit circle", r`$\tan\theta$ is undefined when $\cos\theta = 0$, at $\theta = \frac{\pi}{2} + k\pi$.`),
    example(r`Find exact values at $\theta = \frac{\pi}{6}$ (30°)`, [
      [r`\text{30-60-90 triangle with hypotenuse } 1`, "Drop a perpendicular from the point to the x-axis."],
      [r`\text{short leg} = \tfrac{1}{2},\ \text{long leg} = \tfrac{\sqrt{3}}{2}`, "The short leg is opposite the 30° angle."],
      [r`\cos\tfrac{\pi}{6} = \tfrac{\sqrt{3}}{2},\quad \sin\tfrac{\pi}{6} = \tfrac{1}{2}`, "x is the horizontal leg, y the vertical leg."],
    ], r`$\left(\tfrac{\sqrt{3}}{2}\right)^2 + \left(\tfrac{1}{2}\right)^2 = \tfrac{3}{4} + \tfrac{1}{4} = 1$, so the point is on the unit circle.`),
    example(r`Find $\sin\frac{5\pi}{4}$ and $\cos\frac{5\pi}{4}$`, [
      [r`\tfrac{5\pi}{4} = \pi + \tfrac{\pi}{4}`, "The angle is in Quadrant III, 45° past the negative x-axis."],
      [r`\text{reference angle } \tfrac{\pi}{4}:\ \tfrac{\sqrt{2}}{2},\ \tfrac{\sqrt{2}}{2}`, "Same size coordinates as 45°."],
      [r`\cos\tfrac{5\pi}{4} = -\tfrac{\sqrt{2}}{2},\quad \sin\tfrac{5\pi}{4} = -\tfrac{\sqrt{2}}{2}`, "In Quadrant III both x and y are negative."],
    ]),
    callout("tip", "Signs by quadrant", r`Quadrant I: all positive. II: sine positive. III: tangent positive. IV: cosine positive. Every other value in that quadrant is negative.`),
    callout("application", "Where this shows up", r`Anything that goes around in circles traces sine and cosine: the height of a seat on a Ferris wheel, alternating current, sound waves, and the position of a planet in a circular orbit.`),
    activity("unit-circle", { title: "Rotate the angle", params: { degrees: true } }),
    callout("tip", "Investigate", r`Find two angles between 0 and $2\pi$ where $\sin\theta = \tfrac{1}{2}$. Why are there two? Where is $\tan\theta$ undefined, and what happens to the tangent segment as you approach it?`, "experiment"),
    activity("unit-circle", {
      title: "Walkthrough: sine and cosine as coordinates",
      steps: [
        { title: "Start at 0", body: "At 0 rad the point is (1, 0): cos 0 = 1 and sin 0 = 0.", params: { angle: 0 } },
        { title: "30°", body: "At π/6 the point is (√3/2, 1/2).", params: { angle: 30 } },
        { title: "Straight up", body: "At π/2 the point is (0, 1): cosine is 0 and sine is 1; tangent is undefined.", params: { angle: 90 } },
        { title: "Quadrant II", body: "At 2π/3 the x-coordinate is negative: cos = −1/2, sin = √3/2.", params: { angle: 120 } },
        { title: "Quadrant III", body: "At 5π/4 both coordinates are negative: (−√2/2, −√2/2).", params: { angle: 225 } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`Convert 135° to radians. Give a decimal to 3 places.`, 2.356, { tolerance: 0.001 }, [r`Multiply by $\frac{\pi}{180}$.`], r`$135 \cdot \frac{\pi}{180} = \frac{3\pi}{4} \approx 2.356$.`),
    num(1, r`Convert $\frac{5\pi}{6}$ radians to degrees.`, 150, { unit: "°" }, [r`Multiply by $\frac{180}{\pi}$.`], r`$\frac{5\pi}{6} \cdot \frac{180}{\pi} = 150°$.`),
    mc(2, r`What is $\cos\frac{2\pi}{3}$?`, [r`$\tfrac{1}{2}$`, r`$-\tfrac{1}{2}$`, r`$\tfrac{\sqrt{3}}{2}$`, r`$-\tfrac{\sqrt{3}}{2}$`], 1,
      [r`$\frac{2\pi}{3}$ is 120°, in Quadrant II, with reference angle 60°.`], r`$\cos 60° = \tfrac{1}{2}$ and cosine is negative in Quadrant II, so $\cos\frac{2\pi}{3} = -\tfrac{1}{2}$.`),
    num(2, r`Find $\sin\frac{7\pi}{6}$.`, -0.5, { tolerance: 0.0001 }, [r`$\frac{7\pi}{6} = \pi + \frac{\pi}{6}$: Quadrant III.`], r`Reference angle $\frac{\pi}{6}$ gives $\tfrac{1}{2}$; sine is negative in Quadrant III, so $-\tfrac{1}{2}$.`),
    mc(2, r`For which angle is $\tan\theta$ undefined?`, [r`$0$`, r`$\frac{\pi}{4}$`, r`$\frac{3\pi}{2}$`, r`$\pi$`], 2, [r`Where is $\cos\theta = 0$?`], r`At $\frac{3\pi}{2}$ the point is $(0, -1)$, so $\tan = \frac{-1}{0}$ is undefined.`),
    num(3, r`If $\sin\theta = \tfrac{3}{5}$ and $\theta$ is in Quadrant II, find $\cos\theta$.`, -0.8, { tolerance: 0.0001 },
      [r`Use $\sin^2\theta + \cos^2\theta = 1$.`, "Cosine is negative in Quadrant II."], r`$\cos^2\theta = 1 - \tfrac{9}{25} = \tfrac{16}{25}$, so $\cos\theta = -\tfrac{4}{5} = -0.8$.`, "review"),
    short(3, r`Find all $\theta$ in $[0, 2\pi)$ with $\cos\theta = \frac{\sqrt{2}}{2}$. Enter them in degrees, separated by a comma, smallest first.`, ["45,315", "45°,315°"],
      ["Cosine is positive in Quadrants I and IV."], r`Reference angle 45°: $\theta = 45°$ and $\theta = 360° - 45° = 315°$, i.e. $\frac{\pi}{4}$ and $\frac{7\pi}{4}$.`, "review"),
  ],
});
