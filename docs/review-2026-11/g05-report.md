Checked 52 lessons; changed 2 lessons; 2 errors fixed.

I read every lesson in g05.txt in full. I recomputed the numeric worked examples and num answers in Python: law of sines and cosines, the vector and dot-product angles, projectile range and landing time, exponential and half-life values, pH, correlation and regression, residuals, binomial values, confidence intervals and the P-value. I also checked tolerances, mc correct indices, solutions and hints. For the activities whose wording depends on the simulation's parameters, I checked the sim source: sinusoid uses A·g(B(x−C))+D, polynomial-zeros uses a·Π(x−r)^m, and projectile shows a "Flight time" readout.

## z-scores-percentiles
- Practice question 4 (mc, runner at the 30th percentile) had two correct options. Option 0, "30% of runners were faster or tied", is true for race times, and the question's own solution says so. I changed option 0 to "70% of runners were faster than her", which is false: about 70% were slower. Option 1 is still the only correct answer, and the index (1) is unchanged.

## law-of-large-numbers
- The Investigate tip asked "Which sum is least common, and why?", but 2 and 12 tie at 1/36 each. It now says "Which sums are least common, and why?". Verified by counting: the sum 2 can only be (1,1) and the sum 12 only (6,6).

## Checks
- `npm run -s content:check`: printed the Outlines line with no errors.
- KaTeX check: run from the project root as the coordinator described, because the /tmp copy could not find the katex package. Result: 15499 segments, 0 problems.

## Uncertain / for a human
1. analyzing-functions, "Try this" tip: the activity's polynomial, 0.25(x+3)(x−1)²(x−4), is a quartic with two relative minima (x ≈ −1.85, y ≈ −13.7, and x ≈ 3.10, y ≈ −6.05) and one maximum (x = 1, y = 0). The tip says "the relative maximum and minimum", as if there were one of each. The left minimum is below the sim's y-window of [−8, 8], so the tip matches what students see. I left it unchanged.
2. correlation: "Only a randomized experiment can show cause and effect" is the standard textbook line but is a little absolute. Something like "a well-designed randomized experiment is the reliable way to show cause and effect" would be more careful. I left it unchanged.
