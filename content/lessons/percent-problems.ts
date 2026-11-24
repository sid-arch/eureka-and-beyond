import { callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "percent-problems",
  title: "Percent problems: tax, discount and percent change",
  summary: "Find a percent of a number, the whole from a part, and percent increase or decrease, then apply them to tax, tips, discounts and markups.",
  minutes: 30,
  objectives: [
    "Solve the three basic percent problems with the equation part = percent × whole.",
    "Compute sales tax, tips, discounts and markups, including with multipliers like 1.08 and 0.75.",
    "Find percent increase and decrease and explain why successive percent changes do not simply add.",
  ],
  concepts: [
    { slug: "percent-change", name: "Percent change", description: "Change relative to the original amount, expressed as a percent.", subject: "subj_math" },
  ],
  formulas: ["percent-change"],
  blocks: [
    text(r`Almost every percent problem is one equation: $\text{part} = \text{percent} \times \text{whole}$, with the percent written as a decimal. Two of the three quantities are given, and you solve for the third.`),
    example(r`Three kinds of question`, [
      [r`\text{What is } 15\% \text{ of } 80?\quad 0.15 \times 80 = 12`, "Unknown part."],
      [r`18 \text{ is what percent of } 72?\quad 18 = p \times 72 \Rightarrow p = 0.25 = 25\%`, "Unknown percent."],
      [r`42 \text{ is } 60\% \text{ of what?}\quad 42 = 0.6w \Rightarrow w = 70`, "Unknown whole."],
    ]),
    def("Multiplier", r`Increasing by $p\%$ multiplies by $1 + \frac{p}{100}$, and decreasing by $p\%$ multiplies by $1 - \frac{p}{100}$. An 8% sales tax multiplies the price by 1.08; a 25% discount multiplies it by 0.75.`),
    example(r`A 64-dollar jacket is 30% off, and then 7.5% sales tax is added. What is the final price?`, [
      [r`64 \times 0.70 = 44.80`, "30% off leaves 70% of the price."],
      [r`44.80 \times 1.075 = 48.16`, "Tax adds 7.5%."],
    ], "Estimate: about 45 after the discount, plus a bit under 4 in tax, so about 48."),
    formula(r`\text{percent change} = \frac{\text{new} - \text{original}}{\text{original}} \times 100\%`, "Percent change", "A positive result is an increase; a negative result is a decrease. Always divide by the original amount."),
    example(r`A town's population went from 12,500 to 11,750. Find the percent change.`, [
      [r`\frac{11{,}750 - 12{,}500}{12{,}500} = \frac{-750}{12{,}500}`, "New minus original, over original."],
      [r`= -0.06 = -6\%`, "A 6% decrease."],
    ]),
    callout("warning", "Percent changes don't add", r`A price that rises 20% and then falls 20% does not return to where it started. $100 \times 1.2 = 120$, then $120 \times 0.8 = 96$: a 4% net loss. The second percent is taken of a different amount.`),
    example(r`After a 15% raise, Lena earns 20.70 dollars an hour. What did she earn before?`, [
      [r`1.15w = 20.70`, "The new wage is 115% of the old one."],
      [r`w = 20.70 \div 1.15 = 18`, ""],
    ], r`Check: $18 \times 1.15 = 20.70$. ✓ Subtracting 15% of 20.70 instead would give 17.60, which is wrong because the 15% was of the old wage.`),
    callout("application", "Where this shows up", r`Receipts (tax and tips), store sales, interest on savings, grade changes and news reports ("prices rose 3.2% this year") all use percent change. Simple interest is $I = Prt$: 500 dollars at 4% per year for 3 years earns $500 \times 0.04 \times 3 = 60$ dollars.`),
  ],
  questions: [
    num(1, r`What is 35% of 240?`, 84, {}, ["Multiply 0.35 by 240."], r`$0.35 \times 240 = 84$.`),
    num(1, r`27 is what percent of 90? Enter just the number.`, 30, { unit: "%" }, ["Divide 27 by 90."], r`$27 \div 90 = 0.3 = 30\%$.`),
    num(2, r`45 is 75% of what number?`, 60, {}, [r`$45 = 0.75w$.`], r`$w = 45 \div 0.75 = 60$.`),
    num(2, r`A meal costs 46 dollars. What is the total with an 18% tip?`, 54.28, { unit: "dollars", tolerance: 0.005 }, ["Multiply by 1.18."], r`$46 \times 1.18 = 54.28$ dollars.`),
    num(2, r`A game's price falls from 60 dollars to 45 dollars. What is the percent decrease? Enter a positive number.`, 25, { unit: "%" },
      ["Change is 15 dollars; divide by the original."], r`$\frac{15}{60} = 0.25$, a 25% decrease.`),
    num(2, r`A store marks up a 32-dollar item by 40%. What is the selling price?`, 44.8, { unit: "dollars" }, ["Multiply by 1.40."], r`$32 \times 1.4 = 44.80$ dollars.`),
    mc(3, r`A price is increased by 10% and then the new price is increased by 10% again. What is the total percent increase?`, ["20%", "21%", "19%", "11%"], 1,
      [r`Multiply by 1.1 twice: $1.1^2$.`], r`$1.1 \times 1.1 = 1.21$, a 21% increase. The second 10% is taken of a larger amount.`),
    num(3, r`After a 20% discount, a bike costs 228 dollars. What was the original price?`, 285, { unit: "dollars" },
      ["The sale price is 80% of the original."], r`$0.8p = 228$, so $p = 285$ dollars. Check: $285 \times 0.8 = 228$.`, "review"),
    num(3, r`Find the simple interest earned on 1,200 dollars at 3.5% per year for 4 years.`, 168, { unit: "dollars" }, [r`$I = Prt$ with $r = 0.035$.`], r`$1200 \times 0.035 \times 4 = 168$ dollars.`, "review"),
  ],
});
