import { activity, callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inverse-functions",
  title: "Inverse functions",
  summary: "Find inverses by swapping x and y, verify them by composition, graph them as reflections across y = x, and restrict domains when a function isn't one-to-one.",
  minutes: 30,
  objectives: [
    "Find the inverse of a function algebraically.",
    "Verify inverses with f(f⁻¹(x)) = x and f⁻¹(f(x)) = x.",
    "Use the horizontal line test and restrict a domain so a function has an inverse.",
  ],
  concepts: [
    { slug: "inverse-functions", name: "Inverse functions", description: "Functions that undo each other: f⁻¹(f(x)) = x.", subject: "subj_math" },
  ],
  blocks: [
    def("Inverse function", r`$f^{-1}$ undoes $f$: if $f(a) = b$ then $f^{-1}(b) = a$. The inverse swaps inputs and outputs, so its graph is the reflection of $f$'s graph across $y = x$. (Note $f^{-1}(x) \ne \frac{1}{f(x)}$.)`),
    example(r`Find the inverse of $f(x) = \frac{2x - 5}{3}$`, [
      [r`x = \tfrac{2y - 5}{3}`, "Write y = f(x), then swap x and y."],
      [r`3x = 2y - 5 \Rightarrow y = \tfrac{3x + 5}{2}`, "Solve for y."],
      [r`f^{-1}(x) = \tfrac{3x + 5}{2}`, ""],
    ], r`Check: $f(f^{-1}(x)) = \frac{2 \cdot \frac{3x + 5}{2} - 5}{3} = \frac{3x}{3} = x$. ✓`),
    def("One-to-one", r`A function has an inverse function only if it is one-to-one: each output comes from exactly one input. Graphically, every horizontal line crosses it at most once (the horizontal line test).`),
    example(r`$f(x) = x^2$ fails the horizontal line test. Restrict it and find an inverse.`, [
      [r`\text{restrict to } x \ge 0`, "Keep the right half of the parabola."],
      [r`f^{-1}(x) = \sqrt{x}`, "Domain x ≥ 0."],
    ]),
    activity("exp-log", { title: "A function and its inverse", params: { b: 2 } }),
    callout("tip", "Try this", r`$2^x$ and $\log_2 x$ are inverses. The matching points readout shows $(x, y)$ on one and $(y, x)$ on the other, mirror images across the dashed line $y = x$.`, "experiment"),
    callout("application", "Where this shows up", r`Converting Celsius to Fahrenheit and back, decrypting a coded message, and reading a value off a calibration curve all use inverse functions.`),
  ],
  questions: [
    short(1, r`Find $f^{-1}(x)$ for $f(x) = x + 9$.`, ["x-9"], [], r`$x - 9$.`),
    short(2, r`Find $f^{-1}(x)$ for $f(x) = 4x - 3$. Write it like (x+3)/4.`, ["(x+3)/4", "x/4+3/4"], [], r`$\frac{x + 3}{4}$.`),
    num(2, r`If $f(5) = 12$, what is $f^{-1}(12)$?`, 5, {}, [], r`5.`),
    mc(2, r`Which function has an inverse that is a function?`, [r`$y = x^2$`, r`$y = |x|$`, r`$y = x^3$`, r`$y = x^2 - 4$`], 2, ["Horizontal line test."], r`$x^3$ is one-to-one.`),
    short(3, r`Find $f^{-1}(x)$ for $f(x) = \sqrt{x - 2}$, $x \ge 2$. Write it like x^2+2.`, ["x^2+2"], ["Swap and square."], r`$x = \sqrt{y - 2}$ gives $y = x^2 + 2$ for $x \ge 0$.`, "review"),
  ],
});
