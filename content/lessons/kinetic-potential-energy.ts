import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "kinetic-potential-energy",
  title: "Kinetic and potential energy",
  summary: "Compute kinetic energy ½mv², gravitational potential energy mgh and elastic potential energy ½kx², and use the work–energy theorem.",
  minutes: 30,
  objectives: [
    "Compute KE, gravitational PE and elastic PE with units.",
    "Apply the work–energy theorem W_net = ΔKE.",
    "Explain that potential energy depends on a chosen reference level.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["kinetic-energy", "work-energy", "spring-potential-energy"],
  blocks: [
    def("Forms of mechanical energy", r`Kinetic: $KE = \frac{1}{2}mv^2$. Gravitational potential (near Earth): $PE_g = mgh$, with $h$ measured from a reference level you choose. Elastic: $PE_s = \frac{1}{2}kx^2$ for a spring stretched or compressed by $x$.`),
    example(r`Energies`, [
      [r`KE = \tfrac{1}{2}(1000)(20)^2 = 200{,}000\ \text{J}`, "A car at 20 m/s."],
      [r`PE_g = 2(9.8)(5) = 98\ \text{J}`, "A 2 kg book on a 5 m shelf."],
    ]),
    def("Work–energy theorem", r`The net work done on an object equals its change in kinetic energy: $W_{\text{net}} = \Delta KE$.`),
    example(r`A net 600 N force acts on a 75 kg sprinter over 5 m from rest`, [
      [r`\tfrac{1}{2}(75)v^2 = 600(5) = 3000\ \text{J}`, ""],
      [r`v \approx 8.94\ \text{m/s}`, ""],
    ]),
    activity("spring-oscillator", { title: "Kinetic and elastic energy trade places" }),
    callout("application", "Where this shows up", r`Car crash energy scales with $v^2$: hitting a wall at 100 km/h involves four times the energy of 50 km/h, which is why crumple zones and speed limits matter.`),
  ],
  questions: [
    num(1, r`Find the kinetic energy of a 0.15 kg ball at 40 m/s, in joules.`, 120, { unit: "J" }, [], r`$\frac{1}{2}(0.15)(1600)$.`),
    num(2, r`A spring with $k = 400$ N/m is compressed 0.1 m. Find its elastic PE, in joules.`, 2, { unit: "J" }, [], r`$\frac{1}{2}(400)(0.01)$.`),
    mc(2, r`If a car's speed triples, its kinetic energy…`, ["triples", "becomes 6 times as large", "becomes 9 times as large", "stays the same"], 2, [], r`$KE \propto v^2$.`),
    num(3, r`A 2 kg cart at 3 m/s has 16 J of net work done on it. Find its new speed, in m/s.`, 5, { unit: "m/s" }, [], r`$9 + 16 = 25 = \frac{1}{2}(2)v^2$, $v = 5$.`, "review"),
  ],
});
