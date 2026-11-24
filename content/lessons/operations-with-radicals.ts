import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "operations-with-radicals",
  title: "Operations with radicals",
  summary: "Add and subtract like radicals, multiply radical expressions with the distributive property, and rationalize binomial denominators with conjugates.",
  minutes: 30,
  objectives: [
    "Add and subtract radicals by simplifying and combining like radicals.",
    "Multiply radical expressions, including binomials, and simplify the results.",
    "Rationalize denominators of the form a + √b using conjugates.",
  ],
  concepts: [
    { slug: "radicals", name: "Radicals", description: "Expressions with roots, such as √x and ∛x.", subject: "subj_math" },
    { slug: "special-products", name: "Special products", description: "Perfect-square trinomials and the difference of two squares.", subject: "subj_math" },
  ],
  formulas: ["special-products"],
  blocks: [
    def("Like radicals", r`Radicals with the same index and the same radicand, such as $4\sqrt{3}$ and $-\sqrt{3}$. They combine like like terms: $4\sqrt{3} - \sqrt{3} = 3\sqrt{3}$. $\sqrt{2}$ and $\sqrt{3}$ are not like radicals and don't combine.`),
    example(r`Simplify $\sqrt{50} + 3\sqrt{8} - \sqrt{18}$`, [
      [r`5\sqrt{2} + 3(2\sqrt{2}) - 3\sqrt{2}`, "Simplify each radical first. Hidden like radicals appear."],
      [r`5\sqrt{2} + 6\sqrt{2} - 3\sqrt{2} = 8\sqrt{2}`, ""],
    ]),
    example(r`Multiply $\sqrt{6} \cdot \sqrt{15}$ and $2\sqrt{3}(4 - \sqrt{3})$`, [
      [r`\sqrt{90} = \sqrt{9 \cdot 10} = 3\sqrt{10}`, "Product property, then simplify."],
      [r`8\sqrt{3} - 2(\sqrt{3})^2 = 8\sqrt{3} - 6`, r`Distribute; $(\sqrt{3})^2 = 3$.`],
    ]),
    example(r`Multiply $(3 + \sqrt{5})(2 - \sqrt{5})$`, [
      [r`6 - 3\sqrt{5} + 2\sqrt{5} - 5`, "Four products, as with any two binomials."],
      [r`1 - \sqrt{5}`, ""],
    ]),
    def("Conjugates", r`$a + \sqrt{b}$ and $a - \sqrt{b}$ are conjugates. Their product is rational: $(a + \sqrt{b})(a - \sqrt{b}) = a^2 - b$, a difference of squares.`),
    example(r`Rationalize $\dfrac{4}{3 - \sqrt{5}}$`, [
      [r`\frac{4}{3 - \sqrt{5}} \cdot \frac{3 + \sqrt{5}}{3 + \sqrt{5}}`, "Multiply by the conjugate over itself."],
      [r`\frac{4(3 + \sqrt{5})}{9 - 5} = \frac{4(3 + \sqrt{5})}{4}`, "The denominator becomes 9 − 5 = 4."],
      [r`3 + \sqrt{5}`, ""],
    ], r`Check: $\frac{4}{3 - 2.236} \approx 5.236$ and $3 + 2.236 = 5.236$. ✓`),
    callout("warning", "Squaring a binomial with a radical", r`$(1 + \sqrt{2})^2 \ne 1 + 2$. It's $1 + 2\sqrt{2} + 2 = 3 + 2\sqrt{2}$: don't forget the middle term.`),
    callout("application", "Where this shows up", r`Exact lengths from the Pythagorean theorem often need radical arithmetic: the perimeter of a right triangle with legs 1 and 2 is $3 + \sqrt{5}$. Conjugates reappear when dividing complex numbers in Algebra 2.`),
  ],
  questions: [
    short(1, r`Simplify $7\sqrt{3} - 2\sqrt{3}$.`, ["5sqrt(3)", "5√3", "5sqrt3"], ["Like radicals combine."], r`$5\sqrt{3}$.`),
    short(2, r`Simplify $\sqrt{12} + \sqrt{27}$.`, ["5sqrt(3)", "5√3", "5sqrt3"], [r`$\sqrt{12} = 2\sqrt{3}$ and $\sqrt{27} = 3\sqrt{3}$.`], r`$5\sqrt{3}$.`),
    short(2, r`Multiply $\sqrt{10} \cdot \sqrt{14}$ and simplify.`, ["2sqrt(35)", "2√35", "2sqrt35"], [r`$\sqrt{140} = \sqrt{4 \cdot 35}$.`], r`$2\sqrt{35}$.`),
    short(2, r`Multiply $(4 + \sqrt{3})(4 - \sqrt{3})$.`, ["13"], ["Conjugates: a² − b."], r`$16 - 3 = 13$.`),
    short(3, r`Expand $(2 + \sqrt{7})^2$. Use the format 9+2sqrt(5).`, ["11+4sqrt(7)", "11+4√7", "11+4sqrt7"], [r`$4 + 4\sqrt{7} + 7$.`], r`$11 + 4\sqrt{7}$.`),
    short(3, r`Rationalize $\dfrac{2}{\sqrt{3} + 1}$. Use the format sqrt(5)-2.`, ["sqrt(3)-1", "√3-1", "sqrt3-1", "-1+sqrt(3)"], ["Multiply by the conjugate √3 − 1.", "The denominator becomes 3 − 1 = 2."], r`$\frac{2(\sqrt{3} - 1)}{2} = \sqrt{3} - 1$.`, "review"),
    mc(2, r`Which pair are like radicals?`, [r`$\sqrt{8}$ and $\sqrt{2}$`, r`$\sqrt{3}$ and $\sqrt[3]{3}$`, r`$2\sqrt{5}$ and $5\sqrt{2}$`, r`$\sqrt{6}$ and $\sqrt{3}$`], 0, ["Simplify first."], r`$\sqrt{8} = 2\sqrt{2}$, so it is a like radical with $\sqrt{2}$.`, "review"),
  ],
});
