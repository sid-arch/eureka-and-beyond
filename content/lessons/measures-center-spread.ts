import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "measures-center-spread",
  title: "Measures of center and spread",
  summary: "Compute and compare mean, median, IQR and standard deviation, see which are resistant to outliers, and pick appropriate measures for a data set's shape.",
  minutes: 30,
  objectives: [
    "Compute the mean, median, range, interquartile range and standard deviation of a data set.",
    "Explain which measures are resistant to outliers and why.",
    "Choose and justify measures of center and spread based on a distribution's shape, and compare two data sets.",
  ],
  concepts: [
    { slug: "measures-of-center", name: "Measures of center", description: "Single values (mean, median, mode) that describe a typical value of a data set.", subject: "subj_math" },
    { slug: "standard-deviation", name: "Standard deviation", description: "A measure of the typical distance of data values from the mean.", subject: "subj_math" },
  ],
  formulas: ["mean"],
  blocks: [
    text(r`A data summary needs two things: a typical value (center) and how much values vary (spread). Two classes can both average 75 on a test, but if one class's scores range from 70 to 80 and the other's from 40 to 100, they are very different classes.`),
    def("Interquartile range (IQR)", r`$Q_3 - Q_1$: the spread of the middle half of the data. Because it ignores the lowest and highest quarters, it is resistant to outliers, just like the median.`),
    formula(r`\sigma = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n}}`, "Standard deviation (population)", r`The typical distance of the values from the mean. For a sample, statisticians usually divide by $n - 1$ instead of $n$ (written $s$).`),
    example(r`Find the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9`, [
      [r`\bar{x} = \tfrac{40}{8} = 5`, "Mean."],
      [r`\text{deviations: } -3, -1, -1, -1, 0, 0, 2, 4`, "Subtract the mean from each value."],
      [r`\text{squares: } 9, 1, 1, 1, 0, 0, 4, 16 \to \text{sum } 32`, ""],
      [r`\sigma = \sqrt{32/8} = \sqrt{4} = 2`, ""],
    ], "On average, values are about 2 away from the mean of 5."),
    activity("data-explorer", { title: "Which measures resist an outlier?", params: { dataset: "quiz", view: "box" } }),
    callout("tip", "Try this", r`Note the mean, median, IQR and σ. Drag the highest score to 20. Which two measures barely change, and which two jump? That's what "resistant" means.`, "experiment"),
    text(r`For a roughly symmetric distribution with no outliers, report the mean and standard deviation. For a skewed distribution or one with outliers, report the median and IQR, which aren't pulled by the tail.`),
    example(r`Compare: Team A scores 20, 22, 23, 25, 30; Team B scores 10, 18, 24, 31, 37`, [
      [r`\text{A: mean } 24,\ \text{median } 23,\ \text{range } 10`, ""],
      [r`\text{B: mean } 24,\ \text{median } 24,\ \text{range } 27`, ""],
      [r`\sigma_A \approx 3.4,\ \sigma_B \approx 9.5`, "Same center; B is much more spread out, so it is less consistent."],
    ]),
    callout("warning", "Standard deviation is never negative", r`$\sigma = 0$ only when all values are equal. Adding the same number to every value doesn't change σ or the IQR; multiplying every value by 2 doubles them.`),
    callout("application", "Where this shows up", r`Manufacturers track standard deviation to keep products consistent, investors use it to measure risk, and weather reports use averages and ranges. Income statistics use medians because incomes are strongly skewed.`),
  ],
  questions: [
    num(1, r`Find the IQR of a data set with $Q_1 = 31$ and $Q_3 = 47$.`, 16, {}, [r`$Q_3 - Q_1$.`], r`$47 - 31 = 16$.`),
    num(2, r`Find the mean of 3, 7, 7, 8, 10.`, 7, {}, ["Sum is 35."], r`$35 \div 5 = 7$.`),
    num(2, r`Find the population standard deviation of 3, 7, 7, 8, 10. Round to two decimals.`, 2.28, { tolerance: 0.006 }, ["Mean is 7.", "Squared deviations: 16, 0, 0, 1, 9."], r`Sum 26, $26 / 5 = 5.2$, $\sigma = \sqrt{5.2} \approx 2.28$.`),
    mc(2, r`Which measures are resistant to outliers?`, ["Mean and standard deviation", "Median and IQR", "Mean and IQR", "Range and standard deviation"], 1, ["Which measures depend only on the middle of the ordered data?"], r`The median and IQR depend on the positions of the middle values, so a single extreme value barely affects them.`),
    mc(2, r`A data set of home prices is strongly skewed right. Which summary is most appropriate?`, ["Mean and standard deviation", "Median and IQR", "Mode and range", "Mean and range"], 1, ["Skew pulls the mean toward the tail."], r`For skewed data, the median and IQR describe a typical value and spread better.`),
    mc(3, r`Every value in a data set is increased by 5. What happens to the standard deviation?`, ["It increases by 5", "It stays the same", "It is multiplied by 5", "It decreases"], 1, ["Does shifting all values change how far they are from the mean?"], r`The mean also rises by 5, so every deviation is unchanged and σ stays the same.`, "review"),
    num(3, r`Data: 12, 15, 18, 20, 22, 25, 60. Using the 1.5 × IQR rule with $Q_1 = 15$ and $Q_3 = 25$, what is the upper fence?`, 40, {}, [r`IQR = 10; $1.5 \times 10 = 15$.`], r`$25 + 15 = 40$. Since $60 > 40$, the value 60 is an outlier.`, "review"),
  ],
});
