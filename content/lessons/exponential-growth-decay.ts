import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "exponential-growth-decay",
  title: "Exponential growth and decay",
  summary: "Model quantities that change by a constant percent with y = a·bˣ, identify growth and decay factors, and apply them to populations, money and depreciation.",
  minutes: 30,
  objectives: [
    "Identify the initial value and growth or decay factor in y = a·bˣ.",
    "Convert between a percent rate and a growth or decay factor.",
    "Write and use exponential models, including compound interest and half-life.",
  ],
  concepts: [
    { slug: "exponential-functions", name: "Exponential functions", description: "Functions of the form y = a·bˣ that change by a constant factor.", subject: "subj_math" },
  ],
  formulas: ["exponential-function"],
  blocks: [
    text(r`A linear function adds the same amount each step. An exponential function multiplies by the same factor each step. A town of 5,000 people growing 4% a year gains 200 people the first year, 208 the next, then 216.32: the amount added keeps growing because each 4% is taken of a larger population.`),
    formula(r`y = a \cdot b^x`, "Exponential function", r`$a$ is the initial value ($y$ at $x = 0$) and $b > 0$, $b \neq 1$, is the factor for each unit of $x$. $b > 1$: growth. $0 < b < 1$: decay.`),
    def("Percent rate and factor", r`Growth by $r$ (as a decimal) per step: $b = 1 + r$. Decay by $r$ per step: $b = 1 - r$. A 4% increase is $b = 1.04$; a 15% decrease is $b = 0.85$.`),
    activity("growth-models", { title: "Change the factor", params: { a: 5, b: 1.2, d: 2, compare: false } }),
    callout("tip", "Try this", r`Start at 5 with factor 1.2. Then try 0.8. Which values of $b$ make the curve rise and which make it fall? What happens exactly at $b = 1$?`, "experiment"),
    example(r`A town has 5,000 people and grows 4% per year. Model the population and find it after 10 years.`, [
      [r`P(t) = 5000(1.04)^t`, "a = 5000, b = 1 + 0.04."],
      [r`P(10) = 5000(1.04)^{10} \approx 7401`, r`$1.04^{10} \approx 1.4802$.`],
    ], "Linear growth of 200 per year would give only 7,000. The extra 401 comes from growth on growth."),
    example(r`A car bought for 28,000 dollars loses 15% of its value each year. What is it worth after 4 years?`, [
      [r`V(t) = 28000(0.85)^t`, "Decay factor 1 − 0.15."],
      [r`V(4) = 28000(0.85)^4 \approx 14{,}616`, r`$0.85^4 \approx 0.5220$.`],
    ]),
    example(r`A 1,000-dollar deposit earns 6% interest compounded monthly. Find the balance after 5 years.`, [
      [r`A = 1000\left(1 + \tfrac{0.06}{12}\right)^{12 \cdot 5}`, "Rate per month is 0.06/12 = 0.005, and there are 60 months."],
      [r`= 1000(1.005)^{60} \approx 1348.85`, ""],
    ], "Simple interest at 6% would give 1,300 dollars; compounding adds 48.85 dollars."),
    example(r`A medicine has a half-life of 6 hours. Of a 400 mg dose, how much remains after 24 hours?`, [
      [r`M(t) = 400\left(\tfrac{1}{2}\right)^{t/6}`, "It halves once every 6 hours."],
      [r`M(24) = 400\left(\tfrac{1}{2}\right)^4 = 25 \text{ mg}`, "24 hours is 4 half-lives."],
    ]),
    callout("warning", "Rate vs factor", r`Growth of 3% means multiply by 1.03, not by 0.03 and not by 3. Decay of 20% means multiply by 0.80. Writing $y = a(0.20)^x$ would mean losing 80% each step.`),
    callout("application", "Where this shows up", r`Savings and loans, populations, viral video views, carbon-14 dating, cooling and the spread of disease early in an outbreak are modeled with exponential functions.`),
  ],
  questions: [
    mc(1, r`Which function models exponential decay?`, [r`$y = 3(1.5)^x$`, r`$y = 0.5(2)^x$`, r`$y = 8(0.75)^x$`, r`$y = 2x + 5$`], 2, ["Look for a factor between 0 and 1."], r`$b = 0.75$ is between 0 and 1, so $y = 8(0.75)^x$ decays.`),
    num(1, r`What is the growth factor for a 7% annual increase?`, 1.07, {}, ["b = 1 + r."], r`$1 + 0.07 = 1.07$.`),
    num(2, r`What percent does $y = 200(0.92)^t$ decrease by each step? Enter just the number.`, 8, { unit: "%" }, ["1 − 0.92."], r`$1 - 0.92 = 0.08$, an 8% decrease.`),
    num(2, r`A bacteria culture starts with 300 cells and doubles every hour. How many cells after 5 hours?`, 9600, {}, [r`$300 \cdot 2^5$.`], r`$300 \cdot 32 = 9600$ cells.`),
    num(2, r`A laptop costs 1,200 dollars and loses 20% of its value each year. What is it worth after 3 years, in dollars?`, 614.4, { unit: "dollars" }, [r`$1200(0.8)^3$.`], r`$1200 \cdot 0.512 = 614.40$ dollars.`),
    num(3, r`2,500 dollars is invested at 4% interest compounded annually. To the nearest cent, what is the balance after 8 years?`, 3421.42, { unit: "dollars", tolerance: 0.01 }, [r`$2500(1.04)^8$.`, r`$1.04^8 \approx 1.368569$.`], r`$2500 \cdot 1.3685690504 \approx 3421.42$ dollars.`),
    num(3, r`A radioactive sample of 80 g has a half-life of 5 days. How many grams remain after 15 days?`, 10, { unit: "g" }, ["15 days is 3 half-lives."], r`$80 \cdot \left(\frac{1}{2}\right)^3 = 10$ g.`, "review"),
  ],
});
