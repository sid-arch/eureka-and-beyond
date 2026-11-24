import { activity, callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "periodic-trends",
  title: "Periodic trends",
  summary: "Explain trends in atomic radius, ionization energy and electronegativity using nuclear charge, shielding and energy levels.",
  minutes: 35,
  objectives: [
    "Describe how atomic radius, first ionization energy and electronegativity change across a period and down a group.",
    "Explain the trends using effective nuclear charge and electron shells.",
    "Recognize common exceptions in ionization energy.",
  ],
  concepts: [
    { slug: "periodic-trends", name: "Periodic trends", description: "Regular patterns in atomic properties across periods and down groups.", subject: "subj_chem" },
    { slug: "effective-nuclear-charge", name: "Effective nuclear charge", description: "The net positive charge felt by an electron after shielding by other electrons.", subject: "subj_chem" },
  ],
  blocks: [
    text(r`The periodic table is organized so that elements with similar outer-electron arrangements line up in columns. Because properties depend on those outer electrons, they change in predictable ways as you move across a row (period) or down a column (group).`),
    def("Effective nuclear charge", r`The net positive charge an outer electron actually feels: the nuclear charge minus the shielding by inner electrons. It increases across a period because protons are added while the number of inner-shell electrons stays the same.`),
    text(r`Across a period, effective nuclear charge rises and electrons are added to the same main energy level. The nucleus pulls them closer, so atomic radius decreases. Down a group, each step adds a new energy level farther from the nucleus, and inner electrons shield the outer ones, so radius increases.`),
    def("First ionization energy", r`The energy needed to remove the outermost electron from a gaseous atom. It generally increases across a period and decreases down a group: the opposite of atomic radius, since closer electrons are held more tightly.`),
    def("Electronegativity", r`A measure of how strongly an atom attracts shared electrons in a bond (Pauling scale). Fluorine is the most electronegative element at 3.98. Electronegativity increases across a period and decreases down a group; noble gases are usually left out because they rarely form bonds.`),
    example(r`Rank Na, Mg and K by atomic radius`, [
      [r`\text{Na, Mg: period 3;\ K: period 4}`, "K has an extra energy level."],
      [r`\text{Mg} < \text{Na}`, "Across period 3, Mg has more protons pulling the same shell inward."],
      [r`\text{Mg} < \text{Na} < \text{K}`, "Smallest to largest."],
    ]),
    callout("warning", "Exceptions in ionization energy", r`First ionization energy dips from Be to B and from N to O. Boron's outer electron is in a 2p orbital, slightly higher in energy than 2s. In oxygen, one 2p orbital holds a pair of electrons that repel each other, making one easier to remove.`),
    callout("application", "Why it matters", r`Trends predict reactivity: cesium, with a large radius and low ionization energy, reacts violently with water; fluorine, small and highly electronegative, is the most reactive nonmetal. Electronegativity differences predict whether bonds are ionic, polar covalent or nonpolar.`),
    activity("periodic-trends", { title: "Color the table by property", params: { property: "radius" } }),
    callout("tip", "Investigate", r`Switch between atomic radius and ionization energy. Which element has the largest radius among those shown? Find both ionization-energy dips in period 2 and in period 3.`, "experiment"),
  ],
  questions: [
    mc(1, r`Which atom has the largest atomic radius?`, ["Li", "Na", "K", "Rb"], 3, ["Moving down a group adds energy levels."], r`Rb is lowest in group 1, so it has the most occupied energy levels.`),
    mc(1, r`Which element has the highest electronegativity?`, ["O", "F", "Cl", "N"], 1, ["It's at the top right, excluding noble gases."], r`Fluorine has the highest electronegativity of all elements (3.98).`),
    mc(2, r`Why does atomic radius decrease from Na to Cl?`, [
      "Electrons are added to new energy levels.",
      "Effective nuclear charge increases while electrons fill the same level.",
      "Shielding increases strongly across the period.",
      "Atoms lose electrons across the period.",
    ], 1, ["What changes in the nucleus, and what stays the same in the electron shells?"], r`Protons are added across the period, but the new electrons enter the same third shell and shield each other poorly, so the outer electrons are pulled closer.`),
    mc(2, r`Which has the larger first ionization energy: N or O?`, ["N", "O", "They are equal", "Cannot be determined"], 0,
      ["Look for an exception to the general trend."], r`N. Oxygen's paired 2p electrons repel each other, so removing one takes less energy, an exception to the increasing trend.`),
    mc(3, r`Arrange Mg, S and Ba in order of increasing first ionization energy.`, ["Ba < Mg < S", "S < Mg < Ba", "Mg < Ba < S", "Ba < S < Mg"], 0,
      ["Ba is far down the table; S is far right in period 3."], r`Ba is lowest (large radius); within period 3, S is to the right of Mg and holds its electrons more tightly.`, "review"),
  ],
});
