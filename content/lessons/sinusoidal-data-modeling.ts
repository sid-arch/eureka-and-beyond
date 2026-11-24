import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sinusoidal-data-modeling",
  title: "Sinusoidal function context and data modeling",
  summary: "Build sinusoidal models y = a cos(b(x − h)) + k from maximum, minimum and timing information, and use them to predict.",
  minutes: 30,
  objectives: [
    "Find amplitude, midline and period from data or a description.",
    "Compute b = 2π / period and choose a phase shift from the time of a maximum or minimum.",
    "Use the model to predict values and times.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  formulas: ["sinusoid"],
  blocks: [
    def("Building the model", r`$a = \frac{\max - \min}{2}$, $k = \frac{\max + \min}{2}$, $b = \frac{2\pi}{\text{period}}$. Using cosine, set $h$ to the input of a maximum: $y = a\cos(b(x - h)) + k$. (Use $-a$ and a minimum if that's easier.)`),
    example(r`Daylight in a northern city: 15 h at most on day 172, 9 h at least, period 365 days`, [
      [r`a = 3,\ k = 12`, ""],
      [r`b = \tfrac{2\pi}{365} \approx 0.0172`, ""],
      [r`D(t) = 3\cos\left(\tfrac{2\pi}{365}(t - 172)\right) + 12`, "Maximum at t = 172."],
    ], r`Half a year later, $t \approx 354.5$: $\cos\pi = -1$, so $D = 9$ hours, the minimum.`),
    example(r`Temperature peaks at 30 °C at 3 p.m. and bottoms at 18 °C at 3 a.m. daily. Predict 9 a.m.`, [
      [r`a = 6,\ k = 24,\ \text{period } 24 \text{ h}`, ""],
      [r`9 \text{ a.m. is a quarter period after the minimum}`, "On the midline, rising."],
      [r`T = 24\ \text{°C}`, ""],
    ]),
    activity("sinusoid", { title: "Fit amplitude, period, phase and midline", params: { A: 3, B: 0.5, C: 1, D: 1 } }),
    callout("warning", "Real data aren't perfect", r`Measured data scatter around the model. A sinusoidal regression finds the best-fitting parameters; check residuals for patterns, and remember a model describes typical behavior, not exact values.`),
    callout("application", "Where this shows up", r`Utilities forecast electricity demand with sinusoidal models (daily and yearly cycles), and biologists model circadian rhythms the same way.`),
  ],
  questions: [
    num(1, r`A sinusoid has period 12. Find $b$ to four decimal places.`, 0.5236, { tolerance: 0.0001 }, [], r`$\frac{2\pi}{12} = \frac{\pi}{6} \approx 0.5236$.`),
    num(2, r`Water depth at a dock varies between 2 m and 10 m. What is the amplitude, in meters?`, 4, { unit: "m" }, [], r`$\frac{10 - 2}{2} = 4$.`),
    num(2, r`Using $D(t) = 3\cos\left(\frac{2\pi}{365}(t - 172)\right) + 12$, how many hours of daylight are there on day 172?`, 15, { unit: "h" }, [], r`$\cos 0 = 1$: $3 + 12 = 15$.`),
    mc(3, r`A buoy bobs between 1 m and 3 m above the sea floor, reaching the top at $t = 0$ s and again at $t = 4$ s. Which model fits?`, [r`$y = \cos\left(\frac{\pi}{2}t\right) + 2$`, r`$y = 2\cos(4t) + 1$`, r`$y = \sin\left(\frac{\pi}{2}t\right) + 2$`, r`$y = \cos(2\pi t) + 2$`], 0, ["Period 4, so b = 2π/4."], r`$a = 1$, $k = 2$, $b = \frac{\pi}{2}$, and cosine starts at its maximum.`, "review"),
  ],
});
