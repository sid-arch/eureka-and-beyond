import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-inductance",
  title: "Inductance",
  summary: "Define self-inductance, derive the inductance of a solenoid, use ε = −L dI/dt, and find energy stored in magnetic fields.",
  minutes: 35,
  objectives: [
    "Define L = NΦ_B/I and use ε_L = −L dI/dt.",
    "Derive L = μ₀N²A/ℓ for a solenoid.",
    "Compute stored energy ½LI² and magnetic energy density B²/(2μ₀).",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["induction-circuits"],
  blocks: [
    def("Self-inductance", r`A coil's own current makes flux through it: $N\Phi_B = LI$, with inductance $L$ in henries. Changing the current induces a back emf $\varepsilon_L = -L\frac{dI}{dt}$ that resists the change, giving circuits a kind of electrical inertia.`),
    example(r`A solenoid: 500 turns, ℓ = 0.25 m, A = 1 × 10⁻³ m²`, [
      [r`B = \mu_0\tfrac N\ell I,\ N\Phi = NBA = \tfrac{\mu_0N^2A}{\ell}I`, ""],
      [r`L = \tfrac{(4\pi\times10^{-7})(500^2)(10^{-3})}{0.25} \approx 1.26\ \text{mH}`, ""],
    ]),
    def("Energy", r`Building up the current takes work $\int LI\,dI = \frac12LI^2$, stored in the field with density $u_B = \frac{B^2}{2\mu_0}$.`),
    example(r`0.2 H carrying 3 A`, [
      [r`U = \tfrac12(0.2)(3^2) = 0.9\ \text{J}`, ""],
    ]),
    activity("inductor-circuit", { title: "Current can't change instantly", params: { mode: "rise", emf: 12, resistance: 4, inductance: 0.5 } }),
    callout("application", "Where this shows up", r`Switch-mode power supplies store energy in inductors; the spark when unplugging a motor is the back emf from a sudden dI/dt.`),
  ],
  questions: [
    num(2, r`Current in a 0.05 H inductor rises at 200 A/s. Find the back emf's size.`, 10, { unit: "V" }, ["|ε| = L dI/dt."], r`$L\frac{dI}{dt}$.`),
    num(2, r`Find the magnetic energy density in a 1 T field, in units of $10^5$ J/m³, to two decimal places.`, 3.98, { tolerance: 0.01 }, ["Magnetic energy density u = B²/(2μ₀)."], r`$\frac{1}{2(4\pi\times10^{-7})}$.`),
    mc(2, r`Doubling the number of turns (same length and area) multiplies L by…`, ["2", "4", "½", "1"], 1, ["For a solenoid, L = μ₀N²A/ℓ."], r`$L \propto N^2$.`),
    mc(3, r`An inductor in a DC circuit, long after switching on, acts like…`, ["an open switch", "a plain wire", "a capacitor", "a battery"], 1, ["Long after switching on, the current is steady. What is the back emf when dI/dt = 0?"], r`dI/dt = 0, so no back emf.`, "review"),
  ],
});
