import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "box-plots-histograms",
  title: "Box plots and histograms",
  summary: "Construct box plots and histograms, read shape, center, spread and outliers from them, and compare two distributions side by side.",
  minutes: 30,
  objectives: [
    "Build a box plot from the five-number summary, marking outliers with the 1.5 × IQR rule.",
    "Build a histogram with sensible bins and describe the shape of the distribution.",
    "Compare two distributions using parallel box plots or histograms, discussing center, spread and shape.",
  ],
  concepts: [
    { slug: "data-displays", name: "Data displays", description: "Dot plots, histograms and box plots for one numerical variable.", subject: "subj_math" },
    { slug: "five-number-summary", name: "Five-number summary", description: "Minimum, first quartile, median, third quartile and maximum.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Box plots and histograms summarize the same numerical data in different ways. A histogram shows shape in detail: peaks, gaps and tails. A box plot shows the five-number summary and outliers compactly, which makes it ideal for comparing several groups side by side.`),
    def("Modified box plot", r`Whiskers extend only to the most extreme values that are not outliers. Values beyond $Q_1 - 1.5 \cdot \text{IQR}$ or $Q_3 + 1.5 \cdot \text{IQR}$ are plotted as separate points.`),
    example(r`Make a box plot of: 4, 7, 8, 9, 10, 11, 12, 12, 14, 27`, [
      [r`\text{median} = \tfrac{10 + 11}{2} = 10.5`, "Ten values: average the 5th and 6th."],
      [r`Q_1 = 8,\ Q_3 = 12`, "Medians of 4, 7, 8, 9, 10 and 11, 12, 12, 14, 27."],
      [r`\text{IQR} = 4;\ \text{fences } 8 - 6 = 2,\ 12 + 6 = 18`, ""],
      [r`27 > 18 \Rightarrow \text{outlier}`, "The upper whisker stops at 14; 27 is a separate point."],
    ]),
    activity("data-explorer", { title: "Box plot and histogram of the same data", params: { dataset: "sleep", view: "histogram" } }),
    callout("tip", "Try this", r`Switch between histogram and box plot. Change the bin width from 1 to 4. A good bin width shows the shape without hiding it in one big bar or scattering it into many tiny ones. Drag a value far right: how does each display show the outlier?`, "experiment"),
    def("Describing shape", r`Symmetric, skewed left (long tail to the left) or skewed right (long tail to the right); unimodal or bimodal; any gaps or clusters. In a box plot, skew shows as a longer whisker and a median off-center in the box.`),
    example(r`Compare two classes' test scores from box plots`, [
      [r`\text{A: } 55, 68, 74, 80, 92 \quad \text{B: } 62, 70, 78, 83, 88`, "Five-number summaries."],
      [r`\text{median: } 74 \text{ vs } 78`, "Class B's typical score is higher."],
      [r`\text{IQR: } 12 \text{ vs } 13;\ \text{range: } 37 \text{ vs } 26`, "Similar middle spread, but A has a wider overall spread."],
    ], "A full comparison mentions center, spread, shape and outliers, in context."),
    callout("warning", "Box plots hide sample size and gaps", r`A box plot of 10 values and one of 10,000 values can look the same, and a bimodal distribution can look like a plain box. Look at a histogram or dot plot when shape matters.`),
    callout("application", "Where this shows up", r`Doctors compare patient groups with parallel box plots, quality engineers check machine output with histograms, and sports analysts compare players' scoring distributions.`),
  ],
  questions: [
    num(2, r`Find $Q_1$ for 3, 5, 6, 8, 9, 11, 14, 15.`, 5.5, {}, ["Lower half: 3, 5, 6, 8."], r`$\frac{5 + 6}{2} = 5.5$.`),
    num(2, r`For the same data, find $Q_3$.`, 12.5, {}, ["Upper half: 9, 11, 14, 15."], r`$\frac{11 + 14}{2} = 12.5$.`),
    mc(2, r`In a box plot, the right whisker is much longer than the left and the median is near the left of the box. The distribution is…`, ["Symmetric", "Skewed left", "Skewed right", "Uniform"], 2, ["Which side has the long tail?"], r`The long tail is on the right, so it is skewed right.`),
    mc(2, r`What fraction of the data lies between $Q_1$ and the median?`, ["About 10%", "About 25%", "About 50%", "About 75%"], 1, ["Quartiles split the data into four equal parts."], r`About a quarter of the values.`),
    mc(2, r`Which display best shows that a data set has two peaks?`, ["Box plot", "Histogram", "Five-number summary", "Mean and standard deviation"], 1, ["Which display shows shape in detail?"], r`A histogram shows both peaks; a box plot can hide them.`),
    num(3, r`Data have $Q_1 = 40$, median 46, $Q_3 = 52$, minimum 30 and maximum 75. What is the largest value the upper whisker could reach in a modified box plot?`, 70, {}, [r`Upper fence: $Q_3 + 1.5 \cdot \text{IQR}$.`], r`IQR = 12 and the fence is $52 + 18 = 70$. The maximum 75 is an outlier; the whisker extends to the largest value at most 70.`, "review"),
  ],
});
