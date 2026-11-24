import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "electromagnetic-induction",
  title: "Electromagnetic induction",
  summary: "Use magnetic flux and Faraday's law to find induced voltages, apply Lenz's law, and explain generators and transformers.",
  minutes: 30,
  objectives: [
    "Define magnetic flux Φ = BA cos θ.",
    "Apply Faraday's law, ε = −N ΔΦ/Δt, and Lenz's law.",
    "Explain generators and use the transformer ratio Vs/Vp = Ns/Np.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction"],
  blocks: [
    def("Flux and Faraday's law", r`Magnetic flux through a loop is $\Phi = BA\cos\theta$ (webers). A changing flux induces a voltage (emf): $\varepsilon = -N\frac{\Delta\Phi}{\Delta t}$. Change B, the area or the angle, and you get a voltage.`),
    def("Lenz's law", r`The induced current flows so its own field opposes the change in flux. That's the minus sign, and it's energy conservation: you must do work to push a magnet into a coil.`),
    example(r`A 100-turn coil of area 0.01 m²; B rises from 0 to 0.5 T in 0.1 s`, [
      [r`\Delta\Phi = (0.5)(0.01) = 0.005\ \text{Wb}`, ""],
      [r`|\varepsilon| = 100\cdot\tfrac{0.005}{0.1} = 5\ \text{V}`, ""],
    ]),
    def("Generators and transformers", r`A generator spins a coil in a field, so the flux changes continuously and produces alternating current. A transformer links two coils with a shared iron core: $\frac{V_s}{V_p} = \frac{N_s}{N_p}$. It works only with AC, since a steady current gives no changing flux.`),
    callout("application", "Where this shows up", r`Power plants generate electricity by induction; grids step voltage up for long-distance lines (less current, less $I^2R$ loss), then down for homes. Wireless chargers and induction stoves use the same principle.`),
    activity("loop-induction", { title: "Motional emf", params: { field: 0.5, speed: 2, resistance: 2 } }),
    callout("tip", "Try this", r`Play the loop through the field. There's emf only while the flux is changing: entering and leaving, never while the loop is fully inside.`, "experiment"),
  ],
  questions: [
    num(2, r`A transformer has 500 primary turns and 50 secondary turns, with 120 V on the primary. Find the secondary voltage.`, 12, { unit: "V" }, [], r`$120 \cdot \frac{50}{500}$.`),
    num(2, r`A 20-turn coil's flux drops from 0.03 Wb to 0 in 0.2 s. Find the size of the induced emf.`, 3, { unit: "V" }, [], r`$20 \cdot \frac{0.03}{0.2}$.`),
    mc(2, r`A magnet sits at rest inside a coil. The induced current is…`, ["large", "zero", "alternating", "steady"], 1, [], r`No change in flux, no emf.`),
    mc(3, r`Why are long-distance power lines run at very high voltage?`, ["Electrons move faster", "For the same power, lower current means less I²R loss", "High voltage is safer", "Transformers need it"], 1, [], r`$P = IV$: raise V, lower I, and losses drop as $I^2$.`, "review"),
  ],
});
