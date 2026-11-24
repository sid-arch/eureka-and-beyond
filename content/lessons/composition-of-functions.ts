import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "composition-of-functions",
  title: "Composition of functions",
  summary: "Evaluate and write compositions f(g(x)), see that order matters, find domains of compositions, and decompose a function into simpler pieces.",
  minutes: 25,
  objectives: [
    "Evaluate f(g(a)) from equations, tables and graphs.",
    "Write a formula for f ∘ g and g ∘ f and compare them.",
    "Find the domain of a composition and decompose a function as a composition.",
  ],
  concepts: [
    { slug: "function-operations", name: "Function operations", description: "Combining functions by adding, subtracting, multiplying, dividing or composing.", subject: "subj_math" },
  ],
  blocks: [
    def("Composition", r`$(f \circ g)(x) = f(g(x))$: apply $g$ first, then $f$ to the result. Read it inside out.`),
    example(r`$f(x) = x^2 + 1$ and $g(x) = 2x - 3$. Find $f(g(2))$, $f(g(x))$ and $g(f(x))$.`, [
      [r`g(2) = 1,\ f(1) = 2`, "Inside first."],
      [r`f(g(x)) = (2x - 3)^2 + 1 = 4x^2 - 12x + 10`, ""],
      [r`g(f(x)) = 2(x^2 + 1) - 3 = 2x^2 - 1`, "Different: order matters."],
    ]),
    text(r`The domain of $f \circ g$ is all $x$ in the domain of $g$ for which $g(x)$ is in the domain of $f$. For $f(x) = \sqrt{x}$ and $g(x) = x - 5$, $f(g(x)) = \sqrt{x - 5}$ needs $x \ge 5$.`),
    example(r`Decompose $h(x) = \sqrt{3x + 7}$`, [
      [r`g(x) = 3x + 7,\ f(x) = \sqrt{x}`, "The inner operation and the outer one."],
      [r`h = f \circ g`, ""],
    ]),
    callout("application", "Where this shows up", r`Unit conversions chain as compositions (inches → centimeters → meters), a discount then a tax is a composition, and computer programs pass one function's output into another constantly.`),
  ],
  questions: [
    num(1, r`$f(x) = x + 4$, $g(x) = 3x$. Find $f(g(2))$.`, 10, {}, [], r`$g(2) = 6$, $f(6) = 10$.`),
    num(1, r`Same functions: find $g(f(2))$.`, 18, {}, [], r`$f(2) = 6$, $g(6) = 18$.`),
    short(2, r`$f(x) = x^2$, $g(x) = x - 1$. Write $f(g(x))$ expanded.`, ["x^2-2x+1"], [], r`$(x - 1)^2 = x^2 - 2x + 1$.`),
    short(2, r`Same functions: write $g(f(x))$.`, ["x^2-1"], [], r`$x^2 - 1$.`),
    mc(3, r`A store takes 20% off ($d(p) = 0.8p$) and then adds 8% tax ($t(p) = 1.08p$). Which composition gives the final price?`, [r`Only $d(t(p))$`, r`Only $t(d(p))$`, r`$d(p) + t(p)$`, "Both orders give the same, 0.864p"], 3, ["Multiply the factors."], r`Both compositions equal $0.864p$ because multiplication is commutative; here order doesn't matter.`, "review"),
  ],
});
