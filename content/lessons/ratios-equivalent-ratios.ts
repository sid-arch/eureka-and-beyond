import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ratios-equivalent-ratios",
  title: "Ratios and equivalent ratios",
  summary: "Write ratios three ways, simplify them, and build equivalent ratios with tables and double number lines.",
  minutes: 20,
  objectives: [
    "Write a ratio as a : b, a to b and a/b, and say what it compares.",
    "Simplify a ratio and generate equivalent ratios by multiplying or dividing both parts by the same number.",
    "Use ratio tables and double number lines to solve problems.",
  ],
  concepts: [
    { slug: "ratios", name: "Ratios", description: "A comparison of two quantities by division.", subject: "subj_math" },
  ],
  blocks: [
    def("Ratio", r`A comparison of two quantities, written $a : b$, "$a$ to $b$" or $\frac{a}{b}$. If a class has 12 girls and 15 boys, the ratio of girls to boys is $12 : 15$.`),
    text(r`Order matters: girls to boys is $12 : 15$, but boys to girls is $15 : 12$. A ratio can also compare a part to the whole. Here there are 27 students, so girls to all students is $12 : 27$.`),
    def("Equivalent ratios", r`Ratios that describe the same relationship. Multiplying or dividing both parts by the same nonzero number gives an equivalent ratio: $12 : 15 = 4 : 5 = 8 : 10$.`),
    text(r`A ratio is in simplest form when its parts are whole numbers with no common factor other than 1. To simplify, divide both parts by their greatest common factor. $12 : 15$ has GCF 3, so it simplifies to $4 : 5$: for every 4 girls there are 5 boys.`),
    activity("ratio-line", { title: "Scale a ratio", params: { a: 2, b: 5, k: 1 } }),
    callout("tip", "Try this", r`Set the ratio to $2 : 5$ and move the scale factor. Every vertical pair is equivalent. Which scale factor gives 15 for B? What does the pair at scale factor 0.5 mean?`, "experiment"),
    example(r`Lemonade uses 3 cups of lemon juice for every 8 cups of water. How much juice goes with 20 cups of water?`, [
      [r`\begin{array}{c|c|c|c} \text{juice} & 3 & 1.5 & 7.5 \\ \hline \text{water} & 8 & 4 & 20 \end{array}`, "Make a ratio table. Halve both to get 4 cups of water, then multiply by 5."],
      [r`7.5 \text{ cups of juice}`, "Each column keeps the same ratio."],
    ], r`Check: $\frac{7.5}{20} = 0.375 = \frac{3}{8}$.`),
    example(r`Simplify $1.5 : 4.5$ and $\frac{2}{3} : \frac{5}{6}$`, [
      [r`1.5 : 4.5 = 15 : 45 = 1 : 3`, "Multiply by 10 to clear decimals, then divide by 15."],
      [r`\tfrac{2}{3} : \tfrac{5}{6} = 4 : 5`, "Multiply both parts by 6, the LCD."],
    ]),
    callout("warning", "Adding is not scaling", r`Adding the same amount to both parts does not keep a ratio equivalent. $2 : 3$ and $4 : 5$ are not equivalent, because $\frac{2}{3} \ne \frac{4}{5}$.`),
    callout("application", "Where this shows up", r`Paint mixes, concrete, recipes, screen shapes (a 16 : 9 display) and gear trains all use ratios. Scaling a recipe means using an equivalent ratio for every ingredient.`),
  ],
  questions: [
    short(1, r`A bag has 6 red and 10 blue marbles. Write the ratio of red to blue in simplest form, as a:b.`, ["3:5"], ["Divide both parts by 2."], r`$6 : 10 = 3 : 5$.`),
    short(1, r`Using the same bag, write the ratio of blue marbles to all marbles in simplest form.`, ["5:8"], ["There are 16 marbles in all."], r`$10 : 16 = 5 : 8$.`),
    mc(2, r`Which ratio is equivalent to $4 : 7$?`, [r`$8 : 11$`, r`$12 : 21$`, r`$7 : 4$`, r`$16 : 21$`], 1,
      ["Multiply both parts by the same number."], r`$4 \cdot 3 : 7 \cdot 3 = 12 : 21$.`),
    num(2, r`A recipe uses 2 cups of rice for 3 cups of water. How many cups of water are needed for 5 cups of rice?`, 7.5, { unit: "cups" },
      ["Find the water for 1 cup of rice first."], r`$\frac{3}{2} = 1.5$ cups of water per cup of rice, so $5 \cdot 1.5 = 7.5$ cups.`),
    short(2, r`Simplify $2.4 : 3.6$ to whole numbers in simplest form.`, ["2:3"], ["Multiply by 10: 24 : 36."], r`$24 : 36 = 2 : 3$.`),
    num(2, r`The ratio of cats to dogs at a shelter is $5 : 3$. There are 40 cats. How many dogs are there?`, 24, {}, ["40 is 5 times what number?"], r`The scale factor is $40 \div 5 = 8$, so there are $3 \cdot 8 = 24$ dogs.`),
    num(3, r`A school's ratio of students to teachers is $18 : 1$. The school has 990 students. How many teachers does it have?`, 55, {}, ["990 ÷ 18."], r`$990 \div 18 = 55$ teachers.`),
    num(3, r`Green paint is mixed from blue and yellow in the ratio $2 : 3$. How many liters of blue are in 15 liters of green paint?`, 6, { unit: "L" },
      ["2 + 3 = 5 parts make the whole.", "Each part is 15 ÷ 5 liters."], r`Each part is 3 L, so blue is $2 \cdot 3 = 6$ L (and yellow is 9 L).`, "review"),
  ],
});
