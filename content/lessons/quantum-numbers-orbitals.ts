import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "quantum-numbers-orbitals",
  title: "Quantum numbers and orbitals",
  summary: "Describe electrons with the four quantum numbers, relate them to orbital shapes and capacities, and decide which sets are allowed.",
  minutes: 35,
  objectives: [
    "State the meaning and allowed values of n, ℓ, m_ℓ and m_s.",
    "Count orbitals and electrons in a level or sublevel.",
    "Identify allowed and forbidden quantum-number sets.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  blocks: [
    def("The four quantum numbers", r`Principal $n = 1, 2, 3, \ldots$: energy level and size. Angular momentum $\ell = 0, \ldots, n - 1$: sublevel shape (0 = s, 1 = p, 2 = d, 3 = f). Magnetic $m_\ell = -\ell, \ldots, +\ell$: orientation, one value per orbital. Spin $m_s = \pm\frac12$. By the Pauli exclusion principle, no two electrons share all four.`),
    def("Counting", r`A sublevel has $2\ell + 1$ orbitals; level n has $n^2$ orbitals and holds $2n^2$ electrons. Orbitals are probability clouds: s orbitals are spheres, p orbitals dumbbells along x, y and z, d orbitals mostly four-lobed.`),
    example(r`The n = 3 level`, [
      [r`\ell = 0, 1, 2 \Rightarrow 3s,\ 3p,\ 3d`, ""],
      [r`1 + 3 + 5 = 9\ \text{orbitals},\ 18\ \text{electrons}`, "$n^2$ and $2n^2$."],
    ]),
    example(r`Is (n, ℓ, m_ℓ, m_s) = (2, 2, 0, +½) allowed?`, [
      [r`\ell \le n - 1 = 1`, "No: ℓ = 2 needs n ≥ 3."],
    ]),
    callout("application", "Where this shows up", r`MRI depends on nuclear spin, and the 2p and 3d orbital shapes explain the bond angles in molecules and the colors of gemstones.`),
    activity("orbital-filling", { title: "Orbitals and sublevels", params: { Z: 26 } }),
    callout("tip", "Try this", r`Each box is one orbital (one value of mₗ) holding up to two electrons of opposite spin (mₛ). Count the boxes in each sublevel: 1, 3 and 5.`, "experiment"),
  ],
  questions: [
    num(2, r`How many orbitals are in the 4f sublevel?`, 7, {}, [], r`$\ell = 3$: $2(3) + 1$.`),
    num(2, r`What is the maximum number of electrons with n = 4?`, 32, {}, [], r`$2n^2$.`),
    mc(2, r`Which set is allowed?`, ["(1, 1, 0, +½)", "(3, 2, −3, −½)", "(4, 2, −2, +½)", "(2, 0, 1, +½)"], 2, [], r`ℓ < n and |m_ℓ| ≤ ℓ.`),
    mc(3, r`Which quantum number describes an orbital's shape?`, ["n", "ℓ", "m_ℓ", "m_s"], 1, [], r`s, p, d, f.`, "review"),
  ],
});
