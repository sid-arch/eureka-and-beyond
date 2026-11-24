Checked 37 lessons; changed 2 lessons; 2 errors fixed.

I read all 37 lessons in g07.txt in full: every definition, example step, callout, activity title and question. I recomputed the non-trivial numeric results with Python and worked the simple integer ones by hand. Every num tolerance was checked against the exact value. The default tolerance when none is set is 1e-9 (worker/lib/practice.ts), and every answer without a tolerance is an exact integer. For each mc question I checked the option at the stated correct index and confirmed no other option is also right. Activity titles and tips that refer to the derivative-graph sim match its functions (cubic = x^3 - 3x, quartic = x^4/4 - x^2, from src/components/sims/calculus.tsx).

## limits-at-infinity
- Question 3 (num, position 3): the prompt wrote the limit as x -> infinity but the expression used t, with the note "(with $t$ in place of $x$)". The limit variable didn't match the expression. It now reads "Find $\lim_{t \to \infty} \dfrac{100t}{t + 5}$." The answer (100), solution and tolerance are unchanged. Verified: 100/(1 + 5/t) -> 100.

## concavity-inflection
- The application callout said "An epidemic's case curve has an inflection point where new cases per day peak: concave up before, concave down after." That is only true of the cumulative case curve. A curve of daily cases peaks there instead of having an inflection point. It now says "An epidemic's cumulative case curve has...". Verified by reasoning: if C(t) is cumulative cases, then C' is daily new cases. C' peaks where C'' changes from + to -, which is the inflection point of C.

## Selected Python checks (no change needed)
- 8/(9π) = 0.28294; 2/π = 0.63662 (tolerance 0.002 accepts 0.637); 18π = 56.5487 (tolerance 0.02 accepts 56.55)
- 1.02^10 = 1.21899 (solution says ≈ 1.219); √26 = 5.09902; √2 = 1.41421 (accepts 1.414); 1/√3 = 0.57735 (accepts 0.577)
- 100e = 271.83 (≈ 272); 2/√3 = 1.1547; (16·2.1² − 64)/0.1 = 65.6
- 1/6 against 0.1667 with tolerance 0.0001 passes; 1/12 against 0.0833 passes; 1/3 against 0.333 with tolerance 0.001 passes; 2/3 against 0.667 passes; 4/3 against 1.333 with tolerance 0.002 passes.

## Checks run
- `npm run -s content:check`: printed "Outlines: 24 courses, 219 units, 1156 planned lessons. Lesson sources: 634." with no errors.
- KaTeX check: "checked 15496 math segments; 0 problems". Copied to /tmp/kc-g07.mjs, as written in PROMPT.md, the script failed with ERR_MODULE_NOT_FOUND for 'katex', because Node can't find the project's node_modules from /tmp. So I ran the same script from /tmp/kcg07/ with a symlink to the project's node_modules. No project files were touched.

## Uncertain / for a human
1. trig-derivatives-tan-sec: the definition titled "All six" lists only four derivatives (tan, cot, sec, csc), with sin and cos taken as known from earlier lessons. It isn't wrong, but the title may confuse students. I left it unchanged.
2. straight-line-motion, question 3 (mc, speeding up or slowing down at t = 2.5): the hint gives the signs of v(2.5) and a(2.5). With the rule in the lesson, that nearly gives the answer away. I left it unchanged.
3. mean-value-theorem: the callout says average-speed cameras "rely on the MVT". That is the usual teaching framing, but enforcement doesn't actually invoke the theorem. It may be a slight overstatement; I left it unchanged.
