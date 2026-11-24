Checked 43 lessons; changed 2 lessons; 2 errors fixed.

## composition-of-functions
- Review MC question 5 (discount then tax): options 0 and 1 were plain `$d(t(p))$` and `$t(d(p))$`. Both correctly give the final price, so they were also right answers next to the keyed option 3 ("Both orders give the same, 0.864p"). They now read "Only $d(t(p))$" and "Only $t(d(p))$". Both of those are false, so option 3 (index 3, unchanged) is the only correct choice. Checked by hand: 0.8 · 1.08 = 1.08 · 0.8 = 0.864.

## polynomial-graphs
- Sketch example for $f(x) = -(x + 2)(x - 1)^2$: the closing note said the graph "dip[s] to the y-intercept −2". In fact the low point is −4 at x = −1, and the graph then rises through the y-intercept −2. The note now reads: "...cross at −2, dip to a low point (−4 at x = −1), rise through the y-intercept −2 to touch at 1, then fall." Checked two ways. By hand: f'(x) = −3(x − 1)(x + 1), and f(−1) = −4. In Python: a grid search on [−2, 1] gave the minimum (−4.0 at x = −1.0).

## Verification done
- I read every lesson in full and checked every example step and question. I recomputed the non-trivial numbers with Python:
  - compound and continuous interest; drug decay; e²
  - the population after 20 years
  - the change-of-base values (log₇ 50, log₅ 30) and the other log values (ln 16/ln 3, ln 2/0.06, ln 5, ln 2/0.0231, 10 log 2)
  - the geometric savings sum; the doubling-penny total
  - the margin of error (0.0476)
  - normal probabilities (0.9332, 0.8186, 0.1151) and the top-10% lifetime (1392.2)
  - the binomial coefficients
  - the cubic expansion in the Fundamental Theorem of Algebra lesson
  - the ln y values (0.693 steps); 10^4.5
  - the roots of 3n² + 5n − 350
  - the ball-landing time
- The rest I checked by hand: the synthetic divisions, the matrix and determinant arithmetic, and the integer answers.
- The default numeric tolerance is about 1e-9 (worker/lib/practice.ts). Every integer-answer num question has an exact integer answer. The decimal answers all have explicit tolerances that accept the correct value.
- `npm run -s content:check` printed the Outlines line with no errors. The KaTeX check reported 0 problems in 15498 segments. It couldn't find the katex package when run from /tmp, so I ran it with the coordinator's workaround: a temporary copy in the project root, deleted straight after.

## Uncertain / for a human
1. slant-asymptotes-holes, application callout: "Average-cost and efficiency curves often have slant asymptotes." Average cost C(x)/x usually has a horizontal asymptote. It has a slant one only when cost has a quadratic term. "Often" may overstate this.
2. quadratic-forms, application callout: says standard form gives an arch's "height at the center line (x = 0)". That only holds if x = 0 is placed at the center, and then the vertex form gives the same thing. The wording is a bit odd but not clearly wrong.
3. normal-distribution, "Investigate" tip: "Set the interval to μ ± σ and change σ. Does the shaded probability change?" The expected answer ("no") is only right if the interval is reset to the new μ ± σ, which the prompt doesn't make clear. I couldn't check how the simulation behaves.
4. finding-polynomial-zeros, application callout: "exact zeros come from these theorems." The Rational Root Theorem only gives rational zeros. This is mildly overstated.
5. function-transformations, question 5 hint: it shows the point (−4, 2), which is one step from the answer (−4, 4). It doesn't quite give the answer away, so I left it.
