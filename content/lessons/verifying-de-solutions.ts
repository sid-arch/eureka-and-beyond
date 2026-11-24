import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "verifying-de-solutions",
  title: "Verifying solutions for differential equations",
  summary: "Check whether a function solves a differential equation by substituting it and its derivatives, and distinguish general from particular solutions.",
  minutes: 20,
  objectives: [
    "Verify a solution by substitution.",
    "Recognize that a general solution contains arbitrary constants.",
    "Use an initial condition to pick a particular solution.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Verifying", r`A function is a solution if substituting it (and its derivatives) makes the equation true for every $x$ in an interval.`),
    example(r`Does $y = Ce^{3x}$ solve $y' = 3y$?`, [
      [r`y' = 3Ce^{3x} = 3y`, "Yes, for every constant C."],
    ]),
    example(r`Does $y = \sin 2x$ solve $y'' + 4y = 0$?`, [
      [r`y'' = -4\sin 2x`, ""],
      [r`-4\sin 2x + 4\sin 2x = 0`, "Yes."],
    ]),
    def("General and particular", r`$y = Ce^{3x}$ is the general solution (a family). The condition $y(0) = 5$ picks the particular solution $y = 5e^{3x}$.`),
    callout("application", "Where this shows up", r`Engineers check a proposed vibration model by substituting it into the equation of motion before trusting its predictions.`),
  ],
  questions: [
    mc(1, r`Is $y = x^2$ a solution of $xy' = 2y$?`, ["Yes", "No", "Only at x = 0", "Only for x > 0"], 0, [], r`$x(2x) = 2x^2 = 2y$.`),
    mc(2, r`Which solves $y' = -2y$?`, [r`$y = e^{2x}$`, r`$y = 4e^{-2x}$`, r`$y = -2x$`, r`$y = x^{-2}$`], 1, [], r`$y' = -8e^{-2x} = -2y$.`),
    mc(2, r`$y = Ce^{x^2}$ solves $y' = 2xy$. Which particular solution has $y(0) = 3$?`, [r`$y = e^{x^2} + 3$`, r`$y = 3e^{x^2}$`, r`$y = e^{3x^2}$`, r`$y = 3x^2$`], 1, [], r`$C = 3$.`),
    mc(3, r`Is $y = \cos x$ a solution of $y'' + y = 0$? Of $y'' - y = 0$?`, ["Both", "Only y″ + y = 0", "Only y″ − y = 0", "Neither"], 1, [], r`$y'' = -\cos x$, so $y'' + y = 0$ but $y'' - y = -2\cos x$.`, "review"),
  ],
});
