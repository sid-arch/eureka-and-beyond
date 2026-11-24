import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electron-configurations",
  title: "Electron configurations",
  summary: "Write electron configurations and orbital diagrams with the Aufbau principle, Pauli exclusion and Hund's rule, use noble-gas shorthand, and count valence electrons.",
  minutes: 35,
  objectives: [
    "Fill orbitals in Aufbau order: 1s 2s 2p 3s 3p 4s 3d 4p…",
    "Apply the Pauli exclusion principle and Hund's rule in orbital diagrams.",
    "Write noble-gas shorthand and identify valence electrons.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  blocks: [
    def("Orbitals", r`Energy levels (n = 1, 2, 3…) contain sublevels s, p, d and f with 1, 3, 5 and 7 orbitals. Each orbital holds 2 electrons with opposite spins (Pauli). Electrons fill the lowest energy first (Aufbau), and spread out singly within a sublevel before pairing (Hund).`),
    example(r`Oxygen (8 electrons) and iron (26)`, [
      [r`\text{O}:\ 1s^2\,2s^2\,2p^4`, "Two of the three 2p orbitals have one unpaired electron each."],
      [r`\text{Fe}:\ [\text{Ar}]\,4s^2\,3d^6`, "4s fills before 3d."],
    ]),
    def("Valence electrons", r`The electrons in the outermost energy level drive chemical behavior. Main-group elements in the same group share the same valence count: Group 1 has 1, Group 17 has 7.`),
    callout("application", "Where this shows up", r`Electron configurations explain magnetism (iron's unpaired d electrons), the colors of transition-metal compounds, and why the periodic table has its shape.`),
    activity("orbital-filling", { title: "Build a configuration", params: { Z: 8 } }),
    callout("tip", "Try this", r`Step through Z = 5 to 10 and watch Hund's rule: the 2p electrons spread out before they pair. Then try Z = 24 and 29.`, "experiment"),
  ],
  questions: [
    num(2, r`How many unpaired electrons does nitrogen (1s² 2s² 2p³) have?`, 3, {}, [], r`Hund's rule: one in each 2p orbital.`),
    num(2, r`How many valence electrons does phosphorus ([Ne] 3s² 3p³) have?`, 5, {}, [], r`$2 + 3$.`),
    mc(2, r`Which is the correct configuration for sulfur (16 e⁻)?`, ["1s² 2s² 2p⁶ 3s² 3p⁴", "1s² 2s² 2p⁶ 3s⁶", "1s² 2s² 2p⁸ 3s² 3p²", "[Ar] 3s² 3p⁴"], 0, [], r`Fill in order to 16.`),
    mc(3, r`Which rule says two electrons in one orbital must have opposite spins?`, ["Aufbau", "Hund's rule", "Pauli exclusion", "octet rule"], 2, [], r`No two electrons share all quantum numbers.`, "review"),
  ],
});
