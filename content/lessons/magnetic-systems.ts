import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "magnetic-systems",
  title: "Magnetic systems",
  summary: "Describe magnetic dipoles and their fields, explain why poles come in pairs, and compute the magnetic moment and torque of a current loop.",
  minutes: 30,
  objectives: [
    "Describe magnetic dipoles, field lines and Earth's magnetic field.",
    "Explain why cutting a magnet never isolates a pole.",
    "Compute a loop's magnetic moment μ = NIA and maximum torque τ = μB.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction"],
  blocks: [
    def("Dipoles", r`Every magnet is a dipole: field lines leave its north pole and return at its south pole, forming closed loops. No isolated pole has ever been found; cut a bar magnet and each piece has both poles. At the atomic scale, magnetism comes from electron spin and orbital motion, which are tiny current loops.`),
    def("Earth's field", r`Earth's field is about $5\times10^{-5}$ T at the surface. Its geographic North Pole is near a magnetic south pole, which is why the north end of a compass needle points there.`),
    def("Current loops", r`A loop of $N$ turns, area $A$ and current $I$ is a dipole with magnetic moment $\mu = NIA$. In a field, it feels a torque $\tau = \mu B\sin\theta$ that turns it to align with the field: the basis of motors and compasses.`),
    example(r`A 50-turn coil of area 0.01 m² carries 2 A in a 0.2 T field`, [
      [r`\mu = 50(2)(0.01) = 1\ \text{A·m}^2`, ""],
      [r`\tau_{max} = (1)(0.2) = 0.2\ \text{N·m}`, "When the coil's plane is parallel to B."],
    ]),
    callout("application", "Where this shows up", r`Electric motors, loudspeakers, hard-drive heads and MRI scanners (which align the proton dipoles in your body) all rely on dipoles in fields.`),
  ],
  questions: [
    num(2, r`A 100-turn coil of area 0.002 m² carries 0.5 A. Find its magnetic moment.`, 0.1, { unit: "A·m²" }, [], r`$100(0.5)(0.002)$.`),
    num(2, r`Find that coil's maximum torque in a 0.3 T field.`, 0.03, { tolerance: 0.0001, unit: "N·m" }, [], r`$0.1 \times 0.3$.`),
    mc(2, r`A bar magnet is cut in half. Each half has…`, ["only a north pole", "only a south pole", "both a north and a south pole", "no poles"], 2, [], r`Dipoles all the way down.`),
    mc(3, r`A current loop in a uniform field feels…`, ["a net force but no torque", "a torque but no net force", "neither", "both"], 1, [], r`Forces on opposite sides cancel but don't line up.`, "review"),
  ],
});
