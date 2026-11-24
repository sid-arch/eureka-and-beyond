import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "dilations",
  title: "Dilations and scale factor",
  summary: "Dilate figures about the origin or another center, find scale factors, and describe how dilations affect lengths, angles, perimeter and area.",
  minutes: 25,
  objectives: [
    "Define a dilation by its center and scale factor.",
    "Dilate figures using (x, y) → (kx, ky) and about centers other than the origin.",
    "Describe the effect of a dilation on lengths, angles, perimeter and area.",
  ],
  concepts: [
    { slug: "dilations", name: "Dilations", description: "Transformations that enlarge or reduce a figure by a scale factor from a center.", subject: "subj_math" },
    { slug: "scale-factor", name: "Scale factor", description: "The ratio of a length in a copy to the corresponding length in the original.", subject: "subj_math" },
  ],
  blocks: [
    def("Dilation", r`A dilation with center $O$ and scale factor $k > 0$ maps each point $P$ to $P'$ on ray $\overrightarrow{OP}$ with $OP' = k \cdot OP$. If $k > 1$ it's an enlargement; if $0 < k < 1$ it's a reduction.`),
    text(r`With center at the origin, the rule is $(x, y) \to (kx, ky)$. A dilation is not a rigid motion: lengths are multiplied by $k$. But angles are preserved, and each segment's image is parallel to it (or on the same line). The image is similar to the preimage.`),
    activity("transformations", { title: "Dilate from the origin", params: { kind: "dilate" } }),
    callout("tip", "Try this", r`Set $k = 2$ and compare the readout A′B′ ÷ AB with $k$. The dashed rays from O pass through each vertex and its image. Try $k = 0.5$.`, "experiment"),
    example(r`Dilate $A(4, -2)$ about $C(1, 1)$ with $k = 3$`, [
      [r`A - C = (3, -3)`, "Vector from the center to the point."],
      [r`3(3, -3) = (9, -9)`, "Scale it."],
      [r`A' = C + (9, -9) = (10, -8)`, ""],
    ]),
    example(r`A triangle with perimeter 18 cm and area 12 cm² is dilated by $k = \tfrac{5}{2}$. Find the image's perimeter and area.`, [
      [r`P' = \tfrac{5}{2} \cdot 18 = 45 \text{ cm}`, "Lengths scale by k."],
      [r`A' = \left(\tfrac{5}{2}\right)^2 \cdot 12 = 75 \text{ cm}^2`, "Areas scale by k²."],
    ]),
    callout("warning", "Area scales by k²", r`Doubling a figure's dimensions quadruples its area (and, for solids, multiplies volume by 8). Don't multiply area by $k$.`),
    callout("application", "Where this shows up", r`Zooming in on a photo, projecting a slide, enlarging a blueprint and printing a map at a different scale are all dilations.`),
  ],
  questions: [
    short(1, r`Dilate $(6, -4)$ about the origin with $k = \tfrac{1}{2}$. Enter as (x,y).`, ["(3,-2)"], [], r`$(3, -2)$.`),
    num(2, r`$P(2, 5)$ maps to $P'(8, 20)$ under a dilation centered at the origin. Find $k$.`, 4, {}, [], r`$8 \div 2 = 4$.`),
    short(2, r`Dilate $(5, 7)$ about $(1, 3)$ with $k = 2$. Enter as (x,y).`, ["(9,11)"], ["The vector from the center is (4, 4)."], r`$(1, 3) + 2(4, 4) = (9, 11)$.`),
    num(2, r`A rectangle with area 20 m² is dilated by scale factor 3. What is the image's area, in m²?`, 180, { unit: "m²" }, [], r`$3^2 \cdot 20 = 180$ m².`),
    mc(2, r`Which is preserved by every dilation?`, ["Side lengths", "Angle measures", "Area", "Perimeter"], 1, [], r`Angles are preserved; lengths, perimeter and area change unless $k = 1$.`),
    num(3, r`A segment of length 12 is dilated to length 8. What is the scale factor? Enter a fraction or decimal.`, 2 / 3, { tolerance: 1e-3 }, [], r`$8 \div 12 = \frac{2}{3}$, a reduction.`, "review"),
  ],
});
