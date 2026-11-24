Checked 32 lessons; changed 3 lessons; 4 errors fixed.

I read all 32 lessons in g13.txt in full. I recomputed every worked-example number and every num() answer with Python. I checked each mc answer index, the tolerances (the default is exact, 1e-9 absolute, from worker/lib/practice.ts), and the activity titles and "Try this" tips against the sim sources in src/components/sims.

## mole-ratio-stoichiometry
- Q2 (grams of water from 4.00 g H2, "one decimal place"): the answer was 35.7, but the correct value rounds to 35.8. The answer is now 35.8 and the tolerance stays at 0.1. Python: 4.00/2.016*18.02 = 35.75 (35.74 using 18.015); 36.0 is still rejected.

## mole-molar-mass
- Q3 (moles in 100. g CaCO3, three decimal places): a tolerance of 0.001 accepted 1.000, the plausible wrong answer from rounding the molar mass to 100. The tolerance is now 0.0005. Python: 100/100.09 = 0.99910, which is still accepted; 1.000 is now rejected.
- Application callout: it said a teaspoon of water holds "more molecules than there are stars in the observable universe". That overstates it. A teaspoon (about 5 g) holds about 1.7e23 molecules (Python: 5/18.02*6.022e23), and star-count estimates run from about 1e22 to 1e24. It now says "roughly as many molecules as there are stars".

## atomic-theory
- Particles definition: it gave the electron's mass as "about 1/1836 u". 1/1836 is the electron's mass relative to the proton; in atomic mass units it is 1/1823 u (0.000549 u). It now says "about 1/1836 of a proton's mass".

## Checks run
- `npm run -s content:check`: printed the Outlines line with no errors.
- KaTeX check: the /tmp copy could not find the katex package, so I used the coordinator's workaround (a temp copy in the project root, deleted afterwards). Result: "checked 15503 math segments; 0 problems".

## Uncertain / for a human
1. naming-molecular-acids callout: "sulfuric acid is the most-produced industrial chemical in the world". Textbooks commonly say this and it is probably true by mass for inorganic chemicals, but it depends on how "chemical" is defined. "One of the most-produced" would be safer. I left it unchanged.
2. chem-measurement: "1200 has 2" significant figures follows the usual school rule, but strictly the count is ambiguous without a decimal point or scientific notation. I left it unchanged.
3. limiting-reactant Q4 hint, "3.0 mol H₂ uses 1.5 mol O₂.": it gives the main intermediate step, so only the subtraction 2.0 − 1.5 is left. It doesn't state the answer, but it comes close. I left it unchanged.
