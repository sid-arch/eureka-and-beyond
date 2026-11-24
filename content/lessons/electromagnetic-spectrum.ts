import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electromagnetic-spectrum",
  title: "The electromagnetic spectrum",
  summary: "Describe light as an electromagnetic wave traveling at c, order the spectrum from radio to gamma rays, and use c = fλ.",
  minutes: 25,
  objectives: [
    "Order the bands of the electromagnetic spectrum by wavelength and frequency.",
    "Use c = fλ with c = 3.00 × 10⁸ m/s.",
    "Connect higher frequency to higher photon energy.",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  formulas: ["wave-speed"],
  blocks: [
    def("EM waves", r`Light is a transverse wave of electric and magnetic fields that needs no medium; in vacuum all EM waves travel at $c = 3.00 \times 10^8$ m/s. From long wavelength to short: radio, microwaves, infrared, visible (about 700 nm red to 400 nm violet), ultraviolet, X-rays, gamma rays.`),
    example(r`Wavelength of a 100 MHz FM radio station`, [
      [r`\lambda = \tfrac{c}{f} = \tfrac{3 \times 10^8}{1 \times 10^8} = 3\ \text{m}`, ""],
    ]),
    example(r`Frequency of green light, λ = 550 nm`, [
      [r`f = \tfrac{3 \times 10^8}{5.5 \times 10^{-7}} \approx 5.5 \times 10^{14}\ \text{Hz}`, ""],
    ]),
    callout("note", "Energy", r`Each photon carries energy $E = hf$. Higher-frequency light (UV, X-rays) carries more energy per photon, which is why it can damage cells while radio waves can't.`),
    callout("application", "Where this shows up", r`Wi-Fi (2.4 and 5 GHz), microwave ovens, TV remotes (infrared), medical X-rays and sunscreen (UV protection) each use a different band.`),
  ],
  questions: [
    num(1, r`Find the wavelength of 2.4 GHz Wi-Fi, in meters.`, 0.125, { tolerance: 0.001, unit: "m" }, [], r`$\frac{3 \times 10^8}{2.4 \times 10^9}$.`),
    mc(2, r`Which has the highest frequency?`, ["Radio", "Infrared", "Ultraviolet", "Microwave"], 2, [], r`Shortest wavelength of the four.`),
    mc(2, r`In a vacuum, red light and blue light have the same…`, ["frequency", "wavelength", "speed", "photon energy"], 2, [], r`All EM waves travel at c.`),
    num(3, r`Light takes about 500 s to travel from the Sun to Earth. Estimate the distance, in units of $10^{11}$ m.`, 1.5, { tolerance: 0.01 }, [], r`$3 \times 10^8 \times 500 = 1.5 \times 10^{11}$ m.`, "review"),
  ],
});
