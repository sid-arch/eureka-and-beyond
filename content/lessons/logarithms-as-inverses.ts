import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "logarithms-as-inverses",
  title: "Logarithms as inverses",
  summary: "Define logarithms as exponents, convert between exponential and logarithmic form, evaluate logs, and graph log functions as inverses of exponentials.",
  minutes: 30,
  objectives: [
    "Convert between y = log_b x and b^y = x.",
    "Evaluate logarithms, including common (log) and natural (ln) logs.",
    "Graph logarithmic functions and state their domain, range and asymptote.",
  ],
  concepts: [
    { slug: "logarithms", name: "Logarithms", description: "Exponents: log_b x is the power of b that gives x.", subject: "subj_math" },
    { slug: "inverse-functions", name: "Inverse functions", description: "Functions that undo each other: f⁻¹(f(x)) = x.", subject: "subj_math" },
  ],
  formulas: ["log-properties"],
  blocks: [
    def("Logarithm", r`For $b > 0$, $b \ne 1$ and $x > 0$: $\log_b x = y$ means $b^y = x$. A logarithm is an exponent: $\log_2 8 = 3$ because $2^3 = 8$. $\log x$ means $\log_{10} x$ and $\ln x$ means $\log_e x$.`),
    example(r`Evaluate $\log_3 81$, $\log_5 \tfrac{1}{25}$ and $\log 0.001$`, [
      [r`3^4 = 81 \Rightarrow 4`, ""],
      [r`5^{-2} = \tfrac{1}{25} \Rightarrow -2`, ""],
      [r`10^{-3} = 0.001 \Rightarrow -3`, ""],
    ]),
    text(r`Because $\log_b x$ and $b^x$ are inverses, $\log_b(b^x) = x$ and $b^{\log_b x} = x$. The graph of $y = \log_b x$ is the reflection of $y = b^x$ across $y = x$: domain $x > 0$, range all reals, vertical asymptote $x = 0$, and it passes through $(1, 0)$ and $(b, 1)$.`),
    activity("exp-log", { title: "Exponential and log as mirror images", params: { b: 3 } }),
    callout("tip", "Try this", r`With base 3, move the point to $x = 2$: the exponential gives $(2, 9)$ and the log gives $(9, 2)$, so $\log_3 9 = 2$. Try a base less than 1: what happens to both graphs?`, "experiment"),
    callout("application", "Where this shows up", r`Logarithms measure things that span huge ranges: the Richter scale, decibels, pH, and the number of digits in a number ($\lfloor\log n\rfloor + 1$).`),
  ],
  questions: [
    num(1, r`Evaluate $\log_2 32$.`, 5, {}, [], r`$2^5 = 32$.`),
    num(1, r`Evaluate $\log 10{,}000$.`, 4, {}, [], r`4.`),
    num(2, r`Evaluate $\log_4 2$. Enter a decimal.`, 0.5, {}, [r`$4^{1/2} = 2$.`], r`$0.5$.`),
    mc(2, r`Which is the exponential form of $\log_6 y = 3$?`, [r`$y^3 = 6$`, r`$6^3 = y$`, r`$3^6 = y$`, r`$6^y = 3$`], 1, [], r`$6^3 = y$, so $y = 216$.`),
    num(3, r`Evaluate $\ln(e^{4})$.`, 4, {}, [], r`Inverse functions: 4.`, "review"),
  ],
});
