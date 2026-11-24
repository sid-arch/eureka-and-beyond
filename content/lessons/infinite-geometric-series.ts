import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "infinite-geometric-series",
  title: "Infinite geometric series",
  summary: "Decide when an infinite geometric series converges, find its sum, and use it to write repeating decimals as fractions.",
  minutes: 25,
  objectives: [
    "Explain convergence through partial sums.",
    "Use S = a₁/(1 − r) when |r| < 1.",
    "Convert repeating decimals to fractions and solve applied problems.",
  ],
  concepts: [
    { slug: "series", name: "Series", description: "The sum of the terms of a sequence.", subject: "subj_math" },
  ],
  formulas: ["series-sums"],
  blocks: [
    text(r`Walk half the remaining distance to a wall, again and again: $\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots$. The partial sums are $0.5, 0.75, 0.875, \dots$, getting as close to 1 as you like. An infinite sum can have a finite value.`),
    def("Sum of an infinite geometric series", r`If $|r| < 1$, then $r^n \to 0$, so $S_n = a_1\frac{1 - r^n}{1 - r}$ approaches $S = \frac{a_1}{1 - r}$. If $|r| \ge 1$, the series diverges (has no sum).`),
    example(r`Find $12 - 6 + 3 - \tfrac{3}{2} + \cdots$`, [
      [r`r = -\tfrac{1}{2}`, "|r| < 1: converges."],
      [r`S = \frac{12}{1 + \tfrac{1}{2}} = 8`, ""],
    ]),
    example(r`Write $0.\overline{27}$ as a fraction`, [
      [r`0.27 + 0.0027 + \cdots,\ r = 0.01`, ""],
      [r`S = \frac{0.27}{0.99} = \frac{27}{99} = \frac{3}{11}`, ""],
    ]),
    callout("warning", "Check |r| first", r`The formula gives nonsense for divergent series: $1 + 2 + 4 + \cdots$ would "sum" to $\frac{1}{1 - 2} = -1$.`),
    callout("application", "Where this shows up", r`The total distance of a bouncing ball, the long-run effect of repeated drug doses, and the "multiplier effect" in economics are infinite geometric series.`),
  ],
  questions: [
    num(1, r`Find $\frac{1}{3} + \frac{1}{9} + \frac{1}{27} + \cdots$. Enter a decimal or fraction.`, 0.5, {}, [r`$a_1 = \frac{1}{3}$, $r = \frac{1}{3}$.`], r`$\frac{1/3}{2/3} = \frac{1}{2}$.`),
    mc(2, r`Which series converges?`, [r`$2 + 4 + 8 + \cdots$`, r`$5 - 5 + 5 - \cdots$`, r`$9 + 3 + 1 + \cdots$`, r`$1 + 1.1 + 1.21 + \cdots$`], 2, ["Find |r|."], r`$r = \frac{1}{3}$.`),
    short(2, r`Write $0.\overline{4}$ as a fraction.`, ["4/9"], [], r`$\frac{0.4}{0.9} = \frac{4}{9}$.`),
    num(3, r`A ball dropped from 10 m rebounds to 60% of its height each time. What total vertical distance does it travel?`, 40, { unit: "m" }, ["Down 10, then up and down 6 + 3.6 + …", r`$10 + 2 \cdot \frac{6}{1 - 0.6}$.`], r`$10 + 2 \cdot 15 = 40$ m.`, "review"),
  ],
});
