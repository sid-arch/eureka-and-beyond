Checked 49 lessons; changed 4 lessons; 4 errors fixed.

All 49 lessons in g03.txt were read in full. Every worked-example number and every num() answer was recomputed (Python for anything beyond mental arithmetic: trig, pi, radicals, combinations). Tolerances were checked against the grader in worker/lib/practice.ts (absolute tolerance, default 1e-9). MC answer indices were checked by hand. Simulation tips were checked against src/components/sims/geometry.tsx where they made specific claims (default triangle A(1,1), B(4,1), C(1,3) is counterclockwise; the triangle explorer rejects degenerate triangles and shows an exterior-angle readout).

## angles-elevation-depression
- Two-triangle tree example: the result was given as x ≈ 14.24, h ≈ 16.97 m. Those come from rounding the intermediate values, and the lesson itself warns against doing that. It now reads x = 7.0021/(1.19175 − 0.70021) ≈ 14.25, h ≈ 16.98 m. Python: x = 10·tan35°/(tan50° − tan35°) = 14.2450, h = x·tan50° = 16.9765.

## polygon-angle-sums
- Application callout: "Only equilateral triangles, squares and regular hexagons tile a floor by themselves" was false as written, because any triangle, any quadrilateral and some pentagons tile. It now begins "Among regular polygons, only …". Checked by reasoning: 360/108 and 360/x for n ≥ 7 are not whole numbers.

## proving-triangles-similar
- "Why does AA work?" text: the proof dilated so that "one side" matched and then claimed congruent angles with the included side (ASA). That only holds if the matched side is the one between the two angles. It now reads "so the side between the two angles matches the larger triangle's corresponding side". Checked by reasoning.

## cross-sections-revolution
- Cone cross sections: "at a tilt, an ellipse" was overstated, because a steeper tilt that cuts the base gives a parabolic or hyperbolic section. It now reads "at a slight tilt that misses the base, an ellipse". Checked against the standard conic-section classification.

(dilations.ts: I briefly loosened a tolerance and then reverted it, so the file is unchanged. 1e-3 accepts 0.667 for 2/3, which matches how the probability lessons grade their fraction answers.)

Checks run: `npm run -s content:check` printed "Outlines: 24 courses, 219 units, 1156 planned lessons. Lesson sources: 634." with no errors. The KaTeX check (run from the project dir as instructed) reported "checked 15503 math segments; 0 problems".

## Uncertain / for a human
1. Fraction-answer tolerances. dilations (2/3, tol 1e-3), sample-spaces-probability (5/12, 1/12, 32/52), permutations-combinations (10/84) and independent-dependent-events (1/12) accept fractions or 3-decimal answers but reject 2-decimal answers such as 0.67 or 0.42. The prompts say "Enter a fraction or decimal" without giving a precision. Consider stating the precision or loosening the tolerance to 0.005.
2. equations-of-circles application: "Phone towers' coverage areas and earthquake epicenters are found the same way." Epicenters are found by trilateration, but coverage areas aren't "found" by intersecting circles. It probably means locating a phone from towers. I left it.
3. reflections: "an isosceles triangle 1" line of symmetry. That is true for a non-equilateral isosceles triangle, but under the lesson's own inclusive definition (in triangle-angle-sum, "at least two" sides) an equilateral triangle is isosceles and has 3. I left it.
4. parallel-lines-transversals application: "Carpenters cut stair stringers using alternate interior angles so every step is level." Plausible but loosely stated. I left it.
