import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-power",
  title: "Power",
  summary: "Define instantaneous power as the rate of work, P = dW/dt = F·v, and find energy transferred from a power function by integrating.",
  minutes: 30,
  objectives: [
    "Compute instantaneous power P = dW/dt.",
    "Use P = F·v for forces on moving objects.",
    "Find work as the integral of power over time.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Instantaneous power", r`$P = \frac{dW}{dt}$. Since $dW = \vec F\cdot d\vec r$, dividing by $dt$ gives $P = \vec F\cdot\vec v$. Over an interval, $W = \int P\,dt$, the area under a power–time graph.`),
    example(r`A car's engine delivers 60 kW at 30 m/s`, [
      [r`F = \tfrac{P}{v} = \tfrac{60{,}000}{30} = 2000\ \text{N}`, "At constant power, the driving force drops as speed rises."],
    ]),
    example(r`Work done is W(t) = 4t³ joules`, [
      [r`P = \tfrac{dW}{dt} = 12t^2`, ""],
      [r`P(2) = 48\ \text{W}`, ""],
    ]),
    example(r`Power P(t) = 6t watts from 0 to 3 s`, [
      [r`W = \int_0^3 6t\,dt = 27\ \text{J}`, ""],
    ]),
    callout("application", "Where this shows up", r`Cyclists' power meters measure force times pedal speed, and electric-vehicle range depends on drag power, which scales as $v^3$ for quadratic drag.`),
  ],
  questions: [
    num(2, r`A 50 N force at 30° to the velocity acts on an object moving at 4 m/s. Find the power, to one decimal place.`, 173.2, { tolerance: 0.1, unit: "W" }, ["P = F·v = Fv cos θ."], r`$50 \cdot 4\cos 30°$.`),
    num(2, r`P(t) = 3t² W. Find the energy delivered from t = 1 to 2 s.`, 7, { unit: "J" }, ["Energy = ∫P dt from 1 to 2."], r`$t^3$ from 1 to 2.`),
    mc(2, r`Quadratic drag force is cv². The power needed to overcome it scales as…`, ["v", "v²", "v³", "constant"], 2, ["P = Fv, and F = cv²."], r`$P = Fv = cv^3$.`),
    mc(3, r`A force perpendicular to the velocity delivers power…`, ["maximum", "zero", "negative", "equal to Fv"], 1, ["P = F·v. What is the dot product of perpendicular vectors?"], r`$\vec F\cdot\vec v = 0$.`, "review"),
  ],
});
