import { activity, callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "amplitude-period-phase",
  title: "Amplitude, period and phase shift",
  summary: "Graph y = A sin(B(x − C)) + D, read its amplitude, period, phase shift and midline, and write a sinusoidal model from a graph or situation.",
  minutes: 30,
  objectives: [
    "Identify amplitude, period, phase shift and midline from an equation.",
    "Graph a transformed sine or cosine.",
    "Write a sinusoidal model from a graph or real data.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  formulas: ["sinusoid"],
  blocks: [
    def("Parameters", r`In $y = A\sin(B(x - C)) + D$: amplitude $|A|$; period $\frac{2\pi}{|B|}$; phase shift $C$ (right if $C > 0$); midline $y = D$. Max $D + |A|$, min $D - |A|$.`),
    activity("sinusoid", { title: "Change one parameter at a time", params: { A: 2, B: 2, C: 0.8, D: 1 } }),
    callout("tip", "Try this", r`Change only B and watch the period readout: doubling B halves the period. Then change C: the whole wave slides without changing shape.`, "experiment"),
    example(r`Describe $y = 3\cos\left(2\left(x - \tfrac{\pi}{4}\right)\right) - 1$`, [
      [r`\text{amplitude } 3,\ \text{period } \pi`, ""],
      [r`\text{shift right } \tfrac{\pi}{4},\ \text{midline } y = -1`, "Max 2, min −4."],
    ]),
    example(r`A Ferris wheel 40 m across has its center 25 m up and turns once every 8 minutes. A rider starts at the bottom. Model height.`, [
      [r`A = 20,\ D = 25,\ B = \tfrac{2\pi}{8} = \tfrac{\pi}{4}`, ""],
      [r`h(t) = -20\cos\left(\tfrac{\pi}{4}t\right) + 25`, "Starting at the bottom: a negative cosine."],
    ], r`Check: $h(0) = 5$ m (bottom) and $h(4) = 45$ m (top).`),
    callout("application", "Where this shows up", r`Tide tables, temperature cycles, sound frequencies (B sets the pitch) and biological rhythms are modeled with these four parameters.`),
  ],
  questions: [
    num(1, r`What is the amplitude of $y = -5\sin(3x)$?`, 5, {}, [], r`5.`),
    short(2, r`What is the period of $y = \sin(4x)$? Use the format pi/2.`, ["pi/2", "π/2"], [], r`$\frac{2\pi}{4} = \frac{\pi}{2}$.`),
    mc(2, r`What is the phase shift of $y = \cos\left(x + \frac{\pi}{3}\right)$?`, [r`$\frac{\pi}{3}$ right`, r`$\frac{\pi}{3}$ left`, r`$3$ left`, "None"], 1, [], r`$x + \frac{\pi}{3} = x - \left(-\frac{\pi}{3}\right)$: left $\frac{\pi}{3}$.`),
    num(2, r`What is the minimum value of $y = 4\sin x + 7$?`, 3, {}, [], r`$7 - 4 = 3$.`),
    num(3, r`High tide is 9 m and low tide is 3 m, 6.2 hours apart. What is the amplitude in meters?`, 3, { unit: "m" }, [], r`$\frac{9 - 3}{2} = 3$ (midline 6, period 12.4 h).`, "review"),
  ],
});
