import { callout, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "law-of-cosines",
  title: "The Law of Cosines",
  summary: "Derive the Law of Cosines, use it to solve triangles given SAS or SSS, and decide whether to use the Law of Sines or Cosines.",
  minutes: 30,
  objectives: [
    "Derive the Law of Cosines from the Pythagorean theorem.",
    "Solve triangles given two sides and the included angle (SAS) or three sides (SSS).",
    "Choose between the Law of Sines and the Law of Cosines, and use Heron's formula.",
  ],
  concepts: [
    { slug: "law-of-cosines", name: "Law of Cosines", description: "c² = a² + b² − 2ab cos C, generalizing the Pythagorean theorem.", subject: "subj_math" },
  ],
  blocks: [
    formula(r`c^2 = a^2 + b^2 - 2ab\cos C`, "Law of Cosines", "Similarly for a² and b². When C = 90°, cos C = 0 and this is the Pythagorean theorem."),
    text(r`Derivation: place $C$ at the origin and $B$ at $(a, 0)$. Then $A = (b\cos C, b\sin C)$. By the distance formula, $c^2 = (b\cos C - a)^2 + (b\sin C)^2 = b^2\cos^2 C - 2ab\cos C + a^2 + b^2\sin^2 C$. Since $\cos^2 C + \sin^2 C = 1$, this is $a^2 + b^2 - 2ab\cos C$.`),
    example(r`SAS: $a = 9$, $b = 14$, $C = 50^\circ$. Find $c$.`, [
      [r`c^2 = 81 + 196 - 2(9)(14)\cos 50^\circ`, ""],
      [r`c^2 \approx 277 - 252(0.6428) \approx 115.02`, ""],
      [r`c \approx 10.72`, ""],
    ]),
    example(r`SSS: sides 7, 8, 13. Find the largest angle.`, [
      [r`\cos C = \frac{7^2 + 8^2 - 13^2}{2(7)(8)} = \frac{-56}{112} = -0.5`, "The largest angle is opposite the longest side."],
      [r`C = 120^\circ`, "A negative cosine means an obtuse angle."],
    ]),
    text(r`Choosing a law: with SAS or SSS, start with the Law of Cosines. With AAS, ASA or SSA (an angle and its opposite side known), use the Law of Sines. After finding one more part with Cosines, you can switch to Sines, but find the largest angle with Cosines first to avoid the ambiguous case.`),
    callout("note", "Heron's formula", r`From three sides alone: with $s = \frac{a + b + c}{2}$, $\text{Area} = \sqrt{s(s - a)(s - b)(s - c)}$. For 7, 8, 13: $s = 14$, area $= \sqrt{14 \cdot 7 \cdot 6 \cdot 1} = \sqrt{588} \approx 24.25$.`),
    callout("application", "Where this shows up", r`Pilots compute distances when changing heading, robot arms find joint angles from link lengths, and surveyors measure lots with three known sides.`),
  ],
  questions: [
    num(2, r`$a = 5$, $b = 7$, $C = 60^\circ$. Find $c$ to the nearest hundredth.`, 6.24, { tolerance: 0.006 }, [r`$c^2 = 25 + 49 - 70(0.5)$.`], r`$c^2 = 39$, $c \approx 6.24$.`),
    num(2, r`A triangle has sides 5, 6, 7. Find the angle opposite the side of length 7, to the nearest tenth of a degree.`, 78.5, { unit: "°", tolerance: 0.06 }, [r`$\cos C = \frac{25 + 36 - 49}{60}$.`], r`$\cos C = 0.2$, $C \approx 78.5^\circ$.`),
    mc(2, r`You know two angles and a non-included side. Which law should you use first?`, ["Law of Cosines", "Law of Sines", "Pythagorean theorem", "Either one works equally"], 1, [], r`An angle with its opposite side known: Law of Sines.`),
    num(3, r`Two ships leave port at the same time. One travels 30 km on one heading, the other 40 km, with $70^\circ$ between their paths. How far apart are they, to the nearest tenth of a km?`, 41, { unit: "km", tolerance: 0.06 }, [r`$d^2 = 900 + 1600 - 2400\cos 70^\circ$.`], r`$2400\cos 70^\circ \approx 820.85$, so $d^2 \approx 1679.15$ and $d \approx 41.0$ km.`, "review"),
    num(3, r`Use Heron's formula to find the area of a triangle with sides 13, 14, 15.`, 84, {}, [r`$s = 21$.`], r`$\sqrt{21 \cdot 8 \cdot 7 \cdot 6} = \sqrt{7056} = 84$.`, "review"),
  ],
});
