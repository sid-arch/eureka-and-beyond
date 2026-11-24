import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "measuring-segments-angles",
  title: "Measuring segments and angles",
  summary: "Use the Segment and Angle Addition Postulates, congruence, midpoints and bisectors to set up and solve equations for lengths and angle measures.",
  minutes: 25,
  objectives: [
    "Find segment lengths on a number line and apply the Segment Addition Postulate.",
    "Name and classify angles and apply the Angle Addition Postulate.",
    "Use midpoints, segment bisectors and angle bisectors to write and solve equations.",
  ],
  concepts: [
    { slug: "segment-angle-measure", name: "Segment and angle measure", description: "Lengths of segments and measures of angles, and how they add.", subject: "subj_math" },
  ],
  blocks: [
    def("Length and congruence", r`The length $AB$ of $\overline{AB}$ is the distance $|a - b|$ between the coordinates of $A$ and $B$ on a number line. Segments with equal lengths are congruent: $\overline{AB} \cong \overline{CD}$ means $AB = CD$.`),
    def("Segment Addition Postulate", r`If $B$ is between $A$ and $C$, then $AB + BC = AC$.`),
    example(r`$B$ is between $A$ and $C$, $AB = 2x + 3$, $BC = 3x - 1$ and $AC = 32$. Find $x$ and $AB$.`, [
      [r`(2x + 3) + (3x - 1) = 32`, "Segment Addition Postulate."],
      [r`5x + 2 = 32 \Rightarrow x = 6`, ""],
      [r`AB = 2(6) + 3 = 15`, r`Check: $BC = 17$ and $15 + 17 = 32$. ✓`],
    ]),
    def("Angles", r`An angle is two rays with a common endpoint, the vertex. $\angle ABC$ has vertex $B$. Its measure $m\angle ABC$ is in degrees. Acute: between $0^\circ$ and $90^\circ$. Right: $90^\circ$. Obtuse: between $90^\circ$ and $180^\circ$. Straight: $180^\circ$.`),
    def("Angle Addition Postulate", r`If $D$ is in the interior of $\angle ABC$, then $m\angle ABD + m\angle DBC = m\angle ABC$.`),
    def("Midpoints and bisectors", r`The midpoint of a segment divides it into two congruent segments. An angle bisector is a ray that divides an angle into two congruent angles.`),
    example(r`$\overrightarrow{BD}$ bisects $\angle ABC$, $m\angle ABD = 4x - 2$ and $m\angle DBC = 2x + 16$. Find $m\angle ABC$.`, [
      [r`4x - 2 = 2x + 16`, "A bisector makes the two angles equal."],
      [r`x = 9`, ""],
      [r`m\angle ABD = 34^\circ,\ m\angle ABC = 68^\circ`, ""],
    ]),
    callout("warning", "Name angles with the vertex in the middle", r`$\angle ABC$ and $\angle CBA$ are the same angle, but $\angle BAC$ is a different one, with vertex $A$. Use a single letter like $\angle B$ only when just one angle has that vertex.`),
    callout("application", "Where this shows up", r`Carpenters split boards with segment addition, surveyors measure angles with theodolites, and a protractor works because angle measure behaves like a number line wrapped around the vertex.`),
  ],
  questions: [
    num(1, r`On a number line, $P$ is at $-4$ and $Q$ is at $7$. Find $PQ$.`, 11, {}, ["Distance is |a − b|."], r`$|-4 - 7| = 11$.`),
    num(2, r`$M$ is the midpoint of $\overline{AB}$, $AM = 3x + 4$ and $MB = 5x - 6$. Find $AB$.`, 38, {}, ["Set AM = MB.", "x = 5."], r`$3x + 4 = 5x - 6$ gives $x = 5$. $AM = 19$, so $AB = 38$.`),
    num(2, r`$m\angle PQR = 115^\circ$, $S$ is in its interior, and $m\angle PQS = 48^\circ$. Find $m\angle SQR$.`, 67, { unit: "°" }, ["Angle Addition Postulate."], r`$115 - 48 = 67^\circ$.`),
    mc(1, r`An angle measures $90^\circ$. It is…`, ["acute", "right", "obtuse", "straight"], 1, [], r`A $90^\circ$ angle is a right angle.`),
    num(2, r`$B$ is between $A$ and $C$. $AB = x + 5$, $BC = 2x$, $AC = 5x - 13$. Find $AC$.`, 32, {}, [r`$x + 5 + 2x = 5x - 13$.`], r`$3x + 5 = 5x - 13$, so $x = 9$ and $AC = 45 - 13 = 32$. Check: $14 + 18 = 32$ ✓.`),
    num(3, r`$\overrightarrow{OM}$ bisects $\angle LON$. $m\angle LON = 6x + 10$ and $m\angle LOM = 4x - 5$. Find $m\angle LOM$.`, 35, { unit: "°" }, [r`$m\angle LON = 2 \cdot m\angle LOM$.`], r`$6x + 10 = 2(4x - 5) = 8x - 10$, so $x = 10$ and $m\angle LOM = 35^\circ$.`, "review"),
  ],
});
