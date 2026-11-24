# Accuracy review, November 2026

Every one of the 634 lessons was read in full and checked for accuracy. The lessons were split into 14 groups (`g01.txt`–`g14.txt`), each reviewed by a separate agent against the instructions in `PROMPT.md`. The checks covered:
- facts and definitions
- every worked-example step and numeric answer, recomputed in Python
- every multiple-choice answer key, and whether any other option was also correct
- tolerances, against the grader
- hints and solutions
- real-world claims

Each group's report (`gNN-report.md`) lists every fix, how it was verified, and the items left for a human.

## Totals

- **634 lessons checked; 62 errors fixed in 54 lessons** by the review agents.
- **14 further fixes**: 3 items flagged in g07, plus 11 of the "uncertain" items the agents left for a human. These were:
  - reflections: symmetry lines of an equilateral triangle
  - ratio-test: starting index of the series
  - calc-collisions: summary claimed a centre-of-mass frame topic the lesson doesn't cover
  - calc-connecting-linear-rotational: fishing-reel claim
  - calc-friction: ABS claim
  - naming-molecular-acids: sulfuric acid production claim
  - entropy-second-law: heat pumps
  - rc-circuits: pacemakers
  - finding-polynomial-zeros: "exact rational zeros"
  - indirect-proof: "in a plane"
  - lagrange-error-bound: "upper bound M" in the summary
- **Total: 76 corrections.** All have shipped to staging in migration 0032.

## What kinds of errors were found

- **Wrong numbers:**
  - a ring's on-axis field: 108 → 144 N/C
  - a polynomial graph's low point
  - two keys that rounded wrongly (35.7 → 35.8; 12.02 → 12.01)
  - a standard deviation: 9.4 → 9.5
- **Grading problems:**
  - multiple-choice questions where two options were correct
  - tolerances that rejected the correct answer or accepted a wrong one
  - format examples in prompts that were the answer itself
  - hints that gave the answer away
- **Physics, chemistry and maths statements:**
  - SHM phase: velocity *leads* position
  - thin-film phase shifts for oil on water
  - what −TΔS represents in ΔG = ΔH − TΔS
  - the ASA step in the AA-similarity proof
  - slicing a cone
  - "only regular polygons" in tiling
- **Real-world claims that were wrong or overstated:** GPS integrating acceleration, ramp grades and friction, the geostationary period, food calories, and others.

## Not done

The remaining "uncertain" items in the reports are judgment calls, mostly slightly loose real-world asides. A qualified teacher should still review the content. This review was thorough, but it was done by AI agents, not by an independent subject expert.
