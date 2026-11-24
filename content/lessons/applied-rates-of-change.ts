import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "applied-rates-of-change",
  title: "Rates of change in applied contexts other than motion",
  summary: "Use derivatives as rates in geometry, economics, biology and physical science, computing them from formulas and interpreting them with units.",
  minutes: 25,
  objectives: [
    "Compute rates of change from formulas in non-motion contexts.",
    "Interpret marginal cost, growth rates and geometric rates.",
    "Use units to check whether a rate makes sense.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("Any rate is a derivative", r`Whenever one quantity depends on another, the derivative measures how fast the first changes per unit of the second: cost per item, people per year, square centimeters per centimeter of radius.`),
    example(r`Area of a circle $A = \pi r^2$ at $r = 5$ cm`, [
      [r`\frac{dA}{dr} = 2\pi r = 10\pi \approx 31.4 \text{ cm}^2 \text{ per cm}`, "Equal to the circumference."],
    ]),
    example(r`Bacteria $N(t) = 500e^{0.2t}$, $t$ in hours`, [
      [r`N'(t) = 100e^{0.2t}`, ""],
      [r`N'(5) = 100e \approx 272 \text{ bacteria per hour}`, ""],
    ]),
    example(r`Cost $C(q) = 2000 + 15q - 0.01q^2$ dollars`, [
      [r`C'(q) = 15 - 0.02q`, ""],
      [r`C'(200) = 11 \text{ dollars per item}`, "Marginal cost at 200 items."],
    ]),
    callout("application", "Where this shows up", r`Pharmacologists track how fast a drug level falls; climate scientists report warming in °C per decade; both are derivatives.`),
  ],
  questions: [
    num(1, r`For $C(q) = 2000 + 15q - 0.01q^2$, find $C'(500)$ in dollars per item.`, 5, { unit: "dollars per item" }, [], r`$15 - 10 = 5$.`),
    num(2, r`A cube's volume is $V = s^3$. Find $\frac{dV}{ds}$ when $s = 4$ cm, in cm³ per cm.`, 48, {}, [], r`$3s^2 = 48$.`),
    num(2, r`$N(t) = 500e^{0.2t}$. Find $N'(0)$ in bacteria per hour.`, 100, {}, [], r`$100e^0 = 100$.`),
    mc(3, r`The volume of a gas at constant temperature is $V = \frac{k}{P}$. What is the sign of $\frac{dV}{dP}$, and what does it mean?`, ["Positive: more pressure, more volume", "Negative: increasing pressure decreases volume", "Zero: volume doesn't depend on pressure", "Undefined"], 1, [], r`$\frac{dV}{dP} = -\frac{k}{P^2} < 0$ (Boyle's law).`, "review"),
  ],
});
