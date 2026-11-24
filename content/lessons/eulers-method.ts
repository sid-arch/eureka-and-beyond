import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "eulers-method",
  title: "Approximating solutions using Euler's method",
  summary: "Approximate a solution of an initial value problem by following tangent lines in small steps, and judge whether the estimate is too high or too low.",
  minutes: 30,
  objectives: [
    "Apply yₙ₊₁ = yₙ + h·f(xₙ, yₙ) for several steps.",
    "Organize the work in a table.",
    "Use concavity to tell whether Euler's method under- or overestimates.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Euler's method", r`For $\frac{dy}{dx} = f(x, y)$, $y(x_0) = y_0$ and step size $h$: $x_{n+1} = x_n + h$ and $y_{n+1} = y_n + h\,f(x_n, y_n)$. Each step follows the tangent line for a distance $h$.`),
    example(r`$\frac{dy}{dx} = x + y$, $y(0) = 1$, $h = 0.5$. Estimate $y(1)$.`, [
      [r`y_1 = 1 + 0.5(0 + 1) = 1.5`, "At x = 0.5."],
      [r`y_2 = 1.5 + 0.5(0.5 + 1.5) = 2.5`, "At x = 1."],
      [r`\text{exact: } 2e - 2 \approx 3.44`, "Euler underestimates here."],
    ]),
    activity("slope-field", { title: "The true solution through (0, 1)", params: { eq: "x+y", x0: 0, y0: 1 } }),
    callout("tip", "Over or under?", r`If solutions are concave up, tangent lines lie below the curve, so Euler underestimates. Concave down: it overestimates. Here $y'' = 1 + y' > 0$.`),
    callout("application", "Where this shows up", r`Simulations of planets, weather and epidemics are built on step-by-step methods like Euler's, refined into methods such as Runge–Kutta (which this site's slope-field sim uses).`),
  ],
  questions: [
    num(2, r`$\frac{dy}{dx} = y$, $y(0) = 1$. Use two Euler steps with $h = 0.5$ to estimate $y(1)$.`, 2.25, { tolerance: 0.001 }, [], r`$1 \to 1.5 \to 2.25$ (exact $e \approx 2.718$).`),
    num(1, r`$\frac{dy}{dx} = 2x$, $y(1) = 3$. One step with $h = 0.1$ estimates $y(1.1)$ as…`, 3.2, { tolerance: 0.001 }, [], r`$3 + 0.1(2) = 3.2$.`),
    num(2, r`$\frac{dy}{dx} = x - y$, $y(0) = 2$, $h = 0.5$. Estimate $y(1)$ with two steps.`, 0.75, { tolerance: 0.001 }, [], r`$y_1 = 2 + 0.5(-2) = 1$; $y_2 = 1 + 0.5(0.5 - 1) = 0.75$.`),
    mc(3, r`Halving the step size usually makes Euler's estimate…`, ["less accurate", "more accurate", "exact", "unchanged"], 1, [], r`Smaller steps follow the curve more closely (the error roughly halves).`, "review"),
  ],
});
