Checked 49 lessons; changed 5 lessons; 5 errors fixed.

I read every lesson in g09.txt in full. I recomputed every worked-example number and every num() answer in one Python run, and checked tolerances and mc answer indices by hand. No numeric, answer-key or tolerance errors turned up. All five fixes are real-world claims in callouts or definitions that were wrong or overstated.

## forces-on-inclines
- Application callout said wheelchair ramp codes, road grades and avalanche angles "all come down to tan θ compared with a friction coefficient". That is wrong for ramps and road grades: their limits are set by the climbing force mg sin θ, not by friction. The avalanche claim was overstated, since snowpack layering matters. It now says ramps and road grades are kept gentle because of the climbing force mg sin θ, and that whether a parked car, crate or loose gravel stays put depends on tan θ compared with μs. Verified from the physics: the climbing force along a slope is mg sin θ.

## friction-forces
- Application callout said anti-lock brakes simply shorten stopping distances. That is overstated: ABS mainly keeps steering control, and on loose gravel or snow it can make stops longer. It now says ABS keeps steering control and "usually" shortens stopping distances on paved roads.

## gravitation-orbits
- Application callout said the geostationary period is 24 hours. The period actually matches Earth's rotation, one sidereal day (about 23 h 56 min). Changed to that wording.

## properties-of-waves
- The Waves definition gave light as an example of a transverse wave in which "the medium moves" perpendicular to the travel, but light has no medium. The example is now "a wave on a string", with a note that light is also transverse but needs no medium.

## reflection-mirrors
- Application callout said "Car side mirrors are convex". That is not universal: US driver-side mirrors are flat. Changed to "Many car side mirrors are convex".

## Checks
- `npm run -s content:check` printed: "Outlines: 24 courses, 219 units, 1156 planned lessons. Lesson sources: 634." with no errors.
- KaTeX check: "checked 15503 math segments; 0 problems". From /tmp it could not find the katex package. Instead of using the suggested temp file in the project, I ran it from /tmp/kc-g09 with a symlink to the project's node_modules, so no project file was created.
- Activity sims I looked at: the half-life sim uses N0 = 400, which matches the "about 200, 100, 50" tip. The buoyancy sim's glycerin is 1260 kg/m³, which matches the "float again" tip.

## Uncertain / for a human
1. fluid-flow-bernoulli: the application callout credits Bernoulli with the shower curtain being drawn inward. The real cause is debated (a vortex in the spray and convection are other explanations). Left as is.
2. temperature-thermal-energy: "Thermostats use bimetallic strips". This is true of mechanical thermostats, but many modern ones are electronic. You could change it to "Many older thermostats". Left as is.
3. connected-objects-pulleys: "the motor only supplies the difference in weights" for elevator counterweights is a simplification, because the motor also supplies the force to accelerate the masses and overcome friction. Left as is.
4. electric-fields: the car-in-lightning shielding is explained as "field inside a conductor is zero". This is the standard textbook Faraday-cage explanation; the fuller story is that the current flows around the metal shell. Left as is.
