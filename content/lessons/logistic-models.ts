import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "logistic-models",
  title: "Logistic models with differential equations",
  summary: "Analyze dP/dt = kP(1 − P/M): carrying capacity, limits, fastest growth at M/2, and the solution P = M/(1 + Ae⁻ᵏᵗ).",
  minutes: 30,
  objectives: [
    "Identify k and the carrying capacity M from the equation.",
    "Find the long-run limit and where growth is fastest.",
    "Use the closed-form solution with an initial condition.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Logistic equation", r`$\frac{dP}{dt} = kP\left(1 - \frac{P}{M}\right)$. Equilibria at $P = 0$ and $P = M$. For $0 < P(0) < M$, $P$ increases toward $M$; growth is fastest at $P = \frac{M}{2}$ (the inflection point). Solution: $P(t) = \frac{M}{1 + Ae^{-kt}}$ with $A = \frac{M - P_0}{P_0}$.`),
    example(r`$\frac{dP}{dt} = 0.4P\left(1 - \frac{P}{1000}\right)$, $P(0) = 100$`, [
      [r`A = \tfrac{1000 - 100}{100} = 9`, ""],
      [r`P(5) = \frac{1000}{1 + 9e^{-2}} \approx 451`, ""],
      [r`\lim_{t \to \infty} P(t) = 1000`, "The carrying capacity."],
      [r`\text{fastest growth at } P = 500`, r`Rate $0.4(500)(0.5) = 100$ per unit time.`],
    ]),
    activity("slope-field", { title: "Logistic slope field", params: { eq: "logistic", x0: -4, y0: 0.4 } }),
    callout("application", "Where this shows up", r`Logistic curves describe yeast cultures, the spread of a rumor or a new technology, and fish populations under limited resources.`),
  ],
  questions: [
    num(1, r`For $\frac{dP}{dt} = 0.3P\left(1 - \frac{P}{800}\right)$, what is $\lim_{t \to \infty} P(t)$ if $P(0) = 50$?`, 800, {}, [], r`The carrying capacity.`),
    num(2, r`For that model, at what population is growth fastest?`, 400, {}, [], r`$\frac{M}{2}$.`),
    num(2, r`Write $\frac{dP}{dt} = 2P - 0.01P^2$ in logistic form. What is $M$?`, 200, {}, [r`Factor $2P(1 - 0.005P)$.`], r`$1 - \frac{P}{200}$, so $M = 200$.`),
    mc(3, r`If $P(0) = 1200$ and $M = 1000$, the population…`, ["grows without bound", "decreases toward 1000", "stays at 1200", "drops to 0"], 1, [], r`Above $M$, $\frac{dP}{dt} < 0$.`, "review"),
  ],
});
