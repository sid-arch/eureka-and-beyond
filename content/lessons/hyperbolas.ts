import { activity, callout, def, example, lesson, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "hyperbolas",
  title: "Hyperbolas",
  summary: "Define a hyperbola by its foci, graph it from standard form with its asymptotes, and find vertices, foci and eccentricity.",
  minutes: 30,
  objectives: [
    "Define a hyperbola as the set of points whose distances to two foci differ by a constant.",
    "Graph a hyperbola using its vertices and the asymptote box.",
    "Find foci, asymptotes and eccentricity, and write equations from features.",
  ],
  concepts: [
    { slug: "conic-sections", name: "Conic sections", description: "Curves from slicing a cone: circles, ellipses, parabolas and hyperbolas.", subject: "subj_math" },
  ],
  formulas: ["conic-equations"],
  blocks: [
    def("Hyperbola", r`The set of points with $|PF_1 - PF_2| = 2a$. Standard form opening left-right: $\frac{(x - h)^2}{a^2} - \frac{(y - k)^2}{b^2} = 1$; vertices $(h \pm a, k)$, foci $(h \pm c, k)$ with $c^2 = a^2 + b^2$, asymptotes $y - k = \pm\frac{b}{a}(x - h)$. If the $y$-term is positive, it opens up-down.`),
    activity("conics", { title: "Shape a hyperbola", params: { kind: "hyperbola", a: 3, b: 2 } }),
    callout("tip", "Try this", r`The dashed asymptotes have slopes $\pm\frac{b}{a}$. Increase $b$: the branches open wider. Notice the foci are always farther out than the vertices, since $c > a$.`, "experiment"),
    example(r`Graph $\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$`, [
      [r`a = 4,\ b = 3`, ""],
      [r`\text{vertices } (\pm 4, 0);\ c = 5 \Rightarrow \text{foci } (\pm 5, 0)`, ""],
      [r`\text{asymptotes } y = \pm\tfrac{3}{4}x`, "Draw the 8-by-6 box; the asymptotes are its diagonals."],
    ]),
    callout("application", "Where this shows up", r`LORAN navigation located ships on hyperbolas from time differences of radio signals; some comets follow hyperbolic paths; cooling towers have hyperboloid shapes.`),
  ],
  questions: [
    num(1, r`For $\frac{x^2}{9} - \frac{y^2}{16} = 1$, find $c$.`, 5, {}, [], r`$\sqrt{9 + 16} = 5$.`),
    short(2, r`Find the asymptotes of $\frac{x^2}{9} - \frac{y^2}{16} = 1$. Use the format y=±4x/3.`, ["y=±4x/3", "y=±(4/3)x"], [], r`$y = \pm\frac{4}{3}x$.`),
    short(2, r`Does $\frac{y^2}{4} - \frac{x^2}{25} = 1$ open left-right or up-down? Enter "up-down" or "left-right".`, ["up-down", "updown"], [], r`The $y^2$ term is positive: up-down.`),
    num(3, r`Find the eccentricity of $\frac{x^2}{16} - \frac{y^2}{9} = 1$.`, 1.25, {}, [r`$e = c / a$.`], r`$5 / 4 = 1.25$.`, "review"),
  ],
});
