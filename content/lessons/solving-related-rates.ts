import { callout, def, example, figure, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-related-rates",
  title: "Solving related rates problems",
  summary: "Solve multi-step related rates problems: draw and label a diagram, write an equation, eliminate extra variables with geometry, differentiate, and substitute.",
  minutes: 35,
  objectives: [
    "Follow a reliable sequence: diagram, knowns and unknown, equation, differentiate, substitute.",
    "Use similar triangles to eliminate a variable before differentiating.",
    "Interpret the sign of the answer.",
  ],
  concepts: [
    { slug: "related-rates", name: "Related rates", description: "Finding how fast one quantity changes from how fast related quantities change.", subject: "subj_math" },
  ],
  formulas: ["chain-rule"],
  blocks: [
    def("Steps", r`1. Draw and label the changing quantities as variables. 2. List the given rate(s) and the rate you want, at the given instant. 3. Write an equation relating the variables (eliminate extras if needed). 4. Differentiate with respect to $t$. 5. Substitute the instant's values and solve.`),
    figure("/figures/sliding-ladder.svg", "A 10-foot ladder leans against a wall. Its foot is x feet from the wall and slides away at 1 foot per second; its top is y feet up the wall and slides down at an unknown rate. The sides satisfy x squared plus y squared equals 100.", "Label what changes as variables; only the ladder's length stays fixed."),
    example(r`The ladder's foot slides away at 1 ft/s. How fast is the top sliding down when the foot is 6 ft from the wall?`, [
      [r`x^2 + y^2 = 100`, ""],
      [r`2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0`, ""],
      [r`x = 6 \Rightarrow y = 8`, "Find the other variable at that instant."],
      [r`6(1) + 8\frac{dy}{dt} = 0 \Rightarrow \frac{dy}{dt} = -0.75`, "The top slides down at 0.75 ft/s."],
    ]),
    example(r`Water fills an inverted cone (radius 3 ft, height 6 ft) at 2 ft³/min. How fast is the depth rising when it's 3 ft deep?`, [
      [r`\frac{r}{h} = \frac{3}{6} \Rightarrow r = \frac{h}{2}`, "Similar triangles."],
      [r`V = \frac{1}{3}\pi r^2 h = \frac{\pi h^3}{12}`, ""],
      [r`\frac{dV}{dt} = \frac{\pi h^2}{4}\frac{dh}{dt}`, ""],
      [r`2 = \frac{9\pi}{4}\frac{dh}{dt} \Rightarrow \frac{dh}{dt} = \frac{8}{9\pi} \approx 0.283`, "ft/min"],
    ]),
    callout("application", "Where this shows up", r`Reservoir engineers convert inflow (volume per minute) into how fast the water level rises, which depends on the reservoir's shape at that depth.`),
  ],
  questions: [
    num(2, r`For the ladder, how fast is the top sliding down when the foot is 8 ft from the wall, in ft/s? Give a positive number.`, 1.333, { tolerance: 0.002, unit: "ft/s" }, [r`Then $y = 6$.`], r`$8(1) + 6\frac{dy}{dt} = 0 \Rightarrow \frac{dy}{dt} = -\frac{4}{3}$.`),
    num(2, r`Car A drives north at 30 mph and car B east at 40 mph from the same point. How fast is the distance between them growing, in mph?`, 50, { unit: "mph" }, [r`After $t$ hours the legs are $30t$ and $40t$.`], r`$D = 50t$, so $\frac{dD}{dt} = 50$.`),
    mc(2, r`In the cone problem, why substitute $r = \frac{h}{2}$ before differentiating?`, ["To make the answer positive", "So V depends on one variable whose rate we want", "Because r is constant", "It's optional and changes nothing"], 1, [], r`Otherwise you'd also need $\frac{dr}{dt}$.`),
    num(3, r`For the cone, how fast is the depth rising when the water is 2 ft deep, in ft/min? Round to three decimal places.`, 0.637, { tolerance: 0.002, unit: "ft/min" }, [], r`$2 = \frac{\pi(4)}{4}\frac{dh}{dt} \Rightarrow \frac{dh}{dt} = \frac{2}{\pi} \approx 0.637$.`, "review"),
  ],
});
