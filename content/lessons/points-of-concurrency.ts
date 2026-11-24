import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "points-of-concurrency",
  title: "Points of concurrency",
  summary: "Prove that a triangle's perpendicular bisectors, angle bisectors, medians and altitudes are concurrent, locate the centers by coordinates, and explore the Euler line.",
  minutes: 35,
  objectives: [
    "Prove the circumcenter and incenter theorems using the bisector theorems.",
    "Find the circumcenter and centroid of a triangle in the coordinate plane.",
    "Describe where each center lies for acute, right and obtuse triangles, and the Euler line.",
  ],
  concepts: [
    { slug: "triangle-centers", name: "Triangle centers", description: "Centroid, orthocenter, incenter and circumcenter: where special segments of a triangle meet.", subject: "subj_math" },
  ],
  formulas: ["midpoint-formula", "distance-formula"],
  blocks: [
    text(r`Why should three lines meet at one point? For perpendicular bisectors: let the bisectors of $\overline{AB}$ and $\overline{BC}$ meet at $P$. Then $PA = PB$ and $PB = PC$, so $PA = PC$, which puts $P$ on the perpendicular bisector of $\overline{AC}$ too. All three pass through $P$, the circumcenter, which is equidistant from all three vertices. The same argument with the Angle Bisector Theorem shows the angle bisectors meet at the incenter, equidistant from all three sides.`),
    def("Locations", r`Centroid and incenter: always inside. Circumcenter and orthocenter: inside for acute triangles, on the triangle for right triangles (circumcenter at the midpoint of the hypotenuse, orthocenter at the right-angle vertex), outside for obtuse triangles.`),
    activity("triangle-explorer", { title: "Compare all four centers", params: { show: "perpendicular" } }),
    callout("tip", "Try this", r`Note the circumcenter's coordinates, then switch to medians and altitudes and note those centers. The centroid always lies on the segment from the circumcenter to the orthocenter, one third of the way along it. That segment is the Euler line.`, "experiment"),
    example(r`Find the circumcenter of $A(0, 0)$, $B(8, 0)$, $C(0, 6)$`, [
      [r`\text{bisector of } \overline{AB}: x = 4;\ \text{of } \overline{AC}: y = 3`, "These two sides are on the axes."],
      [r`(4, 3)`, "That's the midpoint of the hypotenuse BC, as expected for a right triangle."],
      [r`r = \sqrt{16 + 9} = 5`, "Circumradius: half the hypotenuse (10)."],
    ]),
    def("Euler line", r`In any non-equilateral triangle, the orthocenter $H$, centroid $G$ and circumcenter $O$ are collinear, with $HG = 2 \cdot GO$. (The incenter generally isn't on this line.)`),
    callout("application", "Where this shows up", r`Circumcenters solve "equidistant from three locations" problems (placing a cell tower or a fire station); incenters find the largest circular fountain that fits a triangular plaza; centroids balance triangular plates.`),
  ],
  questions: [
    short(2, r`Find the centroid of $(2, 1)$, $(8, 1)$, $(5, 7)$. Enter as (x,y).`, ["(5,3)"], [], r`$\left(\frac{15}{3}, \frac{9}{3}\right) = (5, 3)$.`),
    short(2, r`Find the circumcenter of the right triangle $(0, 0)$, $(10, 0)$, $(0, 4)$. Enter as (x,y).`, ["(5,2)"], ["Midpoint of the hypotenuse."], r`$(5, 2)$.`),
    mc(2, r`Which center is always equidistant from the three sides?`, ["Centroid", "Circumcenter", "Incenter", "Orthocenter"], 2, [], r`The incenter.`),
    mc(2, r`For an obtuse triangle, which center lies outside?`, ["Centroid", "Incenter", "Circumcenter", "None"], 2, [], r`The circumcenter (and the orthocenter) lie outside an obtuse triangle.`),
    num(3, r`On an Euler line, the distance from the orthocenter to the circumcenter is 12. How far is the centroid from the circumcenter?`, 4, {}, [r`$HG = 2\,GO$ and $HG + GO = 12$.`], r`$3\,GO = 12$, so $GO = 4$.`, "review"),
  ],
});
