Checked 36 lessons; changed 3 lessons; 3 errors fixed.

I read every lesson in g08.txt in full. I recomputed the numbers in the worked examples and the num answers with Python or by hand, checked that each tolerance accepts the right value given the grader (default tolerance is exact, 1e-9), checked each mc answer index, and checked the activity params and claims against the code in src/components/sims/calculus.tsx (VolumeSim uses right-endpoint slices, AccumulationSim colors negative area orange, and the function definitions match).

## integration-division-completing-square
- The application callout said integrals of 1/(x²+a²) appear in electric field calculations "for a charged wire". That is wrong: the field of a straight charged wire gives a 1/(x²+a²)^{3/2} integrand. It now says "for a wide charged sheet". That case does give a 1/(x²+a²) integrand: summing line charges σ dx, the perpendicular component is 2kσ·a·dx/(x²+a²). The Cauchy distribution claim was correct and is unchanged.

## motion-with-integrals
- The application callout said "GPS and phone fitness apps" integrate acceleration to get velocity and then position. GPS measures position directly and does not integrate acceleration. It now says "Inertial navigation systems (in aircraft, and in phones when GPS drops out) combine sensor readings this way".

## accumulation-applied
- Q4's prompt defined P′(t) as "people per hour entering a park", but the keyed answer was "Net change in the number of people in the park". If P′ only counts people entering, its integral is the number who entered, not the net change. The prompt now reads "P(t) is the number of people in a park, and P′(t) is in people per hour", so the keyed answer (index 1) and the solution are correct. The choices are unchanged.

## Checks run
- `npm run -s content:check`: printed "Outlines: 24 courses, 219 units, 1156 planned lessons. Lesson sources: 634." with no errors.
- KaTeX check: it failed with ERR_MODULE_NOT_FOUND when run from /tmp, so I used the coordinator's fallback (a temporary copy in the project root, deleted afterwards): "checked 15499 math segments; 0 problems".

## Uncertain / for a human
1. modeling-differential-equations, Q2: the prompt dT/dt = −0.1(T − 25) never says t is in minutes, but the correct choice says "cooling at 5.5 °C per minute". The math is right; the units are assumed.
2. connecting-f-derivatives, application callout: "a recession starts when growth turns negative" simplifies the real definitions (NBER's judgment, or the two-quarters rule of thumb). Left unchanged.
3. sketching-slope-fields, application callout: wind and current maps are direction fields of 2D vector fields, not strictly slope fields of dy/dx = f(x, y), and a buoy follows the flow only if it is steady. Loosely true; left unchanged.
4. solving-optimization, application callout: says real cans are taller than h = 2r "because the top and bottom use thicker metal". This is the usual explanation, but seams, handling and shipping also matter. Left unchanged.
