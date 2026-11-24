import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "chromatography-separation",
  title: "Separation of solutions and mixtures; chromatography",
  summary: "Separate mixtures by distillation and chromatography, compute Rf values, and explain separations with intermolecular forces and polarity.",
  minutes: 30,
  objectives: [
    "Explain how distillation separates liquids by boiling point (IMF strength).",
    "Compute Rf = distance traveled by the spot / distance traveled by the solvent.",
    "Predict the order of separation from polarity of the components, the mobile phase and the stationary phase.",
  ],
  concepts: [
    { slug: "solutions", name: "Solutions", description: "Homogeneous mixtures, their concentrations and properties.", subject: "subj_chem" },
  ],
  blocks: [
    def("Chromatography", r`A mixture is carried by a moving solvent (mobile phase) over a surface (stationary phase). Components that interact more with the stationary phase move more slowly. $R_f = \frac{d_{spot}}{d_{solvent}}$ is between 0 and 1.`),
    example(r`A spot moves 3.2 cm while the solvent front moves 8.0 cm`, [
      [r`R_f = \tfrac{3.2}{8.0} = 0.40`, ""],
    ]),
    def("Polarity rules", r`On polar paper with a nonpolar solvent, nonpolar components move farther (higher Rf); polar ones stick to the paper. Reverse the polarities and the order reverses.`),
    callout("application", "Where this shows up", r`Gas chromatography in drug testing, ink analysis in forensics, and fractional distillation of crude oil.`),
  ],
  questions: [
    num(2, r`A dye travels 4.5 cm; the solvent front travels 7.5 cm. Find Rf.`, 0.6, {}, ["Rf = distance moved by the spot ÷ distance moved by the solvent front."], r`$\frac{4.5}{7.5}$.`),
    mc(2, r`On a nonpolar (reversed-phase) plate with water as the solvent, which component moves farthest?`, ["a nonpolar hydrocarbon", "a very polar dye", "they all move the same", "none move"], 1, ["Like dissolves like. Which component prefers the polar mobile phase over the nonpolar stationary surface?"], r`The polar dye prefers the polar mobile phase and isn't held by the nonpolar surface.`),
    mc(2, r`Distillation separates components by differences in…`, ["color", "boiling point", "mass", "charge"], 1, ["Distillation heats a mixture and collects what vaporizes first."], r`Which reflects IMF strength.`),
    mc(3, r`A component with a high Rf on polar paper with a nonpolar solvent is likely…`, ["very polar", "nonpolar", "ionic", "insoluble"], 1, ["High Rf means the component spends most of its time in the mobile phase. Which kind of substance prefers a nonpolar solvent?"], r`It prefers the nonpolar mobile phase.`, "review"),
  ],
});
