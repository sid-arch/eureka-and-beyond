import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "expected-counts-two-way",
  title: "Expected counts in two-way tables",
  summary: "Compute the counts a two-way table would have if there were no association, (row total × column total) ÷ table total, and the degrees of freedom (r − 1)(c − 1).",
  minutes: 20,
  objectives: [
    "Compute expected counts under the null hypothesis of no association.",
    "Explain why the formula works.",
    "Find degrees of freedom for an r × c table.",
  ],
  concepts: [
    { slug: "chi-square", name: "Chi-square tests", description: "Tests comparing observed counts with expected counts for categorical data.", subject: "subj_math" },
  ],
  blocks: [
    def("Expected count", r`$\text{expected} = \frac{\text{row total} \times \text{column total}}{\text{table total}}$. It's what we'd see if every row had the same distribution across the columns as the table overall.`),
    example(r`100 men and 100 women answer yes or no; 120 say yes in total.`, [
      [r`\text{expected men--yes} = \frac{100 \cdot 120}{200} = 60`, "60% say yes overall, so 60% of the 100 men."],
      [r`\text{men--no} = 40,\ \text{women--yes} = 60,\ \text{women--no} = 40`, "The rest follow from the totals."],
    ]),
    def("Degrees of freedom", r`$df = (r - 1)(c - 1)$ for $r$ rows and $c$ columns: once those cells are filled in, the totals force the rest.`),
    callout("application", "Where this shows up", r`Expected counts are the benchmark for every chi-square test of homogeneity or independence.`),
  ],
  questions: [
    num(1, r`Row total 50, column total 80, table total 200. Find the expected count.`, 20, {}, [], r`$\frac{50 \cdot 80}{200} = 20$.`),
    num(2, r`How many degrees of freedom does a 3 × 4 table have?`, 6, {}, [], r`$2 \cdot 3 = 6$.`),
    mc(2, r`Expected counts represent…`, ["the observed data", "counts if there were no association", "counts in a random sample", "the largest counts"], 1, [], r`They are computed assuming $H_0$.`),
    num(3, r`A 2 × 2 table has total 400; row 1 total 150; column 1 total 240. Find the expected count in row 2, column 1.`, 150, {}, [r`Row 2 total is 250.`], r`$\frac{250 \cdot 240}{400} = 150$.`, "review"),
  ],
});
