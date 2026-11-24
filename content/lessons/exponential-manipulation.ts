import { callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "exponential-manipulation",
  title: "Exponential functions and manipulation",
  summary: "Rewrite exponential expressions to reveal horizontal shifts, vertical stretches and different time units, using the properties of exponents.",
  minutes: 25,
  objectives: [
    "Show that a horizontal shift of an exponential is a vertical dilation: b^(x + k) = b^k · b^x.",
    "Rewrite growth rates for different time units, such as yearly to monthly.",
    "Use negative and rational exponents to rewrite exponential expressions.",
  ],
  concepts: [
    { slug: "exponential-functions", name: "Exponential functions", description: "Functions of the form y = a·bˣ that change by a constant factor.", subject: "subj_math" },
  ],
  formulas: ["exponent-rules", "exponential-function"],
  blocks: [
    def("Shift = stretch", r`$b^{x + k} = b^k \cdot b^x$. So shifting $y = b^x$ left by $k$ is the same as stretching it vertically by $b^k$. Example: $2^{x + 3} = 8 \cdot 2^x$.`),
    def("Changing time units", r`A quantity that grows by factor $b$ per year grows by $b^{1/12}$ per month, since $(b^{1/12})^{12} = b$. And $b^{x/k} = (b^{1/k})^x$.`),
    example(r`A population triples every 5 years: $P = 200 \cdot 3^{t/5}$. What is the yearly growth factor?`, [
      [r`3^{t/5} = (3^{1/5})^t`, ""],
      [r`3^{1/5} \approx 1.2457`, "About 24.6% growth per year."],
    ]),
    example(r`Rewrite $f(x) = 5 \cdot 4^{x - 1}$ in the form $a \cdot b^x$`, [
      [r`5 \cdot 4^{-1} \cdot 4^x = 1.25 \cdot 4^x`, ""],
    ]),
    callout("application", "Where this shows up", r`Banks quote annual rates but compound monthly; drug labels give half-lives in hours while doses are daily. Rewriting exponentials converts between these units.`),
  ],
  questions: [
    short(1, r`Rewrite $3^{x + 2}$ in the form a·3^x. Use the format 9*3^x.`, ["9*3^x", "9·3^x", "9(3^x)"], [], r`$3^2 \cdot 3^x = 9 \cdot 3^x$.`),
    mc(2, r`Which is equivalent to $2^{-x}$?`, [r`$-2^x$`, r`$\left(\frac{1}{2}\right)^x$`, r`$2^{1/x}$`, r`$-\frac{1}{2^x}$`], 1, [], r`$2^{-x} = (2^{-1})^x$.`),
    short(2, r`A quantity grows 10% per year. Write its monthly growth factor as a power of 1.1. Use the format 1.1^(1/12).`, ["1.1^(1/12)"], [], r`$1.1^{1/12} \approx 1.008$.`),
    mc(3, r`$f(x) = 16 \cdot 2^x$ is a horizontal shift of $2^x$ by…`, ["4 left", "4 right", "16 left", "16 up"], 0, [r`$16 = 2^4$.`], r`$2^{x + 4}$: 4 units left.`, "review"),
  ],
});
