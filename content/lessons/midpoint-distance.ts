import { activity, callout, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "midpoint-distance",
  title: "Midpoint and distance in the coordinate plane",
  summary: "Find the midpoint and length of a segment from its endpoints, find a missing endpoint, and see how the distance formula comes from the Pythagorean theorem.",
  minutes: 25,
  objectives: [
    "Find the midpoint of a segment with the midpoint formula.",
    "Find a missing endpoint given one endpoint and the midpoint.",
    "Derive and use the distance formula from the Pythagorean theorem.",
  ],
  concepts: [
    { slug: "coordinate-geometry", name: "Coordinate geometry", description: "Studying geometric figures with coordinates and algebra.", subject: "subj_math" },
  ],
  formulas: ["midpoint-formula", "distance-formula", "pythagorean-theorem"],
  blocks: [
    formula(r`M = \left(\frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2}\right)`, "Midpoint formula", "Average the x-coordinates and average the y-coordinates."),
    example(r`Find the midpoint of $A(-3, 5)$ and $B(7, -1)$`, [
      [r`\left(\frac{-3 + 7}{2},\ \frac{5 + (-1)}{2}\right) = (2, 2)`, ""],
    ]),
    example(r`$M(1, -2)$ is the midpoint of $\overline{PQ}$ and $P(-4, 3)$. Find $Q$.`, [
      [r`\frac{-4 + x}{2} = 1 \Rightarrow x = 6`, "Solve each coordinate separately."],
      [r`\frac{3 + y}{2} = -2 \Rightarrow y = -7`, ""],
      [r`Q(6, -7)`, "Or think: from P to M is +5, −5, so add that again."],
    ]),
    text(r`To find the distance between two points, draw the right triangle whose legs are horizontal and vertical. The legs have lengths $|x_2 - x_1|$ and $|y_2 - y_1|$, and the segment is the hypotenuse. The Pythagorean theorem gives the distance formula.`),
    formula(r`d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`, "Distance formula"),
    example(r`Find the distance between $(-2, 1)$ and $(4, 9)$`, [
      [r`d = \sqrt{(4 - (-2))^2 + (9 - 1)^2} = \sqrt{36 + 64}`, "Legs of 6 and 8."],
      [r`d = \sqrt{100} = 10`, ""],
    ]),
    activity("coordinate-plane", { title: "Count the legs", params: { x: 4, y: 3 } }),
    callout("tip", "Try this", r`With P at $(4, 3)$, the dashed lines are legs of length 4 and 3, so P is $\sqrt{16 + 9} = 5$ units from the origin. Move P to $(-5, 12)$: how far is it from the origin?`, "experiment"),
    callout("warning", "Square before adding", r`$\sqrt{6^2 + 8^2} \ne 6 + 8$. And the order of the points doesn't matter, because squaring removes the sign of each difference.`),
    callout("application", "Where this shows up", r`Ride-hailing apps compute straight-line distances between GPS coordinates, and game engines use the distance formula to detect collisions.`),
  ],
  questions: [
    short(1, r`Find the midpoint of $(2, 8)$ and $(6, -4)$. Enter as (x,y).`, ["(4,2)"], ["Average each coordinate."], r`$(4, 2)$.`),
    num(1, r`Find the distance between $(0, 0)$ and $(5, 12)$.`, 13, {}, [r`$\sqrt{25 + 144}$.`], r`$\sqrt{169} = 13$.`),
    num(2, r`Find the distance between $(-3, 4)$ and $(1, 1)$.`, 5, {}, ["Legs 4 and 3."], r`$\sqrt{16 + 9} = 5$.`),
    short(2, r`$M(3, 0)$ is the midpoint of $\overline{AB}$ and $A(-1, 5)$. Find $B$. Enter as (x,y).`, ["(7,-5)"], ["From A to M is +4, −5."], r`$B = (3 + 4, 0 - 5) = (7, -5)$.`),
    num(2, r`Find the distance between $(2, -1)$ and $(5, 3)$.`, 5, {}, [], r`$\sqrt{9 + 16} = 5$.`),
    num(3, r`Find the perimeter of the triangle with vertices $(0, 0)$, $(6, 0)$ and $(6, 8)$.`, 24, {}, ["Two sides are horizontal or vertical.", "The third side is a hypotenuse."], r`$6 + 8 + 10 = 24$.`, "review"),
    mc(3, r`Which point is equidistant from $(0, 0)$ and $(8, 0)$?`, [r`$(4, 7)$`, r`$(3, 3)$`, r`$(5, 0)$`, r`$(8, 4)$`], 0, ["Points equidistant from two points lie on the perpendicular bisector."], r`The perpendicular bisector is $x = 4$, so $(4, 7)$: both distances are $\sqrt{65}$.`, "review"),
  ],
});
