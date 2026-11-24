import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "related-rates-intro",
  title: "Introduction to related rates",
  summary: "Differentiate an equation relating several changing quantities with respect to time, and use one known rate to find another.",
  minutes: 25,
  objectives: [
    "Differentiate equations implicitly with respect to time t.",
    "Connect rates such as dA/dt and dr/dt through an equation.",
    "Substitute values only after differentiating.",
  ],
  concepts: [
    { slug: "related-rates", name: "Related rates", description: "Finding how fast one quantity changes from how fast related quantities change.", subject: "subj_math" },
  ],
  formulas: ["chain-rule"],
  blocks: [
    def("The idea", r`If quantities are linked by an equation and all change with time, differentiate both sides with respect to $t$. Each variable gets a rate: $\frac{d}{dt}r^2 = 2r\frac{dr}{dt}$.`),
    example(r`A ripple's radius grows at 2 cm/s. How fast is its area growing when $r = 5$ cm?`, [
      [r`A = \pi r^2`, ""],
      [r`\frac{dA}{dt} = 2\pi r\frac{dr}{dt}`, "Differentiate with respect to t."],
      [r`= 2\pi(5)(2) = 20\pi \approx 62.8 \text{ cm}^2\text{/s}`, "Substitute last."],
    ]),
    callout("warning", "Differentiate before substituting", r`If you plug in $r = 5$ first, $A = 25\pi$ is a constant and its derivative is 0. Values that change must stay variables until after differentiating.`),
    callout("application", "Where this shows up", r`Air traffic controllers compute how fast the distance between two planes is changing from each plane's speed: a related-rates calculation.`),
  ],
  questions: [
    num(2, r`A balloon's radius grows at 0.5 cm/s. How fast is its volume growing, in cm³/s, when $r = 3$ cm? ($V = \frac{4}{3}\pi r^3$.) Round to two decimal places.`, 56.55, { tolerance: 0.02, unit: "cm³/s" }, [], r`$4\pi r^2 \frac{dr}{dt} = 4\pi(9)(0.5) = 18\pi \approx 56.55$.`),
    num(2, r`A square's side grows at 3 cm/min. How fast is the area growing when the side is 10 cm, in cm²/min?`, 60, { unit: "cm²/min" }, [], r`$\frac{dA}{dt} = 2s\frac{ds}{dt} = 60$.`),
    mc(2, r`Differentiating $x^2 + y^2 = 25$ with respect to $t$ gives…`, [r`$2x + 2y = 0$`, r`$2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$`, r`$\frac{dy}{dx} = -\frac{x}{y}$`, r`$2x\frac{dx}{dt} = 25$`], 1, [], r`Each variable depends on $t$.`),
    num(3, r`A circle's area grows at $12\pi$ cm²/s. How fast is the radius growing when $r = 3$ cm, in cm/s?`, 2, { unit: "cm/s" }, [], r`$12\pi = 2\pi(3)\frac{dr}{dt}$, so $\frac{dr}{dt} = 2$.`, "review"),
  ],
});
