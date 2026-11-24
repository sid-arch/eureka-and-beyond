import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "magnetic-flux",
  title: "Magnetic flux",
  summary: "Compute magnetic flux through loops at any angle, find motional emf ε = BLv, and use Lenz's law to find the direction of induced currents.",
  minutes: 35,
  objectives: [
    "Compute Φ = BA cos θ, with θ measured from the loop's normal.",
    "Derive and use the motional emf ε = BLv and the resulting magnetic drag force.",
    "Use Lenz's law to find induced current directions.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction"],
  blocks: [
    def("Flux", r`Magnetic flux counts the field passing through a surface: $\Phi = BA\cos\theta$, where $\theta$ is the angle between $\vec B$ and the loop's normal. It's largest when the field passes straight through the loop and zero when the field lies in the loop's plane. 1 Wb = 1 T·m².`),
    example(r`A 0.05 m² loop in a 0.4 T field, with B at 60° to the normal`, [
      [r`\Phi = (0.4)(0.05)\cos 60° = 0.01\ \text{Wb}`, ""],
    ]),
    def("Motional emf", r`A rod of length $L$ sliding at speed $v$ along rails in a field $B$ sweeps out area at rate $Lv$, so $\varepsilon = BLv$. The induced current feels a force $F = BIL$ opposing the motion: you must push to keep it going, and that work becomes electrical energy.`),
    example(r`A 0.2 m rod moves at 3 m/s through 0.5 T on rails joined by a 2 Ω resistor`, [
      [r`\varepsilon = (0.5)(0.2)(3) = 0.3\ \text{V}`, ""],
      [r`I = \tfrac{0.3}{2} = 0.15\ \text{A}`, ""],
      [r`F = BIL = (0.5)(0.15)(0.2) = 0.015\ \text{N}`, "Opposing the motion (Lenz's law)."],
    ]),
    callout("tip", "Using Lenz's law", r`Ask how the flux is changing. If it increases, the induced field points opposite to the applied field; if it decreases, along it. Then use the right-hand rule for loops to find the current's direction.`),
    callout("application", "Where this shows up", r`Eddy-current brakes on roller coasters and trains, metal detectors, and guitar pickups all depend on changing flux.`),
  ],
  questions: [
    num(2, r`A 0.1 m² loop is perpendicular to a 0.3 T field. Find the flux.`, 0.03, { tolerance: 0.0001, unit: "Wb" }, [], r`$\theta = 0$, $\cos 0 = 1$.`),
    num(2, r`A 0.5 m wing of a toy plane flies at 20 m/s through a 5 × 10⁻⁵ T vertical field. Find the emf, in mV.`, 0.5, { tolerance: 0.001, unit: "mV" }, [], r`$BLv = 5\times10^{-5}(0.5)(20)$.`),
    mc(2, r`A magnet's north pole is pushed toward a loop. The induced current makes the loop's near face…`, ["a south pole", "a north pole, repelling the magnet", "neutral", "alternating"], 1, [], r`It opposes the approach.`),
    mc(3, r`A loop is rotated until its plane is parallel to B. The flux becomes…`, ["maximum", "zero", "negative", "unchanged"], 1, [], r`$\cos 90° = 0$.`, "review"),
  ],
});
