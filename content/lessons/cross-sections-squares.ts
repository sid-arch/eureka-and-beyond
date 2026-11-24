import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "cross-sections-squares",
  title: "Volumes with cross sections: squares and rectangles",
  summary: "Find the volume of a solid with a known base and square or rectangular cross sections by integrating the cross-sectional area.",
  minutes: 30,
  objectives: [
    "Express the side of a cross section in terms of x (or y) from the base region.",
    "Write the area A(x) of a square or rectangular cross section.",
    "Compute V = ∫ₐᵇ A(x) dx.",
  ],
  concepts: [
    { slug: "volume-integrals", name: "Volume by integration", description: "Finding volumes by adding up the areas of thin slices with an integral.", subject: "subj_math" },
  ],
  blocks: [
    def("Slicing", r`If every cross section perpendicular to the $x$-axis has area $A(x)$, then $V = \int_a^b A(x)\,dx$: thin slabs of area $A(x)$ and thickness $dx$ added up.`),
    example(r`Base: the region under $y = \sqrt{x}$ on $[0, 4]$. Cross sections perpendicular to the $x$-axis are squares.`, [
      [r`\text{side} = \sqrt{x} - 0`, "Length across the base at x."],
      [r`A(x) = (\sqrt{x})^2 = x`, ""],
      [r`V = \int_0^4 x\,dx = 8`, ""],
    ]),
    example(r`Same base, rectangles of height 3 times the base side`, [
      [r`A(x) = \sqrt{x} \cdot 3\sqrt{x} = 3x`, ""],
      [r`V = \int_0^4 3x\,dx = 24`, ""],
    ]),
    activity("volume-slicing", { title: "Stack square slices", params: { mode: "squares", n: 8, x: 2 } }),
    callout("tip", "Try this", r`Raise the number of slices: the sum approaches 8 from above, because each slice uses its right-hand edge, where the base is widest.`, "experiment"),
    callout("application", "Where this shows up", r`Architects and engineers find volumes of irregular beams, dams and earthworks by measuring cross-sectional areas at intervals and integrating (or summing) them.`),
  ],
  questions: [
    num(2, r`Base: region between $y = x$ and $y = 0$ on $[0, 2]$. Square cross sections perpendicular to the $x$-axis. Find the volume, to three decimal places.`, 2.667, { tolerance: 0.002 }, [], r`$\int_0^2 x^2\,dx = \frac{8}{3}$.`),
    num(2, r`Base: region between $y = 1 - x^2$ and $y = 0$. Square cross sections perpendicular to the $x$-axis. Find the volume, to three decimal places.`, 1.067, { tolerance: 0.002 }, [r`$\int_{-1}^{1}(1 - x^2)^2\,dx$.`], r`$\int_{-1}^1 (1 - 2x^2 + x^4) = 2 - \frac{4}{3} + \frac{2}{5} = \frac{16}{15}$.`),
    mc(2, r`For square cross sections, $A(x)$ equals…`, ["the side length", "(side length)²", "π(side)²", "½(side)²"], 1, [], r`Area of a square.`),
    num(3, r`Base: the region between $y = x$ and $y = x^2$. Square cross sections perpendicular to the $x$-axis. Find the volume, to four decimal places.`, 0.0333, { tolerance: 0.0005 }, [r`Side $x - x^2$.`], r`$\int_0^1 (x - x^2)^2\,dx = \frac{1}{3} - \frac{1}{2} + \frac{1}{5} = \frac{1}{30}$.`, "review"),
  ],
});
