import { callout, example, lesson, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polynomial-rational-inequalities",
  title: "Polynomial and rational inequalities",
  summary: "Solve polynomial and rational inequalities with critical values and sign charts, and write solutions in interval notation.",
  minutes: 30,
  objectives: [
    "Rewrite an inequality with 0 on one side and find critical values.",
    "Use a sign chart to decide where the expression is positive or negative.",
    "Handle excluded values of rational inequalities correctly.",
  ],
  concepts: [
    { slug: "sign-analysis", name: "Sign analysis", description: "Using zeros and undefined points to find where an expression is positive or negative.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A polynomial can change sign only at its zeros, and a rational expression only at zeros of the numerator or denominator. These critical values split the number line into intervals where the sign is constant, so one test value per interval is enough.`),
    example(r`Solve $x^2 - x - 6 > 0$`, [
      [r`(x - 3)(x + 2) > 0`, "Critical values −2 and 3."],
      [r`\text{test } -3: (+);\ 0: (-);\ 4: (+)`, "Sign chart."],
      [r`(-\infty, -2) \cup (3, \infty)`, "Strict >, so open endpoints."],
    ]),
    example(r`Solve $\dfrac{x + 1}{x - 4} \le 0$`, [
      [r`\text{critical values } -1,\ 4`, ""],
      [r`\text{test } -2: \tfrac{-}{-} = +;\ 0: \tfrac{+}{-} = -;\ 5: +`, ""],
      [r`[-1, 4)`, "Include −1 (numerator zero, ≤). Exclude 4 (undefined)."],
    ]),
    callout("warning", "Don't multiply by the denominator", r`Multiplying both sides by $x - 4$ would require knowing its sign. Move everything to one side and use a sign chart instead.`),
    callout("application", "Where this shows up", r`Finding when profit is positive, when a projectile is above a height, or when a concentration exceeds a limit are inequality problems.`),
  ],
  questions: [
    short(2, r`Solve $x^2 - 9 \le 0$. Use interval notation like [-3,3].`, ["[-3,3]"], [], r`$[-3, 3]$.`),
    short(2, r`Solve $x(x - 5) > 0$. Use the format (-inf,0)U(5,inf).`, ["(-inf,0)U(5,inf)", "(-∞,0)∪(5,∞)", "(-inf,0)u(5,inf)"], [], r`$(-\infty, 0) \cup (5, \infty)$.`),
    short(2, r`Solve $\dfrac{x - 2}{x + 3} \ge 0$. Use the format (-inf,-3)U[2,inf).`, ["(-inf,-3)U[2,inf)", "(-∞,-3)∪[2,∞)", "(-inf,-3)u[2,inf)"], ["−3 is excluded."], r`$(-\infty, -3) \cup [2, \infty)$.`),
    short(3, r`Solve $x^3 - 4x < 0$. Use the format (-inf,-2)U(0,2).`, ["(-inf,-2)U(0,2)", "(-∞,-2)∪(0,2)", "(-inf,-2)u(0,2)"], [r`$x(x - 2)(x + 2)$.`], r`Negative on $(-\infty, -2)$ and $(0, 2)$.`, "review"),
  ],
});
