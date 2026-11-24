import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "thin-film-interference",
  title: "Thin-film interference",
  summary: "Explain the colors of soap bubbles and oil slicks, account for phase shifts on reflection, and design anti-reflective coatings.",
  minutes: 35,
  objectives: [
    "Identify phase shifts when light reflects from a higher-index medium.",
    "Find constructive and destructive conditions for thin films.",
    "Compute anti-reflective coating thickness, t = λ/(4n).",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  formulas: ["interference"],
  blocks: [
    def("Two reflections", r`Light reflects from both the top and bottom surfaces of a thin film. The bottom ray travels an extra $2t$ inside the film, where the wavelength is $\frac{\lambda}{n}$. Each reflection off a higher-index medium adds a half-wavelength shift.`),
    def("Conditions (near-normal incidence)", r`If exactly one reflection is shifted (a soap film in air, oil on water): constructive when $2nt = (m + \frac12)\lambda$, destructive when $2nt = m\lambda$. If both or neither are shifted (a coating on glass): swap the two conditions.`),
    example(r`A soap film (n = 1.33), 100 nm thick, in air`, [
      [r`2nt = (m + \tfrac12)\lambda \Rightarrow \lambda = \tfrac{4nt}{2m + 1}`, "Only the top reflection is shifted."],
      [r`m = 0:\ \lambda = 4(1.33)(100) = 532\ \text{nm}`, "The film looks green."],
    ]),
    example(r`An anti-reflective coating (n = 1.38) on glass (n = 1.5) for 550 nm`, [
      [r`2nt = \tfrac{\lambda}{2} \Rightarrow t = \tfrac{\lambda}{4n}`, "Both reflections are shifted; we want destructive interference."],
      [r`t = \tfrac{550}{4(1.38)} \approx 99.6\ \text{nm}`, ""],
    ]),
    callout("application", "Where this shows up", r`Camera lenses and eyeglasses use anti-reflective coatings; peacock feathers, butterfly wings and oil slicks get their shimmering colors from thin layers.`),
  ],
  questions: [
    num(2, r`Find the thinnest coating (n = 1.25) on glass that cancels reflected 600 nm light.`, 120, { unit: "nm" }, [], r`$\frac{600}{4(1.25)}$.`),
    num(3, r`A soap film (n = 1.33) in air strongly reflects 665 nm light at its thinnest. Find its thickness, to the nearest nm.`, 125, { tolerance: 1, unit: "nm" }, [], r`$t = \frac{\lambda}{4n} = \frac{665}{5.32}$.`),
    mc(2, r`A soap film gets so thin (t ≪ λ) that it looks black just before popping. Why?`, ["It absorbs light", "The single phase shift makes the two reflections cancel", "It's too thin to reflect", "It turns opaque"], 1, [], r`With $t \to 0$, only the half-wavelength shift remains: destructive.`),
    mc(3, r`Oil (n = 1.45) floats on water (n = 1.33). How many reflections get a phase shift?`, ["0", "1", "2", "3"], 1, [], r`Only the top (air to oil); oil to water goes to a lower index.`, "review"),
  ],
});
