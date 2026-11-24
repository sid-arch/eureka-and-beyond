import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "isosceles-equilateral-triangles",
  title: "Isosceles and equilateral triangles",
  summary: "Use the Isosceles Triangle Theorem and its converse, and the equilateral-equiangular corollaries, to find unknown sides and angles.",
  minutes: 25,
  objectives: [
    "Name the legs, base, vertex angle and base angles of an isosceles triangle.",
    "Apply the Isosceles Triangle Theorem and its converse.",
    "Use the fact that a triangle is equilateral if and only if it is equiangular.",
  ],
  concepts: [
    { slug: "isosceles-triangles", name: "Isosceles triangles", description: "Triangles with two congruent sides, whose base angles are congruent.", subject: "subj_math" },
  ],
  blocks: [
    def("Parts of an isosceles triangle", r`The two congruent sides are the legs; the third side is the base. The angle between the legs is the vertex angle, and the two angles at the base are the base angles.`),
    def("Isosceles Triangle Theorem and converse", r`If two sides of a triangle are congruent, the angles opposite them are congruent. Conversely, if two angles are congruent, the sides opposite them are congruent.`),
    text(r`Proof idea: in $\triangle ABC$ with $AB = AC$, draw the bisector of $\angle A$ meeting $\overline{BC}$ at $D$. Then $\triangle ABD \cong \triangle ACD$ by SAS ($AB = AC$, the bisected angles, and the shared side $AD$). So $\angle B \cong \angle C$. The same bisector is also the perpendicular bisector of the base.`),
    def("Corollaries", r`A triangle is equilateral if and only if it is equiangular. Each angle of an equilateral triangle measures $60^\circ$.`),
    example(r`An isosceles triangle has vertex angle $48^\circ$. Find each base angle.`, [
      [r`2x + 48 = 180`, "Base angles are congruent."],
      [r`x = 66^\circ`, ""],
    ]),
    example(r`In $\triangle PQR$, $\angle P \cong \angle R$, $PQ = 3x - 4$ and $RQ = x + 10$. Find $PQ$.`, [
      [r`\text{sides opposite } \angle R \text{ and } \angle P \text{ are } \overline{PQ} \text{ and } \overline{RQ}`, "Converse of the Isosceles Triangle Theorem."],
      [r`3x - 4 = x + 10 \Rightarrow x = 7`, ""],
      [r`PQ = 17`, ""],
    ]),
    callout("warning", "Match sides with opposite angles", r`The congruent base angles are opposite the congruent legs, not next to them. Trace from each angle across the triangle to find its opposite side.`),
    callout("application", "Where this shows up", r`Roof gables, A-frame ladders and many bridge trusses are isosceles triangles, so their two slopes match and loads balance. Equilateral triangles tile the plane and make geodesic domes.`),
  ],
  questions: [
    num(1, r`The base angles of an isosceles triangle are each $71^\circ$. Find the vertex angle.`, 38, { unit: "°" }, [], r`$180 - 2(71) = 38^\circ$.`),
    num(2, r`The vertex angle of an isosceles triangle is $(2x)^\circ$ and each base angle is $(x + 20)^\circ$. Find $x$.`, 35, {}, [r`$2x + 2(x + 20) = 180$.`], r`$4x + 40 = 180$, $x = 35$.`),
    num(2, r`An equilateral triangle has sides $4y - 3$ and $2y + 9$. Find the side length.`, 21, {}, ["Set them equal."], r`$y = 6$, so the side is $21$.`),
    mc(2, r`A triangle has angles $50^\circ$, $50^\circ$, $80^\circ$. Which is true?`, ["All sides are equal", "The two sides opposite the 50° angles are equal", "The side opposite 80° equals another side", "It's a right triangle"], 1, [], r`By the converse, the sides opposite the congruent angles are congruent.`),
    num(3, r`One base angle of an isosceles triangle is $(3x + 6)^\circ$ and the vertex angle is $(4x)^\circ$. Find the vertex angle.`, 67.2, { unit: "°", tolerance: 0.01 }, [r`$2(3x + 6) + 4x = 180$.`], r`$10x + 12 = 180$, $x = 16.8$, so the vertex angle is $67.2^\circ$ (base angles $56.4^\circ$).`, "review"),
  ],
});
