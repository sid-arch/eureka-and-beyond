import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "states-phase-diagrams",
  title: "Solids, liquids and gases",
  summary: "Compare the particle arrangements of solids, liquids and gases, explain vapor pressure and boiling, and read phase diagrams.",
  minutes: 35,
  objectives: [
    "Compare particle spacing, motion and order in the three states.",
    "Explain vapor pressure, and boiling as vapor pressure equal to external pressure.",
    "Read a phase diagram: triple point, critical point and phase boundaries.",
  ],
  concepts: [
    { slug: "kinetic-molecular-theory", name: "Kinetic molecular theory", description: "A model of gases as tiny particles in constant random motion with elastic collisions.", subject: "subj_chem" },
  ],
  blocks: [
    def("Particle view", r`Solids: particles in fixed positions, vibrating. Liquids: close together but able to slide past each other. Gases: far apart, moving freely. Stronger intermolecular forces keep substances condensed to higher temperatures.`),
    def("Vapor pressure", r`Molecules escape from a liquid's surface until evaporation and condensation balance; the pressure of that vapor is the vapor pressure, which rises with temperature and is lower when IMFs are stronger. A liquid boils when its vapor pressure equals the surrounding pressure: water boils at about 70 °C on Mount Everest.`),
    def("Phase diagrams", r`Pressure against temperature, with lines where two phases coexist. At the triple point all three coexist; beyond the critical point, liquid and gas become one supercritical fluid. Water's solid–liquid line slopes left, so pressure can melt ice. For CO₂, the triple point is above 1 atm, so dry ice sublimes.`),
    example(r`Reading a diagram: what happens to ice at −10 °C as pressure rises far enough?`, [
      [r`\text{cross the solid–liquid line}`, "It melts: unusual, because ice is less dense than water."],
    ]),
    callout("application", "Where this shows up", r`Pressure cookers raise the boiling point to cook faster; supercritical CO₂ decaffeinates coffee.`),
  ],
  questions: [
    mc(2, r`Which liquid has the highest vapor pressure at 25 °C?`, ["water", "ethanol", "diethyl ether", "glycerol"], 2, ["Vapor pressure is high when molecules escape easily, that is, when IMFs are weak.", "Which liquid can't hydrogen bond with itself?"], r`Weakest IMFs.`),
    mc(2, r`At high altitude, water boils at a lower temperature because…`, ["water is different there", "the outside pressure is lower", "IMFs are weaker", "the air is colder"], 1, ["A liquid boils when its vapor pressure equals the surrounding pressure."], r`Vapor pressure needs only to match a lower pressure.`),
    mc(2, r`At the triple point,…`, ["only gas exists", "solid, liquid and gas coexist", "the liquid is supercritical", "nothing boils"], 1, ["On a phase diagram, the triple point is where all three boundary lines meet."], r`Three phase lines meet.`),
    mc(3, r`Dry ice sublimes at 1 atm because CO₂'s triple point is…`, ["below 1 atm", "above 1 atm", "at 0 °C", "nonexistent"], 1, ["Liquid CO₂ can exist only at pressures above its triple point. How does 1 atm compare with that?"], r`Liquid CO₂ only exists above 5.1 atm.`, "review"),
  ],
});
