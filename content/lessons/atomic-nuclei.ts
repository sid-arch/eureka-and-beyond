import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "atomic-nuclei",
  title: "Properties of atomic nuclei",
  summary: "Describe nuclear composition with A, Z and N, explain isotopes and the strong force, and estimate nuclear size and density.",
  minutes: 30,
  objectives: [
    "Use nuclear notation to find protons, neutrons and nucleons.",
    "Describe isotopes and the strong nuclear force that binds nucleons.",
    "Estimate nuclear radius R ≈ (1.2 fm)A^(1/3), and explain why nuclear density is nearly constant.",
  ],
  concepts: [
    { slug: "modern-physics", name: "Modern physics", description: "Quantum and nuclear phenomena: photons, atoms and radioactivity.", subject: "subj_phys" },
  ],
  blocks: [
    def("Notation", r`$^A_Z\text{X}$: $Z$ is the atomic number (protons, which identify the element), $A$ the mass number (protons + neutrons), and $N = A - Z$ the number of neutrons. Isotopes share $Z$ but differ in $N$: carbon-12 and carbon-14 both have 6 protons.`),
    def("The strong force", r`Protons repel each other electrically, yet nuclei hold together because of the strong nuclear force: it attracts nucleons very strongly but only over about 2 fm (1 fm $= 10^{-15}$ m). Heavy nuclei need extra neutrons, which add strong attraction without adding repulsion; past lead, no nucleus is truly stable.`),
    def("Size", r`$R \approx (1.2\ \text{fm})A^{1/3}$, so volume is proportional to $A$, and every nucleus has about the same enormous density, $2\times10^{17}$ kg/m³.`),
    example(r`Uranium-238 and aluminum-27`, [
      [r`N_U = 238 - 92 = 146\ \text{neutrons}`, ""],
      [r`R_{Al} = 1.2(27)^{1/3} = 3.6\ \text{fm}`, ""],
    ]),
    callout("application", "Where this shows up", r`Isotopes power carbon dating, medical imaging and nuclear energy; neutron stars are essentially giant nuclei at nuclear density.`),
  ],
  questions: [
    num(1, r`How many neutrons are in iron-56 (Z = 26)?`, 30, {}, [], r`$56 - 26$.`),
    num(2, r`Estimate the radius of a lead-208 nucleus in fm, to one decimal place.`, 7.1, { tolerance: 0.05, unit: "fm" }, [], r`$1.2(208)^{1/3} \approx 7.1$.`),
    mc(2, r`Carbon-12 and carbon-14 differ in their number of…`, ["protons", "electrons", "neutrons", "charge"], 2, [], r`Same element, same Z.`),
    mc(3, r`The strong force acts…`, ["only between protons", "between all nucleons over very short distances", "at any distance", "only on electrons"], 1, [], r`About 2 fm range.`, "review"),
  ],
});
