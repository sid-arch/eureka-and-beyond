import { activity, callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-right-triangles",
  title: "Solving right triangles",
  summary: "Use inverse trigonometric functions to find acute angles, and solve right triangles completely from two given parts.",
  minutes: 30,
  objectives: [
    "Use inverse sine, cosine and tangent to find an acute angle from a ratio.",
    "Solve a right triangle: find all missing sides and angles from two given parts (including one side).",
    "Check solutions with the Pythagorean theorem and the angle sum.",
  ],
  concepts: [
    { slug: "trigonometric-ratios", name: "Trigonometric ratios", description: "Sine, cosine and tangent: ratios of sides in a right triangle.", subject: "subj_math" },
    { slug: "inverse-trig", name: "Inverse trigonometric functions", description: "Functions that return an angle from a trigonometric ratio.", subject: "subj_math" },
  ],
  formulas: ["trig-ratios", "pythagorean-theorem"],
  blocks: [
    def("Inverse trig", r`If $\tan A = 0.75$, then $A = \tan^{-1}(0.75) \approx 36.87^\circ$. $\sin^{-1}$, $\cos^{-1}$ and $\tan^{-1}$ undo the ratios and return an angle. The $-1$ is not an exponent: $\tan^{-1} x \ne \frac{1}{\tan x}$.`),
    text(r`To solve a right triangle means finding all three sides and both acute angles. You need two pieces of information besides the right angle, and at least one must be a side. Then: use a trig ratio or the Pythagorean theorem for sides, inverse trig for angles, and the fact that the acute angles sum to $90^\circ$.`),
    example(r`Solve the right triangle with legs $a = 7$ and $b = 24$`, [
      [r`c = \sqrt{49 + 576} = 25`, "Hypotenuse."],
      [r`A = \tan^{-1}\!\left(\tfrac{7}{24}\right) \approx 16.26^\circ`, "Angle opposite a."],
      [r`B = 90^\circ - 16.26^\circ = 73.74^\circ`, ""],
    ]),
    example(r`Solve the right triangle with $A = 38^\circ$ and hypotenuse $c = 15$`, [
      [r`B = 52^\circ`, ""],
      [r`a = 15\sin 38^\circ \approx 9.23`, "Opposite A."],
      [r`b = 15\cos 38^\circ \approx 11.82`, "Adjacent to A."],
    ], r`Check: $9.23^2 + 11.82^2 \approx 85.2 + 139.7 = 224.9 \approx 15^2 = 225$. ✓`),
    activity("right-triangle-trig", { title: "Match a triangle", params: { angle: 38, hyp: 15 } }),
    callout("tip", "Try this", r`This is the triangle from the second example. Do the readouts for opposite and adjacent agree with 9.23 and 11.82? Now find the angle that makes the opposite side exactly 7.5 (hint: $\sin^{-1}(0.5)$).`, "experiment"),
    callout("warning", "Use given values when you can", r`Compute each missing part from the original data rather than from a value you rounded earlier. Rounding errors build up.`),
    callout("application", "Where this shows up", r`Navigation (bearings), the pitch of a roof from its rise and run, a ramp's angle from building codes, and the angle a camera must tilt to frame a building are all solved with inverse trig.`),
  ],
  questions: [
    num(1, r`Find $A$ to the nearest tenth of a degree if $\sin A = 0.5$.`, 30, { unit: "°", tolerance: 0.06 }, [], r`$\sin^{-1}(0.5) = 30^\circ$.`),
    num(2, r`A right triangle has legs 5 and 12. Find the angle opposite the side of length 5, to the nearest tenth of a degree.`, 22.6, { unit: "°", tolerance: 0.06 }, [r`$\tan^{-1}(5/12)$.`], r`$\tan^{-1}(0.4167) \approx 22.6^\circ$.`),
    num(2, r`A right triangle has hypotenuse 20 and a leg of 13. Find the angle adjacent to that leg, to the nearest tenth of a degree.`, 49.5, { unit: "°", tolerance: 0.06 }, [r`$\cos^{-1}(13/20)$.`], r`$\cos^{-1}(0.65) \approx 49.5^\circ$.`),
    num(2, r`A roof rises 4 ft over a horizontal run of 12 ft. What angle does it make with the horizontal, to the nearest tenth?`, 18.4, { unit: "°", tolerance: 0.06 }, [r`$\tan^{-1}(4/12)$.`], r`$\approx 18.4^\circ$.`),
    num(3, r`In right triangle $ABC$ ($C = 90^\circ$), $B = 64^\circ$ and $b = 18$ (opposite $B$). Find $a$ to the nearest hundredth.`, 8.78, { tolerance: 0.006 }, [r`$\tan 64^\circ = \frac{18}{a}$.`], r`$a = 18 / \tan 64^\circ \approx 18 / 2.0503 \approx 8.78$.`, "review"),
  ],
});
