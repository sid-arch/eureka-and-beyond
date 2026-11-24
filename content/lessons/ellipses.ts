import { activity, callout, def, example, lesson, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ellipses",
  title: "Ellipses",
  summary: "Define an ellipse by its foci, write and graph its standard equation, find vertices, foci and eccentricity, and convert from general form.",
  minutes: 30,
  objectives: [
    "Define an ellipse as the set of points whose distances to two foci sum to a constant.",
    "Graph an ellipse from its standard form and find its center, vertices, co-vertices and foci.",
    "Find eccentricity and write equations from given features.",
  ],
  concepts: [
    { slug: "conic-sections", name: "Conic sections", description: "Curves from slicing a cone: circles, ellipses, parabolas and hyperbolas.", subject: "subj_math" },
  ],
  formulas: ["conic-equations"],
  blocks: [
    def("Ellipse", r`The set of points $P$ with $PF_1 + PF_2 = 2a$ for two fixed foci. Standard form (horizontal major axis): $\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1$ with $a > b$, vertices $(h \pm a, k)$, co-vertices $(h, k \pm b)$, foci $(h \pm c, k)$ where $c^2 = a^2 - b^2$.`),
    activity("conics", { title: "Stretch an ellipse", params: { kind: "ellipse", a: 5, b: 3 } }),
    callout("tip", "Try this", r`With $a = 5$, $b = 3$, the foci are at $\pm 4$ because $c^2 = 25 - 9 = 16$. Make $b$ equal to $a$: the foci merge at the center and the ellipse becomes a circle (eccentricity 0).`, "experiment"),
    example(r`Graph $\dfrac{x^2}{9} + \dfrac{(y - 2)^2}{25} = 1$`, [
      [r`a^2 = 25 \text{ under } y \Rightarrow \text{vertical major axis}`, "The larger denominator decides the major axis."],
      [r`\text{center } (0, 2),\ \text{vertices } (0, 7), (0, -3)`, ""],
      [r`c = \sqrt{25 - 9} = 4 \Rightarrow \text{foci } (0, 6), (0, -2)`, ""],
    ]),
    def("Eccentricity", r`$e = \frac{c}{a}$, between 0 (circle) and 1 (very flat). Earth's orbit has $e \approx 0.017$, nearly circular.`),
    callout("application", "Where this shows up", r`Planets orbit the Sun in ellipses with the Sun at one focus (Kepler's first law). Whispering galleries and kidney-stone lithotripters use the reflective property: sound or waves from one focus converge at the other.`),
  ],
  questions: [
    num(1, r`For $\frac{x^2}{36} + \frac{y^2}{20} = 1$, find $c$.`, 4, {}, [r`$c^2 = 36 - 20$.`], r`$c = 4$.`),
    short(2, r`What are the vertices of $\frac{x^2}{36} + \frac{y^2}{20} = 1$? Enter like (-6,0),(6,0).`, ["(-6,0),(6,0)"], [], r`$(\pm 6, 0)$.`),
    short(2, r`Write the ellipse centered at the origin with vertices $(\pm 5, 0)$ and foci $(\pm 3, 0)$. Use the format x^2/25+y^2/16=1.`, ["x^2/25+y^2/16=1"], [r`$b^2 = 25 - 9$.`], r`$\frac{x^2}{25} + \frac{y^2}{16} = 1$.`),
    num(3, r`Find the eccentricity of $\frac{x^2}{100} + \frac{y^2}{64} = 1$.`, 0.6, {}, [r`$c = 6$, $a = 10$.`], r`$0.6$.`, "review"),
  ],
});
