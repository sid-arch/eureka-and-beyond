import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "snells-law-refraction",
  title: "Refraction",
  summary: "Apply Snell's law between any two media, find speeds and wavelengths in materials, explain apparent depth and dispersion, and compute critical angles.",
  minutes: 35,
  objectives: [
    "Use n = c/v and n₁ sin θ₁ = n₂ sin θ₂ between any two media.",
    "Explain why frequency stays fixed while wavelength changes: λ_n = λ/n.",
    "Compute apparent depth and critical angles, and explain dispersion.",
  ],
  concepts: [
    { slug: "optics", name: "Optics", description: "How light reflects and refracts to form images with mirrors and lenses.", subject: "subj_phys" },
  ],
  formulas: ["optics-equations"],
  blocks: [
    def("Speed and wavelength", r`In a medium of index $n$, light travels at $v = \frac{c}{n}$: in glass ($n = 1.5$), $2\times10^8$ m/s. Its frequency is set by the source and doesn't change, so the wavelength shrinks to $\lambda_n = \frac{\lambda}{n}$.`),
    example(r`Light passes from glass (n = 1.50) into water (n = 1.33) at 40°`, [
      [r`\sin\theta_2 = \tfrac{1.50\sin 40°}{1.33} \approx 0.725`, ""],
      [r`\theta_2 \approx 46.5°`, "Bent away from the normal: water has the lower index."],
    ]),
    def("Apparent depth", r`Looking straight down into water, objects appear at depth $d' \approx \frac{d}{n}$: a 2 m pool looks about 1.5 m deep.`),
    def("Dispersion and total internal reflection", r`$n$ depends slightly on wavelength (violet bends most), so prisms and raindrops split white light. Going to a lower index, beyond $\theta_c = \sin^{-1}\frac{n_2}{n_1}$ all the light reflects; diamond ($n = 2.42$) has $\theta_c \approx 24.4°$, which traps light and makes it sparkle.`),
    activity("ray-optics", { title: "Refraction in a lens", params: { optic: "converging", focal: 10, object: 25 } }),
    callout("application", "Where this shows up", r`Rainbows, mirages, fiber optics and the shimmer above hot roads all come from refraction.`),
  ],
  questions: [
    num(1, r`Find the speed of light in water (n = 1.33), in units of $10^8$ m/s, to two decimal places.`, 2.26, { tolerance: 0.01 }, [], r`$\frac{3}{1.33}$.`),
    num(2, r`633 nm laser light enters glass (n = 1.5). Find its wavelength inside, in nm.`, 422, { unit: "nm" }, [], r`$\frac{633}{1.5}$.`),
    mc(2, r`When light enters glass from air, which stays the same?`, ["speed", "wavelength", "frequency", "direction"], 2, [], r`The source sets the frequency.`),
    mc(3, r`Total internal reflection can happen when light goes from…`, ["air to water", "water to glass", "glass to air", "any medium to any medium"], 2, [], r`It needs a move to a lower index.`, "review"),
  ],
});
