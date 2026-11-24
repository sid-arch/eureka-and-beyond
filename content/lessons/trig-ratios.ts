import { activity, callout, def, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "trig-ratios",
  title: "Sine, cosine and tangent ratios",
  summary: "Define sine, cosine and tangent as ratios in a right triangle, explain why they depend only on the angle, and use them to find missing sides.",
  minutes: 30,
  objectives: [
    "Identify the opposite, adjacent and hypotenuse relative to an acute angle.",
    "Define sin, cos and tan and explain why they depend only on the angle (similarity).",
    "Use trig ratios to find missing side lengths, and relate sine and cosine of complementary angles.",
  ],
  concepts: [
    { slug: "trigonometric-ratios", name: "Trigonometric ratios", description: "Sine, cosine and tangent: ratios of sides in a right triangle.", subject: "subj_math" },
  ],
  formulas: ["trig-ratios"],
  blocks: [
    text(r`All right triangles with the same acute angle $\theta$ are similar (AA). So the ratio of any two of their sides is the same no matter how big the triangle is. Those fixed ratios get names.`),
    formula(r`\sin\theta = \frac{\text{opp}}{\text{hyp}}, \quad \cos\theta = \frac{\text{adj}}{\text{hyp}}, \quad \tan\theta = \frac{\text{opp}}{\text{adj}}`, "Trigonometric ratios", "SOH-CAH-TOA is a common memory aid."),
    activity("right-triangle-trig", { title: "Ratios depend only on the angle", params: { angle: 35, hyp: 10 } }),
    callout("tip", "Try this", r`Keep θ at 35° and change the hypotenuse: the sides change but sin, cos and tan don't. Now set θ = 30°: sin is exactly 0.5. Set θ = 45°: tan is 1. Why, from the special right triangles?`, "experiment"),
    example(r`In right $\triangle ABC$ with right angle $C$, $AC = 8$, $BC = 15$, $AB = 17$. Find $\sin A$, $\cos A$, $\tan A$.`, [
      [r`\sin A = \tfrac{BC}{AB} = \tfrac{15}{17}`, "BC is opposite A."],
      [r`\cos A = \tfrac{AC}{AB} = \tfrac{8}{17}`, "AC is adjacent to A."],
      [r`\tan A = \tfrac{15}{8}`, ""],
    ], r`Notice $\sin B = \frac{8}{17} = \cos A$: the sine of an angle equals the cosine of its complement.`),
    example(r`A ramp makes a $12^\circ$ angle with the ground and is 5 m long. How high does it rise?`, [
      [r`\sin 12^\circ = \tfrac{h}{5}`, "The height is opposite the angle; the ramp is the hypotenuse."],
      [r`h = 5 \sin 12^\circ \approx 5(0.2079) \approx 1.04 \text{ m}`, "Calculator in degree mode."],
    ]),
    example(r`In a right triangle, an angle is $40^\circ$ and its adjacent leg is 20. Find the hypotenuse.`, [
      [r`\cos 40^\circ = \tfrac{20}{c}`, ""],
      [r`c = \tfrac{20}{\cos 40^\circ} \approx \tfrac{20}{0.7660} \approx 26.11`, ""],
    ]),
    def("Complementary angles", r`$\sin\theta = \cos(90^\circ - \theta)$ and $\cos\theta = \sin(90^\circ - \theta)$. The side opposite one acute angle is adjacent to the other.`),
    callout("warning", "Degree mode", r`Make sure your calculator is in degree mode. In radian mode, $\sin 30$ gives about $-0.988$ instead of 0.5.`),
    callout("application", "Where this shows up", r`Road grades, wheelchair-ramp codes, roof pitch, GPS and robotics all use these ratios. Engineers specify ramps by angle and compute heights with sine.`),
  ],
  questions: [
    short(1, r`In a right triangle with legs 3 and 4 and hypotenuse 5, what is $\sin\theta$ for the angle opposite the side of length 3? Enter a fraction.`, ["3/5", "0.6"], [], r`$\frac{3}{5}$.`),
    num(2, r`Find $x$ to the nearest hundredth: $\tan 28^\circ = \frac{x}{10}$.`, 5.32, { tolerance: 0.006 }, [r`$x = 10\tan 28^\circ$.`], r`$10(0.5317) \approx 5.32$.`),
    num(2, r`A 12 ft ladder leans against a wall at a $70^\circ$ angle with the ground. How high up the wall does it reach? Round to the nearest tenth.`, 11.3, { unit: "ft", tolerance: 0.06 }, [r`$12\sin 70^\circ$.`], r`$12(0.9397) \approx 11.3$ ft.`),
    num(2, r`In a right triangle, an acute angle is $25^\circ$ and the opposite leg is 7. Find the hypotenuse to the nearest tenth.`, 16.6, { tolerance: 0.06 }, [r`$\sin 25^\circ = \frac{7}{c}$.`], r`$c = 7 / 0.4226 \approx 16.6$.`),
    mc(2, r`If $\sin A = 0.6$ in a right triangle with acute angles $A$ and $B$, what is $\cos B$?`, ["0.4", "0.6", "0.8", "Cannot tell"], 1, ["A and B are complementary."], r`$\cos B = \sin(90^\circ - B) = \sin A = 0.6$.`),
    mc(3, r`Why is $\tan 45^\circ = 1$?`, ["Because 45 is half of 90", "In a 45-45-90 triangle the legs are equal, so opp/adj = 1", "Because sin 45° = 1", "It's a definition"], 1, [], r`The opposite and adjacent legs are congruent.`, "review"),
  ],
});
