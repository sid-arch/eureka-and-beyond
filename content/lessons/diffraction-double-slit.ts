import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "diffraction-double-slit",
  title: "Diffraction and double-slit interference",
  summary: "Explain diffraction, find bright fringes in double-slit and grating patterns, fringe spacing on a screen, and single-slit dark fringes.",
  minutes: 40,
  objectives: [
    "Explain diffraction and why Young's experiment shows light is a wave.",
    "Use d sin θ = mλ and Δy = λL/d for double slits and gratings.",
    "Use a sin θ = mλ for single-slit minima.",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  formulas: ["interference"],
  blocks: [
    def("Diffraction", r`Waves spread out after passing through an opening or around an edge, most noticeably when the opening is about the size of the wavelength. Light's wavelength is tiny, which is why light seems to travel in straight lines.`),
    def("Double slit", r`Light from two slits interferes. The path difference to a point on the screen is $d\sin\theta$. Bright fringes appear where $d\sin\theta = m\lambda$ and dark fringes where $d\sin\theta = (m + \frac12)\lambda$. For small angles, the fringes are evenly spaced: $\Delta y = \frac{\lambda L}{d}$.`),
    example(r`550 nm light, slits 0.25 mm apart, screen 2 m away`, [
      [r`\Delta y = \tfrac{(550\times10^{-9})(2)}{0.25\times10^{-3}} = 4.4\ \text{mm}`, ""],
    ]),
    def("Gratings and single slits", r`A diffraction grating has thousands of slits per millimeter, giving very sharp, widely spaced bright lines at the same $d\sin\theta = m\lambda$. A single slit of width $a$ has dark fringes at $a\sin\theta = m\lambda$ ($m \ne 0$), with a broad central maximum.`),
    example(r`550 nm light on a grating with 600 lines/mm`, [
      [r`d = \tfrac{1}{600}\ \text{mm} \approx 1.67\ \mu\text{m}`, ""],
      [r`\theta_1 = \sin^{-1}\tfrac{550\times10^{-9}}{1.67\times10^{-6}} \approx 19.3°`, ""],
    ]),
    activity("double-slit", { title: "Change the wavelength and the slits", params: { wavelength: 550, separation: 0.25, distance: 2, width: 0.04 } }),
    callout("tip", "Try this", r`Switch from red to violet light: the fringes squeeze together. Halve the slit separation: they spread twice as far. Widen the slits to see the single-slit envelope narrow.`, "experiment"),
    callout("application", "Where this shows up", r`Spectrometers use gratings to identify elements in stars, CDs show rainbow colors from their track spacing, and diffraction limits how fine a detail any microscope or telescope can resolve.`),
  ],
  questions: [
    num(2, r`Red light (650 nm) through slits 0.5 mm apart lands on a screen 1.5 m away. Find the fringe spacing in mm, to two decimal places.`, 1.95, { tolerance: 0.01, unit: "mm" }, [], r`$\frac{650\times10^{-9}(1.5)}{0.5\times10^{-3}}$.`),
    num(3, r`Light through a 0.02 mm slit has its first dark fringe at 1.8°. Find λ, to the nearest 10 nm.`, 630, { tolerance: 10, unit: "nm" }, [], r`$\lambda = a\sin\theta = 2\times10^{-5}\sin 1.8° \approx 628$ nm.`),
    mc(2, r`Reducing the slit separation makes the fringes…`, ["closer together", "farther apart", "unchanged", "disappear"], 1, [], r`$\Delta y \propto \frac{1}{d}$.`),
    mc(3, r`Young's double-slit experiment showed that light…`, ["is made of particles", "behaves as a wave", "has no wavelength", "travels instantly"], 1, [], r`Interference is a wave behavior.`, "review"),
  ],
});
