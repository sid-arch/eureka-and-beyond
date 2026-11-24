import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "types-of-data",
  title: "Types of data and variables",
  summary: "Identify individuals and variables in a data set, and classify variables as categorical or quantitative (discrete or continuous) to choose the right displays and summaries.",
  minutes: 20,
  objectives: [
    "Identify the individuals and variables in a data set.",
    "Classify variables as categorical or quantitative.",
    "Distinguish discrete from continuous quantitative variables.",
  ],
  concepts: [
    { slug: "data-types", name: "Types of data", description: "Categorical variables place individuals into groups; quantitative variables take numerical values that can be measured or counted.", subject: "subj_math" },
  ],
  blocks: [
    def("Individuals and variables", r`Individuals are the objects described by a data set (people, animals, cars, days). A variable is a characteristic recorded for each individual.`),
    def("Categorical and quantitative", r`A categorical variable places each individual into a group (eye color, state of residence). A quantitative variable takes numerical values for which arithmetic makes sense (height, number of siblings).`),
    def("Discrete and continuous", r`A discrete quantitative variable takes countable values (number of pets). A continuous one can take any value in an interval (time to finish a race).`),
    example(r`A school records each student's grade level, GPA, bus route number and number of absences.`, [
      [r`\text{individuals: students}`, ""],
      [r`\text{GPA: quantitative, continuous; absences: quantitative, discrete}`, ""],
      [r`\text{bus route number: categorical}`, "Averaging route numbers means nothing; the numbers are labels."],
      [r`\text{grade level: often treated as categorical}`, "It can be either, depending on the question you ask."],
    ]),
    callout("tip", "The arithmetic test", r`If computing an average of the values would make sense, the variable is quantitative. ZIP codes, jersey numbers and phone numbers fail the test.`),
    callout("application", "Where this shows up", r`The type of variable decides everything that follows: bar and pie charts for categorical data; dot plots, histograms and box plots, with means and standard deviations, for quantitative data.`),
  ],
  questions: [
    mc(1, r`A ZIP code is…`, ["Quantitative, discrete", "Quantitative, continuous", "Categorical", "Neither"], 2, ["Would an average ZIP code mean anything?"], r`ZIP codes are labels for regions.`),
    mc(1, r`The number of goals scored in a soccer game is…`, ["Categorical", "Quantitative, discrete", "Quantitative, continuous", "An individual"], 1, [], r`A count: 0, 1, 2, …`),
    mc(2, r`A survey asks 200 adults their age, favorite news source and weekly hours online. How many categorical variables are there?`, ["0", "1", "2", "3"], 1, [], r`Only the news source is categorical; age and hours are quantitative.`),
    mc(2, r`Which display fits a categorical variable?`, ["Histogram", "Bar chart", "Box plot", "Dot plot of values"], 1, [], r`Bar charts show counts or percents in each category.`, "review"),
  ],
});
