import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "refraction-lenses",
  title: "Refraction and lenses",
  summary: "Use Snell's law and indices of refraction, find critical angles for total internal reflection, and locate images formed by converging and diverging lenses.",
  minutes: 30,
  objectives: [
    "Apply n₁ sin θ₁ = n₂ sin θ₂.",
    "Find the critical angle for total internal reflection.",
    "Use the thin lens equation and ray diagrams for converging and diverging lenses.",
  ],
  concepts: [
    { slug: "optics", name: "Optics", description: "How light reflects and refracts to form images with mirrors and lenses.", subject: "subj_phys" },
  ],
  formulas: ["optics-equations"],
  blocks: [
    def("Refraction", r`Light changes speed in a medium: $n = \frac{c}{v}$ (air ≈ 1.00, water 1.33, glass ≈ 1.5). Crossing a boundary, it bends according to Snell's law $n_1\sin\theta_1 = n_2\sin\theta_2$: toward the normal when it slows down.`),
    example(r`Light enters water from air at 30°`, [
      [r`\sin\theta_2 = \tfrac{1.00\sin 30°}{1.33} \approx 0.376`, ""],
      [r`\theta_2 \approx 22.1°`, "Bent toward the normal."],
    ]),
    def("Total internal reflection", r`Going from higher to lower $n$, beyond the critical angle $\sin\theta_c = \frac{n_2}{n_1}$ no light escapes. Water to air: $\theta_c = \sin^{-1}\frac{1}{1.33} \approx 48.8°$.`),
    example(r`A converging lens, f = 10 cm, object at 25 cm`, [
      [r`d_i = \left(\tfrac{1}{10} - \tfrac{1}{25}\right)^{-1} \approx 16.7\ \text{cm}`, "Real, on the far side."],
      [r`m \approx -0.67`, "Inverted and reduced, like a camera."],
    ]),
    activity("ray-optics", { title: "Converging and diverging lenses", params: { optic: "converging", focal: 10, object: 25 } }),
    callout("application", "Where this shows up", r`Fiber-optic internet cables trap light by total internal reflection; eyeglasses use converging lenses for farsightedness and diverging lenses for nearsightedness.`),
  ],
  questions: [
    num(2, r`Light goes from glass ($n = 1.5$) into air. Find the critical angle, to one decimal place.`, 41.8, { tolerance: 0.1, unit: "°" }, [], r`$\sin^{-1}\frac{1}{1.5} \approx 41.8°$.`),
    num(2, r`An object is 15 cm from a converging lens with f = 10 cm. Find the image distance.`, 30, { unit: "cm" }, [], r`$\frac{1}{10} - \frac{1}{15} = \frac{1}{30}$.`),
    mc(2, r`A diverging lens always forms images that are…`, ["real and inverted", "virtual, upright and smaller", "virtual and enlarged", "real and enlarged"], 1, [], r`Check it in the sim with the diverging lens.`),
    mc(3, r`A straw in a glass of water looks bent at the surface because…`, ["water reflects light", "light refracts as it leaves the water", "the straw really bends", "of the Doppler effect"], 1, [], r`Light from the straw bends at the water–air boundary.`, "review"),
  ],
});
