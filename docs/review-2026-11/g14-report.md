Checked 56 lessons; changed 6 lessons; 6 errors fixed.

I read every lesson in g14.txt in full, header included. I recomputed every worked-example number and every num() answer with Python. I checked each mc() answer index and each tolerance against the grader in worker/lib/practice.ts, which allows `diff <= tol + 1e-12`. `npm run -s content:check` printed the Outlines line with no errors. The KaTeX check (run from the project dir, as the coordinator described) reported "checked 15503 math segments; 0 problems".

## phase-change-energy
- Q1 (melting 36.0 g of ice): the hint tells students to use 18.02 g/mol, which gives 36.0/18.02 × 6.01 = 12.007 kJ. But the key was 12.02 with tolerance 0.01, so it rejected that correct answer (and also 12.0). The key is now 12.01 with tolerance 0.02, which accepts 12.0, 12.01 and 12.02. The solution now reads "2.00 mol × 6.01 ≈ 12.0." Python: 36/18.02*6.01 = 12.0067.

## formal-charge
- Q3 hint: it said "Expanded octets need empty d orbitals nearby." Modern bonding theory rejects the d-orbital explanation (d orbitals contribute almost nothing). The hint now reads "Expanded octets are seen only for larger atoms, from period 3 on." Same position, and it still doesn't give the answer away.

## strong-acid-base-ph
- Application callout: it said a 10-fold dilution of a strong acid raises the pH "by exactly 1." That contradicts the lesson's own 1.0 × 10⁻⁸ M HCl example, where the pH is 6.98, not 8. It now says the pH rises "by 1, until it is so dilute that water's own ions matter."

## ph-and-pka
- Application callout: it said amino-acid charge switching "is how gel electrophoresis separates proteins." The most common protein gel (SDS-PAGE) separates by size, not by native charge. It now says this "lets electrophoresis separate proteins by charge."

## gibbs-free-energy
- Definition block: it said "The $-T\Delta S$ term accounts for the entropy change of the surroundings." That is backwards: ΔS in that term is the system's entropy, and the surroundings' entropy change comes from ΔH. It now says "The $\Delta H$ term accounts for the entropy change of the surroundings ($\Delta S_{surr} = -\Delta H/T$)." Checked against the identity ΔG = −TΔS_univ = ΔH − TΔS_sys.

## intro-entropy
- Application callout: it said ice melting, perfume spreading and gas expanding all "happen with no energy push." Ice melting is endothermic and absorbs heat from its surroundings. It now says they "all happen on their own."

## Numbers verified with no change needed (sample)
Mg average mass 24.305; B 10.811; Cl₂ peak ratio 9 : 6 : 1; NaCl/KCl mixture x = 5.68 g; vdW pressures 22.13 and 24.23 atm; 254 nm photons give 471 kJ/mol; 600 nm photons give 199.4 kJ/mol; Eₐ from doubling 298→308 K is 52.9 kJ/mol; k at 320 K is 0.0450; catalyst factors 2.41×10⁴ and 55.1; Al/water final T 27.7 °C; ice-to-steam total 55.0 kJ; ethanol ΔH° −1366.7; Kp 3.90; Ag₂CrO₄ s = 6.50×10⁻⁵; titration pH values 2.87 / 4.74 / 8.72 / 12.22; 5.35 at 20 mL (accepted within tolerance); 1.0×10⁻⁸ M HCl pH 6.978; Haber ΔG° −33.0, K 6.1×10⁵; E_cell 1.04 / 1.13 / 1.05 V; Faraday masses and times 1.19 g, 107 s, 2.01 g, 82.0 min. All mc answer indices are correct.

## Uncertain / for a human
1. multistep-energy-profile: the lesson and its Q3 say the rate-determining step is the one with the largest Eₐ measured from its own starting valley. That follows the usual AP convention. A more rigorous view (the highest transition state relative to the lowest preceding state) can disagree. I left it unchanged.
2. metals-alloys: "Either way… alloys are harder and less malleable than the pure metal." This is broadly true (brass is harder than copper), but the AP framework stresses reduced malleability mainly for interstitial alloys. I left it unchanged.
3. spectroscopy-em: "More than a C–C bond…, which is why UV sterilizes." Germicidal UV works mainly through photochemical DNA damage (thymine dimers), so this is a simplification.
4. magnitude-of-k: "Car engines produce NO only because the high temperature raises K." Faster kinetics at high temperature matter too, so "only" may be an overstatement.
5. common-ion-effect: "About 7000 times less than in pure water." Python gives 1.34×10⁻⁵ / 1.8×10⁻⁹ = 7450, so "about 7500" would be closer. Left as is.
6. ph-solubility: "tooth enamel (a hydroxide mineral)." Enamel is hydroxyapatite, a phosphate mineral that contains hydroxide, so the wording is loose.
7. enthalpy-of-formation: it defines the standard state as 25 °C and 1 atm. IUPAC now uses 1 bar, but AP uses 1 atm, so I left it.
8. buffer-properties: "Adding less than one equivalent of NaOH to a weak acid always produces a buffer." A very small amount of base gives too little A⁻ to buffer usefully, so "always" is a slight overstatement.
