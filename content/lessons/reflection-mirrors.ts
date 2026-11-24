import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reflection-mirrors",
  title: "Reflection and mirrors",
  summary: "Apply the law of reflection, describe plane-mirror images, and locate images in concave and convex mirrors with ray diagrams and the mirror equation.",
  minutes: 30,
  objectives: [
    "State the law of reflection.",
    "Describe images formed by plane, concave and convex mirrors.",
    "Use 1/f = 1/dₒ + 1/dᵢ and m = −dᵢ/dₒ for mirrors.",
  ],
  concepts: [
    { slug: "optics", name: "Optics", description: "How light reflects and refracts to form images with mirrors and lenses.", subject: "subj_phys" },
  ],
  formulas: ["optics-equations"],
  blocks: [
    def("Law of reflection", r`The angle of reflection equals the angle of incidence, both measured from the normal. A plane mirror forms an upright, virtual image the same size as the object, as far behind the mirror as the object is in front.`),
    def("Curved mirrors", r`A concave mirror (focal length $f > 0$) can form real, inverted images (object beyond F) or virtual, upright, enlarged images (object inside F). A convex mirror ($f < 0$) always forms small, upright, virtual images.`),
    example(r`An object 30 cm from a concave mirror with f = 10 cm`, [
      [r`\tfrac{1}{d_i} = \tfrac{1}{10} - \tfrac{1}{30} \Rightarrow d_i = 15\ \text{cm}`, "Real, in front of the mirror."],
      [r`m = -\tfrac{15}{30} = -0.5`, "Inverted, half size."],
    ]),
    activity("ray-optics", { title: "Move the object toward the mirror", params: { optic: "concave", focal: 10, object: 30 } }),
    callout("tip", "Try this", r`Slide the object inside the focal point (below 10 cm): the image jumps behind the mirror, upright and enlarged, like a makeup mirror.`, "experiment"),
    callout("application", "Where this shows up", r`Many car side mirrors are convex (wider view, objects closer than they appear); headlights and telescopes use concave mirrors.`),
  ],
  questions: [
    num(2, r`An object is 5 cm from a concave mirror with f = 10 cm. Find the image distance.`, -10, { unit: "cm" }, [], r`$\frac{1}{d_i} = \frac{1}{10} - \frac{1}{5} = -\frac{1}{10}$: virtual, behind the mirror.`),
    num(2, r`Find the magnification for that image.`, 2, {}, [], r`$-\frac{-10}{5} = 2$: upright, twice as tall.`),
    mc(1, r`You stand 2 m in front of a plane mirror. How far are you from your image?`, ["2 m", "4 m", "1 m", "0 m"], 1, [], r`The image is 2 m behind the mirror.`),
    mc(3, r`A store security mirror shows a wide, small, upright view. It is…`, ["plane", "concave", "convex", "a lens"], 2, [], r`Convex mirrors always do this.`, "review"),
  ],
});
