import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-current-density",
  title: "Electric current",
  summary: "Define current as I = dQ/dt, relate it to current density and drift velocity, J = nqv_d, and find charge from a current function by integration.",
  minutes: 30,
  objectives: [
    "Use I = dQ/dt and Q = ∫I dt.",
    "Define current density J = I/A and relate it to drift velocity: J = nqv_d.",
    "Estimate drift speeds in metals.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Current", r`Current is the rate charge passes a point: $I = \frac{dQ}{dt}$, so $Q = \int I\,dt$. Conventional current points the way positive charge would move, opposite to electron flow.`),
    example(r`Charge through a wire is Q(t) = 3t² coulombs`, [
      [r`I = \tfrac{dQ}{dt} = 6t`, ""],
      [r`I(2) = 12\ \text{A}`, ""],
    ]),
    def("Drift velocity", r`Current density is $J = \frac IA$ (A/m²). In a conductor with $n$ free charges per m³, each of charge $q$ drifting at $v_d$: $J = nqv_d$.`),
    example(r`10 A in a copper wire of cross-section 1 mm² (n = 8.5 × 10²⁸ m⁻³)`, [
      [r`v_d = \tfrac{I}{nqA}`, ""],
      [r`v_d = \tfrac{10}{(8.5\times10^{28})(1.6\times10^{-19})(10^{-6})}`, ""],
      [r`v_d \approx 7.3\times10^{-4}\ \text{m/s}`, "Under a millimeter per second."],
    ]),
    callout("note", "Why lights turn on instantly", r`Electrons crawl, but the electric field that pushes them spreads along the wire at nearly the speed of light, so every electron starts moving almost at once.`),
    callout("application", "Where this shows up", r`Wire gauges limit current density to prevent overheating; electroplating deposits mass in proportion to ∫I dt.`),
  ],
  questions: [
    num(2, r`I(t) = 4e^{−t} A. How much charge passes from t = 0 to ∞?`, 4, { unit: "C" }, ["Charge is the integral of current over time."], r`$\int_0^\infty 4e^{-t}\,dt$.`),
    num(2, r`Find the current density for 2 A through a 0.5 mm² wire, in units of $10^6$ A/m².`, 4, {}, ["J = I/A; convert mm² to m² (1 mm² = 10⁻⁶ m²)."], r`$\frac{2}{5\times10^{-7}}$.`),
    mc(2, r`Doubling the current in the same wire doubles the…`, ["number of electrons per m³", "drift speed", "wire's resistance", "speed of the field"], 1, ["I = nqAv_d. In the same wire, which quantity must change?"], r`$v_d \propto I$.`),
    mc(3, r`A wire narrows to half its cross-section. The same current there has…`, ["half the drift speed", "twice the drift speed", "the same drift speed", "zero drift"], 1, ["The same current through half the area: v_d = I/(nqA)."], r`$v_d = \frac{I}{nqA}$.`, "review"),
  ],
});
