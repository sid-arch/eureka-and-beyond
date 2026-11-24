Checked 53 lessons; changed 11 lessons; 17 errors fixed.

All 53 lessons in g01.txt were read in full. Worked-example numbers and num() answers/tolerances were recomputed (Python, including scipy for the statistics lessons); mc() correct indices were checked against every option. Grading behaviour was checked in worker/lib/practice.ts (default absolute tolerance 1e-9, fractions parsed, short-text answers whitespace-stripped and lowercased).

## Fixes

### evaluating-expressions
- Last review question (Celsius equal to -40 F): the hint said "or try C = -40", which gave the answer away. It now reads "Set -40 = 9/5 C + 32 and solve for C." Verified: 9/5(-40)+32 = -40.

### equations-variables-both-sides
- Phone-plan question: the exact answer is 133.33... and the tolerance was 0.01, so the reasonable rounded answer 133.3 was marked wrong (diff 0.033). Tolerance is now 0.05. It still rejects 133 and other wrong values such as 80 = 20/0.25. Python: 20/0.15 = 133.333.

### proof-with-properties
- Counterexample question ("sum of two primes is always even"): only 2,3 / 2,5 / 2,7 / 2,11 / 2,13 were accepted, so other valid counterexamples were marked wrong. Added 2,17 through 2,47 (every odd prime up to 47). It is still a finite list (see Uncertain).

### deriving-quadratic-formula
- "Solve x^2 - 6x + 4 = 0": the format example "like 3±sqrt(5)" was the exact answer. The example is now "2±sqrt(7)". Verified: (6 ± sqrt(20))/2 = 3 ± sqrt(5).

### simplifying-radicals (4 fixes, all format examples that were the exact answer)
- sqrt(48): the format "4sqrt(3)" was the answer. Now "2sqrt(7)".
- cbrt(-40): the hint "Use the format -2cbrt(5)" was the answer. Now "-3cbrt(2)".
- 10/sqrt(5): the format "2sqrt(5)" was the answer. Now "3sqrt(2)".
- sqrt(98a^5b^2): the format "7a^2bsqrt(2a)" was the answer. Now "5a^3bsqrt(3b)".
- Answers rechecked: 16·3; -8·5; 10sqrt5/5 = 2sqrt5; 49·2·a^4·a·b^2.

### operations-with-radicals (2 fixes, format examples that were the exact answer)
- (2+sqrt7)^2: the format "11+4sqrt(7)" was the answer. Now "9+2sqrt(5)". Verified: 4 + 4sqrt7 + 7.
- 2/(sqrt3+1): the format "sqrt(3)-1" was the answer. Now "sqrt(5)-2". Verified: 2(sqrt3-1)/2.

### transformations-linear-absolute-value
- "|x| reflected, right 3, up 2": the format "y=-|x-3|+2" was the answer. Now "y=a|x-h|+k".

### complex-polar-form (3 fixes)
- "Write 2i in polar form": the format "2(cos(pi/2)+isin(pi/2))" was the answer. Now "3(cos(pi/4)+isin(pi/4))".
- "Convert 4(cos pi/6 + i sin pi/6)": the format "2sqrt(3)+2i" was the answer. Now "5sqrt(2)+3i". Verified: 4·sqrt3/2 = 2sqrt3 and 4·1/2 = 2.
- Application callout: it said multiplying phasors "is how circuit impedances combine". That is inaccurate: series impedances add in rectangular form. It now says it "is how Ohm's law V = IZ is applied to AC circuits."

### de-moivres-theorem
- Square roots of i: the format "±(sqrt(2)/2+sqrt(2)/2i)" was the answer. Now "±(sqrt(3)/2+1/2i)". Verified: half of pi/2 is pi/4, giving ±(sqrt2/2)(1+i).

### polar-equation-graphs
- Application callout: "Microphone pickup patterns are cardioids" overstated it, since many microphones are omni, figure-8 or supercardioid. It now says "Many microphone pickup patterns are cardioids."

### matrices-transformations
- 180° rotation matrix: the format "[[-1,0],[0,-1]]" was the answer. Now "[[a,b],[c,d]]".

Spot values checked with no change needed (examples): Death Valley -86 m and Denver 1609 m; 3.49·11.2 = 39.088; 44.80·1.075 = 48.16; 4.29/18 = 0.238 vs 5.99/26 = 0.230; 9π = 28.27, 70π = 219.9, 12+2π = 18.28, 60-2.25π = 52.93, 45π = 141.37, 192π = 603.19; 41² = 1681 (n = 40 for n²+n+41); root of x³+x-1 ≈ 0.6823; t*(0.975, df 15) = 2.131; significance example z = 1.85, two-sided P = 0.064; two-proportion SE = 0.0494, interval (0.053, 0.247); P(Z ≥ 2) = 0.0228.

Checks: `npm run -s content:check` printed "Outlines: 24 courses, 219 units, 1156 planned lessons. Lesson sources: 634." with no errors. The KaTeX check (run from the project directory as the coordinator described) reported "checked 15503 math segments; 0 problems".

## Uncertain / for a human
1. Activity tip claims were not checked against the simulation code. Examples: in distributive-property, "Make d negative and watch the bottom row turn red"; in solving-simple-inequalities, the "✓ and ✗ marks"; in the data-explorer tips, "drag it down to 6". They look plausible but I did not open src/.
2. proof-with-properties counterexample question: the accept list is still finite (2 plus odd primes up to 47). A student who enters 2,53 would be marked wrong. A short_text question can't fully fix this; consider rewording the prompt (for example, "use a prime less than 50").
3. simplifying-radicals cube-root question: the format guidance sits in a hint, not in the prompt, so a student who doesn't open hints won't know the cbrt() format. I left the structure as written.
4. comparing-two-means example: the P-value is given as "≈ 0.04". Python gives 0.036 (t = 2.20, df = 29), so the rounding is coarse but the conclusion is correct. Not changed.
5. confidence-intervals-mean tip: "Larger n → narrower (by a factor of √n)" is loose wording, since width is proportional to 1/√n. Not changed.
6. significance-tests-proportion application: "Election officials test whether a sample of audited ballots matches the reported vote share" is broadly true (risk-limiting audits) but simplified. Not changed.
