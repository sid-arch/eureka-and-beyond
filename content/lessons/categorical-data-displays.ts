import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "categorical-data-displays",
  title: "Representing a categorical variable with tables and graphs",
  summary: "Summarize a categorical variable with frequency and relative frequency tables, display it with bar charts and pie charts, and spot misleading graphs.",
  minutes: 20,
  objectives: [
    "Build frequency and relative frequency tables.",
    "Make and read bar charts and pie charts.",
    "Recognize misleading displays, such as truncated axes and pictographs.",
  ],
  concepts: [
    { slug: "data-types", name: "Types of data", description: "Categorical variables place individuals into groups; quantitative variables take numerical values that can be measured or counted.", subject: "subj_math" },
  ],
  blocks: [
    def("Frequency tables", r`A frequency table gives the count in each category; a relative frequency table gives the proportion or percent. Relative frequencies let you compare groups of different sizes.`),
    example(r`150 students name their preferred transport: bus 60, car 45, walk 30, bike 15`, [
      [r`\text{bus } \tfrac{60}{150} = 40\%,\ \text{car } 30\%,\ \text{walk } 20\%,\ \text{bike } 10\%`, "Relative frequencies sum to 100%."],
    ]),
    def("Bar charts and pie charts", r`A bar chart uses bar heights for counts or percents; the bars are separated because categories have no order on a number line. A pie chart shows parts of a whole and only works when the categories cover everyone exactly once.`),
    callout("warning", "Misleading displays", r`A vertical axis that doesn't start at 0 exaggerates differences between bars. Pictographs that scale an image's width and height both make a value look much larger than it is.`),
    callout("application", "Where this shows up", r`Election results, market share and survey responses are categorical; news graphics are a common place to practice spotting a truncated axis.`),
  ],
  questions: [
    num(1, r`45 of 150 students travel by car. What percent is that?`, 30, { unit: "%" }, [], r`$45/150 = 0.30$.`),
    mc(2, r`Why are the bars in a bar chart separated?`, ["To save ink", "The categories aren't values on a number scale", "To show skew", "Pie charts require it"], 1, [], r`Histograms touch because their bins cover a continuous scale; bar chart categories don't.`),
    mc(2, r`A survey lets people choose all the streaming services they use. Can a pie chart display the results?`, ["Yes", "No: a person can be in several categories, so the parts don't form one whole", "Only with percents", "Only if there are fewer than 5 services"], 1, [], r`Use a bar chart of percents instead.`),
    mc(3, r`A bar chart's vertical axis runs from 48% to 52%, showing 49% vs 51%. What's the problem?`, ["None", "It makes a small difference look huge", "Bars should touch", "Percents can't be graphed"], 1, [], r`The truncated axis exaggerates a 2-point difference.`, "review"),
  ],
});
