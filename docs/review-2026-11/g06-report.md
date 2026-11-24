Checked 53 lessons; changed 2 lessons; 2 errors fixed.

I read all 53 files from top to bottom: header, blocks and questions. I recomputed every numeric example and num answer in Python (scipy for normal, t and chi-square tails, and quad for the integrals). I checked tolerances and every mc correct index. For the activity titles, I checked the sim parameters in src/components/sims/calculus.tsx (series and taylor sims). I only read that file and did not change it.

## slope-confidence-interval
- Sign error: the example said "price vs age, $b = 2.4$ (thousand dollars lost per year)". Regressing price on age would give a negative slope, but the lesson treats b = 2.4 as a positive price drop, and the interpretation says "true mean price drop". Changed it to "price drop vs age". The numbers are unchanged. Python: t*(df=10) = 2.228; 2.4 ± 1.782 gives (0.62, 4.18).

## lagrange-error-bound
- In the review mc question (index 3), the correct option read "M must be the maximum on the interval". That is wrong: M only has to be an upper bound, and the lesson's own example uses M = 2 rather than the maximum e^0.5. Changed it to "M must be at least the maximum on the interval". The correct index is still 0.

Both checks were run after the edits. content:check printed the Outlines line with no errors. The KaTeX check reported 0 problems. It could not find the katex package from /tmp, so I ran it from the project directory as the coordinator described.

## Uncertain / for a human
1. ratio-test: the example says the sum of $\sum 2^n/n!$ "is $e^2 - 1$". That is only true if the series starts at n = 1. The starting index isn't stated, and starting at n = 0 gives $e^2$.
2. lagrange-error-bound: the summary ("using the maximum of the next derivative") and the objective ("Find a valid M = max |f⁽ⁿ⁺¹⁾|") still suggest M must be the maximum. Any upper bound works. I left them because they describe one valid choice, but they could say "an upper bound M ≥ max".
3. comparison-tests: $\sum \frac{3n+1}{n^3-2}$ (first term negative at n = 1) and the warning's $\frac{1}{n^2-5}$ (negative for n = 1, 2) have no stated starting index. The tests need positive terms, at least eventually. The conclusions are still correct.
4. parametric-arc-length: the application says "the displacement shown by GPS is the straight-line change in position". GPS devices don't usually show displacement, so this may be a loose real-world claim.
