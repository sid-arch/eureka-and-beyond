import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "volume-prisms-cylinders",
  title: "Volume of prisms and cylinders",
  summary: "Find the volume of prisms and cylinders as base area times height, find surface area, and solve for a missing dimension.",
  minutes: 25,
  objectives: [
    "Explain volume as layers of unit cubes and use V = Bh.",
    "Find the volume and surface area of rectangular prisms, triangular prisms and cylinders.",
    "Solve for a missing dimension and convert between capacity units.",
  ],
  concepts: [
    { slug: "volume", name: "Volume", description: "The number of unit cubes needed to fill a solid.", subject: "subj_math" },
  ],
  formulas: ["prism-cylinder-volume", "circle-area"],
  blocks: [
    def("Volume", r`The amount of space a solid occupies, measured in cubic units such as cm³ or ft³.`),
    text(r`A prism has two identical parallel bases joined by flat sides. Fill the bottom with one layer of unit cubes: the number of cubes in the layer equals the base area $B$. Stack $h$ layers to reach the top, and the volume is $V = Bh$. A cylinder works the same way with a circular base, so $V = \pi r^2 h$.`),
    activity("area-volume", { title: "Volume of a prism", params: { shape: "prism" } }),
    callout("tip", "Try this", r`Double the height of the prism. What happens to the volume? Now double the width instead. Then switch to the cylinder and double the radius. Why does that change the volume more?`, "experiment"),
    example(r`A rectangular prism is 8 cm long, 5 cm wide and 3 cm tall. Find its volume and surface area.`, [
      [r`V = 8 \cdot 5 \cdot 3 = 120 \text{ cm}^3`, "Base area 40 times height 3."],
      [r`S = 2(8 \cdot 5) + 2(8 \cdot 3) + 2(5 \cdot 3)`, "Surface area: six faces in three matching pairs."],
      [r`S = 80 + 48 + 30 = 158 \text{ cm}^2`, ""],
    ]),
    example(r`A triangular prism has a right-triangle base with legs 6 in and 8 in, and the prism is 10 in long. Find its volume.`, [
      [r`B = \tfrac{1}{2}(6)(8) = 24 \text{ in}^2`, "The base is the triangle."],
      [r`V = Bh = 24 \cdot 10 = 240 \text{ in}^3`, "The 'height' of the prism is its length between the triangles."],
    ]),
    example(r`A cylindrical can has radius 4 cm and height 12 cm. Find its volume and how many milliliters it holds.`, [
      [r`V = \pi(4)^2(12) = 192\pi \approx 603.19 \text{ cm}^3`, ""],
      [r`1 \text{ cm}^3 = 1 \text{ mL} \Rightarrow \approx 603 \text{ mL}`, "Metric volume and capacity line up neatly."],
    ]),
    example(r`A cylinder has volume $500\pi$ m³ and radius 5 m. Find its height.`, [
      [r`500\pi = \pi(5)^2 h = 25\pi h`, ""],
      [r`h = 500\pi \div 25\pi = 20 \text{ m}`, "Divide both sides by 25π."],
    ]),
    callout("warning", "Square units vs cubic units", r`Surface area covers the outside and is measured in square units. Volume fills the inside and is measured in cubic units. Doubling every dimension multiplies surface area by 4 and volume by 8.`),
    callout("application", "Where this shows up", r`Shipping boxes, fish tanks (1 L = 1000 cm³), concrete for a patio (ordered in cubic yards), water tanks and soda cans all use these formulas.`),
  ],
  questions: [
    num(1, r`Find the volume of a box 6 in by 4 in by 10 in.`, 240, { unit: "in³" }, ["Multiply the three dimensions."], r`$6 \cdot 4 \cdot 10 = 240$ in³.`),
    num(1, r`A prism has base area 18 cm² and height 7 cm. What is its volume?`, 126, { unit: "cm³" }, [r`$V = Bh$.`], r`$18 \cdot 7 = 126$ cm³.`),
    num(2, r`Find the volume of a cylinder with radius 3 ft and height 5 ft. Round to the nearest hundredth.`, 141.37, { unit: "ft³", tolerance: 0.01 }, [r`$\pi(3)^2(5) = 45\pi$.`], r`$45\pi \approx 141.37$ ft³.`),
    num(2, r`Find the surface area of a cube with edge 5 m.`, 150, { unit: "m²" }, ["A cube has six square faces."], r`$6 \cdot 5^2 = 150$ m².`),
    num(2, r`A fish tank is 60 cm long, 30 cm wide and 40 cm tall. How many liters does it hold? (1 L = 1000 cm³)`, 72, { unit: "L" }, ["Find the volume in cm³ first."], r`$60 \cdot 30 \cdot 40 = 72{,}000$ cm³ $= 72$ L.`),
    num(3, r`A rectangular prism has volume 336 cm³, length 8 cm and width 6 cm. What is its height?`, 7, { unit: "cm" }, [r`$336 = 8 \cdot 6 \cdot h$.`], r`$48h = 336$, so $h = 7$ cm.`),
    mc(3, r`Cylinder A has radius 2 and height 6. Cylinder B has radius 3 and height 3. Which holds more?`, ["A", "B", "They are equal", "Not enough information"], 1,
      [r`Compute $\pi r^2 h$ for each.`], r`A: $\pi \cdot 4 \cdot 6 = 24\pi$. B: $\pi \cdot 9 \cdot 3 = 27\pi$. B holds more, because the radius is squared.`, "review"),
    num(3, r`A triangular prism has a triangular base with base 5 m and height 4 m. The prism is 9 m long. Find its volume.`, 90, { unit: "m³" }, [r`$B = \frac{1}{2}(5)(4)$.`], r`$B = 10$ m², so $V = 10 \cdot 9 = 90$ m³.`, "review"),
  ],
});
