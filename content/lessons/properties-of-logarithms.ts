import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "properties-of-logarithms",
  title: "Properties of logarithms",
  summary: "Derive and use the product, quotient and power rules and the change-of-base formula to expand, condense and evaluate logarithms.",
  minutes: 30,
  objectives: [
    "Explain the log rules from the exponent rules.",
    "Expand and condense logarithmic expressions.",
    "Use the change-of-base formula to evaluate any logarithm.",
  ],
  concepts: [
    { slug: "logarithms", name: "Logarithms", description: "Exponents: log_b x is the power of b that gives x.", subject: "subj_math" },
  ],
  formulas: ["log-properties"],
  blocks: [
    def("Rules", r`For $M, N > 0$: $\log_b(MN) = \log_b M + \log_b N$; $\log_b \frac{M}{N} = \log_b M - \log_b N$; $\log_b M^p = p\log_b M$; and change of base: $\log_b M = \frac{\log M}{\log b} = \frac{\ln M}{\ln b}$.`),
    text(r`Each rule is an exponent rule in disguise. If $M = b^m$ and $N = b^n$, then $MN = b^{m + n}$, so $\log_b(MN) = m + n = \log_b M + \log_b N$. Logs turn multiplication into addition, which is why slide rules and log tables made calculation faster for centuries.`),
    example(r`Expand $\log_3 \dfrac{9x^2}{y}$`, [
      [r`\log_3 9 + \log_3 x^2 - \log_3 y`, ""],
      [r`2 + 2\log_3 x - \log_3 y`, ""],
    ]),
    example(r`Condense $2\ln x + \ln 5 - \tfrac{1}{2}\ln y$`, [
      [r`\ln x^2 + \ln 5 - \ln \sqrt{y}`, "Power rule first."],
      [r`\ln \frac{5x^2}{\sqrt{y}}`, ""],
    ]),
    example(r`Evaluate $\log_7 50$`, [
      [r`\frac{\ln 50}{\ln 7} \approx \frac{3.9120}{1.9459} \approx 2.0104`, "Change of base."],
    ], r`Check: $7^2 = 49$, so a value just over 2 makes sense.`),
    callout("warning", "No rule for sums", r`$\log(M + N) \ne \log M + \log N$, and $\frac{\log M}{\log N} \ne \log \frac{M}{N}$.`),
    callout("application", "Where this shows up", r`An earthquake one magnitude higher releases about 32 times as much energy, because magnitude is a logarithm; doubling a sound's intensity adds about 3 decibels ($10\log 2$).`),
  ],
  questions: [
    short(2, r`Expand $\log(100x^3)$. Use the format 2+3log(x).`, ["2+3log(x)", "2+3logx"], [], r`$\log 100 + 3\log x = 2 + 3\log x$.`),
    short(2, r`Condense $\log_2 x + \log_2 8$. Use the format log_2(8x).`, ["log_2(8x)", "log2(8x)"], [], r`$\log_2 8x$.`),
    num(2, r`Evaluate $\log_2 12 - \log_2 3$.`, 2, {}, [], r`$\log_2 4 = 2$.`),
    num(2, r`Evaluate $\log_5 30$ to three decimals.`, 2.113, { tolerance: 0.0006 }, [r`$\frac{\ln 30}{\ln 5}$.`], r`$3.4012 / 1.6094 \approx 2.113$.`),
    mc(3, r`If $\log_b 2 \approx 0.3$ and $\log_b 3 \approx 0.5$, what is $\log_b 18$?`, ["0.8", "1.1", "1.3", "0.15"], 2, [r`$18 = 2 \cdot 3^2$.`], r`$0.3 + 2(0.5) = 1.3$.`, "review"),
  ],
});
