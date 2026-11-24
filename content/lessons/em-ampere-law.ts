import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-ampere-law",
  title: "Ampère's law",
  summary: "Apply Ampère's law with symmetric loops to find fields inside and outside thick wires, solenoids and toroids.",
  minutes: 40,
  objectives: [
    "State Ampère's law, ∮B·dℓ = μ₀I_enc.",
    "Find B inside and outside a thick wire with uniform current.",
    "Derive B = μ₀nI for a solenoid and B = μ₀NI/(2πr) for a toroid.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["gauss-ampere"],
  blocks: [
    def("Ampère's law", r`For any closed loop, $\oint\vec B\cdot d\vec\ell = \mu_0I_{enc}$. Like Gauss's law, it's always true but useful only when symmetry makes $B$ constant and tangent along an Amperian loop.`),
    example(r`A thick wire of radius R = 4 mm carrying 10 A uniformly; find B at r = 2 mm`, [
      [r`I_{enc} = I\tfrac{r^2}{R^2}`, ""],
      [r`B(2\pi r) = \mu_0 I\tfrac{r^2}{R^2} \Rightarrow B = \tfrac{\mu_0 Ir}{2\pi R^2}`, ""],
      [r`B = \tfrac{(4\pi\times10^{-7})(10)(0.002)}{2\pi(0.004)^2}`, ""],
      [r`B = 2.5\times10^{-4}\ \text{T}`, ""],
    ]),
    def("Solenoids and toroids", r`A rectangular loop half inside a long solenoid gives $BL = \mu_0nLI$, so $B = \mu_0nI$ inside (n turns per meter) and nearly zero outside. In a toroid of N turns, a circular loop gives $B = \frac{\mu_0NI}{2\pi r}$, confined inside the windings.`),
    callout("application", "Where this shows up", r`Solenoids are electromagnets, relays and MRI bores; tokamak fusion reactors use toroidal fields to confine plasma.`),
  ],
  questions: [
    num(2, r`A solenoid with 2000 turns/m carries 3 A. Find B inside, in mT, to two decimal places.`, 7.54, { tolerance: 0.01, unit: "mT" }, ["Inside an ideal solenoid, B = μ₀nI."], r`$4\pi\times10^{-7}(2000)(3)$.`),
    num(2, r`A toroid with 500 turns carries 2 A. Find B at r = 0.1 m, in mT.`, 2, { tolerance: 0.001, unit: "mT" }, ["Ampère's law around a circle in the toroid: B(2πr) = μ₀NI."], r`$\frac{4\pi\times10^{-7}(1000)}{2\pi(0.1)}$.`),
    mc(2, r`For the thick wire, B is largest at…`, ["the center", "the surface", "far away", "it's constant"], 1, ["Inside, B grows like r; outside, it falls like 1/r. Where do the two pieces meet?"], r`It grows linearly inside, then falls as 1/r.`),
    mc(3, r`A loop around a wire carrying 5 A up and another carrying 5 A down has ∮B·dℓ equal to…`, ["10μ₀", "5μ₀", "0", "−5μ₀"], 2, ["∮B·dℓ = μ₀I_enclosed. Add the enclosed currents with their directions."], r`The net enclosed current is zero.`, "review"),
  ],
});
