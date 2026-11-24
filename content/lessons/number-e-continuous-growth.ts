import { activity, callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "number-e-continuous-growth",
  title: "The number e and continuous growth",
  summary: "See e emerge from compounding more and more often, use A = Pe^{rt} for continuous growth and decay, and compare compounding frequencies.",
  minutes: 25,
  objectives: [
    "Explain e as the limit of (1 + 1/n)^n as n grows.",
    "Use A = P(1 + r/n)^{nt} and A = Pe^{rt}.",
    "Model continuous growth and decay and compare with discrete compounding.",
  ],
  concepts: [
    { slug: "exponential-functions", name: "Exponential functions", description: "Functions of the form y = a·bˣ that change by a constant factor.", subject: "subj_math" },
  ],
  formulas: ["continuous-growth"],
  blocks: [
    text(r`Put 1 dollar in an account paying 100% a year. Compounded once: 2 dollars. Twice (50% each half-year): $1.5^2 = 2.25$. Monthly: $(1 + \frac{1}{12})^{12} \approx 2.613$. Daily: $\approx 2.7146$. Compounding ever more often, the amount approaches a limit, $e \approx 2.71828$.`),
    def("The number e", r`$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n \approx 2.71828$. It's irrational, like $\pi$. Continuous compounding at rate $r$ for $t$ years multiplies the principal by $e^{rt}$.`),
    example(r`5,000 dollars at 4% for 10 years: compare monthly and continuous compounding`, [
      [r`5000\left(1 + \tfrac{0.04}{12}\right)^{120} \approx 7454.16`, "Monthly."],
      [r`5000e^{0.4} \approx 7459.12`, "Continuous: only about 5 dollars more."],
    ]),
    example(r`A drug decays continuously at 12% per hour. Of 200 mg, how much remains after 5 hours?`, [
      [r`A = 200e^{-0.12 \cdot 5} = 200e^{-0.6}`, ""],
      [r`\approx 200(0.5488) \approx 109.8 \text{ mg}`, ""],
    ]),
    activity("exp-log", { title: "The base e", params: { b: 2.7 } }),
    callout("tip", "Try this", r`With base about 2.7, the exponential curve's slope at $x = 0$ is about 1, which is the property that makes $e$ special in calculus. Its inverse is the natural logarithm, $\ln x$.`, "experiment"),
    callout("application", "Where this shows up", r`Continuous models describe population growth, radioactive decay, cooling, and interest in finance. $e$ shows up throughout calculus, probability and physics.`),
  ],
  questions: [
    num(1, r`Evaluate $e^2$ to two decimals.`, 7.39, { tolerance: 0.006 }, [], r`$e^2 \approx 7.39$.`),
    num(2, r`1,000 dollars grows continuously at 5% for 8 years. Find the balance to the nearest cent.`, 1491.82, { tolerance: 0.01, unit: "dollars" }, [r`$1000e^{0.4}$.`], r`$1000(1.491825) \approx 1491.82$.`),
    num(2, r`2,000 dollars at 6% compounded quarterly for 5 years. Find the balance to the nearest cent.`, 2693.71, { tolerance: 0.01, unit: "dollars" }, [r`$2000(1.015)^{20}$.`], r`$2000(1.346855) \approx 2693.71$.`),
    num(3, r`A population of 800 grows continuously at 3% per year. What is it after 20 years, to the nearest whole number?`, 1458, { tolerance: 0.5 }, [r`$800e^{0.6}$.`], r`$800(1.822119) \approx 1458$.`, "review"),
  ],
});
