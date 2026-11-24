import { callout, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "exponential-log-equations",
  title: "Solving exponential and logarithmic equations",
  summary: "Solve exponential equations with common bases or logarithms, solve logarithmic equations by exponentiating, and check domain restrictions.",
  minutes: 30,
  objectives: [
    "Solve exponential equations by rewriting with a common base or by taking logarithms.",
    "Solve logarithmic equations by rewriting in exponential form.",
    "Reject extraneous solutions that make a log argument nonpositive, and solve doubling-time problems.",
  ],
  concepts: [
    { slug: "logarithms", name: "Logarithms", description: "Exponents: log_b x is the power of b that gives x.", subject: "subj_math" },
  ],
  formulas: ["log-properties", "continuous-growth"],
  blocks: [
    text(r`To solve for an unknown exponent, take a logarithm of both sides; the power rule brings the exponent down. To solve for something inside a logarithm, rewrite in exponential form.`),
    example(r`Solve $8^{x + 1} = 32$`, [
      [r`2^{3(x + 1)} = 2^5`, "Common base 2."],
      [r`3x + 3 = 5 \Rightarrow x = \tfrac{2}{3}`, ""],
    ]),
    example(r`Solve $5 \cdot 3^{x} = 80$`, [
      [r`3^x = 16`, "Isolate the power."],
      [r`x = \frac{\ln 16}{\ln 3} \approx 2.524`, "Take ln of both sides."],
    ]),
    example(r`How long does money take to double at 6% compounded continuously?`, [
      [r`2 = e^{0.06t}`, ""],
      [r`t = \frac{\ln 2}{0.06} \approx 11.55 \text{ years}`, "The 'rule of 70': about 70 ÷ 6."],
    ]),
    example(r`Solve $\log_2 x + \log_2(x - 2) = 3$`, [
      [r`\log_2[x(x - 2)] = 3 \Rightarrow x^2 - 2x = 8`, ""],
      [r`(x - 4)(x + 2) = 0`, ""],
      [r`x = 4`, "x = −2 is extraneous: log₂(−2) is undefined."],
    ]),
    callout("application", "Where this shows up", r`Carbon dating, half-life calculations, how long until a loan doubles, and when a population reaches a target all require solving for an exponent.`),
  ],
  questions: [
    num(1, r`Solve $2^{x} = 64$.`, 6, {}, [], r`6.`),
    num(2, r`Solve $9^{x} = 27$. Enter a decimal or fraction.`, 1.5, {}, [r`$3^{2x} = 3^3$.`], r`$x = 1.5$.`),
    num(2, r`Solve $4e^{x} = 20$ to three decimals.`, 1.609, { tolerance: 0.0006 }, [], r`$x = \ln 5 \approx 1.609$.`),
    num(2, r`Solve $\log_3(2x + 1) = 4$.`, 40, {}, [r`$2x + 1 = 81$.`], r`$x = 40$.`),
    num(3, r`A sample decays as $A = 500e^{-0.0231t}$. When is it 250 (its half-life)? Round to the nearest tenth.`, 30, { tolerance: 0.06 }, [r`$t = \ln 2 / 0.0231$.`], r`$0.6931 / 0.0231 \approx 30.0$.`, "review"),
    short(3, r`Solve $\log(x) + \log(x - 3) = 1$. Enter the valid solution.`, ["5", "x=5"], [r`$x^2 - 3x = 10$.`], r`$(x - 5)(x + 2) = 0$; $x = -2$ is extraneous, so $x = 5$.`, "review"),
  ],
});
