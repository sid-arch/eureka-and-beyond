import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "boundary-behavior-polarization",
  title: "Boundary behavior of waves and polarization",
  summary: "Predict reflected and transmitted pulses at boundaries, explain phase inversion, and use Malus's law for polarized light.",
  minutes: 30,
  objectives: [
    "Predict reflection at fixed and free ends and at boundaries between media.",
    "Explain when a reflected wave is inverted (a 180° phase shift).",
    "Describe polarization and use Malus's law, I = I₀cos²θ.",
  ],
  concepts: [
    { slug: "waves", name: "Waves", description: "Disturbances that carry energy through a medium or through space without carrying matter along.", subject: "subj_phys" },
  ],
  blocks: [
    def("Reflection at boundaries", r`At a fixed end, a pulse reflects inverted; at a free end, upright. At a junction between strings, part reflects and part transmits. Going into a slower (denser) medium, the reflection is inverted; going into a faster one, it's upright. The transmitted pulse is never inverted, and its frequency stays the same.`),
    def("Light's version", r`Light reflecting off a medium with a higher index of refraction gets a 180° phase shift, which is key to thin-film colors.`),
    def("Polarization", r`Only transverse waves can be polarized. A polarizer passes only the component of the electric field along its axis. Unpolarized light loses half its intensity through the first polarizer; after that, Malus's law gives $I = I_0\cos^2\theta$ for the angle $\theta$ between the light's polarization and the next axis.`),
    example(r`100 W/m² of unpolarized light passes two polarizers at 60° to each other`, [
      [r`I_1 = \tfrac{100}{2} = 50\ \text{W/m}^2`, ""],
      [r`I_2 = 50\cos^2 60° = 12.5\ \text{W/m}^2`, ""],
    ]),
    callout("note", "Glare", r`Light reflecting off water is partly polarized horizontally, completely so at Brewster's angle, $\tan\theta_B = n$ (about 53° for water). Polarized sunglasses block horizontal polarization.`),
    callout("application", "Where this shows up", r`LCD screens, 3D movie glasses, photographers' filters, and the proof that sound (longitudinal) can't be polarized while light can.`),
  ],
  questions: [
    num(2, r`Polarized light of 80 W/m² meets a polarizer at 30° to its polarization. Find the transmitted intensity.`, 60, { unit: "W/m²" }, [], r`$80\cos^2 30° = 80(0.75)$.`),
    mc(2, r`A pulse travels from a light rope into a heavy rope. The reflected pulse is…`, ["upright", "inverted", "absent", "faster"], 1, [], r`Slower medium: inverted reflection.`),
    mc(2, r`Two polarizers are crossed at 90°. The light that gets through is…`, ["half", "a quarter", "none", "all"], 2, [], r`$\cos 90° = 0$.`),
    mc(3, r`Which wave cannot be polarized?`, ["light", "radio waves", "a wave on a string", "sound in air"], 3, [], r`Sound in air is longitudinal.`, "review"),
  ],
});
