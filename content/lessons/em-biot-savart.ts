import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-biot-savart",
  title: "Magnetic fields of current-carrying wires and the Biot–Savart law",
  summary: "Use the Biot–Savart law to find magnetic fields at the center of loops and arcs and near straight wires, and combine them by superposition.",
  minutes: 45,
  objectives: [
    "State the Biot–Savart law, dB = (μ₀/4π) I dℓ × r̂/r².",
    "Derive B at the center of a loop, μ₀I/(2R), and of an arc, μ₀Iθ/(4πR).",
    "Find B near a long straight wire, μ₀I/(2πd), and combine segments.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction"],
  blocks: [
    def("Biot–Savart law", r`Each current element contributes $d\vec B = \frac{\mu_0}{4\pi}\frac{I\,d\vec\ell\times\hat r}{r^2}$, with $\mu_0 = 4\pi\times10^{-7}$ T·m/A. It's the magnetic analog of Coulomb's law: integrate along the wire.`),
    example(r`The center of a circular loop of radius R`, [
      [r`d\vec\ell \perp \hat r\ \text{everywhere, and}\ r = R`, ""],
      [r`B = \tfrac{\mu_0 I}{4\pi R^2}\oint d\ell = \tfrac{\mu_0I}{4\pi R^2}(2\pi R)`, ""],
      [r`B = \tfrac{\mu_0I}{2R}`, ""],
      [r`I = 5\ \text{A},\ R = 0.1\ \text{m}:\ B \approx 3.14\times10^{-5}\ \text{T}`, ""],
    ]),
    def("Arcs and straight wires", r`An arc subtending angle $\theta$ gives $B = \frac{\mu_0I\theta}{4\pi R}$ at its center: a quarter circle gives a quarter of the full loop. Straight segments pointing directly at the center contribute nothing ($d\vec\ell\parallel\hat r$). Integrating along an infinite straight wire gives $B = \frac{\mu_0I}{2\pi d}$.`),
    callout("application", "Where this shows up", r`MRI and particle-detector magnet coils are designed by integrating Biot–Savart over every turn.`),
  ],
  questions: [
    num(2, r`Find B at the center of a quarter-circle arc (R = 0.1 m, I = 5 A) with straight leads pointing at the center, in μT, to two decimal places.`, 7.85, { tolerance: 0.02, unit: "μT" }, ["A full loop gives μ₀I/(2R) at its center; a quarter arc gives a quarter of that.", "The straight leads point at the center, so they contribute nothing."], r`$\frac{\mu_0I}{8R} = \frac{4\pi\times10^{-7}(5)}{0.8}$.`),
    num(2, r`A 20-turn flat coil of radius 0.05 m carries 2 A. Find B at its center, in mT, to three decimal places.`, 0.503, { tolerance: 0.002, unit: "mT" }, ["Each turn gives μ₀I/(2R); multiply by N."], r`$20\frac{\mu_0I}{2R}$.`),
    mc(2, r`A straight wire segment aimed directly at point P contributes ___ to B at P.`, ["the most", "nothing", "half", "a negative amount"], 1, ["In Biot–Savart, dℓ × r̂ is zero when dℓ points along r̂."], r`$d\vec\ell\times\hat r = 0$.`),
    mc(3, r`Doubling a loop's radius (same current) changes B at its center by a factor of…`, ["2", "½", "4", "¼"], 1, ["At the center of a loop B = μ₀I/(2R)."], r`$B \propto \frac1R$.`, "review"),
  ],
});
