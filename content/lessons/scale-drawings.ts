import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "scale-drawings",
  title: "Scale drawings and maps",
  summary: "Use a scale to convert between drawing lengths and actual lengths, and see how areas scale by the square of the scale factor.",
  minutes: 20,
  objectives: [
    "Interpret a scale such as 1 cm : 5 m and write it as a scale factor.",
    "Find actual lengths from a scale drawing or map, and drawing lengths from actual lengths.",
    "Explain why areas scale by the square of the scale factor.",
  ],
  concepts: [
    { slug: "scale-factor", name: "Scale factor", description: "The ratio of a length in a copy to the corresponding length in the original.", subject: "subj_math" },
  ],
  blocks: [
    def("Scale", r`A ratio that compares lengths in a drawing to actual lengths, such as "1 in : 20 ft" or "1 : 50,000." Every length in the drawing is the same fraction of the real length.`),
    text(r`A scale is a proportion waiting to be used. If 1 cm on a map stands for 5 km, then 7.2 cm stands for $7.2 \times 5 = 36$ km. Going the other way, a real distance of 12 km is drawn as $12 \div 5 = 2.4$ cm.`),
    def("Scale factor", r`A scale with the same unit on both sides, written as one number. "1 cm : 5 m" becomes 1 cm : 500 cm, a scale factor of $\frac{1}{500}$ from the real object to the drawing.`),
    example(r`On a floor plan, 1 in = 4 ft. A room measures $3\frac{1}{2}$ in by $2\frac{3}{4}$ in on the plan. Find its actual dimensions and area.`, [
      [r`3.5 \times 4 = 14 \text{ ft}`, "Length."],
      [r`2.75 \times 4 = 11 \text{ ft}`, "Width."],
      [r`14 \times 11 = 154 \text{ ft}^2`, "Actual area."],
    ], r`The drawing's area is $3.5 \times 2.75 = 9.625$ in². Multiply by $4^2 = 16$: $9.625 \times 16 = 154$. Areas scale by the square of the scale factor.`),
    example(r`A map has scale 1 : 25,000. Two towns are 8.4 cm apart on the map. How far apart are they in kilometers?`, [
      [r`8.4 \times 25{,}000 = 210{,}000 \text{ cm}`, "Real distance in the map's unit."],
      [r`210{,}000 \text{ cm} = 2100 \text{ m} = 2.1 \text{ km}`, "100 cm per meter, 1000 m per kilometer."],
    ]),
    callout("tip", "Keep units visible", r`Write the units at every step. Most scale errors are unit errors, such as mixing inches with feet or centimeters with kilometers.`),
    callout("warning", "Area is not multiplied by the scale", r`If every length is doubled, the area is multiplied by $2^2 = 4$, not 2. A model built at 1 : 10 has $\frac{1}{100}$ of the area and $\frac{1}{1000}$ of the volume of the real object.`),
    callout("application", "Where this shows up", r`Architects, engineers, model builders and anyone reading a hiking map use scales. A 1 : 24 model car that is 18.5 cm long represents a car $18.5 \times 24 = 444$ cm, about 4.4 m, long.`),
  ],
  questions: [
    num(1, r`A map scale is 1 cm : 15 km. Two cities are 6 cm apart on the map. What is the actual distance in km?`, 90, { unit: "km" }, ["Multiply by 15."], r`$6 \times 15 = 90$ km.`),
    num(1, r`On a drawing with scale 1 in : 8 ft, a wall is 40 ft long. How long is it on the drawing, in inches?`, 5, { unit: "in" }, ["Divide 40 by 8."], r`$40 \div 8 = 5$ in.`),
    num(2, r`A model airplane is built at a scale of 1 : 72. The model's wingspan is 50 cm. What is the real wingspan in meters?`, 36, { unit: "m" }, ["50 × 72 cm, then convert to meters."], r`$50 \times 72 = 3600$ cm $= 36$ m.`),
    mc(2, r`The scale "1 cm : 2 m" written as a scale factor from drawing to real object is…`, ["1 : 2", "1 : 20", "1 : 200", "1 : 2000"], 2,
      ["Convert 2 m to centimeters."], r`2 m = 200 cm, so the scale is 1 : 200.`),
    num(2, r`A garden is drawn at a scale of 1 cm : 3 m. On the drawing it is a rectangle 4 cm by 2.5 cm. What is the actual area of the garden, in square meters?`, 90, { unit: "m²" },
      ["Find the actual length and width first.", "12 m by 7.5 m."], r`$12 \times 7.5 = 90$ m².`),
    num(3, r`A photo 4 in by 6 in is enlarged with a scale factor of 2.5. By what number is its area multiplied?`, 6.25, {},
      ["Areas scale by the square of the scale factor."], r`$2.5^2 = 6.25$. (The area goes from 24 in² to 150 in², and $150 \div 24 = 6.25$.)`, "review"),
    num(3, r`On a map, 2.5 in represents 75 miles. What does 4 in represent, in miles?`, 120, { unit: "mi" }, ["Find miles per inch: 75 ÷ 2.5."], r`30 miles per inch, so $4 \times 30 = 120$ miles.`, "review"),
  ],
});
