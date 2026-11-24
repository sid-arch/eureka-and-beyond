import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "mass-spectroscopy",
  title: "Mass spectroscopy of elements",
  summary: "Read mass spectra of elements, connect peak positions and heights to isotope masses and abundances, and compute average atomic mass.",
  minutes: 30,
  objectives: [
    "Explain how a mass spectrometer separates ions by mass.",
    "Read isotope masses and relative abundances from a spectrum.",
    "Compute the average atomic mass, and interpret spectra of diatomic elements.",
  ],
  concepts: [
    { slug: "atomic-structure", name: "Atomic structure", description: "The particles inside atoms and how electrons are arranged.", subject: "subj_chem" },
  ],
  blocks: [
    def("The instrument", r`Atoms are ionized, accelerated and deflected by a magnetic field; lighter ions bend more. The spectrum plots relative abundance (peak height) against mass-to-charge ratio, giving one peak per isotope.`),
    example(r`Magnesium: peaks at 23.985 (78.99%), 24.986 (10.00%) and 25.983 u (11.01%)`, [
      [r`\bar m = 0.7899(23.985) + 0.1000(24.986)`, ""],
      [r`\quad + 0.1101(25.983)`, ""],
      [r`\bar m \approx 24.31\ \text{u}`, "Matches the periodic table."],
    ]),
    def("Diatomic elements", r`Bromine is about 50% Br-79 and 50% Br-81, so Br₂ shows three molecular peaks at 158, 160 and 162 in a 1 : 2 : 1 ratio (79+79, 79+81 or 81+79, 81+81).`),
    callout("application", "Where this shows up", r`Mass spectrometry identifies drugs in blood, detects explosives at airports and measures isotope ratios for dating rocks.`),
  ],
  questions: [
    num(2, r`An element has isotopes at 10.013 u (19.9%) and 11.009 u (80.1%). Find its average atomic mass, to two decimal places.`, 10.81, { tolerance: 0.01, unit: "u" }, ["Multiply each isotope's mass by its fractional abundance (19.9% = 0.199), then add."], r`Boron.`),
    mc(2, r`A mass spectrum shows two peaks of equal height at 79 and 81. The element is likely…`, ["Cl", "Br", "Cu", "Se"], 1, ["Two equally tall peaks mean two isotopes in about a 1 : 1 ratio.", "Which element's average atomic mass sits halfway between 79 and 81?"], r`Average about 80.`),
    mc(2, r`What does peak height represent?`, ["mass", "relative abundance", "charge", "energy"], 1, ["The x-axis already gives mass. What does the height of a peak count?"], r`How many ions have that mass.`),
    mc(3, r`Chlorine is about 75% Cl-35 and 25% Cl-37. The Cl₂ peaks at 70, 72 and 74 have a ratio of about…`, ["1 : 1 : 1", "9 : 6 : 1", "3 : 1 : 0", "1 : 2 : 1"], 1, ["Each Cl atom in Cl₂ is independently ³⁵Cl (0.75) or ³⁷Cl (0.25).", "Mass 72 can happen two ways: 35 + 37 or 37 + 35."], r`$0.75^2 : 2(0.75)(0.25) : 0.25^2$.`, "review"),
  ],
});
