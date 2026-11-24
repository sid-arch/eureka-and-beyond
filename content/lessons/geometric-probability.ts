import { callout, def, example, lesson, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "geometric-probability",
  title: "Geometric probability",
  summary: "Find probabilities as ratios of lengths, areas or times when outcomes are spread uniformly over a region.",
  minutes: 25,
  objectives: [
    "Compute probability as a ratio of lengths on a segment.",
    "Compute probability as a ratio of areas in a region.",
    "Model waiting-time problems with lengths.",
  ],
  concepts: [
    { slug: "geometric-probability", name: "Geometric probability", description: "Probability measured as a ratio of lengths, areas or volumes.", subject: "subj_math" },
    { slug: "probability", name: "Probability", description: "A number from 0 to 1 measuring how likely an event is.", subject: "subj_math" },
  ],
  formulas: ["circle-area"],
  blocks: [
    def("Geometric probability", r`If a point is chosen uniformly at random in a region, the probability it lands in a sub-region is $\frac{\text{measure of the sub-region}}{\text{measure of the whole region}}$, where "measure" is length, area or volume.`),
    example(r`A point is chosen at random on $\overline{AD}$ from 0 to 12. What is the probability it lies between 3 and 7?`, [
      [r`\tfrac{7 - 3}{12 - 0} = \tfrac{4}{12} = \tfrac{1}{3}`, ""],
    ]),
    example(r`A dart hits a 20 cm by 20 cm board at a random point. The bullseye is a circle of radius 3 cm. Find P(bullseye).`, [
      [r`\tfrac{\pi(3)^2}{20^2} = \tfrac{9\pi}{400} \approx 0.0707`, "About 7%."],
    ]),
    example(r`A bus comes every 15 minutes. You arrive at a random time. What is the probability you wait less than 4 minutes?`, [
      [r`\tfrac{4}{15} \approx 0.267`, "Waiting time is uniform on the 15-minute interval."],
    ]),
    callout("warning", "Uniformity is an assumption", r`These ratios only work if every point is equally likely. A real dart player aims at the center, so a beginner's darts are closer to uniform than an expert's.`),
    callout("application", "Where this shows up", r`Estimating π by throwing random points (Monte Carlo methods), the chance a meteor hits land (about 29% of Earth's surface), and traffic-light waiting times use geometric probability.`),
  ],
  questions: [
    num(1, r`A point is chosen on a segment from 0 to 20. What is P(it is greater than 15)?`, 0.25, {}, [], r`$5 / 20 = 0.25$.`),
    num(2, r`A circle of radius 2 is inside a square of side 8. A random point in the square is chosen. What is P(inside the circle), to three decimals?`, 0.196, { tolerance: 0.0006 }, [r`$4\pi / 64$.`], r`$\frac{\pi}{16} \approx 0.196$.`),
    num(2, r`A traffic light is green 40 s, yellow 5 s and red 30 s per cycle. What is P(arriving on green)? Round to three decimals.`, 0.533, { tolerance: 0.0006 }, [r`$40 / 75$.`], r`$0.533$.`),
    num(3, r`A point is chosen in a circle of radius 10. What is P(it is within 5 of the center)?`, 0.25, {}, [r`$\frac{\pi \cdot 25}{\pi \cdot 100}$.`], r`$0.25$: half the radius gives a quarter of the area.`, "review"),
  ],
});
