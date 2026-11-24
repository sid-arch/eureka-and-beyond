import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-first-third-laws",
  title: "Newton's first and third laws",
  summary: "Apply the first law to define inertial frames and the third law to interacting objects, including the varying tension along a massive rope.",
  minutes: 30,
  objectives: [
    "Use the first law to identify inertial reference frames.",
    "Identify third-law pairs: equal size, opposite direction, acting on different objects.",
    "Find tension as a function of position in an accelerating massive rope.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("First law and inertial frames", r`With zero net force, velocity is constant. Frames where this holds are inertial; an accelerating car or a spinning merry-go-round is not one, which is why loose objects seem to slide on their own there.`),
    def("Third law", r`If A pushes on B, then B pushes on A with an equal and opposite force: $\vec F_{AB} = -\vec F_{BA}$. The pair acts on different objects, so the two forces never cancel each other in one free-body diagram.`),
    def("Massive ropes", r`A massless rope has the same tension throughout. A rope with mass needs a net force on each piece to accelerate it, so its tension changes along its length.`),
    example(r`A 20 N pull drags a 1 kg rope attached to a 3 kg block across a frictionless floor`, [
      [r`a = \tfrac{20}{3 + 1} = 5\ \text{m/s}^2`, ""],
      [r`T_{block\ end} = 3(5) = 15\ \text{N}`, "Only the block is ahead of this point."],
      [r`T_{middle} = (3 + 0.5)(5) = 17.5\ \text{N}`, "The block plus half the rope."],
    ], r`In general $T(x) = (m_{block} + \lambda x)a$ rises linearly from 15 N to 20 N along the rope.`),
    callout("application", "Where this shows up", r`Tug-of-war is won with friction on the ground, not rope tension; heavy towing cables and elevator cables are designed for the highest tension, at the top.`),
  ],
  questions: [
    num(2, r`A uniform 2 kg rope is pulled by 10 N alone on a frictionless floor. Find the tension at its midpoint.`, 5, { unit: "N" }, ["Find the rope's acceleration from F = Ma.", "The midpoint tension accelerates only the trailing half."], r`$a = 5$ m/s²; the trailing half (1 kg) needs 5 N.`),
    mc(2, r`A book rests on a table. The third-law partner of the book's weight is…`, ["the table's normal force on the book", "the book's gravitational pull on Earth", "the table's weight", "friction"], 1, ["Third-law pairs act on different objects. Weight is Earth pulling the book; the partner is…"], r`Weight is Earth pulling the book, so its partner is the book pulling Earth.`),
    mc(2, r`Which frame is NOT inertial?`, ["a train moving at constant velocity", "a car turning a corner", "a frame drifting in deep space", "a lab, to good approximation"], 1, ["Newton's first law holds only in frames that aren't accelerating. Which frame is changing direction?"], r`It's accelerating.`),
    mc(3, r`A truck hits a mosquito. The force on the mosquito is…`, ["larger", "smaller", "equal in size", "zero"], 2, ["Third law: forces in a pair are equal in size. The accelerations differ because of mass."], r`Third law: the same force, very different accelerations.`, "review"),
  ],
});
