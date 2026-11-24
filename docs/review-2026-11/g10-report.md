Checked 49 lessons; changed 9 lessons; 10 errors fixed.

I read every lesson in g10.txt in full. I recomputed every worked-example number and every num() answer with Python, and checked tolerances against the grader in worker/lib/practice.ts (the default tolerance is exact, 1e-9). I checked the correct index of every mc() question. Most lessons had no errors.

## Fixes

### systems-center-of-mass
- Application callout said trucks tip when their center of mass moves "outside the wheelbase". The wheelbase is the front-to-rear axle distance, and tipping depends on the whole base of support. It now says "outside the base of support formed by their wheels". Verified against the standard tipping condition: the center of mass must lie over the support polygon.

### connecting-linear-rotational
- Application callout said hard drives are rated by the acceleration at their rim. Hard drives are rated by rpm. Removed "hard drives and"; centrifuges really are rated by rim acceleration (RCF, in g).

### conservation-angular-momentum
- Application callout said neutron stars "spin hundreds of times per second after collapsing". Newborn pulsars spin tens of times per second (the Crab spins about 30 times per second). Pulsars that spin hundreds of times per second got that fast later, by accretion, not by collapse. It now says "can spin dozens of times per second after collapsing".

### shm-graphs-analysis
- Said the velocity graph is a quarter-cycle *behind* the position graph. For x = A cos ωt, v = −Aω sin ωt = Aω cos(ωt + π/2), so velocity *leads* position. Changed "behind" to "ahead of". Verified: v reaches its positive maximum at ωt = 3π/2, a quarter-cycle before x peaks at 2π.

### internal-structure-density
- MC question 4 (index 3) asked which property separates liquids from gases "in the ideal-fluid model". The lesson's own definition says the ideal-fluid model treats every fluid as incompressible, so the intended answer, compressibility, contradicted the prompt. The prompt now reads "Which property best separates liquids from gases?" The choices and the answer (index 1, Compressibility) are unchanged.

### charging-processes
- Application callout said electroscopes "were the first instruments to detect radiation". Becquerel first detected radioactivity with photographic plates. It now says "were among the first instruments used to detect radiation".

### thin-film-interference (2 fixes in the same definition)
- The "Conditions" definition listed oil on water as a case where both or neither reflection is phase-shifted. For oil (n = 1.45) on water (n = 1.33), only the top reflection is shifted, which the lesson's own MC question 4 says correctly. Moved "oil on water" into the exactly-one-shift case.
- In the same definition, the both-or-neither case now lists only "a coating on glass" (1 < 1.38 < 1.5, so both reflections are shifted).

### mass-energy-equivalence
- Application callout said "nuclear reactors convert about 0.1% of their fuel's mass to energy". About 0.09% is true only of the uranium that actually fissions; reactor fuel is mostly U-238 and only a few percent of it fissions. It now says "fission converts about 0.1% of the mass of the uranium that splits into energy". Python: 200 MeV / (235 × 931.5 MeV) = 0.091%.

### atomic-nuclei
- "only over about 2 fm ($10^{-15}$ m)" read as if 2 fm = 10⁻¹⁵ m. It now reads "about 2 fm (1 fm $= 10^{-15}$ m)".

## Checks run
- `npm run -s content:check`: printed "Outlines: 24 courses, 219 units, 1156 planned lessons. Lesson sources: 634." with no errors.
- KaTeX check, run from the project root as the coordinator instructed: "checked 15503 math segments; 0 problems".

## Uncertain / for a human
1. entropy-second-law, application callout: "why heat pumps need electricity". Most heat pumps do, but absorption heat pumps run on heat. "Need an energy input" would be more exact. Left unchanged.
2. rc-circuits, application callout: says pacemakers and camera flashes are "timed by RC circuits". Historically true; modern pacemakers use crystal-oscillator and microcontroller timing. Left unchanged.
3. ideal-gas-law, walkthrough step titled "Avogadro's law" doubles n at constant V, so the pressure doubles. Avogadro's law is usually stated as V ∝ n at constant P and T. The step shows the equivalent fact, but the title may confuse students. Left unchanged.
4. kinetic-theory, thermal-conductivity, entropy-second-law, charging-processes, electric-potential-energy, electric-potential, capacitors, conservation-electric-energy, simple-circuits-emf, compound-circuits, kirchhoff-loop-rule, kirchhoff-junction-rule, rc-circuits, magnetic-systems, magnetic-permeability, magnetic-fields-moving-charges, magnetic-flux, law-of-reflection, snells-law-refraction, wave-pulses, boundary-behavior-polarization, diffraction-double-slit, thin-film-interference, wave-particle-duality, atomic-energy-levels, mass-energy-equivalence, atomic-nuclei, types-radioactive-decay, compton-scattering and fission-fusion: many practice questions have empty hints arrays. This is not an accuracy error, so I didn't change it, but students get no hints on these questions.
