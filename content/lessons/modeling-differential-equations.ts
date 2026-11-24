import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "modeling-differential-equations",
  title: "Modeling situations with differential equations",
  summary: "Translate verbal descriptions of rates, such as 'proportional to' and 'Newton's law of cooling', into differential equations.",
  minutes: 25,
  objectives: [
    "Write a differential equation from a description of a rate.",
    "Interpret the constant of proportionality and its sign.",
    "Recognize growth, decay, cooling and logistic models.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Differential equation", r`An equation involving a function and its derivative(s). "The rate of change of $y$ is proportional to $y$" becomes $\frac{dy}{dt} = ky$.`),
    example(r`Translate each statement`, [
      [r`\frac{dP}{dt} = kP`, "Population grows at a rate proportional to its size."],
      [r`\frac{dT}{dt} = -k(T - 20),\ k > 0`, "Newton's cooling: rate proportional to the difference from room temperature (20 °C)."],
      [r`\frac{dP}{dt} = kP\left(1 - \frac{P}{M}\right)`, "Logistic: growth slows as P nears the capacity M."],
      [r`\frac{dV}{dt} = -k\sqrt{h}`, "Torricelli: a tank drains at a rate proportional to the square root of the depth."],
    ]),
    callout("tip", "Read the units", r`In $\frac{dP}{dt} = 0.03P$, with $t$ in years, $k = 0.03$ per year: the population grows about 3% per year at any moment.`),
    callout("application", "Where this shows up", r`Epidemiologists, engineers and economists model nearly everything that changes over time with differential equations, from disease spread to circuit currents.`),
  ],
  questions: [
    mc(1, r`"The rate of change of $A$ is proportional to the square of $A$" is…`, [r`$\frac{dA}{dt} = kA$`, r`$\frac{dA}{dt} = kA^2$`, r`$A = kt^2$`, r`$\frac{dA}{dt} = k\sqrt{A}$`], 1, [], r`Rate = k × A².`),
    mc(2, r`In $\frac{dT}{dt} = -0.1(T - 25)$, a cup at 80 °C is…`, ["warming", "cooling at 5.5 °C per minute", "cooling at 8 °C per minute", "at equilibrium"], 1, [], r`$-0.1(55) = -5.5$.`),
    mc(2, r`A drug is eliminated at a rate proportional to the amount $A$ present. Which model?`, [r`$\frac{dA}{dt} = kA,\ k > 0$`, r`$\frac{dA}{dt} = -kA,\ k > 0$`, r`$\frac{dA}{dt} = k$`, r`$A = kt$`], 1, [], r`Decreasing, so the rate is negative.`),
    mc(3, r`In the logistic model $\frac{dP}{dt} = 0.2P\left(1 - \frac{P}{500}\right)$, when is the population growing fastest?`, ["P = 0", "P = 250", "P = 500", "P = 1000"], 1, [r`Maximize $0.2P - 0.0004P^2$.`], r`Half the carrying capacity.`, "review"),
  ],
});
