import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "operations-with-fractions",
  title: "Operations with fractions",
  summary: "Add and subtract fractions with a common denominator, multiply straight across, and divide by multiplying by the reciprocal, including mixed numbers and negatives.",
  minutes: 30,
  objectives: [
    "Add and subtract fractions and mixed numbers using a least common denominator.",
    "Multiply fractions and simplify before or after multiplying.",
    "Divide fractions by multiplying by the reciprocal, and explain why it works.",
  ],
  concepts: [
    { slug: "fraction-operations", name: "Fraction operations", description: "Adding, subtracting, multiplying and dividing fractions and mixed numbers.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A fraction $\frac{a}{b}$ means $a$ pieces, each of size $\frac{1}{b}$. You can only add or subtract pieces that are the same size, so fractions need a common denominator first. Multiplying and dividing do not need one.`),
    def("Least common denominator (LCD)", r`The least common multiple of the denominators. For $\frac{1}{6}$ and $\frac{3}{8}$ the LCD is 24, because 24 is the smallest number both 6 and 8 divide into.`),
    activity("fraction-bars", { title: "Why a common denominator?", params: { n1: 1, d1: 2, n2: 1, d2: 3, op: "add" } }),
    callout("tip", "Try this", r`Add $\frac{1}{2} + \frac{1}{3}$ in the simulation, then change the second fraction to $\frac{2}{6}$. The thin cells change size but the shaded length stays the same. That's why rewriting with a common denominator doesn't change the value.`, "experiment"),
    example(r`Evaluate $\frac{5}{6} - \frac{3}{8}$`, [
      [r`\tfrac{5}{6} = \tfrac{20}{24},\quad \tfrac{3}{8} = \tfrac{9}{24}`, "LCD of 6 and 8 is 24. Multiply top and bottom by the same factor."],
      [r`\tfrac{20}{24} - \tfrac{9}{24} = \tfrac{11}{24}`, "Same-size pieces: subtract the numerators, keep the denominator."],
    ], r`$\frac{11}{24} \approx 0.458$, and $0.833 - 0.375 = 0.458$.`),
    def("Multiplying fractions", r`$\dfrac{a}{b} \cdot \dfrac{c}{d} = \dfrac{ac}{bd}$. Multiply numerators and multiply denominators. "Of" usually means multiply: $\frac{2}{3}$ of $\frac{3}{4}$ is $\frac{2}{3} \cdot \frac{3}{4} = \frac{6}{12} = \frac{1}{2}$.`),
    def("Dividing fractions", r`$\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{a}{b} \cdot \dfrac{d}{c}$, where $c \ne 0$. Dividing by a number is the same as multiplying by its reciprocal.`),
    text(r`Why does flipping work? $3 \div \frac{1}{4}$ asks how many quarters fit in 3. Four quarters fit in each whole, so 12 fit in 3, and $3 \cdot 4 = 12$. In general, multiplying $\frac{c}{d}$ by $\frac{d}{c}$ gives 1, so multiplying by the reciprocal undoes the division.`),
    example(r`Evaluate $2\frac{1}{4} \div \left(-\frac{3}{5}\right)$`, [
      [r`2\tfrac{1}{4} = \tfrac{9}{4}`, "Convert the mixed number: 2 · 4 + 1 = 9 quarters."],
      [r`\tfrac{9}{4} \cdot \left(-\tfrac{5}{3}\right)`, "Multiply by the reciprocal of −3/5."],
      [r`\tfrac{\cancel{9}^{\,3}}{4} \cdot \left(-\tfrac{5}{\cancel{3}_{\,1}}\right) = -\tfrac{15}{4}`, "Simplify 9 and 3 first, then multiply. Different signs: negative."],
      [r`-\tfrac{15}{4} = -3\tfrac{3}{4}`, "Write as a mixed number if asked."],
    ], r`Estimate: $2.25 \div 0.6 \approx 3.75$, and the sign is negative.`),
    example(r`Evaluate $3\frac{2}{3} + 1\frac{5}{6}$`, [
      [r`3\tfrac{4}{6} + 1\tfrac{5}{6}`, "LCD is 6."],
      [r`4\tfrac{9}{6}`, "Add whole parts and fraction parts."],
      [r`4 + 1\tfrac{3}{6} = 5\tfrac{1}{2}`, "9/6 is more than a whole: 1 and 3/6."],
    ]),
    callout("warning", "Common mistakes", r`Never add denominators: $\frac{1}{2} + \frac{1}{3} \ne \frac{2}{5}$. Do not find a common denominator to multiply. And when dividing, flip only the second fraction (the divisor).`),
    callout("application", "Where this shows up", r`A recipe calls for $\frac{3}{4}$ cup of flour and you want to make $2\frac{1}{2}$ batches: $\frac{3}{4} \cdot \frac{5}{2} = \frac{15}{8} = 1\frac{7}{8}$ cups. A board $7\frac{1}{2}$ feet long cut into $\frac{3}{4}$-foot pieces gives $\frac{15}{2} \div \frac{3}{4} = 10$ pieces.`),
  ],
  questions: [
    short(1, r`Evaluate $\frac{2}{5} + \frac{1}{4}$. Give a fraction in simplest form, a/b.`, ["13/20"], ["The LCD of 5 and 4 is 20."], r`$\frac{8}{20} + \frac{5}{20} = \frac{13}{20}$.`),
    short(1, r`Evaluate $\frac{4}{9} \cdot \frac{3}{8}$ in simplest form.`, ["1/6"], ["Simplify 4 with 8 and 3 with 9 before multiplying."], r`$\frac{4 \cdot 3}{9 \cdot 8} = \frac{12}{72} = \frac{1}{6}$.`),
    short(2, r`Evaluate $\frac{5}{6} \div \frac{10}{9}$ in simplest form.`, ["3/4"], ["Multiply by the reciprocal of 10/9."], r`$\frac{5}{6} \cdot \frac{9}{10} = \frac{45}{60} = \frac{3}{4}$.`),
    short(2, r`Evaluate $-\frac{3}{4} + \frac{1}{6}$ in simplest form.`, ["-7/12"], ["LCD is 12.", r`$-\frac{9}{12} + \frac{2}{12}$.`], r`$-\frac{9}{12} + \frac{2}{12} = -\frac{7}{12}$.`),
    num(2, r`Evaluate $4\frac{1}{2} - 2\frac{2}{3}$. Enter a fraction or mixed-number value as a fraction, such as 11/6.`, 11 / 6, { tolerance: 1e-6 },
      [r`Convert to improper fractions: $\frac{9}{2} - \frac{8}{3}$.`, "LCD is 6."], r`$\frac{27}{6} - \frac{16}{6} = \frac{11}{6} = 1\frac{5}{6}$.`),
    mc(2, r`Which is equal to $\frac{2}{3} \div 4$?`, [r`$\frac{8}{3}$`, r`$\frac{1}{6}$`, r`$\frac{2}{12} \cdot 4$`, r`$\frac{3}{8}$`], 1,
      [r`$4 = \frac{4}{1}$; its reciprocal is $\frac{1}{4}$.`], r`$\frac{2}{3} \cdot \frac{1}{4} = \frac{2}{12} = \frac{1}{6}$.`),
    num(2, r`A ribbon is $6\frac{3}{4}$ feet long. How many pieces $\frac{3}{8}$ foot long can be cut from it?`, 18, {},
      [r`Divide: $\frac{27}{4} \div \frac{3}{8}$.`], r`$\frac{27}{4} \cdot \frac{8}{3} = \frac{216}{12} = 18$ pieces.`),
    num(3, r`Evaluate $\left(\frac{1}{2} - \frac{5}{6}\right) \div \left(-\frac{2}{9}\right)$.`, 1.5, {},
      [r`Inside the parentheses: $\frac{3}{6} - \frac{5}{6} = -\frac{1}{3}$.`, r`Then $-\frac{1}{3} \cdot \left(-\frac{9}{2}\right)$.`], r`$-\frac{1}{3} \cdot -\frac{9}{2} = \frac{9}{6} = \frac{3}{2} = 1.5$.`, "review"),
    mc(2, r`A student wrote $\frac{3}{5} + \frac{1}{5} = \frac{4}{10}$. What is the correct sum and the error?`, [
      r`$\frac{4}{10}$; no error`, r`$\frac{4}{5}$; denominators should not be added`, r`$\frac{3}{25}$; denominators should be multiplied`, r`$\frac{2}{5}$; numerators should be subtracted`,
    ], 1, ["Three fifths plus one fifth is how many fifths?"], r`The pieces are fifths, so 3 fifths + 1 fifth = 4 fifths, $\frac{4}{5}$. The denominator names the size of the pieces and stays the same.`, "review"),
  ],
});
