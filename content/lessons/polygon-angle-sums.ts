import { callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polygon-angle-sums",
  title: "Polygon angle sums",
  summary: "Find the sum of the interior angles of any polygon, the measure of each angle of a regular polygon, and use the fact that exterior angles sum to 360°.",
  minutes: 25,
  objectives: [
    "Derive the interior angle sum (n − 2) · 180° by dividing a polygon into triangles.",
    "Find each interior and exterior angle of a regular polygon.",
    "Find the number of sides of a regular polygon from an angle measure.",
  ],
  concepts: [
    { slug: "polygon-angles", name: "Polygon angles", description: "Interior angles of an n-gon sum to (n − 2)·180°; exterior angles sum to 360°.", subject: "subj_math" },
  ],
  formulas: ["polygon-angle-sum"],
  blocks: [
    def("Polygon vocabulary", r`A polygon is a closed plane figure made of segments. It is convex if no segment between two of its points goes outside it. A regular polygon has all sides congruent and all angles congruent.`),
    text(r`Pick one vertex of a convex $n$-gon and draw every diagonal from it. That cuts the polygon into $n - 2$ triangles, and their angles together make up exactly the polygon's angles. Each triangle contributes $180^\circ$.`),
    formula(r`S = (n - 2) \cdot 180^\circ`, "Interior angle sum"),
    text(r`Walk around a convex polygon, turning at each corner by its exterior angle. After one full lap you face your starting direction, having turned exactly $360^\circ$. So the exterior angles (one per vertex) always sum to $360^\circ$, for any number of sides.`),
    example(r`Find the interior angle sum of a decagon and each angle of a regular decagon`, [
      [r`S = (10 - 2) \cdot 180^\circ = 1440^\circ`, ""],
      [r`1440^\circ \div 10 = 144^\circ`, r`Or: each exterior angle is $360 \div 10 = 36^\circ$, and $180 - 36 = 144^\circ$.`],
    ]),
    example(r`Each interior angle of a regular polygon is $156^\circ$. How many sides does it have?`, [
      [r`180 - 156 = 24^\circ`, "Each exterior angle."],
      [r`n = 360 \div 24 = 15`, "A 15-gon."],
    ]),
    callout("tip", "Use exterior angles", r`Questions about regular polygons are usually fastest with exterior angles: each is $\frac{360^\circ}{n}$, and the interior angle is $180^\circ$ minus that.`),
    callout("application", "Where this shows up", r`Among regular polygons, only equilateral triangles, squares and regular hexagons tile a floor by themselves, because only their interior angles (60°, 90°, 120°) divide $360^\circ$ evenly. Honeycombs use hexagons for this reason.`),
  ],
  questions: [
    num(1, r`Find the interior angle sum of a hexagon.`, 720, { unit: "°" }, [r`$(6 - 2) \cdot 180$.`], r`$720^\circ$.`),
    num(1, r`Find each exterior angle of a regular octagon.`, 45, { unit: "°" }, [], r`$360 \div 8 = 45^\circ$.`),
    num(2, r`Find each interior angle of a regular pentagon.`, 108, { unit: "°" }, [], r`$540 \div 5 = 108^\circ$.`),
    num(2, r`Each exterior angle of a regular polygon is $20^\circ$. How many sides does it have?`, 18, {}, [], r`$360 \div 20 = 18$.`),
    num(2, r`Four angles of a pentagon measure $100^\circ$, $115^\circ$, $96^\circ$ and $120^\circ$. Find the fifth.`, 109, { unit: "°" }, ["The sum is 540°."], r`$540 - 431 = 109^\circ$.`),
    mc(3, r`Can a regular polygon have interior angles of $130^\circ$?`, ["Yes, with 8 sides", "Yes, with 9 sides", "No", "Yes, with 7 sides"], 2, ["Find 360 divided by the exterior angle."], r`The exterior angle would be $50^\circ$, and $360 \div 50 = 7.2$ isn't a whole number, so no.`, "review"),
    num(3, r`The interior angle sum of a polygon is $2340^\circ$. How many sides does it have?`, 15, {}, [r`$(n - 2) \cdot 180 = 2340$.`], r`$n - 2 = 13$, so $n = 15$.`, "review"),
  ],
});
