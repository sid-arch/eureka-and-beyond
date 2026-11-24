import { callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "log-scales-modeling",
  title: "Logarithmic scales and modeling data",
  summary: "Work with decibels, pH and the Richter scale, and use logarithms to linearize exponential data and fit models.",
  minutes: 30,
  objectives: [
    "Compute and compare values on logarithmic scales (decibels, pH, magnitude).",
    "Explain why log scales compress huge ranges.",
    "Linearize exponential data by taking logarithms and find an exponential model.",
  ],
  concepts: [
    { slug: "logarithms", name: "Logarithms", description: "Exponents: log_b x is the power of b that gives x.", subject: "subj_math" },
  ],
  formulas: ["log-properties"],
  blocks: [
    text(r`Sound intensity, acidity and earthquake energy span ranges of billions. A logarithmic scale replaces each value with its exponent, so each step of 1 means a multiplication by 10 (or another base).`),
    def("Common scales", r`Decibels: $L = 10\log\frac{I}{I_0}$. pH: $\text{pH} = -\log[\text{H}^+]$. Richter-style magnitude: each whole unit is 10 times the measured amplitude (about 32 times the energy).`),
    example(r`How many times more intense is a 90 dB sound than a 60 dB sound?`, [
      [r`90 - 60 = 30 \text{ dB} = 10\log\tfrac{I_1}{I_2}`, ""],
      [r`\tfrac{I_1}{I_2} = 10^3 = 1000`, ""],
    ]),
    example(r`Data: $(0, 3), (1, 6), (2, 12), (3, 24)$. Show it's exponential with logs and find the model.`, [
      [r`\ln y: 1.099, 1.792, 2.485, 3.178`, "Equal steps of 0.693: linear in x."],
      [r`\ln y = 1.099 + 0.693x \Rightarrow y = e^{1.099}e^{0.693x} = 3 \cdot 2^x`, ""],
    ]),
    callout("application", "Where this shows up", r`Scientists plot exponential data on log-scale (semi-log) graphs, where it appears as a straight line; this is how epidemic curves, Moore's law and radioactive decay are often shown.`),
  ],
  questions: [
    num(1, r`What is the pH of a solution with $[\text{H}^+] = 10^{-5}$?`, 5, {}, [], r`5.`),
    num(2, r`An earthquake of magnitude 7 has how many times the amplitude of a magnitude 5 quake?`, 100, {}, [], r`$10^2 = 100$.`),
    num(2, r`Find the decibel level of a sound with intensity $10^{8}$ times the threshold.`, 80, { unit: "dB" }, [], r`$10 \cdot 8 = 80$ dB.`),
    num(3, r`Lemon juice has pH 2 and milk pH 6.5. How many times greater is lemon juice's $[\text{H}^+]$? Round to the nearest whole number.`, 31623, { tolerance: 1 }, [r`$10^{4.5}$.`], r`$10^{4.5} \approx 31{,}623$.`, "review"),
  ],
});
