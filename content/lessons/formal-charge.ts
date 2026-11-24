import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "formal-charge",
  title: "Resonance and formal charge",
  summary: "Compute formal charges to choose the best Lewis structure, draw resonance structures, and recognize expanded octets.",
  minutes: 40,
  objectives: [
    "Compute formal charge: FC = valence − nonbonding electrons − ½ bonding electrons.",
    "Choose the Lewis structure with formal charges closest to zero, negative charges on the more electronegative atoms.",
    "Draw resonance structures and recognize expanded octets in period-3 and later elements.",
  ],
  concepts: [
    { slug: "chemical-bonding", name: "Chemical bonding", description: "Ionic, covalent and metallic bonds and the shapes and polarity of molecules.", subject: "subj_chem" },
  ],
  blocks: [
    def("Formal charge", r`$FC = V - N - \frac{B}{2}$, where V is the number of valence electrons, N the nonbonding electrons on the atom, and B the bonding electrons around it. The formal charges add up to the ion's charge. The best structure has formal charges as close to zero as possible, with any negative charge on the more electronegative atom.`),
    example(r`Two structures for CO₂: O=C=O versus O≡C–O`, [
      [r`\text{O=C=O}:\ 0,\ 0,\ 0`, "Preferred."],
      [r`\text{O≡C–O}:\ +1,\ 0,\ -1`, "Charges separated: worse."],
    ]),
    def("Expanded octets", r`Atoms in period 3 or below (P, S, Cl, Xe) can hold more than 8 electrons: SF₆ has 12 around S, PCl₅ has 10. Sometimes that lowers formal charges, as in the sulfate ion.`),
    callout("application", "Where this shows up", r`Formal charge predicts reactive sites, such as which atom of the thiocyanate ion (SCN⁻) bonds to metal ions.`),
    activity("lewis-structures", { title: "Choosing the best structure", params: { molecule: "scn" } }),
    callout("tip", "Try this", r`Step through the three SCN⁻ structures. Which keeps the formal charges smallest, and where does the −1 end up? Then try N₂O.`, "experiment"),
  ],
  questions: [
    num(2, r`Find the formal charge on N in NH₄⁺.`, 1, {}, ["Formal charge = valence electrons − nonbonding electrons − ½(bonding electrons).", "N in NH₄⁺ has four bonds and no lone pairs."], r`$5 - 0 - \frac82$.`),
    num(2, r`Find the formal charge on the single-bonded O (three lone pairs) in NO₃⁻.`, -1, {}, ["Formal charge = valence electrons − nonbonding electrons − ½(bonding electrons).", "Count: O has 6 valence electrons, 3 lone pairs and one single bond."], r`$6 - 6 - 1$.`),
    mc(2, r`Which atom can have an expanded octet?`, ["C", "N", "O", "S"], 3, ["Expanded octets are seen only for larger atoms, from period 3 on."], r`Period 3.`),
    mc(3, r`In the best Lewis structure, negative formal charge should be on…`, ["the least electronegative atom", "the most electronegative atom", "the central atom", "hydrogen"], 1, ["Which kind of atom is best at holding extra electron density?"], r`It can best hold extra electron density.`, "review"),
  ],
});
