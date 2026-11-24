import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-proportions",
  title: "Solving proportions",
  summary: "Decide whether two ratios form a proportion, solve proportions with cross products, and recognize proportional relationships in tables and graphs.",
  minutes: 25,
  objectives: [
    "Test whether two ratios are proportional.",
    "Solve a proportion for an unknown using equivalent ratios or cross products.",
    "Recognize a proportional relationship as y = kx and find the constant of proportionality.",
  ],
  concepts: [
    { slug: "proportions", name: "Proportions", description: "Equations stating that two ratios are equal.", subject: "subj_math" },
    { slug: "constant-of-proportionality", name: "Constant of proportionality", description: "The constant ratio k = y/x in a proportional relationship y = kx.", subject: "subj_math" },
  ],
  blocks: [
    def("Proportion", r`An equation stating that two ratios are equal, such as $\dfrac{3}{4} = \dfrac{9}{12}$.`),
    def("Cross products", r`For $b \ne 0$ and $d \ne 0$, $\dfrac{a}{b} = \dfrac{c}{d}$ exactly when $ad = bc$.`),
    text(r`Why do cross products work? Multiply both sides of $\frac{a}{b} = \frac{c}{d}$ by $bd$. The left side becomes $ad$ and the right side becomes $bc$. This is just the multiplication property of equality, so it is safe whenever neither denominator is zero.`),
    example(r`Solve $\dfrac{x}{15} = \dfrac{4}{6}$`, [
      [r`6x = 4 \cdot 15`, "Cross products."],
      [r`6x = 60`, ""],
      [r`x = 10`, "Divide by 6."],
    ], r`Check: $\frac{10}{15} = \frac{2}{3}$ and $\frac{4}{6} = \frac{2}{3}$. ✓`),
    example(r`Solve $\dfrac{3}{x + 2} = \dfrac{5}{x + 6}$`, [
      [r`3(x + 6) = 5(x + 2)`, "Cross products. Keep the binomials in parentheses."],
      [r`3x + 18 = 5x + 10`, "Distribute."],
      [r`8 = 2x \Rightarrow x = 4`, "Subtract 3x and 10 from both sides."],
    ], r`Check: $\frac{3}{6} = \frac{1}{2}$ and $\frac{5}{10} = \frac{1}{2}$. ✓`),
    def("Proportional relationship", r`Two quantities are proportional if their ratio is always the same constant $k$: $\frac{y}{x} = k$, or $y = kx$. Its graph is a straight line through the origin.`),
    example(r`Is this table proportional? $x$: 2, 5, 8; $y$: 7, 17.5, 28`, [
      [r`\tfrac{7}{2} = 3.5,\ \tfrac{17.5}{5} = 3.5,\ \tfrac{28}{8} = 3.5`, "Compute y ÷ x for each pair."],
      [r`y = 3.5x`, "The ratio is constant, so it is proportional with k = 3.5."],
    ]),
    callout("warning", "Not every linear pattern is proportional", r`A taxi that charges 3 dollars plus 2 dollars per mile has costs 5, 7, 9 for 1, 2, 3 miles. The ratios $\frac{5}{1}, \frac{7}{2}, \frac{9}{3}$ are not equal, so cost is not proportional to distance. Its graph is a line that does not go through the origin.`),
    callout("application", "Where this shows up", r`Map scales, currency exchange, dosage by body weight and converting units are all proportions. If 1 inch represents 25 miles, then 3.4 inches represents $3.4 \times 25 = 85$ miles.`),
  ],
  questions: [
    mc(1, r`Which pair of ratios forms a proportion?`, [r`$\frac{2}{3}, \frac{6}{8}$`, r`$\frac{4}{10}, \frac{6}{15}$`, r`$\frac{5}{7}, \frac{7}{9}$`, r`$\frac{3}{5}, \frac{5}{3}$`], 1,
      ["Compare the cross products."], r`$4 \cdot 15 = 60$ and $10 \cdot 6 = 60$, so $\frac{4}{10} = \frac{6}{15}$.`),
    num(1, r`Solve $\dfrac{7}{x} = \dfrac{21}{30}$.`, 10, {}, ["Cross multiply: 21x = 210."], r`$21x = 210$, so $x = 10$.`),
    num(2, r`Solve $\dfrac{n}{8} = \dfrac{15}{12}$.`, 10, {}, [r`$12n = 120$.`], r`$n = 10$. Check: $\frac{10}{8} = 1.25 = \frac{15}{12}$.`),
    num(2, r`Solve $\dfrac{2.5}{4} = \dfrac{x}{10}$.`, 6.25, {}, [r`$4x = 25$.`], r`$x = \frac{25}{4} = 6.25$.`),
    num(2, r`Five notebooks cost 8.75 dollars. At the same price, how much do 8 notebooks cost?`, 14, { unit: "dollars" },
      [r`Set up $\frac{5}{8.75} = \frac{8}{c}$.`], r`$5c = 70$, so $c = 14$ dollars.`),
    num(3, r`Solve $\dfrac{x - 1}{4} = \dfrac{x + 5}{10}$.`, 5, {}, ["Cross multiply: 10(x − 1) = 4(x + 5).", "10x − 10 = 4x + 20."], r`$6x = 30$, $x = 5$. Check: $\frac{4}{4} = 1$ and $\frac{10}{10} = 1$.`),
    num(2, r`A relationship is proportional with $y = 18$ when $x = 4$. What is $y$ when $x = 10$?`, 45, {}, ["Find k = y/x."], r`$k = 18 \div 4 = 4.5$, so $y = 4.5 \cdot 10 = 45$.`, "review"),
    short(3, r`A gym charges a 20-dollar fee plus 10 dollars per class. Is the total cost proportional to the number of classes? Answer yes or no.`, ["no"], ["Compare cost ÷ classes for 1 and 2 classes."], r`1 class costs 30 (ratio 30) and 2 classes cost 40 (ratio 20). The ratio changes, so it is not proportional; the fixed fee means the graph does not pass through the origin.`, "review"),
  ],
});
