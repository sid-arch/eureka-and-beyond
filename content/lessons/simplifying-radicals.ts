import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "simplifying-radicals",
  title: "Simplifying radical expressions",
  summary: "Simplify square and cube roots using perfect-square and perfect-cube factors, simplify radicals with variables, and rationalize denominators.",
  minutes: 30,
  objectives: [
    "Use the product and quotient properties of radicals to simplify square roots and cube roots.",
    "Simplify radicals containing variables, assuming variables are nonnegative.",
    "Rationalize a denominator containing a single square root.",
  ],
  concepts: [
    { slug: "radicals", name: "Radicals", description: "Expressions with roots, such as √x and ∛x.", subject: "subj_math" },
    { slug: "square-roots", name: "Square roots", description: "A number that, multiplied by itself, gives a given number.", subject: "subj_math" },
  ],
  blocks: [
    def("Product and quotient properties", r`For $a, b \ge 0$: $\sqrt{ab} = \sqrt{a}\sqrt{b}$, and for $b > 0$: $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$. The same properties hold for cube roots, with no sign restriction.`),
    text(r`A square root is in simplest form when the radicand has no perfect-square factor other than 1, there is no fraction under the root, and no root is left in a denominator. To simplify, find the largest perfect-square factor and take its root out.`),
    example(r`Simplify $\sqrt{72}$`, [
      [r`\sqrt{36 \cdot 2}`, "36 is the largest perfect square that divides 72."],
      [r`\sqrt{36}\sqrt{2} = 6\sqrt{2}`, ""],
    ], r`Check: $6\sqrt{2} \approx 6(1.414) = 8.485$ and $\sqrt{72} \approx 8.485$. ✓ Using $\sqrt{4 \cdot 18} = 2\sqrt{18}$ first also works, but needs a second step.`),
    example(r`Simplify $\sqrt[3]{54}$ and $\sqrt{50x^3y^4}$ ($x, y \ge 0$)`, [
      [r`\sqrt[3]{27 \cdot 2} = 3\sqrt[3]{2}`, "27 is a perfect cube."],
      [r`\sqrt{25 \cdot 2 \cdot x^2 \cdot x \cdot y^4}`, "Split into squares and leftovers."],
      [r`5xy^2\sqrt{2x}`, r`$\sqrt{x^2} = x$ and $\sqrt{y^4} = y^2$ for nonnegative values.`],
    ]),
    def("Rationalizing the denominator", r`Multiply the numerator and denominator by the radical in the denominator, which multiplies the fraction by 1: $\dfrac{a}{\sqrt{b}} = \dfrac{a\sqrt{b}}{b}$.`),
    example(r`Rationalize $\dfrac{6}{\sqrt{3}}$ and simplify $\sqrt{\dfrac{5}{8}}$`, [
      [r`\frac{6}{\sqrt{3}} \cdot \frac{\sqrt{3}}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}`, ""],
      [r`\sqrt{\tfrac{5}{8}} = \frac{\sqrt{5}}{2\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{10}}{4}`, r`$\sqrt{8} = 2\sqrt{2}$.`],
    ]),
    callout("warning", "Roots don't split over sums", r`$\sqrt{9 + 16} = \sqrt{25} = 5$, but $\sqrt{9} + \sqrt{16} = 7$. The product property works for multiplication, never for addition.`),
    callout("note", "Why absolute value sometimes appears", r`$\sqrt{x^2} = |x|$ for any real $x$; for example $\sqrt{(-3)^2} = 3$. That's why problems often say "assume all variables are nonnegative."`),
    callout("application", "Where this shows up", r`Exact answers in geometry are often radicals: a square with side 5 has diagonal $5\sqrt{2}$, and an equilateral triangle with side 6 has height $3\sqrt{3}$. Simplified radicals make such answers comparable and easy to estimate.`),
  ],
  questions: [
    short(1, r`Simplify $\sqrt{48}$. Use the format 2sqrt(7).`, ["4sqrt(3)", "4√3", "4sqrt3"], ["48 = 16 · 3."], r`$4\sqrt{3}$.`),
    short(2, r`Simplify $\sqrt{180}$.`, ["6sqrt(5)", "6√5", "6sqrt5"], ["180 = 36 · 5."], r`$6\sqrt{5}$.`),
    short(2, r`Simplify $\sqrt[3]{-40}$.`, ["-2cbrt(5)", "-2∛5", "-2*cbrt(5)"], ["−40 = −8 · 5.", "Use the format -3cbrt(2)."], r`$\sqrt[3]{-8}\sqrt[3]{5} = -2\sqrt[3]{5}$.`),
    short(2, r`Rationalize $\dfrac{10}{\sqrt{5}}$. Use the format 3sqrt(2).`, ["2sqrt(5)", "2√5", "2sqrt5"], [r`Multiply by $\frac{\sqrt{5}}{\sqrt{5}}$.`], r`$\frac{10\sqrt{5}}{5} = 2\sqrt{5}$.`),
    short(3, r`Simplify $\sqrt{98a^5b^2}$ for $a, b \ge 0$. Use the format 5a^3bsqrt(3b).`, ["7a^2bsqrt(2a)", "7a^2b√(2a)", "7a^2b√2a"], ["98 = 49 · 2 and a⁵ = a⁴ · a."], r`$7a^2b\sqrt{2a}$.`),
    mc(2, r`Which is NOT in simplest form?`, [r`$3\sqrt{7}$`, r`$\sqrt{30}$`, r`$2\sqrt{12}$`, r`$\frac{\sqrt{6}}{3}$`], 2, ["Look for a perfect-square factor under a root."], r`$\sqrt{12} = 2\sqrt{3}$, so $2\sqrt{12} = 4\sqrt{3}$.`),
    num(3, r`A square has area 75 cm². Its side is $a\sqrt{3}$ cm. Find $a$.`, 5, {}, [r`$\sqrt{75} = \sqrt{25 \cdot 3}$.`], r`$\sqrt{75} = 5\sqrt{3}$, so $a = 5$.`, "review"),
  ],
});
