import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "observational-studies-experiments",
  title: "Observational studies and experiments",
  summary: "Distinguish observational studies from experiments, identify explanatory and response variables, and explain how confounding prevents cause-and-effect conclusions from observational data.",
  minutes: 25,
  objectives: [
    "Tell whether a study is observational or an experiment.",
    "Identify explanatory and response variables.",
    "Explain confounding and why only randomized experiments can show causation.",
  ],
  concepts: [
    { slug: "study-design", name: "Study design", description: "How data are produced (sample surveys, observational studies, experiments) and what conclusions each design supports.", subject: "subj_math" },
  ],
  blocks: [
    def("Observational study vs experiment", r`An observational study measures variables without trying to influence the responses. An experiment deliberately imposes treatments on individuals to measure their responses.`),
    def("Explanatory and response variables", r`The explanatory variable may help explain or predict changes in the response variable. In an experiment, the treatments are values of the explanatory variable.`),
    def("Confounding", r`Two variables are confounded when their effects on the response can't be separated. In observational studies, people choose their own "treatments," and their choices are often linked to other variables.`),
    example(r`A study of 5,000 adults finds that those who take vitamins have fewer heart attacks.`, [
      [r`\text{observational: people chose whether to take vitamins}`, ""],
      [r`\text{possible confounders: diet, exercise, income}`, "Vitamin takers may live healthier lives overall."],
      [r`\text{conclusion: association only}`, ""],
    ]),
    callout("application", "Where this shows up", r`Early observational studies suggested hormone therapy protected women's hearts; a large randomized experiment later found it didn't. Confounding by healthier lifestyles explained the original association.`),
  ],
  questions: [
    mc(1, r`Researchers randomly assign 60 volunteers to drink coffee or decaf and measure reaction time. This is…`, ["An observational study", "An experiment", "A sample survey", "A census"], 1, [], r`Treatments are imposed.`),
    mc(2, r`In that study, the response variable is…`, ["Coffee type", "Reaction time", "The volunteers", "Random assignment"], 1, [], r`Reaction time is measured as the outcome.`),
    mc(2, r`Students who eat breakfast have higher grades. Which is a plausible confounding variable?`, ["Grade point average", "Family routines and support", "Breakfast", "Test difficulty"], 1, [], r`Home routines could affect both breakfast and grades.`),
    mc(3, r`Why can't an observational study prove causation?`, ["Its samples are always small", "Other variables linked to the explanatory variable might cause the response", "It has no response variable", "It uses random assignment"], 1, [], r`Without random assignment, confounding can't be ruled out.`, "review"),
  ],
});
