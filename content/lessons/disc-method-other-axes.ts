import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "disc-method-other-axes",
  title: "Volume with disc method: revolving around other axes",
  summary: "Revolve regions about horizontal or vertical lines other than the axes by measuring each radius as a distance to that line.",
  minutes: 25,
  objectives: [
    "Write the radius as |curve − axis| for a line y = k or x = h.",
    "Set up disc integrals about other lines.",
    "Check the region touches the axis (otherwise it's a washer).",
  ],
  concepts: [
    { slug: "volume-integrals", name: "Volume by integration", description: "Finding volumes by adding up the areas of thin slices with an integral.", subject: "subj_math" },
  ],
  blocks: [
    def("Radius to a line", r`Revolving about $y = k$, the radius at $x$ is the vertical distance from the curve to the line: $R(x) = |f(x) - k|$. Revolving about $x = h$, use $R(y) = |g(y) - h|$.`),
    example(r`Revolve the region between $y = \sqrt{x}$ and $y = 2$, $0 \le x \le 4$, about $y = 2$`, [
      [r`R(x) = 2 - \sqrt{x}`, "Distance from the curve up to the line."],
      [r`V = \pi\int_0^4 (4 - 4\sqrt{x} + x)\,dx`, ""],
      [r`= \pi\left(16 - \tfrac{64}{3} + 8\right) = \tfrac{8\pi}{3} \approx 8.38`, ""],
    ]),
    callout("warning", "Disc or washer?", r`A disc needs the region to touch the axis of rotation along the whole interval. If there's a gap, the solid has a hole: use washers.`),
    callout("application", "Where this shows up", r`Designers revolve a profile about an offset line to model hollow rings and grooved wheels; the radius is always measured to the actual axis.`),
  ],
  questions: [
    num(2, r`Revolve the region between $y = x^2$ and $y = 1$ about $y = 1$. Find the volume, to three decimal places.`, 3.351, { tolerance: 0.002 }, [r`$R = 1 - x^2$ on $[-1, 1]$.`], r`$\pi\int_{-1}^{1}(1 - x^2)^2\,dx = \frac{16\pi}{15}$.`),
    mc(2, r`About the line $y = -1$, a curve point at height $y = 3$ has radius…`, ["2", "3", "4", "−4"], 2, [], r`$3 - (-1) = 4$.`),
    num(2, r`Revolve the region between $x = y^2$ and $x = 4$ about $x = 4$. Find the volume, to two decimal places.`, 107.23, { tolerance: 0.05 }, [r`$R(y) = 4 - y^2$, $-2 \le y \le 2$.`], r`$\pi\int_{-2}^{2}(4 - y^2)^2\,dy = 2\pi\int_0^2 (16 - 8y^2 + y^4)\,dy = 2\pi\left(32 - \frac{64}{3} + \frac{32}{5}\right) = \frac{512\pi}{15} \approx 107.23$.`),
    mc(3, r`The region under $y = \sqrt{x}$ on $[0, 4]$ is revolved about $y = -1$. Discs or washers?`, ["Discs: radius √x + 1", "Washers: outer √x + 1, inner 1", "Discs: radius √x", "Washers: outer √x, inner 1"], 1, [], r`The region doesn't touch $y = -1$, so there's a hole of radius 1.`, "review"),
  ],
});
