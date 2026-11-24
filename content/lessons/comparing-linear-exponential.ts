import { activity, callout, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "comparing-linear-exponential",
  title: "Comparing linear and exponential models",
  summary: "Tell linear from exponential patterns using differences and ratios, write either model from two points, and see why exponential growth eventually overtakes linear growth.",
  minutes: 25,
  objectives: [
    "Classify a table as linear (constant differences) or exponential (constant ratios).",
    "Write a linear or exponential model from data.",
    "Explain why an increasing exponential function eventually exceeds any increasing linear function.",
  ],
  concepts: [
    { slug: "exponential-functions", name: "Exponential functions", description: "Functions of the form y = a·bˣ that change by a constant factor.", subject: "subj_math" },
    { slug: "linear-models", name: "Linear models", description: "Using y = mx + b to describe a quantity that changes at a constant rate.", subject: "subj_math" },
  ],
  formulas: ["exponential-function", "slope-intercept-form"],
  blocks: [
    text(r`Linear functions change by equal differences over equal intervals; exponential functions change by equal factors (ratios) over equal intervals. To classify a table with evenly spaced inputs, compute the differences of the outputs. If they're constant, it's linear. If not, compute the ratios. If those are constant, it's exponential.`),
    example(r`Classify: $x$ = 0, 1, 2, 3 and $y$ = 6, 9, 13.5, 20.25`, [
      [r`\text{differences: } 3,\ 4.5,\ 6.75`, "Not constant: not linear."],
      [r`\text{ratios: } \tfrac{9}{6} = \tfrac{13.5}{9} = \tfrac{20.25}{13.5} = 1.5`, "Constant ratio."],
      [r`y = 6(1.5)^x`, "Exponential with a = 6 and b = 1.5."],
    ]),
    activity("growth-models", { title: "Race a line against an exponential", params: { a: 2, b: 1.5, d: 6, compare: true } }),
    callout("tip", "Try this", r`The line starts ahead by adding 6 each step. Find where the exponential passes it. Then raise $d$ to 10: the crossing moves later but still happens. Can you make a line the exponential never catches with $b > 1$?`, "experiment"),
    example(r`Two salary offers: A pays 40,000 dollars and rises 2,500 dollars per year. B pays 36,000 dollars and rises 6% per year. When does B pay more?`, [
      [r`A(t) = 40000 + 2500t,\quad B(t) = 36000(1.06)^t`, ""],
      [r`t = 5: A = 52{,}500,\ B \approx 48{,}176`, "A is still ahead."],
      [r`t = 12: A = 70{,}000,\ B \approx 72{,}440`, "B has overtaken A."],
      [r`t = 11: A = 67{,}500,\ B \approx 68{,}340`, "Check the year before: B already leads."],
    ], r`Year 10: $A = 65{,}000$ and $B \approx 64{,}470$. So B first pays more in year 11.`),
    example(r`Write an exponential model through $(0, 4)$ and $(3, 32)$`, [
      [r`a = 4`, "The point at x = 0 gives a."],
      [r`32 = 4b^3 \Rightarrow b^3 = 8 \Rightarrow b = 2`, ""],
      [r`y = 4 \cdot 2^x`, r`Compare with the line through the same points: $y = \frac{28}{3}x + 4$.`],
    ]),
    callout("warning", "Equal intervals only", r`Differences and ratios only reveal the pattern if the inputs are evenly spaced. If $x$ jumps from 1 to 2 to 5, compare changes per unit of $x$ instead.`),
    callout("application", "Where this shows up", r`Investments, social media followers and early epidemics grow exponentially, while hourly pay and constant-speed travel grow linearly. Planning for the long term means knowing which one you're dealing with.`),
  ],
  questions: [
    mc(1, r`Which table is exponential? (Inputs 0, 1, 2, 3.)`, ["y: 5, 10, 15, 20", "y: 3, 6, 12, 24", "y: 1, 4, 9, 16", "y: 10, 8, 6, 4"], 1, ["Look for a constant ratio."], r`3, 6, 12, 24 doubles each step: ratio 2.`),
    mc(1, r`Which table is linear? (Inputs 0, 1, 2, 3.)`, ["y: 2, 6, 18, 54", "y: 100, 50, 25, 12.5", "y: 7, 4, 1, −2", "y: 1, 2, 4, 7"], 2, ["Look for a constant difference."], r`7, 4, 1, −2 decreases by 3 each step.`),
    short(2, r`Write an exponential model for $x$ = 0, 1, 2 and $y$ = 50, 40, 32. Use the format y=a(b)^x.`, ["y=50(0.8)^x", "y=50*0.8^x", "y=50(4/5)^x"], ["a is y at x = 0.", "Ratio 40/50."], r`$a = 50$ and $b = 0.8$: $y = 50(0.8)^x$.`),
    num(2, r`An exponential function passes through $(0, 3)$ and $(2, 75)$ and is increasing. What is $b$?`, 5, {}, [r`$75 = 3b^2$.`], r`$b^2 = 25$, so $b = 5$ (it's positive).`),
    mc(2, r`Which grows faster in the long run?`, [r`$f(x) = 1000x$`, r`$g(x) = 0.01(1.1)^x$`, "They grow at the same rate", "It depends only on the starting values"], 1,
      ["Increasing exponentials eventually beat any line."], r`$g$ grows by a factor of 1.1 each step and eventually exceeds any linear function, even one with slope 1000.`),
    num(3, r`Option A gives 100 dollars a day. Option B gives 1 cent on day 1 and doubles daily (day n pays $0.01 \cdot 2^{n-1}$). On what day does B's daily payment first exceed 100 dollars?`, 15, {},
      [r`Solve $0.01 \cdot 2^{n-1} > 100$, so $2^{n-1} > 10{,}000$.`, r`$2^{13} = 8192$, $2^{14} = 16{,}384$.`], r`$n - 1 = 14$, so day 15 pays 163.84 dollars.`, "review"),
  ],
});
