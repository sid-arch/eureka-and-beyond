import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-capacitance-calculus",
  title: "Capacitors and capacitance",
  summary: "Derive capacitance from Gauss's law and ΔV = −∫E·dr for parallel-plate, spherical and cylindrical capacitors, and find stored energy and energy density.",
  minutes: 45,
  objectives: [
    "Follow the recipe: assume ±Q, find E by Gauss's law, integrate for ΔV, then C = Q/ΔV.",
    "Derive C for parallel-plate, spherical and cylindrical geometries.",
    "Compute stored energy ½CV² and energy density u = ½ε₀E².",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential", "gauss-ampere"],
  blocks: [
    def("Recipe", r`1. Put $+Q$ and $-Q$ on the conductors. 2. Use Gauss's law for E between them. 3. Integrate $\Delta V = \int E\,dr$. 4. $C = \frac{Q}{\Delta V}$, which depends only on geometry.`),
    example(r`Spherical capacitor: inner radius a, outer radius b`, [
      [r`E = \tfrac{kQ}{r^2}\ (a < r < b)`, ""],
      [r`\Delta V = kQ\left(\tfrac1a - \tfrac1b\right)`, ""],
      [r`C = \tfrac{4\pi\varepsilon_0ab}{b - a}`, "For a = 0.1 m, b = 0.2 m: C ≈ 22.3 pF."],
    ]),
    example(r`Cylindrical capacitor (coaxial cable), length ℓ`, [
      [r`E = \tfrac{\lambda}{2\pi\varepsilon_0 r}`, ""],
      [r`\Delta V = \tfrac{\lambda}{2\pi\varepsilon_0}\ln\tfrac ba`, ""],
      [r`C = \tfrac{2\pi\varepsilon_0\ell}{\ln(b/a)}`, "For b/a = 2: about 80 pF per meter."],
    ]),
    def("Energy", r`Charging takes work $\int_0^Q\frac{q}{C}\,dq = \frac{Q^2}{2C} = \frac12CV^2$. The energy lives in the field with density $u = \frac12\varepsilon_0E^2$ (J/m³).`),
    callout("application", "Where this shows up", r`Coaxial cables have a capacitance per meter that limits signal speed; supercapacitors store kilojoules in porous electrodes with huge effective areas.`),
  ],
  questions: [
    num(2, r`Find the energy density in a 1 × 10⁵ V/m field, in mJ/m³, to two decimal places.`, 44.27, { tolerance: 0.05, unit: "mJ/m³" }, ["Energy density u = ½ε₀E²; convert J/m³ to mJ/m³."], r`$\frac12(8.854\times10^{-12})(10^{10})$.`),
    num(3, r`A coaxial cable has a = 0.5 mm and b = 2 mm. Find its capacitance per meter, in pF.`, 40.1, { tolerance: 0.2, unit: "pF" }, ["Coaxial cable: C/L = 2πε₀/ln(b/a)."], r`$\frac{2\pi\varepsilon_0}{\ln 4} \approx 4.01\times10^{-11}$ F/m.`),
    mc(2, r`An isolated charged capacitor's plates are pulled farther apart. Its stored energy…`, ["decreases", "increases (you did work)", "stays the same", "becomes zero"], 1, ["Isolated means Q stays fixed. How does C change with separation, and then U = Q²/2C?"], r`Q fixed, C falls, $U = \frac{Q^2}{2C}$ rises.`),
    mc(3, r`Capacitance depends on…`, ["the charge stored", "the voltage applied", "geometry and the material between", "the current"], 2, ["C = Q/V is a ratio. Which items change that ratio rather than Q or V alone?"], r`$C = \frac QV$ but the ratio is set by geometry.`, "review"),
  ],
});
