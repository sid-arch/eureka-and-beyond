import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "newtons-third-law",
  title: "Newton's third law",
  summary: "Identify action–reaction pairs: equal and opposite forces that act on different objects, and explain why they don't cancel.",
  minutes: 25,
  objectives: [
    "State Newton's third law.",
    "Identify both forces in an interaction pair.",
    "Explain why third-law pairs never cancel each other.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("Third law", r`If object A exerts a force on object B, then B exerts a force on A that is equal in size and opposite in direction. The two forces act on different objects and are the same type (both contact, both gravitational, …).`),
    example(r`You push on a wall with 50 N`, [
      [r`\text{wall on you: 50 N, toward you}`, "The pair to your push."],
      [r`\text{you don't move because friction from the floor also acts on you}`, "Forces on you are what decide your motion."],
    ]),
    example(r`A horse pulls a cart. If the cart pulls back equally, how does anything move?`, [
      [r`\text{the cart moves if the horse's pull exceeds friction on the cart}`, "Only forces on the cart matter for the cart."],
      [r`\text{the horse moves because the ground pushes it forward harder than the cart pulls back}`, ""],
    ]),
    callout("application", "Where this shows up", r`Rockets push exhaust gas backward, and the gas pushes the rocket forward; no air is needed, which is why rockets work in space.`),
  ],
  questions: [
    mc(1, r`Earth pulls a falling apple down with 1 N. The reaction force is…`, ["the air pushing up on the apple", "the apple pulling Earth up with 1 N", "the ground pushing the apple", "zero"], 1, [], r`Same type (gravity), opposite object.`),
    mc(2, r`A truck and a small car collide. During the collision, the force on the car is…`, ["greater than on the truck", "smaller than on the truck", "equal in size to the force on the truck", "zero"], 2, [], r`Third law. The car accelerates more because its mass is smaller.`),
    mc(2, r`A book rests on a table. The third-law partner of the book's weight is…`, ["the table pushing up on the book", "the book pulling Earth up", "the table's weight", "friction"], 1, [], r`The normal force balances the weight but isn't its third-law pair.`),
    mc(3, r`Why don't third-law pairs cancel?`, ["They aren't equal", "They act on different objects", "They act at different times", "They do cancel"], 1, [], r`Only forces on the same object add up to a net force.`, "review"),
  ],
});
