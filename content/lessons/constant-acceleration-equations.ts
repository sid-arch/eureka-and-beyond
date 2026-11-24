import { activity, callout, def, example, lesson, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "constant-acceleration-equations",
  title: "Equations for constant acceleration",
  summary: "Solve one-dimensional motion problems with the four constant-acceleration equations, choosing the equation that skips the unknown you don't need.",
  minutes: 30,
  objectives: [
    "List knowns and the unknown with signs.",
    "Choose the kinematic equation that contains exactly the quantities involved.",
    "Solve stopping-distance and speed-up problems.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  formulas: ["kinematic-equations", "displacement-constant-acceleration"],
  blocks: [
    def("The four equations", r`$v = v_0 + at$; $\Delta x = v_0t + \frac{1}{2}at^2$; $v^2 = v_0^2 + 2a\Delta x$; $\Delta x = \frac{v_0 + v}{2}t$. Each leaves out one of $v$, $\Delta x$, $t$, $v_0$ (or $a$).`),
    example(r`A car at 20 m/s brakes at −5 m/s². How far does it go before stopping?`, [
      [r`v_0 = 20,\ v = 0,\ a = -5,\ \Delta x = ?`, "Time isn't asked: use v² = v₀² + 2aΔx."],
      [r`0 = 400 - 10\Delta x \Rightarrow \Delta x = 40\ \text{m}`, ""],
      [r`t = \tfrac{0 - 20}{-5} = 4\ \text{s}`, "If needed, v = v₀ + at."],
    ]),
    activity("motion-graphs", { title: "Braking to a stop", params: { v0: 10, a: -2.5, x0: 0, t: 4 } }),
    callout("warning", "Speed doubles, distance quadruples", r`Stopping distance is $\frac{v_0^2}{2|a|}$, so twice the speed needs four times the distance. This is why speed limits near schools are low.`),
    callout("application", "Where this shows up", r`Runway lengths, highway on-ramp lengths and the yellow-light timing at intersections are all designed with these equations.`),
  ],
  questions: [
    num(1, r`From rest, a cart accelerates at 2 m/s² for 6 s. How far does it go?`, 36, { unit: "m" }, [], r`$\frac{1}{2}(2)(36) = 36$.`),
    num(1, r`What is its speed at 6 s?`, 12, { unit: "m/s" }, [], r`$0 + 2(6)$.`),
    num(2, r`A plane needs 70 m/s to take off and accelerates at 3.5 m/s² from rest. What runway length is needed?`, 700, { unit: "m" }, [], r`$\Delta x = \frac{v^2}{2a} = \frac{4900}{7} = 700$.`),
    num(3, r`A car at 30 m/s brakes at −6 m/s². What is its stopping distance?`, 75, { unit: "m" }, [], r`$\frac{900}{12} = 75$.`, "review"),
  ],
});
