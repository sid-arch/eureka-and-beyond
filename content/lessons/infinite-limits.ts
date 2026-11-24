import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "infinite-limits",
  title: "Infinite limits and vertical asymptotes",
  summary: "Describe unbounded behavior with infinite limits, determine the sign from each side, and connect infinite limits to vertical asymptotes.",
  minutes: 25,
  objectives: [
    "Write and interpret lim f(x) = ±∞ as x approaches a.",
    "Determine the sign of an infinite limit from each side using a sign analysis.",
    "Locate vertical asymptotes: x = a is one if either one-sided limit is infinite.",
  ],
  concepts: [
    { slug: "limits", name: "Limits", description: "The value a function's outputs approach as the input approaches a given value.", subject: "subj_math" },
  ],
  blocks: [
    def("Infinite limit", r`$\lim_{x \to a^+} f(x) = \infty$ means $f(x)$ grows beyond any bound as $x$ approaches $a$ from the right. The limit does not exist as a number; $\infty$ describes how it fails.`),
    def("Vertical asymptote", r`The line $x = a$ is a vertical asymptote if at least one one-sided limit of $f$ at $a$ is $\infty$ or $-\infty$.`),
    example(r`$\lim_{x \to 3^\pm} \dfrac{x + 1}{x - 3}$`, [
      [r`x \to 3^+: \tfrac{4}{\text{small positive}} \to +\infty`, ""],
      [r`x \to 3^-: \tfrac{4}{\text{small negative}} \to -\infty`, ""],
      [r`\text{vertical asymptote } x = 3`, ""],
    ]),
    example(r`Other common infinite limits`, [
      [r`\lim_{x \to 0^+} \ln x = -\infty`, ""],
      [r`\lim_{x \to \pi/2^-} \tan x = +\infty`, ""],
    ]),
    activity("rational-graph", { title: "Approach the asymptote from each side", params: { a: 2, h: 1, k: -1 } }),
    callout("warning", "Check for holes", r`$\frac{x^2 - 1}{x - 1}$ is undefined at 1, but there's no asymptote: it simplifies to $x + 1$. Asymptotes come from zeros of the denominator that don't cancel.`),
    callout("application", "Where this shows up", r`The cost of removing the last few percent of a pollutant often follows a model like $C(p) = \frac{k p}{100 - p}$, which grows without bound as $p \to 100^-$.`),
  ],
  questions: [
    mc(1, r`$\lim_{x \to 0^+} \dfrac{1}{x^2}$ is…`, ["0", "1", r`$+\infty$`, r`$-\infty$`], 2, [], r`The denominator is a small positive number.`),
    mc(2, r`$\lim_{x \to 2^-} \dfrac{3}{x - 2}$ is…`, [r`$+\infty$`, r`$-\infty$`, "0", "3"], 1, [], r`$x - 2$ is small and negative.`),
    mc(2, r`Where does $f(x) = \dfrac{x - 2}{x^2 - 4}$ have a vertical asymptote?`, ["x = 2 and x = −2", "x = −2 only", "x = 2 only", "None"], 1, [], r`$\frac{x - 2}{(x - 2)(x + 2)} = \frac{1}{x + 2}$: a hole at 2, an asymptote at −2.`),
    mc(3, r`$\lim_{x \to 0^-} e^{1/x}$ is…`, ["0", "1", r`$+\infty$`, r`$-\infty$`], 0, [r`What does $\frac{1}{x}$ do as $x \to 0^-$?`], r`$\frac{1}{x} \to -\infty$, so $e^{1/x} \to 0$. (From the right it goes to $+\infty$.)`, "review"),
  ],
});
