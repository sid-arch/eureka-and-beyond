import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "separation-of-variables",
  title: "Finding general solutions using separation of variables",
  summary: "Solve separable differential equations by moving all y-terms to one side and x-terms to the other, integrating both sides, and solving for y.",
  minutes: 30,
  objectives: [
    "Recognize separable equations dy/dx = g(x)h(y).",
    "Separate, integrate both sides, and include one constant.",
    "Solve for y when possible.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Separation", r`If $\frac{dy}{dx} = g(x)h(y)$, rewrite as $\frac{1}{h(y)}\,dy = g(x)\,dx$, integrate both sides, and solve for $y$. One constant $C$ is enough.`),
    example(r`$\frac{dy}{dx} = xy$`, [
      [r`\frac{dy}{y} = x\,dx`, ""],
      [r`\ln|y| = \tfrac{x^2}{2} + C`, ""],
      [r`y = Ae^{x^2/2}`, r`Where $A = \pm e^C$ (and $A = 0$ gives the solution $y = 0$).`],
    ]),
    example(r`$\frac{dy}{dx} = \frac{x}{y}$`, [
      [r`y\,dy = x\,dx`, ""],
      [r`\tfrac{y^2}{2} = \tfrac{x^2}{2} + C \Rightarrow y^2 = x^2 + K`, "A family of hyperbolas."],
    ]),
    callout("warning", "Not every equation separates", r`$\frac{dy}{dx} = x + y$ can't be written as $g(x)h(y)$; separation doesn't apply.`),
    callout("application", "Where this shows up", r`Radioactive decay, Newton's cooling, and drug elimination are all separable, which is why they have tidy exponential solutions.`),
  ],
  questions: [
    mc(1, r`Which equation is separable?`, [r`$\frac{dy}{dx} = x + y$`, r`$\frac{dy}{dx} = x^2 y^3$`, r`$\frac{dy}{dx} = \sin(xy)$`, r`$\frac{dy}{dx} = x - y^2 + 1$`], 1, [], r`$g(x) = x^2$, $h(y) = y^3$.`),
    mc(2, r`The general solution of $\frac{dy}{dx} = 3x^2 y$ is…`, [r`$y = Ce^{x^3}$`, r`$y = x^3 + C$`, r`$y = Ce^{3x}$`, r`$y = e^{x^3} + C$`], 0, [], r`$\ln|y| = x^3 + C$.`),
    mc(2, r`Separating $\frac{dy}{dx} = \frac{\cos x}{y^2}$ gives…`, [r`$y^2\,dy = \cos x\,dx$`, r`$dy = y^2\cos x\,dx$`, r`$\frac{dy}{y^2} = \cos x\,dx$`, r`$y\,dy = \cos x\,dx$`], 0, [], r`Then $\frac{y^3}{3} = \sin x + C$.`),
    mc(3, r`Why is only one constant needed after integrating both sides?`, ["Constants cancel", "Two constants combine into one", "The left side has no constant", "It's a convention only"], 1, [], r`$C_1 - C_2$ is a single arbitrary constant.`, "review"),
  ],
});
