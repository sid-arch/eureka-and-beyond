import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "angles-elevation-depression",
  title: "Angles of elevation and depression",
  summary: "Model real situations with angles of elevation and depression, and solve them with right-triangle trigonometry, including two-triangle problems.",
  minutes: 25,
  objectives: [
    "Identify angles of elevation and depression and explain why they are congruent.",
    "Draw a diagram and solve height and distance problems with trig ratios.",
    "Solve problems that involve two right triangles.",
  ],
  concepts: [
    { slug: "trigonometric-ratios", name: "Trigonometric ratios", description: "Sine, cosine and tangent: ratios of sides in a right triangle.", subject: "subj_math" },
  ],
  formulas: ["trig-ratios"],
  blocks: [
    def("Elevation and depression", r`An angle of elevation is measured up from the horizontal to a line of sight. An angle of depression is measured down from the horizontal. The angle of depression from A to B equals the angle of elevation from B to A: they're alternate interior angles between two horizontal (parallel) lines.`),
    example(r`From 40 m away from a building, the angle of elevation to its top is $52^\circ$. How tall is it? (Ignore eye height.)`, [
      [r`\tan 52^\circ = \tfrac{h}{40}`, ""],
      [r`h = 40\tan 52^\circ \approx 51.2 \text{ m}`, ""],
    ]),
    example(r`A lighthouse keeper 30 m above the sea sees a boat at an angle of depression of $8^\circ$. How far is the boat from the base of the lighthouse?`, [
      [r`\text{angle of elevation from the boat} = 8^\circ`, "Alternate interior angles."],
      [r`\tan 8^\circ = \tfrac{30}{d} \Rightarrow d = \tfrac{30}{\tan 8^\circ} \approx 213.5 \text{ m}`, ""],
    ]),
    example(r`From a point, the angle of elevation to a tree top is $35^\circ$. Moving 10 m closer, it becomes $50^\circ$. How tall is the tree?`, [
      [r`h = x\tan 50^\circ = (x + 10)\tan 35^\circ`, "x is the closer distance."],
      [r`x(\tan 50^\circ - \tan 35^\circ) = 10\tan 35^\circ`, ""],
      [r`x = \tfrac{7.0021}{1.19175 - 0.70021} \approx 14.25,\ h \approx 16.98 \text{ m}`, ""],
    ]),
    callout("tip", "Always sketch", r`Draw the horizontal line first, mark the angle from it, then label the right triangle. Most errors come from measuring the angle from the vertical instead of the horizontal.`),
    callout("application", "Where this shows up", r`Pilots use angles of descent, surveyors find heights of cliffs, astronomers measure a star's altitude, and archers and golfers judge targets uphill or downhill.`),
  ],
  questions: [
    num(1, r`From 25 ft away, the angle of elevation to the top of a flagpole is $60^\circ$. How tall is the pole, to the nearest tenth?`, 43.3, { unit: "ft", tolerance: 0.06 }, [r`$25\tan 60^\circ$.`], r`$25\sqrt{3} \approx 43.3$ ft.`),
    num(2, r`A plane at 2,000 m altitude sees a runway at an angle of depression of $6^\circ$. What is the horizontal distance to the runway, to the nearest meter?`, 19029, { unit: "m", tolerance: 1 }, [r`$2000 / \tan 6^\circ$.`], r`$2000 / 0.10510 \approx 19{,}029$ m.`),
    num(2, r`A 50 m kite string makes a $40^\circ$ angle with the ground. How high is the kite, to the nearest tenth?`, 32.1, { unit: "m", tolerance: 0.06 }, [r`$50\sin 40^\circ$.`], r`$50(0.6428) \approx 32.1$ m.`),
    mc(2, r`The angle of depression from a cliff top to a boat is $20^\circ$. What is the angle of elevation from the boat to the cliff top?`, ["70°", "20°", "160°", "40°"], 1, [], r`They are alternate interior angles, so $20^\circ$.`),
    num(3, r`A person 1.7 m tall stands 12 m from a tree and sees its top at an angle of elevation of $33^\circ$. How tall is the tree, to the nearest tenth?`, 9.5, { unit: "m", tolerance: 0.06 }, [r`$12\tan 33^\circ$, then add eye height.`], r`$12(0.6494) + 1.7 \approx 7.79 + 1.7 = 9.5$ m.`, "review"),
  ],
});
