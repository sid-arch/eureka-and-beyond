import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "correlation",
  title: "Correlation",
  summary: "Measure the direction and strength of a linear relationship with the correlation coefficient r, compute it for small data sets, and know its properties and limits.",
  minutes: 30,
  objectives: [
    "Interpret r in terms of direction and strength of a linear association.",
    "Compute r from standardized values for a small data set.",
    "State the properties of r: unitless, between −1 and 1, sensitive to outliers, linear only, and not evidence of causation.",
  ],
  concepts: [
    { slug: "correlation", name: "Correlation", description: "A number r between −1 and 1 measuring the direction and strength of a linear relationship between two quantitative variables.", subject: "subj_math" },
  ],
  blocks: [
    def("Correlation coefficient", r`$r = \frac{1}{n - 1}\sum z_x z_y$, the average product of the standardized values. Equivalently, $r = \frac{\sum (x - \bar{x})(y - \bar{y})}{\sqrt{\sum (x - \bar{x})^2 \sum (y - \bar{y})^2}}$.`),
    example(r`$x$: 1, 2, 3, 4, 5 and $y$: 2, 4, 5, 4, 5`, [
      [r`\bar{x} = 3,\ \bar{y} = 4`, ""],
      [r`\sum (x - \bar{x})(y - \bar{y}) = 4 + 0 + 0 + 0 + 2 = 6`, ""],
      [r`\sum (x - \bar{x})^2 = 10,\ \sum (y - \bar{y})^2 = 6`, ""],
      [r`r = \frac{6}{\sqrt{60}} \approx 0.775`, "A fairly strong positive linear association."],
    ]),
    def("Properties", r`$-1 \le r \le 1$; the sign gives direction; $|r|$ near 1 means points lie close to a line. $r$ has no units and doesn't change if you change units or swap $x$ and $y$. It measures only linear association and is strongly affected by outliers.`),
    callout("warning", "Correlation is not causation", r`Ice-cream sales and drownings are positively correlated: both rise in hot weather, a lurking variable. Only a randomized experiment can show cause and effect.`),
    callout("warning", "r = 0 doesn't mean no relationship", r`Points on a parabola like $y = x^2$ for $x$ from −3 to 3 have $r = 0$ even though $y$ is determined exactly by $x$. Always look at the scatterplot.`),
    callout("application", "Where this shows up", r`Investors use correlation between assets to build diversified portfolios; scientists report correlations as a first step before running experiments.`),
  ],
  questions: [
    mc(1, r`Which $r$ shows the strongest linear relationship?`, ["0.62", "−0.91", "0.05", "0.88"], 1, [], r`Strength is $|r|$; the sign is direction.`),
    mc(2, r`Heights are converted from inches to centimeters. What happens to $r$ between height and weight?`, ["It is multiplied by 2.54", "It doesn't change", "It becomes 1", "It changes sign"], 1, [], r`$r$ is unitless.`),
    num(2, r`For $x$: 1, 2, 3 and $y$: 3, 1, 2, compute $r$.`, -0.5, { tolerance: 0.001 }, [r`$\bar{x} = 2$, $\bar{y} = 2$.`], r`Products: $(-1)(1) + 0 + (1)(0) = -1$. $\sum dx^2 = 2$, $\sum dy^2 = 2$. $r = \frac{-1}{2} = -0.5$.`),
    mc(3, r`A study finds $r = 0.7$ between hours of TV and test anxiety. A valid conclusion is…`, ["TV causes anxiety", "Anxiety causes TV watching", "In this sample, more TV is associated with more anxiety", "70% of anxiety is caused by TV"], 2, [], r`An association, not causation; and $r^2 = 0.49$, not 0.7, is the share of variation explained.`, "review"),
  ],
});
