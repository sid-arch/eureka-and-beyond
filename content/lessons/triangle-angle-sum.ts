import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "triangle-angle-sum",
  title: "Triangle angle sum and exterior angles",
  summary: "Prove that a triangle's angles sum to 180°, use the Exterior Angle Theorem, and classify triangles by sides and angles.",
  minutes: 25,
  objectives: [
    "Classify triangles by their sides and by their angles.",
    "Prove and apply the Triangle Angle Sum Theorem.",
    "Prove and apply the Exterior Angle Theorem.",
  ],
  concepts: [
    { slug: "triangle-angles", name: "Triangle angles", description: "Interior angles of a triangle sum to 180°; an exterior angle equals the sum of the remote interior angles.", subject: "subj_math" },
  ],
  blocks: [
    def("Classifying triangles", r`By sides: scalene (no congruent sides), isosceles (at least two), equilateral (all three). By angles: acute (all angles acute), right (one right angle), obtuse (one obtuse angle), equiangular (all angles equal).`),
    def("Triangle Angle Sum Theorem", r`The interior angles of a triangle sum to $180^\circ$.`),
    text(r`Proof: through vertex $C$ of $\triangle ABC$, draw the line parallel to $\overline{AB}$ (the Parallel Postulate says exactly one exists). The three angles at $C$ along that line form a straight angle, $180^\circ$. The two outer ones are alternate interior angles with $\angle A$ and $\angle B$, so they're congruent to them. So $m\angle A + m\angle C + m\angle B = 180^\circ$.`),
    def("Exterior Angle Theorem", r`An exterior angle of a triangle equals the sum of the two remote (non-adjacent) interior angles: $m\angle 4 = m\angle 1 + m\angle 2$. It follows because $\angle 4$ and $\angle 3$ form a linear pair, and $\angle 3$ plus $\angle 1 + \angle 2$ also total $180^\circ$.`),
    activity("triangle-explorer", { title: "Drag the vertices", params: { show: "angles" } }),
    callout("tip", "Try this", r`Drag any vertex. The angle sum stays $180^\circ$ and the exterior angle at C always equals $\angle A + \angle B$. Can you make a triangle with two obtuse angles? Why not?`, "experiment"),
    example(r`The angles of a triangle are $(2x)^\circ$, $(3x + 5)^\circ$ and $(4x - 14)^\circ$. Find them.`, [
      [r`2x + 3x + 5 + 4x - 14 = 180`, ""],
      [r`9x - 9 = 180 \Rightarrow x = 21`, ""],
      [r`42^\circ,\ 68^\circ,\ 70^\circ`, "Check: 42 + 68 + 70 = 180 ✓."],
    ]),
    example(r`An exterior angle measures $(5x - 10)^\circ$, and the remote interior angles are $(2x + 4)^\circ$ and $40^\circ$. Find $x$.`, [
      [r`5x - 10 = 2x + 4 + 40`, "Exterior Angle Theorem."],
      [r`3x = 54 \Rightarrow x = 18`, "The exterior angle is 80°."],
    ]),
    callout("note", "Corollaries", r`The acute angles of a right triangle are complementary. A triangle can have at most one right or obtuse angle. Each angle of an equiangular triangle is $60^\circ$.`),
    callout("application", "Where this shows up", r`Roof trusses, bridge frames and navigation by triangulation rely on these angle facts: knowing two angles always gives you the third.`),
  ],
  questions: [
    num(1, r`Two angles of a triangle measure $47^\circ$ and $78^\circ$. Find the third.`, 55, { unit: "°" }, [], r`$180 - 47 - 78 = 55^\circ$.`),
    num(1, r`One acute angle of a right triangle is $34^\circ$. Find the other.`, 56, { unit: "°" }, [], r`$90 - 34 = 56^\circ$.`),
    num(2, r`The remote interior angles of an exterior angle are $52^\circ$ and $61^\circ$. Find the exterior angle.`, 113, { unit: "°" }, [], r`$52 + 61 = 113^\circ$.`),
    num(2, r`A triangle's angles are in the ratio $2 : 3 : 4$. Find the largest angle.`, 80, { unit: "°" }, [r`$2x + 3x + 4x = 180$.`], r`$x = 20$, so the angles are $40^\circ$, $60^\circ$, $80^\circ$.`),
    mc(2, r`A triangle has angles $30^\circ$, $60^\circ$, $90^\circ$ and sides of three different lengths. Classify it.`, ["Acute scalene", "Right scalene", "Right isosceles", "Obtuse scalene"], 1, [], r`One right angle and no congruent sides: right scalene.`),
    num(3, r`An exterior angle of a triangle is $(4x + 2)^\circ$. Its remote interior angles are $(x + 20)^\circ$ and $(2x + 7)^\circ$. Find the exterior angle.`, 102, { unit: "°" }, [r`$4x + 2 = 3x + 27$.`], r`$x = 25$, so the exterior angle is $4(25) + 2 = 102^\circ$. Check: the remote angles are $45^\circ$ and $57^\circ$, which sum to $102^\circ$.`, "review"),
  ],
});
