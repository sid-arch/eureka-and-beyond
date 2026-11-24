Checked 53 lessons; changed 3 lessons; 3 errors fixed.

All 53 lessons in g02.txt were read in full. Worked-example and numeric answers were recomputed (Python for the exponential, quadratic, statistics and trig values; simple integer arithmetic checked by hand). Every mc correct index was checked against its options.

## properties-real-numbers
- The application callout said floating-point non-associativity is "why programmers sometimes get 0.30000000000000004". That result (0.1 + 0.2) comes from rounding in binary representation, not from associativity. It now says floating-point arithmetic rounds every result, so it is not perfectly associative, and that rounding is why 0.1 + 0.2 can give 0.30000000000000004. Verified: Python `0.1+0.2` = 0.30000000000000004.

## measures-center-spread
- Team comparison example: sigma_B was given as ≈ 9.4. It is now ≈ 9.5. Verified: Python `statistics.pstdev([10,18,24,31,37])` = 9.4868. (sigma_A ≈ 3.4 is correct: 3.4059.)

## quadratic-functions-vertex-form
- Walkthrough step 4 ("Flip and stretch") changes k from −3 to 3 (params a: −2, h: 2, k: 3), but its text mentioned only a. Students could think flipping moves the vertex. The text now also says k = 3 moves the vertex up to (2, 3). Verified by comparing the step 3 and step 4 params.

## Checks
- `npm run -s content:check`: printed "Outlines: 24 courses, 219 units, 1156 planned lessons. Lesson sources: 634." with no errors.
- KaTeX check: run from /tmp it failed with ERR_MODULE_NOT_FOUND, so I used the coordinator's workaround (temporary copy in the project root, deleted afterwards): "checked 15503 math segments; 0 problems".

## Uncertain / for a human
1. comparing-linear-exponential, salary example: B(5) ≈ 48,176 is rounded to the dollar, but B(10) ≈ 64,470, B(11) ≈ 68,340 and B(12) ≈ 72,440 are rounded to the nearest 10. The exact values are 64,470.52, 68,338.75 and 72,439.07. Not wrong with ≈, but inconsistent. Left unchanged.
2. indirect-proof, "Negate carefully" callout: "not parallel ... (they intersect)" is true only for coplanar lines (skew lines in space). The related question's solution says "In a plane"; the callout doesn't. Left unchanged.
3. scatter-plots-lines-of-fit: "Only a controlled experiment can show that one variable causes changes in another" is the standard intro-stats wording but a slight overstatement. Left unchanged.
4. relations-and-functions: the example title "Is $x = y^2$ a function of $x$?" is loose wording for "is y a function of x". The lesson's meaning is clear from context. Left unchanged.
5. Several "Try this" callouts depend on how the simulations behave, which I did not check against the simulation source: measures-center-spread ("drag the highest score to 20" with the quiz dataset), box-plots-histograms (bin width 1 to 4, sleep dataset), solving-linear-inequalities (setting a test value), and parallel-perpendicular-lines (the "never meet" readout).
6. The default tolerance for num questions that set no tolerance comes from the grader, not lib.ts. I assumed exact or near-exact matching. All such answers in these lessons are exact integers or short decimals (e.g. 0.125, 6.25, 0.4).
