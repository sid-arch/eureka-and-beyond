import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "riemann-sums",
  title: "Approximating areas with Riemann sums",
  summary: "Estimate the area under a curve with rectangles and trapezoids, judge over- and underestimates, and see the sums converge to the integral.",
  minutes: 35,
  objectives: [
    "Compute left, right and midpoint Riemann sums and the trapezoidal sum.",
    "Decide whether a sum over- or underestimates using monotonicity or concavity.",
    "Explain how Riemann sums lead to the definite integral.",
  ],
  concepts: [{ slug: "definite-integral", name: "Definite integral", description: "The limit of Riemann sums; the net signed area between a curve and the x-axis.", subject: "subj_math" }],
  formulas: ["riemann-sum", "ftc"],
  blocks: [
    text(r`If a car's velocity were constant, distance would be velocity times time: the area of a rectangle under the velocity graph. When velocity changes, we can slice time into short pieces, treat velocity as nearly constant on each, and add up the rectangles. That sum is a Riemann sum.`),
    def("Riemann sum", r`For $f$ on $[a, b]$ split into $n$ equal subintervals of width $\Delta x = \frac{b - a}{n}$, the sum $\sum f(x_i^*)\Delta x$, where $x_i^*$ is a chosen point in each subinterval: its left end, right end or midpoint.`),
    example(r`Estimate $\int_0^2 x^2\,dx$ with a left sum, $n = 4$`, [
      [r`\Delta x = \frac{2 - 0}{4} = 0.5`, "Four subintervals of width 0.5."],
      [r`x = 0,\ 0.5,\ 1,\ 1.5`, "Left endpoints."],
      [r`0.5\,(0 + 0.25 + 1 + 2.25)`, "Heights f(x) = x²."],
      [r`= 0.5(3.5) = 1.75`, "Left sum."],
    ], r`The right sum uses $x = 0.5, 1, 1.5, 2$: $0.5(0.25 + 1 + 2.25 + 4) = 3.75$. The exact value is $\frac{8}{3} \approx 2.667$, between them.`),
    callout("tip", "Over or under?", r`For an increasing function, left sums underestimate and right sums overestimate. For a concave-up function, the trapezoidal sum overestimates and the midpoint sum underestimates; concave down reverses both.`),
    formula(r`T = \frac{\Delta x}{2}\big[f(x_0) + 2f(x_1) + \cdots + 2f(x_{n-1}) + f(x_n)\big]`, "Trapezoidal sum", r`Equal to the average of the left and right sums.`),
    text(r`As $n$ grows, every one of these sums approaches the same number for a continuous function. That limit is the definite integral $\int_a^b f(x)\,dx$, the net signed area between the graph and the x-axis: area above the axis counts as positive and area below as negative.`),
    callout("note", "Connection to antiderivatives", r`The Fundamental Theorem of Calculus says this limit can be computed exactly with an antiderivative: $\int_0^2 x^2\,dx = \frac{2^3}{3} - 0 = \frac{8}{3}$.`),
    callout("application", "Where this shows up", r`Engineers estimate fuel used from a flow-rate log sampled once a minute: that's a Riemann sum with $\Delta x = 1$ minute. Doctors estimate total drug exposure as the area under a concentration-time curve the same way.`),
    activity("riemann-sum", { title: "Compare the sums", params: { fn: "x^2" } }),
    callout("tip", "Investigate", r`For $f(x) = x^2$ on $[0, 2]$, how large must $n$ be before the left sum is within 0.01 of $\frac{8}{3}$? How large for the midpoint sum? What does that suggest about which method is more efficient?`, "experiment"),
  ],
  questions: [
    num(1, r`Compute the right Riemann sum for $f(x) = 2x$ on $[0, 3]$ with $n = 3$.`, 12, {}, [r`$\Delta x = 1$; right endpoints 1, 2, 3.`], r`$1 \cdot (2 + 4 + 6) = 12$.`),
    num(2, r`Compute the midpoint sum for $f(x) = x^2$ on $[0, 2]$ with $n = 2$.`, 2.5, { tolerance: 0.0001 }, [r`Midpoints are 0.5 and 1.5; $\Delta x = 1$.`], r`$1 \cdot (0.25 + 2.25) = 2.5$.`),
    mc(2, r`$f$ is increasing on $[a, b]$. Which is true?`, ["Left sum ≥ integral", "Left sum ≤ integral ≤ right sum", "Right sum ≤ integral", "The sums are equal"], 1,
      ["On each subinterval, where is f smallest?"], r`An increasing function is lowest at the left of each subinterval, so left sums underestimate and right sums overestimate.`),
    num(2, r`Compute the trapezoidal sum for $f(x) = x^2$ on $[0, 2]$ with $n = 4$.`, 2.75, { tolerance: 0.0001 },
      ["It's the average of the left sum (1.75) and the right sum (3.75)."], r`$\frac{1.75 + 3.75}{2} = 2.75$, an overestimate because $x^2$ is concave up.`),
    num(3, r`Use the Fundamental Theorem to evaluate $\int_1^3 (2x + 1)\,dx$.`, 10, {}, [r`An antiderivative is $F(x) = x^2 + x$.`], r`$F(3) - F(1) = 12 - 2 = 10$.`, "review"),
  ],
});
