import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-resistivity",
  title: "Resistance, resistivity and Ohm's law",
  summary: "Connect E = ρJ to V = IR, compute resistance from resistivity and geometry (including by integration), and model temperature dependence.",
  minutes: 35,
  objectives: [
    "Use the microscopic form of Ohm's law, E = ρJ, and the macroscopic form V = IR.",
    "Compute R = ρL/A, and R = ∫ρ dx/A(x) for non-uniform conductors.",
    "Use ρ = ρ₀(1 + αΔT).",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Two forms", r`Inside an ohmic material, $\vec E = \rho\vec J$, where resistivity $\rho$ (Ω·m) is a material property (copper $1.68\times10^{-8}$; glass about $10^{12}$). For a uniform wire, integrating gives $V = IR$ with $R = \frac{\rho L}{A}$.`),
    example(r`10 m of copper wire, cross-section 1 mm²`, [
      [r`R = \tfrac{(1.68\times10^{-8})(10)}{10^{-6}} = 0.168\ \Omega`, ""],
      [r`R = 0.168(1 + 0.0039 \times 50) \approx 0.201\ \Omega`, "50 °C hotter, with α = 0.0039/°C."],
    ]),
    def("Non-uniform conductors", r`If the cross-section changes, add thin slices in series: $R = \int_0^L\frac{\rho\,dx}{A(x)}$.`),
    example(r`A cone-shaped resistor whose radius grows linearly from a to b over length L`, [
      [r`R = \int_0^L\tfrac{\rho\,dx}{\pi\left(a + \tfrac{(b - a)x}{L}\right)^2} = \tfrac{\rho L}{\pi ab}`, ""],
    ]),
    callout("application", "Where this shows up", r`Strain gauges and thermistors measure force and temperature through resistance changes; power lines use thick aluminum to keep R low.`),
  ],
  questions: [
    num(2, r`A 2 m nichrome wire (ρ = 1.1 × 10⁻⁶ Ω·m) has a cross-section of 0.5 mm². Find its resistance.`, 4.4, { unit: "Ω" }, ["R = ρL/A; convert mm² to m²."], r`$\frac{1.1\times10^{-6}(2)}{5\times10^{-7}}$.`),
    num(3, r`A cone with a = 1 mm, b = 2 mm, L = 0.1 m and ρ = 1 × 10⁻⁵ Ω·m. Find R, to two decimal places.`, 0.16, { tolerance: 0.01, unit: "Ω" }, ["Integrate dR = ρ dx/A(x) for a radius growing linearly from a to b.", "The result is R = ρL/(πab)."], r`$\frac{10^{-5}(0.1)}{\pi(10^{-3})(2\times10^{-3})} \approx 0.159$.`),
    mc(2, r`A wire is stretched to twice its length (same volume). Its resistance becomes…`, ["2R", "4R", "R/2", "R"], 1, ["Same volume: if L doubles, A halves. Then use R = ρL/A."], r`L doubles and A halves.`),
    mc(3, r`In a wire carrying steady current, the field inside points…`, ["nowhere; it's zero", "along the current", "perpendicular to it", "against the current"], 1, ["Current needs a driving field. In a resistor, J = σE."], r`$\vec E = \rho\vec J$. Conductors only have E = 0 when no current flows.`, "review"),
  ],
});
