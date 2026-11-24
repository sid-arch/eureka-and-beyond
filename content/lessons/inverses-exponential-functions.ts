import { activity, callout, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inverses-exponential-functions",
  title: "Inverses of exponential functions",
  summary: "Find inverses of transformed exponential functions, which are logarithmic functions, and compare their domains, ranges, asymptotes and rates of change.",
  minutes: 25,
  objectives: [
    "Find the inverse of f(x) = a·b^x + k algebraically.",
    "Relate the domain, range and asymptote of an exponential to those of its inverse logarithm.",
    "Compare how exponentials and logarithms change over equal-length intervals.",
  ],
  concepts: [
    { slug: "logarithms", name: "Logarithms", description: "Exponents: log_b x is the power of b that gives x.", subject: "subj_math" },
    { slug: "inverse-functions", name: "Inverse functions", description: "Functions that undo each other: f⁻¹(f(x)) = x.", subject: "subj_math" },
  ],
  formulas: ["log-properties"],
  blocks: [
    text(r`Because exponentials are one-to-one, every exponential function has an inverse, and that inverse is a logarithmic function. The exponential's horizontal asymptote becomes the log's vertical asymptote.`),
    example(r`Find the inverse of $f(x) = 3 \cdot 2^x - 5$`, [
      [r`x = 3 \cdot 2^y - 5`, "Swap x and y."],
      [r`\tfrac{x + 5}{3} = 2^y \Rightarrow y = \log_2\tfrac{x + 5}{3}`, ""],
      [r`f^{-1}(x) = \log_2\tfrac{x + 5}{3},\ x > -5`, r`f has range $y > -5$ (asymptote $y = -5$), so $f^{-1}$ has domain $x > -5$ (asymptote $x = -5$).`],
    ]),
    activity("exp-log", { title: "Asymptotes swap under inversion", params: { b: 2 } }),
    callout("tip", "Compare growth", r`Over equal input steps, an exponential's outputs change by equal factors, while a logarithm's outputs change by equal amounts over equal input factors: $\log_2 x$ goes up by 1 each time $x$ doubles.`, "experiment"),
    callout("application", "Where this shows up", r`If a model says a quantity is $f(t) = 100e^{0.05t}$, its inverse $t = 20\ln\frac{f}{100}$ answers "when will it reach this level?"`),
  ],
  questions: [
    short(2, r`Find the inverse of $f(x) = 5^x$. Use the format log_5(x).`, ["log_5(x)", "log5(x)", "log_5x"], [], r`$\log_5 x$.`),
    short(2, r`Find the inverse of $f(x) = e^x + 2$. Use the format ln(x-2).`, ["ln(x-2)"], [], r`$x = e^y + 2$, so $y = \ln(x - 2)$.`),
    mc(2, r`$f(x) = 4^x - 3$ has horizontal asymptote $y = -3$. What is the vertical asymptote of $f^{-1}$?`, [r`$x = 3$`, r`$x = -3$`, r`$y = -3$`, r`$x = 4$`], 1, [], r`Swapping coordinates: $x = -3$.`),
    mc(3, r`As $x$ goes from 1 to 2 to 4 to 8, $\log_2 x$ goes…`, ["up by 1 each time", "doubles each time", "up by 2 each time", "stays the same"], 0, [], r`0, 1, 2, 3: equal increases over equal factors.`, "review"),
  ],
});
