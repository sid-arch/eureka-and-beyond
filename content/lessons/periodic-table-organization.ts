import { activity, callout, def, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "periodic-table-organization",
  title: "Organization of the periodic table",
  summary: "Read groups and periods, locate metals, nonmetals and metalloids, name the major families, and connect the table's blocks to electron configurations.",
  minutes: 25,
  objectives: [
    "Identify groups (columns) and periods (rows).",
    "Locate metals, nonmetals, metalloids and the major families.",
    "Relate the s, p, d and f blocks to electron configurations.",
  ],
  concepts: [
    { slug: "periodic-trends", name: "Periodic trends", description: "Regular patterns in atomic properties across periods and down groups.", subject: "subj_chem" },
  ],
  blocks: [
    def("Layout", r`Mendeleev ordered elements by mass and grouped similar ones, leaving gaps for undiscovered elements; the modern table orders by atomic number. Elements in a group share valence-electron counts and behave similarly; a period number tells the outermost energy level.`),
    def("Regions and families", r`Metals (left and center) are shiny, conductive and lose electrons. Nonmetals (upper right) gain or share electrons. Metalloids (B, Si, Ge, As, Sb, Te) lie along the staircase. Families: alkali metals (Group 1), alkaline earth metals (2), transition metals (3–12), halogens (17), noble gases (18).`),
    def("Blocks", r`The s-block (Groups 1–2), p-block (13–18), d-block (transition metals) and f-block (lanthanides and actinides) show which sublevel is being filled.`),
    activity("periodic-trends", { title: "Explore the main-group elements" }),
    callout("application", "Where this shows up", r`Silicon, a metalloid, became the basis of computer chips; noble gases' stability makes them useful in lighting and welding.`),
  ],
  questions: [
    mc(1, r`Elements in the same group have the same…`, ["mass", "number of valence electrons", "number of energy levels", "number of neutrons"], 1, [], r`That's why they react alike.`),
    mc(2, r`Which is a halogen?`, ["sodium", "neon", "bromine", "calcium"], 2, [], r`Group 17.`),
    num(2, r`In which period is potassium ([Ar] 4s¹)?`, 4, {}, [], r`Its outermost level is n = 4.`),
    mc(3, r`Which element is a metalloid?`, ["Al", "Si", "P", "Mg"], 1, [], r`On the staircase.`, "review"),
  ],
});
