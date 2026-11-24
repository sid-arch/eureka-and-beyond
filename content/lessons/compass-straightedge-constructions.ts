import { activity, callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "compass-straightedge-constructions",
  title: "Compass and straightedge constructions",
  summary: "Copy segments and angles, bisect segments and angles, and construct perpendicular and parallel lines, explaining why each construction works.",
  minutes: 30,
  objectives: [
    "Copy a segment and an angle with a compass and straightedge.",
    "Construct a perpendicular bisector and an angle bisector.",
    "Construct a perpendicular through a point and a line parallel to a given line, and justify each construction.",
  ],
  concepts: [
    { slug: "constructions", name: "Geometric constructions", description: "Exact drawings made with only a compass and an unmarked straightedge.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A construction uses only two tools: a straightedge to draw lines (it has no marks, so it can't measure) and a compass to draw circles and copy distances. Because every step is exact, each construction is really a proof: you can explain why it must work.`),
    def("Copy a segment", r`To copy $\overline{AB}$: draw a ray from a new point $C$. Set the compass to length $AB$, place the point at $C$, and mark an arc across the ray at $D$. Then $CD = AB$ because both equal the compass opening.`),
    example(r`Construct the perpendicular bisector of $\overline{AB}$`, [
      [r`\text{1. Open the compass to more than } \tfrac{1}{2}AB`, ""],
      [r`\text{2. Draw arcs above and below from } A \text{ and from } B`, "Keep the same opening."],
      [r`\text{3. Join the two intersection points } P, Q`, r`$\overleftrightarrow{PQ}$ is the perpendicular bisector.`],
    ], r`Why: $P$ and $Q$ are each the same distance from $A$ and $B$. Points equidistant from the endpoints lie on the perpendicular bisector, so the line through them is it. It also gives the midpoint.`),
    example(r`Bisect $\angle ABC$`, [
      [r`\text{1. Arc from } B \text{ crossing both rays at } D, E`, ""],
      [r`\text{2. Equal arcs from } D \text{ and } E \text{ meeting at } F`, ""],
      [r`\text{3. Draw } \overrightarrow{BF}`, "It bisects the angle."],
    ], r`Why: $BD = BE$, $DF = EF$ and $BF = BF$, so triangles $BDF$ and $BEF$ are congruent by SSS, and the angles at $B$ are equal.`),
    def("Copy an angle", r`Draw an arc across both sides of the given angle and the same arc from the new vertex. Measure the chord between the arc's crossing points and copy it onto the new arc. The new angle is congruent by SSS.`),
    def("Perpendicular through a point; parallel line", r`From point $P$, arc across the line at two points, then bisect that segment: the bisector passes through $P$ and is perpendicular. For a parallel line through $P$, draw any transversal through $P$ and copy the angle it makes with the line at $P$ (corresponding angles).`),
    callout("tip", "Practice digitally", r`Free tools like GeoGebra have compass and line tools that behave exactly like the physical ones. Drag the starting points afterwards: a correct construction keeps working.`),
    callout("note", "What can't be constructed", r`Some constructions are impossible with these tools, proved in the 1800s: trisecting an arbitrary angle, doubling a cube and squaring a circle.`),
    callout("application", "Where this shows up", r`Before computers, drafters used these methods for every technical drawing. They still underlie geometry software, and the perpendicular bisector is how cell-tower coverage regions (Voronoi diagrams) are drawn.`),
    activity("constructions", { title: "Constructions step by step", params: { kind: "perpendicular" } }),
    callout("tip", "Try this", r`Step through each construction, then drag A and B. The readouts confirm the result stays perpendicular, bisected or equilateral, whatever the starting points.`, "experiment"),
  ],
  questions: [
    mc(1, r`Why can't a straightedge be used to measure a length in a construction?`, ["It is too short", "It has no markings", "It only draws curves", "It is not allowed at all"], 1, [], r`A straightedge is unmarked; distances are copied with the compass.`),
    mc(2, r`In the perpendicular bisector construction, why must the compass opening be more than half of AB?`, ["So the arcs from A and B intersect", "So the line is longer", "So the angle is acute", "It doesn't matter"], 0, ["What happens if the arcs are too small?"], r`If the radius is half of AB or less, the arcs from A and B don't meet above and below, so there are no two points to join.`),
    mc(2, r`Which congruence criterion justifies the angle-bisector construction?`, ["SAS", "SSS", "ASA", "AAS"], 1, ["Which three pairs of sides are equal?"], r`$BD = BE$ and $DF = EF$ by construction and $BF$ is shared, so SSS.`),
    mc(2, r`A point P is equidistant from A and B. Where must P lie?`, ["On segment AB", "On the perpendicular bisector of AB", "On a circle centered at A", "At the midpoint only"], 1, [], r`The set of all points equidistant from A and B is the perpendicular bisector of $\overline{AB}$.`),
    mc(3, r`To construct a line through P parallel to line ℓ, which angle relationship is used?`, ["Vertical angles", "Congruent corresponding angles", "Supplementary angles", "Complementary angles"], 1, ["Draw a transversal through P."], r`Copying the angle so that corresponding angles are congruent guarantees the lines are parallel.`, "review"),
  ],
});
