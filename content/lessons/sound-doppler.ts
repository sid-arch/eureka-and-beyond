import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sound-doppler",
  title: "Sound and the Doppler effect",
  summary: "Relate pitch and loudness to frequency and intensity, use the decibel scale, and compute frequency shifts from moving sources and observers.",
  minutes: 30,
  objectives: [
    "Connect pitch to frequency and loudness to intensity.",
    "Use the decibel scale: +10 dB means 10 times the intensity.",
    "Apply the Doppler equation with correct signs.",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  formulas: ["wave-speed"],
  blocks: [
    def("Sound", r`Sound is a longitudinal pressure wave, about 343 m/s in air at 20 °C (faster in liquids and solids). Pitch depends on frequency; humans hear about 20 Hz to 20 kHz. Loudness depends on intensity; each +10 dB multiplies intensity by 10.`),
    def("Doppler effect", r`$f' = f\,\frac{v \pm v_o}{v \mp v_s}$. Use the top signs for motion toward each other (higher pitch) and the bottom signs for moving apart (lower pitch).`),
    example(r`An ambulance siren (700 Hz) moves at 30 m/s`, [
      [r`\text{approaching: } 700\cdot\tfrac{343}{343 - 30} \approx 767\ \text{Hz}`, ""],
      [r`\text{receding: } 700\cdot\tfrac{343}{343 + 30} \approx 644\ \text{Hz}`, "The familiar drop in pitch as it passes."],
    ]),
    callout("application", "Where this shows up", r`Police radar, weather radar and Doppler ultrasound of blood flow all measure speed from frequency shifts; astronomers use the same idea with light (redshift).`),
  ],
  questions: [
    num(2, r`A 500 Hz source approaches a still listener at 20 m/s (v = 343 m/s). What frequency is heard, to the nearest Hz?`, 531, { tolerance: 1, unit: "Hz" }, [], r`$500 \cdot \frac{343}{323} \approx 531$.`),
    mc(1, r`A sound goes from 60 dB to 80 dB. Its intensity becomes…`, ["2 times as large", "20 times as large", "100 times as large", "1.33 times as large"], 2, [], r`+20 dB: $10 \times 10$.`),
    num(2, r`Lightning is seen, and thunder heard 3 s later. How far away was it, in meters (343 m/s)?`, 1029, { tolerance: 2, unit: "m" }, [], r`$343 \times 3$ (light's travel time is negligible).`),
    mc(3, r`A listener drives away from a stationary siren. The pitch they hear is…`, ["higher", "lower", "the same", "zero"], 1, [], r`Moving apart lowers the frequency.`, "review"),
  ],
});
