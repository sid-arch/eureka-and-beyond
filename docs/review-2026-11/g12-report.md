Checked 35 lessons; changed 2 lessons; 2 errors fixed.

## em-continuous-distributions
- Ring example, step 3: the field on the axis (Q = 5 nC, R = 0.3 m, x = 0.4 m) was given as about 108 N/C. It is now about 144 N/C. Python: 8.99e9*5e-9*0.4/(0.25)**1.5 = 143.84.

## hess-law-formation
- Application callout: it said diet calories are "computed from formation-enthalpy tables". That is overstated, because food calories are measured with a calorimeter (bomb calorimetry and Atwater factors). It now reads: "Fuel energy ratings and rocket propellant design are computed from formation-enthalpy tables; food calories are combustion enthalpies too, measured by burning food in a calorimeter." Checked against general knowledge; no calculation involved.

## What was checked
Every lesson in g12.txt was read in full. I recomputed every worked-example number and every num() answer in Python, checked each tolerance against the exact value, and checked each mc() answer index. All of them were correct apart from the two fixes above. Some examples where only rounding was in question:
- em-coulomb-vectors: 0.0698 N at 21.9°.
- em-energy-conservation: r_min = 4.55e-14 m, and the proton speed is 5.87e5 m/s, which the 0.02 tolerance accepts.
- weak-acids-ka: the exact HF pH is 2.2596. For 0.010 M acetic acid, the exact percent ionization is 4.15% and the approximation gives 4.24%; the 0.1 tolerance accepts both.
- ice-tables: the quadratic gives x = 0.01902.

Checks: `npm run -s content:check` printed the Outlines line with no errors. The KaTeX check reported 0 problems. It could not find the katex package when run from /tmp, so I ran it from the project root as the coordinator said and then deleted the temporary copy.

## Uncertain / for a human
1. daltons-law-gas-stoichiometry: the example gives V ≈ 0.789 L. That matches the rounded values shown in the steps (0.0306 mol, 0.949 atm), but unrounded values give 0.7883 L, so 0.788 would be more exact. I left it as is.
2. weak-acids-ka callout: "aspirin's pKa decides where in your digestive tract it's absorbed" may be overstated. Most aspirin is absorbed in the small intestine because of its surface area, not only because of pKa.
3. em-capacitance-calculus callout: "Coaxial cables have a capacitance per meter that limits signal speed" is loose. Signal speed depends on both inductance and capacitance per meter (v = 1/√(L'C')), and capacitance mainly limits bandwidth.
4. em-current-density note: the field spreads "at nearly the speed of light". In real cables signals travel at about 0.5 to 0.99 c, so "a large fraction of" would be more precise.
5. em-conductors: the activity "Conductor vs insulator" uses distribution "shell". I did not confirm that the simulation can show an insulator, so I left it.
