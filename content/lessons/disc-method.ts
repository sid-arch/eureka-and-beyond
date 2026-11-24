import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "disc-method",
  title: "Volume with disc method: revolving around the x- or y-axis",
  summary: "Find volumes of solids of revolution with discs, V = π∫ R² dx about the x-axis or π∫ R² dy about the y-axis.",
  minutes: 30,
  objectives: [
    "Identify the radius of a disc as the distance from the axis to the curve.",
    "Set up V = π∫ R(x)² dx or π∫ R(y)² dy.",
    "Choose the variable that matches the axis of rotation.",
  ],
  concepts: [
    { slug: "volume-integrals", name: "Volume by integration", description: "Finding volumes by adding up the areas of thin slices with an integral.", subject: "subj_math" },
  ],
  blocks: [
    def("Disc method", r`Revolving the region under $y = R(x) \ge 0$ on $[a, b]$ about the $x$-axis gives circular slices with area $\pi R(x)^2$, so $V = \pi\int_a^b R(x)^2\,dx$. About the $y$-axis, write the radius as a function of $y$: $V = \pi\int_c^d R(y)^2\,dy$.`),
    example(r`Revolve the region under $y = \sqrt{x}$, $0 \le x \le 4$, about the $x$-axis`, [
      [r`V = \pi\int_0^4 (\sqrt{x})^2\,dx = \pi\int_0^4 x\,dx`, ""],
      [r`= 8\pi \approx 25.13`, ""],
    ]),
    example(r`Revolve the region between $y = x^2$, the $y$-axis and $y = 4$ about the $y$-axis`, [
      [r`R(y) = \sqrt{y}`, "Slices are horizontal, so use y."],
      [r`V = \pi\int_0^4 y\,dy = 8\pi`, ""],
    ]),
    activity("volume-slicing", { title: "Discs about the x-axis", params: { mode: "disc", n: 8, x: 2 } }),
    callout("tip", "Try this", r`With 8 slices the disc sum is $9\pi \approx 28.27$; slide to 40 slices and watch it approach $8\pi \approx 25.13$.`, "experiment"),
    callout("application", "Where this shows up", r`Lathes and 3D printers make objects of revolution, such as vases, bottles and table legs; their volume (and material cost) comes from the disc method.`),
  ],
  questions: [
    num(2, r`Revolve the region under $y = x^2$, $0 \le x \le 2$, about the $x$-axis. Find the volume, to two decimal places.`, 20.11, { tolerance: 0.02 }, [], r`$\pi\int_0^2 x^4\,dx = \frac{32\pi}{5}$.`),
    num(2, r`Revolve the region under $y = e^x$, $0 \le x \le 1$, about the $x$-axis. Volume to two decimal places.`, 10.04, { tolerance: 0.02 }, [], r`$\pi\int_0^1 e^{2x}\,dx = \frac{\pi}{2}(e^2 - 1) \approx 10.04$.`),
    mc(2, r`Revolving the line $y = \frac{r}{h}x$, $0 \le x \le h$, about the $x$-axis produces…`, ["a cylinder", "a cone with volume ⅓πr²h", "a sphere", "a cone with volume πr²h"], 1, [], r`$\pi\int_0^h \frac{r^2}{h^2}x^2\,dx = \frac{1}{3}\pi r^2 h$.`),
    num(3, r`Revolve $y = \sqrt{9 - x^2}$, $-3 \le x \le 3$, about the $x$-axis. Volume to two decimal places.`, 113.1, { tolerance: 0.05 }, [], r`$\pi\int_{-3}^{3}(9 - x^2)\,dx = 36\pi$: a sphere of radius 3.`, "review"),
  ],
});
