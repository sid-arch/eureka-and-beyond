import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rotations",
  title: "Rotations",
  summary: "Rotate figures about the origin by 90°, 180° and 270° using coordinate rules, rotate about other points, and identify rotational symmetry.",
  minutes: 25,
  objectives: [
    "Define a rotation by its center, angle and direction.",
    "Use coordinate rules for rotations of 90°, 180° and 270° about the origin.",
    "Rotate about a point other than the origin and identify rotational symmetry.",
  ],
  concepts: [
    { slug: "rigid-motions", name: "Rigid motions", description: "Transformations that preserve distance and angle measure: translations, reflections and rotations.", subject: "subj_math" },
  ],
  blocks: [
    def("Rotation", r`A rotation by angle $\theta$ about center $O$ maps each point $P$ to $P'$ so that $OP' = OP$ and $m\angle POP' = \theta$. Positive angles mean counterclockwise unless stated otherwise.`),
    def("Rules about the origin (counterclockwise)", r`$90^\circ$: $(x, y) \to (-y, x)$. $180^\circ$: $(x, y) \to (-x, -y)$. $270^\circ$ (same as $90^\circ$ clockwise): $(x, y) \to (y, -x)$.`),
    activity("transformations", { title: "Rotate about the origin", params: { kind: "rotate" } }),
    callout("tip", "Try this", r`Rotate by $90^\circ$: $A(1, 1) \to (-1, 1)$, $B(4, 1) \to (-1, 4)$. Check them against the rule $(x, y) \to (-y, x)$. Then try $45^\circ$: the coordinates are no longer whole numbers, but lengths are still preserved.`, "experiment"),
    example(r`Rotate $\triangle PQR$ with $P(2, 0)$, $Q(5, 1)$, $R(3, 4)$ by $90^\circ$ counterclockwise about the origin`, [
      [r`(x, y) \to (-y, x)`, ""],
      [r`P'(0, 2),\ Q'(-1, 5),\ R'(-4, 3)`, ""],
    ], r`Check: $OQ = \sqrt{26}$ and $OQ' = \sqrt{1 + 25} = \sqrt{26}$; slopes of $OQ$ ($\frac{1}{5}$) and $OQ'$ ($-5$) multiply to $-1$, so the angle is $90^\circ$. ✓`),
    example(r`Rotate $A(5, 3)$ by $180^\circ$ about $C(2, 1)$`, [
      [r`A - C = (3, 2)`, "Translate so C is at the origin."],
      [r`(3, 2) \to (-3, -2)`, "Rotate 180° about the origin."],
      [r`A' = (2 - 3,\ 1 - 2) = (-1, -1)`, "Translate back."],
    ]),
    text(r`A figure has rotational symmetry if a rotation of less than $360^\circ$ maps it onto itself. A regular $n$-gon has rotational symmetry of order $n$: it maps onto itself after rotations of $\frac{360^\circ}{n}$, $2 \cdot \frac{360^\circ}{n}$, and so on. Rotations preserve orientation.`),
    callout("application", "Where this shows up", r`Gears, wheels, fan blades and many logos have rotational symmetry. Computer graphics rotate objects with the same formulas, using $\cos\theta$ and $\sin\theta$ for angles that aren't multiples of $90^\circ$.`),
  ],
  questions: [
    short(1, r`Rotate $(3, 4)$ by $180^\circ$ about the origin. Enter as (x,y).`, ["(-3,-4)"], [], r`$(-3, -4)$.`),
    short(2, r`Rotate $(3, 4)$ by $90^\circ$ counterclockwise about the origin. Enter as (x,y).`, ["(-4,3)"], [r`$(x, y) \to (-y, x)$.`], r`$(-4, 3)$.`),
    short(2, r`Rotate $(-2, 5)$ by $90^\circ$ clockwise about the origin. Enter as (x,y).`, ["(5,2)"], [r`$90^\circ$ clockwise is $270^\circ$ counterclockwise: $(x, y) \to (y, -x)$.`], r`$(5, 2)$.`),
    mc(2, r`What is the smallest rotation that maps a regular pentagon onto itself?`, ["36°", "60°", "72°", "108°"], 2, [r`$360^\circ \div 5$.`], r`$72^\circ$.`),
    short(3, r`Rotate $(4, 1)$ by $90^\circ$ counterclockwise about $(1, 1)$. Enter as (x,y).`, ["(1,4)"], ["Translate: (4, 1) − (1, 1) = (3, 0).", "Rotate: (0, 3). Translate back."], r`$(0 + 1, 3 + 1) = (1, 4)$.`, "review"),
  ],
});
