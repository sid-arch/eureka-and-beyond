import { activity, callout, def, example, lesson, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "exponential-models-de",
  title: "Exponential models with differential equations",
  summary: "Solve dy/dt = ky to get y = y₀eᵏᵗ, find k from doubling times or half-lives, and solve Newton's law of cooling.",
  minutes: 30,
  objectives: [
    "Derive y = y₀eᵏᵗ from dy/dt = ky.",
    "Find k from a doubling time, half-life or two data points.",
    "Solve and apply Newton's law of cooling.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
    { slug: "exponential-functions", name: "Exponential functions", description: "Functions of the form y = a·bˣ that change by a constant factor.", subject: "subj_math" },
  ],
  formulas: ["continuous-growth"],
  blocks: [
    def("Exponential growth and decay", r`$\frac{dy}{dt} = ky$ has solution $y = y_0e^{kt}$: growth if $k > 0$, decay if $k < 0$. Doubling time $\frac{\ln 2}{k}$; half-life $\frac{\ln 2}{|k|}$.`),
    example(r`Bacteria double every 5 hours`, [
      [r`e^{5k} = 2 \Rightarrow k = \frac{\ln 2}{5} \approx 0.1386 \text{ per hour}`, ""],
    ]),
    def("Newton's law of cooling", r`$\frac{dT}{dt} = -k(T - T_s)$ has solution $T = T_s + (T_0 - T_s)e^{-kt}$: the difference from the surroundings decays exponentially.`),
    example(r`Coffee at 90 °C in a 20 °C room is 60 °C after 10 min. Temperature at 20 min?`, [
      [r`T - 20 = 70e^{-kt};\ 40 = 70e^{-10k}`, ""],
      [r`e^{-10k} = \tfrac{4}{7}`, ""],
      [r`T(20) = 20 + 70\left(\tfrac{4}{7}\right)^2 \approx 42.9 \ \text{°C}`, "Each 10 minutes multiplies the gap by 4/7."],
    ]),
    activity("slope-field", { title: "dy/dx = 0.5y", params: { eq: "growth", x0: -2, y0: 1 } }),
    callout("application", "Where this shows up", r`Carbon dating uses the half-life of carbon-14 (about 5,730 years); forensic investigators use Newton's cooling to estimate time of death.`),
  ],
  questions: [
    num(2, r`Carbon-14 has a half-life of 5,730 years. What fraction remains after 2,000 years? Give four decimal places.`, 0.7851, { tolerance: 0.0005 }, [r`$k = \frac{\ln 2}{5730}$.`], r`$e^{-2000\ln 2/5730} = 2^{-2000/5730} \approx 0.7851$.`),
    num(2, r`A population grows by $\frac{dP}{dt} = 0.04P$ from 500. Find $P(10)$, to the nearest whole number.`, 746, { tolerance: 1 }, [], r`$500e^{0.4} \approx 745.9$.`),
    num(2, r`A quantity decays from 80 to 20 in 6 hours. What is its half-life, in hours?`, 3, { unit: "h" }, [], r`It halved twice in 6 hours.`),
    num(3, r`For the coffee example, what temperature does the model predict after 30 minutes? One decimal place.`, 33.1, { tolerance: 0.1, unit: "°C" }, [], r`$20 + 70\left(\frac{4}{7}\right)^3 = 20 + \frac{4480}{343} \approx 33.1$.`, "review"),
  ],
});
