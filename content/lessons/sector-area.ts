import { activity, callout, example, formula, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sector-area",
  title: "Sector area",
  summary: "Find the area of a sector and of a segment of a circle, in degrees and radians, and solve for a missing radius or angle.",
  minutes: 25,
  objectives: [
    "Compute sector area as a fraction of the circle's area.",
    "Use the radian form A = ½r²θ.",
    "Find the area of a circular segment and solve for a missing radius or angle.",
  ],
  concepts: [
    { slug: "radian-measure", name: "Radian measure", description: "Measuring angles by the ratio of arc length to radius; π radians = 180°.", subject: "subj_math" },
  ],
  formulas: ["arc-length-sector", "circle-area", "triangle-area"],
  blocks: [
    text(r`A sector is the region bounded by two radii and their arc, like a pizza slice. It's the same fraction of the circle's area as its central angle is of $360^\circ$.`),
    formula(r`A = \frac{\theta}{360^\circ} \cdot \pi r^2 = \tfrac{1}{2} r^2 \theta_{\text{rad}}`, "Sector area"),
    activity("circle-angles", { title: "Sector area changes with angle and radius", params: { arc: 72, p: 220, r: 6 } }),
    callout("tip", "Try this", r`With a $72^\circ$ arc (one fifth of the circle) and radius 6, the sector area should be $\frac{1}{5} \cdot 36\pi \approx 22.62$. Double the radius: does the area double or quadruple?`, "experiment"),
    example(r`Find the area of a $120^\circ$ sector with radius 9 in.`, [
      [r`\tfrac{120}{360} \cdot \pi(81) = 27\pi`, ""],
      [r`\approx 84.82 \text{ in}^2`, ""],
    ]),
    example(r`Find the area of the segment cut off by a $90^\circ$ central angle in a circle of radius 10.`, [
      [r`\text{sector} = \tfrac{1}{4}\pi(100) = 25\pi \approx 78.54`, ""],
      [r`\text{triangle} = \tfrac{1}{2}(10)(10) = 50`, "The two radii are perpendicular legs."],
      [r`\text{segment} = 25\pi - 50 \approx 28.54`, "Sector minus triangle."],
    ]),
    example(r`A sector has area $12\pi$ and central angle $60^\circ$. Find the radius.`, [
      [r`\tfrac{60}{360}\pi r^2 = 12\pi \Rightarrow \tfrac{r^2}{6} = 12`, ""],
      [r`r^2 = 72 \Rightarrow r = 6\sqrt{2} \approx 8.49`, ""],
    ]),
    callout("application", "Where this shows up", r`Sprinkler coverage, windshield-wiper sweep, pizza slices and pie-chart regions are sectors. Farmers with center-pivot irrigation compute watered acreage with sector areas.`),
  ],
  questions: [
    num(1, r`Find the area of a $45^\circ$ sector with radius 8, to the nearest hundredth.`, 25.13, { tolerance: 0.006 }, [r`$\frac{1}{8} \cdot 64\pi = 8\pi$.`], r`$8\pi \approx 25.13$.`),
    num(2, r`A sprinkler sprays 15 m and rotates through $210^\circ$. What area does it water, to the nearest square meter?`, 412, { unit: "m²", tolerance: 0.5 }, [r`$\frac{210}{360}\pi(225)$.`], r`$131.25\pi \approx 412.3$, about 412 m².`),
    num(2, r`Find the area of a sector with radius 4 and central angle 1.5 radians.`, 12, {}, [r`$\frac{1}{2} r^2 \theta$.`], r`$\frac{1}{2} \cdot 16 \cdot 1.5 = 12$.`),
    num(3, r`A sector of a circle with radius 6 has area $15\pi$. What is its central angle in degrees?`, 150, { unit: "°" }, [r`$\frac{\theta}{360} \cdot 36\pi = 15\pi$.`], r`$\theta = 15 \cdot 10 = 150^\circ$.`),
    num(3, r`Find the area of the segment of a circle with radius 6 cut off by a $60^\circ$ central angle, to the nearest hundredth.`, 3.26, { tolerance: 0.006 }, ["Sector: 6π. The triangle is equilateral with side 6.", r`Triangle area $9\sqrt{3}$.`], r`$6\pi - 9\sqrt{3} \approx 18.85 - 15.59 = 3.26$.`, "review"),
  ],
});
