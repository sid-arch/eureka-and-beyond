import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "metals-alloys",
  title: "Structure of metals and alloys",
  summary: "Explain metallic properties with the electron-sea model, and distinguish substitutional and interstitial alloys and their effects on properties.",
  minutes: 25,
  objectives: [
    "Use the electron-sea model to explain conductivity, malleability and luster.",
    "Distinguish substitutional and interstitial alloys.",
    "Predict how alloying changes hardness and malleability.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("Electron sea", r`Metal atoms release valence electrons into a shared, delocalized "sea" around a lattice of cations. Mobile electrons conduct heat and electricity; layers can slide without breaking bonds, so metals are malleable and ductile.`),
    def("Alloys", r`Substitutional alloys replace host atoms with similar-sized ones (brass: Zn in Cu). Interstitial alloys fit much smaller atoms into the gaps (steel: C in Fe). Either way, the different atoms disrupt the sliding of layers, so alloys are harder and less malleable than the pure metal.`),
    example(r`Why is steel harder than iron?`, [
      [r`\text{small C atoms fill gaps between Fe atoms}`, "Layers can't slide as easily, and the C–Fe interactions add strength."],
    ]),
    callout("application", "Where this shows up", r`Stainless steel (Cr and Ni added), bronze, solder, and gold jewelry alloyed with copper so it doesn't bend.`),
  ],
  questions: [
    mc(2, r`Brass (copper and zinc of similar size) is…`, ["interstitial", "substitutional", "ionic", "a compound"], 1, ["Similar-sized atoms can replace each other in the lattice; small atoms fit in the gaps."], r`Zn takes Cu's places.`),
    mc(2, r`Metals conduct electricity because…`, ["ions move", "valence electrons are delocalized", "they're polar", "of hydrogen bonding"], 1, ["What in a metal is free to move through the whole lattice?"], r`Electron sea.`),
    mc(2, r`Adding carbon to iron makes it…`, ["softer", "harder and less malleable", "a better conductor", "ionic"], 1, ["Small carbon atoms sit in the gaps between iron atoms. What does that do to layers sliding past each other?"], r`Interstitial atoms block slipping.`),
    mc(3, r`Which property is NOT explained by the electron-sea model?`, ["conductivity", "malleability", "luster", "brittleness"], 3, ["Three of these are typical metal properties. Which is not a metal property at all?"], r`Metals aren't brittle.`, "review"),
  ],
});
