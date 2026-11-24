import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "translations",
  title: "Translations",
  summary: "Describe and perform translations with coordinate rules and vectors, and recognize that translations are rigid motions.",
  minutes: 20,
  objectives: [
    "Define a transformation, preimage and image, and a rigid motion.",
    "Translate figures with the rule (x, y) → (x + a, y + b) and with a vector.",
    "Write a translation rule from a preimage and its image.",
  ],
  concepts: [
    { slug: "rigid-motions", name: "Rigid motions", description: "Transformations that preserve distance and angle measure: translations, reflections and rotations.", subject: "subj_math" },
  ],
  blocks: [
    def("Transformation", r`A rule that moves every point of a figure (the preimage) to a new location (the image). Image points are named with primes: $A \to A'$.`),
    def("Rigid motion", r`A transformation that preserves lengths and angle measures. The image is congruent to the preimage. Translations, reflections and rotations are rigid motions.`),
    def("Translation", r`Slides every point the same distance in the same direction. The rule $(x, y) \to (x + a, y + b)$ moves $a$ units horizontally and $b$ units vertically; the vector $\langle a, b \rangle$ describes the same slide.`),
    activity("transformations", { title: "Slide a triangle", params: { kind: "translate" } }),
    callout("tip", "Try this", r`Change the shifts and watch A′, B′, C′. The ratio A′B′ ÷ AB never changes from 1. Find the shift that sends A(1, 1) to the origin.`, "experiment"),
    example(r`Translate $\triangle ABC$ with $A(-2, 1)$, $B(1, 4)$, $C(3, -1)$ by $\langle 4, -3 \rangle$`, [
      [r`A'(2, -2),\ B'(5, 1),\ C'(7, -4)`, "Add 4 to each x and −3 to each y."],
    ]),
    example(r`$P(3, -5)$ maps to $P'(-1, 2)$. Write the rule.`, [
      [r`a = -1 - 3 = -4,\ b = 2 - (-5) = 7`, "Image minus preimage."],
      [r`(x, y) \to (x - 4,\ y + 7)`, ""],
    ]),
    text(r`Because a translation moves every point by the same vector, segments joining preimage points to their images are all parallel and congruent. A translation also keeps orientation: if the vertices of the preimage go clockwise, so do the image's.`),
    callout("application", "Where this shows up", r`Animation and video games move sprites with translation vectors every frame. Wallpaper and tile patterns repeat a motif by translation.`),
  ],
  questions: [
    short(1, r`Translate $(4, -2)$ by $(x, y) \to (x - 3, y + 5)$. Enter as (x,y).`, ["(1,3)"], [], r`$(4 - 3, -2 + 5) = (1, 3)$.`),
    short(2, r`$A(-6, 2)$ maps to $A'(1, -4)$. Write the translation vector as <a,b>.`, ["<7,-6>", "⟨7,-6⟩", "(7,-6)"], ["Subtract preimage from image."], r`$\langle 1 - (-6), -4 - 2 \rangle = \langle 7, -6 \rangle$.`),
    short(2, r`Under the same translation, where does $B(0, 0)$ go? Enter as (x,y).`, ["(7,-6)"], [], r`$(7, -6)$.`),
    mc(2, r`Which property is NOT preserved by every translation?`, ["Side lengths", "Angle measures", "Position on the plane", "Orientation"], 2, [], r`A translation moves the figure, so its position changes; lengths, angles and orientation stay the same.`),
    short(3, r`A translation maps $(2, 5)$ to $(-1, 9)$. Where does it map $(-3, -3)$? Enter as (x,y).`, ["(-6,1)"], ["The vector is ⟨−3, 4⟩."], r`$(-3 - 3, -3 + 4) = (-6, 1)$.`, "review"),
  ],
});
