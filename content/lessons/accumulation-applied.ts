import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "accumulation-applied",
  title: "Using accumulation functions and definite integrals in applied contexts",
  summary: "Model amounts that change through rates in and out with A(t) = A(0) + ∫(in − out), and find when the amount is largest or smallest.",
  minutes: 30,
  objectives: [
    "Write an expression for an amount from a starting value and in/out rates.",
    "Find when the amount is at a maximum or minimum (in = out, plus endpoints).",
    "Interpret integral expressions in context with units.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  formulas: ["ftc"],
  blocks: [
    def("In minus out", r`If a quantity starts at $A(0)$, enters at rate $R(t)$ and leaves at rate $D(t)$, then $A(t) = A(0) + \int_0^t [R(s) - D(s)]\,ds$ and $A'(t) = R(t) - D(t)$.`),
    example(r`A tank holds 100 L. Water enters at 20 L/min and drains at $2t$ L/min, for $0 \le t \le 15$.`, [
      [r`A(10) = 100 + \int_0^{10} (20 - 2t)\,dt = 100 + 100 = 200 \text{ L}`, ""],
      [r`A'(t) = 20 - 2t = 0 \Rightarrow t = 10`, "Rate in equals rate out."],
      [r`A(0) = 100,\ A(10) = 200,\ A(15) = 175`, "Candidates Test: maximum 200 L at t = 10."],
    ]),
    callout("tip", "Explain an integral expression", r`For $\int_2^5 R(t)\,dt$ with $R$ in people per hour: "the number of people who entered between hour 2 and hour 5." Name the quantity, the time interval and the units.`),
    callout("application", "Where this shows up", r`Hospitals track patients in and out per hour, cities track traffic on and off a highway, and pharmacists track drug absorbed versus eliminated: all in-minus-out accumulations.`),
  ],
  questions: [
    num(1, r`For the tank above, find $A(15)$ in liters.`, 175, { unit: "L" }, [], r`$100 + [20t - t^2]_0^{15} = 100 + 300 - 225 = 175$.`),
    num(2, r`Snow falls at $S(t) = 2t$ cm/h and melts at 3 cm/h. Starting with 10 cm, how deep is it after 4 hours, in cm?`, 14, { unit: "cm" }, [], r`$10 + \int_0^4 (2t - 3)\,dt = 10 + 16 - 12 = 14$.`),
    num(2, r`In the snow model, when is the depth smallest, in hours?`, 1.5, { tolerance: 0.001, unit: "h" }, [], r`$2t - 3 = 0$ at 1.5 (the depth falls before, rises after).`),
    mc(3, r`$P(t)$ is the number of people in a park, and $P'(t)$ is in people per hour. What does $\int_0^3 P'(t)\,dt$ mean?`, ["People in the park at t = 3", "Net change in the number of people in the park from t = 0 to t = 3", "Average rate of entry", "Rate of change at t = 3"], 1, [], r`An integral of a rate is a net change.`, "review"),
  ],
});
