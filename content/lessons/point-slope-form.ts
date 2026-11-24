import { activity, callout, example, formula, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "point-slope-form",
  title: "Point-slope form",
  summary: "Write the equation of a line from a point and a slope or from two points, and convert point-slope form to slope-intercept form.",
  minutes: 25,
  objectives: [
    "Explain where point-slope form comes from using the slope formula.",
    "Write the equation of a line given a point and slope, or two points.",
    "Convert between point-slope and slope-intercept forms and check that a point lies on a line.",
  ],
  concepts: [
    { slug: "point-slope-form", name: "Point-slope form", description: "y − y₁ = m(x − x₁): the line with slope m through (x₁, y₁).", subject: "subj_math" },
  ],
  formulas: ["point-slope-form", "slope", "slope-intercept-form"],
  blocks: [
    text(r`Slope-intercept form needs the $y$-intercept. Often you know a different point on the line instead. Point-slope form uses whatever point you have.`),
    formula(r`y - y_1 = m(x - x_1)`, "Point-slope form", r`The line with slope $m$ through the point $(x_1, y_1)$.`),
    text(r`It comes straight from the slope formula. If $(x, y)$ is any other point on the line through $(x_1, y_1)$ with slope $m$, then $\frac{y - y_1}{x - x_1} = m$. Multiplying both sides by $x - x_1$ gives $y - y_1 = m(x - x_1)$.`),
    example(r`Write the line with slope $-2$ through $(3, -1)$`, [
      [r`y - (-1) = -2(x - 3)`, "Substitute m = −2, x₁ = 3, y₁ = −1."],
      [r`y + 1 = -2(x - 3)`, "Point-slope form."],
      [r`y = -2x + 6 - 1 = -2x + 5`, "Slope-intercept form, if needed."],
    ], r`Check: $-2(3) + 5 = -1$. ✓ The point is on the line.`),
    example(r`Write the line through $(-4, 7)$ and $(2, -2)$`, [
      [r`m = \frac{-2 - 7}{2 - (-4)} = \frac{-9}{6} = -\tfrac{3}{2}`, "Find the slope first."],
      [r`y - 7 = -\tfrac{3}{2}(x + 4)`, "Use either point; here (−4, 7)."],
      [r`y = -\tfrac{3}{2}x - 6 + 7 = -\tfrac{3}{2}x + 1`, ""],
    ], r`Check with the other point: $-\frac{3}{2}(2) + 1 = -2$. ✓ Using $(2, -2)$ instead gives the same line.`),
    activity("linear-graph", { title: "Check your line", params: { m: -1.5, b: 1 } }),
    callout("tip", "Try this", r`The line $y = -\frac{3}{2}x + 1$ is set up. Confirm visually that it passes through $(-4, 7)$ and $(2, -2)$. Then change the slope and notice it stops passing through both.`, "experiment"),
    callout("warning", "Signs inside the parentheses", r`The form has subtraction: $x - x_1$. For the point $(-4, 7)$, $x - (-4)$ becomes $x + 4$. A point $(5, -3)$ gives $y + 3 = m(x - 5)$.`),
    callout("application", "Where this shows up", r`A plumber charges 85 dollars for a 1-hour job and 55 dollars per extra hour. You know one point, (1, 85), and the slope, 55: $C - 85 = 55(h - 1)$, or $C = 55h + 30$.`),
  ],
  questions: [
    short(1, r`Write the point-slope form of the line with slope 4 through $(1, 6)$. Use the format y-6=4(x-1).`, ["y-6=4(x-1)"], ["Substitute into y − y₁ = m(x − x₁)."], r`$y - 6 = 4(x - 1)$.`),
    short(2, r`Write the line with slope $-3$ through $(-2, 5)$ in slope-intercept form.`, ["y=-3x-1", "y=-1-3x"], [r`$y - 5 = -3(x + 2)$.`], r`$y = -3x - 6 + 5 = -3x - 1$.`),
    short(2, r`Write the line through $(1, 2)$ and $(4, 11)$ in slope-intercept form.`, ["y=3x-1", "y=-1+3x"], ["Slope = (11 − 2)/(4 − 1).", r`Then $y - 2 = 3(x - 1)$.`], r`$m = 3$ and $y = 3x - 3 + 2 = 3x - 1$.`),
    mc(2, r`Which point lies on the line $y + 2 = \tfrac{1}{2}(x - 6)$?`, [r`$(6, 2)$`, r`$(-6, 2)$`, r`$(6, -2)$`, r`$(2, 6)$`], 2,
      ["Read the point from the form: be careful with signs."], r`$y + 2 = y - (-2)$, so the point is $(6, -2)$.`),
    short(3, r`Write the line through $(-3, 4)$ and $(3, 0)$ in slope-intercept form.`, ["y=-2x/3+2", "y=-(2/3)x+2", "y=2-2x/3", "y=(-2/3)x+2"], [r`$m = \frac{0 - 4}{3 - (-3)} = -\frac{2}{3}$.`], r`$y - 0 = -\frac{2}{3}(x - 3)$, so $y = -\frac{2}{3}x + 2$.`),
    short(3, r`A gym's cost is 165 dollars for 3 months and 285 dollars for 7 months, and it is linear. Write the cost C for m months as C=…`, ["C=30m+75", "C=75+30m", "c=30m+75"], ["Slope = (285 − 165)/(7 − 3).", "Then use point-slope form."], r`$m = \frac{120}{4} = 30$. $C - 165 = 30(m - 3)$ gives $C = 30m + 75$: a 75-dollar sign-up fee plus 30 dollars a month.`, "review"),
  ],
});
