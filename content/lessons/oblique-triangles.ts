import { callout, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "oblique-triangles",
  title: "The Law of Sines and the Law of Cosines",
  summary: "Solve any triangle by choosing the Law of Sines or Law of Cosines from the given information, handle the ambiguous case, and compute areas.",
  minutes: 35,
  objectives: [
    "Choose the Law of Sines (AAS, ASA, SSA) or the Law of Cosines (SAS, SSS).",
    "Solve oblique triangles, including the ambiguous SSA case.",
    "Find triangle areas with ½ab sin C and Heron's formula.",
  ],
  concepts: [
    { slug: "law-of-sines", name: "Law of Sines", description: "In any triangle, a/sin A = b/sin B = c/sin C.", subject: "subj_math" },
    { slug: "law-of-cosines", name: "Law of Cosines", description: "c² = a² + b² − 2ab cos C, generalizing the Pythagorean theorem.", subject: "subj_math" },
  ],
  blocks: [
    formula(r`\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}, \qquad c^2 = a^2 + b^2 - 2ab\cos C`, "Laws of Sines and Cosines"),
    text(r`Decision rule: if you know an angle and its opposite side, use the Law of Sines. If you know two sides and the included angle, or all three sides, use the Law of Cosines. With SSA, check for zero, one or two triangles (compare the given opposite side with $h = b\sin A$).`),
    example(r`SAS: $b = 10$, $c = 7$, $A = 48^\circ$. Solve the triangle.`, [
      [r`a^2 = 100 + 49 - 140\cos 48^\circ \approx 55.32 \Rightarrow a \approx 7.44`, "Law of Cosines."],
      [r`\sin C = \tfrac{7\sin 48^\circ}{7.44} \approx 0.699 \Rightarrow C \approx 44.4^\circ`, "Find the smaller remaining angle first (opposite the shorter side), so it must be acute."],
      [r`B \approx 180 - 48 - 44.4 = 87.6^\circ`, ""],
    ]),
    example(r`SSS: $a = 8$, $b = 5$, $c = 7$. Find angle C.`, [
      [r`\cos C = \frac{64 + 25 - 49}{80} = 0.5 \Rightarrow C = 60^\circ`, ""],
    ]),
    callout("application", "Where this shows up", r`Surveyors, pilots and astronomers solve oblique triangles constantly: distances across lakes, flight paths with wind, and distances to nearby stars by parallax.`),
  ],
  questions: [
    mc(1, r`You know two sides and the included angle. Which law do you use first?`, ["Law of Sines", "Law of Cosines", "Pythagorean theorem", "Either"], 1, [], r`SAS: Law of Cosines.`),
    num(2, r`$A = 30^\circ$, $B = 45^\circ$, $a = 10$. Find $b$ to the nearest hundredth.`, 14.14, { tolerance: 0.006 }, [r`$b = \frac{10\sin 45^\circ}{\sin 30^\circ}$.`], r`$10\sqrt{2} \approx 14.14$.`),
    num(2, r`Sides 9, 12, 15. Find the largest angle in degrees.`, 90, { unit: "°" }, [], r`$\cos C = \frac{81 + 144 - 225}{216} = 0$, so $90^\circ$ (a 3-4-5 triangle).`),
    num(3, r`Find the area of the triangle with $a = 6$, $b = 9$, $C = 120^\circ$, to the nearest tenth.`, 23.4, { tolerance: 0.06 }, [r`$\frac{1}{2}ab\sin C$.`], r`$27\sin 120^\circ = 27 \cdot 0.8660 \approx 23.4$.`, "review"),
  ],
});
