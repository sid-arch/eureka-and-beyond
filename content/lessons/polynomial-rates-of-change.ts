import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polynomial-rates-of-change",
  title: "Polynomial functions and rates of change",
  summary: "Relate a polynomial's increasing and decreasing intervals, extrema and concavity to its rate of change, and recognize constant nth differences for degree-n polynomials.",
  minutes: 25,
  objectives: [
    "Identify local and global extrema of polynomials from graphs.",
    "Connect where the rate of change changes sign to extrema, and where it changes direction to inflection points.",
    "Recognize that a degree-n polynomial has constant nth differences over equal steps.",
  ],
  concepts: [
    { slug: "polynomial-functions", name: "Polynomial functions", description: "Functions built from sums of powers of x with whole-number exponents.", subject: "subj_math" },
    { slug: "concavity", name: "Concavity", description: "Whether a function's rate of change is increasing (concave up) or decreasing (concave down).", subject: "subj_math" },
  ],
  blocks: [
    def("Extrema and rates", r`A local maximum occurs where the rate of change switches from positive to negative; a local minimum where it switches from negative to positive. A global (absolute) maximum or minimum is the greatest or least value on the whole domain. Polynomials of odd degree have no global extrema.`),
    activity("polynomial-zeros", { title: "Extrema and inflection", params: { a: 0.2, r1: -3, m1: 1, r2: 0, m2: 1, r3: 3, m3: 1 } }),
    callout("tip", "Try this", r`This cubic, $0.2x(x + 3)(x - 3)$, has a local max and a local min and one inflection point between them, where the curve switches from concave down to concave up.`, "experiment"),
    example(r`Cubic $y = x^3$ at $x$ = 0, 1, 2, 3, 4`, [
      [r`y: 0, 1, 8, 27, 64`, ""],
      [r`\Delta: 1, 7, 19, 37;\ \Delta^2: 6, 12, 18;\ \Delta^3: 6, 6`, "Third differences are constant for degree 3."],
    ]),
    callout("application", "Where this shows up", r`Optimization (maximum volume, minimum cost) means finding where the rate of change switches sign, the central idea of differential calculus.`),
  ],
  questions: [
    mc(1, r`At a local maximum of a polynomial, the rate of change switches from…`, ["negative to positive", "positive to negative", "zero to positive", "it doesn't change"], 1, [], r`Rising then falling.`),
    mc(2, r`Which polynomial has a global maximum?`, [r`$x^3$`, r`$-x^4 + 2x^2$`, r`$x^4$`, r`$x^5 - x$`], 1, ["Even degree with a negative leading coefficient."], r`Both ends go down, so it has a highest point.`),
    mc(2, r`For a degree-4 polynomial with equal x-steps, which differences are constant?`, ["First", "Second", "Third", "Fourth"], 3, [], r`The nth differences of a degree-n polynomial are constant.`),
    mc(3, r`How many inflection points can a cubic have?`, ["0", "Exactly 1", "2", "3"], 1, [], r`Every cubic has exactly one inflection point.`, "review"),
  ],
});
