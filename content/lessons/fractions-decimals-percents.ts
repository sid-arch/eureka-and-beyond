import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "fractions-decimals-percents",
  title: "Converting between fractions, decimals and percents",
  summary: "Move fluently between the three ways of writing a part of a whole, including percents above 100% and below 1%.",
  minutes: 20,
  objectives: [
    "Explain a percent as a ratio out of 100.",
    "Convert among fractions, decimals and percents, including mixed numbers and repeating decimals.",
    "Compare quantities given in different forms.",
  ],
  concepts: [
    { slug: "percent", name: "Percent", description: "A ratio that compares a number to 100.", subject: "subj_math" },
  ],
  blocks: [
    def("Percent", r`"Per cent" means "per hundred." $p\%$ means $\frac{p}{100}$. So $37\% = \frac{37}{100} = 0.37$.`),
    text(r`Fractions, decimals and percents are three names for the same number. Which one is most useful depends on the job: fractions are exact, decimals are easy to compute with, and percents make comparisons out of 100 easy.`),
    example(r`Percent to decimal and fraction: $45\%$`, [
      [r`45\% = 0.45`, "Divide by 100: move the decimal point two places left."],
      [r`= \tfrac{45}{100} = \tfrac{9}{20}`, "Write over 100 and simplify by 5."],
    ]),
    example(r`Fraction to percent: $\frac{3}{8}$`, [
      [r`3 \div 8 = 0.375`, "Divide to get a decimal."],
      [r`0.375 \times 100 = 37.5\%`, "Multiply by 100: move the decimal point two places right."],
    ]),
    example(r`Repeating decimal: $\frac{2}{3}$ as a percent`, [
      [r`\tfrac{2}{3} = 0.\overline{6}`, ""],
      [r`0.\overline{6} \times 100 = 66.\overline{6}\% = 66\tfrac{2}{3}\%`, "Keep it exact, or round to 66.7% if a rounded value is fine."],
    ]),
    text(r`Percents can be greater than 100 or less than 1. $250\% = 2.5$ means two and a half times the whole. $0.4\% = 0.004$ is less than one hundredth.`),
    callout("tip", "Benchmarks worth memorizing", r`$\frac{1}{2} = 50\%$, $\frac{1}{4} = 25\%$, $\frac{3}{4} = 75\%$, $\frac{1}{5} = 20\%$, $\frac{1}{10} = 10\%$, $\frac{1}{3} = 33\frac{1}{3}\%$, $\frac{1}{8} = 12.5\%$. Many other conversions build from these.`),
    callout("warning", "Watch the direction", r`Percent to decimal: divide by 100 ($8\% = 0.08$, not 0.8). Decimal to percent: multiply by 100 ($0.8 = 80\%$).`),
    activity("fraction-bars", { title: "Compare two fractions", params: { n1: 3, d1: 5, n2: 5, d2: 8, op: "compare" } }),
    callout("tip", "Try this", r`Compare $\frac{3}{5}$ and $\frac{5}{8}$. Convert both to percents before reading the result. The decimal readouts show 0.6 and 0.625, so $60\% < 62.5\%$.`, "experiment"),
    callout("application", "Where this shows up", r`A test score of 42 out of 48 is $\frac{42}{48} = 0.875 = 87.5\%$. Nutrition labels, sports statistics, interest rates and election results all report parts of a whole as percents.`),
  ],
  questions: [
    num(1, r`Write $64\%$ as a decimal.`, 0.64, {}, ["Divide by 100."], r`$64\% = 0.64$.`),
    num(1, r`Write $0.07$ as a percent. Enter just the number of percent.`, 7, { unit: "%" }, ["Multiply by 100."], r`$0.07 \times 100 = 7\%$.`),
    short(1, r`Write $35\%$ as a fraction in simplest form.`, ["7/20"], [r`$\frac{35}{100}$, then divide by 5.`], r`$\frac{35}{100} = \frac{7}{20}$.`),
    num(2, r`Write $\frac{7}{8}$ as a percent. Enter just the number.`, 87.5, { unit: "%" }, ["7 ÷ 8 = 0.875."], r`$0.875 = 87.5\%$.`),
    num(2, r`Write $1\frac{3}{5}$ as a percent. Enter just the number.`, 160, { unit: "%" }, [r`$1\frac{3}{5} = 1.6$.`], r`$1.6 \times 100 = 160\%$.`),
    num(2, r`Write $0.3\%$ as a decimal.`, 0.003, {}, ["Divide by 100."], r`$0.3 \div 100 = 0.003$.`),
    mc(2, r`Which is greatest?`, [r`$\frac{5}{8}$`, r`$0.6$`, r`$63\%$`, r`$\frac{3}{5}$`], 2,
      ["Convert all to percents."], r`$\frac{5}{8} = 62.5\%$, $0.6 = 60\%$, $63\%$, $\frac{3}{5} = 60\%$. The greatest is $63\%$.`),
    num(3, r`A team won 18 of its 24 games. What percent did it win? Enter just the number.`, 75, { unit: "%" }, [r`$\frac{18}{24} = \frac{3}{4}$.`], r`$\frac{18}{24} = 0.75 = 75\%$.`, "review"),
    short(3, r`Write $12.5\%$ as a fraction in simplest form.`, ["1/8"], [r`$12.5\% = \frac{12.5}{100} = \frac{125}{1000}$.`], r`$\frac{125}{1000} = \frac{1}{8}$.`, "review"),
  ],
});
