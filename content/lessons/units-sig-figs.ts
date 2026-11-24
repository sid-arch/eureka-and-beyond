import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "units-sig-figs",
  title: "Units, measurement and significant figures",
  summary: "Use SI base units and prefixes, convert units with conversion factors, and report results with a sensible number of significant figures.",
  minutes: 25,
  objectives: [
    "Name the SI base units for length, mass and time, and use metric prefixes.",
    "Convert units by multiplying by conversion factors equal to 1.",
    "Count significant figures and round calculated results appropriately.",
  ],
  concepts: [
    { slug: "measurement", name: "Measurement and units", description: "Expressing physical quantities with SI units, prefixes and appropriate precision.", subject: "subj_phys" },
  ],
  blocks: [
    def("SI units", r`Length: meter (m). Mass: kilogram (kg). Time: second (s). Prefixes scale by powers of ten: kilo ($10^3$), centi ($10^{-2}$), milli ($10^{-3}$), micro ($10^{-6}$), nano ($10^{-9}$).`),
    example(r`Convert 72 km/h to m/s`, [
      [r`72\,\tfrac{\text{km}}{\text{h}} \times \tfrac{1000\ \text{m}}{1\ \text{km}} \times \tfrac{1\ \text{h}}{3600\ \text{s}}`, "Each factor equals 1; units cancel."],
      [r`= 20\ \text{m/s}`, ""],
    ]),
    def("Significant figures", r`Nonzero digits count; zeros between them count; leading zeros don't; trailing zeros after a decimal point do. Multiply or divide: keep the fewest significant figures of the inputs. Add or subtract: keep the fewest decimal places.`),
    example(r`$2.5 \times 3.42$`, [
      [r`8.55 \to 8.6`, "2.5 has two significant figures, so the answer gets two."],
    ]),
    callout("application", "Where this shows up", r`In 1999 NASA lost the Mars Climate Orbiter because one team used pound-seconds and another newton-seconds. Writing units at every step catches such errors.`),
  ],
  questions: [
    num(1, r`Convert 90 km/h to m/s.`, 25, { unit: "m/s" }, [], r`$90 \times \frac{1000}{3600} = 25$.`),
    mc(1, r`How many significant figures are in 0.00450?`, ["2", "3", "5", "6"], 1, [], r`Leading zeros don't count; the trailing zero after the decimal does: 4, 5, 0.`),
    num(2, r`Convert 2.5 mm to meters.`, 0.0025, { tolerance: 0.00001, unit: "m" }, [], r`$2.5 \times 10^{-3}$ m.`),
    mc(3, r`Report $12.11 + 0.3$ correctly.`, ["12.41", "12.4", "12", "12.410"], 1, [], r`Fewest decimal places: one.`, "review"),
  ],
});
