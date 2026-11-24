import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "similar-polygons",
  title: "Similar polygons",
  summary: "Define similarity with dilations, write similarity statements, find scale factors and missing sides, and relate perimeters and areas of similar figures.",
  minutes: 25,
  objectives: [
    "Define similar figures using a dilation followed by rigid motions.",
    "Write similarity statements and use proportions to find missing lengths.",
    "Use the fact that perimeters scale by k and areas by k².",
  ],
  concepts: [
    { slug: "similarity", name: "Similarity", description: "Figures with the same shape: corresponding angles congruent and corresponding sides proportional.", subject: "subj_math" },
    { slug: "scale-factor", name: "Scale factor", description: "The ratio of a length in a copy to the corresponding length in the original.", subject: "subj_math" },
  ],
  blocks: [
    def("Similar figures", r`Two figures are similar ($\sim$) if a dilation followed by rigid motions maps one onto the other. For polygons, that means corresponding angles are congruent and corresponding sides are proportional.`),
    text(r`The ratio of corresponding lengths is the scale factor. If $ABCD \sim EFGH$ with scale factor $\frac{1}{2}$ from $ABCD$ to $EFGH$, then $EF = \frac{1}{2}AB$, and so on. The order of letters in the statement tells you which parts correspond.`),
    activity("transformations", { title: "Dilation makes a similar figure", params: { kind: "dilate" } }),
    callout("tip", "Try this", r`Dilate by 2, then imagine also rotating or reflecting the image. It's still similar to the original: same angles, sides in ratio 2.`, "experiment"),
    example(r`$\triangle ABC \sim \triangle DEF$, $AB = 6$, $BC = 9$, $DE = 10$. Find $EF$.`, [
      [r`\frac{DE}{AB} = \frac{10}{6} = \frac{5}{3}`, "Scale factor from ABC to DEF."],
      [r`EF = \tfrac{5}{3} \cdot 9 = 15`, ""],
    ]),
    example(r`Two similar rectangles have scale factor $3 : 5$. The smaller has area 36 cm². Find the larger area.`, [
      [r`\left(\tfrac{5}{3}\right)^2 = \tfrac{25}{9}`, "Areas scale by the square of the scale factor."],
      [r`36 \cdot \tfrac{25}{9} = 100 \text{ cm}^2`, ""],
    ]),
    callout("warning", "Same angles isn't enough for polygons", r`A square and a 2-by-1 rectangle both have four right angles but aren't similar: their sides aren't proportional. (For triangles, angles alone do suffice, as the next lesson shows.)`),
    callout("application", "Where this shows up", r`Model trains, maps, photo enlargements and architectural drawings are similar to the real objects. Movie screens and TVs with the same aspect ratio are similar rectangles.`),
  ],
  questions: [
    num(1, r`Two similar triangles have scale factor 4. A side of the smaller is 7. Find the corresponding side of the larger.`, 28, {}, [], r`$4 \cdot 7 = 28$.`),
    num(2, r`$PQRS \sim WXYZ$, $PQ = 12$, $WX = 8$, $QR = 15$. Find $XY$.`, 10, {}, ["Scale factor 8/12 = 2/3."], r`$\frac{2}{3} \cdot 15 = 10$.`),
    num(2, r`Similar pentagons have perimeters 30 and 45. A side of the smaller is 8. Find the corresponding side of the larger.`, 12, {}, ["Perimeters scale by the same factor."], r`The scale factor is $1.5$, so $8 \cdot 1.5 = 12$.`),
    num(2, r`Two similar figures have areas 16 and 81. What is the ratio of their corresponding sides? Enter as a decimal (larger ÷ smaller).`, 2.25, {}, ["Take the square root of the area ratio."], r`$\sqrt{81/16} = 9/4 = 2.25$.`),
    mc(3, r`Are all equilateral triangles similar?`, ["Yes", "No", "Only if the same size", "Only if they share a vertex"], 0, [], r`All angles are 60° and sides are proportional (all in ratio $s_1 : s_2$), so yes.`, "review"),
  ],
});
