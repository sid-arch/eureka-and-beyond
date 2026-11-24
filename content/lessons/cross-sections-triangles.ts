import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "cross-sections-triangles",
  title: "Volumes with cross sections: triangles and semicircles",
  summary: "Find volumes of solids whose cross sections are equilateral triangles, right isosceles triangles or semicircles, using the right area formula in terms of the base side s.",
  minutes: 30,
  objectives: [
    "Use A = (√3/4)s² for equilateral triangles and A = ½s² for right isosceles triangles with leg s.",
    "Use A = (π/8)s² for semicircles with diameter s.",
    "Set up and evaluate the volume integral.",
  ],
  concepts: [
    { slug: "volume-integrals", name: "Volume by integration", description: "Finding volumes by adding up the areas of thin slices with an integral.", subject: "subj_math" },
  ],
  blocks: [
    def("Area formulas in terms of s", r`Equilateral triangle with side $s$: $\frac{\sqrt{3}}{4}s^2$. Right isosceles triangle with leg $s$ on the base: $\frac{1}{2}s^2$. Semicircle with diameter $s$: $\frac{1}{2}\pi\left(\frac{s}{2}\right)^2 = \frac{\pi}{8}s^2$.`),
    example(r`Base under $y = \sqrt{x}$ on $[0, 4]$; semicircle cross sections`, [
      [r`A(x) = \tfrac{\pi}{8}(\sqrt{x})^2 = \tfrac{\pi x}{8}`, ""],
      [r`V = \tfrac{\pi}{8}\int_0^4 x\,dx = \pi`, ""],
    ]),
    example(r`Same base; equilateral triangle cross sections`, [
      [r`A(x) = \tfrac{\sqrt{3}}{4}x`, ""],
      [r`V = \tfrac{\sqrt{3}}{4} \cdot 8 = 2\sqrt{3} \approx 3.464`, ""],
    ]),
    activity("volume-slicing", { title: "Semicircle slices", params: { mode: "semicircles", n: 10, x: 3 } }),
    callout("warning", "Diameter, not radius", r`When the base gives the semicircle's diameter $s$, the radius is $\frac{s}{2}$. Using $s$ as the radius makes the answer four times too big.`),
    callout("application", "Where this shows up", r`Tunnels and culverts often have semicircular cross sections; their excavation volume is a cross-section integral.`),
  ],
  questions: [
    num(2, r`Base under $y = \sqrt{x}$ on $[0, 4]$; right isosceles triangle cross sections with a leg on the base. Find the volume.`, 4, {}, [], r`$\int_0^4 \frac{1}{2}x\,dx = 4$.`),
    num(2, r`Base: the disc $x^2 + y^2 \le 1$. Semicircle cross sections perpendicular to the $x$-axis. Find the volume, to three decimal places.`, 2.094, { tolerance: 0.002 }, [r`$s = 2\sqrt{1 - x^2}$.`], r`$\int_{-1}^{1}\frac{\pi}{8}\cdot 4(1 - x^2)\,dx = \frac{\pi}{2}\cdot\frac{4}{3} = \frac{2\pi}{3}$, half a sphere of radius 1.`),
    mc(2, r`The area of an equilateral triangle with side $s$ is…`, [r`$\frac{1}{2}s^2$`, r`$\frac{\sqrt{3}}{4}s^2$`, r`$\frac{\sqrt{3}}{2}s^2$`, r`$s^2$`], 1, [], r`Height $\frac{\sqrt{3}}{2}s$ times half the base.`),
    num(3, r`Base between $y = x$ and $y = 0$ on $[0, 3]$. Equilateral triangle cross sections. Find the volume, to three decimal places.`, 3.897, { tolerance: 0.002 }, [], r`$\frac{\sqrt{3}}{4}\int_0^3 x^2\,dx = \frac{9\sqrt{3}}{4} \approx 3.897$.`, "review"),
  ],
});
