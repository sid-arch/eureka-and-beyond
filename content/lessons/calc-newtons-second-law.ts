import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-newtons-second-law",
  title: "Newton's second law with variable forces",
  summary: "Write Newton's second law as F = dp/dt, and solve for motion under forces that depend on time by integrating.",
  minutes: 35,
  objectives: [
    "State Newton's second law in momentum form, F_net = dp/dt.",
    "Find v(t) and x(t) when the net force varies with time.",
    "Set up the differential equation m dv/dt = F for a given force.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  formulas: ["calculus-mechanics"],
  blocks: [
    def("Momentum form", r`$\vec F_{net} = \frac{d\vec p}{dt}$. For constant mass this is $m\vec a$. Writing it as a differential equation, $m\frac{dv}{dt} = F$, lets us handle forces that change with time, position or velocity.`),
    example(r`F(t) = 6t newtons acts on a 2 kg mass starting from rest`, [
      [r`a = \tfrac{6t}{2} = 3t`, ""],
      [r`v = \int_0^t 3t'\,dt' = 1.5t^2`, ""],
      [r`x = \int_0^t 1.5t'^2\,dt' = 0.5t^3`, ""],
      [r`t = 2:\ v = 6\ \text{m/s},\ x = 4\ \text{m}`, ""],
    ]),
    def("Forces that depend on position or velocity", r`If $F = F(x)$, use $a = v\frac{dv}{dx}$, so $\int mv\,dv = \int F\,dx$; this is the work–energy theorem. If $F = F(v)$, separate variables: $\int \frac{m\,dv}{F(v)} = \int dt$, as with air resistance.`),
    callout("application", "Where this shows up", r`Rocket engines whose thrust ramps up, cars whose engine force changes with speed, and robot arms with programmed force profiles are all modeled with F(t) or F(v).`),
  ],
  questions: [
    num(2, r`F(t) = 12 − 3t (N) acts on a 3 kg mass starting from rest. Find v at t = 4 s.`, 8, { unit: "m/s" }, ["a = F/m; integrate a from 0 to 4 s to find v."], r`$a = 4 - t$, so $v = 4t - \frac{t^2}{2}$.`),
    num(3, r`A 0.5 kg object starts at 2 m/s with net force F = −t (N). When is it momentarily at rest? Give two decimal places.`, 1.41, { tolerance: 0.01, unit: "s" }, ["a = F/m = −2t; integrate to get v(t) with v(0) = 2, then set v = 0."], r`$v = 2 - t^2$, so $t = \sqrt2$.`),
    mc(2, r`A constant net force acts on an object. Its momentum…`, ["stays constant", "changes at a constant rate", "grows exponentially", "falls to zero"], 1, ["Newton's second law in momentum form: F = dp/dt."], r`$\frac{dp}{dt} = F$.`),
    mc(3, r`To solve m dv/dt = −bv, the right first step is to…`, ["integrate both sides over x", "separate variables: dv/v = −(b/m) dt", "set v constant", "differentiate again"], 1, ["Put every v on one side and every t on the other before integrating."], r`Then integrate to get an exponential.`, "review"),
  ],
});
