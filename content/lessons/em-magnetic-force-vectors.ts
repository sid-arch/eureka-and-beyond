import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-magnetic-force-vectors",
  title: "Magnetic fields and forces on moving charges",
  summary: "Compute magnetic forces with the cross product F = qv × B, analyze circular and helical motion, and combine electric and magnetic forces (Lorentz force).",
  minutes: 40,
  objectives: [
    "Compute F = qv × B with components.",
    "Find the radius, period and pitch of circular and helical motion.",
    "Use the Lorentz force F = q(E + v × B), and the velocity selector.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["magnetism-induction", "calculus-rotation"],
  blocks: [
    def("Cross product", r`$\vec F = q\vec v\times\vec B$. With components, $\vec v\times\vec B = (v_yB_z - v_zB_y,\ v_zB_x - v_xB_z,\ v_xB_y - v_yB_x)$. The force is perpendicular to $\vec v$, so it does no work and speed stays constant.`),
    example(r`A proton with v = (2, 0, 1) × 10⁵ m/s in B = (0, 0.5, 0) T`, [
      [r`(v_yB_z - v_zB_y,\ v_zB_x - v_xB_z,\ v_xB_y - v_yB_x)`, "Components of v × B."],
      [r`= (0 - (1)(0.5),\ 0,\ (2)(0.5) - 0)\times10^5`, ""],
      [r`\vec v\times\vec B = (-0.5,\ 0,\ 1)\times10^5\ \text{T·m/s}`, ""],
      [r`\vec F = q(\vec v\times\vec B)`, "Multiply by q = 1.6 × 10⁻¹⁹ C."],
      [r`\vec F = (-0.8,\ 0,\ 1.6)\times10^{-14}\ \text{N}`, ""],
    ]),
    def("Helical motion", r`The velocity component perpendicular to $\vec B$ gives a circle of radius $r = \frac{mv_\perp}{qB}$ and period $T = \frac{2\pi m}{qB}$; the parallel component is unchanged. Together they make a helix with pitch $v_\parallel T$.`),
    def("Lorentz force", r`$\vec F = q(\vec E + \vec v\times\vec B)$. Crossed fields pass undeflected only the particles with $v = \frac EB$.`),
    callout("application", "Where this shows up", r`Auroras (helices along Earth's field lines), mass spectrometers, cyclotrons and the Hall-effect sensors in phones.`),
    activity("magnetic-orbit", { title: "Charges in a magnetic field", params: { species: "proton", speed: 10, field: 0.1 } }),
    callout("tip", "Try this", r`Double the field and the radius halves; switch to an alpha particle (twice the charge, four times the mass) and the radius doubles.`, "experiment"),
  ],
  questions: [
    num(2, r`An electron moves at v = 3 × 10⁶ m/s î in B = 0.01 T k̂. Find the force's y-component, in units of $10^{-15}$ N.`, 4.8, { tolerance: 0.01 }, ["F = q v × B, with q = −e. Work out î × k̂ first.", "î × k̂ = −ĵ; then include the negative charge."], r`$q(\vec v\times\vec B) = (-1.6\times10^{-19})(3\times10^6)(0.01)(\hat\imath\times\hat k)$, and $\hat\imath\times\hat k = -\hat\jmath$, so $+4.8\times10^{-15}\,\hat\jmath$.`),
    num(3, r`A proton moves at 4 × 10⁵ m/s at 30° to a 0.2 T field. Find the helix pitch, in cm, to one decimal place.`, 11.4, { tolerance: 0.1, unit: "cm" }, ["Pitch = v_∥ × period, with T = 2πm/(qB) and v_∥ = v cos 30°."], r`$T = \frac{2\pi m}{qB} \approx 3.28\times10^{-7}$ s; $v_\parallel = 4\times10^5\cos 30° \approx 3.46\times10^5$; pitch ≈ 0.114 m.`),
    mc(2, r`The magnetic force on a moving charge changes its…`, ["speed", "kinetic energy", "direction only", "charge"], 2, ["The force is always perpendicular to the velocity. Can it do work?"], r`Always perpendicular to v.`),
    mc(3, r`A charge moving parallel to B follows…`, ["a circle", "a straight line", "a helix", "a parabola"], 1, ["What is v × B when v is parallel to B?"], r`$\vec v\times\vec B = 0$.`, "review"),
  ],
});
