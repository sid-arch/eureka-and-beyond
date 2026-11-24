import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "unit-rates",
  title: "Unit rates and unit pricing",
  summary: "Find unit rates, including rates with fractions, and use unit prices to compare deals.",
  minutes: 20,
  objectives: [
    "Distinguish a rate from a ratio and find a unit rate.",
    "Compute unit rates involving fractions and decimals.",
    "Use unit prices to decide which option is the better buy.",
  ],
  concepts: [
    { slug: "unit-rate", name: "Unit rate", description: "A rate expressed per one unit of the second quantity.", subject: "subj_math" },
  ],
  blocks: [
    def("Rate", r`A ratio that compares two quantities measured in different units, such as 150 miles per 3 hours or 4 dollars for 5 pounds.`),
    def("Unit rate", r`A rate with a denominator of 1 unit. Divide the first quantity by the second: $\frac{150 \text{ mi}}{3 \text{ h}} = 50$ miles per hour.`),
    text(r`Unit rates make comparisons easy because everything is measured "per one." Unit price, the cost per ounce or per item, is the unit rate stores use to compare packages of different sizes.`),
    example(r`Which is the better buy: 18 oz of cereal for 4.29 dollars, or 26 oz for 5.99 dollars?`, [
      [r`\frac{4.29}{18} \approx 0.238 \text{ dollars/oz}`, "Unit price of the small box."],
      [r`\frac{5.99}{26} \approx 0.230 \text{ dollars/oz}`, "Unit price of the large box."],
      [r`0.230 < 0.238`, "The 26-oz box costs less per ounce."],
    ], "The large box is the better buy by about 0.8 cents per ounce, as long as you will use it all."),
    example(r`A painter covers $\frac{3}{4}$ of a wall in $\frac{1}{2}$ hour. How much wall does she paint per hour?`, [
      [r`\frac{3/4}{1/2} = \frac{3}{4} \div \frac{1}{2}`, "Divide the amount of wall by the time."],
      [r`= \frac{3}{4} \cdot 2 = \frac{3}{2}`, "Multiply by the reciprocal."],
      [r`1\tfrac{1}{2} \text{ walls per hour}`, ""],
    ], r`Check: in half an hour she would paint half of $1\frac{1}{2}$, which is $\frac{3}{4}$. ✓`),
    activity("ratio-line", { title: "Read a unit rate", params: { a: 4, b: 10, k: 0.25 } }),
    callout("tip", "Try this", r`The base ratio is 4 pounds for 10 dollars. Slide the scale factor to 0.25. What price goes with 1 pound? That is the unit price. Now find the price of 7 pounds.`, "experiment"),
    callout("warning", "Which way to divide?", r`"Dollars per pound" means dollars ÷ pounds. "Pounds per dollar" means pounds ÷ dollars. Both are unit rates, but they answer different questions. Read the units in the question.`),
    callout("application", "Where this shows up", r`Speed (miles per hour), fuel economy (miles per gallon), wages (dollars per hour), heart rate (beats per minute) and data plans (dollars per gigabyte) are all unit rates.`),
  ],
  questions: [
    num(1, r`A car travels 210 miles in 3.5 hours. What is its average speed in miles per hour?`, 60, { unit: "mph" }, ["Divide miles by hours."], r`$210 \div 3.5 = 60$ mph.`),
    num(1, r`A 12-pack of water costs 4.20 dollars. What is the price per bottle, in dollars?`, 0.35, { unit: "dollars" }, ["Divide the cost by 12."], r`$4.20 \div 12 = 0.35$ dollars.`),
    mc(2, r`Which is the better buy?`, ["5 lb of apples for 6.45 dollars", "3 lb of apples for 3.99 dollars", "They cost the same per pound", "Not enough information"], 0,
      ["Find the price per pound for each."], r`$6.45 \div 5 = 1.29$ and $3.99 \div 3 = 1.33$ dollars per pound. The 5-lb bag is cheaper per pound.`),
    num(2, r`Maria earns 93.50 dollars for 8.5 hours of work. What is her hourly wage, in dollars?`, 11, { unit: "dollars/h" }, ["Divide pay by hours."], r`$93.50 \div 8.5 = 11$ dollars per hour.`),
    num(2, r`A snail moves $\frac{2}{5}$ of a meter in $\frac{2}{3}$ of a minute. What is its speed in meters per minute? Enter a decimal or a fraction.`, 0.6, {},
      [r`$\frac{2}{5} \div \frac{2}{3}$.`], r`$\frac{2}{5} \cdot \frac{3}{2} = \frac{6}{10} = \frac{3}{5} = 0.6$ m per minute.`),
    num(2, r`A printer prints 45 pages in 3 minutes. At that rate, how many pages does it print in 20 minutes?`, 300, {}, ["Find pages per minute first."], r`$45 \div 3 = 15$ pages per minute, and $15 \times 20 = 300$ pages.`),
    num(3, r`A 64-oz jug of juice costs 3.84 dollars and a 48-oz jug costs 3.12 dollars. How many cents per ounce do you save by buying the 64-oz jug?`, 0.5, { unit: "cents" },
      ["Find each unit price in cents.", r`$384 \div 64$ and $312 \div 48$.`], r`$384 \div 64 = 6$ cents/oz and $312 \div 48 = 6.5$ cents/oz. You save $0.5$ cents per ounce.`, "review"),
    num(3, r`A faucet fills a 5-gallon bucket in 1 minute 15 seconds. What is the flow rate in gallons per minute?`, 4, { unit: "gal/min" }, ["1 minute 15 seconds is 1.25 minutes."], r`$5 \div 1.25 = 4$ gallons per minute.`, "review"),
  ],
});
