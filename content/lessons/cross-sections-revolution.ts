import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "cross-sections-revolution",
  title: "Cross sections and solids of revolution",
  summary: "Identify the cross sections formed when a plane slices a solid, and the solid formed by rotating a plane figure around a line.",
  minutes: 20,
  objectives: [
    "Identify cross sections of prisms, pyramids, cylinders, cones and spheres.",
    "Identify the solid produced by rotating a two-dimensional figure about an axis.",
    "Find the dimensions and volume of a solid of revolution.",
  ],
  concepts: [
    { slug: "cross-sections", name: "Cross sections", description: "The two-dimensional shape formed where a plane intersects a solid.", subject: "subj_math" },
  ],
  formulas: ["pyramid-cone-sphere", "prism-cylinder-volume"],
  blocks: [
    def("Cross section", r`The intersection of a solid and a plane. Slicing a loaf of bread gives cross sections.`),
    text(r`Common results: slicing a cylinder parallel to its base gives a circle, and perpendicular to the base (through the axis) gives a rectangle. A cone sliced parallel to the base gives a circle; through the apex perpendicular to the base gives a triangle; at a slight tilt that misses the base, an ellipse. Every plane section of a sphere is a circle. A cube can give a square, a rectangle, a triangle, or even a regular hexagon if sliced through the midpoints of six edges.`),
    def("Solid of revolution", r`The solid swept out when a plane figure rotates $360^\circ$ about a line (the axis). A rectangle rotated about one side makes a cylinder; a right triangle rotated about a leg makes a cone; a semicircle rotated about its diameter makes a sphere.`),
    example(r`A right triangle with legs 3 and 4 rotates about the leg of length 4. Describe the solid and find its volume.`, [
      [r`\text{cone with } r = 3,\ h = 4`, "The other leg sweeps out the base radius."],
      [r`V = \tfrac{1}{3}\pi(9)(4) = 12\pi \approx 37.70`, ""],
    ], r`Rotating about the leg of length 3 instead gives a cone with $r = 4$, $h = 3$ and volume $16\pi$, a different solid.`),
    callout("tip", "Visualize with real objects", r`Cut a potato or clay shape, or spin a paper triangle taped to a pencil. Seeing the cross section once makes these questions much easier.`),
    callout("application", "Where this shows up", r`CT and MRI scans are stacks of cross sections. Pottery wheels and lathes make solids of revolution, and engineers use cross-section areas to compute beam strength and pipe flow.`),
  ],
  questions: [
    mc(1, r`What is the cross section of a sphere cut by any plane through it?`, ["Square", "Circle", "Ellipse", "Triangle"], 1, [], r`Always a circle.`),
    mc(2, r`A square pyramid is sliced by a plane parallel to its base. What is the cross section?`, ["Triangle", "Square", "Rectangle that isn't a square", "Trapezoid"], 1, [], r`A smaller square, similar to the base.`),
    mc(2, r`A rectangle 5 by 2 rotates around its side of length 5. What solid forms?`, ["Cylinder with r = 5, h = 2", "Cylinder with r = 2, h = 5", "Cone", "Sphere"], 1, [], r`The side of length 5 is the axis (height); the side of length 2 sweeps the radius.`),
    num(2, r`Find the volume of the solid in the previous question, to the nearest tenth.`, 62.8, { tolerance: 0.06 }, [r`$\pi r^2 h = \pi(4)(5)$.`], r`$20\pi \approx 62.8$.`),
    mc(3, r`Which cross section of a cube is NOT possible?`, ["Equilateral triangle", "Regular hexagon", "Rectangle", "Circle"], 3, ["Every slice of a cube has straight edges."], r`A plane meets the cube's flat faces in segments, so the cross section is a polygon; it can't be a circle.`, "review"),
  ],
});
