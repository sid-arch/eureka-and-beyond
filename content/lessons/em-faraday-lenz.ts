import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-faraday-lenz",
  title: "Faraday's law and Lenz's law",
  summary: "Compute induced emf from ε = −N dΦ/dt for changing fields, areas and angles, including AC generators, and find current directions with Lenz's law.",
  minutes: 40,
  objectives: [
    "Apply ε = −N dΦ_B/dt to fields that change with time.",
    "Derive the generator emf ε = NBAω sin ωt.",
    "Use Lenz's law to find the direction of induced current.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["induction-circuits"],
  blocks: [
    def("Faraday's law", r`$\varepsilon = -N\frac{d\Phi_B}{dt}$. The minus sign is Lenz's law: the induced current makes a field that opposes the change in flux. Flux can change through B, the area or the angle.`),
    example(r`A 50-turn loop of area 0.05 m² in a perpendicular field B(t) = 0.2t² T`, [
      [r`\varepsilon = -N A\tfrac{dB}{dt} = -50(0.05)(0.4t)`, ""],
      [r`|\varepsilon(2)| = 2\ \text{V}`, ""],
    ]),
    example(r`A generator: N = 100 turns, A = 0.02 m², B = 0.5 T, spinning at 60 Hz`, [
      [r`\Phi = BA\cos\omega t \Rightarrow \varepsilon = NBA\omega\sin\omega t`, ""],
      [r`\varepsilon_{max} = 100(0.5)(0.02)(120\pi) \approx 377\ \text{V}`, ""],
    ]),
    callout("application", "Where this shows up", r`Every power station, bike dynamo, induction charger and electric guitar pickup runs on Faraday's law.`),
    activity("loop-induction", { title: "Flux, emf and Lenz's law", params: { field: 0.5, speed: 2, resistance: 2 } }),
    callout("tip", "Try this", r`Check that the emf graph is minus the slope of the flux graph, and that the current reverses direction as the loop leaves.`, "experiment"),
  ],
  questions: [
    num(2, r`A loop of area 0.1 m² sits in B(t) = 0.5e^{−2t} T. Find |ε| at t = 0.`, 0.1, { unit: "V" }, ["ε = −A dB/dt; differentiate B(t) and evaluate at t = 0."], r`$A\left|\frac{dB}{dt}\right| = 0.1(1.0)$.`),
    num(2, r`Find the peak emf of a 200-turn, 0.01 m² coil spinning at 50 rad/s in 0.3 T.`, 30, { unit: "V" }, ["A rotating coil's peak emf is NBAω."], r`$NBA\omega$.`),
    mc(2, r`The flux through a loop increases out of the page. The induced current flows…`, ["clockwise (seen from the front)", "counterclockwise", "not at all", "alternately"], 0, ["Lenz: the induced field opposes the increase. Which way must it point, and which circulation makes that?"], r`Its field must point into the page: clockwise.`),
    mc(3, r`A generator's emf is zero at the moment its coil's plane is…`, ["parallel to B", "perpendicular to B (max flux)", "at 45°", "never zero"], 1, ["emf ∝ dΦ/dt. When is the flux at a peak, so its rate of change is zero?"], r`$\frac{d\Phi}{dt} = 0$ when the flux peaks.`, "review"),
  ],
});
