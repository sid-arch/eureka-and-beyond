import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-potential-integral",
  title: "Electric potential",
  summary: "Compute electric potential of point charges and continuous distributions with V = ∫k dq/r, a scalar integral with no components to track.",
  minutes: 35,
  objectives: [
    "Define V = U/q and use V = kq/r with V(∞) = 0.",
    "Compute V for rings and rods with V = ∫k dq/r.",
    "Explain why potential integrals are simpler than field integrals.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Potential", r`$V = \frac Uq$, the potential energy per unit test charge. For a point charge, $V = \frac{kq}{r}$. For a continuous distribution, $V = \int\frac{k\,dq}{r}$, a scalar sum with no directions to cancel.`),
    example(r`A ring (Q = 5 nC, R = 0.3 m), at x = 0.4 m on its axis`, [
      [r`\text{every}\ dq\ \text{is}\ \sqrt{x^2 + R^2}\ \text{away}`, ""],
      [r`V = \tfrac{kQ}{\sqrt{x^2 + R^2}} = \tfrac{8.99\times10^9(5\times10^{-9})}{0.5}`, ""],
      [r`V \approx 89.9\ \text{V}`, ""],
    ]),
    example(r`A rod (Q = 4 nC, L = 0.2 m), on its axis 0.1 m beyond one end`, [
      [r`V = k\lambda\int_{0.1}^{0.3}\tfrac{dx}{x} = k\lambda\ln 3`, ""],
      [r`V = (8.99\times10^9)(2\times10^{-8})\ln 3 \approx 198\ \text{V}`, ""],
    ]),
    activity("electric-potential", { title: "Potential adds as a scalar", params: { q1: 2, q2: 2, separation: 4 } }),
    callout("application", "Where this shows up", r`Lightning rods, electron guns and electrostatic precipitators are designed using potential maps, because V is easier to compute than E.`),
  ],
  questions: [
    num(2, r`Find V at the center of the ring in the example.`, 150, { tolerance: 0.5, unit: "V" }, ["Every bit of the ring is the same distance R from its center, so V = kQ/R."], r`$\frac{kQ}{R} = \frac{44.95}{0.3}$.`),
    num(3, r`A thin semicircle of radius 0.2 m carries 3 nC. Find V at its center, to the nearest volt.`, 135, { tolerance: 1, unit: "V" }, ["V is a scalar, and all of the arc's charge is 0.2 m from the center."], r`All charge is 0.2 m away: $\frac{8.99\times10^9(3\times10^{-9})}{0.2}$.`),
    mc(2, r`Why is V easier to integrate than E?`, ["V is always zero", "V is a scalar, so no components to cancel", "V has no units", "E doesn't exist for distributions"], 1, ["When adding up contributions, do you need directions for V?"], r`Scalar addition.`),
    mc(3, r`Two charges of +q and −q. At their midpoint…`, ["V = 0 and E = 0", "V = 0 but E ≠ 0", "V ≠ 0 but E = 0", "both nonzero"], 1, ["Add the potentials as scalars and the fields as vectors. Which way does each field point at the midpoint?"], r`Potentials cancel; fields both point toward −q.`, "review"),
  ],
});
