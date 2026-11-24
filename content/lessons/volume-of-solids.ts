import { activity, callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "volume-of-solids",
  title: "Volume of prisms, cylinders, pyramids, cones and spheres",
  summary: "Use Cavalieri's principle and the volume formulas for prisms, cylinders, pyramids, cones and spheres, including composite solids and scaling.",
  minutes: 30,
  objectives: [
    "Explain V = Bh with Cavalieri's principle, including oblique solids.",
    "Find volumes of pyramids and cones (one third of the matching prism or cylinder) and spheres.",
    "Find volumes of composite solids and use k³ scaling for similar solids.",
  ],
  concepts: [
    { slug: "volume", name: "Volume", description: "The number of unit cubes needed to fill a solid.", subject: "subj_math" },
  ],
  formulas: ["prism-cylinder-volume", "pyramid-cone-sphere"],
  blocks: [
    def("Cavalieri's principle", r`If two solids have the same height and every horizontal cross-section has the same area, they have the same volume. That's why an oblique (slanted) prism or cylinder still has $V = Bh$, with $h$ the perpendicular height, like a stack of coins pushed sideways.`),
    text(r`A pyramid has exactly one third the volume of the prism with the same base and height: $V = \frac{1}{3}Bh$. Likewise a cone is $\frac{1}{3}\pi r^2 h$. (Fill a cone with water: it takes three cones to fill the matching cylinder.) A sphere has $V = \frac{4}{3}\pi r^3$, which is two thirds of the cylinder that just contains it, a result Archimedes was proudest of.`),
    activity("area-volume", { title: "Volume of a prism and a cylinder", params: { shape: "prism" } }),
    example(r`Find the volume of a cone with radius 3 and height 7.`, [
      [r`V = \tfrac{1}{3}\pi(9)(7) = 21\pi \approx 65.97`, ""],
    ]),
    example(r`Find the volume of a sphere with diameter 12.`, [
      [r`r = 6`, ""],
      [r`V = \tfrac{4}{3}\pi(216) = 288\pi \approx 904.78`, ""],
    ]),
    example(r`An ice cream cone (radius 3 cm, height 10 cm) is topped by a hemisphere of ice cream. Find the total volume.`, [
      [r`\text{cone} = \tfrac{1}{3}\pi(9)(10) = 30\pi`, ""],
      [r`\text{hemisphere} = \tfrac{1}{2} \cdot \tfrac{4}{3}\pi(27) = 18\pi`, ""],
      [r`48\pi \approx 150.80 \text{ cm}^3`, ""],
    ]),
    callout("warning", "Volume scales by k³", r`If two solids are similar with scale factor $k$, their volumes are in the ratio $k^3$. A model at scale 1 : 10 holds $\frac{1}{1000}$ as much.`),
    callout("application", "Where this shows up", r`Concrete for a column, grain in a conical pile, air in a basketball, and how much a funnel holds are volume problems.`),
  ],
  questions: [
    num(1, r`Find the volume of a square pyramid with base edge 6 and height 10.`, 120, {}, [r`$\frac{1}{3}(36)(10)$.`], r`$120$.`),
    num(2, r`Find the volume of a sphere with radius 3, to the nearest tenth.`, 113.1, { tolerance: 0.06 }, [r`$\frac{4}{3}\pi(27) = 36\pi$.`], r`$36\pi \approx 113.1$.`),
    num(2, r`A cone and a cylinder have the same radius and height. The cylinder holds 90 mL. How much does the cone hold?`, 30, { unit: "mL" }, [], r`One third: 30 mL.`),
    num(2, r`Two similar cylinders have heights 4 and 12. The smaller has volume 20. Find the larger volume.`, 540, {}, [r`$k = 3$, so multiply by $k^3$.`], r`$20 \cdot 27 = 540$.`),
    num(3, r`A cylinder of radius 2 and height 9 has a cone of the same base and height carved out of it. Find the remaining volume, to the nearest tenth.`, 75.4, { tolerance: 0.06 }, [r`Cylinder $36\pi$, cone $12\pi$.`], r`$24\pi \approx 75.4$.`, "review"),
  ],
});
