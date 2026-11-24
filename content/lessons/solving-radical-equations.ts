import { callout, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-radical-equations",
  title: "Solving radical equations",
  summary: "Solve equations with square roots, cube roots and rational exponents by isolating the radical and raising both sides to a power, checking for extraneous solutions.",
  minutes: 30,
  objectives: [
    "Isolate a radical and raise both sides to the matching power.",
    "Solve equations with two radicals and with rational exponents.",
    "Identify extraneous solutions introduced by squaring.",
  ],
  concepts: [
    { slug: "radical-functions", name: "Radical functions", description: "Functions such as √x and ∛x and their transformations.", subject: "subj_math" },
  ],
  blocks: [
    text(r`To undo a square root, square both sides; to undo a cube root, cube them. Squaring is not reversible ($3^2 = (-3)^2$), so it can create extraneous solutions. Cubing can't, but checking is always wise.`),
    example(r`Solve $\sqrt{x + 7} - x = 1$`, [
      [r`\sqrt{x + 7} = x + 1`, "Isolate the radical."],
      [r`x + 7 = x^2 + 2x + 1 \Rightarrow x^2 + x - 6 = 0`, "Square both sides."],
      [r`x = 2 \text{ or } x = -3`, ""],
      [r`x = 2: 3 - 2 = 1 ✓;\quad x = -3: 2 + 3 = 5 ✗`, "Only x = 2."],
    ]),
    example(r`Solve $(x - 2)^{3/2} = 8$`, [
      [r`x - 2 = 8^{2/3} = 4`, "Raise both sides to the 2/3 power."],
      [r`x = 6`, r`Check: $4^{3/2} = 8$. ✓`],
    ]),
    example(r`Solve $\sqrt{x + 5} = \sqrt{x} + 1$`, [
      [r`x + 5 = x + 2\sqrt{x} + 1`, "Square; the right side is a binomial."],
      [r`4 = 2\sqrt{x} \Rightarrow x = 4`, r`Check: $3 = 2 + 1$. ✓`],
    ]),
    callout("warning", "Square the whole side", r`$(\sqrt{x} + 1)^2 = x + 2\sqrt{x} + 1$, not $x + 1$. Forgetting the middle term is the most common error.`),
    callout("application", "Where this shows up", r`Pendulum periods ($T = 2\pi\sqrt{L/g}$), stopping distance from speed, and the time for an object to fall all lead to radical equations when you solve for the length or distance.`),
  ],
  questions: [
    num(1, r`Solve $\sqrt{2x - 1} = 5$.`, 13, {}, [], r`$2x - 1 = 25$, $x = 13$.`),
    num(2, r`Solve $\sqrt[3]{x + 4} = -2$.`, -12, {}, [], r`$x + 4 = -8$, $x = -12$.`),
    num(2, r`Solve $\sqrt{3x + 1} = x - 3$ (enter the valid solution).`, 8, {}, [r`$3x + 1 = x^2 - 6x + 9$.`], r`$x^2 - 9x + 8 = 0$, $x = 1$ or $8$. $x = 1$ gives $2 = -2$ ✗, so $x = 8$.`),
    num(2, r`Solve $x^{2/3} = 9$ for the positive solution.`, 27, {}, [r`Raise to the 3/2 power.`], r`$x = \pm 27$; the positive one is 27.`),
    short(3, r`Solve $\sqrt{x} + 6 = 2$. Enter the solution or "none".`, ["none", "nosolution"], [r`$\sqrt{x} = -4$.`], r`A principal square root can't be negative, so there's no solution (squaring would give the extraneous 16).`, "review"),
  ],
});
