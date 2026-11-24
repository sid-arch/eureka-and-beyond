import { activity, callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "surface-area-solids",
  title: "Surface area of prisms, cylinders, pyramids and cones",
  summary: "Use nets to find lateral and total surface areas of prisms, cylinders, pyramids, cones and spheres, using slant height for pyramids and cones.",
  minutes: 30,
  objectives: [
    "Use nets to explain surface area formulas.",
    "Find lateral and total surface area of prisms, cylinders, regular pyramids and cones.",
    "Find slant height with the Pythagorean theorem, and compute the surface area of a sphere.",
  ],
  concepts: [
    { slug: "surface-area", name: "Surface area", description: "The total area of all faces or curved surfaces of a solid.", subject: "subj_math" },
  ],
  formulas: ["pyramid-cone-sphere", "circle-area", "pythagorean-theorem"],
  blocks: [
    def("Surface area", r`The total area of all the surfaces of a solid. Lateral area leaves out the bases. A net, the solid unfolded flat, shows every face.`),
    text(r`Prism: $SA = 2B + Ph$ (two bases plus a rectangle with width the base perimeter $P$). Cylinder: $SA = 2\pi r^2 + 2\pi rh$ (the side unrolls into a rectangle $2\pi r$ wide). Regular pyramid: $SA = B + \frac{1}{2}P\ell$. Cone: $SA = \pi r^2 + \pi r\ell$, where $\ell$ is the slant height. Sphere: $SA = 4\pi r^2$.`),
    activity("area-volume", { title: "Prism and cylinder surface area", params: { shape: "cylinder" } }),
    example(r`Find the surface area of a cylinder with radius 3 cm and height 10 cm.`, [
      [r`2\pi(3)^2 + 2\pi(3)(10) = 18\pi + 60\pi = 78\pi`, ""],
      [r`\approx 245.04 \text{ cm}^2`, ""],
    ]),
    example(r`A square pyramid has base edge 10 and height 12. Find its surface area.`, [
      [r`\ell = \sqrt{12^2 + 5^2} = 13`, "Slant height: from the apex to the midpoint of a base edge."],
      [r`SA = 10^2 + \tfrac{1}{2}(40)(13) = 100 + 260 = 360`, ""],
    ]),
    example(r`A cone has radius 6 and height 8. Find its surface area.`, [
      [r`\ell = \sqrt{8^2 + 6^2} = 10`, ""],
      [r`SA = \pi(36) + \pi(6)(10) = 96\pi \approx 301.59`, ""],
    ]),
    callout("warning", "Height vs slant height", r`For pyramids and cones, surface area uses the slant height $\ell$ (along the face), while volume uses the perpendicular height $h$. They are related by the Pythagorean theorem.`),
    callout("application", "Where this shows up", r`Packaging design (how much cardboard a box needs), painting a silo, wrapping a gift and making a paper cone all depend on surface area.`),
  ],
  questions: [
    num(1, r`Find the surface area of a 3 by 4 by 5 rectangular prism.`, 94, {}, [r`$2(12 + 15 + 20)$.`], r`$2(47) = 94$.`),
    num(2, r`Find the surface area of a sphere with radius 5, to the nearest tenth.`, 314.2, { tolerance: 0.06 }, [r`$4\pi r^2$.`], r`$100\pi \approx 314.2$.`),
    num(2, r`A cone has radius 5 and slant height 13. Find its lateral area, to the nearest tenth.`, 204.2, { tolerance: 0.06 }, [r`$\pi r\ell$.`], r`$65\pi \approx 204.2$.`),
    num(2, r`A square pyramid has base edge 6 and slant height 5. Find its total surface area.`, 96, {}, [r`$36 + \frac{1}{2}(24)(5)$.`], r`$36 + 60 = 96$.`),
    num(3, r`A cylinder has radius 4 and total surface area $80\pi$. Find its height.`, 6, {}, [r`$32\pi + 8\pi h = 80\pi$.`], r`$8h = 48$, $h = 6$.`, "review"),
  ],
});
