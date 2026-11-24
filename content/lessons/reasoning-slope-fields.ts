import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reasoning-slope-fields",
  title: "Reasoning using slope fields",
  summary: "Match slope fields to differential equations, identify equilibrium solutions, and predict long-run behavior of solutions without solving.",
  minutes: 25,
  objectives: [
    "Match a slope field to its equation using where slopes are zero, positive or negative.",
    "Identify equilibrium solutions and whether nearby solutions approach them.",
    "Predict long-term behavior from the field.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Clues for matching", r`If slopes depend only on $x$, segments in each column are parallel. If only on $y$, segments in each row are parallel. Find where the slope is 0 and where it changes sign.`),
    example(r`The logistic field $\frac{dy}{dx} = 0.8y\left(1 - \frac{y}{4}\right)$`, [
      [r`\text{equilibria: } y = 0,\ y = 4`, ""],
      [r`0 < y < 4:\ \text{slope} > 0`, "Solutions rise toward 4."],
      [r`y > 4:\ \text{slope} < 0`, "Solutions fall toward 4. So y = 4 is stable."],
    ]),
    activity("slope-field", { title: "Logistic growth", params: { eq: "logistic", x0: -4, y0: 0.5 } }),
    callout("tip", "Try this", r`Start below 4 and above 4: both curves level off at $y = 4$. Start at a small negative $y$: the curve moves away from 0, so $y = 0$ is unstable.`, "experiment"),
    callout("application", "Where this shows up", r`Fisheries managers use logistic models: a stable equilibrium at carrying capacity, and a fastest regrowth rate at half that level.`),
  ],
  questions: [
    mc(1, r`In a slope field, all segments in each horizontal row are parallel. The equation is most likely…`, [r`$\frac{dy}{dx} = x^2$`, r`$\frac{dy}{dx} = y - 1$`, r`$\frac{dy}{dx} = x + y$`, r`$\frac{dy}{dx} = xy$`], 1, [], r`The slope depends only on $y$.`),
    mc(2, r`For $\frac{dy}{dx} = 2 - y$, a solution starting at $y(0) = 5$…`, ["grows without bound", "decreases toward 2", "stays at 5", "decreases toward 0"], 1, [], r`Slope negative above 2; equilibrium at 2.`),
    mc(2, r`For $\frac{dy}{dx} = y^2 - 1$, which equilibrium is stable?`, ["y = 1", "y = −1", "both", "neither"], 1, [r`Check the sign of $y^2 - 1$ near each.`], r`Near −1, solutions move toward it (slope positive below, negative above).`),
    mc(3, r`Slopes are 0 along the line $y = x$, positive below it, negative above it. Which equation fits?`, [r`$\frac{dy}{dx} = x - y$`, r`$\frac{dy}{dx} = y - x$`, r`$\frac{dy}{dx} = xy$`, r`$\frac{dy}{dx} = x + y$`], 0, [], r`Below $y = x$, $x - y > 0$.`, "review"),
  ],
});
