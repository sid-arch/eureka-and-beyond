import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "points-lines-planes",
  title: "Points, lines and planes",
  summary: "Use the undefined terms point, line and plane, name figures with correct notation, and apply the basic postulates about how they intersect.",
  minutes: 20,
  objectives: [
    "Describe points, lines and planes and name them with standard notation.",
    "Distinguish lines, segments and rays, and identify collinear and coplanar points.",
    "Apply postulates about intersections of lines and planes.",
  ],
  concepts: [
    { slug: "undefined-terms", name: "Undefined terms", description: "Point, line and plane: the basic objects that all other geometric definitions are built from.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Every definition uses other words, so some words must be left undefined. Geometry starts with three: point, line and plane. We describe them instead. A point is an exact location with no size. A line is a straight path of points extending forever in both directions with no thickness. A plane is a flat surface extending forever in every direction.`),
    def("Notation", r`A point is named by a capital letter, $A$. A line through $A$ and $B$ is $\overleftrightarrow{AB}$ or a lowercase letter such as $\ell$. A plane is named by a script capital, plane $\mathcal{M}$, or by three noncollinear points, plane $ABC$.`),
    def("Segments and rays", r`Segment $\overline{AB}$ is $A$, $B$ and all points between them. Ray $\overrightarrow{AB}$ starts at endpoint $A$ and goes through $B$ forever. Opposite rays share an endpoint and point in opposite directions, forming a line.`),
    def("Collinear and coplanar", r`Points are collinear if one line contains them all, and coplanar if one plane contains them all. Any two points are collinear; any three points are coplanar.`),
    text(r`Postulates are statements accepted without proof. Through any two points there is exactly one line. Through any three noncollinear points there is exactly one plane. If two lines intersect, they meet in exactly one point. If two planes intersect, they meet in exactly one line.`),
    example(r`Name the figure in several ways`, [
      [r`\overrightarrow{PQ} \ne \overrightarrow{QP}`, "Rays are named endpoint first, so these point in opposite directions."],
      [r`\overline{PQ} = \overline{QP},\quad \overleftrightarrow{PQ} = \overleftrightarrow{QP}`, "Segments and lines can be named in either order."],
    ]),
    example(r`Two walls of a room meet the floor. Describe the intersections.`, [
      [r`\text{wall} \cap \text{floor} = \text{a line}`, "Two planes meet in a line, the edge where they meet."],
      [r`\text{wall}_1 \cap \text{wall}_2 \cap \text{floor} = \text{a point}`, "The corner of the room."],
    ]),
    callout("tip", "Why a three-legged stool doesn't wobble", r`Three noncollinear points determine exactly one plane, so the three feet always rest on the floor's plane. A four-legged chair wobbles when its four feet don't all lie in one plane.`),
    callout("application", "Where this shows up", r`Architects, video-game engines and CAD software describe every surface as pieces of planes and every edge as a segment. A 3D model is built from points (vertices), segments (edges) and plane regions (faces).`),
  ],
  questions: [
    mc(1, r`How many lines pass through two distinct points?`, ["None", "Exactly one", "Exactly two", "Infinitely many"], 1, ["This is a postulate."], r`Through any two points there is exactly one line.`),
    mc(1, r`Which name refers to a ray starting at $K$?`, [r`$\overrightarrow{JK}$`, r`$\overrightarrow{KJ}$`, r`$\overline{KJ}$`, r`$\overleftrightarrow{KJ}$`], 1, ["The endpoint is written first."], r`$\overrightarrow{KJ}$ starts at $K$ and passes through $J$.`),
    mc(2, r`Two different planes intersect. What is their intersection?`, ["A point", "A line", "A plane", "A segment"], 1, ["Think of two walls meeting."], r`Two distinct intersecting planes meet in exactly one line.`),
    mc(2, r`Points $A$, $B$, $C$ lie on line $\ell$, and $D$ is not on $\ell$. Which statement is true?`, ["A, B, C, D are collinear", "A, B, D are collinear", "A, B, C, D are coplanar", "No plane contains A, B and D"], 2, ["A line and a point not on it determine a plane."], r`Line $\ell$ and point $D$ lie in exactly one plane, so all four points are coplanar. They are not collinear.`),
    num(2, r`How many planes contain three given noncollinear points?`, 1, {}, ["Postulate about three noncollinear points."], r`Exactly one.`),
    short(3, r`What is the intersection of opposite rays $\overrightarrow{QP}$ and $\overrightarrow{QR}$? Enter the single letter of the point.`, ["Q", "q"], ["Opposite rays share their endpoint."], r`They share only their common endpoint, $Q$. Together they form line $PR$.`, "review"),
    mc(3, r`Is it possible for three planes to intersect in a single point?`, ["No, never", "Yes, like two walls and a floor meeting at a corner", "Only if they are parallel", "Only if they are the same plane"], 1, ["Picture a corner of a room."], r`Yes. Two walls and the floor meet at a corner point.`, "review"),
  ],
});
