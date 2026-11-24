import { activity, callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parabola-focus-directrix",
  title: "Equations of parabolas from focus and directrix",
  summary: "Define a parabola as the points equidistant from a focus and a directrix, derive its equation with the distance formula, and find the focus and directrix from an equation.",
  minutes: 35,
  objectives: [
    "Define a parabola geometrically using a focus and directrix.",
    "Derive the equation of a parabola from its focus and directrix.",
    "Find the vertex, focus and directrix of (x − h)² = 4p(y − k).",
  ],
  concepts: [
    { slug: "conic-parabola", name: "Parabola (conic section)", description: "The set of points equidistant from a focus point and a directrix line.", subject: "subj_math" },
  ],
  formulas: ["distance-formula", "vertex-form"],
  blocks: [
    def("Parabola", r`The set of all points in a plane that are the same distance from a fixed point (the focus) and a fixed line (the directrix). The vertex is halfway between them.`),
    example(r`Find the equation of the parabola with focus $(0, 2)$ and directrix $y = -2$`, [
      [r`\sqrt{x^2 + (y - 2)^2} = |y + 2|`, "Distance to focus = distance to directrix."],
      [r`x^2 + y^2 - 4y + 4 = y^2 + 4y + 4`, "Square both sides."],
      [r`x^2 = 8y \Rightarrow y = \tfrac{1}{8}x^2`, ""],
    ]),
    def("Standard form", r`With vertex $(h, k)$ and directed distance $p$ from the vertex to the focus: $(x - h)^2 = 4p(y - k)$ opens up if $p > 0$ and down if $p < 0$. The focus is $(h, k + p)$ and the directrix is $y = k - p$. Equivalently $y = \frac{1}{4p}(x - h)^2 + k$.`),
    activity("vertex-explorer", { title: "Narrow and wide parabolas", params: { a: 0.5, h: 0, k: 0 } }),
    callout("tip", "Try this", r`For $y = ax^2$, $a = \frac{1}{4p}$, so $p = \frac{1}{4a}$. With $a = 0.5$, the focus is at $(0, 0.5)$. Make the parabola wider (smaller $a$): does the focus move away from the vertex or toward it?`, "experiment"),
    example(r`Find the vertex, focus and directrix of $(x + 1)^2 = -12(y - 3)$`, [
      [r`h = -1,\ k = 3,\ 4p = -12 \Rightarrow p = -3`, ""],
      [r`\text{vertex } (-1, 3),\ \text{focus } (-1, 0),\ \text{directrix } y = 6`, "Opens down because p < 0."],
    ]),
    callout("application", "Where this shows up", r`Satellite dishes, car headlights and solar cookers are parabolic because every ray parallel to the axis reflects through the focus (and vice versa). The receiver or bulb sits at the focus.`),
  ],
  questions: [
    short(2, r`Write the equation of the parabola with focus $(0, 3)$ and directrix $y = -3$, in the form x^2=…y.`, ["x^2=12y"], [r`$p = 3$, so $4p = 12$.`], r`$x^2 = 12y$.`),
    short(2, r`Find the focus of $x^2 = 20y$. Enter as (x,y).`, ["(0,5)"], [r`$4p = 20$.`], r`$p = 5$: focus $(0, 5)$.`),
    num(2, r`What is the directrix of $(x - 2)^2 = 8(y + 1)$? Enter the value c in y = c.`, -3, {}, [r`Vertex $(2, -1)$, $p = 2$.`], r`$y = -1 - 2 = -3$.`),
    mc(2, r`Which way does $(x - 4)^2 = -6(y - 1)$ open?`, ["Up", "Down", "Left", "Right"], 1, ["Sign of p."], r`$4p = -6 < 0$: down.`),
    num(3, r`A satellite dish has cross-section $y = \frac{1}{16}x^2$ (in inches). How far above the vertex should the receiver be placed?`, 4, { unit: "in" }, [r`$\frac{1}{4p} = \frac{1}{16}$.`], r`$p = 4$ inches.`, "review"),
  ],
});
