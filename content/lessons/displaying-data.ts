import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "displaying-data",
  title: "Displaying data",
  summary: "Make and read dot plots, histograms and box plots, describe a distribution's shape, center and spread, and pick a suitable display.",
  minutes: 30,
  objectives: [
    "Construct and interpret dot plots, histograms and box plots.",
    "Find the five-number summary and the interquartile range (IQR).",
    "Describe a distribution's shape, center and spread, and choose a suitable display for a data set.",
  ],
  concepts: [
    { slug: "data-displays", name: "Data displays", description: "Dot plots, histograms and box plots for one numerical variable.", subject: "subj_math" },
    { slug: "five-number-summary", name: "Five-number summary", description: "Minimum, first quartile, median, third quartile and maximum.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A list of numbers is hard to read. A good display shows the distribution at a glance: where the data cluster (center), how spread out they are, and the overall shape.`),
    def("Dot plot", r`One dot for each value above a number line. Good for small data sets; every value stays visible.`),
    def("Histogram", r`Bars over equal-width intervals (bins) whose heights show how many values fall in each bin. Good for large data sets. Bars touch because the bins cover the number line without gaps.`),
    def("Box plot", r`A display of the five-number summary: minimum, first quartile $Q_1$, median, third quartile $Q_3$ and maximum. The box covers the middle half of the data; its length is the interquartile range, $\text{IQR} = Q_3 - Q_1$.`),
    example(r`Find the five-number summary of 3, 5, 6, 7, 8, 9, 11, 12, 15`, [
      [r`\text{median} = 8`, "Nine values; the 5th is the middle."],
      [r`Q_1 = \text{median of } 3, 5, 6, 7 = 5.5`, "Lower half (the median is left out)."],
      [r`Q_3 = \text{median of } 9, 11, 12, 15 = 11.5`, "Upper half."],
      [r`3,\ 5.5,\ 8,\ 11.5,\ 15;\quad \text{IQR} = 6`, "Min, Q₁, median, Q₃, max."],
    ]),
    activity("data-explorer", { title: "Dot plot, box plot and histogram", params: { dataset: "skewed", view: "box" } }),
    callout("tip", "Try this", r`This data set is skewed right: most values are small, with a long tail to the right. Look at where the mean sits compared with the median. Switch to the histogram and change the bin width. Which width shows the shape best?`, "experiment"),
    text(r`Common shapes: symmetric (the two sides look like mirror images; mean ≈ median), skewed right (a long tail toward larger values; the mean is usually greater than the median), and skewed left (a long tail toward smaller values). A distribution with one clear peak is unimodal; with two peaks, bimodal.`),
    callout("note", "Outliers", r`A common rule flags a value as an outlier if it is more than $1.5 \times \text{IQR}$ below $Q_1$ or above $Q_3$. Box plots often show outliers as separate points.`),
    callout("warning", "Box plots hide the count", r`Each part of a box plot holds about a quarter of the data, whether it is long or short. A long whisker means the values are spread out, not that there are more of them.`),
    callout("application", "Where this shows up", r`Weather reports use histograms of rainfall, doctors read growth charts based on quartiles, and test reports show percentiles. Choosing the right display is part of telling an honest story with data.`),
  ],
  questions: [
    num(1, r`A box plot shows $Q_1 = 14$ and $Q_3 = 22$. What is the IQR?`, 8, {}, [r`IQR $= Q_3 - Q_1$.`], r`$22 - 14 = 8$.`),
    num(2, r`Find the median of 2, 4, 4, 5, 7, 9, 10, 12.`, 6, {}, ["Eight values: average the 4th and 5th."], r`$\frac{5 + 7}{2} = 6$.`),
    num(2, r`For 2, 4, 4, 5, 7, 9, 10, 12, find $Q_1$.`, 4, {}, ["Lower half: 2, 4, 4, 5."], r`Median of 2, 4, 4, 5 is $\frac{4 + 4}{2} = 4$.`),
    num(2, r`For 2, 4, 4, 5, 7, 9, 10, 12, find $Q_3$.`, 9.5, {}, ["Upper half: 7, 9, 10, 12."], r`Median of 7, 9, 10, 12 is $\frac{9 + 10}{2} = 9.5$.`),
    mc(2, r`You surveyed 500 people about how many minutes they commute. Which display is most practical?`, ["Dot plot", "Histogram", "A list of all 500 values", "A single dot"], 1,
      ["Which display groups many values into intervals?"], r`A histogram groups the 500 values into bins; a dot plot would be crowded.`),
    mc(2, r`In a histogram most bars are on the left with a long tail of short bars to the right. How would you describe it?`, ["Symmetric", "Skewed left", "Skewed right", "Uniform"], 2,
      ["Skew is named for the direction of the tail."], r`The tail points to larger values on the right, so it is skewed right.`),
    mc(3, r`A data set has $Q_1 = 10$, $Q_3 = 18$. Using the 1.5 × IQR rule, which value is an outlier?`, ["0", "25", "31", "−1"], 2,
      [r`IQR $= 8$ and $1.5 \times 8 = 12$.`, r`The fences are $10 - 12 = -2$ and $18 + 12 = 30$.`], r`Values below $-2$ or above $30$ are outliers. Only 31 is outside the fences.`, "review"),
  ],
});
