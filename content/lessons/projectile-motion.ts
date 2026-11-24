import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "projectile-motion",
  title: "Projectile motion",
  summary: "Treat horizontal and vertical motion separately to predict a projectile's path, flight time, peak height and range.",
  minutes: 40,
  objectives: [
    "Resolve a launch velocity into horizontal and vertical components.",
    "Explain why horizontal velocity is constant and vertical acceleration is −g when air resistance is negligible.",
    "Calculate flight time, maximum height and range.",
  ],
  concepts: [
    { slug: "projectile-motion", name: "Projectile motion", description: "Two-dimensional motion under gravity alone, with independent horizontal and vertical components.", subject: "subj_phys" },
    { slug: "vectors", name: "Vectors", description: "Quantities with both magnitude and direction, combined by components.", subject: "subj_phys" },
  ],
  formulas: ["velocity-constant-acceleration", "displacement-constant-acceleration", "projectile-range"],
  blocks: [
    def("Projectile", r`An object moving through the air with only gravity acting on it after launch. In this lesson we ignore air resistance, which is a good approximation for dense, slow objects over short distances.`),
    text(r`The key idea is independence: the horizontal and vertical parts of the motion don't affect each other. Gravity pulls straight down, so it changes only the vertical velocity. Horizontally nothing pushes or pulls, so the horizontal velocity stays constant for the whole flight.`),
    formula(r`v_{0x} = v_0\cos\theta, \qquad v_{0y} = v_0\sin\theta`, "Launch components", r`$\theta$ is measured above the horizontal.`),
    formula(r`x = v_{0x}\,t, \qquad y = y_0 + v_{0y}\,t - \tfrac{1}{2}g t^2`, "Position at time t", r`With $g \approx 9.8$ m/s² near Earth's surface, taking up as positive.`),
    example(r`A ball is kicked at 20 m/s, 30° above level ground. Find flight time, peak height and range.`, [
      [r`v_{0x} = 20\cos 30° \approx 17.32,\quad v_{0y} = 20\sin 30° = 10`, "Components in m/s."],
      [r`t_{\text{peak}} = \frac{v_{0y}}{g} = \frac{10}{9.8} \approx 1.02\ \text{s}`, "At the top, vertical velocity is zero."],
      [r`H = \frac{v_{0y}^2}{2g} = \frac{100}{19.6} \approx 5.10\ \text{m}`, "Maximum height."],
      [r`T = 2t_{\text{peak}} \approx 2.04\ \text{s}`, "Landing at launch height: the flight is symmetric."],
      [r`R = v_{0x}T \approx 17.32 \times 2.04 \approx 35.3\ \text{m}`, "Range = horizontal speed × time in the air."],
    ], r`The range formula gives $R = \frac{v_0^2\sin 2\theta}{g} = \frac{400\sin 60°}{9.8} \approx 35.3$ m, the same answer.`),
    callout("note", "Why 45° goes farthest", r`On level ground, range is proportional to $\sin 2\theta$, which is largest at $2\theta = 90°$. Complementary angles such as 30° and 60° give the same range: one is flatter and faster, the other higher and slower.`),
    callout("warning", "Model limits", r`Real projectiles feel air resistance, which reduces range and makes the path asymmetric; the best angle is usually less than 45°. A launch from above the landing point also changes the optimal angle. The simulator lets you add launch height but does not model drag.`),
    callout("application", "Where this shows up", r`Long jumpers, basketball shots, water fountains and fireworks displays are all designed with these equations, then corrected for drag.`),
    activity("projectile", { title: "Launch a projectile", params: { g: 9.8 } }),
    callout("tip", "Investigate", r`Find two different angles that land at exactly the same spot. Then raise the launch height to 10 m. Is 45° still the angle with the longest range? Change gravity to the Moon's 1.6 m/s²: what happens to the range at the same speed and angle?`, "experiment"),
    activity("projectile", {
      title: "Walkthrough: one launch, two independent motions",
      steps: [
        { title: "Launch", body: "20 m/s at 30°. The velocity splits into 17.3 m/s across and 10 m/s up.", params: { speed: 20, angle: 30, height: 0 } },
        { title: "Steeper", body: "At 60° the ball goes higher and stays up longer, but moves across more slowly. It lands at the same distance.", params: { speed: 20, angle: 60, height: 0 } },
        { title: "Best angle", body: "At 45° the trade-off is balanced and the range is greatest on level ground: about 40.8 m.", params: { speed: 20, angle: 45, height: 0 } },
        { title: "From a height", body: "Launched from 15 m up, the ball stays airborne longer and lands farther away.", params: { speed: 20, angle: 45, height: 15 } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`A ball is thrown at 15 m/s at 40° above horizontal. What is the horizontal component of its velocity? Round to two decimals.`, 11.49, { tolerance: 0.01, unit: "m/s" },
      [r`$v_{0x} = v_0\cos\theta$.`], r`$15\cos 40° \approx 15(0.766) \approx 11.49$ m/s.`),
    mc(1, r`Ignoring air resistance, which quantity stays constant during a projectile's flight?`, ["Vertical velocity", "Horizontal velocity", "Speed", "Height"], 1,
      ["Which direction does gravity act in?"], r`Gravity acts vertically, so only the vertical velocity changes. The horizontal velocity is constant.`),
    num(2, r`A stone is thrown horizontally at 8 m/s from a 20 m cliff. How long is it in the air? Use g = 9.8 m/s² and round to two decimals.`, 2.02, { tolerance: 0.01, unit: "s" },
      ["The initial vertical velocity is zero.", r`Solve $20 = \tfrac{1}{2}(9.8)t^2$.`], r`$t = \sqrt{\frac{2(20)}{9.8}} \approx 2.02$ s.`),
    num(2, r`For that stone, how far from the base of the cliff does it land? Round to one decimal.`, 16.2, { tolerance: 0.1, unit: "m" },
      ["Horizontal distance = horizontal speed × time."], r`$8 \times 2.02 \approx 16.2$ m.`),
    num(3, r`What launch speed gives a 50 m range at 45° on level ground with g = 9.8 m/s²? Round to one decimal.`, 22.1, { tolerance: 0.1, unit: "m/s" },
      [r`$R = \frac{v_0^2\sin 90°}{g}$.`], r`$v_0 = \sqrt{Rg} = \sqrt{490} \approx 22.1$ m/s.`),
    mc(3, r`Two balls leave a table at the same moment: A is dropped, B is launched horizontally. Which lands first?`, ["A", "B", "They land together", "It depends on B's speed"], 2,
      ["Compare their vertical motions."], r`Both start with zero vertical velocity and fall with the same acceleration, so they hit the floor at the same time.`, "review"),
  ],
});
