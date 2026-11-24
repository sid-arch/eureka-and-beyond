import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "potential-energy-systems",
  title: "Potential energy of systems",
  summary: "Treat potential energy as belonging to a system, use gravitational (mgh and −GMm/r) and spring potential energy, and read energy graphs.",
  minutes: 35,
  objectives: [
    "Explain why potential energy belongs to a system of interacting objects.",
    "Use ΔU = mgΔh near Earth and U = −GMm/r in general.",
    "Use U = ½kx² for springs and read potential-energy graphs.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["work-energy"],
  blocks: [
    def("Potential energy", r`Potential energy is stored in the configuration of a system of objects that exert conservative forces on each other (gravity, springs, electric forces). A single isolated object has none; it's the Earth–ball system that stores gravitational energy. For a conservative force, $\Delta U = -W_{\text{force}}$.`),
    def("Gravitational", r`Near Earth's surface, $\Delta U_g = mg\Delta h$. In general, $U_g = -\frac{GMm}{r}$, zero at infinite separation and negative for bound systems.`),
    example(r`Lifting a 1000 kg satellite from the surface (r = 6.37 × 10⁶ m) to 400 km altitude`, [
      [r`\Delta U = GMm\left(\tfrac{1}{R} - \tfrac{1}{R + h}\right) \approx 3.70\times10^9\ \text{J}`, ""],
      [r`mgh = 1000(9.8)(4\times10^5) = 3.92\times10^9\ \text{J}`, "mgh overestimates by about 6% because g weakens with altitude."],
    ]),
    def("Spring", r`$U_s = \frac12 kx^2$, zero at the natural length and always positive. A potential-energy graph $U(x)$ shows the force as minus its slope; minima are stable equilibria where the object oscillates.`),
    example(r`A 200 N/m spring compressed 0.1 m`, [
      [r`U = \tfrac12(200)(0.1)^2 = 1\ \text{J}`, ""],
    ]),
    callout("application", "Where this shows up", r`Pumped-storage hydroelectric plants store energy as water's gravitational potential energy, and bows store it as elastic potential energy.`),
  ],
  questions: [
    num(1, r`Find the change in gravitational potential energy when a 2 kg book is lifted 3 m.`, 58.8, { tolerance: 0.01, unit: "J" }, ["ΔU = mgΔh."], r`$2(9.8)(3)$.`),
    num(2, r`A spring launcher (k = 400 N/m) is compressed 0.05 m and launches a 0.02 kg ball horizontally. Find the launch speed.`, 7.07, { tolerance: 0.02, unit: "m/s" }, ["The spring's stored energy ½kx² all becomes kinetic energy ½mv²."], r`$\frac12kx^2 = \frac12mv^2$, so $v = x\sqrt{k/m}$.`),
    mc(2, r`The gravitational potential energy of a satellite–Earth system is negative because…`, ["the satellite moves", "zero is chosen at infinite separation, and the system is bound", "gravity is repulsive", "of an error in sign"], 1, ["Where is U = 0 chosen for gravity between distant objects? Do you add or remove energy to get there?"], r`You must add energy to separate them to infinity.`),
    mc(3, r`On a U(x) graph, an object is at a point where the slope is positive. The force on it points…`, ["toward +x", "toward −x", "nowhere", "up"], 1, ["Force is minus the slope of U(x): F = −dU/dx."], r`$F = -\frac{dU}{dx}$.`, "review"),
  ],
});
