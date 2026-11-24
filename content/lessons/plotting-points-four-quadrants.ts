import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "plotting-points-four-quadrants",
  title: "Plotting points in all four quadrants",
  summary: "Read and plot ordered pairs anywhere on the coordinate plane, name quadrants, reflect points across the axes and find distances along gridlines.",
  minutes: 20,
  objectives: [
    "Plot and read ordered pairs with positive and negative coordinates.",
    "Identify the quadrant or axis that contains a point from the signs of its coordinates.",
    "Reflect points across the axes and find horizontal or vertical distances between points.",
  ],
  concepts: [
    { slug: "coordinate-plane", name: "Coordinate plane", description: "A plane with perpendicular number lines (axes) used to locate points by ordered pairs.", subject: "subj_math" },
  ],
  blocks: [
    def("Coordinate plane", r`Two number lines that cross at right angles at their zeros. The horizontal one is the $x$-axis, the vertical one is the $y$-axis, and they meet at the origin $(0, 0)$.`),
    def("Ordered pair", r`A pair $(x, y)$ that locates a point. Start at the origin, move $x$ units horizontally (right if positive, left if negative), then $y$ units vertically (up if positive, down if negative).`),
    text(r`The axes split the plane into four quadrants, numbered I, II, III and IV counterclockwise from the upper right. Signs tell you the quadrant: $(+, +)$ is in I, $(-, +)$ in II, $(-, -)$ in III and $(+, -)$ in IV. A point with a 0 coordinate lies on an axis and is in no quadrant.`),
    activity("coordinate-plane", { title: "Move a point around the plane", params: { x: -4, y: 3 } }),
    callout("tip", "Try this", r`Move P into each quadrant and note the signs. Then turn on "Reflect over x-axis." Which coordinate changes sign? Predict before you try the y-axis and the origin.`, "experiment"),
    example(r`Plot $A(-3, 5)$ and $B(4, -2)$ and name their quadrants`, [
      [r`A: 3 \text{ left},\ 5 \text{ up}`, "Negative x, positive y: Quadrant II."],
      [r`B: 4 \text{ right},\ 2 \text{ down}`, "Positive x, negative y: Quadrant IV."],
    ]),
    example(r`Find the distance between $(-2, 6)$ and $(-2, -3)$`, [
      [r`x \text{ is the same, so the points are on a vertical line}`, ""],
      [r`|6 - (-3)| = 9`, "Subtract the y-coordinates and take the absolute value."],
    ], "Counting grid squares: 6 units from y = 6 down to 0, then 3 more to −3, for 9 in all."),
    callout("warning", "Order matters", r`$(2, 5)$ and $(5, 2)$ are different points. The x-coordinate always comes first: "run before you jump."`),
    callout("application", "Where this shows up", r`Maps use coordinate grids, video games place every object by coordinates, and a city grid can be described with streets as axes. The reflection rules are used in graphics software to flip images.`),
  ],
  questions: [
    mc(1, r`In which quadrant is $(-6, -1)$?`, ["I", "II", "III", "IV"], 2, ["Both coordinates are negative."], r`$(-, -)$ is Quadrant III.`),
    mc(1, r`Where is the point $(0, -4)$?`, ["Quadrant III", "Quadrant IV", "On the x-axis", "On the y-axis"], 3,
      ["The x-coordinate is 0."], r`With $x = 0$, the point is on the $y$-axis, 4 units below the origin.`),
    short(2, r`Reflect $(5, -3)$ across the $x$-axis. Enter the image as (x,y).`, ["(5,3)"], ["Reflecting across the x-axis changes the sign of y."], r`$(5, 3)$.`),
    short(2, r`Reflect $(-2, 7)$ across the $y$-axis. Enter the image as (x,y).`, ["(2,7)"], ["Reflecting across the y-axis changes the sign of x."], r`$(2, 7)$.`),
    num(2, r`What is the distance between $(-5, 1)$ and $(3, 1)$?`, 8, {}, ["Same y-coordinate: subtract the x-coordinates."], r`$|3 - (-5)| = 8$.`),
    mc(2, r`A point has a positive x-coordinate and its y-coordinate is the opposite of its x-coordinate. Where is it?`, ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], 3,
      ["Try x = 2."], r`For example $(2, -2)$: positive $x$, negative $y$, so Quadrant IV.`),
    num(3, r`Three corners of a rectangle are $(-3, 4)$, $(5, 4)$ and $(5, -2)$. What is its area?`, 48, { unit: "square units" },
      ["The fourth corner is (−3, −2).", "Width = 5 − (−3); height = 4 − (−2)."], r`Width 8, height 6, area $8 \times 6 = 48$.`, "review"),
    short(3, r`The fourth corner of the rectangle in the previous problem is…? Enter as (x,y).`, ["(-3,-2)"], ["It shares an x-coordinate with (−3, 4) and a y-coordinate with (5, −2)."], r`$(-3, -2)$.`, "review"),
  ],
});
