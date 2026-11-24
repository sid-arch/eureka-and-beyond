import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "mean-median-mode-range",
  title: "Mean, median, mode and range",
  summary: "Summarize a data set with measures of center and the range, see how outliers affect each one, and choose the measure that best describes the data.",
  minutes: 25,
  objectives: [
    "Compute the mean, median, mode and range of a data set.",
    "Describe how an outlier affects the mean and the median.",
    "Choose an appropriate measure of center for a situation and justify the choice.",
  ],
  concepts: [
    { slug: "measures-of-center", name: "Measures of center", description: "Single values (mean, median, mode) that describe a typical value of a data set.", subject: "subj_math" },
  ],
  formulas: ["mean"],
  blocks: [
    def("Mean", r`The sum of the values divided by how many there are. It is the "fair share" value: if everyone pooled their values and split them equally, each would get the mean.`),
    def("Median", r`The middle value when the data are in order. With an even number of values, it is the mean of the two middle values.`),
    def("Mode", r`The value that occurs most often. A data set can have one mode, several modes, or no mode (if every value occurs equally often).`),
    def("Range", r`The maximum minus the minimum. It is a simple measure of spread: how far apart the values are.`),
    example(r`Quiz scores: 8, 6, 9, 10, 7, 8, 8, 4`, [
      [r`4, 6, 7, 8, 8, 8, 9, 10`, "Order the data first."],
      [r`\text{mean} = \tfrac{60}{8} = 7.5`, "The sum is 60 and there are 8 scores."],
      [r`\text{median} = \tfrac{8 + 8}{2} = 8`, "The 4th and 5th values are both 8."],
      [r`\text{mode} = 8,\quad \text{range} = 10 - 4 = 6`, ""],
    ]),
    activity("data-explorer", { title: "Drag the data", params: { dataset: "outlier", view: "none" } }),
    callout("tip", "Try this", r`This data set has an outlier at 19. Drag it down to 6 and watch the mean and the median. Which one moves more? Then drag it back up to 20.`, "experiment"),
    text(r`The mean uses every value, so a single extreme value (an outlier) pulls it toward the tail. The median depends only on the order, so it barely moves. For skewed data or data with outliers, such as incomes or house prices, the median is usually the better description of a typical value.`),
    example(r`Five friends earn 12, 13, 13, 15 and 97 dollars per hour.`, [
      [r`\text{mean} = \tfrac{150}{5} = 30`, "Pulled up by 97."],
      [r`\text{median} = 13`, "The middle of the ordered list."],
    ], "Four of the five earn less than the mean. The median, 13, describes a typical friend much better."),
    example(r`A student's first four test scores average 84. What score on the fifth test makes the mean 86?`, [
      [r`4 \cdot 84 = 336`, "The total of the first four."],
      [r`5 \cdot 86 = 430`, "The total needed for a mean of 86."],
      [r`430 - 336 = 94`, "The fifth score must be 94."],
    ]),
    callout("warning", "Order before finding the median", r`The median of 9, 2, 7 is 7, not 2. Always sort the data first.`),
    callout("application", "Where this shows up", r`News reports quote median home prices and median household income because a few very large values would distort the mean. Grade books use the mean. Shoe stores stock most of the mode size.`),
  ],
  questions: [
    num(1, r`Find the mean of 12, 15, 9, 20, 14.`, 14, {}, ["Add, then divide by 5."], r`$\frac{70}{5} = 14$.`),
    num(1, r`Find the median of 7, 3, 9, 1, 5.`, 5, {}, ["Order the values first."], r`1, 3, 5, 7, 9: the median is 5.`),
    num(2, r`Find the median of 4, 10, 6, 8, 12, 2.`, 7, {}, ["Ordered: 2, 4, 6, 8, 10, 12.", "Average the two middle values."], r`$\frac{6 + 8}{2} = 7$.`),
    num(2, r`Find the range of $-3, 8, 0, -7, 5$.`, 15, {}, ["Maximum minus minimum."], r`$8 - (-7) = 15$.`),
    mc(2, r`Data: 2, 3, 3, 5, 5, 7. What is the mode?`, ["3", "5", "3 and 5", "No mode"], 2, ["Which values occur most often?"], r`3 and 5 each occur twice, so the data set has two modes.`),
    mc(2, r`House prices on a street: 210k, 225k, 230k, 240k, 1.2 million. Which measure best describes a typical price?`, ["Mean", "Median", "Range", "Mode"], 1,
      ["One house is an outlier."], r`The median (230k) is not affected by the 1.2 million outlier; the mean (421k) is higher than four of the five prices.`),
    num(3, r`The mean of 6 numbers is 15. Five of them are 12, 18, 10, 20 and 16. What is the sixth?`, 14, {}, ["The total must be 6 × 15 = 90."], r`$90 - (12 + 18 + 10 + 20 + 16) = 90 - 76 = 14$.`, "review"),
    mc(3, r`A value much larger than the rest is added to a data set. Which statement is most likely true?`, [
      "The median increases a lot and the mean barely changes.", "The mean increases more than the median.", "Neither changes.", "Both decrease.",
    ], 1, ["Which measure uses the size of every value?"], r`The mean includes the size of the new value, so it is pulled up strongly; the median moves at most to a neighboring value.`, "review"),
  ],
});
