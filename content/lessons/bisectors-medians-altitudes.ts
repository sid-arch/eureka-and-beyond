import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "bisectors-medians-altitudes",
  title: "Bisectors, medians and altitudes",
  summary: "Use the perpendicular bisector and angle bisector theorems, and find the centroid, orthocenter, incenter and circumcenter of a triangle.",
  minutes: 30,
  objectives: [
    "Apply the Perpendicular Bisector Theorem and the Angle Bisector Theorem.",
    "Identify medians and altitudes and their points of concurrency.",
    "Use the centroid's 2 : 1 property to find segment lengths.",
  ],
  concepts: [
    { slug: "triangle-centers", name: "Triangle centers", description: "Centroid, orthocenter, incenter and circumcenter: where special segments of a triangle meet.", subject: "subj_math" },
  ],
  blocks: [
    def("Perpendicular Bisector Theorem", r`A point is on the perpendicular bisector of a segment if and only if it is equidistant from the segment's endpoints.`),
    def("Angle Bisector Theorem", r`A point is on the bisector of an angle if and only if it is equidistant from the two sides of the angle (distance measured perpendicular to each side).`),
    def("Special segments", r`A median joins a vertex to the midpoint of the opposite side. An altitude is the perpendicular segment from a vertex to the line containing the opposite side.`),
    def("Points of concurrency", r`Perpendicular bisectors meet at the circumcenter, equidistant from the vertices (center of the circumscribed circle). Angle bisectors meet at the incenter, equidistant from the sides (center of the inscribed circle). Medians meet at the centroid. Altitudes meet at the orthocenter.`),
    activity("triangle-explorer", { title: "Find the four centers", params: { show: "medians" } }),
    callout("tip", "Try this", r`Switch between medians, altitudes, bisectors and perpendicular bisectors. Drag C to make an obtuse triangle: which centers move outside the triangle? (The centroid and incenter never do.) Then make a right triangle and watch where the circumcenter lands.`, "experiment"),
    def("Centroid Theorem", r`The centroid is two thirds of the way from each vertex to the midpoint of the opposite side. So it divides each median in the ratio $2 : 1$. In coordinates, it's the average of the vertices: $\left(\frac{x_1 + x_2 + x_3}{3}, \frac{y_1 + y_2 + y_3}{3}\right)$.`),
    example(r`In $\triangle ABC$, median $\overline{AD}$ has length 18. $G$ is the centroid. Find $AG$ and $GD$.`, [
      [r`AG = \tfrac{2}{3} \cdot 18 = 12`, ""],
      [r`GD = \tfrac{1}{3} \cdot 18 = 6`, "AG is twice GD."],
    ]),
    example(r`Find the centroid of $(0, 0)$, $(6, 0)$, $(3, 9)$`, [
      [r`\left(\tfrac{0 + 6 + 3}{3},\ \tfrac{0 + 0 + 9}{3}\right) = (3, 3)`, ""],
    ]),
    callout("application", "Where this shows up", r`The centroid is the balance point of a triangular plate. The circumcenter answers "where should a new store go to be equally far from three towns?" and the incenter gives the largest circle that fits inside a triangular plot.`),
  ],
  questions: [
    num(1, r`$P$ is on the perpendicular bisector of $\overline{AB}$, and $PA = 13$. Find $PB$.`, 13, {}, [], r`Points on the perpendicular bisector are equidistant from A and B: 13.`),
    num(2, r`$G$ is the centroid of a triangle, and $GD = 7$ along median $\overline{AD}$. Find $AD$.`, 21, {}, ["GD is one third of the median."], r`$AD = 3 \cdot 7 = 21$.`),
    num(2, r`$Q$ is on the bisector of $\angle XYZ$. Its distance to $\overrightarrow{YX}$ is $3x + 2$ and to $\overrightarrow{YZ}$ is $5x - 6$. Find $x$.`, 4, {}, ["Angle Bisector Theorem."], r`$3x + 2 = 5x - 6$, so $x = 4$ (distance 14).`),
    mc(2, r`Which point is the center of the circle that passes through all three vertices of a triangle?`, ["Centroid", "Incenter", "Circumcenter", "Orthocenter"], 2, [], r`The circumcenter is equidistant from the vertices.`),
    mc(2, r`Where is the orthocenter of a right triangle?`, ["At the right-angle vertex", "At the midpoint of the hypotenuse", "Outside the triangle", "At the centroid"], 0, ["The two legs are altitudes."], r`The legs are perpendicular, so they're two of the altitudes, meeting at the right angle's vertex.`),
    num(3, r`Find the y-coordinate of the centroid of $(-2, 5)$, $(4, -1)$, $(7, 8)$.`, 4, {}, ["Average the y-coordinates."], r`$\frac{5 - 1 + 8}{3} = 4$. (The centroid is $(3, 4)$.)`, "review"),
  ],
});
