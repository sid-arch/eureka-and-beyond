import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "arc-length-radians",
  title: "Arc length and radian measure",
  summary: "Find arc lengths as a fraction of the circumference, define radians from arc length, and convert between degrees and radians.",
  minutes: 25,
  objectives: [
    "Compute arc length from the central angle and radius.",
    "Define a radian and explain why 180° = π radians.",
    "Convert between degrees and radians and use s = rθ.",
  ],
  concepts: [
    { slug: "radian-measure", name: "Radian measure", description: "Measuring angles by the ratio of arc length to radius; π radians = 180°.", subject: "subj_math" },
  ],
  formulas: ["arc-length-sector", "circle-area"],
  blocks: [
    text(r`An arc is a fraction of the whole circle. A $90^\circ$ arc is $\frac{90}{360} = \frac{1}{4}$ of the circle, so its length is $\frac{1}{4}$ of the circumference $2\pi r$.`),
    formula(r`s = \frac{\theta}{360^\circ} \cdot 2\pi r`, "Arc length (degrees)"),
    example(r`Find the length of a $150^\circ$ arc in a circle of radius 6 cm.`, [
      [r`s = \tfrac{150}{360} \cdot 2\pi(6) = \tfrac{5}{12} \cdot 12\pi = 5\pi`, ""],
      [r`s \approx 15.71 \text{ cm}`, ""],
    ]),
    def("Radian", r`One radian is the central angle whose arc length equals the radius. Since the whole circumference is $2\pi$ radii, a full turn is $2\pi$ radians: $360^\circ = 2\pi$, so $180^\circ = \pi$ radians.`),
    text(r`Convert degrees to radians by multiplying by $\frac{\pi}{180}$, and radians to degrees by multiplying by $\frac{180}{\pi}$. For example $60^\circ = \frac{\pi}{3}$ and $\frac{3\pi}{4} = 135^\circ$. In radians, arc length is simply $s = r\theta$.`),
    activity("circle-angles", { title: "Degrees, radians and arc length", params: { arc: 60, p: 220, r: 1 } }),
    callout("tip", "Try this", r`With radius 1, the arc length equals the angle in radians. Set the arc to $180^\circ$: the arc length is $\pi \approx 3.14$. Which arc gives an arc length of exactly 1 (about $57.3^\circ$)?`, "experiment"),
    example(r`A wheel of radius 0.3 m turns through 5 radians. How far does a point on the rim travel?`, [
      [r`s = r\theta = 0.3 \cdot 5 = 1.5 \text{ m}`, ""],
    ]),
    callout("warning", "Match the units", r`$s = r\theta$ works only with $\theta$ in radians. With degrees, use the fraction-of-circumference formula.`),
    callout("application", "Where this shows up", r`Radians are the natural unit in calculus, physics (angular speed in rad/s) and programming: most code libraries' sin and cos functions expect radians.`),
  ],
  questions: [
    num(1, r`Find the length of a $90^\circ$ arc of a circle with radius 8, to the nearest hundredth.`, 12.57, { tolerance: 0.006 }, [r`$\frac{1}{4} \cdot 16\pi$.`], r`$4\pi \approx 12.57$.`),
    num(2, r`Convert $225^\circ$ to radians, as a decimal to the nearest hundredth.`, 3.93, { tolerance: 0.006 }, [r`$225 \cdot \frac{\pi}{180} = \frac{5\pi}{4}$.`], r`$\frac{5\pi}{4} \approx 3.93$.`),
    num(2, r`Convert $\frac{2\pi}{3}$ radians to degrees.`, 120, { unit: "°" }, [], r`$\frac{2\pi}{3} \cdot \frac{180}{\pi} = 120^\circ$.`),
    num(2, r`An arc of a circle with radius 4 has length 10. What is the central angle in radians?`, 2.5, {}, [r`$\theta = s / r$.`], r`$10 / 4 = 2.5$ radians.`),
    mc(3, r`About how many degrees is 1 radian?`, ["1°", "3.14°", "57.3°", "90°"], 2, [r`$\frac{180}{\pi}$.`], r`$180 / \pi \approx 57.3^\circ$.`, "review"),
  ],
});
