import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "particular-solutions",
  title: "Finding particular solutions using initial conditions and separation of variables",
  summary: "Solve initial value problems by separating, integrating, using the initial condition to find the constant, and choosing the correct branch and domain.",
  minutes: 30,
  objectives: [
    "Use the initial condition to find C right after integrating.",
    "Choose the sign of a square root that matches the initial condition.",
    "State the domain on which the solution is valid.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Initial value problem", r`A differential equation plus a condition $y(x_0) = y_0$. Find $C$ as soon as you've integrated; it's usually easiest before solving for $y$.`),
    example(r`$\frac{dy}{dx} = xy$, $y(0) = 3$`, [
      [r`\ln|y| = \tfrac{x^2}{2} + C`, ""],
      [r`\ln 3 = 0 + C`, "Use the initial condition."],
      [r`y = 3e^{x^2/2}`, r`So $y(2) = 3e^2 \approx 22.17$.`],
    ]),
    example(r`$\frac{dy}{dx} = \frac{2x}{y}$, $y(0) = -2$`, [
      [r`\tfrac{y^2}{2} = x^2 + C \Rightarrow C = 2`, ""],
      [r`y^2 = 2x^2 + 4`, ""],
      [r`y = -\sqrt{2x^2 + 4}`, "Negative root, to pass through (0, −2)."],
    ]),
    callout("application", "Where this shows up", r`Every real prediction (how much medicine remains after 6 hours, how hot the coffee is after 20 minutes) needs a particular solution, fixed by a measured starting value.`),
  ],
  questions: [
    num(2, r`Solve $\frac{dy}{dx} = 2y$, $y(0) = 5$, and find $y(1)$ to two decimal places.`, 36.95, { tolerance: 0.01 }, [], r`$y = 5e^{2x}$; $5e^2 \approx 36.95$.`),
    num(2, r`Solve $\frac{dy}{dx} = \frac{x}{y}$, $y(0) = 3$. Find $y(4)$.`, 5, {}, [r`$y^2 = x^2 + 9$.`], r`Positive root: $\sqrt{25} = 5$.`),
    mc(2, r`For $\frac{dy}{dx} = \frac{2x}{y}$ with $y(0) = -2$, what is $y(1)$?`, [r`$\sqrt{6}$`, r`$-\sqrt{6}$`, "−2", r`$\pm\sqrt{6}$`], 1, [], r`$y = -\sqrt{2x^2 + 4}$.`),
    num(3, r`Solve $\frac{dy}{dx} = y^2$, $y(0) = 1$, and find $y(0.5)$.`, 2, {}, [r`$-\frac{1}{y} = x + C$.`], r`$C = -1$, so $y = \frac{1}{1 - x}$, and $y(0.5) = 2$. The solution blows up at $x = 1$.`, "review"),
  ],
});
