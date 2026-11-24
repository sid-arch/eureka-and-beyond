import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "free-fall",
  title: "Free fall",
  summary: "Model objects moving only under gravity with constant acceleration g = 9.8 m/s² downward, for drops and upward throws.",
  minutes: 30,
  objectives: [
    "Use a = −9.8 m/s² (taking up as positive) for free fall.",
    "Find fall times and impact speeds.",
    "Analyze an upward throw: time to the top, maximum height and symmetry.",
  ],
  concepts: [
    { slug: "kinematics", name: "Kinematics", description: "Describing motion with position, velocity and acceleration.", subject: "subj_phys" },
  ],
  formulas: ["kinematic-equations"],
  blocks: [
    def("Free fall", r`Ignoring air resistance, every object near Earth's surface accelerates downward at $g = 9.8$ m/s², whatever its mass. At the top of a throw the velocity is 0, but the acceleration is still $-9.8$ m/s².`),
    example(r`A stone is dropped from 45 m. How long does it fall, and how fast is it going?`, [
      [r`45 = \tfrac{1}{2}(9.8)t^2 \Rightarrow t \approx 3.03\ \text{s}`, "Taking down as positive here."],
      [r`v = \sqrt{2(9.8)(45)} \approx 29.7\ \text{m/s}`, ""],
    ]),
    example(r`A ball is thrown up at 19.6 m/s`, [
      [r`t_{\text{top}} = \tfrac{19.6}{9.8} = 2\ \text{s}`, "v = 0 at the top."],
      [r`h_{\max} = \tfrac{19.6^2}{2(9.8)} = 19.6\ \text{m}`, ""],
      [r`\text{back to the hand at } t = 4\ \text{s, at 19.6 m/s downward}`, "Symmetry."],
    ]),
    activity("motion-graphs", { title: "A vertical throw (up is positive)", params: { v0: 10, a: -5, x0: 0, t: 2 } }),
    callout("note", "About the sim", r`The sim's acceleration slider stops at ±5 m/s², so it shows a gentler "gravity"; the shapes of the graphs are the same as for $g = 9.8$.`, "experiment"),
    callout("application", "Where this shows up", r`Divers, basketball players and engineers designing drop tests all use free-fall equations; on the Moon, $g$ is about 1.6 m/s², so the same jump lasts six times longer.`),
  ],
  questions: [
    num(1, r`How fast is a dropped object moving after 2 s?`, 19.6, { tolerance: 0.01, unit: "m/s" }, [], r`$9.8 \times 2$.`),
    num(2, r`How far does it fall in those 2 s?`, 19.6, { tolerance: 0.01, unit: "m" }, [], r`$\frac{1}{2}(9.8)(4)$.`),
    num(2, r`A ball is thrown up at 14.7 m/s. How long until it reaches the top?`, 1.5, { tolerance: 0.001, unit: "s" }, [], r`$\frac{14.7}{9.8}$.`),
    mc(3, r`At the very top of its flight, a ball thrown straight up has…`, ["zero velocity and zero acceleration", "zero velocity and acceleration 9.8 m/s² downward", "maximum velocity", "acceleration upward"], 1, [], r`Gravity never switches off.`, "review"),
  ],
});
