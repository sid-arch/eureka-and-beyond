import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "conservation-mechanical-energy",
  title: "Conservation of mechanical energy",
  summary: "Use KE + PE = constant (without friction) to find speeds and heights, and account for energy lost to friction as thermal energy.",
  minutes: 30,
  objectives: [
    "Apply KE₁ + PE₁ = KE₂ + PE₂ when only gravity and springs do work.",
    "Find speeds at different heights without knowing the path.",
    "Include work done by friction: KE₁ + PE₁ = KE₂ + PE₂ + friction losses.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["work-energy", "kinetic-energy"],
  blocks: [
    def("Conservation", r`If only conservative forces (gravity, springs) do work, total mechanical energy is constant: $\frac{1}{2}mv_1^2 + mgh_1 = \frac{1}{2}mv_2^2 + mgh_2$. Mass cancels when only gravity acts.`),
    example(r`A roller coaster starts from rest 30 m up. How fast is it at a point 10 m up?`, [
      [r`mg(30) = \tfrac{1}{2}mv^2 + mg(10)`, ""],
      [r`v = \sqrt{2(9.8)(20)} \approx 19.8\ \text{m/s}`, "The shape of the track doesn't matter."],
    ]),
    example(r`A 50 kg skier starts from rest 20 m up and reaches the bottom at 16 m/s. Energy lost to friction?`, [
      [r`50(9.8)(20) = 9800\ \text{J}`, "Initial PE."],
      [r`\tfrac{1}{2}(50)(16)^2 = 6400\ \text{J}`, "Final KE."],
      [r`9800 - 6400 = 3400\ \text{J}`, "Became thermal energy."],
    ]),
    activity("spring-oscillator", { title: "Total energy stays constant" }),
    callout("application", "Where this shows up", r`Hydroelectric dams turn the potential energy of high water into kinetic energy and then electricity; pole vaulters convert running KE into elastic PE and then height.`),
    activity("energy-track", { title: "Energy on a track", params: { height: 4, mass: 2, friction: 0 } }),
    callout("tip", "Try this", r`Release the ball with no friction and watch the energy bars trade off while the total stays put. Then add friction and watch thermal energy grow.`, "experiment"),
  ],
  questions: [
    num(1, r`A ball is dropped from 20 m. Find its speed just before landing, to one decimal place.`, 19.8, { tolerance: 0.05, unit: "m/s" }, [], r`$\sqrt{2(9.8)(20)}$.`),
    num(2, r`A pendulum bob passes the bottom at 3 m/s. How high above the bottom does it rise, to three decimal places?`, 0.459, { tolerance: 0.002, unit: "m" }, [], r`$h = \frac{v^2}{2g} = \frac{9}{19.6}$.`),
    mc(2, r`Two balls, 1 kg and 5 kg, roll from rest down the same frictionless ramp. At the bottom…`, ["the 5 kg ball is faster", "the 1 kg ball is faster", "they have equal speeds", "they have equal kinetic energies"], 2, [], r`Mass cancels in $mgh = \frac{1}{2}mv^2$.`),
    num(3, r`A 2 kg block leaves a spring ($k = 800$ N/m, compressed 0.2 m) on a frictionless floor. Find its speed.`, 4, { unit: "m/s" }, [], r`$\frac{1}{2}(800)(0.04) = 16 = \frac{1}{2}(2)v^2$.`, "review"),
  ],
});
