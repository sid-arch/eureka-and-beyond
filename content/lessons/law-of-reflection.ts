import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "law-of-reflection",
  title: "Reflection",
  summary: "Apply the law of reflection with ray diagrams, distinguish specular from diffuse reflection, and solve plane-mirror problems including mirror height and multiple images.",
  minutes: 30,
  objectives: [
    "Apply θ_r = θ_i using normals and ray diagrams.",
    "Distinguish specular and diffuse reflection.",
    "Locate plane-mirror images, find the minimum mirror height and count images between two mirrors.",
  ],
  concepts: [
    { slug: "optics", name: "Optics", description: "How light reflects and refracts to form images with mirrors and lenses.", subject: "subj_phys" },
  ],
  formulas: ["optics-equations"],
  blocks: [
    def("Law of reflection", r`The incident ray, the reflected ray and the normal all lie in one plane, and $\theta_r = \theta_i$, measured from the normal. A smooth surface reflects parallel rays in parallel (specular, giving images); a rough surface scatters them (diffuse, letting you see the surface itself from any angle).`),
    def("Plane-mirror images", r`The image is virtual, upright, the same size as the object, and as far behind the mirror as the object is in front, with front and back reversed.`),
    example(r`What's the shortest mirror that shows all of a 1.8 m person?`, [
      [r`h_{mirror} = \tfrac{1.8}{2} = 0.9\ \text{m}`, "Rays from your feet to your eyes reflect halfway down; the result doesn't depend on distance."],
    ]),
    example(r`Two plane mirrors meet at 60°. How many images of an object between them?`, [
      [r`N = \tfrac{360°}{60°} - 1 = 5`, ""],
    ]),
    activity("ray-optics", { title: "From plane to curved mirrors", params: { optic: "concave", focal: 20, object: 10 } }),
    callout("application", "Where this shows up", r`Corner reflectors left on the Moon by Apollo astronauts send laser light straight back to Earth, and bike reflectors use the same geometry.`),
  ],
  questions: [
    num(2, r`A ray strikes a mirror at 35° to the surface. Find the angle of reflection measured from the normal.`, 55, { unit: "°" }, [], r`$90 - 35$.`),
    num(2, r`How many images form between two mirrors at 90°?`, 3, {}, [], r`$\frac{360}{90} - 1$.`),
    mc(2, r`You walk toward a plane mirror at 1 m/s. Your image approaches you at…`, ["1 m/s", "2 m/s", "0.5 m/s", "0 m/s"], 1, [], r`You and your image both close in.`),
    mc(3, r`A wet road at night looks darker and glares because…`, ["water absorbs light", "it switches from diffuse to specular reflection", "water refracts all light", "it's hotter"], 1, [], r`Water fills the rough surface into a smooth one.`, "review"),
  ],
});
