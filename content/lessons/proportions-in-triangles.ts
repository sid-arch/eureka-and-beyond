import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "proportions-in-triangles",
  title: "Proportions in triangles",
  summary: "Use the Triangle Proportionality Theorem, the Triangle Midsegment Theorem, parallel lines cutting transversals proportionally, and the Triangle Angle Bisector Theorem.",
  minutes: 30,
  objectives: [
    "Apply the Triangle Proportionality Theorem and its converse.",
    "Use the Triangle Midsegment Theorem.",
    "Apply the Triangle Angle Bisector Theorem and proportional segments formed by parallel lines.",
  ],
  concepts: [
    { slug: "similarity", name: "Similarity", description: "Figures with the same shape: corresponding angles congruent and corresponding sides proportional.", subject: "subj_math" },
  ],
  blocks: [
    def("Triangle Proportionality Theorem", r`If a line parallel to one side of a triangle meets the other two sides, it divides them proportionally: if $\overline{DE} \parallel \overline{BC}$, then $\frac{AD}{DB} = \frac{AE}{EC}$. The converse is also true.`),
    example(r`$\overline{DE} \parallel \overline{BC}$, $AD = 6$, $DB = 4$, $AE = 9$. Find $EC$.`, [
      [r`\tfrac{6}{4} = \tfrac{9}{EC}`, ""],
      [r`EC = 6`, ""],
    ]),
    def("Triangle Midsegment Theorem", r`The segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long.`),
    def("Parallel lines and transversals", r`If three or more parallel lines cut two transversals, they divide the transversals proportionally.`),
    def("Triangle Angle Bisector Theorem", r`An angle bisector of a triangle divides the opposite side into segments proportional to the other two sides: if $\overline{AD}$ bisects $\angle A$ in $\triangle ABC$, then $\frac{BD}{DC} = \frac{AB}{AC}$.`),
    example(r`In $\triangle ABC$, $AB = 12$, $AC = 18$ and $BC = 20$. The bisector of $\angle A$ meets $\overline{BC}$ at $D$. Find $BD$.`, [
      [r`\tfrac{BD}{DC} = \tfrac{12}{18} = \tfrac{2}{3}`, ""],
      [r`BD = \tfrac{2}{5} \cdot 20 = 8,\ DC = 12`, "20 splits in the ratio 2 : 3."],
    ]),
    callout("warning", "Segments of a side, not the whole side", r`The proportion $\frac{AD}{DB} = \frac{AE}{EC}$ uses the pieces of each side. If you want $DE$ itself, use similar triangles: $\frac{DE}{BC} = \frac{AD}{AB}$, with whole sides.`),
    callout("application", "Where this shows up", r`Parallel streets crossing two avenues divide the blocks proportionally, which surveyors use to split land. Artists use these proportions in perspective drawing.`),
  ],
  questions: [
    num(1, r`$\overline{DE} \parallel \overline{BC}$, $AD = 5$, $DB = 10$, $AE = 4$. Find $EC$.`, 8, {}, [], r`$\frac{5}{10} = \frac{4}{EC}$ gives $EC = 8$.`),
    num(2, r`A midsegment of a triangle is parallel to a side of length 26. How long is the midsegment?`, 13, {}, [], r`Half: 13.`),
    num(2, r`The bisector of $\angle A$ in $\triangle ABC$ splits $\overline{BC}$ into $BD = 6$ and $DC = 9$. If $AB = 10$, find $AC$.`, 15, {}, [r`$\frac{6}{9} = \frac{10}{AC}$.`], r`$AC = 15$.`),
    num(2, r`Three parallel lines cut one transversal into segments 4 and 6, and another transversal into segments 10 and $x$. Find $x$.`, 15, {}, [], r`$\frac{4}{6} = \frac{10}{x}$, $x = 15$.`),
    mc(3, r`In $\triangle ABC$, $D$ is on $\overline{AB}$ with $AD = 3$, $DB = 5$, and $E$ is on $\overline{AC}$ with $AE = 4.5$, $EC = 7.5$. Is $\overline{DE} \parallel \overline{BC}$?`, ["Yes", "No", "Cannot tell", "Only if ABC is isosceles"], 0, [r`Compare $\frac{3}{5}$ and $\frac{4.5}{7.5}$.`], r`Both equal 0.6, so by the converse, $\overline{DE} \parallel \overline{BC}$.`, "review"),
  ],
});
