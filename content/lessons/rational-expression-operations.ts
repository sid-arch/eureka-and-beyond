import { callout, example, lesson, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rational-expression-operations",
  title: "Adding, subtracting, multiplying and dividing rational expressions",
  summary: "Perform the four operations on rational expressions using the same rules as fractions, with factoring and least common denominators.",
  minutes: 30,
  objectives: [
    "Multiply and divide rational expressions and simplify.",
    "Find the least common denominator of rational expressions.",
    "Add and subtract rational expressions and simplify complex fractions.",
  ],
  concepts: [
    { slug: "rational-expressions", name: "Rational expressions", description: "Ratios of polynomials, defined where the denominator is not zero.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Rational expressions follow exactly the rules of numeric fractions. Multiply straight across, divide by multiplying by the reciprocal, and add or subtract only over a common denominator. Factor everything first; it makes canceling and finding the LCD easy.`),
    example(r`Multiply $\dfrac{x^2 - 1}{x + 3} \cdot \dfrac{x + 3}{x^2 - x}$`, [
      [r`\frac{(x - 1)(x + 1)}{x + 3} \cdot \frac{x + 3}{x(x - 1)}`, ""],
      [r`\frac{x + 1}{x}`, "Cancel x + 3 and x − 1."],
    ]),
    example(r`Add $\dfrac{3}{x - 2} + \dfrac{5}{x + 1}$`, [
      [r`\text{LCD} = (x - 2)(x + 1)`, ""],
      [r`\frac{3(x + 1) + 5(x - 2)}{(x - 2)(x + 1)} = \frac{8x - 7}{(x - 2)(x + 1)}`, ""],
    ]),
    example(r`Subtract $\dfrac{x}{x^2 - 9} - \dfrac{1}{x + 3}$`, [
      [r`\frac{x - (x - 3)}{(x - 3)(x + 3)}`, "LCD (x − 3)(x + 3). Distribute the subtraction."],
      [r`\frac{3}{(x - 3)(x + 3)}`, ""],
    ]),
    callout("warning", "Subtract the whole numerator", r`When subtracting, put parentheses around the second numerator before distributing the minus sign.`),
    callout("application", "Where this shows up", r`Combined work rates ($\frac{1}{a} + \frac{1}{b}$), resistors in parallel and average speeds over round trips all add rational expressions.`),
  ],
  questions: [
    short(2, r`Multiply $\dfrac{2x}{x + 5} \cdot \dfrac{x + 5}{6}$. Use the format x/3.`, ["x/3"], [], r`$\frac{2x}{6} = \frac{x}{3}$.`),
    short(2, r`Divide $\dfrac{x^2 - 4}{3x} \div \dfrac{x - 2}{6}$. Use the format 2(x+2)/x.`, ["2(x+2)/x", "(2x+4)/x"], [], r`$\frac{(x - 2)(x + 2)}{3x} \cdot \frac{6}{x - 2} = \frac{2(x + 2)}{x}$.`),
    short(2, r`Add $\dfrac{2}{x} + \dfrac{3}{x + 1}$. Use the format (5x+2)/(x(x+1)).`, ["(5x+2)/(x(x+1))", "(5x+2)/(x^2+x)"], [], r`$\frac{2(x + 1) + 3x}{x(x + 1)} = \frac{5x + 2}{x(x + 1)}$.`),
    short(3, r`Simplify $\dfrac{4}{x - 1} - \dfrac{4}{x + 1}$. Use the format 8/((x-1)(x+1)).`, ["8/((x-1)(x+1))", "8/(x^2-1)"], [], r`$\frac{4(x + 1) - 4(x - 1)}{(x - 1)(x + 1)} = \frac{8}{x^2 - 1}$.`, "review"),
  ],
});
